/** @type {import('tailwindcss').Config} */
// Palette tokens from research/DESIGN_SPEC.md. The action colour (teal) and the
// night-band accent (mint) are CSS variables so a domain config can override the hue.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F2',
        ink: '#1C1B18',
        body: '#45423C',
        muted: '#6B665D',
        hair: '#D9D2C5',
        teal: { DEFAULT: v('teal'), deep: v('teal-deep'), wash: v('teal-wash') },
        night: { DEFAULT: v('night'), deep: v('night-deep'), text: '#F4EFE6', muted: '#A9B7C9' },
        mint: v('mint'),
        sand: '#EFE8DC',
        ok: { DEFAULT: '#1E6B43', field: '#E3EFE6' },
        amber: { DEFAULT: '#7A4B00', field: '#FBEFD5' },
        stop: '#A1271B',
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Noto Sans Devanagari"', '"Noto Sans Tamil"', '"Noto Sans Bengali"', '"Noto Sans Telugu"', '"Noto Sans Kannada"', '"Nirmala UI"', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Mukta', '"Noto Sans"', '"Noto Sans Devanagari"', '"Nirmala UI"', 'system-ui', 'sans-serif'],
        serif: ['"Tiro Devanagari Hindi"', '"Noto Serif"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: ['3rem', { lineHeight: '1.25', fontWeight: '700' }],
        display: ['2rem', { lineHeight: '1.4', fontWeight: '600' }],
        title: ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }],
        lg: ['1.25rem', { lineHeight: '1.7' }],
        base: ['1.125rem', { lineHeight: '1.75' }],
        label: ['1rem', { lineHeight: '1.6', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
};
