// Palette tokens stay fixed (paper, ink, amber, ok, stop); a config may override the
// action colour (teal), the night-band accent (mint) and the night band itself.
import type { DomainConfig } from '../domain/types';

const DEFAULTS = { primary: '#0E5C63', accent: '#8FD6C6', night: '#13233A' };

function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const mix = (c: [number, number, number], to: number, t: number) => c.map((x) => Math.round(x + (to - x) * t)) as [number, number, number];
const css = (c: [number, number, number]) => c.join(' ');

/** CSS variables for a theme (space-separated RGB, for Tailwind's alpha syntax). */
export function themeVars(theme: DomainConfig['theme'] = {}): Record<string, string> {
  const p = rgb(theme.primary ?? DEFAULTS.primary);
  const a = rgb(theme.accent ?? DEFAULTS.accent);
  const n = rgb(theme.night ?? DEFAULTS.night);
  return {
    '--teal': css(p),
    '--teal-deep': css(mix(p, 0, 0.25)),
    '--teal-wash': css(mix(p, 255, 0.84)),
    '--mint': css(a),
    '--mint-light': css(mix(a, 255, 0.55)),
    '--mint-deep': css(mix(a, 0, 0.32)),
    '--night': css(n),
    '--night-deep': css(mix(n, 0, 0.35)),
  };
}

export function applyTheme(theme: DomainConfig['theme']): string {
  const vars = themeVars(theme);
  for (const [k, v] of Object.entries(vars)) document.documentElement.style.setProperty(k, v);
  return theme?.night ?? DEFAULTS.night;
}
