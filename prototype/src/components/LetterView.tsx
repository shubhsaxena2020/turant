import type { Sentence } from '../lib/letter';
import type { FieldKey } from '../lib/extract';
import type { QuestionKey } from '../lib/report';

/** The complaint as sentences: facts emphasised, missing facts as dotted gaps. */
export function LetterView(props: {
  sentences: Sentence[];
  fresh?: FieldKey[];
  asking?: QuestionKey;
  onFact?: (q: QuestionKey | 'paymentApp') => void;
  /** what a screen reader says for a gap ("Not known yet") */
  gapLabel?: string;
  className?: string;
}) {
  const { sentences, fresh = [], asking } = props;
  return (
    <div className={props.className} data-testid="letter">
      {sentences.map((s, i) => (
        <p key={i} className="mb-2">
          {s.map((seg, j) => {
            if (seg.kind === 'text') return <span key={j}>{seg.text}</span>;
            if (seg.kind === 'gap')
              return (
                <span key={j} className={`gap ${seg.q === asking ? 'is-asking' : ''}`}>
                  <span className="sr-only">{props.gapLabel ?? '…'}</span>
                </span>
              );
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
