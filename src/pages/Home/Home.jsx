// Home.jsx – Bold scroll-driven transformations: mount left/right split, image growth/shrink, diagonal merges, color transitions, and layout shifts
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import VideoModal from '../../components/media/VideoModal';
import SplitHeading from '../../components/motion/SplitHeading';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { animateNumericCounters } from '../../utils/motionHelpers';
import {
  DOCTOR,
  VERIFIED_METRICS,
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
  },
  {
    id: 'padma',
    index: '02',
    label: 'Padma Shri 2016',
    caption: 'Conferred the Padma Shri by the President of India (2016)',
    image: DOCTOR.images.awardPodium,
  },
  {
    id: 'cathlab',
    index: '03',
    label: 'Cath Lab Pioneer',
    caption: 'Leading complex coronary & structural heart procedures',
    image: DOCTOR.images.cathLab,
  },
];

const LEGACY_SCENES = [
  {
    id: 'padma',
    year: '2016',
    title: 'Padma Shri National Honor',
    subtitle: 'Conferred by the President of India for cardiovascular medicine.',
    image: DOCTOR.images.awardPodium,
    caption: 'Padma Shri Investiture Ceremony, Rashtrapati Bhavan',
  },
  {
    id: 'firsts',
    year: 'First in India',
    title: 'TAVI & MitraClip Pioneer',
    subtitle: 'First non-surgical aortic & mitral valve interventions in India.',
    image: DOCTOR.images.cathLab,
    caption: 'Cardiac Catheterization Suite, Medanta – The Medicity',
  },
  {
    id: 'faculty',
    year: '1992 – Present',
    title: '30+ Years Clinical Leadership',
    subtitle: 'Past Chairman, National Interventional Council & global faculty.',
    image: DOCTOR.images.speaking,
    caption: 'Addressing international interventional cardiology symposia',
  },
];

const SPOTLIGHT_VIDEOS = MEDIA_VIDEOS.slice(0, 4);

export default function Home() {
  const heroCycle = useAutoCycle(HERO_SLIDES.length, 5200);
  const anatomyCycle = useAutoCycle(ANATOMY_HOTSPOTS.length, 5500);
  const deviceCycle = useAutoCycle(DEVICES_SHOWCASE.length, 5500);
  const legacyCycle = useAutoCycle(LEGACY_SCENES.length, 5500);
  const videoCycle = useAutoCycle(SPOTLIGHT_VIDEOS.length, 6000);

  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const homeRef = useRef(null);

  const currentHero = HERO_SLIDES[heroCycle.activeIndex];
  const currentHotspot = ANATOMY_HOTSPOTS[anatomyCycle.activeIndex];
  const currentDevice = DEVICES_SHOWCASE[deviceCycle.activeIndex];
  const currentLegacy = LEGACY_SCENES[legacyCycle.activeIndex];
  const currentVideo = SPOTLIGHT_VIDEOS[videoCycle.activeIndex];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. HERO SECTION — Strong opposing left/right mount entrance + subtle post-settle float + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.hero-azure-wedge',
            { xPercent: 45, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
          )
          .fromTo(
            '.hero-copy-col',
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            '.hero-visual-col',
            { x: 135, scale: 0.72, rotate: 2.5, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
            0.08
          )
          .fromTo(
            '.hero-kicker',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            0.18
          )
          .fromTo(
            '.hero-display-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power3.out' },
            0.25
          )
          .fromTo(
            '.hero-short-lead',
            { x: -25, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            0.52
          )
          .fromTo(
            '.hero-cta-group > *',
            { scale: 0.82, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.62
          )
          .fromTo(
            '.hero-inline-stat',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
            0.72
          )
          .fromTo(
            '.hero-switch-item',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
            0.68
          );

        animateNumericCounters('.hero-stat-value', {
          trigger: '.home-hero-stage',
          start: 'top 95%',
        });

        // Subtle continuous floating motion after hero visual settles
        gsap.to('.hero-stage-float', {
          y: -9,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        // Restrained hero ECG draw & ambient particle drift
        gsap.fromTo(
          '.hero-ambient-ecg-path',
          { strokeDashoffset: 1200 },
          { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out', delay: 0.35 }
        );
        gsap.to('.hero-ambient-particle', {
          y: -18,
          x: 10,
          duration: 4.5,
          stagger: { each: 0.7, from: 'random' },
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // Hero Scroll-Out Transformation (separate inner targets to avoid mount conflict)
        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.hero-copy-inner', { x: -75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.hero-visual-inner-scrub', { x: 75, y: -32, scale: 0.84, opacity: 0.2, ease: 'none' }, 0)
          .to('.hero-azure-wedge', { yPercent: -12, opacity: 0.3, ease: 'none' }, 0);

        // ── 2. ANATOMY STAGE — Scroll-scrubbed small-to-dominant growth, radial pin burst, color shift & shrink exit ──
        const anatTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-anatomy-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        anatTl
          // Phase 1 (0 -> 0.35): dramatic growth & split entrance
          .fromTo(
            '.anat-section-header .section-heading',
            { x: -70, color: '#8ac2e8', opacity: 0.25 },
            { x: 0, color: '#ffffff', opacity: 1, duration: 0.32, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.anat-section-header .section-lead',
            { x: 80, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.anatomy-circle-backdrop',
            { scale: 0.25, opacity: 0.1 },
            { scale: 1.06, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.anatomy-image-holder',
            { scale: 0.56, y: 80, rotate: -6, opacity: 0.15 },
            { scale: 1.04, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
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
            { x: 115, scale: 0.86, opacity: 0.15 },
            { x: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0.03
          )
          .fromTo(
            '.anatomy-zone-rail',
            { y: 65, opacity: 0.15 },
            { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out' },
            0.06
          )
          // Phase 2 (0.36 -> 0.68): Full crisp readability plateau
          .to('.anatomy-image-holder', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.anatomy-dynamic-stage', { x: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          // Phase 3 (0.68 -> 1.0): Shrink & recede into next section
          .to('.anatomy-diagram-stage', { scale: 0.74, y: -60, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.anatomy-dynamic-stage', { x: 85, y: -30, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.anatomy-zone-rail', { y: -25, opacity: 0.18, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. DEVICES STAGE — Background shape sweep, layout shift, image compact-to-large growth & heading color ──
        const devTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-devices-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        devTl
          .fromTo(
            '.devices-bg-shape',
            { xPercent: 32, rotate: -12, scale: 0.85 },
            { xPercent: 0, rotate: -4, scale: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.dev-section-header .section-heading',
            { color: '#6c87a1', x: -50 },
            { color: '#09223a', x: 0, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.devices-selector-col',
            { x: -110, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.devices-showcase-col',
            { scale: 0.62, x: 115, y: 55, opacity: 0.15 },
            { scale: 1.03, x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.devices-showcase-col', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.devices-selector-col', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit layout transformation: selector pulls left while showcase centers & compresses
          .to('.devices-selector-col', { x: -90, opacity: 0.15, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.devices-showcase-col', { x: -65, scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.devices-bg-shape', { xPercent: -14, rotate: 3, opacity: 0.4, duration: 0.32 }, 0.68);

        // ── 4. LEGACY STAGE — Two diagonal panels entering from opposite corners & merging, then splitting apart ──
        const legTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.home-legacy-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.85,
          },
        });

        legTl
          .fromTo(
            '.legacy-visual-col',
            { x: -135, y: -80, rotate: -4, scale: 0.72, opacity: 0.15 },
            { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.legacy-copy-col',
            { x: 135, y: 80, rotate: 3, opacity: 0.15 },
            { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.leg-section-header .section-heading',
            { color: '#6c87a1' },
            { color: '#09223a', duration: 0.35 },
            0
          )
          .fromTo(
            '.legacy-photo-bar',
            { y: 45, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.25 },
            0.12
          )
          // Plateau
          .to('.legacy-visual-col', { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          .to('.legacy-copy-col', { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Split exit
          .to('.legacy-visual-col', { x: -75, y: -55, scale: 0.8, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.legacy-copy-col', { x: 75, y: 45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 5. VIDEO CINEMA — Small screen expanding into dominant cinema frame, playlist sliding horizontally ──
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
            '.cinema-main-col',
            { scale: 0.58, y: 75, opacity: 0.2 },
            { scale: 1.03, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.cinema-list-col',
            { x: 115, rotate: 2, opacity: 0.15 },
            { x: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.03
          )
          // Plateau
          .to('.cinema-main-col', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.cinema-list-col', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.cinema-main-col', { scale: 0.76, y: -50, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.cinema-list-col', { x: 80, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 6. CONSULTATION RIBBON — Scrubbed ECG draw + opposing split + smooth handoff to Footer ──
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
          .fromTo('.consult-ribbon-copy', { x: -100, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.consult-ribbon-actions', { x: 100, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.consult-ribbon-flex', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.consult-ribbon-flex', { scale: 0.9, y: -26, opacity: 0.32, duration: 0.28 }, 0.72);
      }, homeRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={homeRef} className="home-root">
      {/* ── 1. SPOTLIGHT HERO ── */}
      <section className="home-hero-stage" aria-label="Introduction">
        <div className="hero-azure-wedge" aria-hidden="true" />

        {/* Subtle Hero-Only Ambient Accents & Heartbeat ECG */}
        <div className="hero-ambient-layer" aria-hidden="true">
          <span className="hero-ambient-particle hero-p1" />
          <span className="hero-ambient-particle hero-p2" />
          <span className="hero-ambient-particle hero-p3" />
          <span className="hero-ambient-particle hero-p4" />
          <svg className="hero-ambient-ecg" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              className="hero-ambient-ecg-path"
              d="M0,48 L320,48 L344,36 L360,48 L410,48 L424,68 L442,10 L460,74 L478,40 L494,48 L880,48 L904,36 L920,48 L970,48 L984,68 L1002,10 L1020,74 L1038,40 L1054,48 L1440,48"
              fill="none"
              stroke="rgba(0, 91, 148, 0.14)"
              strokeWidth="1.6"
              strokeDasharray="1200"
              strokeDashoffset="1200"
            />
          </svg>
        </div>

        <div className="container home-z1">
          <div className="hero-split-layout">
            {/* Left Copy */}
            <div className="hero-copy-col">
              <div className="hero-copy-inner">
                <p className="hero-kicker">
                  Padma Shri 2016 · Chairman, Interventional Cardiology
                </p>

                <SplitHeading
                  as="h1"
                  className="hero-display-title"
                  text="Non-Surgical Heart Valve & Coronary Care"
                />

                <p className="hero-short-lead">
                  Dr. Praveen Chandra leads structural heart interventions at{' '}
                  <strong>Medanta – The Medicity, Gurugram</strong>.
                </p>

                <div className="hero-cta-group">
                  <AppointmentButton variant="primary" size="lg" label="Book Appointment" />
                  <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                    Explore Procedures
                  </Link>
                </div>

                <div className="hero-inline-metrics">
                  {VERIFIED_METRICS.slice(0, 3).map((m) => (
                    <div className="hero-inline-stat" key={m.label}>
                      <span className="hero-stat-value tabular-nums">{m.value}</span>
                      <span className="hero-stat-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Auto-Cycling Visual Stage */}
            <div className="hero-visual-col">
              <div className="hero-visual-inner-scrub">
                <div className="hero-stage-float">
                  <div className="hero-stage-frame">
                    <div className="hero-curtain-mask media-reveal-mask">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentHero.id}
                          className="hero-slide-inner"
                          initial={{ opacity: 0, x: 30, scale: 0.96 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -24, scale: 1.02 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <img
                            src={currentHero.image}
                            alt={currentHero.caption}
                            loading="eager"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="hero-stage-caption">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentHero.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.26 }}
                        >
                          {currentHero.caption}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Interactive Auto-Synced Hero Slide Switcher */}
                <div className="hero-switcher-bar" role="tablist" aria-label="Doctor highlights">
                  {HERO_SLIDES.map((slide, idx) => {
                    const isActive = heroCycle.activeIndex === idx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`hero-switch-item ${isActive ? 'is-active' : ''}`}
                        onClick={() => heroCycle.selectIndex(idx)}
                      >
                        <div className="hero-switch-top">
                          <span className="tabular-nums">{slide.index}</span>
                          <span>{slide.label}</span>
                        </div>
                        <div className="cycle-progress-track">
                          {isActive && (
                            <div
                              key={`hero-prog-${heroCycle.cycleKey}`}
                              className="cycle-progress-bar"
                              style={{ animationDuration: '5.2s' }}
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CARDIAC ANATOMY STAGE ── */}
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
                <img
                  src={DOCTOR.illustrations.anatomy}
                  alt="Human cardiac anatomy illustration showing valves and coronary arteries"
                  loading="lazy"
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

            {/* Right Dynamic Matching Content + Matched Visual */}
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

                  {/* Large Matched Procedure Visual */}
                  <div className="anat-matched-visual">
                    <img
                      src={currentHotspot.image}
                      alt={`${currentHotspot.procedure} illustration`}
                      loading="lazy"
                    />
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

      {/* ── 3. PIONEERING DEVICES & CLINICAL FIRSTS ── */}
      <section className="section home-devices-stage" aria-label="Medical Devices Showcase">
        <div className="devices-bg-shape" aria-hidden="true" />

        <div className="container home-z1">
          <div className="devices-split-layout">
            {/* Left Vertical Selector */}
            <div className="devices-selector-col">
              <div className="stage-header-row dev-section-header">
                <div>
                  <div className="section-kicker">Pioneering Technologies</div>
                  <SplitHeading as="h2" className="section-heading" text="Devices & Breakthroughs" />
                </div>
              </div>

              <div className="devices-vertical-list" role="tablist" aria-label="Medical devices">
                {DEVICES_SHOWCASE.map((dev, idx) => {
                  const isActive = deviceCycle.activeIndex === idx;
                  return (
                    <button
                      key={dev.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`dev-list-row ${isActive ? 'is-active' : ''}`}
                      onClick={() => deviceCycle.selectIndex(idx)}
                    >
                      <div className="dev-row-header">
                        <span className="dev-row-num tabular-nums">0{idx + 1}</span>
                        <span className="dev-row-name">{dev.name}</span>
                      </div>
                      {isActive && (
                        <div className="cycle-progress-track" style={{ marginTop: '0.55rem' }}>
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
            </div>

            {/* Right Uncropped Visual & Dynamic Text */}
            <div className="devices-showcase-col">
              <div className="device-curtain-mask media-reveal-mask">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDevice.id}
                    className="device-hero-display"
                    initial={{ opacity: 0, scale: 0.95, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="device-big-visual">
                      <img
                        src={currentDevice.image}
                        alt={currentDevice.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="device-overlay-strip">
                      <span className="device-tag-mono">{currentDevice.tag}</span>
                      <h3>{currentDevice.name}</h3>
                      <p>{currentDevice.benefit}</p>
                      <div className="device-strip-actions">
                        <Link to="/treatments" className="btn-clinical btn-clinical--primary">
                          View All Treatments →
                        </Link>
                        <div className="device-arrow-pair">
                          <button
                            type="button"
                            onClick={deviceCycle.prev}
                            aria-label="Previous device"
                            className="round-nav-btn"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={deviceCycle.next}
                            aria-label="Next device"
                            className="round-nav-btn"
                          >
                            →
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PADMA SHRI & CLINICAL LEADERSHIP ── */}
      <section className="section home-legacy-stage" aria-label="National Honors and Heritage">
        <div className="container home-z1">
          <div className="legacy-split-grid">
            {/* Left Uncropped Photo Stage */}
            <div className="legacy-visual-col">
              <div className="legacy-photo-stage">
                <div className="legacy-photo-mask media-reveal-mask">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentLegacy.id}
                      className="legacy-photo-inner"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={currentLegacy.image}
                        alt={currentLegacy.caption}
                        loading="lazy"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="legacy-photo-bar">
                  <span>{currentLegacy.caption}</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Milestone Selector */}
            <div className="legacy-copy-col">
              <div className="stage-header-row leg-section-header">
                <div>
                  <div className="section-kicker">National Honor &amp; Heritage</div>
                  <SplitHeading
                    as="h2"
                    className="section-heading"
                    text="Three Decades of Pioneering Firsts"
                  />
                </div>
              </div>

              <div className="legacy-selector-stack" role="tablist" aria-label="Career milestones">
                {LEGACY_SCENES.map((scene, idx) => {
                  const isActive = legacyCycle.activeIndex === idx;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`legacy-row-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => legacyCycle.selectIndex(idx)}
                    >
                      <div className="legacy-row-meta tabular-nums">{scene.year}</div>
                      <div className="legacy-row-text">
                        <h4>{scene.title}</h4>
                        <p>{scene.subtitle}</p>
                      </div>
                      {isActive && (
                        <div className="cycle-progress-track" style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                          <div
                            key={`leg-prog-${legacyCycle.cycleKey}`}
                            className="cycle-progress-bar"
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="leg-cta-wrap" style={{ marginTop: '1.25rem' }}>
                <Link to="/about" className="btn-clinical btn-clinical--primary">
                  Full Biography &amp; Qualifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. AUTO-CYCLING VIDEO CINEMA ── */}
      <section className="section home-cinema-stage" aria-label="Featured Videos">
        <div className="container home-z1">
          <div className="stage-header-row cin-section-header">
            <div>
              <div className="section-kicker">Watch &amp; Learn</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Clinical Explainers & Patient Stories"
              />
            </div>
            <Link to="/media" className="btn-clinical btn-clinical--secondary">
              View All 10 Videos →
            </Link>
          </div>

          <div className="cinema-stage-split">
            {/* Left Dynamic 16:9 Cinema Stage */}
            <div className="cinema-main-col">
              <div className="cinema-aperture-mask">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentVideo.id}
                    className="cinema-player-stage"
                    initial={{ opacity: 0, scale: 0.96 }}
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
                      <img
                        src={currentVideo.thumbnail}
                        alt={currentVideo.title}
                        loading="lazy"
                      />
                      <div className="cinema-play-circle" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                        </svg>
                      </div>
                    </div>

                    <div className="cinema-caption-strip">
                      <div>
                        <span className="cinema-cat-text">
                          {currentVideo.category} · <span className="tabular-nums">{currentVideo.duration}</span>
                        </span>
                        <h3>{currentVideo.title}</h3>
                      </div>
                      <div className="cinema-links-group">
                        <button
                          type="button"
                          className="btn-clinical btn-clinical--primary"
                          onClick={() => setActiveVideoModal(currentVideo)}
                        >
                          Play Video
                        </button>
                        <a
                          href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-clinical btn-clinical--secondary"
                        >
                          YouTube ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Selectable Video Playlist */}
            <div className="cinema-list-col" role="tablist" aria-label="Spotlight videos">
              {SPOTLIGHT_VIDEOS.map((vid, idx) => {
                const isActive = videoCycle.activeIndex === idx;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`cinema-playlist-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => videoCycle.selectIndex(idx)}
                  >
                    <div className="cinema-pl-thumb">
                      <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                    </div>
                    <div className="cinema-pl-info">
                      <span className="cinema-pl-cat">{vid.category}</span>
                      <span className="cinema-pl-title">{vid.title}</span>
                      {isActive && (
                        <div className="cycle-progress-track" style={{ marginTop: '0.45rem' }}>
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
        </div>
      </section>

      {/* ── 6. CONSULTATION RIBBON WITH SUBTLE SCRUBBED ECG ── */}
      <section className="home-consult-ribbon" aria-label="Book Appointment">
        <svg className="consult-ecg-svg" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="consult-ecg-path"
            d="M0,55 L220,55 L245,42 L262,55 L310,55 L325,76 L345,14 L365,90 L385,46 L402,55 L640,55 L665,42 L682,55 L730,55 L745,76 L765,14 L785,90 L805,46 L822,55 L1200,55"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.8"
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
