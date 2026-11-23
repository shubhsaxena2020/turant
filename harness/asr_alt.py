"""Experiment: re-transcribe the clean clips (tier "base") with another local Whisper model.

Loads the model in-process (openvino_genai, GPU, fallback CPU); it does not touch the clipping
project's ASR server. Writes transcripts_<name>/<tid>.json ({"text"}), skips ones already done.
Then:  node run_eval.mjs --transcripts transcripts_<name> --name <name>

  <clipping venv python> asr_alt.py --model models/whisper-large-v3-int8-ov --name lv3 [--limit 20] [--lang ta,te]
"""
import argparse
import json
import os
import subprocess
import sys
import time

import numpy as np
import openvino_genai as og

from common import HERE, PLAN, audio_path


def decode(path):
    out = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vn", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         capture_output=True, check=True, timeout=300)
    return np.frombuffer(out.stdout, dtype=np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--name", required=True)
    ap.add_argument("--device", default="GPU")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--lang", default="")
    ap.add_argument("--beams", type=int, default=1)
    ap.add_argument("--tiers", default="base", help="comma list, or 'all'")
    args = ap.parse_args()

    out_dir = os.path.join(HERE, "transcripts_" + args.name)
    os.makedirs(out_dir, exist_ok=True)
    plan = json.load(open(PLAN, encoding="utf-8"))
    audios = {a["audio"]: a for a in plan["audios"]}
    langs = set(args.lang.split(",")) if args.lang else None
    jobs = [j for j in plan["jobs"] if (args.tiers == "all" or j["tier"] in args.tiers.split(",")) and (not langs or j["lang"] in langs)]
    todo = [j for j in jobs if not os.path.exists(os.path.join(out_dir, j["tid"] + ".json"))]
    if args.limit:
        todo = todo[:args.limit]
    print(f"{len(jobs)} jobs ({args.tiers}), {len(todo)} to transcribe with {os.path.basename(args.model)}", flush=True)
    if not todo:
        return

    model = os.path.join(HERE, args.model) if not os.path.isabs(args.model) else args.model
    t = time.time()
    try:
        pipe = og.WhisperPipeline(model, args.device)
    except Exception as e:  # noqa: BLE001
        print(f"{args.device} failed ({e}); using CPU", flush=True)
        pipe = og.WhisperPipeline(model, "CPU")
    print(f"model loaded in {time.time() - t:.1f}s", flush=True)

    t0 = time.time()
    for n, j in enumerate(todo, 1):
        cfg = pipe.get_generation_config()
        cfg.task = "transcribe"
        if j["asr_lang"]:
            cfg.language = j["asr_lang"]
        if args.beams > 1:
            cfg.num_beams = args.beams
        try:
            r = pipe.generate(decode(audio_path(audios[j["audio"]])).tolist(), cfg)
            text = str(r.texts[0] if getattr(r, "texts", None) else r).strip()
        except Exception as e:  # noqa: BLE001
            print(f"  {j['tid']}: {type(e).__name__}: {e}", file=sys.stderr, flush=True)
            continue
        with open(os.path.join(out_dir, j["tid"] + ".json"), "w", encoding="utf-8") as fh:
            json.dump({"text": text}, fh, ensure_ascii=False)
        if n % 25 == 0:
            print(f"  {n}/{len(todo)} done, {(time.time() - t0) / n:.2f}s per clip", flush=True)
    print(f"done: {len(todo)} in {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
