// Treatments.jsx – Dynamic auto-cycling procedure showcase, open alternating rows & interactive comparison
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { TREATMENTS } from '../../data/doctorData';
import './Treatments.css';

gsap.registerPlugin(ScrollTrigger);

const FILTER_TABS = [
  'All Procedures',
  'Structural Heart',
  'Coronary',
  'Emergency',
  'Vascular & Rhythm',
];

const COMPARISON_PARAMS = [
  {
    id: 'access',
    label: 'Access',
    param: 'Access & Incision',
    surgery: 'Full sternotomy chest incision',
    catheter: 'Femoral groin micro-puncture',
  },
  {
    id: 'bypass',
    label: 'Bypass',
    param: 'Cardiopulmonary Bypass',
    surgery: 'Requires heart-lung bypass machine',
    catheter: 'Performed on a beating heart without bypass',
  },
  {
    id: 'anesthesia',
    label: 'Anesthesia',
    param: 'Anesthesia Protocol',
    surgery: 'Deep general anesthesia with ventilator',
    catheter: 'Local anesthesia with twilight sedation in most cases',
  },
  {
    id: 'stay',
    label: 'Hospital Stay',
    param: 'Typical Hospital Stay',
    surgery: '7 to 14 days including intensive care',
    catheter: 'Commonly 48 to 72 hours for uncomplicated TAVI',
  },
  {
    id: 'recovery',
    label: 'Recovery',
    param: 'Mobilization & Return',
    surgery: '2 to 3 months of restricted chest recovery',
    catheter: 'Early ambulation; rapid return to daily routine',
  },
  {
    id: 'safety',
    label: 'High-Risk',
    param: 'High-Risk / Elderly Patients',
    surgery: 'Often prohibitive due to age or frailty',
    catheter: 'Established alternative evaluated by the Heart Team',
  },
];

export default function Treatments() {
  const location = useLocation();
  const pageRef = useRef(null);

  const stageCycle = useAutoCycle(TREATMENTS.length, 5600);
  const compCycle = useAutoCycle(COMPARISON_PARAMS.length, 4600);

  const [activeFilter, setActiveFilter] = useState('All Procedures');
  const [compareView, setCompareView] = useState('interactive');

  const activeProcedure = TREATMENTS[stageCycle.activeIndex];
  const activeComp = COMPARISON_PARAMS[compCycle.activeIndex];

  const filteredTreatments =
    activeFilter === 'All Procedures'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.category === activeFilter);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const matchedIdx = TREATMENTS.findIndex((t) => t.id === id);
    if (matchedIdx !== -1) {
      stageCycle.selectIndex(matchedIdx);
    }
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 140);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // 1. Hero entrance & Continuous 3D scrub
        gsap.fromTo(
          '.trt-hero-left',
          { opacity: 0, x: -48 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.trt-hero-right',
          { opacity: 0, x: 48, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        );

        // Continuous Hero Scrubbed 3D Tilt
        gsap.to('.trt-display-visual img', {
          yPercent: -14,
          scale: 1.08,
          rotateX: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: '.trt-stage-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to('.trt-orbital-1', {
          yPercent: -42,
          xPercent: 12,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.trt-stage-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to('.trt-orbital-2', {
          yPercent: 34,
          xPercent: -10,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.trt-stage-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        // 2. Catalog Rows with Continuous Parallax Zoom
        gsap.fromTo(
          '.trt-alt-row',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-catalog-stage',
              start: 'top 84%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.trt-row-visual img',
          { scale: 0.9, rotate: -3 },
          {
            scale: 1.06,
            rotate: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.trt-catalog-stage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        // 3. Comparison Stage Reveal
        gsap.fromTo(
          '.trt-comp-reveal',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-compare-stage',
              start: 'top 84%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [activeFilter]);

  return (
    <div ref={pageRef} className="treatments-root">
      {/* ── 1. AUTO-CYCLING 7-PROCEDURE INTERACTIVE HERO STAGE ── */}
      <section className="trt-stage-hero" aria-label="Interactive Procedures Stage">
        <div className="trt-hero-wedge" aria-hidden="true" />
        <SectionBackground variant="valve-motion" opacity={0.48} />

        <div className="container trt-z1">
          <div className="trt-stage-top">
            <div className="trt-hero-left">
              <div className="section-kicker">Specialized Interventions</div>
              <h1 className="trt-main-title">
                Catheter Therapies &amp; Heart Valve Care
              </h1>
              <p className="trt-main-lead">
                Cycles through 7 verified procedures or click any option to inspect clinical details and matched medical visuals.
              </p>

              {/* Compact Selectable List */}
              <div className="trt-selector-rail" role="tablist" aria-label="Select procedure">
                {TREATMENTS.map((proc, idx) => {
                  const isActive = stageCycle.activeIndex === idx;
                  return (
                    <button
                      key={proc.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`trt-rail-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => stageCycle.selectIndex(idx)}
                    >
                      <div className="trt-rail-row">
                        <span className="trt-rail-idx tabular-nums">0{idx + 1}</span>
                        <span className="trt-rail-name">{proc.name}</span>
                        {proc.pioneer && <span className="trt-rail-first">{proc.pioneerLabel}</span>}
                      </div>
                      {isActive && (
                        <div className="cycle-progress-track" style={{ marginTop: '0.45rem' }}>
                          <div
                            key={`trt-prog-${stageCycle.cycleKey}`}
                            className="cycle-progress-bar"
                            style={{ animationDuration: '5.6s' }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Synchronized Uncropped Visual + Details Stage with 3D Depth */}
            <div className="trt-stage-display trt-hero-right perspective-stage" style={{ position: 'relative' }}>
              <div className="floating-orbital-badge floating-orbital-badge--gold trt-orbital-1" style={{ top: '-14px', right: '-12px' }}>
                <span>⚡</span>
                <span>0 Sternotomy · Beating Heart</span>
              </div>
              <div className="floating-orbital-badge floating-orbital-badge--teal trt-orbital-2" style={{ bottom: '16px', left: '-12px' }}>
                <span>⏱️</span>
                <span>48-Hour Rapid Recovery</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcedure.id}
                  className="trt-display-inner"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="trt-display-visual">
                    <img
                      src={activeProcedure.image}
                      alt={activeProcedure.fullName}
                      loading="eager"
                    />
                  </div>

                  <div className="trt-display-body">
                    <div className="trt-display-meta">
                      <span>{activeProcedure.category}</span>
                      {activeProcedure.pioneer && (
                        <>
                          <span>·</span>
                          <span className="trt-meta-gold">{activeProcedure.pioneerLabel}</span>
                        </>
                      )}
                    </div>
                    <h2>{activeProcedure.fullName}</h2>
                    <p>{activeProcedure.description}</p>
                    <ul className="trt-display-points">
                      {activeProcedure.details.slice(0, 3).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="trt-display-actions">
                      <AppointmentButton variant="primary" size="md" label={`Consult for ${activeProcedure.name.split(' ')[0]}`} />
                      <div className="trt-nav-arrows">
                        <button
                          type="button"
                          onClick={stageCycle.prev}
                          aria-label="Previous procedure"
                          className="round-nav-btn"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={stageCycle.next}
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

      {/* ── 2. OPEN ALTERNATING FULL-CATALOG DIRECTORY (ZERO BOX CARDS) ── */}
      <section className="section trt-catalog-stage" aria-label="Procedure Directory">
        <div className="container trt-z1">
          <div className="trt-catalog-header">
            <div>
              <div className="section-kicker">01 · Full Procedure Directory</div>
              <h2 className="section-heading">Clinical Indications &amp; Protocols</h2>
            </div>

            <div className="trt-filter-tabs" role="tablist" aria-label="Filter treatments by category">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab}
                  className={`trt-filter-tab ${activeFilter === tab ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="trt-open-rows">
            {filteredTreatments.map((trt, idx) => (
              <article
                id={trt.id}
                key={trt.id}
                className={`trt-alt-row ${idx % 2 === 1 ? 'is-reversed' : ''}`}
              >
                <div className="trt-row-visual">
                  <img src={trt.image} alt={trt.fullName} loading="lazy" />
                </div>

                <div className="trt-row-content">
                  <div className="trt-row-meta">
                    <span className="tabular-nums">0{idx + 1}</span>
                    <span>·</span>
                    <span>{trt.category}</span>
                    {trt.pioneer && (
                      <>
                        <span>·</span>
                        <span className="trt-row-gold">{trt.pioneerLabel}</span>
                      </>
                    )}
                  </div>
                  <h3>{trt.name}</h3>
                  <p className="trt-row-sub">{trt.fullName}</p>
                  <p className="trt-row-desc">{trt.description}</p>
                  <ul className="trt-row-bullets">
                    {trt.details.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '1rem' }}>
                    <AppointmentButton variant="primary" size="md" label="Evaluate Candidacy" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE SURGERY VS CATHETER COMPARISON (LUMINOUS AZURE) ── */}
      <section className="section trt-compare-stage" aria-label="Catheter vs Open Surgery">
        <div className="container trt-z1">
          <div className="trt-catalog-header trt-comp-reveal">
            <div>
              <div className="section-kicker">02 · Clinical Comparison</div>
              <h2 className="section-heading">Open-Heart Surgery vs. Catheter Therapy</h2>
            </div>

            <div className="trt-filter-tabs" role="tablist" aria-label="Comparison view mode">
              <button
                type="button"
                role="tab"
                aria-selected={compareView === 'interactive'}
                className={`trt-filter-tab ${compareView === 'interactive' ? 'is-active' : ''}`}
                onClick={() => setCompareView('interactive')}
              >
                Interactive Stage
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={compareView === 'table'}
                className={`trt-filter-tab ${compareView === 'table' ? 'is-active' : ''}`}
                onClick={() => setCompareView('table')}
              >
                Full Table View
              </button>
            </div>
          </div>

          {compareView === 'interactive' ? (
            <div className="trt-comp-interactive trt-comp-reveal">
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
                            style={{ animationDuration: '4.6s' }}
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
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
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
            <div className="trt-table-open trt-comp-reveal">
              <table className="trt-clean-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Traditional Open Surgery</th>
                    <th>Catheter-Based Therapy</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_PARAMS.map((row) => (
                    <tr key={row.id}>
                      <td><strong>{row.param}</strong></td>
                      <td>{row.surgery}</td>
                      <td className="is-highlight">{row.catheter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SECOND OPINION SAPPHIRE RIBBON ── */}
      <section className="trt-opinion-ribbon" aria-label="Second Opinion Consultation">
        <div className="container">
          <div className="trt-opinion-flex">
            <div>
              <h2>Advised Bypass Surgery or Open Valve Replacement?</h2>
              <p>Review your echocardiogram &amp; angiogram films with Dr. Praveen Chandra at Medanta.</p>
            </div>
            <div className="trt-opinion-actions">
              <AppointmentButton variant="white" size="lg" label="Request Second Opinion" />
              <Link to="/contact" className="btn-clinical btn-clinical--light">
                OPD Visit Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
