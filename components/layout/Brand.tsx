import { XTSLogo } from '@/components/icons';

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup ${footer ? 'brand-lockup-footer' : ''}`}>
      <XTSLogo className="brand-mark" />
      <span className="brand-wordmark"><strong>XTS</strong><span>MECHATRONICS</span></span>
    </span>
  );
}
