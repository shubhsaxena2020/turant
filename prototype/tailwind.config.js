/** @type {import('tailwindcss').Config} */
// Layout rules: research/DESIGN_SPEC.md. Visual tokens: Wispr Flow design language.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // In the style of wisprflow.ai: cream paper, near-black ink,
      // dawn lilac, fathom teal, chord purple. Class names kept so components didn't change.
      colors: {
        paper: '#FFFFEB', // Wispr Flow page cream (wisprflow.ai body)
        ink: '#1A1A1A', // vast-950
        body: '#464544', // vast-800
        muted: '#71716E', // vast-600 (4.6:1 on paper)
        hair: '#E4E3CC', // ink at ~12% on cream
        teal: { DEFAULT: '#1A1A1A', deep: '#000000', wash: '#F7EBFF' }, // action = black pill (Wispr primary), wash = dawn-300
        night: { DEFAULT: '#1A1A1A', deep: '#0F0F0F', text: '#FCFCFB', muted: '#B3B2AD' }, // Flow Bar black
        mint: '#F0D7FF', // dawn-500, the accent on black
        sand: '#F4F2DA', // cream panel (cookie / card surface on wisprflow.ai)
        dawn: { 100: '#FCF7FF', 300: '#F7EBFF', 500: '#F0D7FF', 700: '#A26EC1', 800: '#6C358C' },
        chord: { 500: '#965ACE', 600: '#7232A6' },
        peach: '#FFA946',
        coral: '#FF6C4C',
        blush: '#FFBCF2',
        ok: { DEFAULT: '#034F46', field: '#E2F5F2' }, // fathom: Wispr's deep teal band
        fathom: '#034F46',
        amber: { DEFAULT: '#7A4B00', field: '#FFF1E3' },
        stop: '#A1271B',
      },
      fontFamily: {
        sans: ['Figtree', '"Noto Sans"', '"Noto Sans Devanagari"', '"Noto Sans Tamil"', '"Noto Sans Bengali"', '"Noto Sans Telugu"', '"Noto Sans Kannada"', '"Nirmala UI"', 'system-ui', 'sans-serif'],
        // Headings and big numbers: EB Garamond, like wisprflow.ai ("Don't type, just speak.", "220 wpm").
        display: ['"EB Garamond"', 'Georgia', 'serif'],
        accent: ['"EB Garamond"', '"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', '"Tiro Devanagari Hindi"', '"Noto Serif"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: ['3.25rem', { lineHeight: '1.05', fontWeight: '400', letterSpacing: '-0.02em' }],
        display: ['2.15rem', { lineHeight: '1.1', fontWeight: '400', letterSpacing: '-0.02em' }],
        title: ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        lg: ['1.25rem', { lineHeight: '1.7' }],
        base: ['1.125rem', { lineHeight: '1.75' }],
        label: ['1rem', { lineHeight: '1.6', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
};
