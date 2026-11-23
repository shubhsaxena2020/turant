"""Transcribe every audio file in the plan with the local Whisper server, strictly one request at a time.

Server: http://127.0.0.1:8790  (C:/Users/shubh/Projects/clipping/asr/asr_server.py)
  POST /transcribe {"path": "C:/abs/file.wav", "language": "<|hi|>" | "", "cache_to": "..."} -> {"text", "segments": [{"text"}...]}
Every transcript is cached in transcripts/<tid>.json (the server also writes it there via cache_to),
so nothing is ever transcribed twice.

If GET /health fails twice the server is started here (hidden, BelowNormal priority) and its PID
is written to asr_server.pid; `python asr.py --stop` kills only that PID.

  python asr.py                 # all tiers, in plan order (base, noise, rate, auto)
  python asr.py --tier base     # one tier
  python asr.py --limit 20      # smoke test
"""
import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

from common import HERE, PLAN, TRANSCRIPTS, audio_path, transcript_path

URL = "http://127.0.0.1:8790"
SERVER_DIR = r"C:\Users\shubh\Projects\clipping\asr"
SERVER_PY = r"C:\Users\shubh\Projects\clipping\.venv-asr\Scripts\python.exe"
PID_FILE = os.path.join(HERE, "asr_server.pid")
MAX_CLIP_S = 60          # short clips only


def health(timeout=5):
    try:
        with urllib.request.urlopen(URL + "/health", timeout=timeout) as r:
            return json.loads(r.read()).get("ok") is True
    except Exception:
        return False


def start_server():
    ps = (f"$p = Start-Process -WindowStyle Hidden -WorkingDirectory '{SERVER_DIR}' -FilePath '{SERVER_PY}' "
          f"-ArgumentList '-X','utf8','asr_server.py' -PassThru; $p.PriorityClass = 'BelowNormal'; $p.Id")
    out = subprocess.run(["powershell", "-NoProfile", "-Command", ps], capture_output=True, text=True, timeout=60)
    pid = out.stdout.strip().splitlines()[-1] if out.stdout.strip() else ""
    with open(PID_FILE, "w") as fh:
        fh.write(pid)
    print(f"started ASR server, PID {pid} (recorded in asr_server.pid)", flush=True)
    for _ in range(120):                       # model load can take a while
        time.sleep(5)
        if health():
            print("ASR server healthy", flush=True)
            return
    raise SystemExit("ASR server did not become healthy within 10 min")


def ensure_server():
    if health() or (time.sleep(3) is None and health()):
        return
    print("ASR /health failed twice", flush=True)
    start_server()


def stop_server():
    if not os.path.exists(PID_FILE):
        print("no asr_server.pid: this harness did not start the server, leaving it alone")
        return
    pid = open(PID_FILE).read().strip()
    if pid:
        subprocess.run(["taskkill", "/PID", pid, "/F"], check=False)
    os.remove(PID_FILE)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "default=nw=1:nk=1", path], capture_output=True, text=True, timeout=60)
    return float(out.stdout.strip() or 0)


def transcribe(path, language, cache_to):
    body = json.dumps({"path": path.replace("\\", "/"), "language": language, "cache_to": cache_to}).encode("utf-8")
    req = urllib.request.Request(URL + "/transcribe", data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.loads(r.read())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tier", default="")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--stop", action="store_true", help="kill the ASR server only if this harness started it")
    args = ap.parse_args()
    if args.stop:
        return stop_server()

    os.makedirs(TRANSCRIPTS, exist_ok=True)
    plan = json.load(open(PLAN, encoding="utf-8"))
    audios = {a["audio"]: a for a in plan["audios"]}
    jobs = [j for j in plan["jobs"] if not args.tier or j["tier"] == args.tier]
    todo = [j for j in jobs if not os.path.exists(transcript_path(j["tid"]))]
    if args.limit:
        todo = todo[:args.limit]
    print(f"{len(jobs)} jobs, {len(todo)} to transcribe", flush=True)
    if not todo:
        return
    ensure_server()
    t0, done, failed = time.time(), 0, 0
    for j in todo:
        path = audio_path(audios[j["audio"]])
        out_path = transcript_path(j["tid"])
        if not os.path.exists(path):
            print(f"  missing audio {os.path.basename(path)} (run tts.py / noise.py)", file=sys.stderr)
            failed += 1
            continue
        if duration(path) > MAX_CLIP_S:
            print(f"  skip {j['tid']}: longer than {MAX_CLIP_S}s", file=sys.stderr)
            continue
        for attempt in range(3):
            try:
                t = time.time()
                r = transcribe(os.path.abspath(path), j["asr_lang"], os.path.abspath(out_path).replace("\\", "/"))
                if not os.path.exists(out_path):     # server normally writes it via cache_to
                    with open(out_path, "w", encoding="utf-8") as fh:
                        json.dump(r, fh, ensure_ascii=False)
                done += 1
                break
            except (urllib.error.URLError, ConnectionError, TimeoutError, OSError) as e:
                print(f"  {j['tid']}: {type(e).__name__}: {e} (attempt {attempt + 1})", file=sys.stderr, flush=True)
                time.sleep(5)
                ensure_server()
        else:
            failed += 1
        if done and done % 25 == 0:
            el = time.time() - t0
            print(f"  {done}/{len(todo)} done, {el / done:.2f}s per clip, last {time.time() - t:.2f}s", flush=True)
    print(f"asr done: {done} transcribed, {failed} failed, {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
