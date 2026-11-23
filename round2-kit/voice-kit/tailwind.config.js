/** @type {import('tailwindcss').Config} */
// Palette tokens from research/DESIGN_SPEC.md. The action colour (teal) and the
// night-band accent (mint) are CSS variables so a domain config can override the hue.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFCFB', // Wispr sand-50
        ink: '#1A1A1A', // vast-950
        body: '#464544',
        muted: '#71716E',
        hair: '#DEDDD7',
        teal: { DEFAULT: v('teal'), deep: v('teal-deep'), wash: v('teal-wash') },
        night: { DEFAULT: v('night'), deep: v('night-deep'), text: '#FCFCFB', muted: '#B3B2AD' },
        mint: v('mint'),
        sand: '#EEEBE3',
        dawn: { 100: '#FCF7FF', 300: '#F7EBFF', 500: '#F0D7FF', 700: '#A26EC1', 800: '#6C358C' },
        ok: { DEFAULT: '#034F46', field: '#E2F5F2' }, // Wispr fathom
        amber: { DEFAULT: '#7A4B00', field: '#FFF1E3' },
        stop: '#A1271B',
      },
      fontFamily: {
        sans: ['Figtree', '"Noto Sans"', '"Noto Sans Devanagari"', '"Noto Sans Tamil"', '"Noto Sans Bengali"', '"Noto Sans Telugu"', '"Noto Sans Kannada"', '"Nirmala UI"', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Figtree', '"Noto Sans"', '"Noto Sans Devanagari"', '"Nirmala UI"', 'system-ui', 'sans-serif'],
        accent: ['"EB Garamond"', '"Tiro Devanagari Hindi"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', '"Tiro Devanagari Hindi"', '"Noto Serif"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
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
