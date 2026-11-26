// HeartAnimation.jsx – Animated cardiac SVG background
import { useEffect, useRef } from 'react';
import './HeartAnimation.css';

export default function HeartAnimation({ variant = 'hero', className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Animate ECG line
    const paths = svgRef.current?.querySelectorAll('.ecg-path');
    if (!paths) return;
    paths.forEach((path, i) => {
      const len = path.getTotalLength?.() || 300;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.style.animation = `ecgDraw 3s ${i * 0.5}s ease forwards, ecgPulse 3s ${i * 0.5 + 3}s ease-in-out infinite`;
    });
  }, []);

  if (variant === 'hero') {
    return (
      <div className={`heart-anim hero-anim ${className}`} aria-hidden="true">
        <svg ref={svgRef} viewBox="0 0 800 600" className="hero-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circles */}
          <circle cx="400" cy="300" r="250" fill="url(#heartGrad)" />
          <circle cx="400" cy="300" r="180" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1" className="rotating-ring" />
          <circle cx="400" cy="300" r="230" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1" className="rotating-ring-reverse" />

          {/* Heart shape */}
          <path
            d="M400,480 C200,360 100,250 100,170 C100,100 160,60 220,60 C280,60 340,100 400,160 C460,100 520,60 580,60 C640,60 700,100 700,170 C700,250 600,360 400,480Z"
            fill="none"
            stroke="rgba(201,168,76,0.15)"
            strokeWidth="1.5"
            className="heart-outline"
          />

          {/* ECG Line */}
          <path
            className="ecg-path"
            d="M50,300 L150,300 L180,300 L200,240 L220,360 L250,200 L270,400 L290,300 L350,300 L380,300 L400,260 L420,340 L440,220 L460,380 L480,300 L540,300 L560,300 L580,260 L600,340 L620,220 L640,380 L660,300 L750,300"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={100 + (i * 55)}
              cy={180 + Math.sin(i * 0.8) * 60}
              r={Math.random() * 2 + 1}
              fill="rgba(201,168,76,0.4)"
              className={`particle p-${i}`}
            />
          ))}

          {/* Medical cross marks */}
          <g opacity="0.1" stroke="#c9a84c" strokeWidth="1.5">
            <line x1="80" y1="80" x2="80" y2="110" />
            <line x1="65" y1="95" x2="95" y2="95" />
            <line x1="700" y1="470" x2="700" y2="500" />
            <line x1="685" y1="485" x2="715" y2="485" />
          </g>

          {/* Concentric rings at heart center */}
          <circle cx="400" cy="270" r="20" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" className="pulse-ring r1" />
          <circle cx="400" cy="270" r="40" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" className="pulse-ring r2" />
          <circle cx="400" cy="270" r="60" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1" className="pulse-ring r3" />
          <circle cx="400" cy="270" r="6" fill="rgba(201,168,76,0.6)" className="heart-dot" />
        </svg>
      </div>
    );
  }

  if (variant === 'arteries') {
    return (
      <div className={`heart-anim arteries-anim ${className}`} aria-hidden="true">
        <svg viewBox="0 0 600 500" className="arteries-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b1a2e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c0392b" stopOpacity="0.2" />
            </linearGradient>
            <filter id="arteryGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Artery network */}
          <path d="M300,50 C300,50 300,150 300,250 C300,300 350,320 380,350 C410,380 420,430 400,460" 
            fill="none" stroke="url(#arteryGrad)" strokeWidth="8" strokeLinecap="round" filter="url(#arteryGlow)" className="artery-pulse" />
          <path d="M300,250 C250,270 220,300 200,340 C180,380 190,440 210,460"
            fill="none" stroke="url(#arteryGrad)" strokeWidth="5" strokeLinecap="round" className="artery-pulse a2" />
          <path d="M300,150 C340,130 380,110 420,120 C460,130 490,160 500,200"
            fill="none" stroke="url(#arteryGrad)" strokeWidth="4" strokeLinecap="round" className="artery-pulse a3" />
          <path d="M300,150 C260,130 220,110 180,120 C140,130 110,160 100,200"
            fill="none" stroke="url(#arteryGrad)" strokeWidth="4" strokeLinecap="round" className="artery-pulse a4" />

          {/* Flow dots */}
          {[0, 1, 2].map(i => (
            <circle key={i} r="4" fill="rgba(192,57,43,0.8)" className={`flow-dot fd-${i}`} filter="url(#arteryGlow)">
              <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite">
                <mpath xlinkHref="#mainArtery" />
              </animateMotion>
            </circle>
          ))}

          <path id="mainArtery" d="M300,50 C300,150 300,250 300,350 C300,400 320,440 340,460" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === 'particles') {
    return (
      <div className={`heart-anim particles-anim ${className}`} aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="med-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
