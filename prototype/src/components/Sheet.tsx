import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Bottom sheet: one focused task at a time, close by link or by tapping the dimmed page.
 *  Rendered on <body> so it never inherits the night band's styles; keyboard focus stays inside. */
export function Sheet(props: { title: string; closeLabel: string; onClose: () => void; children: ReactNode; testId?: string }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return props.onClose();
      const box = panel.current;
      if (e.key !== 'Tab' || !box) return;
      const items = [...box.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!box.contains(active) || (e.shiftKey && (active === first || active === box)) || (!e.shiftKey && active === last)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [props]);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    if (panel.current && !panel.current.contains(document.activeElement)) panel.current.focus({ preventScroll: true });
    // Deferred: if Enter closed the sheet, focusing the trigger now would let that same key press it again.
    return () => void window.setTimeout(() => prev?.isConnected && prev.focus({ preventScroll: true }), 0);
  }, []);
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={props.title} data-testid={props.testId}>
      <button className="absolute inset-0 bg-ink/40 fade-in" tabIndex={-1} aria-label={props.closeLabel} onClick={props.onClose} />
      <div ref={panel} tabIndex={-1} className="sheet-in relative w-full max-w-[560px] max-h-[88vh] overflow-y-auto rounded-t-[24px] border-t border-hair bg-paper text-ink px-5 pt-3 pb-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))', outline: 'none' }}>
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-hair" aria-hidden />
        <div className="flex items-start gap-3">
          <h2 className="flex-1 min-w-0 break-words text-title font-display">{props.title}</h2>
          <button className="link-quiet -mt-1 shrink-0" onClick={props.onClose}>
            {props.closeLabel}
          </button>
        </div>
        <div className="mt-2">{props.children}</div>
      </div>
    </div>,
    document.body,
  );
}

/** A tappable row in a hairline list (no box). */
export function Row(props: { onClick: () => void; children: ReactNode; selected?: boolean; testId?: string }) {
  return (
    <button
      onClick={props.onClick}
      data-testid={props.testId}
      className={`flex w-full items-center gap-3 py-4 text-left text-lg font-medium min-h-[3.75rem] ${props.selected ? '-mx-3 rounded-[10px] bg-dawn-300 px-3 font-semibold' : ''}`}
    >
      {props.children}
    </button>
  );
}
