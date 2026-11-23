"""Render every clean clip in the plan with edge-tts (Indian neural voices), cached as 16 kHz mono wav.

Also renders the babble source sentences used by noise.py.
At most 2 TTS requests in flight. Re-running only renders missing files.

  python tts.py            # all clips
  python tts.py --limit 20 # first 20 missing clips (smoke test)
"""
import argparse
import asyncio
import os
import subprocess
import sys
import tempfile

import edge_tts

from common import BABBLE_DIR, CLEAN_DIR, RATES, clean_path, load_cases, write_plan

CONCURRENCY = 2

# Unrelated chatter for the babble noise (mixed languages, several voices).
BABBLE = [
    ("hi-IN-SwaraNeural", "अरे सुनो, आज सब्ज़ी मंडी में टमाटर बहुत महंगे थे, मैंने सिर्फ़ आधा किलो लिया।"),
    ("hi-IN-MadhurNeural", "भाई साहब अगली बस कितने बजे आएगी, हम कब से यहाँ खड़े हैं।"),
    ("en-IN-PrabhatNeural", "The meeting got shifted to Monday, so please send the slides before Friday evening."),
    ("en-IN-NeerjaNeural", "Can you pass me the water bottle, and also turn the fan on, it is really hot today."),
    ("bn-IN-TanishaaNeural", "আজকে বিকেলে খেলা আছে, তুমি কি মাঠে আসবে নাকি বাড়িতেই থাকবে।"),
    ("ta-IN-ValluvarNeural", "நாளைக்கு கோயிலுக்கு போகலாம், காலையிலேயே கிளம்பணும், கூட்டம் அதிகமா இருக்கும்."),
    ("te-IN-ShrutiNeural", "ఈ రోజు వర్షం పడేలా ఉంది, గొడుగు తీసుకుని వెళ్ళు, లేకపోతే తడిసిపోతావు."),
    ("mr-IN-ManoharNeural", "उद्या शाळेला सुट्टी आहे, आपण सगळे मिळून मामाच्या गावाला जाऊया."),
    ("kn-IN-SapnaNeural", "ಇವತ್ತು ಸಂಜೆ ಮಾರ್ಕೆಟ್‌ಗೆ ಹೋಗೋಣ, ಹಬ್ಬಕ್ಕೆ ಸ್ವಲ್ಪ ಹೂವು ಮತ್ತು ಹಣ್ಣು ತರಬೇಕು."),
    ("en-IN-NeerjaExpressiveNeural", "Oh my god, did you see that match yesterday, the last over was absolutely crazy."),
]


def to_wav(src, dst, pad=True):
    # 0.4 s of lead-in and 0.6 s tail: room for noise before and after the speech
    af = ["-af", "adelay=400:all=1,apad=pad_dur=0.6"] if pad else []
    tmp = dst + ".tmp.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, *af, "-ac", "1", "-ar", "16000",
                    "-sample_fmt", "s16", tmp], check=True, timeout=120)
    os.replace(tmp, dst)


async def render(sem, text, voice, rate, dst, pad=True):
    if os.path.exists(dst):
        return "cached"
    async with sem:
        for attempt in range(4):
            fd, mp3 = tempfile.mkstemp(suffix=".mp3")
            os.close(fd)
            try:
                await edge_tts.Communicate(text, voice, rate=rate).save(mp3)
                if os.path.getsize(mp3) < 1000:
                    raise RuntimeError("empty audio")
                await asyncio.to_thread(to_wav, mp3, dst, pad)
                return "ok"
            except Exception as e:  # network hiccups: back off and retry
                if attempt == 3:
                    print(f"  FAILED {os.path.basename(dst)}: {type(e).__name__}: {e}", file=sys.stderr)
                    return "failed"
                await asyncio.sleep(3 * (attempt + 1))
            finally:
                if os.path.exists(mp3):
                    os.remove(mp3)


async def main(limit):
    os.makedirs(CLEAN_DIR, exist_ok=True)
    os.makedirs(BABBLE_DIR, exist_ok=True)
    plan = write_plan()
    cases = {c["id"]: c for c in load_cases()}
    sem = asyncio.Semaphore(CONCURRENCY)
    todo = [c for c in plan["clips"] if not os.path.exists(clean_path(c["clip"]))]
    if limit:
        todo = todo[:limit]
    print(f"{len(plan['clips'])} clips in plan, {len(todo)} to render")
    tasks = [render(sem, text, v, "+0%", os.path.join(BABBLE_DIR, f"babble{i:02d}.wav"), pad=False)
             for i, (v, text) in enumerate(BABBLE)]
    for c in todo:
        case = cases[c["case"]]
        tasks.append(render(sem, case.get("tts", case["text"]), c["voice"], RATES[c["rate"]], clean_path(c["clip"])))
    done = {"ok": 0, "cached": 0, "failed": 0}
    for i, fut in enumerate(asyncio.as_completed(tasks), 1):
        done[await fut] += 1
        if i % 50 == 0:
            print(f"  {i}/{len(tasks)} {done}", flush=True)
    print("tts done", done)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    asyncio.run(main(ap.parse_args().limit))
