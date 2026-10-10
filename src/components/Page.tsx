import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/** Per-route document title and description. There is no meta framework
 *  here, so the title is set directly — and always ends with the brand. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} — NŌR ATELIER`;
    if (!description) return;
    const el = document.querySelector('meta[name="description"]');
    const prev = el?.getAttribute('content') ?? null;
    el?.setAttribute('content', description);
    return () => { if (el && prev !== null) el.setAttribute('content', prev); };
  }, [title, description]);
}

/** Eyebrow: index number, a macron rule, and a label. The house section head. */
export function Eyebrow({ no, children }: { no?: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      {no && <span className="index-no">{no}</span>}
      <span className="macron" aria-hidden="true" />
      <span className="label">{children}</span>
    </p>
  );
}

export function Crumbs({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label}>
          {t.to ? <Link to={t.to} className="link-u">{t.label}</Link> : <span>{t.label}</span>}
          {i < trail.length - 1 && <span aria-hidden="true" style={{ opacity: 0.5, padding: '0 0.3rem' }}>/</span>}
        </span>
      ))}
    </nav>
  );
}

/** Marks prototype content wherever it appears, in the same voice each time. */
export function DraftNote({ children }: { children: ReactNode }) {
  return (
    <p className="notice notice--inline" style={{ marginTop: '1.5rem' }}>
      <strong style={{ color: 'var(--c-oxblood)', fontWeight: 600 }}>Draft. </strong>
      {children}
    </p>
  );
}
