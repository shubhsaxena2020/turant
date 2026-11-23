/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Tiny hand-written service-worker plugin: emits sw.js with the full list of
// built files so the app shell, translations and extraction rules are cached
// on the very first visit (works offline afterwards).
function serviceWorker(): Plugin {
  return {
    name: 'turant-sw',
    apply: 'build',
    generateBundle(_opts, bundle) {
      // Large files (the in-page Whisper runtime, loaded only when needed) stay out of the install-time cache.
      const size = (f: string) => {
        const o = bundle[f] as { code?: string; source?: string | Uint8Array };
        return o.code?.length ?? (typeof o.source === 'string' ? o.source.length : o.source?.byteLength ?? 0);
      };
      const files = Object.keys(bundle).filter((f) => !f.endsWith('.map') && size(f) < 1_000_000);
      const template = readFileSync(fileURLToPath(new URL('./src/sw-template.js', import.meta.url)), 'utf8');
      const precache = ['./', ...files.map((f) => './' + f), './manifest.webmanifest', './icon.svg'];
      const source = template
        .replace('__CACHE_NAME__', 'turant-' + Date.now().toString(36))
        .replace('__PRECACHE__', JSON.stringify(precache));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), serviceWorker()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
