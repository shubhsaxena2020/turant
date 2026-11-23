/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E8',
        card: '#FFFDF8',
        ink: { DEFAULT: '#12284A', soft: '#475670', faint: '#7C8798' },
        line: '#DCD3C1',
        saffron: { DEFAULT: '#E8772E', dark: '#B9561A', soft: '#FCEBDD' },
        leaf: { DEFAULT: '#13805A', dark: '#0B5E41', soft: '#E1F2EA' },
        alarm: { DEFAULT: '#B42318', dark: '#8A1A12', soft: '#FDECEA' },
        amberx: { DEFAULT: '#B7791F', soft: '#FDF3DC' },
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Segoe UI"', 'Roboto', '"Nirmala UI"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"Cascadia Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        stamp: '0 2px 0 0 #12284A',
        lift: '0 10px 30px -12px rgba(18,40,74,0.35)',
      },
    },
  },
  plugins: [],
};
