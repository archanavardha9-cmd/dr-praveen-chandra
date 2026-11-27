// HeartAnimation.jsx – Bright hospital cardiac telemetry & arterial flow visuals
import { useEffect, useRef } from 'react';
import './HeartAnimation.css';

const HERO_NODES = [
  { cx: 140, cy: 130, r: 2.5 },
  { cx: 260, cy: 95, r: 2 },
  { cx: 410, cy: 110, r: 3 },
  { cx: 560, cy: 145, r: 2.5 },
  { cx: 690, cy: 115, r: 2 },
  { cx: 185, cy: 430, r: 2.5 },
  { cx: 340, cy: 465, r: 2 },
  { cx: 520, cy: 440, r: 3 },
  { cx: 675, cy: 410, r: 2.5 },
];

export default function HeartAnimation({ variant = 'hero', className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.ecg-stroke');
    if (!paths) return;
    paths.forEach((path, i) => {
      const len = path.getTotalLength?.() || 600;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.animation = `clinicalEcgDraw 2.6s ${i * 0.35}s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
    });
  }, []);

  if (variant === 'hero') {
    return (
      <div className={`heart-bg-layer ${className}`} aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 800 560" className="heart-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="clinicalHalo" cx="65%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#005B94" stopOpacity="0.08" />
              <stop offset="55%" stopColor="#0B7A7A" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ecgBrightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005B94" stopOpacity="0.06" />
              <stop offset="45%" stopColor="#005B94" stopOpacity="0.28" />
              <stop offset="75%" stopColor="#0B7A7A" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#005B94" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          <rect width="800" height="560" fill="url(#clinicalHalo)" />

          {/* Subtle Precision Coordinate Rings */}
          <circle cx="520" cy="260" r="190" fill="none" stroke="rgba(0, 91, 148, 0.08)" strokeWidth="1" strokeDasharray="6 6" className="spin-slow" />
          <circle cx="520" cy="260" r="245" fill="none" stroke="rgba(11, 122, 122, 0.07)" strokeWidth="1" className="spin-reverse" />

          {/* Continuous Subtle ECG Baseline */}
          <path
            className="ecg-stroke"
            d="M0,310 L140,310 L165,295 L182,310 L215,310 L230,336 L248,225 L268,365 L286,298 L302,310 L355,310 L378,284 L404,310 L510,310 L535,295 L552,310 L585,310 L600,336 L618,225 L638,365 L656,298 L672,310 L800,310"
            fill="none"
            stroke="url(#ecgBrightGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ambient Geometric Nodes */}
          {HERO_NODES.map((node, idx) => (
            <circle
              key={idx}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="rgba(0, 91, 148, 0.18)"
              className="ambient-node"
              style={{ animationDelay: `${idx * 0.45}s` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
