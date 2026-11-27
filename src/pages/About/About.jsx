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

const MILESTONE_FILTERS = ['All', 'National Honor', 'Structural Heart', 'Academic & Leadership'];

const MILESTONE_VISUALS = {
  1: DOCTOR.images.awardPodium,
  2: '/images/treatments/valve-replacement-tavi.webp',
  3: DOCTOR.illustrations.mitraclip,
  4: DOCTOR.illustrations.stentIvl,
  5: DOCTOR.illustrations.stentIvl,
  6: DOCTOR.images.speaking,
  7: DOCTOR.images.consultation,
  8: '/images/publications/tavi-multidisciplinary-planning.webp',
};

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
  const [milestoneFilter, setMilestoneFilter] = useState('All');
  const pageRef = useRef(null);

  const filteredMilestones = ACHIEVEMENTS.filter((item) => {
    if (milestoneFilter === 'All') return true;
    if (milestoneFilter === 'National Honor') {
      return item.category === 'National Honor' || item.category === 'Clinical Honor';
    }
    if (milestoneFilter === 'Structural Heart') {
      return (
        item.category === 'Structural Heart' ||
        item.category === 'Coronary Innovation' ||
        item.category === 'Device Pioneer'
      );
    }
    return item.category === 'Leadership' || item.category === 'Research';
  });

  const milestoneCycle = useAutoCycle(filteredMilestones.length, 5500);

  const activeEra = CAREER_TIMELINE[careerCycle.activeIndex];
  const activeFellowship = FELLOWSHIPS[fellowshipCycle.activeIndex];
  const activeMilestone = filteredMilestones[milestoneCycle.activeIndex] || filteredMilestones[0];

  const handleFilterChange = (tab) => {
    setMilestoneFilter(tab);
    milestoneCycle.selectIndex(0);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.abt-hero-left',
          { opacity: 0, x: -42 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.abt-hero-right',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.08 }
        );

        gsap.fromTo(
          '.abt-career-left',
          { opacity: 0, x: -44 },
          {
            opacity: 1,
            x: 0,
            duration: 0.78,
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
          { opacity: 0, x: 46, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
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
          '.abt-acad-left',
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
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
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
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
          '.abt-ledger-left',
          { opacity: 0, x: -38 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
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
          { opacity: 0, x: 42 },
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
        <SectionBackground variant="awards-constellation" opacity={0.45} />

        <div className="container abt-z1">
          <div className="about-hero-grid">
            {/* Left Large Uncropped Portrait Frame */}
            <div className="about-hero-visual abt-hero-left">
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

              <div className="about-hero-cta abt-hero-right">
                <AppointmentButton variant="primary" size="lg" label="Book Appointment" />
                <Link to="/treatments" className="btn-clinical btn-clinical--secondary">
                  View Procedures →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. AUTO-CYCLING CAREER TRAJECTORY (1992 – PRESENT) ── */}
      <section className="section about-career-stage" aria-label="Career Trajectory">
        <div className="container abt-z1">
          <div className="about-stage-header">
            <div>
              <div className="section-kicker">01 · Career Trajectory</div>
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
        <SectionBackground variant="telemetry-grid" opacity={0.2} />
        <div className="container abt-z1">
          <div className="acad-split-grid">
            {/* Left Hairline Academic Degrees */}
            <div className="acad-degrees-col abt-acad-left">
              <div className="section-kicker section-kicker--light">02 · Academic Heritage</div>
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
                      <h4>
                        {q.degree} — {q.field}
                      </h4>
                      <p>{q.institution}</p>
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
              <div className="section-kicker">03 · Honors &amp; Clinical Firsts</div>
              <h2 className="section-heading">Padma Shri &amp; Pioneer Milestones</h2>
            </div>

            <div className="ledger-filter-bar" role="tablist" aria-label="Filter milestones">
              {MILESTONE_FILTERS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={milestoneFilter === tab}
                  className={`ledger-filter-tab ${milestoneFilter === tab ? 'is-active' : ''}`}
                  onClick={() => handleFilterChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="ledger-interactive-grid">
            {/* Left Clickable / Auto-Cycling Milestone List */}
            <div className="ledger-list-col abt-ledger-left">
              {filteredMilestones.map((item, idx) => {
                const isActive = milestoneCycle.activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`ledger-select-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => milestoneCycle.selectIndex(idx)}
                  >
                    <div className="ledger-row-top">
                      <span className="ledger-row-year tabular-nums">{item.year}</span>
                      <span className="ledger-row-cat">{item.category}</span>
                    </div>
                    <h4>{item.title}</h4>
                    {isActive && (
                      <div className="cycle-progress-track" style={{ marginTop: '0.55rem' }}>
                        <div
                          key={`ms-prog-${milestoneCycle.cycleKey}`}
                          className="cycle-progress-bar"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Synchronized Uncropped Visual + Detail */}
            <div className="ledger-visual-col abt-ledger-right">
              {activeMilestone && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone.id}
                    className="ledger-spotlight-stage"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="ledger-stage-visual">
                      <img
                        src={activeMilestone.photo || MILESTONE_VISUALS[activeMilestone.id] || DOCTOR.images.awardPodium}
                        alt={activeMilestone.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="ledger-stage-copy">
                      <span className="ledger-stage-meta tabular-nums">
                        {activeMilestone.year} · {activeMilestone.category}
                      </span>
                      <h3>{activeMilestone.title}</h3>
                      <p>{activeMilestone.description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
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
