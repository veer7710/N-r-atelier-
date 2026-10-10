import { useState } from 'react';
import { Crumbs, Eyebrow, usePageMeta } from '../components/Page';
import { Btn } from '../components/Btn';

/* The form is interactive so the interaction can be reviewed, but it is
   wired to nothing: no network request, no storage, no analytics. The
   notice above it asks people not to enter real details, and state is
   discarded on submit. */
export function Contact() {
  usePageMeta('Contact', 'How to reach NŌR ATELIER while the brand is in development. No contact details have been set up yet.');

  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <section className="shell phead">
        <Crumbs trail={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <div className="phead__grid" style={{ marginTop: '1.5rem' }}>
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display-l">Get in touch.</h1>
          </div>
          <p className="body">
            There is no customer service inbox yet, because there are no customers and no
            products. If you are a manufacturer, a laboratory, a stockist or a photographer,
            the most useful thing you can tell us is what we have got wrong.
          </p>
        </div>
      </section>

      <section className="shell section section--flush-t">
        <div className="doc">
          <aside className="doc__aside">
            <p className="label" style={{ marginBottom: '0.9rem' }}>Where we are</p>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.9rem' }}>
              <li>
                <p className="micro" style={{ color: 'var(--c-espresso)' }}>Email</p>
                <p className="micro">Not yet set up</p>
              </li>
              <li>
                <p className="micro" style={{ color: 'var(--c-espresso)' }}>Instagram</p>
                <p className="micro">Not yet created</p>
              </li>
              <li>
                <p className="micro" style={{ color: 'var(--c-espresso)' }}>Registered address</p>
                <p className="micro">No company registered</p>
              </li>
              <li>
                <p className="micro" style={{ color: 'var(--c-espresso)' }}>Responsible Person</p>
                <p className="micro">Not appointed</p>
              </li>
            </ul>
            <p className="micro" style={{ marginTop: '1.25rem' }}>
              None of the above is placeholder text for details that exist. They do not exist yet.
            </p>
          </aside>

          <div className="doc__body">
            <p className="notice notice--inline" style={{ marginBottom: 'var(--s-5)' }}>
              <strong style={{ color: 'var(--c-oxblood)', fontWeight: 600 }}>Please do not enter real personal details. </strong>
              This form is part of a design prototype. It is connected to nothing — no server,
              no inbox, no storage, no analytics. Whatever you type is discarded when you leave
              the page.
            </p>

            {sent ? (
              <div style={{ padding: 'var(--s-5)', border: '1px solid var(--c-line)', background: 'var(--c-cream)' }}>
                <span className="macron" aria-hidden="true" />
                <p className="display-s" style={{ marginTop: '1rem' }}>Nothing was sent.</p>
                <p className="body" style={{ marginTop: '0.6rem', fontSize: 'var(--t-body-s)' }}>
                  That is the correct behaviour. The form has no destination, so the fields were
                  simply cleared. When a real inbox exists, this is where the confirmation would go.
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                  <Btn variant="outline" size="sm" onClick={() => setSent(false)}>Show the form again</Btn>
                </div>
              </div>
            ) : (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setForm({ name: '', email: '', subject: 'general', message: '' });
                  setSent(true);
                }}
              >
                <div className="form__row">
                  <div className="field">
                    <label className="field__label" htmlFor="c-name">Name</label>
                    <input id="c-name" className="field__input" value={form.name} onChange={set('name')} autoComplete="off" />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="c-email">Email</label>
                    <input id="c-email" className="field__input" type="email" value={form.email} onChange={set('email')} autoComplete="off" />
                    <p className="field__hint" id="c-email-hint">Use something fake. Nothing is stored or sent.</p>
                  </div>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="c-subject">What is this about</label>
                  <select id="c-subject" className="field__select" value={form.subject} onChange={set('subject')}>
                    <option value="general">General</option>
                    <option value="manufacturing">Manufacturing or formulation</option>
                    <option value="stockist">Stockist or retail</option>
                    <option value="press">Press or creator</option>
                    <option value="feedback">Feedback on the design</option>
                  </select>
                </div>
                <div className="field">
                  <label className="field__label" htmlFor="c-message">Message</label>
                  <textarea id="c-message" className="field__area" value={form.message} onChange={set('message')} />
                </div>
                <div>
                  <Btn type="submit">Send — goes nowhere</Btn>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
