import { XTSLogo } from '@/components/icons';

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup ${footer ? 'brand-lockup-footer' : ''}`}>
      <span className="brand-symbol" aria-hidden="true"><XTSLogo className="brand-mark" /></span>
      <strong className="brand-name">XTS</strong>
      <span className="brand-department">Mechatronics</span>
    </span>
  );
}
