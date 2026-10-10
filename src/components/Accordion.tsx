import { useId, useState } from 'react';
import type { ReactNode } from 'react';

/** Height-animated disclosure using grid-template-rows, so no height has
 *  to be measured in JavaScript. Closed panels are `inert`, which keeps
 *  their links out of the tab order without removing the transition. */
export function AccordionItem({
  title, children, defaultOpen = false,
}: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const btnId = useId();

  return (
    <div className="acc__item">
      <button
        id={btnId}
        className="acc__btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span className="acc__sign" aria-hidden="true" />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`acc__panel ${open ? 'is-open' : ''}`}
        inert={!open}
      >
        <div className="acc__clip">
          <div className="acc__inner">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="acc">{children}</div>;
}
