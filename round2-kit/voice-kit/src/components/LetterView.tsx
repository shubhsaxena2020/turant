import type { Sentence } from '../lib/letter';

/** The record as sentences: facts emphasised, missing facts as dotted gaps. */
export function LetterView(props: { sentences: Sentence[]; fresh?: string[]; asking?: string; onFact?: (q: string) => void; className?: string }) {
  const { sentences, fresh = [], asking } = props;
  return (
    <div className={props.className} data-testid="letter">
      {sentences.map((s, i) => (
        <p key={i} className="mb-2">
          {s.map((seg, j) => {
            if (seg.kind === 'text') return <span key={j}>{seg.text}</span>;
            if (seg.kind === 'gap') return <span key={j} className={`gap ${seg.q === asking ? 'is-asking' : ''}`} aria-label="…" />;
            if (seg.kind === 'later')
              return (
                <span key={j} className="opacity-70 italic">
                  {seg.text}
                </span>
              );
            const isNew = seg.fields.some((f) => fresh.includes(f));
            return props.onFact ? (
              <button key={`${j}-${seg.text}`} className={`fact ${isNew ? 'is-new' : ''} text-left`} onClick={() => props.onFact!(seg.q)}>
                {seg.text}
              </button>
            ) : (
              <span key={`${j}-${seg.text}`} className={`fact ${isNew ? 'is-new' : ''}`}>
                {seg.text}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
