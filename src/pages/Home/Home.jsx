// Home.jsx – Multi-image editorial compositions, noticeable medical ECG heartbeat, & scroll-scrubbed stage transformations
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import VideoModal from '../../components/media/VideoModal';
import SplitHeading from '../../components/motion/SplitHeading';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { animateNumericCounters } from '../../utils/motionHelpers';
import {
  DOCTOR,
  ANATOMY_HOTSPOTS,
  DEVICES_SHOWCASE,
  MEDIA_VIDEOS,
  CONTACT_INFO,
} from '../../data/doctorData';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const HERO_SLIDES = [
  {
    id: 'chairman',
    index: '01',
    label: 'Chairman, Medanta',
    caption: 'Dr. Praveen Chandra — Chairman, Interventional Cardiology',
    image: DOCTOR.images.hero,
    companionTop: DOCTOR.images.cathLab,
    companionBottom: DOCTOR.images.awardPodium,
  },
  {
    id: 'padma',
    index: '02',
    label: 'Padma Shri 2016',
    caption: 'Conferred the Padma Shri by the President of India (2016)',
    image: DOCTOR.images.awardPodium,
    companionTop: DOCTOR.images.hero,
    companionBottom: DOCTOR.images.speaking,
  },
  {
    id: 'cathlab',
    index: '03',
    label: 'Cath Lab Pioneer',
    caption: 'Leading complex coronary & structural heart procedures',
    image: DOCTOR.images.cathLab,
    companionTop: DOCTOR.images.consultation,
    companionBottom: DOCTOR.images.hero,
  },
];

const LEGACY_COLLAGE = [
  {
    id: 'padma',
    year: '2016',
    title: 'Padma Shri National Honor',
    subtitle: 'Conferred India’s fourth-highest civilian honor by the President of India.',
    image: DOCTOR.images.awardPodium,
    caption: 'Padma Shri Investiture Ceremony, Rashtrapati Bhavan',
    slot: 'slot-hero',
  },
  {
    id: 'firsts',
    year: 'First in India',
    title: 'TAVI & MitraClip Pioneer',
    subtitle: 'First non-surgical aortic & mitral valve interventions in India.',
    image: DOCTOR.images.cathLab,
    caption: 'Cardiac Catheterization Suite, Medanta',
    slot: 'slot-wide',
  },
  {
    id: 'faculty',
    year: '1992 – Present',
    title: '30+ Years Leadership',
    subtitle: 'Past Chairman, National Interventional Council & global faculty.',
    image: DOCTOR.images.speaking,
    caption: 'International Interventional Symposia',
    slot: 'slot-tall',
  },
  {
    id: 'care',
    year: '100+ Papers',
    title: 'Clinical Precision & Evaluation',
    subtitle: 'Physiology-guided angiogram review and multidisciplinary Heart Team care.',
    image: DOCTOR.images.consultation,
    caption: 'Patient Consultation, Medanta',
    slot: 'slot-inset',
  },
];

const SPOTLIGHT_VIDEOS = MEDIA_VIDEOS.slice(0, 4);

export default function Home() {
  const heroCycle = useAutoCycle(HERO_SLIDES.length, 4000);
  const anatomyCycle = useAutoCycle(ANATOMY_HOTSPOTS.length, 5500);
  const deviceCycle = useAutoCycle(DEVICES_SHOWCASE.length, 5500);
  const legacyCycle = useAutoCycle(LEGACY_COLLAGE.length, 5200);
  const videoCycle = useAutoCycle(SPOTLIGHT_VIDEOS.length, 6000);

  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const homeRef = useRef(null);

  const currentHero = HERO_SLIDES[heroCycle.activeIndex];
  const currentHotspot = ANATOMY_HOTSPOTS[anatomyCycle.activeIndex];
  const currentDevice = DEVICES_SHOWCASE[deviceCycle.activeIndex];
  const nextDevice = DEVICES_SHOWCASE[(deviceCycle.activeIndex + 1) % DEVICES_SHOWCASE.length];
  const thirdDevice = DEVICES_SHOWCASE[(deviceCycle.activeIndex + 2) % DEVICES_SHOWCASE.length];
  const currentLegacy = LEGACY_COLLAGE[legacyCycle.activeIndex];
  const currentVideo = SPOTLIGHT_VIDEOS[videoCycle.activeIndex];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. HERO SECTION — Centered circular portrait composition + ECG pulse ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.hero-azure-wedge',
            { xPercent: 45, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
          )
          .fromTo(
            '.hero-center-kicker',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            0.1
          )
          .fromTo(
            '.hero-center-title .split-word-inner',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' },
            0.15
          )
          .fromTo(
            '.hero-center-lead',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            0.35
          )
          .fromTo(
            '.hero-portrait-main',
            { scale: 0.7, y: 40, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
            0.25
          )
          .fromTo(
            '.hero-center-actions > *',
            { scale: 0.84, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.55
          )
          .fromTo(
            '.hero-center-metric-row',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            0.65
          );

        animateNumericCounters('.hero-center-metric-val', {
          trigger: '.home-hero-stage',
          start: 'top 95%',
        });

        // Subtle continuous floating motion after hero settles
        gsap.to('.hero-portrait-frame-inner img', {
          y: -8,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.hero-center-stage', { y: -40, opacity: 0.3, ease: 'none' }, 0)
          .to('.hero-azure-wedge', { yPercent: -12, opacity: 0.3, ease: 'none' }, 0);

        // ── 2. ANATOMY STAGE — 3-Zone Sapphire Contrast Stage + growth + clean recede ──
        const anatTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-anatomy-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        anatTl
          .fromTo(
            '.anat-section-header .section-heading',
            { x: -70, color: '#8ac2e8', opacity: 0.25 },
            { x: 0, color: '#ffffff', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.anat-section-header .section-lead', { x: 75, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo('.anatomy-circle-backdrop', { scale: 0.28, opacity: 0.1 }, { scale: 1.04, opacity: 1, duration: 0.36 }, 0)
          .fromTo(
            '.anatomy-image-holder',
            { scale: 0.58, y: 75, rotate: -5, opacity: 0.15 },
            { scale: 1.03, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.anat-pin-btn',
            { scale: 0, xPercent: -50, yPercent: -50, opacity: 0 },
            { scale: 1, xPercent: -50, yPercent: -50, opacity: 1, duration: 0.22, stagger: 0.03, clearProps: 'transform', ease: 'back.out(1.8)' },
            0.14
          )
          .fromTo(
            '.anatomy-dynamic-stage',
            { x: 105, scale: 0.86, opacity: 0.15 },
            { x: 0, scale: 1, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.03
          )
          .fromTo('.anatomy-zone-rail', { y: 55, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.32 }, 0.06)
          // Plateau
          .to('.anatomy-image-holder', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.anatomy-dynamic-stage', { x: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.anatomy-diagram-stage', { scale: 0.76, y: -55, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.anatomy-dynamic-stage', { x: 75, y: -30, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.anatomy-zone-rail', { y: -24, opacity: 0.18, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. DEVICES MULTI-IMAGE GALLERY — Asymmetric 3-Frame Composition + Inverse Scroll Transformation ──
        const devTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-devices-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        devTl
          .fromTo('.dev-wide-header .section-heading', { y: -32, color: '#6c87a1' }, { y: 0, color: '#09223a', duration: 0.32 }, 0)
          .fromTo('.dev-horizontal-tabs', { y: 28, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.32 }, 0.03)
          .fromTo(
            '.dev-gallery-primary',
            { scale: 0.66, y: 65, opacity: 0.18 },
            { scale: 1.03, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.dev-gallery-side-left',
            { x: -120, y: 45, scale: 0.72, rotate: -4, opacity: 0.15 },
            { x: 0, y: 0, scale: 0.96, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.04
          )
          .fromTo(
            '.dev-gallery-side-right',
            { x: 120, y: -45, scale: 0.72, rotate: 4, opacity: 0.15 },
            { x: 0, y: 0, scale: 0.96, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.04
          )
          // Inverse scroll prominence transform during progression
          .to('.dev-gallery-primary', { scale: 0.97, y: 0, duration: 0.32 }, 0.36)
          .to('.dev-gallery-side-left', { scale: 1.05, x: 10, duration: 0.32 }, 0.36)
          .to('.dev-gallery-side-right', { scale: 1.05, x: -10, duration: 0.32 }, 0.36)
          // Exit split sweep
          .to('.dev-gallery-side-left', { x: -95, y: -35, scale: 0.78, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.dev-gallery-primary', { scale: 0.8, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.dev-gallery-side-right', { x: 95, y: 35, scale: 0.78, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 4. LEGACY 4-PHOTO EDITORIAL COLLAGE — 4-Corner Diagonal Convergence ──
        const legTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-legacy-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.82,
          },
        });

        legTl
          .fromTo('.leg-section-header', { y: -35, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.32 }, 0)
          .fromTo('.collage-tile-0', { x: -110, y: -60, scale: 0.72, rotate: -3, opacity: 0.15 }, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.36 }, 0)
          .fromTo('.collage-tile-1', { x: 110, y: -55, scale: 0.74, rotate: 3, opacity: 0.15 }, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.36 }, 0.04)
          .fromTo('.collage-tile-2', { x: -90, y: 70, scale: 0.74, rotate: 2.5, opacity: 0.15 }, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.36 }, 0.06)
          .fromTo('.collage-tile-3', { x: 95, y: 70, scale: 0.72, rotate: -2.5, opacity: 0.15 }, { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.36 }, 0.08)
          .fromTo('.legacy-editorial-rail', { y: 50, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.34 }, 0.05)
          // Plateau
          .to('.collage-tile, .legacy-editorial-rail', { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          // Part & recede into dark Cinema stage
          .to('.collage-tile-0', { x: -80, y: -40, scale: 0.8, opacity: 0.2, duration: 0.32 }, 0.68)
          .to('.collage-tile-1', { x: 80, y: -40, scale: 0.8, opacity: 0.2, duration: 0.32 }, 0.68)
          .to('.collage-tile-2, .collage-tile-3', { y: 40, scale: 0.82, opacity: 0.2, duration: 0.32 }, 0.68)
          .to('.legacy-editorial-rail', { y: 35, opacity: 0.2, duration: 0.32 }, 0.68);

        // ── 5. CLINICAL CINEMA — Full-Width Dark Theater Stage + Horizontal Filmstrip Sweep ──
        const cinTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-cinema-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        cinTl
          .fromTo('.cin-section-header', { y: -35, opacity: 0.2 }, { y: 0, opacity: 1, duration: 0.32 }, 0)
          .fromTo(
            '.cinema-widescreen-player',
            { scale: 0.62, y: 65, opacity: 0.18 },
            { scale: 1.02, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.cinema-filmstrip-item',
            { x: 110, scale: 0.85, opacity: 0.15 },
            { x: 0, scale: 1, opacity: 1, duration: 0.32, stagger: 0.04, ease: 'power2.out' },
            0.05
          )
          // Plateau
          .to('.cinema-widescreen-player', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.cinema-filmstrip-item', { x: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.cinema-widescreen-player', { scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.cinema-filmstrip-row', { x: -75, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 6. CONSULTATION RIBBON — Scrubbed ECG draw & Footer Handoff ──
        gsap.fromTo(
          '.consult-ecg-path',
          { strokeDashoffset: 900 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home-consult-ribbon',
              start: 'top 96%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );

        const ribbonTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-consult-ribbon',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        ribbonTl
          .fromTo('.consult-ribbon-copy', { x: -95, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.consult-ribbon-actions', { x: 95, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.consult-ribbon-flex', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.consult-ribbon-flex', { scale: 0.91, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
      }, homeRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={homeRef} className="home-root">
      {/* ── 1. CENTERED CIRCULAR PORTRAIT HERO WITH ECG BACKDROP ── */}
      <section className="home-hero-stage" aria-label="Introduction">
        <div className="hero-azure-wedge" aria-hidden="true" />

        {/* Medical Heartbeat ECG & Cardiac Rhythm Layer */}
        <div className="hero-ecg-backdrop" aria-hidden="true">
          <div className="hero-ecg-grid" />
          <svg
            className="hero-ecg-svg"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroEcgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 91, 148, 0.05)" />
                <stop offset="35%" stopColor="#005b94" />
                <stop offset="65%" stopColor="#097c7c" />
                <stop offset="100%" stopColor="rgba(9, 124, 124, 0.08)" />
              </linearGradient>
              <filter id="ecgGlow" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              className="hero-ecg-baseline"
              d="M0,72 L160,72 L178,61 L194,72 L236,72 L250,90 L268,18 L286,98 L302,60 L318,72 L520,72 L538,61 L554,72 L596,72 L610,90 L628,18 L646,98 L662,60 L678,72 L890,72 L908,61 L924,72 L966,72 L980,90 L998,18 L1016,98 L1032,60 L1048,72 L1260,72 L1278,61 L1294,72 L1336,72 L1350,90 L1368,18 L1386,98 L1402,60 L1418,72 L1440,72"
              fill="none"
              stroke="rgba(0, 91, 148, 0.16)"
              strokeWidth="1.6"
            />

            <path
              className="hero-ecg-pulse-trace"
              d="M0,72 L160,72 L178,61 L194,72 L236,72 L250,90 L268,18 L286,98 L302,60 L318,72 L520,72 L538,61 L554,72 L596,72 L610,90 L628,18 L646,98 L662,60 L678,72 L890,72 L908,61 L924,72 L966,72 L980,90 L998,18 L1016,98 L1032,60 L1048,72 L1260,72 L1278,61 L1294,72 L1336,72 L1350,90 L1368,18 L1386,98 L1402,60 L1418,72 L1440,72"
              fill="none"
              stroke="url(#heroEcgGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ecgGlow)"
            />
          </svg>
        </div>

        <div className="container home-z1">
          <div className="hero-center-stage">
            {/* Kicker badge */}
            <div className="hero-center-kicker">
              <span className="hero-center-kicker-dot" aria-hidden="true"></span>
              Padma Shri 2016 · Chairman, Interventional Cardiology
            </div>

            {/* Main Headline */}
            <SplitHeading
              as="h1"
              className="hero-center-title"
              text="Non-Surgical Heart Valve &amp; Coronary Care"
            />

            {/* Short Lead */}
            <p className="hero-center-lead">
              Dr. Praveen Chandra leads structural heart interventions at Medanta – The Medicity, Gurugram.
            </p>

            {/* Circular Portrait Composition - Single Central Image */}
            <div className="hero-portrait-composition">
              <div className="hero-portrait-main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    className="hero-portrait-frame-inner"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ResponsiveImage
                      src={currentHero.image}
                      alt={currentHero.caption}
                      priority
                      objectFit="cover"
                      sizes="(max-width: 600px) 80vw, 420px"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="hero-portrait-caption">
                  {currentHero.caption}
                </div>
              </div>
            </div>

            {/* CTA Group */}
            <div className="hero-center-actions">
              <AppointmentButton variant="primary" size="lg" label="Book Appointment" />
              <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                Explore Procedures
              </Link>
            </div>

            {/* Minimal Metric - Horizontal Row */}
            <div className="hero-center-metric-row">
              <span className="hero-center-metric-val tabular-nums">30+</span>
              <span className="hero-center-metric-sep">·</span>
              <span className="hero-center-metric-lbl">Years Clinical Leadership</span>
              <span className="hero-center-metric-sep">·</span>
              <span className="hero-center-metric-val tabular-nums">100+</span>
              <span className="hero-center-metric-sep">·</span>
              <span className="hero-center-metric-lbl">Scientific Papers</span>
              <span className="hero-center-metric-sep">·</span>
              <span className="hero-center-metric-val tabular-nums">1st in India</span>
              <span className="hero-center-metric-lbl">TAVI &amp; MitraClip Pioneer</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CARDIAC ANATOMY STAGE (RICH SAPPHIRE-TEAL CONTRAST) ── */}
      <section className="section home-anatomy-stage" id="anatomy" aria-label="Interactive Cardiac Anatomy">
        <div className="container home-z1">
          <div className="stage-header-row anat-section-header">
            <div>
              <div className="section-kicker section-kicker--light">Interactive Cardiac Atlas</div>
              <SplitHeading
                as="h2"
                className="section-heading section-heading--light"
                text="Target Zone & Catheter Therapy"
              />
            </div>
            <p className="section-lead section-lead--light">
              Select any cardiac zone to inspect its matched catheter therapy.
            </p>
          </div>

          <div className="anatomy-stage-grid">
            {/* Left Large Uncropped Heart Diagram */}
            <div className="anatomy-diagram-stage">
              <div className="anatomy-circle-backdrop" aria-hidden="true" />
              <div className="anatomy-image-holder">
                <ResponsiveImage
                  src={DOCTOR.illustrations.anatomy}
                  alt="Human cardiac anatomy illustration showing valves and coronary arteries"
                  objectFit="contain"
                  sizes="(max-width: 900px) 90vw, 480px"
                />
                {ANATOMY_HOTSPOTS.map((spot, idx) => {
                  const isActive = anatomyCycle.activeIndex === idx;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      className={`anat-pin-btn ${isActive ? 'is-active' : ''}`}
                      style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
                      onClick={() => anatomyCycle.selectIndex(idx)}
                      aria-label={`Select ${spot.zone}: ${spot.procedure}`}
                      aria-pressed={isActive}
                    >
                      <span className="tabular-nums">{spot.index}</span>
                      {isActive && <span className="anat-pin-ripple" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Dynamic Matching Content + Paired Procedure Visuals */}
            <div className="anatomy-dynamic-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHotspot.id}
                  className="anatomy-dynamic-inner"
                  initial={{ opacity: 0, x: 24, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="anat-text-block">
                    <div className="anat-zone-kicker">
                      <span className="tabular-nums">{currentHotspot.index}</span>
                      <span>·</span>
                      <span>{currentHotspot.zone}</span>
                      <span>·</span>
                      <span className="anat-milestone-gold">{currentHotspot.milestone}</span>
                    </div>
                    <h3 className="anat-proc-title">{currentHotspot.procedure}</h3>
                    <p className="anat-proc-summary">{currentHotspot.summary}</p>
                  </div>

                  {/* Large Matched Visual + Companion Procedure Context Frame */}
                  <div className="anat-visual-pair">
                    <div className="anat-matched-visual">
                      <ResponsiveImage
                        src={currentHotspot.image}
                        alt={`${currentHotspot.procedure} illustration`}
                        objectFit="contain"
                        sizes="(max-width: 900px) 88vw, 420px"
                      />
                    </div>
                    <div className="anat-inset-lab" aria-hidden="true">
                      <ResponsiveImage
                        src={DOCTOR.images.cathLab}
                        alt=""
                        objectFit="cover"
                        sizes="180px"
                      />
                      <span>Medanta Cath Lab</span>
                    </div>
                  </div>

                  <div className="anat-action-row">
                    <Link to={`/treatments#${currentHotspot.id}`} className="btn-clinical btn-clinical--light">
                      Inspect {currentHotspot.procedure.split(' ')[0]} →
                    </Link>
                    <span className="anat-device-note">{currentHotspot.device}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Interactive Zone Bar */}
          <div className="anatomy-zone-rail" role="tablist" aria-label="Cardiac zones">
            {ANATOMY_HOTSPOTS.map((spot, idx) => {
              const isActive = anatomyCycle.activeIndex === idx;
              return (
                <button
                  key={spot.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`anat-rail-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => anatomyCycle.selectIndex(idx)}
                >
                  <div className="anat-rail-label">
                    <span className="tabular-nums">{spot.index}</span>
                    <span>{spot.zone}</span>
                  </div>
                  <div className="cycle-progress-track cycle-progress-track--light">
                    {isActive && (
                      <div
                        key={`anat-prog-${anatomyCycle.cycleKey}`}
                        className="cycle-progress-bar"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. DEVICES GALLERY — ASYMMETRIC MULTI-IMAGE STAGE WITH INVERSE SCROLL TRANSFORM ── */}
      <section className="section home-devices-stage" aria-label="Medical Devices Showcase">
        <div className="devices-mint-band" aria-hidden="true" />

        <div className="container home-z1">
          <div className="stage-header-row dev-wide-header">
            <div>
              <div className="section-kicker">Pioneering Technologies</div>
              <SplitHeading as="h2" className="section-heading" text="Devices & Catheter Breakthroughs" />
            </div>
            <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
              All 7 Procedures →
            </Link>
          </div>

          {/* Horizontal Tab Strip (breaks vertical sidebar monotony) */}
          <div className="dev-horizontal-tabs" role="tablist" aria-label="Medical devices">
            {DEVICES_SHOWCASE.map((dev, idx) => {
              const isActive = deviceCycle.activeIndex === idx;
              return (
                <button
                  key={dev.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`dev-h-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => deviceCycle.selectIndex(idx)}
                >
                  <span className="dev-h-num tabular-nums">0{idx + 1}</span>
                  <span className="dev-h-name">{dev.name.split('(')[0].trim()}</span>
                  {isActive && (
                    <div className="cycle-progress-track" style={{ marginTop: '0.45rem' }}>
                      <div
                        key={`dev-prog-${deviceCycle.cycleKey}`}
                        className="cycle-progress-bar"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 3-Frame Transforming Visual Composition */}
          <div className="dev-gallery-triptych">
            {/* Left Companion Frame (clickable to switch) */}
            <button
              type="button"
              className="dev-gallery-side dev-gallery-side-left"
              onClick={deviceCycle.prev}
              aria-label={`View previous device: ${DEVICES_SHOWCASE[(deviceCycle.activeIndex - 1 + DEVICES_SHOWCASE.length) % DEVICES_SHOWCASE.length].name}`}
            >
              <div className="dev-side-frame">
                <ResponsiveImage
                  src={DEVICES_SHOWCASE[(deviceCycle.activeIndex - 1 + DEVICES_SHOWCASE.length) % DEVICES_SHOWCASE.length].image}
                  alt={DEVICES_SHOWCASE[(deviceCycle.activeIndex - 1 + DEVICES_SHOWCASE.length) % DEVICES_SHOWCASE.length].name}
                  objectFit="contain"
                  sizes="280px"
                />
              </div>
              <span className="dev-side-caption">
                ← {DEVICES_SHOWCASE[(deviceCycle.activeIndex - 1 + DEVICES_SHOWCASE.length) % DEVICES_SHOWCASE.length].name.split('(')[0].trim()}
              </span>
            </button>

            {/* Primary Dominant Device Frame */}
            <div className="dev-gallery-primary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDevice.id}
                  className="dev-primary-stage"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dev-primary-visual">
                    <ResponsiveImage
                      src={currentDevice.image}
                      alt={currentDevice.name}
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 560px"
                    />
                  </div>
                  <div className="dev-primary-info">
                    <div className="dev-info-meta">
                      <span className="device-tag-mono">{currentDevice.tag}</span>
                      <div className="device-arrow-pair">
                        <button type="button" onClick={deviceCycle.prev} aria-label="Previous device" className="round-nav-btn">←</button>
                        <button type="button" onClick={deviceCycle.next} aria-label="Next device" className="round-nav-btn">→</button>
                      </div>
                    </div>
                    <h3>{currentDevice.name}</h3>
                    <p>{currentDevice.benefit}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Companion Frame (clickable to advance) */}
            <button
              type="button"
              className="dev-gallery-side dev-gallery-side-right"
              onClick={deviceCycle.next}
              aria-label={`View next device: ${nextDevice.name}`}
            >
              <div className="dev-side-frame">
                <ResponsiveImage
                  src={nextDevice.image}
                  alt={nextDevice.name}
                  objectFit="contain"
                  sizes="280px"
                />
              </div>
              <span className="dev-side-caption">
                {nextDevice.name.split('(')[0].trim()} →
              </span>
              <span className="dev-side-sub">{thirdDevice.tag}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. PADMA SHRI & HERITAGE — 4-IMAGE EDITORIAL MAGAZINE COLLAGE ── */}
      <section className="section home-legacy-stage" aria-label="National Honors and Heritage">
        <div className="container home-z1">
          <div className="stage-header-row leg-section-header">
            <div>
              <div className="section-kicker">National Honor &amp; Heritage</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Three Decades of Pioneering Firsts"
              />
            </div>
            <Link to="/about" className="btn-clinical btn-clinical--primary">
              Full Biography &amp; Qualifications →
            </Link>
          </div>

          {/* 4-Photo Asymmetric Mosaic converging from 4 corners on scroll */}
          <div className="legacy-mosaic-grid">
            {LEGACY_COLLAGE.map((scene, idx) => {
              const isActive = legacyCycle.activeIndex === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => legacyCycle.selectIndex(idx)}
                  className={`collage-tile collage-tile-${idx} ${scene.slot} ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                >
                  <div className="collage-tile-img">
                    <ResponsiveImage
                      src={scene.image}
                      alt={scene.caption}
                      objectFit={idx === 0 || idx === 1 ? 'cover' : 'cover'}
                      sizes="(max-width: 768px) 92vw, 38vw"
                    />
                  </div>
                  <div className="collage-tile-overlay">
                    <span className="collage-year tabular-nums">{scene.year}</span>
                    <span className="collage-title">{scene.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Open Concise Editorial Rail below Collage */}
          <div className="legacy-editorial-rail">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLegacy.id}
                className="legacy-rail-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="legacy-rail-left">
                  <span className="legacy-rail-year tabular-nums">{currentLegacy.year}</span>
                  <h3>{currentLegacy.title}</h3>
                </div>
                <p className="legacy-rail-desc">{currentLegacy.subtitle}</p>
                <span className="legacy-rail-caption">{currentLegacy.caption}</span>
              </motion.div>
            </AnimatePresence>
            <div className="cycle-progress-track" style={{ marginTop: '0.85rem' }}>
              <div
                key={`leg-prog-${legacyCycle.cycleKey}`}
                className="cycle-progress-bar"
                style={{ animationDuration: '5.2s' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CLINICAL CINEMA — FULL-WIDTH DEEP SAPPHIRE THEATER + FILMSTRIP ── */}
      <section className="section home-cinema-stage" aria-label="Featured Videos">
        <div className="container home-z1">
          <div className="stage-header-row cin-section-header">
            <div>
              <div className="section-kicker section-kicker--light">Watch &amp; Learn</div>
              <SplitHeading
                as="h2"
                className="section-heading section-heading--light"
                text="Clinical Explainers & Patient Stories"
              />
            </div>
            <Link to="/media" className="btn-clinical btn-clinical--light">
              View All 10 Videos →
            </Link>
          </div>

          {/* Widescreen Dominant Theater Showcase */}
          <div className="cinema-widescreen-player">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo.id}
                className="cinema-theater-grid"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.34 }}
              >
                <div
                  className="cinema-thumb-hero"
                  onClick={() => setActiveVideoModal(currentVideo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveVideoModal(currentVideo);
                    }
                  }}
                  aria-label={`Play video: ${currentVideo.title}`}
                >
                  <ResponsiveImage
                    src={currentVideo.thumbnail}
                    alt={currentVideo.title}
                    objectFit="cover"
                    sizes="(max-width: 900px) 92vw, 720px"
                  />
                  <div className="cinema-play-circle" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                    </svg>
                  </div>
                </div>

                <div className="cinema-theater-meta">
                  <span className="cinema-cat-text">
                    {currentVideo.category} · <span className="tabular-nums">{currentVideo.duration}</span>
                  </span>
                  <h3>{currentVideo.title}</h3>
                  <p>{currentVideo.description}</p>
                  <div className="cinema-links-group">
                    <button
                      type="button"
                      className="btn-clinical btn-clinical--light"
                      onClick={() => setActiveVideoModal(currentVideo)}
                    >
                      Play Video
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-clinical cinema-outline-light"
                    >
                      YouTube ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Staggered 4-Frame Filmstrip Row */}
          <div className="cinema-filmstrip-row" role="tablist" aria-label="Spotlight videos">
            {SPOTLIGHT_VIDEOS.map((vid, idx) => {
              const isActive = videoCycle.activeIndex === idx;
              return (
                <button
                  key={vid.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`cinema-filmstrip-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => videoCycle.selectIndex(idx)}
                >
                  <div className="cinema-fs-thumb">
                    <ResponsiveImage src={vid.thumbnail} alt={vid.title} objectFit="cover" sizes="280px" />
                    <span className="cinema-fs-dur tabular-nums">{vid.duration}</span>
                  </div>
                  <div className="cinema-fs-info">
                    <span className="cinema-pl-cat">{vid.category}</span>
                    <span className="cinema-pl-title">{vid.title}</span>
                    {isActive && (
                      <div className="cycle-progress-track cycle-progress-track--light" style={{ marginTop: '0.45rem' }}>
                        <div
                          key={`vid-prog-${videoCycle.cycleKey}`}
                          className="cycle-progress-bar"
                          style={{ animationDuration: '6s' }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CONSULTATION RIBBON WITH SUBTLE SCRUBBED ECG ── */}
      <section className="home-consult-ribbon" aria-label="Book Appointment">
        <svg className="consult-ecg-svg" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="consult-ecg-path"
            d="M0,55 L220,55 L245,42 L262,55 L310,55 L325,76 L345,14 L365,90 L385,46 L402,55 L640,55 L665,42 L682,55 L730,55 L745,76 L765,14 L785,90 L805,46 L822,55 L1200,55"
            fill="none"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1.9"
            strokeDasharray="900"
            strokeDashoffset="900"
          />
        </svg>

        <div className="container home-z1">
          <div className="consult-ribbon-flex">
            <div className="consult-ribbon-copy">
              <h2>Consult Dr. Praveen Chandra at Medanta</h2>
              <p className="tabular-nums">
                Sector 38, Gurugram · <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a> · <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a> · Emergency 1068
              </p>
            </div>
            <div className="consult-ribbon-actions">
              <AppointmentButton variant="white" size="lg" label="Book Appointment" />
              <Link to="/contact" className="btn-clinical btn-clinical--light">
                Map &amp; OPD Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {activeVideoModal && (
        <VideoModal video={activeVideoModal} onClose={() => setActiveVideoModal(null)} />
      )}
    </div>
  );
}
