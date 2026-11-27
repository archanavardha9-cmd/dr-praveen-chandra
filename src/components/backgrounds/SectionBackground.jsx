// SectionBackground.jsx – Unique bright clinical SVG backdrops per section
import './SectionBackground.css';

export default function SectionBackground({ variant = 'telemetry-grid', opacity = 0.65, className = '' }) {
  if (variant === 'telemetry-grid') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <div className="clinical-grid-pattern" />
        <div className="clinical-sweep-line" />
      </div>
    );
  }

  if (variant === 'valve-motion') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 900 500" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="720" cy="250" r="175" fill="none" stroke="rgba(0, 91, 148, 0.1)" strokeWidth="1.2" strokeDasharray="8 8" className="valve-ring-rot" />
          <circle cx="720" cy="250" r="125" fill="none" stroke="rgba(11, 122, 122, 0.12)" strokeWidth="1.2" />
          <path
            d="M650,250 Q720,205 790,250 Q720,225 650,250 Z"
            fill="rgba(0, 91, 148, 0.06)"
            stroke="rgba(0, 91, 148, 0.18)"
            strokeWidth="1.2"
          />
          <path
            d="M650,250 Q720,295 790,250 Q720,275 650,250 Z"
            fill="rgba(11, 122, 122, 0.06)"
            stroke="rgba(11, 122, 122, 0.18)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'coronary-tree') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 560" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <path
            d="M120,40 C170,130 220,200 245,300 C270,400 240,490 210,550"
            fill="none"
            stroke="rgba(0, 91, 148, 0.11)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="vessel-flow"
          />
          <path
            d="M210,185 C290,210 340,250 385,320"
            fill="none"
            stroke="rgba(184, 50, 39, 0.12)"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="vessel-flow"
          />
          <path
            d="M840,70 C790,170 760,255 775,355 C790,445 840,500 880,550"
            fill="none"
            stroke="rgba(11, 122, 122, 0.11)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="vessel-flow"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'ecg-monitor') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1200 320" className="sec-bg-svg" preserveAspectRatio="none">
          <path
            className="ecg-wave-trace"
            d="M0,160 L180,160 L205,146 L220,160 L260,160 L276,184 L296,82 L316,222 L334,152 L352,160 L460,160 L485,146 L500,160 L540,160 L556,184 L576,82 L596,222 L614,152 L632,160 L760,160 L785,146 L800,160 L840,160 L856,184 L876,82 L896,222 L914,152 L932,160 L1200,160"
            fill="none"
            stroke="rgba(0, 91, 148, 0.18)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'awards-constellation') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 500" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <line x1="180" y1="120" x2="440" y2="90" stroke="rgba(158, 116, 31, 0.16)" strokeWidth="1" />
          <line x1="440" y1="90" x2="760" y2="140" stroke="rgba(158, 116, 31, 0.16)" strokeWidth="1" />
          <line x1="440" y1="90" x2="540" y2="330" stroke="rgba(0, 91, 148, 0.12)" strokeWidth="1" />
          <line x1="220" y1="380" x2="540" y2="330" stroke="rgba(0, 91, 148, 0.12)" strokeWidth="1" />
          {[
            [180, 120, 4],
            [440, 90, 5],
            [760, 140, 4],
            [540, 330, 5],
            [220, 380, 4],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r * 2.4} fill="rgba(197, 150, 51, 0.08)" />
              <circle cx={cx} cy={cy} r={r} fill="rgba(158, 116, 31, 0.35)" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'multimedia-waves') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 400" className="sec-bg-svg" preserveAspectRatio="none">
          <path
            d="M0,260 C240,210 380,310 620,250 C780,210 900,260 1000,240"
            fill="none"
            stroke="rgba(11, 122, 122, 0.15)"
            strokeWidth="1.5"
          />
          <path
            d="M0,290 C280,330 460,220 710,280 C840,310 930,275 1000,265"
            fill="none"
            stroke="rgba(0, 91, 148, 0.12)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'contact-radar') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 500" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="780" cy="240" r="220" fill="none" stroke="rgba(0, 91, 148, 0.09)" strokeWidth="1" />
          <circle cx="780" cy="240" r="150" fill="none" stroke="rgba(11, 122, 122, 0.11)" strokeWidth="1" />
          <circle cx="780" cy="240" r="80" fill="none" stroke="rgba(0, 91, 148, 0.14)" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return null;
}
