// HeartAnimation.jsx – Minimal, single-draw ECG baseline (zero spinning rings or floating dots)
import { useEffect, useRef } from 'react';
import './HeartAnimation.css';

export default function HeartAnimation({ variant = 'ecg', className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const path = svgRef.current?.querySelector('.ecg-stroke');
    if (!path) return;
    const len = path.getTotalLength?.() || 800;
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.animation = 'clinicalEcgDraw 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  }, []);

  if (variant !== 'ecg') return null;

  return (
    <div className={`heart-bg-layer ${className}`} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 1200 120" className="heart-bg-svg" preserveAspectRatio="none">
        <path
          className="ecg-stroke"
          d="M0,64 L260,64 L282,52 L298,64 L340,64 L354,84 L372,22 L392,98 L410,56 L426,64 L760,64 L782,52 L798,64 L840,64 L854,84 L872,22 L892,98 L910,56 L926,64 L1200,64"
          fill="none"
          stroke="rgba(0, 91, 148, 0.16)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
