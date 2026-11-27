// SectionBackground.jsx – High-visibility bright clinical SVG backdrops with floating medical particle motes
import './SectionBackground.css';

function MedicalParticles() {
  return (
    <div className="medical-particles-emitter" aria-hidden="true">
      <span className="med-particle med-particle--dot-1" />
      <span className="med-particle med-particle--dot-2" />
      <span className="med-particle med-particle--dot-3" />
      <span className="med-particle med-particle--dot-4" />
      <span className="med-particle med-particle--cross-1" />
      <span className="med-particle med-particle--cross-2" />
    </div>
  );
}

export default function SectionBackground({ variant = 'telemetry-grid', opacity = 0.85, className = '', showParticles = true }) {
  if (variant === 'telemetry-grid') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        <div className="clinical-grid-pattern" />
        <div className="clinical-sweep-line" />
        {showParticles && <MedicalParticles />}
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
        {showParticles && <MedicalParticles />}
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
        </svg>
      </div>
    );
  }

  if (variant === 'coronary-tree') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        {showParticles && <MedicalParticles />}
        <svg viewBox="0 0 1000 700" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <path
            d="M500,20 C500,160 520,240 580,350 C630,440 700,520 780,680"
            fill="none"
            stroke="rgba(0, 91, 148, 0.45)"
            strokeWidth="3"
            className="vessel-flow"
          />
          <path
            d="M520,200 C470,270 390,340 320,440 C270,520 220,600 180,680"
            fill="none"
            stroke="rgba(11, 122, 122, 0.45)"
            strokeWidth="2.5"
            className="vessel-flow"
          />
          <path
            d="M580,350 C540,430 480,500 420,600"
            fill="none"
            stroke="rgba(0, 91, 148, 0.35)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            d="M390,340 C410,420 450,510 490,620"
            fill="none"
            stroke="rgba(11, 122, 122, 0.35)"
            strokeWidth="1.8"
            strokeDasharray="5 5"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'ecg-monitor') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        {showParticles && <MedicalParticles />}
        <svg viewBox="0 0 1200 360" className="sec-bg-svg" preserveAspectRatio="none">
          <path
            d="M0,180 L240,180 L260,195 L275,120 L295,245 L315,160 L330,190 L345,180 L560,180 L580,195 L595,120 L615,245 L635,160 L650,190 L665,180 L880,180 L900,195 L915,120 L935,245 L955,160 L970,190 L985,180 L1200,180"
            fill="none"
            stroke="rgba(0, 91, 148, 0.45)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-wave-trace"
          />
          <path
            d="M0,180 L240,180 L260,195 L275,120 L295,245 L315,160 L330,190 L345,180 L560,180 L580,195 L595,120 L615,245 L635,160 L650,190 L665,180 L880,180 L900,195 L915,120 L935,245 L955,160 L970,190 L985,180 L1200,180"
            fill="none"
            stroke="rgba(11, 122, 122, 0.35)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-wave-echo"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'awards-constellation') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        {showParticles && <MedicalParticles />}
        <svg viewBox="0 0 1000 500" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <path
            d="M160,130 L420,85 L740,135 L860,320 L520,340 L190,390 Z"
            fill="rgba(0, 91, 148, 0.04)"
            stroke="rgba(0, 91, 148, 0.28)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <line x1="420" y1="85" x2="520" y2="340" stroke="rgba(11, 122, 122, 0.3)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="160" y1="130" x2="520" y2="340" stroke="rgba(0, 91, 148, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="740" y1="135" x2="520" y2="340" stroke="rgba(197, 150, 51, 0.38)" strokeWidth="1.5" />
          {[
            [160, 130, 5, 'Padma Shri'],
            [420, 85, 7, 'Investiture'],
            [740, 135, 5, 'TAVI Pioneer'],
            [520, 340, 6, 'Clinical Leadership'],
            [190, 390, 5, 'MitraClip'],
            [860, 320, 5, 'Medanta Medicity'],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(197, 150, 51, 0.85)"
              className="telemetry-beacon"
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'multimedia-waves') {
    return (
      <div className={`sec-bg-layer ${className}`} style={{ opacity }} aria-hidden="true">
        {showParticles && <MedicalParticles />}
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
        {showParticles && <MedicalParticles />}
        <svg viewBox="0 0 1000 520" className="sec-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="800" cy="260" r="240" fill="none" stroke="rgba(0, 91, 148, 0.25)" strokeWidth="1.5" strokeDasharray="8 8" className="spin-slow" />
          <circle cx="800" cy="260" r="170" fill="none" stroke="rgba(11, 122, 122, 0.35)" strokeWidth="1.5" />
          <circle cx="800" cy="260" r="100" fill="none" stroke="rgba(0, 91, 148, 0.42)" strokeWidth="2" strokeDasharray="4 6" className="spin-reverse" />
          <circle cx="800" cy="260" r="35" fill="none" stroke="rgba(11, 122, 122, 0.5)" strokeWidth="1.5" />
          <circle cx="800" cy="260" r="6" fill="rgba(0, 91, 148, 0.85)" className="telemetry-beacon" />
          <line x1="800" y1="260" x2="980" y2="120" stroke="rgba(0, 91, 148, 0.5)" strokeWidth="2" strokeLinecap="round" className="radar-sweep-beam" />
        </svg>
      </div>
    );
  }

  return null;
}
