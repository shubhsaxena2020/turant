import { useEffect, useState } from 'react';
import type { Report } from '../lib/report';
import { deleteAllReports, loadReports } from '../lib/storage';
import { formatDateTime, formatINR } from '../lib/format';
import { scamLabel } from '../i18n/strings';
import type { ScamType } from '../lib/extract';
import type { UI } from '../ui';

export function ReportsScreen({ ui, onOpen, onDeleted }: { ui: UI; onOpen: (r: Report) => void; onDeleted: () => void }) {
  const [list, setList] = useState<Report[] | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    void loadReports().then((all) => setList(all.filter((r) => r.turns.length > 0 || Object.keys(r.fields).length > 0)));
  }, []);

  return (
    <div className="px-4 pt-5 pb-10 flex flex-col gap-4">
      <h1 className="text-[1.8rem] font-black">{ui.t('reportsTitle')}</h1>
      {list && list.length === 0 ? <p className="paper-card p-5 text-ink-soft font-semibold">{ui.t('noReports')}</p> : null}
      <ul className="flex flex-col gap-3">
        {(list ?? []).map((r) => {
          const ready = r.status === 'ready';
          return (
            <li key={r.id}>
              <button className="paper-card w-full p-4 text-left hover:border-ink" onClick={() => onOpen(r)} data-testid="report-row">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[0.8rem] font-black uppercase tracking-wider ${
                      ready ? 'bg-leaf-soft text-leaf-dark' : 'bg-amberx-soft text-amberx'
                    }`}
                  >
                    {ready ? ui.t('statusReady') : ui.t('statusDraft')}
                  </span>
                  <span className="ml-auto text-[0.85rem] text-ink-faint font-semibold">{ui.t('savedAt', { time: formatDateTime(r.updatedAt, ui.lang) })}</span>
                </div>
                <p className="mt-2 text-[1.35rem] font-black">
                  {r.fields.amount ? formatINR(Number(r.fields.amount.value)) : '—'}
                  <span className="text-[1rem] font-bold text-ink-soft"> · {r.fields.bank ? String(r.fields.bank.value) : ui.t('unknown')}</span>
                </p>
                {r.fields.scamType ? <p className="text-ink-soft font-semibold">{scamLabel(ui.lang, r.fields.scamType.value as ScamType)}</p> : null}
              </button>
            </li>
          );
        })}
      </ul>

      {list && list.length > 0 ? (
        confirming ? (
          <div className="paper-card p-4 border-alarm">
            <p className="font-bold">{ui.t('deleteConfirm')}</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                className="btn bg-alarm text-white"
                onClick={async () => {
                  await deleteAllReports();
                  setList([]);
                  setConfirming(false);
                  onDeleted();
                }}
              >
                {ui.t('deleteAll')}
              </button>
              <button className="btn-ghost" onClick={() => setConfirming(false)}>
                {ui.t('cancel')}
              </button>
            </div>
          </div>
        ) : (
          <button className="btn-quiet self-center !text-alarm" onClick={() => setConfirming(true)}>
            {ui.t('deleteAll')}
          </button>
        )
      ) : null}
      <p className="text-[0.9rem] text-ink-faint text-center leading-snug">{ui.t('privacyNote')}</p>
    </div>
  );
}
