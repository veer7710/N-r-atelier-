import { MAX_QTY } from '../context/BagContext';

/** Quantity is clamped at both ends, so an invalid value cannot reach the bag. */
export function QuantityStepper({
  value, onChange, label = 'Quantity', min = 1, max = MAX_QTY,
}: {
  value: number; onChange: (n: number) => void; label?: string; min?: number; max?: number;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button" className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >−</button>
      <span className="qty__val" aria-live="polite">
        <span className="sr-only">{label}: </span>{value}
      </span>
      <button
        type="button" className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >+</button>
    </div>
  );
}
