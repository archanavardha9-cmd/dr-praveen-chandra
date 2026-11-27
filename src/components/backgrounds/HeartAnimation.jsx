// HeartAnimation.jsx – High-visibility bright hospital cardiac telemetry & arterial flow visuals
import { useEffect, useRef } from 'react';
import './HeartAnimation.css';

const HERO_NODES = [
  { cx: 140, cy: 130, r: 4 },
  { cx: 260, cy: 95, r: 3.5 },
  { cx: 410, cy: 110, r: 5 },
  { cx: 560, cy: 145, r: 4 },
  { cx: 690, cy: 115, r: 3.5 },
  { cx: 185, cy: 430, r: 4 },
  { cx: 340, cy: 465, r: 3.5 },
  { cx: 520, cy: 440, r: 5 },
  { cx: 675, cy: 410, r: 4 },
];

export default function HeartAnimation({ variant = 'hero', className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.ecg-stroke');
    if (!paths) return;
    paths.forEach((path, i) => {
      const len = path.getTotalLength?.() || 800;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.animation = `clinicalEcgDraw 2.4s ${i * 0.3}s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
    });
  }, []);

  if (variant === 'hero') {
    return (
      <div className={`heart-bg-layer ${className}`} aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 800 560" className="heart-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="clinicalHalo" cx="60%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#005B94" stopOpacity="0.14" />
              <stop offset="50%" stopColor="#0B7A7A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ecgBrightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005B94" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#005B94" stopOpacity="0.65" />
              <stop offset="70%" stopColor="#0B7A7A" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#005B94" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <rect width="800" height="560" fill="url(#clinicalHalo)" />

          {/* High-Visibility Precision Coordinate Rings */}
          <circle cx="520" cy="260" r="190" fill="none" stroke="rgba(0, 91, 148, 0.22)" strokeWidth="1.5" strokeDasharray="8 6" className="spin-slow" />
          <circle cx="520" cy="260" r="255" fill="none" stroke="rgba(11, 122, 122, 0.2)" strokeWidth="1.5" strokeDasharray="4 8" className="spin-reverse" />
          <circle cx="520" cy="260" r="120" fill="none" stroke="rgba(0, 91, 148, 0.26)" strokeWidth="1.2" />

          {/* Continuous Distinct ECG Baseline */}
          <path
            className="ecg-stroke"
            d="M0,310 L140,310 L165,295 L182,310 L215,310 L230,336 L248,225 L268,365 L286,298 L302,310 L355,310 L378,284 L404,310 L510,310 L535,295 L552,310 L585,310 L600,336 L618,225 L638,365 L656,298 L672,310 L800,310"
            fill="none"
            stroke="url(#ecgBrightGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary Telemetry Echo Baseline */}
          <path
            d="M0,314 L140,314 L165,302 L182,314 L215,314 L230,336 L248,245 L268,360 L286,306 L302,314 L355,314 L378,294 L404,314 L510,314 L535,302 L552,314 L585,314 L600,336 L618,245 L638,360 L656,306 L672,314 L800,314"
            fill="none"
            stroke="rgba(11, 122, 122, 0.28)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ambient Geometric Telemetry Nodes with Halos */}
          {HERO_NODES.map((node, idx) => (
            <g key={idx}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 2.4}
                fill="rgba(0, 91, 148, 0.12)"
                className="ambient-node"
                style={{ animationDelay: `${idx * 0.4}s` }}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="rgba(0, 91, 148, 0.45)"
                className="ambient-node"
                style={{ animationDelay: `${idx * 0.4}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return null;
}
