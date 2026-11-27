"""Shared config + the deterministic evaluation plan (which clips, voices, rates, noises).

`python common.py` writes plan.json, which tts.py / noise.py / asr.py / run_eval.mjs all read.
Every audio file and transcript is named from the plan, so re-running any step only fills gaps.
"""
import hashlib
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
# Overridable so other corpora (e.g. the voice-kit apps) reuse the same audio pipeline and caches:
#   HARNESS_CASES=corpus/kit/_all.jsonl HARNESS_PLAN=plan_kit.json HARNESS_TIERS=base python common.py
CASES = os.path.join(HERE, os.environ.get("HARNESS_CASES") or os.path.join("corpus", "cases.jsonl"))
PLAN = os.path.join(HERE, os.environ.get("HARNESS_PLAN") or "plan.json")
TIERS = set((os.environ.get("HARNESS_TIERS") or "base,noise,rate,auto").split(","))
AUDIO = os.path.join(HERE, "audio")
CLEAN_DIR = os.path.join(AUDIO, "clean")
NOISY_DIR = os.path.join(AUDIO, "noisy")
BABBLE_DIR = os.path.join(AUDIO, "babble")
TRANSCRIPTS = os.path.join(HERE, "transcripts")

VOICES = {
    "hi": ["hi-IN-MadhurNeural", "hi-IN-SwaraNeural"],
    "en": ["en-IN-NeerjaNeural", "en-IN-PrabhatNeural", "en-IN-NeerjaExpressiveNeural"],
    "bn": ["bn-IN-BashkarNeural", "bn-IN-TanishaaNeural"],
    "ta": ["ta-IN-PallaviNeural", "ta-IN-ValluvarNeural"],
    "te": ["te-IN-MohanNeural", "te-IN-ShrutiNeural"],
    "mr": ["mr-IN-AarohiNeural", "mr-IN-ManoharNeural"],
    "kn": ["kn-IN-GaganNeural", "kn-IN-SapnaNeural"],
}
# Unseen speakers (tiers "unseen" / "unseen_noise", opt-in): Azure multilingual voices that read all 7 languages
# (voiceprobe.py, 28 Nov). Never used for tuning; foreign-accented, so a harder test than a new Indian voice.
# Each case gets one male + one female, alternating pairs.
UNSEEN_PAIRS = [("fr-FR-RemyMultilingualNeural", "fr-FR-VivienneMultilingualNeural"),
                ("it-IT-GiuseppeMultilingualNeural", "pt-BR-ThalitaMultilingualNeural")]
RATES = {"r0": "+0%", "rm15": "-15%", "rp15": "+15%"}
NOISES = ["pink", "babble", "traffic"]
SNRS = [15, 5]
AUTO_EVERY = 4          # every 4th case per language is also transcribed with language auto-detect


def short_voice(v):
    return v.split("-")[2].replace("Neural", "")


def load_cases():
    with open(CASES, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def _h(s):
    return int(hashlib.md5(s.encode("utf-8")).hexdigest(), 16)


def build_plan(cases):
    """clips: clean TTS renders. audios: everything fed to ASR (clean or noisy).
    jobs: one ASR request each (audio + language token)."""
    clips, audios, jobs = {}, {}, []

    def clip(case, voice, rate):
        cid = f"{case['id']}__{short_voice(voice)}__{rate}"
        clips.setdefault(cid, {"clip": cid, "case": case["id"], "lang": case["lang"], "voice": voice, "rate": rate})
        return cid

    def audio(cid, noise=None, snr=None):
        aid = cid if noise is None else f"{cid}__{noise}{snr}"
        audios.setdefault(aid, {"audio": aid, "clip": cid, "noise": noise or "clean", "snr": snr})
        return aid

    def job(aid, case, tier, auto=False):
        tok = "auto" if auto else case["lang"]
        jobs.append({"tid": f"{aid}__{tok}", "audio": aid, "case": case["id"], "lang": case["lang"],
                     "asr_lang": "" if auto else f"<|{case['lang']}|>", "tier": tier})

    per_lang = {}
    for case in cases:
        n = per_lang[case["lang"]] = per_lang.get(case["lang"], -1) + 1
        vs = VOICES[case["lang"]]
        k = _h(case["id"])
        # tier base: every voice of the language, normal rate, clean
        for v in vs:
            job(audio(clip(case, v, "r0")), case, "base")
        # tier noise: one voice, normal rate, one noise type (rotated) at 15 dB and 5 dB
        v_noise = vs[(k >> 5) % len(vs)]
        noise = NOISES[(k >> 7) % len(NOISES)]
        for snr in SNRS:
            job(audio(clip(case, v_noise, "r0"), noise, snr), case, "noise")
        # tier rate: one voice at -15% or +15%
        v_rate = vs[(k >> 9) % len(vs)]
        rate = "rm15" if (k >> 11) % 2 else "rp15"
        job(audio(clip(case, v_rate, rate)), case, "rate")
        # tier unseen: two voices never used for tuning, clean; tier unseen_noise: one of them at 15 and 5 dB
        pair = UNSEEN_PAIRS[n % len(UNSEEN_PAIRS)]
        for v in pair:
            job(audio(clip(case, v, "r0")), case, "unseen")
        u_noise = pair[(k >> 13) % 2]
        for snr in SNRS:
            job(audio(clip(case, u_noise, "r0"), NOISES[(k >> 15) % len(NOISES)], snr), case, "unseen_noise")
        # tier auto: language auto-detect on a subset of clean base clips
        if n % AUTO_EVERY == 0:
            job(audio(clip(case, vs[0], "r0")), case, "auto", auto=True)
    order = {"base": 0, "noise": 1, "rate": 2, "auto": 3, "unseen": 4, "unseen_noise": 5}
    jobs = [j for j in jobs if j["tier"] in TIERS]
    used = {j["audio"] for j in jobs}
    audios = {k: v for k, v in audios.items() if k in used}
    clips = {k: v for k, v in clips.items() if k in {a["clip"] for a in audios.values()}}
    jobs.sort(key=lambda j: order[j["tier"]])
    return {"clips": list(clips.values()), "audios": list(audios.values()), "jobs": jobs}


def clean_path(cid):
    return os.path.join(CLEAN_DIR, cid + ".wav")


def audio_path(a):
    return clean_path(a["clip"]) if a["noise"] == "clean" else os.path.join(NOISY_DIR, a["audio"] + ".wav")


def transcript_path(tid):
    return os.path.join(TRANSCRIPTS, tid + ".json")


def write_plan():
    plan = build_plan(load_cases())
    with open(PLAN, "w", encoding="utf-8") as fh:
        json.dump(plan, fh, ensure_ascii=False, indent=1)
    return plan


if __name__ == "__main__":
    p = write_plan()
    tiers = {}
    for j in p["jobs"]:
        tiers[j["tier"]] = tiers.get(j["tier"], 0) + 1
    print(f"plan.json: {len(p['clips'])} TTS clips, {len(p['audios'])} audio files, {len(p['jobs'])} ASR jobs {tiers}")
