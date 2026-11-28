// About.jsx – Open architectural monograph with distinct multi-technique scroll choreography
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SplitHeading from '../../components/motion/SplitHeading';
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
    description: 'Conferred by the President of India in recognition of pioneering contributions to interventional cardiology and structural heart innovation.',
    items: ACHIEVEMENTS.filter((item) => item.category === 'National Honor' || item.category === 'Clinical Honor'),
  },
  {
    id: 'Structural Heart',
    label: 'Structural Heart',
    kicker: 'First Transcatheter Therapies in India',
    title: 'Pioneered India’s First TAVI & MitraClip Procedures',
    image: '/images/treatments/valve-replacement-tavi.webp',
    caption: 'Transcatheter Aortic & Mitral Valve Innovations',
    description: 'Spearheaded non-surgical valve replacement (TAVI) and catheter repair (MitraClip) across India for high-surgical-risk patients.',
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
    description: 'Founding Course Director of India Live, training interventionalists globally, with 100+ indexed cardiovascular publications.',
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
        // ── 1. HERO STAGE — Bold opposing left/right mount entrance + continuous float + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.about-hero-wedge',
            { xPercent: -45, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
          )
          .fromTo(
            '.about-hero-visual',
            { x: -135, scale: 0.72, rotate: -3, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            '.about-hero-copy',
            { x: 120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.08
          )
          .fromTo(
            '.about-hero-copy .hero-kicker',
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
            0.2
          )
          .fromTo(
            '.about-display-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power3.out' },
            0.26
          )
          .fromTo('.about-role-sub', { x: 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.45)
          .fromTo('.about-short-bio', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.54)
          .fromTo(
            '.about-anchor-facts > div',
            { x: 28, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            0.6
          )
          .fromTo(
            '.about-hero-actions > *',
            { scale: 0.82, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.7
          );

        gsap.to('.about-stage-float', {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
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
          .to('.about-hero-visual-scrub', { x: -75, y: -30, scale: 0.82, opacity: 0.2, ease: 'none' }, 0)
          .to('.about-hero-copy-inner', { x: 75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.about-hero-wedge', { yPercent: -12, opacity: 0.3, ease: 'none' }, 0);

        // ── 2. CAREER TRAJECTORY — Scrubbed small-to-large visual growth, color shift & layout slide ──
        const careerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-career-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        careerTl
          .fromTo(
            '.abt-career-stage-header .section-heading',
            { x: -60, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.abt-career-stage-header .section-lead',
            { x: 70, opacity: 0.2 },
            { x: 0, opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.career-left-col',
            { x: -105, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.career-right-col',
            { scale: 0.6, x: 105, y: 70, rotate: 2.5, opacity: 0.15 },
            { scale: 1.03, x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.career-right-col', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.career-left-col', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink & split
          .to('.career-left-col', { x: -75, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.career-right-col', { scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. ACADEMIC & FELLOWSHIPS — Opposite diagonal corner merge, color shift & split exit ──
        const acadTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-academic-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        acadTl
          .fromTo(
            '.abt-academic-stage-header .section-heading',
            { x: -65, color: '#8ac2e8', opacity: 0.25 },
            { x: 0, color: '#ffffff', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.acad-degrees-col',
            { x: -120, y: 65, rotate: -2.5, opacity: 0.15 },
            { x: 0, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.acad-fellow-col',
            { x: 120, y: -65, scale: 0.72, rotate: 2.5, opacity: 0.15 },
            { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.acad-degrees-col', { x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.acad-fellow-col', { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.32 }, 0.36)
          // Diagonal split exit
          .to('.acad-degrees-col', { x: -75, y: -35, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.acad-fellow-col', { x: 75, y: 35, scale: 0.82, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 4. MILESTONE LEDGER — Spotlight growth + left rail glide + shrink exit ──
        const ledgerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-ledger-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        ledgerTl
          .fromTo(
            '.abt-ledger-stage-header .section-heading',
            { x: -55, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.ledger-filter-bar', { x: 70, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo(
            '.ledger-list-col',
            { x: -95, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.ledger-visual-col',
            { scale: 0.62, y: 65, x: 95, opacity: 0.15 },
            { scale: 1.03, y: 0, x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.ledger-visual-col', { scale: 1, y: 0, x: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.ledger-list-col', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.ledger-list-col', { x: -65, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.ledger-visual-col', { scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 5. CTA RIBBON — Opposing horizontal split + handoff to Footer ──
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-cta-ribbon',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        ctaTl
          .fromTo('.about-cta-flex > div:first-child', { x: -90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.about-cta-actions', { x: 90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.about-cta-flex', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.about-cta-flex', { scale: 0.9, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
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

        <div className="container abt-z1">
          <div className="about-hero-grid">
            {/* Left Large Uncropped Portrait Frame */}
            <div className="about-hero-visual">
              <div className="about-hero-visual-scrub">
                <div className="about-stage-float">
                  <div className="about-portrait-frame">
                    <div className="about-portrait-mask media-reveal-mask">
                      <img
                        src={DOCTOR.images.profile}
                        alt="Dr. Praveen Chandra — Chairman, Interventional Cardiology at Medanta"
                        loading="eager"
                      />
                    </div>
                  </div>
                  <div className="about-portrait-caption">
                    Padma Shri 2016 · Medanta – The Medicity, Gurugram
                  </div>
                </div>
              </div>
            </div>

            {/* Right Clean Typographic Monograph */}
            <div className="about-hero-copy">
              <div className="about-hero-copy-inner">
                <p className="hero-kicker">
                  Clinical Monograph · King George’s Medical College Alumnus
                </p>
                <SplitHeading as="h1" className="about-display-title" text="Dr. Praveen Chandra" />
                <p className="about-role-sub">
                  {DOCTOR.title} · {DOCTOR.hospital}
                </p>
                <p className="about-short-bio">
                  Chairman of Interventional Cardiology at Medanta – The Medicity and pioneer of TAVI, MitraClip, and percutaneous myocardial laser revascularization in India.
                </p>

                <dl className="about-anchor-facts">
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

                <div className="about-hero-actions">
                  <AppointmentButton variant="primary" size="lg" label="Book Consultation" />
                  <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                    Clinical Specialties →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AUTO-CYCLING CAREER TRAJECTORY ── */}
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
              Three landmark appointments from 1992 to the present day.
            </p>
          </div>

          <div className="career-split-stage">
            {/* Left Role Selector + Live Copy */}
            <div className="career-left-col">
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
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="career-copy-period tabular-nums">{activeEra.period}</span>
                  <h3>{activeEra.role}</h3>
                  <p className="career-copy-org">{activeEra.institution}</p>
                  <p className="career-copy-desc">{activeEra.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Large Uncropped Scene Stage */}
            <div className="career-right-col">
              <div className="career-visual-stage">
                <div className="career-visual-mask media-reveal-mask">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeEra.period}
                      className="career-visual-inner"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={activeEra.photo}
                        alt={`${activeEra.role} at ${activeEra.institution}`}
                        loading="lazy"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="career-visual-caption">
                  <span>{activeEra.caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. KGMC QUALIFICATIONS & AUTO-CYCLING FELLOWSHIPS ── */}
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
            {/* Left Academic Degrees */}
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

            {/* Right Interactive Auto-Cycling Global Fellowships Spotlight */}
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

      {/* ── 4. AUTO-CYCLING HONORS & HISTORIC FIRSTS STAGE ── */}
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
            {/* Left Category Milestone Cards */}
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

            {/* Right Synchronized Uncropped Visual + Detail */}
            <div className="ledger-visual-col">
              <div className="ledger-spotlight-mask media-reveal-mask">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory.id}-${activeItem.id}`}
                    className="ledger-spotlight-stage"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
