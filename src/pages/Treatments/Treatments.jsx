// Treatments.jsx – Catheter therapies catalog with distinct multi-technique GSAP choreography
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SplitHeading from '../../components/motion/SplitHeading';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { animateNumericCounters } from '../../utils/motionHelpers';
import { TREATMENTS, CONTACT_INFO } from '../../data/doctorData';
import './Treatments.css';

gsap.registerPlugin(ScrollTrigger);

const COMPARISON_PARAMS = [
  {
    id: 'access',
    label: 'Access',
    param: 'Access & Incision',
    surgery: 'Full sternotomy chest incision with surgical rib spreading',
    catheter: 'Femoral groin micro-puncture (pinhole access, zero chest scar)',
  },
  {
    id: 'bypass',
    label: 'Bypass',
    param: 'Cardiopulmonary Bypass',
    surgery: 'Requires heart-lung machine to arrest the heart during surgery',
    catheter: 'Performed on a beating heart without cardiopulmonary bypass',
  },
  {
    id: 'anesthesia',
    label: 'Anesthesia',
    param: 'Anesthesia Protocol',
    surgery: 'Deep general anesthesia requiring mechanical endotracheal ventilation',
    catheter: 'Local anesthesia with conscious twilight sedation in most candidates',
  },
  {
    id: 'stay',
    label: 'Hospital Stay',
    param: 'Typical Hospital Stay',
    surgery: '7 to 14 days including intensive care recovery',
    catheter: 'Commonly 48 to 72 hours for uncomplicated catheter procedures',
  },
  {
    id: 'recovery',
    label: 'Recovery',
    param: 'Mobilization & Return',
    surgery: '2 to 3 months of restricted sternal bone healing and physical care',
    catheter: 'Ambulation within 24 hours; fast return to daily activities',
  },
  {
    id: 'safety',
    label: 'High-Risk',
    param: 'High-Risk / Elderly Patients',
    surgery: 'Often prohibitive or high risk due to age, frailty, or co-morbidities',
    catheter: 'Gold standard established therapy evaluated by the Heart Team',
  },
];

export default function Treatments() {
  const location = useLocation();
  const pageRef = useRef(null);

  const procedureCycle = useAutoCycle(TREATMENTS.length, 6200);
  const compCycle = useAutoCycle(COMPARISON_PARAMS.length, 4800);

  const [compareView, setCompareView] = useState('interactive');

  const activeProcedure = TREATMENTS[procedureCycle.activeIndex];
  const activeComp = COMPARISON_PARAMS[compCycle.activeIndex];

  const { selectIndex: selectProcedureIndex } = procedureCycle;

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const matchedIdx = TREATMENTS.findIndex((t) => t.id === id);
    if (matchedIdx !== -1) {
      selectProcedureIndex(matchedIdx);
    }
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [location.hash, selectProcedureIndex]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. TREATMENTS HERO — Bold left/right mount + numeric counter + post-settle float + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.trt-hero-status-strip',
            { y: -25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
          )
          .fromTo(
            '.trt-hero-directive-col',
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            '.trt-hero-centerpiece-col',
            { x: 135, scale: 0.72, rotate: 2.5, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
            0.08
          )
          .fromTo('.trt-hero-directive-col .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.18)
          .fromTo(
            '.trt-hero-headline .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055, ease: 'power3.out' },
            0.24
          )
          .fromTo('.trt-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.48)
          .fromTo(
            '.trt-hero-actions > *',
            { scale: 0.82, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.58
          )
          .fromTo('.trt-metric-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.68);

        animateNumericCounters('.trt-counter-val', {
          trigger: '.treatments-hero-monument',
          start: 'top 95%',
        });

        gsap.to('.trt-stage-float', {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.treatments-hero-monument',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.trt-hero-copy-inner', { x: -75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.trt-hero-visual-scrub', { x: 75, y: -32, scale: 0.84, opacity: 0.2, ease: 'none' }, 0);

        // ── 2. PROCEDURE DIRECTORY — Scrubbed left rail glide + showcase small-to-large growth & layout exit ──
        const dirTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.trt-directory-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        dirTl
          .fromTo(
            '.dir-section-header .section-heading',
            { x: -60, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.dir-section-header .section-lead', { x: 70, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo('.dir-showcase-rail', { x: -105, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' }, 0)
          .fromTo(
            '.dir-showcase-display',
            { scale: 0.64, x: 105, y: 60, opacity: 0.15 },
            { scale: 1.02, x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.dir-showcase-display', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.dir-showcase-rail', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit layout shift
          .to('.dir-showcase-rail', { x: -85, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.dir-showcase-display', { x: -55, scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. ALTERNATING CATALOG ZIGZAG — Per-row 3-phase opposite diagonal merge, growth plateau & shrink exit ──
        gsap.fromTo(
          '.trt-zigzag-header .section-heading',
          { x: -60, color: '#5a738c', opacity: 0.25 },
          {
            x: 0,
            color: '#09223a',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.trt-zigzag-header',
              start: 'top 92%',
              end: 'top 45%',
              scrub: 0.7,
            },
          }
        );

        const rows = gsap.utils.toArray('.trt-zigzag-row');
        rows.forEach((row, i) => {
          const isEven = i % 2 === 0;
          const mediaWrap = row.querySelector('.trt-zigzag-media');
          const textWrap = row.querySelector('.trt-zigzag-text');

          const rowTl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 95%',
              end: 'bottom 5%',
              scrub: 0.8,
            },
          });

          if (mediaWrap && textWrap) {
            rowTl
              .fromTo(
                mediaWrap,
                {
                  x: isEven ? -115 : 115,
                  y: 55,
                  scale: 0.62,
                  rotate: isEven ? -3 : 3,
                  opacity: 0.15,
                },
                { x: 0, y: 0, scale: 1.02, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
                0
              )
              .fromTo(
                textWrap,
                { x: isEven ? 115 : -115, y: -45, opacity: 0.15 },
                { x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
                0
              )
              // Plateau
              .to(mediaWrap, { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.34 }, 0.36)
              .to(textWrap, { x: 0, y: 0, opacity: 1, duration: 0.34 }, 0.36)
              // Exit shrink & split
              .to(mediaWrap, { scale: 0.76, x: isEven ? -65 : 65, y: -35, opacity: 0.2, duration: 0.3, ease: 'power2.in' }, 0.7)
              .to(textWrap, { x: isEven ? 65 : -65, y: 25, opacity: 0.2, duration: 0.3, ease: 'power2.in' }, 0.7);
          }
        });

        // ── 4. COMPARISON HEADER ──
        gsap.fromTo(
          '.trt-comp-stage-header .section-heading',
          { x: -60, color: '#5a738c', opacity: 0.25 },
          {
            x: 0,
            color: '#09223a',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.trt-compare-stage',
              start: 'top 92%',
              end: 'top 45%',
              scrub: 0.7,
            },
          }
        );

        // ── 5. APPOINTMENT BANNER — Zoom surge & Footer handoff recession ──
        const apptTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.trt-appointment-banner',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        apptTl
          .fromTo(
            '.trt-appointment-content',
            { scale: 0.82, y: 65, opacity: 0.2 },
            { scale: 1, y: 0, opacity: 1, duration: 0.38, ease: 'power2.out' },
            0
          )
          .to('.trt-appointment-content', { scale: 1, y: 0, opacity: 1, duration: 0.34 }, 0.38)
          .to('.trt-appointment-content', { scale: 0.9, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Comparison stage duel / table scrubbed choreography (re-binds cleanly when toggling view)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const compTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.trt-comp-content',
            start: 'top 95%',
            end: 'bottom 8%',
            scrub: 0.8,
          },
        });

        if (compareView === 'interactive') {
          compTl
            .fromTo('.comp-param-bar', { y: 45, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.32 }, 0)
            .fromTo(
              '.comp-duel-col:first-child',
              { x: -120, rotate: -2, opacity: 0.15 },
              { x: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
              0.04
            )
            .fromTo(
              '.comp-duel-col.is-catheter',
              { x: 120, rotate: 2, opacity: 0.15 },
              { x: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
              0.04
            )
            .fromTo(
              '.comp-duel-divider',
              { scale: 0.2, rotate: -35, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.6)' },
              0.12
            )
            // Plateau
            .to('.comp-duel-col', { x: 0, rotate: 0, opacity: 1, duration: 0.32 }, 0.38)
            // Exit split
            .to('.comp-duel-col:first-child', { x: -80, opacity: 0.2, duration: 0.3 }, 0.7)
            .to('.comp-duel-col.is-catheter', { x: 80, opacity: 0.2, duration: 0.3 }, 0.7)
            .to('.comp-duel-divider', { scale: 0.5, opacity: 0.2, duration: 0.3 }, 0.7);
        } else {
          compTl
            .fromTo('.trt-table-open', { scale: 0.76, y: 55, opacity: 0.15 }, { scale: 1, y: 0, opacity: 1, duration: 0.36 }, 0)
            .to('.trt-table-open', { scale: 1, y: 0, opacity: 1, duration: 0.34 }, 0.36)
            .to('.trt-table-open', { scale: 0.85, y: -35, opacity: 0.2, duration: 0.3 }, 0.7);
        }
      }, pageRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [compareView]);

  return (
    <div ref={pageRef} className="treatments-root">
      {/* ── 1. TREATMENTS HERO ── */}
      <section className="treatments-hero-monument" aria-label="Cardiology Treatments Overview">
        <div className="container trt-z1">
          <div className="trt-hero-status-strip">
            <span className="trt-status-item">
              Chairman, Interventional Cardiology · Medanta – The Medicity, Gurugram
            </span>
            <span className="trt-status-item trt-status-item--gold">
              Padma Shri Awardee (2016) · Pioneer of TAVI &amp; MitraClip in India
            </span>
          </div>

          <div className="trt-hero-command-grid">
            <div className="trt-hero-directive-col">
              <div className="trt-hero-copy-inner">
                <div className="section-kicker">Catheter Interventions</div>
                <SplitHeading
                  as="h1"
                  className="trt-hero-headline"
                  text="Precision Catheter Therapies & Transcatheter Valve Repair"
                />
                <p className="trt-hero-lead">
                  Non-surgical catheter techniques for severe aortic stenosis, mitral regurgitation, and complex multi-vessel coronary blockages.
                </p>

                <div className="trt-hero-actions">
                  <AppointmentButton variant="primary" size="lg" label="Book Procedure Evaluation" />
                  <a href={`tel:${CONTACT_INFO.phones[0]}`} className="btn-clinical btn-clinical--secondary tabular-nums">
                    Call {CONTACT_INFO.phones[0]}
                  </a>
                </div>

                <div className="trt-hero-metrics-row">
                  <div className="trt-metric-item">
                    <span className="trt-metric-val">1st in India</span>
                    <span className="trt-metric-lbl">TAVI &amp; MitraClip</span>
                  </div>
                  <div className="trt-metric-item">
                    <span className="trt-metric-val">Beating Heart</span>
                    <span className="trt-metric-lbl">Zero Bypass Required</span>
                  </div>
                  <div className="trt-metric-item">
                    <span className="trt-metric-val trt-counter-val tabular-nums">100+ Papers</span>
                    <span className="trt-metric-lbl">Indexed Publications</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="trt-hero-centerpiece-col">
              <div className="trt-hero-visual-scrub">
                <div className="trt-stage-float">
                  <div className="trt-hero-centerpiece">
                    <div className="trt-centerpiece-visual">
                      <div className="trt-centerpiece-mask media-reveal-mask">
                        <img
                          src="/images/treatments/valve-replacement-tavi.webp"
                          alt="Transcatheter Aortic Valve Implantation bioprosthetic frame"
                          loading="eager"
                        />
                      </div>
                    </div>
                    <div className="trt-centerpiece-readout">
                      <span>Transcatheter Aortic Valve Implantation · Non-Surgical Femoral Deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FULL PROCEDURE DIRECTORY ── */}
      <section className="section trt-directory-stage" id="directory" aria-label="Full Procedure Directory">
        <div className="container trt-z1">
          <div className="stage-header-row dir-section-header">
            <div>
              <div className="section-kicker">Full Procedure Directory</div>
              <SplitHeading as="h2" className="section-heading" text="Clinical Catheter Protocols" />
            </div>
            <p className="section-lead">
              Select any of the 7 procedures to inspect indications and device design.
            </p>
          </div>

          <div className="dir-showcase-grid">
            <div className="dir-showcase-rail" role="tablist" aria-label="Procedures list">
              {TREATMENTS.map((proc, idx) => {
                const isActive = procedureCycle.activeIndex === idx;
                return (
                  <button
                    key={proc.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`dir-rail-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => procedureCycle.selectIndex(idx)}
                  >
                    <div className="dir-rail-top">
                      <span className="dir-rail-num tabular-nums">0{idx + 1}</span>
                      <span className="dir-rail-title">{proc.name}</span>
                      {proc.pioneer && <span className="dir-rail-badge">{proc.pioneerLabel}</span>}
                    </div>
                    <span className="dir-rail-cat">{proc.category}</span>
                    {isActive && (
                      <div className="cycle-progress-track" style={{ marginTop: '0.45rem' }}>
                        <div
                          key={`proc-prog-${procedureCycle.cycleKey}`}
                          className="cycle-progress-bar"
                          style={{ animationDuration: '6.2s' }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="dir-showcase-display">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcedure.id}
                  className="dir-display-card"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dir-card-media">
                    <div className="dir-media-mask media-reveal-mask">
                      <img
                        src={activeProcedure.image}
                        alt={activeProcedure.fullName}
                        loading="eager"
                      />
                    </div>
                  </div>

                  <div className="dir-card-body">
                    <div className="dir-card-meta">
                      <span>{activeProcedure.category}</span>
                      {activeProcedure.pioneer && (
                        <>
                          <span> · </span>
                          <span className="dir-meta-gold">{activeProcedure.pioneerLabel}</span>
                        </>
                      )}
                    </div>
                    <h3>{activeProcedure.fullName}</h3>
                    <p className="dir-card-desc">{activeProcedure.description}</p>

                    <ul className="dir-card-bullets">
                      {activeProcedure.details.slice(0, 3).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>

                    <div className="dir-card-actions">
                      <AppointmentButton
                        variant="primary"
                        size="md"
                        label={`Consult for ${activeProcedure.name.split(' ')[0]}`}
                      />
                      <div className="dir-nav-btns">
                        <button
                          type="button"
                          onClick={procedureCycle.prev}
                          aria-label="Previous procedure"
                          className="round-nav-btn"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={procedureCycle.next}
                          aria-label="Next procedure"
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
      </section>

      {/* ── 3. FULL CATALOG ZIGZAG ── */}
      <section className="section trt-zigzag-stage" aria-label="All Treatment Details">
        <div className="container trt-z1">
          <div className="stage-header-row trt-zigzag-header" style={{ marginBottom: '2.5rem' }}>
            <div>
              <div className="section-kicker">Clinical Catalog</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Detailed Indications & Device Anatomy"
              />
            </div>
            <p className="section-lead">
              Guided by intravascular imaging, FFR physiology, and multidisciplinary Heart Team planning.
            </p>
          </div>

          <div className="trt-zigzag-list">
            {TREATMENTS.map((trt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <article
                  id={trt.id}
                  key={trt.id}
                  className={`trt-zigzag-row ${isEven ? 'is-normal' : 'is-reversed'}`}
                >
                  <div className="trt-zigzag-media">
                    <div className="trt-zigzag-mask media-reveal-mask">
                      <img src={trt.image} alt={trt.fullName} loading="lazy" />
                    </div>
                  </div>

                  <div className="trt-zigzag-text">
                    <div className="trt-zigzag-meta">
                      <span className="tabular-nums">0{idx + 1}</span>
                      <span> · </span>
                      <span>{trt.category}</span>
                      {trt.pioneer && (
                        <>
                          <span> · </span>
                          <span className="trt-meta-gold">{trt.pioneerLabel}</span>
                        </>
                      )}
                    </div>
                    <h3>{trt.name}</h3>
                    <div className="trt-zigzag-sub">{trt.fullName}</div>
                    <p>{trt.description}</p>
                    <ul className="trt-zigzag-points">
                      {trt.details.slice(0, 3).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '1.25rem' }}>
                      <AppointmentButton variant="primary" size="md" label="Evaluate Candidacy" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. SURGERY VS CATHETER COMPARISON ── */}
      <section className="section trt-compare-stage" aria-label="Catheter vs Open Surgery">
        <div className="container trt-z1">
          <div className="trt-catalog-header trt-comp-stage-header">
            <div>
              <div className="section-kicker">Clinical Comparison</div>
              <SplitHeading
                as="h2"
                className="section-heading"
                text="Open-Heart Surgery vs. Catheter Therapy"
              />
            </div>

            <div className="trt-filter-tabs" role="tablist" aria-label="Comparison view mode">
              <button
                type="button"
                role="tab"
                aria-selected={compareView === 'interactive'}
                className={`trt-filter-tab ${compareView === 'interactive' ? 'is-active' : ''}`}
                onClick={() => setCompareView('interactive')}
              >
                Interactive Comparison
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={compareView === 'table'}
                className={`trt-filter-tab ${compareView === 'table' ? 'is-active' : ''}`}
                onClick={() => setCompareView('table')}
              >
                Full Parameter Table
              </button>
            </div>
          </div>

          <div className="trt-comp-content">
            {compareView === 'interactive' ? (
              <div className="trt-comp-interactive">
                <div className="comp-param-bar" role="tablist" aria-label="Comparison parameters">
                  {COMPARISON_PARAMS.map((item, idx) => {
                    const isActive = compCycle.activeIndex === idx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`comp-param-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => compCycle.selectIndex(idx)}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <div className="cycle-progress-track" style={{ marginTop: '0.4rem' }}>
                            <div
                              key={`cmp-prog-${compCycle.cycleKey}`}
                              className="cycle-progress-bar"
                              style={{ animationDuration: '4.8s' }}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeComp.id}
                    className="comp-duel-stage"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="comp-duel-col">
                      <span className="comp-col-tag">Traditional Open-Heart Surgery</span>
                      <h3>{activeComp.param}</h3>
                      <p>{activeComp.surgery}</p>
                    </div>
                    <div className="comp-duel-divider" aria-hidden="true">VS</div>
                    <div className="comp-duel-col is-catheter">
                      <span className="comp-col-tag">Dr. Chandra Catheter Approach</span>
                      <h3>{activeComp.param}</h3>
                      <p>{activeComp.catheter}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="trt-table-open">
                <table className="trt-clean-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Traditional Open Surgery</th>
                      <th>Catheter-Based Therapy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_PARAMS.map((p) => (
                      <tr key={p.id}>
                        <td className="param-cell">{p.param}</td>
                        <td className="surgery-cell">{p.surgery}</td>
                        <td className="catheter-cell">{p.catheter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. APPOINTMENT BANNER ── */}
      <section className="trt-appointment-banner" aria-label="Book Procedure Consultation">
        <div className="container trt-z1">
          <div className="trt-appointment-content">
            <div className="section-kicker section-kicker--light trt-appt-kicker">
              Medanta – The Medicity · Department of Cardiology, Gurugram
            </div>

            <SplitHeading
              as="h2"
              className="trt-appt-heading"
              text="Schedule a Specialized Valve or Coronary Consultation"
            />

            <p className="trt-appt-desc">
              Review angiograms, determine non-surgical TAVI or MitraClip eligibility, or request a specialist second opinion.
            </p>

            <div className="trt-appt-actions">
              <AppointmentButton variant="white" size="lg" label="Book OPD Consultation at Medanta" />
              <a
                href={`tel:${CONTACT_INFO.phones[0]}`}
                className="btn-clinical btn-clinical--light tabular-nums"
              >
                Direct Clinic: {CONTACT_INFO.phones[0]}
              </a>
            </div>

            <div className="trt-appt-footnote">
              <span>Emergency 24/7 Heart Hotline: <strong>Dial {CONTACT_INFO.emergencyLine}</strong></span>
              <span>·</span>
              <span>Medanta Board: <strong className="tabular-nums">{CONTACT_INFO.hospitalBoard}</strong></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
