import { useEffect, useState } from 'react';
import type { Report } from '../lib/report';
import { deleteAllReports, loadReports } from '../lib/storage';
import { displayValue } from '../lib/outputs';
import { formatDateTime } from '../lib/format';
import type { UI } from '../ui';

/** Past complaints: a plain list with hairlines. */
export function HistoryScreen(props: { ui: UI; onOpen: (r: Report) => void; onDeleted: () => void }) {
  const { ui } = props;
  const { t } = ui;
  const [list, setList] = useState<Report[] | null>(null);
  useEffect(() => {
    void loadReports().then((all) => setList(all.filter((r) => r.turns.length > 0 || r.status === 'ready')));
  }, []);

  return (
    <main className="flex-1 px-5 pt-4 page-in">
      <h1 className="text-display font-display">{t('pastReports')}</h1>
      <p className="mt-1 text-label text-muted">{t('privacyNote')}</p>
      {list && list.length === 0 ? <p className="mt-8 text-lg text-body">{t('noReports')}</p> : null}
      <div className="rows mt-6">
        {(list ?? []).map((r) => (
          <button key={r.id} className="flex w-full items-center gap-4 py-5 text-left" onClick={() => props.onOpen(r)}>
            <span className="flex-1 min-w-0">
              <span className="block text-title font-display tabular-nums">{displayValue('amount', r.fields, ui.lang) ?? '—'}</span>
              <span className="block text-label text-muted">{formatDateTime(r.updatedAt, ui.lang)}</span>
            </span>
            <span className={`text-label font-semibold ${r.status === 'ready' ? 'text-ok' : 'text-amber'}`}>
              {r.status === 'ready' ? t('statusReady') : t('statusDraft')}
            </span>
          </button>
        ))}
      </div>
      {list && list.length ? (
        <button
          className="link-quiet mt-6 !text-stop"
          onClick={async () => {
            if (!window.confirm(t('deleteConfirm'))) return;
            await deleteAllReports();
            setList([]);
            props.onDeleted();
          }}
        >
          {t('deleteAll')}
        </button>
      ) : null}
    </main>
  );
}
