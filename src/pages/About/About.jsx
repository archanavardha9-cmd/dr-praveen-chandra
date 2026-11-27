// About.jsx – Dynamic auto-cycling stages, open editorial biography & multi-directional GSAP scroll motion
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SectionBackground from '../../components/backgrounds/SectionBackground';
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
    kicker: 'National Investiture & Presidential Honor',
    title: 'Padma Shri (2016) Conferred by the President of India',
    image: DOCTOR.images.awardPodium,
    caption: 'Rashtrapati Bhavan Investiture Ceremony · New Delhi',
    description: 'Conferred by the President of India in recognition of pioneering contributions and distinguished service in interventional cardiology and structural heart innovation.',
    items: ACHIEVEMENTS.filter((item) => item.category === 'National Honor' || item.category === 'Clinical Honor'),
  },
  {
    id: 'Structural Heart',
    label: 'Structural Heart',
    kicker: 'First Transcatheter Therapies in India',
    title: 'Pioneered India’s First TAVI & MitraClip Procedures',
    image: '/images/treatments/valve-replacement-tavi.webp',
    caption: 'Transcatheter Aortic & Mitral Valve Innovations',
    description: 'Spearheaded non-surgical valve replacement (TAVI) and catheter repair (MitraClip) across India, providing life-saving options for high-risk elderly patients.',
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
    kicker: 'Global Education & Research Governance',
    title: 'Course Director India Live & Global Research Faculty',
    image: DOCTOR.images.speaking,
    caption: 'Keynote Faculty Address · Global Interventional Symposia',
    description: 'Founding Course Director of India Live, training thousands of cardiologists globally, with over 100 scientific publications in indexed cardiovascular journals.',
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

  // Reset selected item when category changes
  useEffect(() => {
    setSelectedItemId(null);
  }, [categoryCycle.activeIndex]);

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
        // 1. Hero Entrance & Continuous Scrubbed 3D Parallax
        gsap.fromTo(
          '.abt-hero-left',
          { opacity: 0, x: -48, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.abt-hero-right',
          { opacity: 0, x: 48 },
          { opacity: 1, x: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
        );

        // Continuous Hero Portrait 3D Float on Scroll
        gsap.to('.about-portrait-frame', {
          yPercent: 12,
          scale: 1.05,
          rotationY: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to('.abt-orbital-1', {
          yPercent: -40,
          xPercent: 10,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to('.abt-orbital-2', {
          yPercent: 32,
          xPercent: -8,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to('.about-hero-copy', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // 2. Career Trajectory — entrance + continuous photo scrub
        gsap.fromTo(
          '.abt-career-left',
          { opacity: 0, x: -45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-career-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.abt-career-right',
          { opacity: 0, x: 45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-career-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.career-visual-inner img',
          { scale: 1.15, yPercent: -10 },
          {
            scale: 1.0,
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-career-stage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );

        // 3. Academic Stage Entrance
        gsap.fromTo(
          '.abt-acad-left',
          { opacity: 0, x: -45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-academic-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.abt-acad-right',
          { opacity: 0, x: 45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-academic-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // 4. Milestone Ledger — entrance + continuous zoom scrub
        gsap.fromTo(
          '.abt-ledger-left',
          { opacity: 0, x: -42 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-ledger-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.abt-ledger-right',
          { opacity: 0, x: 46 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-ledger-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={pageRef} className="about-root">
      {/* ── 1. MONOGRAPH SPLIT HERO ── */}
      <section className="about-hero-stage" aria-label="Biography Overview">
        <div className="about-hero-wedge" aria-hidden="true" />
        <SectionBackground variant="awards-constellation" opacity={0.65} />

        <div className="container abt-z1">
          <div className="about-hero-grid">
            {/* Left Large Uncropped Portrait Frame with 3D Depth */}
            <div className="about-hero-visual abt-hero-left perspective-stage" style={{ position: 'relative' }}>
              <div className="floating-orbital-badge floating-orbital-badge--gold abt-orbital-1" style={{ top: '-12px', right: '-12px' }}>
                <span>🏅</span>
                <span>Padma Shri · 2016</span>
              </div>
              <div className="floating-orbital-badge floating-orbital-badge--teal abt-orbital-2" style={{ bottom: '28px', left: '-12px' }}>
                <span>🎓</span>
                <span>KGMC Lucknow · DM Cardiology</span>
              </div>

              <div className="about-portrait-frame">
                <img
                  src={DOCTOR.images.profile}
                  alt="Dr. Praveen Chandra — Chairman, Interventional Cardiology at Medanta"
                  loading="eager"
                />
              </div>
              <div className="about-portrait-caption">
                Padma Shri 2016 · Medanta – The Medicity, Gurugram
              </div>
            </div>

            {/* Right Clean Typographic Monograph */}
            <div className="about-hero-copy">
              <p className="hero-kicker abt-hero-right">
                Clinical Monograph · King George’s Medical College Alumnus
              </p>
              <h1 className="about-display-title abt-hero-right">Dr. Praveen Chandra</h1>
              <p className="about-role-sub abt-hero-right">
                {DOCTOR.title} · {DOCTOR.hospital}
              </p>
              <p className="about-short-bio abt-hero-right">
                {DOCTOR.bio}
              </p>

              <dl className="about-anchor-facts abt-hero-right">
                <div>
                  <dt>Training</dt>
                  <dd className="tabular-nums">MBBS 1985 · MD 1989 · DM Cardiology 1991</dd>
                </div>
                <div>
                  <dt>National Honor</dt>
                  <dd>Padma Shri Award (2016), President of India</dd>
                </div>
                <div>
                  <dt>Fellowships</dt>
                  <dd>FACC · FESC · FSCAI · FAPSIC · FCSI</dd>
                </div>
              </dl>

              <div className="about-hero-actions abt-hero-right">
                <AppointmentButton variant="primary" size="lg" label="Book Consultation" />
                <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                  Clinical Specialties →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AUTO-CYCLING CAREER TRAJECTORY (OPEN EDITORIAL STAGE) ── */}
      <section className="section about-career-stage" aria-label="Career Milestones">
        <div className="career-bg-shape" aria-hidden="true" />
        <SectionBackground variant="coronary-tree" opacity={0.45} />

        <div className="container abt-z1">
          <div className="stage-header-row">
            <div>
              <div className="section-kicker">Career Trajectory</div>
              <h2 className="section-heading">Three Decades of Institutional Leadership</h2>
            </div>
            <p className="section-lead">
              Cycles automatically across three landmark appointments from 1992 to the present day.
            </p>
          </div>

          <div className="career-split-stage">
            {/* Left Dynamic Role Selector + Live Copy */}
            <div className="career-left-col abt-career-left">
              <div className="career-era-tabs" role="tablist" aria-label="Career chapters">
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

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra.period}
                  className="career-era-copy"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="career-copy-period tabular-nums">{activeEra.period}</span>
                  <h3>{activeEra.role}</h3>
                  <p className="career-copy-org">{activeEra.institution}</p>
                  <p className="career-copy-desc">{activeEra.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Large Uncropped Scene Stage */}
            <div className="career-right-col abt-career-right">
              <div className="career-visual-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEra.period}
                    className="career-visual-inner"
                    initial={{ opacity: 0, x: 32, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -28, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={activeEra.photo}
                      alt={`${activeEra.role} at ${activeEra.institution}`}
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="career-visual-caption">
                  <span>{activeEra.caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KGMC QUALIFICATIONS & AUTO-CYCLING FELLOWSHIPS (SAPPHIRE STAGE) ── */}
      <section className="section about-academic-stage" aria-label="Academic Qualifications and Fellowships">
        <SectionBackground variant="telemetry-grid" opacity={0.3} />
        <div className="container abt-z1">
          <div className="acad-split-grid">
            {/* Left Academic Degrees */}
            <div className="acad-degrees-col abt-acad-left">
              <div className="section-kicker section-kicker--light">Academic Heritage</div>
              <h2 className="section-heading section-heading--light">
                King George’s Medical College, Lucknow
              </h2>
              <p className="section-lead section-lead--light" style={{ marginBottom: '1.5rem' }}>
                Foundational internal medicine and cardiology super-specialization from India’s historic medical institution.
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

            {/* Right Interactive Auto-Cycling Global Fellowships Spotlight */}
            <div className="acad-fellow-col abt-acad-right">
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
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
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

      {/* ── 4. AUTO-CYCLING HONORS & HISTORIC FIRSTS STAGE ── */}
      <section className="section about-ledger-stage" aria-label="Honors and Milestones">
        <div className="container abt-z1">
          <div className="about-stage-header">
            <div>
              <div className="section-kicker">Honors &amp; Clinical Firsts</div>
              <h2 className="section-heading">Padma Shri &amp; Pioneer Milestones</h2>
            </div>

            {/* Automatic Tab Switcher without 'All' */}
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
            {/* Left Category Milestone Cards */}
            <div className="ledger-list-col abt-ledger-left">
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

            {/* Right Synchronized Uncropped Visual + Prominent Detail */}
            <div className="ledger-visual-col abt-ledger-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory.id}-${activeItem.id}`}
                  className="ledger-spotlight-stage"
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="ledger-stage-visual">
                    <img
                      src={activeItem.photo || activeCategory.image}
                      alt={activeItem.title}
                      loading="lazy"
                    />
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
