"""Step 1: synthesize one narration clip per scenario step with an Indian neural voice.

python -I narrate.py scenario.json out/
Writes out/say_<i>.mp3 and out/timing.json ([{i, text, file, ms}]).
"""
import asyncio, json, os, subprocess, sys

import edge_tts


async def main(scenario_path, out_dir):
    sc = json.load(open(scenario_path, encoding="utf8"))
    os.makedirs(out_dir, exist_ok=True)
    voice = sc.get("voice", "en-IN-NeerjaNeural")
    rate = sc.get("rate", "+0%")
    timing = []
    for i, step in enumerate(sc["steps"]):
        text = step.get("say", "").strip()
        if not text:
            timing.append({"i": i, "text": "", "file": None, "ms": 0})
            continue
        f = os.path.join(out_dir, f"say_{i}.mp3")
        if not os.path.exists(f):
            await edge_tts.Communicate(text, step.get("voice", voice), rate=rate).save(f)
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", f],
                                   capture_output=True, text=True).stdout.strip() or 0)
        timing.append({"i": i, "text": text, "file": os.path.basename(f), "ms": int(dur * 1000)})
        print(f"step {i}: {dur:.1f}s  {text[:60]}")
    json.dump(timing, open(os.path.join(out_dir, "timing.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1], sys.argv[2]))
