"""Build the pitch deck PDF from deck/DECK.md (the text is the source of truth; judges read the text).

    python deck/build_deck.py          # writes deck/deck.html and deck/Turant-pitch-deck.pdf

Each "## Slide N: Title" section becomes one 16:9 page in the app's visual style (cream paper, EB Garamond
headings, Figtree body). Long slides shrink their text until they fit. Printed with Chromium (Playwright), so
the PDF keeps real, selectable text.
"""
import os
import re
import sys

import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "DECK.md")
HTML = os.path.join(HERE, "deck.html")
PDF = os.path.join(HERE, "Turant-pitch-deck.pdf")

CSS = """
@page { size: 1280px 720px; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #FFFFEB; }
body { font-family: Figtree, Arial, sans-serif; color: #1A1A1A; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.slide { width: 1280px; height: 720px; padding: 52px 72px 44px; position: relative; overflow: hidden; page-break-after: always; background: #FFFFEB; display: flex; flex-direction: column; }
.slide:last-child { page-break-after: auto; }
.eyebrow { font-size: 14px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: rgba(26,26,26,.6); }
h1 { font-family: 'EB Garamond', Georgia, serif; font-weight: 400; font-size: 46px; line-height: 1.05; letter-spacing: -.02em; margin: 10px 0 18px; }
.body { flex: 1; overflow: hidden; font-size: var(--fs, 21px); line-height: 1.42; }
.body p { margin: 0 0 .55em; }
.body ul, .body ol { margin: 0 0 .5em; padding-left: 1.2em; }
.body li { margin: 0 0 .32em; }
.body li > ul { margin-top: .3em; }
.body strong { font-weight: 700; box-shadow: inset 0 -0.42em 0 rgba(240,215,255,.95); -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.body table { border-collapse: collapse; width: 100%; margin: .2em 0 .7em; font-size: .86em; }
.body th { text-align: left; font-weight: 600; border-bottom: 1.6px solid #1A1A1A; padding: 6px 10px 6px 0; }
.body td { border-bottom: 1px solid #E4E3CC; padding: 6px 10px 6px 0; vertical-align: top; }
.body code { font-family: 'JetBrains Mono', Consolas, monospace; font-size: .85em; background: #F4F2DA; padding: 0 4px; border-radius: 4px; }
.foot { position: absolute; left: 72px; right: 72px; bottom: 18px; display: flex; justify-content: space-between; font-size: 12px; color: rgba(26,26,26,.5); }
.mark { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: #1A1A1A; }
.mark svg { height: 14px; }
.title { justify-content: center; }
.title h1 { font-size: 84px; margin: 14px 0 6px; }
.title .tag { font-family: 'EB Garamond', Georgia, serif; font-style: italic; font-size: 40px; line-height: 1.1; margin-bottom: 28px; }
.title .body { flex: none; font-size: 21px; }
.band { position: absolute; right: 56px; top: 56px; width: 300px; padding: 22px 24px; border-radius: 24px; background: #034F46; color: #FFFFEB; font-size: 17px; line-height: 1.4; }
.band b { font-family: 'EB Garamond', Georgia, serif; font-weight: 400; font-size: 30px; display: block; line-height: 1.05; margin-bottom: 8px; }
"""

MARK = ('<svg viewBox="0 0 44 24"><rect width="44" height="24" rx="12" fill="#1A1A1A"/>'
        '<rect x="10" y="9" width="3" height="6" rx="1.5" fill="#F0D7FF"/><rect x="16" y="6" width="3" height="12" rx="1.5" fill="#F0D7FF"/>'
        '<rect x="22" y="4" width="3" height="16" rx="1.5" fill="#FFBCF2"/><rect x="28" y="7" width="3" height="10" rx="1.5" fill="#FFA946"/>'
        '<rect x="34" y="10" width="3" height="4" rx="1.5" fill="#F0D7FF"/></svg>')

FIT_JS = """
document.querySelectorAll('.slide .body').forEach(b => {
  let fs = parseFloat(getComputedStyle(b).fontSize);
  while (b.scrollHeight > b.clientHeight + 1 && fs > 12) { fs -= 0.5; b.style.setProperty('--fs', fs + 'px'); }
});
"""


def slides(md_text):
    parts = re.split(r"^## Slide (\d+): (.+)$", md_text, flags=re.M)
    out = []
    for i in range(1, len(parts), 3):
        # DECK.md nests lists with 2 spaces; Python-Markdown needs 4
        body = re.sub(r"^((?:  )+)(?=[-*] |\d+\. )", lambda m: "    " * (len(m.group(1)) // 2), parts[i + 2].strip(), flags=re.M)
        # a list right after a paragraph line needs a blank line before it
        lines = body.split("\n")
        fixed = []
        for ln in lines:
            is_item = re.match(r"\s*([-*]|\d+\.) ", ln)
            prev = fixed[-1] if fixed else ""
            if is_item and prev.strip() and not re.match(r"\s*([-*]|\d+\.) ", prev):
                fixed.append("")
            fixed.append(ln)
        out.append((int(parts[i]), parts[i + 1].strip(), "\n".join(fixed)))
    return out


def build():
    deck = slides(open(SRC, encoding="utf-8").read())
    n = len(deck)
    pages = []
    for num, title, body in deck:
        html_body = markdown.markdown(body, extensions=["tables", "sane_lists"])
        foot = f'<div class="foot"><span class="mark">{MARK} Turant</span><span>Build for Bharat 2026 · {num} / {n}</span></div>'
        if num == 1:
            # Title slide: the bold first line becomes the tagline, the rest the body.
            m = re.match(r"\*\*(.+?)\*\*\s*(.*)", body, flags=re.S)
            tag, rest = (m.group(1), m.group(2)) if m else ("", body)
            band = ('<div class="band"><b>Speak. Get a complete complaint.</b>7 Indian languages, on the phone, '
                    'no account. A 1930 call script and the cybercrime.gov.in text, in minutes.</div>')
            pages.append(f'<section class="slide title"><div class="eyebrow">Build for Bharat 2026 · Public infrastructure and civic services</div>'
                         f'<h1>{title}</h1><div class="tag">{tag}</div><div class="body">{markdown.markdown(rest, extensions=["tables"])}</div>{band}{foot}</section>')
            continue
        pages.append(f'<section class="slide"><div class="eyebrow">Turant · {num:02d}</div><h1>{title}</h1>'
                     f'<div class="body">{html_body}</div>{foot}</section>')
    html = ('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Turant: pitch deck</title>'
            '<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet">'
            f'<style>{CSS}</style></head><body>{"".join(pages)}<script>{FIT_JS}</script></body></html>')
    open(HTML, "w", encoding="utf-8").write(html)
    return n


def print_pdf():
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1280, "height": 720})
        pg.goto("file:///" + HTML.replace("\\", "/"))
        pg.wait_for_load_state("networkidle")
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(800)
        pg.evaluate(FIT_JS)
        pg.pdf(path=PDF, width="1280px", height="720px", print_background=True, prefer_css_page_size=True)
        shots = os.path.join(HERE, "preview")
        os.makedirs(shots, exist_ok=True)
        for i, el in enumerate(pg.query_selector_all(".slide"), 1):
            el.screenshot(path=os.path.join(shots, f"slide-{i:02d}.png"))
        b.close()


if __name__ == "__main__":
    count = build()
    print(f"{count} slides -> {HTML}")
    if "--html-only" not in sys.argv:
        print_pdf()
        print(f"PDF: {PDF} ({os.path.getsize(PDF) / 1e6:.2f} MB)")
