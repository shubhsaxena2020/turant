"""Experiment: does biasing Whisper with domain words (hotwords) cut the ASR errors?

Re-transcribes the clean normal-rate clips (tier "base") with a per-language hotword list
(currency, thousand / lakh, time words, bank and app names) into transcripts_hw/, leaving the
normal transcripts alone. Then:  node run_eval.mjs --transcripts transcripts_hw --name hw1
The lists are generic domain vocabulary, written without looking at any transcript.
Uses the already-running local server (asr.py starts it if needed): POST /transcribe {path, language, hotwords, cache_to}.
"""
import json
import os
import sys
import time
import urllib.request

from asr import ensure_server, URL
from common import HERE, PLAN, audio_path

OUT = os.path.join(HERE, "transcripts_hw")
BANKS = "SBI HDFC ICICI Axis Kotak PNB Canara UPI PhonePe Paytm Google Pay KYC OTP UTR"
HOTWORDS = {
    "hi": "रुपये हज़ार लाख मिनट घंटे पहले बजे कल आज " + BANKS,
    "mr": "रुपये हजार लाख मिनिटांपूर्वी तास वाजता काल आज " + BANKS,
    "bn": "টাকা হাজার লাখ মিনিট ঘণ্টা আগে টায় গতকাল আজ " + BANKS,
    "ta": "ரூபாய் ஆயிரம் லட்சம் நிமிடம் மணி முன்பு மணிக்கு நேற்று இன்று " + BANKS,
    "te": "రూపాయలు వేల లక్షల నిమిషాల గంటల క్రితం గంటలకు నిన్న ఈరోజు " + BANKS,
    "kn": "ರೂಪಾಯಿ ಸಾವಿರ ಲಕ್ಷ ನಿಮಿಷ ಗಂಟೆ ಹಿಂದೆ ಗಂಟೆಗೆ ನಿನ್ನೆ ಇಂದು " + BANKS,
    "en": "rupees thousand lakh minutes hours ago yesterday " + BANKS,
}


def main():
    os.makedirs(OUT, exist_ok=True)
    plan = json.load(open(PLAN, encoding="utf-8"))
    audios = {a["audio"]: a for a in plan["audios"]}
    jobs = [j for j in plan["jobs"] if j["tier"] == "base"]
    todo = [j for j in jobs if not os.path.exists(os.path.join(OUT, j["tid"] + ".json"))]
    print(f"{len(jobs)} base jobs, {len(todo)} to transcribe with hotwords", flush=True)
    if not todo:
        return
    ensure_server()
    t0 = time.time()
    for n, j in enumerate(todo, 1):
        out = os.path.join(OUT, j["tid"] + ".json")
        body = json.dumps({"path": audio_path(audios[j["audio"]]).replace("\\", "/"), "language": j["asr_lang"],
                           "hotwords": HOTWORDS[j["lang"]], "cache_to": out.replace("\\", "/")}).encode("utf-8")
        req = urllib.request.Request(URL + "/transcribe", data=body, headers={"Content-Type": "application/json"})
        for attempt in range(3):
            try:
                with urllib.request.urlopen(req, timeout=600) as r:
                    res = json.loads(r.read())
                if not os.path.exists(out):
                    json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False)
                break
            except Exception as e:  # noqa: BLE001
                print(f"  retry {j['tid']}: {e}", file=sys.stderr)
                time.sleep(3)
        if n % 50 == 0:
            print(f"  {n}/{len(todo)} done, {(time.time() - t0) / n:.2f}s per clip", flush=True)
    print(f"hotword asr done: {len(todo)} in {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
