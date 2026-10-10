import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { IconArrow } from './Icons';

type Variant = 'solid' | 'outline' | 'light' | 'ghost';

const cls = (v: Variant, size?: 'sm' | 'lg', block?: boolean, extra?: string) =>
  ['btn', v !== 'solid' && `btn--${v}`, size && `btn--${size}`, block && 'btn--block', extra]
    .filter(Boolean).join(' ');

export function Btn({
  children, variant = 'solid', size, block, onClick, disabled, type = 'button', className, arrow,
}: {
  children: ReactNode; variant?: Variant; size?: 'sm' | 'lg'; block?: boolean;
  onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit'; className?: string; arrow?: boolean;
}) {
  return (
    <button type={type} className={cls(variant, size, block, className)} onClick={onClick} disabled={disabled}>
      {children}{arrow && <IconArrow />}
    </button>
  );
}

export function BtnLink({
  children, to, variant = 'solid', size, block, className, arrow, onClick,
}: {
  children: ReactNode; to: string; variant?: Variant; size?: 'sm' | 'lg';
  block?: boolean; className?: string; arrow?: boolean; onClick?: () => void;
}) {
  return (
    <Link to={to} className={cls(variant, size, block, className)} onClick={onClick}>
      {children}{arrow && <IconArrow />}
    </Link>
  );
}

/** Label plus a rule that extends on hover. The quieter call to action. */
export function Cta({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="cta">
      <span>{children}</span>
      <span className="cta__rule" aria-hidden="true" />
    </Link>
  );
}
