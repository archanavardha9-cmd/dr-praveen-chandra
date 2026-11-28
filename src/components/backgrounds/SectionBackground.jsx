// SectionBackground.jsx – Calm static minimal clinical accent (all particle emitters, radar sweeps, and spinning patterns removed)
import './SectionBackground.css';

export default function SectionBackground({ variant = 'none', className = '' }) {
  if (variant === 'ecg-minimal') {
    return (
      <div className={`sec-bg-layer ${className}`} aria-hidden="true">
        <svg viewBox="0 0 1200 120" className="sec-bg-svg" preserveAspectRatio="none">
          <path
            d="M0,60 L260,60 L282,48 L298,60 L340,60 L354,82 L372,20 L392,96 L410,52 L426,60 L760,60 L782,48 L798,60 L840,60 L854,82 L872,20 L892,96 L910,52 L926,60 L1200,60"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return null;
}
