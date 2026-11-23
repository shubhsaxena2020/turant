#!/usr/bin/env node
// Scaffold a new voice-first app from the kit.
//
//   node scripts/new-app.mjs <name> [--from _template|fraud|khata|health|civic] [--out <dir>] [--here] [--no-install]
//
//   (default)  a standalone app folder next to the kit (../<name>), with only the chosen
//              template as src/apps/<name>/config.ts, VITE_APP=<name> in .env, npm install done.
//   --here     just add src/apps/<name>/ inside this kit (run with ?app=<name>).
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const opt = (f, d) => (args.includes(f) ? args[args.indexOf(f) + 1] : d);
const name = args.find((a, i) => !a.startsWith('--') && !['--from', '--out'].includes(args[i - 1]));

if (!name || !/^[a-z][a-z0-9-]{1,30}$/.test(name)) {
  console.error('Usage: node scripts/new-app.mjs <name> [--from _template|fraud|khata|health|civic] [--out <dir>] [--here] [--no-install]');
  console.error('  <name>: lowercase letters, digits, dashes (e.g. "ration-card").');
  process.exit(1);
}
const from = opt('--from', '_template');
const tplDir = join(KIT, 'src', 'apps', from);
if (!existsSync(join(tplDir, 'config.ts'))) {
  console.error(`No template "${from}". Choose one of: ${readdirSync(join(KIT, 'src', 'apps')).filter((d) => existsSync(join(KIT, 'src', 'apps', d, 'config.ts'))).join(', ')}`);
  process.exit(1);
}

/** Copy the template folder as src/apps/<name> inside `root`, renaming its id. */
function writeApp(root) {
  const dest = join(root, 'src', 'apps', name);
  if (existsSync(dest)) {
    console.error(`${dest} already exists.`);
    process.exit(1);
  }
  cpSync(tplDir, dest, { recursive: true, filter: (src) => !src.endsWith('.test.ts') });
  const cfgPath = join(dest, 'config.ts');
  let cfg = readFileSync(cfgPath, 'utf8');
  cfg = cfg.replace("id: '__ID__'", `id: '${name}'`).replace(/id: '[a-z0-9_-]+',/, `id: '${name}',`);
  writeFileSync(cfgPath, cfg);
  writeFileSync(
    join(dest, `${name}.test.ts`),
    `// Starter tests: every sample story and sample answer must be understood by the rules.
import { describe, expect, it } from 'vitest';
import cfg from './config';
import { extractAll, pendingQuestions, questionsOf } from '../../lib/slots';
import { mergeExtraction } from '../../lib/record';
import type { LangCode } from '../../lib/lang';

const NOW = new Date(2026, 10, 27, 12, 0, 0);

describe(cfg.id, () => {
  for (const [lang, story] of Object.entries(cfg.samples.stories) as [LangCode, string][]) {
    it(\`sample story (\${lang}) fills slots; the rest have sample answers\`, () => {
      const ext = extractAll(cfg, story, { now: NOW });
      expect(Object.keys(ext).length).toBeGreaterThan(0);
      const fields = mergeExtraction(cfg, {}, ext, { source: 'voice', mode: 'story' }).fields;
      for (const q of pendingQuestions(cfg, fields)) expect(cfg.samples.answers?.[q], \`sample answer for \${q}\`).toBeTruthy();
    });
  }
  it('sample answers answer their questions', () => {
    for (const q of questionsOf(cfg)) {
      const a = cfg.samples.answers?.[q.key];
      if (!a) continue;
      for (const lang of cfg.languages) {
        const text = typeof a === 'string' ? a : a[lang] ?? a['en-IN'];
        if (!text) continue;
        const ext = extractAll(cfg, text, { now: NOW, hint: q.key });
        expect(q.slots.some((s) => ext[s.key]), \`\${q.key} / \${lang}: "\${text}"\`).toBe(true);
      }
    }
  });
});
`,
  );
  return dest;
}

if (flag('--here')) {
  const dest = writeApp(KIT);
  console.log(`Added ${dest}\nRun: npm run dev, then open http://localhost:5173/?app=${name}`);
  process.exit(0);
}

const out = resolve(opt('--out', join(KIT, '..', name)));
if (existsSync(out) && readdirSync(out).length) {
  console.error(`${out} exists and is not empty.`);
  process.exit(1);
}
mkdirSync(out, { recursive: true });
const SKIP = new Set(['node_modules', 'dist', 'screenshots', '.playwright-mcp', 'preview.log', '.env']);
for (const entry of readdirSync(KIT)) {
  if (SKIP.has(entry)) continue;
  cpSync(join(KIT, entry), join(out, entry), { recursive: true });
}
// Keep only the kit's generic tests; drop the example apps (they live on in the kit).
rmSync(join(out, 'src', 'apps'), { recursive: true, force: true });
for (const t of ['fraud-parity.test.ts', 'kit.test.ts']) rmSync(join(out, 'src', 'lib', t), { force: true });
mkdirSync(join(out, 'src', 'apps'), { recursive: true });
writeApp(out);
// The template folder stays available for reference / a second app.
cpSync(join(KIT, 'src', 'apps', '_template'), join(out, 'src', 'apps', '_template'), { recursive: true });

const pkgPath = join(out, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = name;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
writeFileSync(join(out, '.env'), `# Which app this build serves (src/apps/<id>/config.ts)\nVITE_APP=${name}\n# Optional LLM layer (off unless VITE_LLM=1 or ?llm=1): base URL of round2-kit/llm-api, '' = same origin\n# VITE_LLM=1\n# VITE_LLM_URL=\n`);

if (!flag('--no-install')) {
  console.log('Installing dependencies...');
  const r = spawnSync('npm install --no-audit --no-fund', { cwd: out, stdio: 'inherit', shell: true });
  if (r.status !== 0) console.error('npm install failed; run it yourself in ' + out);
}
console.log(`\nCreated ${out}\n  edit   src/apps/${name}/config.ts\n  run    cd "${out}" && npm run dev\n  test   npm run test\n`);
