// SectionBackground.jsx – Dynamic, section-specific animated backgrounds
import { useEffect, useRef } from 'react';
import './SectionBackground.css';

export default function SectionBackground({ variant = 'coronary-tree', opacity = 0.8, className = '' }) {
  const containerRef = useRef(null);

  if (variant === 'coronary-tree') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="artGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c0392b" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8b1a2e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.2" />
            </linearGradient>
            <filter id="artGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Root Aorta Trunk */}
          <path
            d="M 500,20 C 500,80 500,140 500,200"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            className="coronary-pulse-glow"
          />

          {/* Left Anterior Descending (LAD) System */}
          <path
            d="M 500,200 C 440,240 380,280 340,350 C 300,420 280,500 250,580"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            className="coronary-main-branch"
          />
          <path
            d="M 380,280 C 320,300 280,340 240,380"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="coronary-main-branch"
            style={{ animationDelay: '0.8s' }}
          />
          <path
            d="M 340,350 C 310,400 270,440 230,470"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="coronary-main-branch"
            style={{ animationDelay: '1.4s' }}
          />

          {/* Circumflex & Marginal System */}
          <path
            d="M 500,200 C 560,250 620,290 680,360 C 730,420 780,490 820,570"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="coronary-main-branch"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            d="M 620,290 C 690,310 740,340 790,390"
            fill="none"
            stroke="url(#artGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="coronary-main-branch"
            style={{ animationDelay: '1.1s' }}
          />

          {/* Vascular Nodes */}
          {[
            [500, 200], [440, 240], [380, 280], [340, 350], [280, 500],
            [560, 250], [620, 290], [680, 360], [730, 420]
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={3}
              fill="#c9a84c"
              className="coronary-flow-particle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'valve-motion') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 800 500" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="valveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1a4a7c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Stent/Annulus Mesh Rings */}
          <circle cx="400" cy="250" r="160" fill="url(#valveGlow)" />
          <circle cx="400" cy="250" r="140" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="2" strokeDasharray="6 6" className="valve-ring-pulse" />
          <circle cx="400" cy="250" r="170" fill="none" stroke="rgba(26,74,124,0.4)" strokeWidth="1.5" strokeDasharray="12 4" />

          {/* Suture anchor struts */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="400"
              y1="250"
              x2={400 + 140 * Math.cos((deg * Math.PI) / 180)}
              y2={250 + 140 * Math.sin((deg * Math.PI) / 180)}
              stroke="rgba(201,168,76,0.2)"
              strokeWidth="1.5"
            />
          ))}

          {/* Valve Leaflets (TAVI Coaptation mechanism) */}
          <path
            d="M 320,250 Q 400,200 480,250 Q 400,230 320,250 Z"
            fill="rgba(201,168,76,0.3)"
            stroke="#c9a84c"
            strokeWidth="2"
            className="valve-leaflet-left"
          />
          <path
            d="M 320,250 Q 400,300 480,250 Q 400,270 320,250 Z"
            fill="rgba(201,168,76,0.3)"
            stroke="#c9a84c"
            strokeWidth="2"
            className="valve-leaflet-right"
          />

          {/* Center Coaptation Point */}
          <circle cx="400" cy="250" r="5" fill="#c9a84c" className="valve-ring-pulse" />
        </svg>
      </div>
    );
  }

  if (variant === 'ecg-monitor') {
    return (
      <div className={`section-bg-wrapper ecg-grid-overlay ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1200 400" className="section-bg-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#e8c97e" stopOpacity="1" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.2" />
            </linearGradient>
            <filter id="ecgGlowFilter">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* 3 Continuous Lead Traces */}
          <path
            className="ecg-continuous-line"
            d="M 0,200 L 150,200 L 170,185 L 185,210 L 200,200 L 240,200 L 255,230 L 275,60 L 295,290 L 315,185 L 330,200 L 370,200 L 395,160 L 425,200 L 550,200 L 570,185 L 585,210 L 600,200 L 640,200 L 655,230 L 675,60 L 695,290 L 715,185 L 730,200 L 770,200 L 795,160 L 825,200 L 950,200 L 970,185 L 985,210 L 1000,200 L 1040,200 L 1055,230 L 1075,60 L 1095,290 L 1115,185 L 1130,200 L 1200,200"
            fill="none"
            stroke="url(#ecgGrad)"
            strokeWidth="2.5"
            filter="url(#ecgGlowFilter)"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'awards-constellation') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          {/* Connecting golden vectors */}
          <line x1="200" y1="180" x2="450" y2="120" stroke="rgba(201,168,76,0.25)" strokeWidth="1" className="constellation-line" />
          <line x1="450" y1="120" x2="750" y2="160" stroke="rgba(201,168,76,0.25)" strokeWidth="1" className="constellation-line" />
          <line x1="450" y1="120" x2="520" y2="340" stroke="rgba(201,168,76,0.2)" strokeWidth="1" className="constellation-line" />
          <line x1="200" y1="180" x2="320" y2="420" stroke="rgba(201,168,76,0.2)" strokeWidth="1" className="constellation-line" />
          <line x1="320" y1="420" x2="520" y2="340" stroke="rgba(201,168,76,0.2)" strokeWidth="1" className="constellation-line" />
          <line x1="520" y1="340" x2="820" y2="400" stroke="rgba(201,168,76,0.2)" strokeWidth="1" className="constellation-line" />
          <line x1="750" y1="160" x2="820" y2="400" stroke="rgba(201,168,76,0.25)" strokeWidth="1" className="constellation-line" />

          {/* Floating glowing nodes */}
          {[
            { cx: 200, cy: 180, r: 6, label: 'Padma Shri' },
            { cx: 450, cy: 120, r: 8, label: 'First TAVI' },
            { cx: 750, cy: 160, r: 7, label: 'MitraClip' },
            { cx: 320, cy: 420, r: 5, label: 'Laser Revasc' },
            { cx: 520, cy: 340, r: 9, label: 'Chairman' },
            { cx: 820, cy: 400, r: 6, label: '100+ Papers' },
          ].map((node, i) => (
            <g key={i} className="constellation-node" style={{ animationDelay: `${i * 0.7}s` }}>
              <circle cx={node.cx} cy={node.cy} r={node.r * 2.2} fill="rgba(201,168,76,0.12)" />
              <circle cx={node.cx} cy={node.cy} r={node.r} fill="#c9a84c" />
              <circle cx={node.cx} cy={node.cy} r={2} fill="#ffffff" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'multimedia-waves') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 400" className="section-bg-svg" preserveAspectRatio="none">
          <g transform="translate(100, 300)">
            {[...Array(40)].map((_, i) => (
              <rect
                key={i}
                x={i * 20}
                y={-60}
                width="4"
                height={50 + Math.sin(i * 0.4) * 45}
                fill="rgba(201,168,76,0.35)"
                rx="2"
                className="audio-bar"
                style={{ animationDelay: `${(i % 10) * 0.15}s` }}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'cellular-particles') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          {[
            { cx: 150, cy: 120, rx: 22, ry: 15, rot: 25 },
            { cx: 350, cy: 240, rx: 28, ry: 18, rot: -40 },
            { cx: 650, cy: 160, rx: 20, ry: 14, rot: 15 },
            { cx: 850, cy: 280, rx: 25, ry: 16, rot: 55 },
            { cx: 250, cy: 450, rx: 24, ry: 15, rot: -20 },
            { cx: 520, cy: 480, rx: 30, ry: 19, rot: 35 },
            { cx: 780, cy: 450, rx: 22, ry: 15, rot: -10 }
          ].map((cell, i) => (
            <ellipse
              key={i}
              cx={cell.cx}
              cy={cell.cy}
              rx={cell.rx}
              ry={cell.ry}
              fill="rgba(192,57,43,0.18)"
              stroke="rgba(192,57,43,0.35)"
              strokeWidth="2"
              transform={`rotate(${cell.rot} ${cell.cx} ${cell.cy})`}
              className="cell-rbc"
              style={{ animationDelay: `${i * 1.5}s` }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'laser-energy') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 500" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <line x1="100" y1="100" x2="900" y2="400" stroke="#c9a84c" strokeWidth="2" className="laser-beam" />
          <line x1="900" y1="120" x2="100" y2="380" stroke="#c0392b" strokeWidth="2" className="laser-beam" style={{ animationDelay: '1.2s' }} />
          <circle cx="500" cy="250" r="120" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
      </div>
    );
  }

  if (variant === 'telemetry-grid') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(26,74,124,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,74,124,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div
          className="telemetry-scanner"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            boxShadow: '0 0 16px #c9a84c'
          }}
        />
      </div>
    );
  }

  if (variant === 'about-monument') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="monumentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0a2342" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="300" r="280" fill="url(#monumentGlow)" />
          <circle cx="500" cy="300" r="220" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="1.5" strokeDasharray="8 8" className="monument-ring-outer" />
          <circle cx="500" cy="300" r="160" fill="none" stroke="rgba(26,74,124,0.35)" strokeWidth="2" strokeDasharray="14 6" className="monument-ring-inner" />
          <circle cx="500" cy="300" r="100" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
          
          {/* Medical emblem geometry */}
          <line x1="500" y1="80" x2="500" y2="520" stroke="rgba(201,168,76,0.15)" strokeWidth="1.5" />
          <line x1="280" y1="300" x2="720" y2="300" stroke="rgba(201,168,76,0.15)" strokeWidth="1.5" />
          
          {/* Glowing node constellation */}
          {[
            [500, 140], [500, 460], [340, 300], [660, 300],
            [380, 180], [620, 180], [380, 420], [620, 420]
          ].map(([cx, cy], i) => (
            <g key={i} className="monument-pulse-node" style={{ animationDelay: `${i * 0.4}s` }}>
              <circle cx={cx} cy={cy} r="4" fill="#c9a84c" />
              <circle cx={cx} cy={cy} r="10" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'treatments-cathlab') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a4a7c" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c0392b" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Guide Catheter wire path */}
          <path
            d="M 50,550 C 300,550 450,420 550,300 C 650,180 750,120 950,120"
            fill="none"
            stroke="url(#cathGrad)"
            strokeWidth="4"
            className="cath-wire-active"
          />

          {/* Stent lattice mesh structure */}
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
            const cx = 500 + idx * 35;
            const cy = 350 - idx * 25;
            return (
              <g key={idx}>
                <ellipse cx={cx} cy={cy} rx="25" ry="40" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="2" className="stent-mesh-strut" style={{ animationDelay: `${idx * 0.25}s` }} />
                <line x1={cx - 15} y1={cy - 30} x2={cx + 15} y2={cy + 30} stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />
                <line x1={cx + 15} y1={cy - 30} x2={cx - 15} y2={cy + 30} stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (variant === 'media-broadcasting') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 500" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="500" cy="250" r="90" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="2" className="broadcast-ripple br-1" />
          <circle cx="500" cy="250" r="170" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" className="broadcast-ripple br-2" />
          <circle cx="500" cy="250" r="250" fill="none" stroke="rgba(26,74,124,0.3)" strokeWidth="1" className="broadcast-ripple br-3" />
          <circle cx="500" cy="250" r="14" fill="#c9a84c" />
        </svg>
      </div>
    );
  }

  if (variant === 'contact-radar') {
    return (
      <div className={`section-bg-wrapper ${className}`} style={{ opacity }} aria-hidden="true">
        <svg viewBox="0 0 1000 600" className="section-bg-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="radarBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="280" r="260" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          <circle cx="500" cy="280" r="180" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
          <circle cx="500" cy="280" r="100" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
          <line x1="500" y1="20" x2="500" y2="540" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
          <line x1="240" y1="280" x2="760" y2="280" stroke="rgba(201,168,76,0.12)" strokeWidth="1" />
          
          {/* Radar Sweep Arc */}
          <path d="M 500,280 L 760,280 A 260 260 0 0 1 680,470 Z" fill="url(#radarBeam)" className="radar-sweep-beam" />
          
          {/* Hospital target ping */}
          <circle cx="620" cy="220" r="6" fill="#c9a84c" className="radar-ping-dot" />
        </svg>
      </div>
    );
  }

  return null;
}
