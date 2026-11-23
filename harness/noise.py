"""Mix clean clips with synthetic noise at a target SNR (numpy only, deterministic per file).

Noise types:
  pink    - 1/f noise (fan, hiss, room tone)
  babble  - 4-6 overlapping TTS voices of unrelated sentences (crowd / bus / market)
  traffic - low-frequency rumble (brown noise < 250 Hz, slow swells, engine hum) plus an occasional horn
SNR is measured against the active-speech power of the clean clip (frames within 35 dB of the loudest).

  python noise.py   # renders every noisy file in plan.json that is missing
"""
import glob
import hashlib
import json
import os
import wave

import numpy as np

from common import BABBLE_DIR, NOISY_DIR, PLAN, audio_path, clean_path

SR = 16000


def read_wav(path):
    with wave.open(path, "rb") as w:
        assert w.getframerate() == SR and w.getnchannels() == 1 and w.getsampwidth() == 2, path
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0


def write_wav(path, x):
    tmp = path + ".tmp"
    with wave.open(tmp, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
    os.replace(tmp, path)


def rng_for(name):
    return np.random.default_rng(int(hashlib.md5(name.encode()).hexdigest()[:8], 16))


def spectral_shape(n, rng, gain_fn):
    spec = np.fft.rfft(rng.standard_normal(n))
    f = np.fft.rfftfreq(n, 1 / SR)
    spec *= gain_fn(np.maximum(f, 1.0))
    return np.fft.irfft(spec, n)


def pink(n, rng):
    return spectral_shape(n, rng, lambda f: 1 / np.sqrt(f) * (f > 20))


def traffic(n, rng):
    t = np.arange(n) / SR
    rumble = spectral_shape(n, rng, lambda f: (1 / f) * (f > 15) * (f < 250))
    rumble /= np.std(rumble) + 1e-9
    swell = 0.6 + 0.4 * np.sin(2 * np.pi * rng.uniform(0.1, 0.3) * t + rng.uniform(0, 6.28))   # passing vehicles
    f0 = rng.uniform(45, 90)
    hum = 0.35 * np.sin(2 * np.pi * f0 * t + 0.8 * np.sin(2 * np.pi * 0.5 * t)) + 0.15 * np.sin(4 * np.pi * f0 * t)
    x = rumble * swell + hum
    if n > SR * 2 and rng.random() < 0.8:                    # one horn somewhere in the clip
        start = int(rng.uniform(0.1, 0.8) * n)
        L = min(int(SR * rng.uniform(0.3, 0.7)), n - start)
        th = np.arange(L) / SR
        hf = rng.uniform(380, 480)
        horn = np.sign(np.sin(2 * np.pi * hf * th)) * 0.5 + np.sign(np.sin(2 * np.pi * hf * 1.26 * th)) * 0.5
        env = np.minimum(1, np.minimum(th, th[::-1]) / 0.03)
        x[start:start + L] += 0.9 * horn * env
    return x


_BABBLE = None


def babble(n, rng):
    global _BABBLE
    if _BABBLE is None:
        _BABBLE = [read_wav(p) for p in sorted(glob.glob(os.path.join(BABBLE_DIR, "*.wav")))]
        if not _BABBLE:
            raise SystemExit("no babble sources: run tts.py first")
    x = np.zeros(n, dtype=np.float32)
    for idx in rng.choice(len(_BABBLE), size=int(rng.integers(4, 7)), replace=False):
        src = _BABBLE[idx]
        src = src / (np.std(src) + 1e-9)
        loop = np.tile(src, int(np.ceil((n + len(src)) / len(src))))
        off = int(rng.integers(0, len(src)))
        x += loop[off:off + n] * rng.uniform(0.5, 1.0)
    return x


GENERATORS = {"pink": pink, "babble": babble, "traffic": traffic}


def speech_power(x):
    frame = 400
    k = len(x) // frame
    p = (x[:k * frame].reshape(k, frame) ** 2).mean(axis=1)
    active = p[p > p.max() * 10 ** (-35 / 10)]
    return float(active.mean()) if active.size else float((x ** 2).mean())


def mix(clean, kind, snr, rng):
    n = len(clean)
    noise = GENERATORS[kind](n, rng).astype(np.float32)
    noise -= noise.mean()
    ps, pn = speech_power(clean), float((noise ** 2).mean()) + 1e-12
    noise *= np.sqrt(ps / (pn * 10 ** (snr / 10)))
    out = clean + noise
    peak = np.abs(out).max()
    return out * (0.97 / peak) if peak > 0.97 else out


def main():
    os.makedirs(NOISY_DIR, exist_ok=True)
    plan = json.load(open(PLAN, encoding="utf-8"))
    todo = [a for a in plan["audios"] if a["noise"] != "clean" and not os.path.exists(audio_path(a))]
    print(f"{sum(a['noise'] != 'clean' for a in plan['audios'])} noisy files in plan, {len(todo)} to render")
    made = missing = 0
    for a in todo:
        src = clean_path(a["clip"])
        if not os.path.exists(src):
            missing += 1
            continue
        write_wav(audio_path(a), mix(read_wav(src), a["noise"], a["snr"], rng_for(a["audio"])))
        made += 1
    print(f"noise done: {made} written, {missing} skipped (clean clip missing)")


if __name__ == "__main__":
    main()
