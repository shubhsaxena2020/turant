"""Score LLM extractors (NVIDIA NIM) on the harness corpus (clean text), cached per model.

Usage: python -I llm_eval.py <model> [<model> ...]
Writes out/<model-slug>.jsonl (raw answers, cached) and out/<model-slug>.score.json.
"""
import json, os, re, subprocess, sys, time, urllib.request, urllib.error
from datetime import datetime, timedelta

sys.stdout.reconfigure(encoding="utf8")
HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = os.path.join(HERE, "..", "harness", "corpus", "cases.jsonl")
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)
NOW = datetime(2026, 11, 21, 13, 30)  # fixed "now" so relative times are checkable
KEY = subprocess.run(["powershell", "-NoProfile", "-Command",
                      "[Environment]::GetEnvironmentVariable('NVIDIA_API_KEY_4','User')"],
                     capture_output=True, text=True).stdout.strip()

BANKS = "sbi, hdfc, icici, axis, kotak, pnb, bob (Bank of Baroda), canara, union, boi (Bank of India), indian (Indian Bank), yes, idfc, indusind, ippb, other"
SYSTEM = (
    "You extract facts from what an Indian UPI/online-fraud victim said (any Indian language, code-mixed, ASR output). "
    "Return ONLY a JSON object, no prose. Keys (omit or null when not said):\n"
    "amount: integer rupees lost (understand number words in every Indian language, lakh/hazaar/saade/dhai);\n"
    "when: local datetime 'YYYY-MM-DDTHH:MM' of the incident, computed from the current time given;\n"
    "scamType: one of fake_kyc, otp_shared, fake_customer_care, wrong_transfer, qr_scan, investment_task, sextortion, other;\n"
    f"bank: victim's bank as one of: {BANKS};\n"
    "paymentApp: one of phonepe, gpay, paytm, bhim, bankapp;\n"
    "utr: the 12-digit UPI transaction/reference number, digits only;\n"
    "suspectUpi: fraudster's UPI ID as name@handle (convert 'dot'->'.', 'at'->'@');\n"
    "suspectPhone: fraudster's 10-digit mobile, digits only;\n"
    "suspectAccount: fraudster's bank account number, digits only;\n"
    "intent: 'skip' if the speaker says they don't know / want to skip, else null.\n"
    "If the speaker corrects themselves, use the corrected value. Never guess a value that was not said."
)


def call(model, text, hint):
    user = f"Current time: {NOW:%Y-%m-%d %H:%M} (IST).\n"
    if hint:
        user += f"The app had just asked about: {hint}.\n"
    user += f"Speech: {text}"
    payload = {"model": model, "temperature": 0, "max_tokens": 600, "stream": False,
               "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}],
               "chat_template_kwargs": {"enable_thinking": False, "thinking": False}}
    req = urllib.request.Request("https://integrate.api.nvidia.com/v1/chat/completions",
                                 data=json.dumps(payload).encode(),
                                 headers={"Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    for attempt in range(3):
        try:
            t = time.time()
            out = json.load(urllib.request.urlopen(req, timeout=90))
            return out["choices"][0]["message"].get("content") or "", time.time() - t
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(20 * (attempt + 1))
                continue
            return f"HTTP {e.code}", 0
        except Exception as e:  # timeout etc.
            err = f"ERR {type(e).__name__}"
            time.sleep(5)
    return err, 0


def parse(raw):
    m = re.search(r"\{.*\}", raw, re.S)
    if not m:
        return {}
    try:
        return json.loads(m.group(0))
    except Exception:
        return {}


def expected_dt(exp):
    if "ago" in exp:
        return NOW - timedelta(minutes=exp["ago"])
    h, mi = map(int, exp["at"].split(":"))
    return (NOW + timedelta(days=exp.get("day", 0))).replace(hour=h, minute=mi)


def digits(v):
    return re.sub(r"\D", "", str(v or ""))


def correct(field, exp, got):
    if got in (None, "", [], {}):
        return None  # missing
    try:
        if field == "amount":
            return int(float(str(got).replace(",", ""))) == int(exp)
        if field == "time":
            g = datetime.fromisoformat(str(got)[:16])
            return abs((g - expected_dt(exp)).total_seconds()) <= 20 * 60
        if field in ("utr", "suspectPhone", "suspectAccount"):
            return digits(got)[-len(digits(exp)):] == digits(exp) and len(digits(got)) == len(digits(exp))
        if field == "suspectUpi":
            return str(got).strip().lower() == str(exp).strip().lower()
        return str(got).strip().lower() == str(exp).strip().lower()
    except Exception:
        return False


def main(models):
    cases = [json.loads(l) for l in open(CORPUS, encoding="utf8")]
    for model in models:
        slug = model.replace("/", "__")
        cache_path = os.path.join(OUT, slug + ".jsonl")
        cache = {}
        if os.path.exists(cache_path):
            for l in open(cache_path, encoding="utf8"):
                d = json.loads(l)
                cache[d["id"]] = d
        with open(cache_path, "a", encoding="utf8") as fh:
            for i, c in enumerate(cases):
                if c["id"] in cache and not cache[c["id"]]["raw"].startswith(("ERR", "HTTP")):
                    continue
                raw, secs = call(model, c["text"], c.get("hint"))
                d = {"id": c["id"], "raw": raw, "secs": round(secs, 2)}
                cache[c["id"]] = d
                fh.write(json.dumps(d, ensure_ascii=False) + "\n")
                fh.flush()
                if i % 20 == 0:
                    print(f"{model} {i}/{len(cases)}", flush=True)
        score(model, cases, cache)


def score(model, cases, cache):
    per = {}
    per_lang = {}
    full = 0
    secs = []
    fails = []
    for c in cases:
        got = parse(cache[c["id"]]["raw"])
        got["time"] = got.get("when")
        secs.append(cache[c["id"]]["secs"])
        ok_all = True
        for f, exp in c["expected"].items():
            r = correct(f, exp, got.get(f))
            s = per.setdefault(f, {"ok": 0, "wrong": 0, "missing": 0})
            s["ok" if r else "missing" if r is None else "wrong"] += 1
            L = per_lang.setdefault(c["lang"], {"ok": 0, "n": 0})
            L["n"] += 1
            L["ok"] += 1 if r else 0
            if not r:
                ok_all = False
                fails.append({"id": c["id"], "field": f, "expected": exp, "got": got.get(f), "text": c["text"][:140]})
        full += ok_all
    res = {"model": model, "cases": len(cases), "fully_correct": full, "fully_correct_pct": round(100 * full / len(cases), 1),
           "median_secs": sorted(secs)[len(secs) // 2], "fields": per,
           "lang_field_acc": {k: round(100 * v["ok"] / v["n"], 1) for k, v in per_lang.items()}, "fails": fails}
    slug = model.replace("/", "__")
    json.dump(res, open(os.path.join(OUT, slug + ".score.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(json.dumps({k: res[k] for k in ("model", "fully_correct_pct", "median_secs", "lang_field_acc")}, ensure_ascii=False))
    print({f: v for f, v in per.items()})


if __name__ == "__main__":
    main(sys.argv[1:] or ["nvidia/nemotron-3.5-bolt-e4b"])
