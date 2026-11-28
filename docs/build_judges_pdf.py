"""Render JUDGES.md as a one-page A4 PDF (docs/Turant-judges-guide.pdf). Needs Python-Markdown and Playwright.
    python docs/build_judges_pdf.py"""
import os
import markdown
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "JUDGES.md")
PDF = os.path.join(HERE, "Turant-judges-guide.pdf")
CSS = """
@page { size: A4; margin: 11mm 13mm; }
body { font-family: Figtree, Arial, sans-serif; font-size: 9.6pt; line-height: 1.38; color: #1A1A1A; }
h1 { font-size: 17pt; margin: 0 0 4pt; font-family: Georgia, serif; font-weight: 500; }
h2 { font-size: 11pt; margin: 9pt 0 3pt; border-bottom: 1px solid #ddd; padding-bottom: 2pt; }
p, li { margin: 2pt 0; } ul, ol { margin: 2pt 0; padding-left: 15pt; }
table { border-collapse: collapse; width: 100%; font-size: 8.8pt; margin: 3pt 0; }
th, td { border: 1px solid #d8d8d8; padding: 3pt 4pt; vertical-align: top; text-align: left; }
th { background: #f3ecfb; }
td:first-child { white-space: nowrap; }
em { font-style: normal; color: #333; }
"""

def main():
    body = markdown.markdown(open(SRC, encoding="utf-8").read(), extensions=["tables", "sane_lists"])
    html = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{body}</body></html>"
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.set_content(html, wait_until="networkidle")
        pg.pdf(path=PDF, format="A4", print_background=True, prefer_css_page_size=True)
        b.close()
    print(f"PDF: {PDF} ({os.path.getsize(PDF) / 1e3:.0f} kB)")

if __name__ == "__main__":
    main()
