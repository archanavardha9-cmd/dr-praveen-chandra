// Home.jsx – Complete multi-directional GSAP scroll choreography for every section and element
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import HeartAnimation from '../../components/backgrounds/HeartAnimation';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import { useAutoCycle } from '../../hooks/useAutoCycle';
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
    subtitle: 'Conferred by the President of India for pioneering cardiovascular medicine.',
    image: DOCTOR.images.awardPodium,
    caption: 'Padma Shri Investiture Ceremony, Rashtrapati Bhavan',
  },
  {
    id: 'firsts',
    year: 'First in India',
    title: 'TAVI & MitraClip Valve Pioneer',
    subtitle: 'First non-surgical aortic valve implantation & mitral clip repair in India.',
    image: DOCTOR.images.cathLab,
    caption: 'Cardiac Catheterization Suite, Medanta – The Medicity',
  },
  {
    id: 'faculty',
    year: '1992 – Present',
    title: '30+ Years Global Leadership',
    subtitle: 'Past Chairman, National Interventional Council & international keynote faculty.',
    image: DOCTOR.images.speaking,
    caption: 'Addressing global interventional cardiology symposia',
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
        // ── 1. HERO STAGE — Every element animates individually ──
        // Left column staggered reveals
        // Hero — every element reveals repeatedly on scroll (no one-time entrances)
        gsap.fromTo('.hero-kicker', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-display-title', { opacity: 0, x: -50, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-short-lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-cta-group', { opacity: 0, y: 25, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-inline-metrics', { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 0.9, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });

        // Right column directional reveals
        gsap.fromTo('.hero-visual-col', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-stage-frame', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-orbital-1', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-orbital-2', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.hero-switcher-bar', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });

        // Hero copy scrubbed layer — reveal opacity only (transform is scrubbed)
        gsap.fromTo('.hero-copy-col', { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.home-hero-stage', start: 'top 78%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });

        // Continuous Hero Scroll Scrub (Layered 3D Motion)
        gsap.to('.hero-stage-frame', { yPercent: 14, scale: 1.05, rotationY: -4, ease: 'none', scrollTrigger: { trigger: '.home-hero-stage', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.hero-orbital-1', { yPercent: -45, xPercent: 12, rotation: -4, ease: 'none', scrollTrigger: { trigger: '.home-hero-stage', start: 'top top', end: 'bottom top', scrub: 0.8 } });
        gsap.to('.hero-orbital-2', { yPercent: 35, xPercent: -10, rotation: 4, ease: 'none', scrollTrigger: { trigger: '.home-hero-stage', start: 'top top', end: 'bottom top', scrub: 0.8 } });
        gsap.to('.hero-copy-col', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.home-hero-stage', start: 'top top', end: 'bottom top', scrub: 1 } });

        // ── 2. ANATOMY STAGE — Split directional reveals ──
        gsap.fromTo('.anat-section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-from-left', { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-from-right', { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-from-bottom', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Individual anatomy elements
        gsap.fromTo('.anat-section-kicker', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-section-heading', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-section-lead', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        gsap.fromTo('.anatomy-diagram-stage img', { opacity: 0, scale: 0.8, rotate: -8 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.9, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-pin-btn', { opacity: 0, scale: 0.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        gsap.fromTo('.anat-zone-kicker', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-proc-title', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-proc-summary', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-matched-visual', { opacity: 0, scale: 0.85, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.9, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.anat-action-row', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.35, ease: 'power3.out', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Continuous Anatomy Heart Diagram Scrub & Breathing Scale
        gsap.fromTo('.anatomy-diagram-stage img', { scale: 0.9, rotate: -6 }, { scale: 1.08, rotate: 5, ease: 'none', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        gsap.fromTo('.anatomy-circle-backdrop', { scale: 0.75, opacity: 0.25 }, { scale: 1.3, opacity: 0.85, ease: 'none', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.fromTo('.anatomy-dynamic-stage', { yPercent: 10 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.home-anatomy-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });

        // ── 3. DEVICES STAGE — Alternating directional reveals ──
        gsap.fromTo('.dev-section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.dev-from-left', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.dev-from-right', { opacity: 0, x: 60, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Individual device elements
        gsap.fromTo('.devices-bg-shape', { opacity: 0, xPercent: 15, yPercent: -10 }, { opacity: 1, xPercent: 0, yPercent: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.section-kicker', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.devices-showcase-col h2', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        gsap.fromTo('.dev-list-row', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.device-big-visual img', { opacity: 0, scale: 0.8, rotateX: 12 }, { opacity: 1, scale: 1, rotateX: 0, duration: 0.9, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.device-overlay-strip', { opacity: 0, x: -30, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.device-strip-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.home-devices-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Continuous Device Visual 3D Float on Scroll
        gsap.fromTo('.device-big-visual img', { y: 55, scale: 0.9, rotateX: 10 }, { y: -40, scale: 1.05, rotateX: -4, ease: 'none', scrollTrigger: { trigger: '.home-devices-stage', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        gsap.fromTo('.devices-bg-shape', { xPercent: 12, yPercent: -8 }, { xPercent: -8, yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.home-devices-stage', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });

        // ── 4. LEGACY STAGE — Mask clip reveal + orthogonal text ──
        gsap.fromTo('.leg-section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.leg-from-bottom', { opacity: 0, clipPath: 'inset(15% 0 0 0)', y: 40 }, { opacity: 1, clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.95, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.leg-from-right', { opacity: 0, x: 55 }, { opacity: 1, x: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Individual legacy elements
        gsap.fromTo('.legacy-photo-inner img', { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.legacy-photo-bar', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.legacy-selector-stack', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.legacy-row-btn', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Continuous Legacy Photo Parallax Zoom
        gsap.fromTo('.legacy-photo-inner img', { scale: 1.2, yPercent: -12 }, { scale: 1.0, yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.home-legacy-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });

        // ── 5. VIDEO CINEMA — Left/right split reveals ──
        gsap.fromTo('.cin-section-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.vid-from-left', { opacity: 0, x: -55 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.vid-from-right', { opacity: 0, x: 55 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Individual cinema elements
        gsap.fromTo('.cinema-thumb-hero', { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.cinema-play-circle', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.cinema-caption-strip', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.cinema-pl-thumb img', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.cinema-pl-info', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Cinema Screen Elevation on Scroll
        gsap.fromTo('.cinema-player-stage', { scale: 0.93, y: 45 }, { scale: 1.02, y: -20, ease: 'none', scrollTrigger: { trigger: '.home-cinema-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.fromTo('.consult-ecg-path', { strokeDashoffset: 900 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.home-consult-ribbon', start: 'top 95%', end: 'bottom 60%', scrub: 0.5 } });

        // ── 6. CONSULTATION RIBBON ──
        gsap.fromTo('.consult-ribbon-copy h2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.home-consult-ribbon', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.consult-ribbon-copy p', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.home-consult-ribbon', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.consult-ribbon-actions', { opacity: 0, scale: 0.9, y: 25 }, { opacity: 1, scale: 1, y: 0, duration: 0.85, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.home-consult-ribbon', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
      }, homeRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={homeRef} className="home-root">
      {/* ── 1. KINETIC SPOTLIGHT HERO ── */}
      <section className="home-hero-stage" aria-label="Introduction">
        <div className="hero-azure-wedge" aria-hidden="true" />
        <HeartAnimation variant="hero" />

        <div className="container home-z1">
          <div className="hero-split-layout">
            {/* Left Copy */}
            <div className="hero-copy-col">
              <p className="hero-kicker hero-enter-left">
                Padma Shri 2016 · Chairman, Interventional Cardiology
              </p>

              <h1 className="hero-display-title hero-enter-left">
                Non-Surgical Heart Valve &amp; Coronary Care
              </h1>

              <p className="hero-short-lead hero-enter-left">
                Dr. Praveen Chandra leads structural heart interventions at{' '}
                <strong>Medanta – The Medicity, Gurugram</strong>.
              </p>

              <div className="hero-cta-group hero-enter-left">
                <AppointmentButton variant="primary" size="lg" label="Book Appointment" />
                <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                  Explore Procedures
                </Link>
              </div>

              <div className="hero-inline-metrics hero-enter-bottom">
                {VERIFIED_METRICS.slice(0, 3).map((m) => (
                  <div className="hero-inline-stat hero-enter-bottom" key={m.label}>
                    <span className="hero-stat-value tabular-nums">{m.value}</span>
                    <span className="hero-stat-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Dynamic Auto-Cycling Visual Stage (Large & Uncropped with 3D Depth) */}
            <div className="hero-visual-col hero-enter-right perspective-stage" style={{ position: 'relative' }}>
              {/* Floating 3D Orbital Badges with differential parallax and independent breathing */}
              <div className="hero-orbital-1" style={{ position: 'absolute', top: '-14px', left: '-18px', zIndex: 4, pointerEvents: 'none' }}>
                <div className="floating-orbital-badge floating-orbital-badge--gold">
                  <span>🏅</span>
                  <span>Padma Shri Awardee · 2016</span>
                </div>
              </div>
              <div className="hero-orbital-2" style={{ position: 'absolute', bottom: '72px', right: '-18px', zIndex: 4, pointerEvents: 'none' }}>
                <div className="floating-orbital-badge floating-orbital-badge--teal floating-orbital-badge--alt">
                  <span>🏥</span>
                  <span>Medanta – The Medicity</span>
                </div>
              </div>

              <div className="hero-stage-frame">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero.id}
                    className="hero-slide-inner"
                    initial={{ opacity: 0, scale: 0.96, x: 24 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 1.02, x: -24 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={currentHero.image}
                      alt={currentHero.caption}
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="hero-stage-caption">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentHero.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                    >
                      {currentHero.caption}
                    </motion.span>
                  </AnimatePresence>
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
      </section>

      {/* ── 2. INTERACTIVE CARDIAC ANATOMY STAGE ── */}
      <section className="section home-anatomy-stage" id="anatomy" aria-label="Interactive Cardiac Anatomy">
        <SectionBackground variant="telemetry-grid" opacity={0.22} />
        <div className="container home-z1">
          <div className="stage-header-row anat-section-header">
            <div>
              <div className="section-kicker section-kicker--light anat-section-kicker">Interactive Cardiac Atlas</div>
              <h2 className="section-heading section-heading--light anat-section-heading">
                Target Zone &amp; Catheter Therapy
              </h2>
            </div>
            <p className="section-lead section-lead--light anat-section-lead">
              Cycles automatically or click any cardiac zone to inspect its matched catheter device.
            </p>
          </div>

          <div className="anatomy-stage-grid">
            {/* Left Large Uncropped Heart Diagram */}
            <div className="anatomy-diagram-stage anat-from-left">
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
            <div className="anatomy-dynamic-stage anat-from-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHotspot.id}
                  className="anatomy-dynamic-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="anat-text-block"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="anat-zone-kicker">
                      <span className="tabular-nums">{currentHotspot.index}</span>
                      <span>·</span>
                      <span>{currentHotspot.zone}</span>
                      <span>·</span>
                      <span className="anat-milestone-gold">{currentHotspot.milestone}</span>
                    </div>
                    <h3 className="anat-proc-title">{currentHotspot.procedure}</h3>
                    <p className="anat-proc-summary">{currentHotspot.summary}</p>
                  </motion.div>

                  {/* Large Matched Procedure Visual */}
                  <motion.div
                    className="anat-matched-visual"
                    initial={{ opacity: 0, x: 32, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -24, scale: 0.96 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={currentHotspot.image}
                      alt={`${currentHotspot.procedure} illustration`}
                      loading="lazy"
                    />
                  </motion.div>

                  <motion.div
                    className="anat-action-row"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32 }}
                  >
                    <Link to={`/treatments#${currentHotspot.id}`} className="btn-clinical btn-clinical--light">
                      Inspect {currentHotspot.procedure.split(' ')[0]} →
                    </Link>
                    <span className="anat-device-note">{currentHotspot.device}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Interactive Zone Bar */}
          <div className="anatomy-zone-rail anat-from-bottom" role="tablist" aria-label="Cardiac zones">
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
        <SectionBackground variant="valve-motion" opacity={0.5} />

        <div className="container home-z1">
          <div className="devices-split-layout">
            {/* Left Vertical Selector + Active Mechanism */}
            <div className="devices-selector-col dev-from-left">
              <div className="stage-header-row dev-section-header">
                <div>
                  <div className="section-kicker">Pioneering Technologies</div>
                  <h2 className="section-heading">Devices &amp; Breakthroughs</h2>
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

            {/* Right Huge Uncropped Visual & Dynamic Text */}
            <div className="devices-showcase-col dev-from-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDevice.id}
                  className="device-hero-display"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="device-big-visual">
                    <img
                      src={currentDevice.image}
                      alt={currentDevice.name}
                      loading="lazy"
                    />
                  </div>

                  <motion.div
                    className="device-overlay-strip"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                  >
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
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PADMA SHRI & CLINICAL LEADERSHIP ── */}
      <section className="section home-legacy-stage" aria-label="National Honors and Heritage">
        <SectionBackground variant="awards-constellation" opacity={0.65} />
        <div className="container home-z1">
          <div className="legacy-split-grid">
            {/* Left Large Uncropped Photo Stage */}
            <div className="legacy-visual-col leg-from-bottom">
              <div className="legacy-photo-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLegacy.id}
                    className="legacy-photo-inner"
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 28 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={currentLegacy.image}
                      alt={currentLegacy.caption}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="legacy-photo-bar">
                  <span>{currentLegacy.caption}</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Milestone Selector */}
            <div className="legacy-copy-col">
              <div className="stage-header-row leg-section-header">
                <div>
                  <div className="section-kicker leg-from-right">National Honor &amp; Heritage</div>
                  <h2 className="section-heading leg-from-right">
                    Three Decades of Pioneering Firsts
                  </h2>
                </div>
              </div>

              <div className="legacy-selector-stack leg-from-right" role="tablist" aria-label="Career milestones">
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

              <div className="leg-from-right" style={{ marginTop: '1.25rem' }}>
                <Link to="/about" className="btn-clinical btn-clinical--primary">
                  Full Biography &amp; Qualifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. AUTO-CYCLING VIDEO CINEMA & CONSULTATION RIBBON ── */}
      <section className="section home-cinema-stage" aria-label="Featured Videos">
        <SectionBackground variant="multimedia-waves" opacity={0.45} />
        <div className="container home-z1">
          <div className="stage-header-row cin-section-header">
            <div>
              <div className="section-kicker">Watch &amp; Learn</div>
              <h2 className="section-heading">Clinical Explainers &amp; Patient Stories</h2>
            </div>
            <Link to="/media" className="btn-clinical btn-clinical--secondary">
              View All 10 Videos →
            </Link>
          </div>

          <div className="cinema-stage-split">
            {/* Left Dynamic 16:9 Cinema Stage */}
            <div className="cinema-main-col vid-from-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo.id}
                  className="cinema-player-stage"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Right Selectable Video Playlist */}
            <div className="cinema-list-col vid-from-right" role="tablist" aria-label="Spotlight videos">
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

      {/* ── 6. VIBRANT CONSULTATION RIBBON WITH SCRUBBED ECG ── */}
      <section className="home-consult-ribbon" aria-label="Book Appointment">
        <svg className="consult-ecg-svg" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="consult-ecg-path"
            d="M0,55 L220,55 L245,42 L262,55 L310,55 L325,76 L345,14 L365,90 L385,46 L402,55 L640,55 L665,42 L682,55 L730,55 L745,76 L765,14 L785,90 L805,46 L822,55 L1200,55"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="2"
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
