import { XTSLogo } from '@/components/icons';

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup ${footer ? 'brand-lockup-footer' : ''}`}>
      <span className="brand-symbol" aria-hidden="true"><XTSLogo className="brand-mark" /></span>
      <span className="brand-wordmark">
        <strong>XTS<span className="brand-accent" aria-hidden="true">.</span></strong>
        <span>MECHATRONICS</span>
        {!footer && <span className="brand-signature">Parts · Precision · Possibility</span>}
      </span>
    </span>
  );
}
