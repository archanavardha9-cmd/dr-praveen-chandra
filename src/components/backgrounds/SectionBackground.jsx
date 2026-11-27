// SectionBackground.jsx – High-visibility bright clinical SVG backdrops with rich motion
import './SectionBackground.css';

export default function SectionBackground({ variant = 'telemetry-grid', opacity = 0.85, className = '' }) {
  if (variant === 'telemetry-grid') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <div className="clinical-grid-pattern" />
        <div className="clinical-sweep-line" />
        <svg viewBox="0 0 1000 500" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="850" cy="180" r="140" fill="none" stroke="rgba(0, 91, 148, 0.28)" strokeWidth="1.5" strokeDasharray="6 6" className="spin-slow" />
          <circle cx="850" cy="180" r="80" fill="none" stroke="rgba(11, 122, 122, 0.32)" strokeWidth="1.5" className="spin-reverse" />
          <circle cx="850" cy="180" r="6" fill="rgba(0, 91, 148, 0.5)" className="telemetry-beacon" />
          <line x1="820" y1="180" x2="880" y2="180" stroke="rgba(0, 91, 148, 0.4)" strokeWidth="1.5" />
          <line x1="850" y1="150" x2="850" y2="210" stroke="rgba(0, 91, 148, 0.4)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (variant === 'valve-motion') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="valveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#005B94" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#0B7A7A" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="760" cy="300" r="210" fill="url(#valveGlow)" />
          <circle cx="760" cy="300" r="200" fill="none" stroke="rgba(0, 91, 148, 0.32)" strokeWidth="1.8" strokeDasharray="10 8" className="valve-ring-rot" />
          <circle cx="760" cy="300" r="150" fill="none" stroke="rgba(11, 122, 122, 0.38)" strokeWidth="2" strokeDasharray="4 6" className="spin-reverse" />
          <circle cx="760" cy="300" r="95" fill="none" stroke="rgba(0, 91, 148, 0.35)" strokeWidth="1.5" />
          {/* Leaflets with dynamic breathing stroke */}
          <path
            d="M680,300 Q760,230 840,300 Q760,265 680,300 Z"
            fill="rgba(0, 91, 148, 0.12)"
            stroke="rgba(0, 91, 148, 0.45)"
            strokeWidth="1.8"
            className="valve-leaflet-top"
          />
          <path
            d="M680,300 Q760,370 840,300 Q760,335 680,300 Z"
            fill="rgba(11, 122, 122, 0.12)"
            stroke="rgba(11, 122, 122, 0.45)"
            strokeWidth="1.8"
            className="valve-leaflet-bottom"
          />
          {/* Catheter Stent Struts */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="760"
              y1="300"
              x2={760 + 195 * Math.cos((deg * Math.PI) / 180)}
              y2={300 + 195 * Math.sin((deg * Math.PI) / 180)}
              stroke="rgba(0, 91, 148, 0.2)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'coronary-tree') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1100 620" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          {/* Left Main Coronary Trunk */}
          <path
            d="M90,30 C150,140 210,220 250,330 C290,440 260,540 220,610"
            fill="none"
            stroke="rgba(0, 91, 148, 0.42)"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="vessel-flow"
          />
          {/* Left Anterior Descending Branch */}
          <path
            d="M210,210 C290,240 370,290 430,370 C480,440 470,530 450,590"
            fill="none"
            stroke="rgba(217, 83, 79, 0.48)"
            strokeWidth="2.6"
            strokeLinecap="round"
            className="vessel-flow"
          />
          {/* Diagonal Arterial Branch */}
          <path
            d="M320,265 C390,285 450,315 500,360"
            fill="none"
            stroke="rgba(217, 83, 79, 0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 6"
          />
          {/* Right Coronary Arch */}
          <path
            d="M940,50 C880,160 840,260 860,380 C880,480 940,550 990,610"
            fill="none"
            stroke="rgba(11, 122, 122, 0.42)"
            strokeWidth="3"
            strokeLinecap="round"
            className="vessel-flow"
          />
          {/* Circumflex Marginal Branches */}
          <path
            d="M860,260 C780,300 730,350 710,430"
            fill="none"
            stroke="rgba(11, 122, 122, 0.36)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="6 6"
          />
          {/* Glowing Arterial Junction Nodes */}
          {[
            [210, 210],
            [250, 330],
            [320, 265],
            [430, 370],
            [860, 260],
            [860, 380],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="9" fill="rgba(0, 91, 148, 0.15)" className="telemetry-beacon" />
              <circle cx={cx} cy={cy} r="4" fill="rgba(0, 91, 148, 0.65)" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'ecg-monitor') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1200 320" className="sec-bg-svg" preserveAspectRatio="none">
          {/* Lead II Primary ECG Wave */}
          <path
            className="ecg-wave-trace"
            d="M0,160 L140,160 L165,142 L180,160 L220,160 L236,192 L256,65 L276,242 L294,148 L312,160 L420,160 L445,142 L460,160 L500,160 L516,192 L536,65 L556,242 L574,148 L592,160 L700,160 L725,142 L740,160 L780,160 L796,192 L816,65 L836,242 L854,148 L872,160 L980,160 L1005,142 L1020,160 L1060,160 L1076,192 L1096,65 L1116,242 L1134,148 L1152,160 L1200,160"
            fill="none"
            stroke="rgba(0, 91, 148, 0.48)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Echo Wave Offset */}
          <path
            className="ecg-wave-echo"
            d="M0,165 L140,165 L165,147 L180,165 L220,165 L236,195 L256,75 L276,238 L294,153 L312,165 L420,165 L445,147 L460,165 L500,165 L516,195 L536,75 L556,238 L574,153 L592,165 L700,165 L725,147 L740,165 L780,165 L796,195 L816,75 L836,238 L854,153 L872,165 L980,165 L1005,147 L1020,165 L1060,165 L1076,195 L1096,75 L1116,238 L1134,153 L1152,165 L1200,165"
            fill="none"
            stroke="rgba(11, 122, 122, 0.32)"
            strokeWidth="1.8"
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
          {/* Golden Geometric Constellation */}
          <line x1="160" y1="130" x2="420" y2="85" stroke="rgba(197, 150, 51, 0.42)" strokeWidth="1.6" strokeDasharray="4 4" />
          <line x1="420" y1="85" x2="740" y2="135" stroke="rgba(197, 150, 51, 0.42)" strokeWidth="1.6" />
          <line x1="420" y1="85" x2="520" y2="340" stroke="rgba(0, 91, 148, 0.35)" strokeWidth="1.5" strokeDasharray="5 5" />
          <line x1="190" y1="390" x2="520" y2="340" stroke="rgba(0, 91, 148, 0.35)" strokeWidth="1.5" />
          <line x1="740" y1="135" x2="860" y2="320" stroke="rgba(197, 150, 51, 0.38)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="520" y1="340" x2="860" y2="320" stroke="rgba(197, 150, 51, 0.38)" strokeWidth="1.5" />
          
          {/* Luminous Golden Star Nodes */}
          {[
            [160, 130, 5, 'Padma Shri'],
            [420, 85, 7, 'Investiture'],
            [740, 135, 5, 'TAVI Pioneer'],
            [520, 340, 6, 'Clinical Leadership'],
            [190, 390, 5, 'MitraClip'],
            [860, 320, 5, 'Medanta Medicity'],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r * 3.2} fill="rgba(197, 150, 51, 0.14)" className="telemetry-beacon" />
              <circle cx={cx} cy={cy} r={r * 1.8} fill="rgba(197, 150, 51, 0.28)" />
              <circle cx={cx} cy={cy} r={r} fill="rgba(197, 150, 51, 0.85)" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'multimedia-waves') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 420" className="sec-bg-svg" preserveAspectRatio="none">
          <path
            d="M0,240 C200,180 340,300 580,220 C740,170 860,250 1000,210"
            fill="none"
            stroke="rgba(11, 122, 122, 0.42)"
            strokeWidth="2.5"
            className="wave-drift-fast"
          />
          <path
            d="M0,270 C240,320 420,190 670,270 C810,310 910,240 1000,250"
            fill="none"
            stroke="rgba(0, 91, 148, 0.38)"
            strokeWidth="2.2"
            className="wave-drift-slow"
          />
          <path
            d="M0,300 C180,250 360,340 600,280 C780,230 890,310 1000,290"
            fill="none"
            stroke="rgba(0, 91, 148, 0.25)"
            strokeWidth="1.8"
            strokeDasharray="6 6"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'contact-radar') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 520" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="800" cy="260" r="240" fill="none" stroke="rgba(0, 91, 148, 0.25)" strokeWidth="1.5" strokeDasharray="8 8" className="spin-slow" />
          <circle cx="800" cy="260" r="170" fill="none" stroke="rgba(11, 122, 122, 0.35)" strokeWidth="1.5" />
          <circle cx="800" cy="260" r="100" fill="none" stroke="rgba(0, 91, 148, 0.42)" strokeWidth="2" strokeDasharray="4 6" className="spin-reverse" />
          <circle cx="800" cy="260" r="35" fill="none" stroke="rgba(11, 122, 122, 0.5)" strokeWidth="1.5" />
          <circle cx="800" cy="260" r="6" fill="rgba(0, 91, 148, 0.85)" className="telemetry-beacon" />
          {/* Radar Scanner Angle */}
          <line x1="800" y1="260" x2="980" y2="120" stroke="rgba(0, 91, 148, 0.5)" strokeWidth="2" strokeLinecap="round" className="radar-sweep-beam" />
        </svg>
      </div>
    );
  }

  return null;
}
