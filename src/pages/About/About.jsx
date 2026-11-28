// About.jsx – Multi-image editorial monograph, 3-photo career triptych, academic heritage & dual-visual milestone stage
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SplitHeading from '../../components/motion/SplitHeading';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import {
  DOCTOR,
  QUALIFICATIONS,
  FELLOWSHIPS,
  CAREER_TIMELINE,
  ACHIEVEMENTS,
} from '../../data/doctorData';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const MILESTONE_CATEGORIES = [
  {
    id: 'National Honors',
    label: 'National Honors',
    image: DOCTOR.images.awardPodium,
    companion: '/images/newspaper/dr4.webp',
    items: ACHIEVEMENTS.filter((item) => item.category === 'National Honor' || item.category === 'Clinical Honor'),
  },
  {
    id: 'Structural Heart',
    label: 'Structural Heart',
    image: '/images/treatments/valve-replacement-tavi.webp',
    companion: '/images/illustrations/mitraclip-repair-diagram.webp',
    items: ACHIEVEMENTS.filter(
      (item) =>
        item.category === 'Structural Heart' ||
        item.category === 'Coronary Innovation' ||
        item.category === 'Device Pioneer'
    ),
  },
  {
    id: 'Academic & Leadership',
    label: 'Academic & Leadership',
    image: DOCTOR.images.speaking,
    companion: DOCTOR.images.consultation,
    items: ACHIEVEMENTS.filter((item) => item.category === 'Leadership' || item.category === 'Research'),
  },
];

const FELLOWSHIP_DETAILS = {
  FACC: 'Recognized by the American College of Cardiology for sustained excellence in cardiovascular medicine.',
  FESC: 'Awarded by the European Society of Cardiology for contributions to international interventional trials and care.',
  FSCAI: 'Conferred by the Society for Cardiovascular Angiography & Interventions (USA) for catheter therapy leadership.',
  FAPSIC: 'Elected Fellow of the Asia Pacific Society of Interventional Cardiology celebrating regional innovation.',
  FCSI: 'Life Fellow of India’s Cardiological Society advancing national interventional training and standards.',
};

export default function About() {
  const careerCycle = useAutoCycle(CAREER_TIMELINE.length, 5500);
  const fellowshipCycle = useAutoCycle(FELLOWSHIPS.length, 4800);
  const categoryCycle = useAutoCycle(MILESTONE_CATEGORIES.length, 6200);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const pageRef = useRef(null);

  const activeCategory = MILESTONE_CATEGORIES[categoryCycle.activeIndex];
  const activeEra = CAREER_TIMELINE[careerCycle.activeIndex];
  const activeFellowship = FELLOWSHIPS[fellowshipCycle.activeIndex];

  const activeItem = selectedItemId
    ? activeCategory.items.find((i) => i.id === selectedItemId) || activeCategory.items[0]
    : activeCategory.items[0];

  const handleCategoryClick = (idx) => {
    categoryCycle.selectIndex(idx);
    setSelectedItemId(null);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. HERO EDITORIAL CENTERED — Circular portrait reveal + typography cascade ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo('.about-hero-wedge', { xPercent: -45, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' })
          .fromTo(
            '.about-portrait-center',
            { scale: 0.6, y: 40, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.95, ease: 'back.out(1.4)' },
            0.05
          )
          .fromTo('.about-portrait-inset', { x: 50, y: 40, scale: 0.6, opacity: 0, rotate: -8 }, { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.4)' }, 0.3)
          .fromTo(
            '.about-hero-kicker',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            0.15
          )
          .fromTo(
            '.about-display-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
            0.22
          )
          .fromTo('.about-role-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.4)
          .fromTo('.about-short-bio', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.5)
          .fromTo('.about-fact-chip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, 0.58)
          .fromTo('.about-hero-center-actions > *', { scale: 0.84, y: 16, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' }, 0.7)
          .fromTo('.about-portrait-caption-center', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.78);

        gsap.to('.about-portrait-frame-center img', {
          y: -8,
          duration: 3.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });
        gsap.to('.about-portrait-inset img', {
          y: 7,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.25,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.about-portrait-center', { scale: 0.8, y: -30, opacity: 0.3, ease: 'none' }, 0)
          .to('.about-hero-center', { y: -40, opacity: 0.3, ease: 'none' }, 0)
          .to('.about-hero-wedge', { yPercent: -12, opacity: 0.3, ease: 'none' }, 0);

        // ── 2. CAREER TRIPTYCH — Horizontal era switcher + 3-photo expanding spread ──
        const careerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-career-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        careerTl
          .fromTo('.abt-career-stage-header .section-heading', { x: -55, color: '#5a738c', opacity: 0.25 }, { x: 0, color: '#09223a', opacity: 1, duration: 0.32 }, 0)
          .fromTo('.career-era-tabs-row', { y: 35, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.34 }, 0.03)
          .fromTo('.career-triptych-card', { scale: 0.7, y: 65, opacity: 0.15 }, { scale: 1, y: 0, opacity: 1, duration: 0.36, stagger: 0.04 }, 0.02)
          .to('.career-triptych-card', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.career-triptych-card', { scale: 0.82, y: -35, opacity: 0.22, duration: 0.32 }, 0.68);

        // ── 3. ACADEMIC & FELLOWSHIPS — Opposite diagonal corner merge & exit ──
        const acadTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-academic-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        acadTl
          .fromTo('.abt-academic-stage-header .section-heading', { x: -65, color: '#8ac2e8', opacity: 0.25 }, { x: 0, color: '#ffffff', opacity: 1, duration: 0.34 }, 0)
          .fromTo('.acad-degrees-col', { x: -110, y: 55, opacity: 0.15 }, { x: 0, y: 0, opacity: 1, duration: 0.36 }, 0)
          .fromTo('.acad-fellow-col', { x: 110, y: -55, scale: 0.76, opacity: 0.15 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.36 }, 0)
          .to('.acad-degrees-col, .acad-fellow-col', { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          .to('.acad-degrees-col', { x: -70, y: -30, opacity: 0.2, duration: 0.32 }, 0.68)
          .to('.acad-fellow-col', { x: 70, y: 30, scale: 0.84, opacity: 0.2, duration: 0.32 }, 0.68);

        // ── 4. MILESTONE LEDGER — Dual-Visual Stage Growth + Exit ──
        const ledgerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-ledger-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        ledgerTl
          .fromTo('.abt-ledger-stage-header .section-heading', { x: -55, color: '#5a738c', opacity: 0.25 }, { x: 0, color: '#09223a', opacity: 1, duration: 0.34 }, 0)
          .fromTo('.ledger-filter-bar', { x: 65, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo('.ledger-list-col', { x: -90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.36 }, 0)
          .fromTo('.ledger-visual-col', { scale: 0.68, x: 90, y: 55, opacity: 0.15 }, { scale: 1.02, x: 0, y: 0, opacity: 1, duration: 0.36 }, 0)
          .to('.ledger-visual-col', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.ledger-list-col', { x: -60, opacity: 0.2, duration: 0.32 }, 0.68)
          .to('.ledger-visual-col', { scale: 0.8, y: -40, opacity: 0.2, duration: 0.32 }, 0.68);

        // ── 5. CTA RIBBON — Handoff to Footer ──
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-cta-ribbon',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        ctaTl
          .fromTo('.about-cta-flex > div:first-child', { x: -85, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.about-cta-actions', { x: 85, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.about-cta-flex', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.about-cta-flex', { scale: 0.9, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={pageRef} className="about-root">
      {/* ── 1. EDITORIAL CENTERED HERO WITH CIRCULAR PORTRAIT ── */}
      <section className="about-hero-stage" aria-label="Biography Overview">
        <div className="about-hero-wedge" aria-hidden="true" />

        <div className="container abt-z1">
          <div className="about-hero-center">
            {/* Circular Portrait */}
            <div className="about-portrait-center">
              <div className="about-portrait-ring" aria-hidden="true" />
              <div className="about-portrait-frame-center">
                <ResponsiveImage
                  src={DOCTOR.images.profile}
                  alt="Dr. Praveen Chandra — Chairman, Interventional Cardiology at Medanta"
                  priority
                  objectFit="cover"
                  sizes="(max-width: 600px) 80vw, 400px"
                />
              </div>
              <div className="about-portrait-inset" aria-hidden="true">
                <ResponsiveImage
                  src={DOCTOR.images.awardPodium}
                  alt=""
                  objectFit="cover"
                  sizes="110px"
                />
                <span className="about-portrait-inset-label">Padma Shri 2016</span>
              </div>
            </div>

            <p className="about-hero-kicker">
              Clinical Monograph · King George’s Medical College Alumnus
            </p>
            <SplitHeading as="h1" className="about-display-title" text="Dr. Praveen Chandra" />
            <p className="about-role-sub">
              {DOCTOR.title} · {DOCTOR.hospital}
            </p>
            <p className="about-short-bio">
              Chairman of Interventional Cardiology at Medanta – The Medicity and pioneer of TAVI, MitraClip, and percutaneous myocardial laser revascularization in India.
            </p>

            <div className="about-hero-facts-mini">
              <span className="about-fact-chip">MBBS 1985 · MD 1989 · DM Cardiology 1991</span>
              <span className="about-fact-chip">FACC · FESC · FSCAI · FAPSIC · FCSI</span>
              <span className="about-fact-chip">Padma Shri Award (2016)</span>
            </div>

            <div className="about-hero-center-actions">
              <AppointmentButton variant="primary" size="lg" label="Book Consultation" />
              <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                Clinical Specialties →
              </Link>
            </div>

            <div className="about-portrait-caption-center">
              Padma Shri 2016 · Medanta – The Medicity, Gurugram
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CAREER TRAJECTORY — 3-ERA STEPPER + INTERACTIVE 3-PHOTO TRIPTYCH ── */}
      <section className="section about-career-stage" aria-label="Career Milestones">
        <div className="container abt-z1">
          <div className="stage-header-row abt-career-stage-header">
            <div>
              <div className="section-kicker">Career Trajectory</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Three Decades of Institutional Leadership"
              />
            </div>
            <p className="section-lead">
              Click any appointment chapter below to expand its institutional record.
            </p>
          </div>

          <div className="career-era-tabs-row" role="tablist" aria-label="Career chapters">
            {CAREER_TIMELINE.map((era, idx) => {
              const isActive = careerCycle.activeIndex === idx;
              return (
                <button
                  key={era.period}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`career-era-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => careerCycle.selectIndex(idx)}
                >
                  <div className="career-tab-head">
                    <span className="career-tab-period tabular-nums">{era.period}</span>
                    <span className="career-tab-inst">{era.institution.split(',')[0]}</span>
                  </div>
                  {isActive && (
                    <div className="cycle-progress-track" style={{ marginTop: '0.5rem' }}>
                      <div
                        key={`car-prog-${careerCycle.cycleKey}`}
                        className="cycle-progress-bar"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 3-Photo Visual Triptych: Active era takes focal prominence while others stay visible */}
          <div className="career-triptych-row">
            {CAREER_TIMELINE.map((era, idx) => {
              const isActive = careerCycle.activeIndex === idx;
              return (
                <button
                  key={era.period}
                  type="button"
                  onClick={() => careerCycle.selectIndex(idx)}
                  className={`career-triptych-card ${isActive ? 'is-focused' : ''}`}
                  aria-label={`${era.role} at ${era.institution}`}
                >
                  <div className="career-triptych-img">
                    <ResponsiveImage
                      src={era.photo}
                      alt={`${era.role} at ${era.institution}`}
                      objectFit="cover"
                      sizes="(max-width: 900px) 92vw, 38vw"
                    />
                  </div>
                  <div className="career-triptych-overlay">
                    <span className="tabular-nums">{era.period}</span>
                    <h4>{era.institution.split(',')[0]}</h4>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="career-era-detail-bar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra.period}
                className="career-era-copy-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <span className="career-copy-period tabular-nums">{activeEra.period} · {activeEra.caption}</span>
                  <h3>{activeEra.role}</h3>
                  <p className="career-copy-org">{activeEra.institution}</p>
                </div>
                <p className="career-copy-desc">{activeEra.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 3. KGMC QUALIFICATIONS & GLOBAL FELLOWSHIPS (SAPPHIRE CONTRAST) ── */}
      <section className="section about-academic-stage" aria-label="Academic Qualifications and Fellowships">
        <div className="container abt-z1">
          <div className="stage-header-row abt-academic-stage-header">
            <div>
              <div className="section-kicker section-kicker--light">Academic Heritage</div>
              <SplitHeading
                as="h2"
                className="section-heading section-heading--light"
                text="King George’s Medical College, Lucknow"
              />
            </div>
          </div>

          <div className="acad-split-grid">
            <div className="acad-degrees-col">
              <p className="section-lead section-lead--light" style={{ marginBottom: '1.5rem' }}>
                Internal medicine and cardiology super-specialization from India’s historic medical college.
              </p>

              <div className="acad-rows-list">
                {QUALIFICATIONS.map((q) => (
                  <div className="acad-degree-row" key={q.degree}>
                    <span className="acad-year-mono tabular-nums">{q.year}</span>
                    <div>
                      <h4>{q.degree}</h4>
                      <p>{q.field} · {q.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="acad-fellow-col">
              <div className="fellow-selector-bar" role="tablist" aria-label="International fellowships">
                {FELLOWSHIPS.map((f, idx) => {
                  const isActive = fellowshipCycle.activeIndex === idx;
                  return (
                    <button
                      key={f.short}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`fellow-tab-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => fellowshipCycle.selectIndex(idx)}
                    >
                      <span>{f.short}</span>
                    </button>
                  );
                })}
              </div>

              <div className="cycle-progress-track cycle-progress-track--light" style={{ margin: '0.85rem 0 1.4rem' }}>
                <div
                  key={`fel-prog-${fellowshipCycle.cycleKey}`}
                  className="cycle-progress-bar"
                  style={{ animationDuration: '4.8s' }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFellowship.short}
                  className="fellow-spotlight-body"
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -10 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="fellow-region-mono">{activeFellowship.region}</span>
                  <div className="fellow-big-code">{activeFellowship.short}</div>
                  <h3>{activeFellowship.full}</h3>
                  <p>{FELLOWSHIP_DETAILS[activeFellowship.short]}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HONORS & FIRSTS — DUAL-VISUAL EDITORIAL LEDGER ── */}
      <section className="section about-ledger-stage" aria-label="Honors and Milestones">
        <div className="container abt-z1">
          <div className="about-stage-header abt-ledger-stage-header">
            <div>
              <div className="section-kicker">Honors &amp; Clinical Firsts</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Padma Shri & Pioneer Milestones"
              />
            </div>

            <div className="ledger-filter-bar" role="tablist" aria-label="Filter milestones by category">
              {MILESTONE_CATEGORIES.map((cat, idx) => {
                const isActive = categoryCycle.activeIndex === idx;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ledger-filter-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleCategoryClick(idx)}
                  >
                    <span>{cat.label}</span>
                    {isActive && (
                      <div className="cycle-progress-track" style={{ marginTop: '0.35rem' }}>
                        <div
                          key={`cat-prog-${categoryCycle.cycleKey}`}
                          className="cycle-progress-bar"
                          style={{ animationDuration: '6.2s' }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ledger-interactive-grid">
            <div className="ledger-list-col">
              {activeCategory.items.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`ledger-select-row ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <div className="ledger-row-top">
                      <span className="ledger-row-year tabular-nums">{item.year}</span>
                      <span className="ledger-row-cat">{item.category}</span>
                    </div>
                    <h4>{item.title}</h4>
                    <p className="ledger-item-summary">{item.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Dual-Image Milestone Showcase */}
            <div className="ledger-visual-col">
              <div className="ledger-dual-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory.id}-${activeItem.id}`}
                    className="ledger-spotlight-stage"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="ledger-visual-pair">
                      <div className="ledger-stage-visual">
                        <ResponsiveImage
                          src={activeItem.photo || activeCategory.image}
                          alt={activeItem.title}
                          objectFit="contain"
                          sizes="(max-width: 900px) 90vw, 420px"
                        />
                      </div>
                      <div className="ledger-companion-visual" aria-hidden="true">
                        <ResponsiveImage
                          src={activeCategory.companion}
                          alt=""
                          objectFit="cover"
                          sizes="160px"
                        />
                      </div>
                    </div>
                    <div className="ledger-stage-copy">
                      <span className="ledger-stage-meta tabular-nums">
                        {activeItem.year} · {activeItem.category}
                      </span>
                      <h3>{activeItem.title}</h3>
                      <p>{activeItem.description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. COMPACT CTA RIBBON ── */}
      <section className="about-cta-ribbon" aria-label="Schedule Consultation">
        <div className="container">
          <div className="about-cta-flex">
            <div>
              <h2>Evaluate Non-Surgical Valve &amp; Coronary Options</h2>
              <p>Outpatient clinics &amp; angiogram second opinions at Medanta – The Medicity, Gurugram.</p>
            </div>
            <div className="about-cta-actions">
              <AppointmentButton variant="white" size="lg" label="Book Appointment" />
              <Link to="/contact" className="btn-clinical btn-clinical--light">
                Hospital &amp; OPD Access
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
