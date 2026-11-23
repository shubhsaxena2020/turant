"""Step 3: compose the final demo videos with ffmpeg.

python -I compose.py scenario.json out/
-> out/demo_vertical.mp4 (1080x1920) and out/demo_landscape.mp4 (1920x1080):
phone recording on a calm branded canvas, narration placed at each step's start,
burned-in captions (ASS, Noto Sans so Indic scripts render), title card text.
"""
import json, os, subprocess, sys


def ass_time(ms):
    s, ms = divmod(int(ms), 1000)
    h, s = divmod(s, 3600)
    m, s = divmod(s, 60)
    return f"{h}:{m:02d}:{s:02d}.{ms // 10:02d}"


def write_ass(path, lines, w, h, font_size, margin_v, margin_l, margin_r=None, align=2):
    margin_r = margin_l if margin_r is None else margin_r
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {w}
PlayResY: {h}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Nirmala UI,{font_size},&H00F4EFE6,&H00F4EFE6,&H003A2313,&H803A2313,1,0,0,0,100,100,0,0,3,14,0,{align},{margin_l},{margin_r},{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    with open(path, "w", encoding="utf8") as fh:
        fh.write(head)
        for start, end, text in lines:
            fh.write(f"Dialogue: 0,{ass_time(start)},{ass_time(end)},Cap,,0,0,0,,{text}\n")


def main(scenario_path, out):
    sc = json.load(open(scenario_path, encoding="utf8"))
    timing = json.load(open(os.path.join(out, "timing.json"), encoding="utf8"))
    timeline = json.load(open(os.path.join(out, "timeline.json"), encoding="utf8"))
    total_ms = timeline[-1]["endMs"] + 800
    bg = sc.get("background", "0x13233A")
    title = sc.get("title", "").replace(":", r"\:").replace("'", "")
    caps = []
    audio_inputs, delays = [], []
    for t, tl in zip(timing, timeline):
        if not t["file"]:
            continue
        caps.append((tl["startMs"], tl["startMs"] + t["ms"] + 200, t["text"]))
        audio_inputs += ["-i", t["file"]]
        delays.append(tl["startMs"])

    n = len(delays)
    amix = "".join(f"[{k + 1}:a]adelay={d}|{d},apad[a{k}];" for k, d in enumerate(delays))
    amix += "".join(f"[a{k}]" for k in range(n)) + f"amix=inputs={n}:normalize=0,atrim=0:{total_ms / 1000:.2f},loudnorm=I=-16:TP=-1.5:LRA=11[aout]"

    layouts = {
        # name: (W, H, phone height, phone x, phone y, caption font, caption margin, caption side margin, title y)
        "vertical": (1080, 1920, 1500, "(W-w)/2", 210, 46, 60, 60, 80),
        "landscape": (1920, 1080, 980, "220", "(H-h)/2", 44, 120, 900, 300),
    }
    for name, (W, H, ph, px, py, fs, mv, mlr, ty) in layouts.items():
        tx = '(w-text_w)/2' if name == 'vertical' else '900+(w-900-100-text_w)/2'
        ass = f"caps_{name}.ass"
        if name == "landscape":
            # captions sit to the right of the phone
            # captions sit in the column right of the phone, vertically centred
            write_ass(os.path.join(out, ass), caps, W, H, fs, 0, mlr, 100, align=5)
        else:
            write_ass(os.path.join(out, ass), caps, W, H, fs, mv, mlr)
        vf = (
            f"[0:v]fps=30,scale=-2:{ph}:flags=lanczos,format=yuv420p[ph];"
            f"color=c={bg}:s={W}x{H}:d={total_ms / 1000:.2f}[bg];"
            f"[bg][ph]overlay=x={px}:y={py}:shortest=1[v1];"
            f"[v1]drawtext=text='{title}':fontfile='C\\:/Windows/Fonts/Nirmala.ttc':fontsize=54:fontcolor=0x8FD6C6:x={tx}:y={ty}[v2];"
            f"[v2]subtitles={ass}:fontsdir='C\\:/Windows/Fonts'[vout];"
        )
        cmd = ["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", "frames.txt", *audio_inputs,
               "-filter_complex", vf + amix, "-map", "[vout]", "-map", "[aout]",
               "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-r", "30", "-c:a", "aac", "-b:a", "160k",
               "-movflags", "+faststart", f"demo_{name}.mp4"]
        r = subprocess.run(cmd, cwd=out, capture_output=True, text=True)
        if r.returncode:
            print(name, "FAILED", r.stderr[-1500:])
        else:
            print("wrote", os.path.join(out, f"demo_{name}.mp4"))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
