// Every src/apps/<id>/config.ts is picked up automatically. Choose one with
// ?app=<id> in the URL, or VITE_APP=<id> at build time (default: the first one,
// or VITE_APP). A scaffolded app (scripts/new-app.mjs) sets VITE_APP in .env.
import type { DomainConfig } from './types';

const modules = import.meta.glob<{ default: DomainConfig }>('../apps/*/config.ts', { eager: true });

export const APPS: Record<string, DomainConfig> = Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => !path.includes('/_'))
    .map(([, m]) => [m.default.id, m.default]),
);

export function pickApp(search: string = typeof location === 'undefined' ? '' : location.search): DomainConfig {
  const fromUrl = new URLSearchParams(search).get('app');
  const fromEnv = import.meta.env?.VITE_APP as string | undefined;
  return APPS[fromUrl ?? ''] ?? APPS[fromEnv ?? ''] ?? APPS.fraud ?? Object.values(APPS)[0];
}
