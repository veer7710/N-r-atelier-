import { Link } from 'react-router-dom';
import { useBag } from '../context/BagContext';
import { IconClose } from './Icons';

/** Add-to-bag confirmation. Names the shade back, because the single most
 *  common quiet failure in a shade-based store is adding the wrong one. */
export function Toast() {
  const { lastAdded, dismissToast, open } = useBag();

  return (
    <div
      className={`toast ${lastAdded ? 'is-in' : ''}`}
      role="status"
      aria-live="polite"
      inert={!lastAdded}
    >
      {lastAdded && (
        <>
          <span className="toast__sw" style={{ background: lastAdded.hex }} aria-hidden="true" />
          <span className="toast__txt">
            Added — {lastAdded.name} in <strong style={{ fontWeight: 600 }}>{lastAdded.shade}</strong>
            {lastAdded.qty > 1 && ` × ${lastAdded.qty}`}
          </span>
          <button className="toast__link" onClick={() => { dismissToast(); open(); }}>View bag</button>
          <Link to="/bag" className="sr-only">Go to the bag page</Link>
          <button className="toast__x" onClick={dismissToast} aria-label="Dismiss">
            <IconClose size={13} />
          </button>
        </>
      )}
    </div>
  );
}
