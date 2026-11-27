// Treatments.jsx – Redesigned Hero, Auto-Cycling Procedure Showcase, Alternating Catalog & Premium Appointment Banner
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { useAutoCycle } from '../../hooks/useAutoCycle';
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

const SPECIALTY_TILES = [
  {
    code: 'TAVI / TAVR',
    name: 'Transcatheter Aortic Valve',
    tag: '1st in India',
    desc: 'Catheter bioprosthesis deployed inside native aortic valve without open surgery.',
    icon: '🫀',
  },
  {
    code: 'MitraClip / TEER',
    name: 'Percutaneous Mitral Repair',
    tag: '1st in India',
    desc: 'Beating-heart edge-to-edge clip therapy for severe mitral and tricuspid leakage.',
    icon: '🩺',
  },
  {
    code: 'CTO & Left Main',
    name: 'Complex Coronary PCI',
    tag: 'High Precision',
    desc: 'Multi-vessel revascularization for 100% chronically occluded arteries.',
    icon: '🔬',
  },
  {
    code: 'Shockwave IVL & FFR',
    name: 'Sonic Lithotripsy & Physiology',
    tag: 'Dense Calcium',
    desc: 'Intravascular acoustic waves fracture severe calcium for safe stent expansion.',
    icon: '⚡',
  },
];

export default function Treatments() {
  const location = useLocation();
  const pageRef = useRef(null);

  // Auto-cycling 7 procedures in the directory showcase
  const procedureCycle = useAutoCycle(TREATMENTS.length, 6200);
  const compCycle = useAutoCycle(COMPARISON_PARAMS.length, 4800);

  const [compareView, setCompareView] = useState('interactive');

  const activeProcedure = TREATMENTS[procedureCycle.activeIndex];
  const activeComp = COMPARISON_PARAMS[compCycle.activeIndex];

  // Handle deep link hashes to auto-select matching procedure
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const matchedIdx = TREATMENTS.findIndex((t) => t.id === id);
    if (matchedIdx !== -1) {
      procedureCycle.selectIndex(matchedIdx);
    }
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // 1. Treatments Hero — Progressive Staged Reveal
        gsap.fromTo(
          '.trt-hero-status-strip',
          { opacity: 0, y: -24 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.trt-hero-directive-col',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.1 }
        );
        gsap.fromTo(
          '.trt-hero-centerpiece',
          { opacity: 0, scale: 0.92, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 }
        );

        // Continuous Hero Parallax on Scroll
        gsap.to('.trt-hero-centerpiece img', {
          yPercent: -12,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: '.treatments-hero-monument',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // 2. Full Procedure Directory Showcase — Reversible Split Animation
        gsap.fromTo(
          '.dir-showcase-rail',
          { opacity: 0, x: -45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-directory-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.dir-showcase-display',
          { opacity: 0, x: 45, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-directory-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // 3. Alternating Catalog Rows — Alternating Directional Reveals
        const rows = gsap.utils.toArray('.trt-zigzag-row');
        rows.forEach((row, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            row,
            { opacity: 0, x: fromLeft ? -45 : 45, y: 25 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                end: 'bottom 12%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });

        // 4. Comparison Stage Reveal
        gsap.fromTo(
          '.trt-comp-reveal',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-compare-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // 5. Final Appointment Banner Reveal
        gsap.fromTo(
          '.trt-appointment-content',
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.trt-appointment-banner',
              start: 'top 85%',
              end: 'bottom 15%',
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
    <div ref={pageRef} className="treatments-root">
      {/* ── 1. BRAND-NEW PREMIUM TREATMENTS HERO (ARCHITECTURAL COMMAND CENTER) ── */}
      <section className="treatments-hero-monument" aria-label="Cardiology Treatments Overview">
        <SectionBackground variant="valve-motion" opacity={0.65} />

        <div className="container trt-z1">
          {/* Top Clinical Accreditation Strip */}
          <div className="trt-hero-status-strip">
            <div className="trt-hero-chip">
              <span className="trt-chip-pulse" />
              <span>Chairman, Interventional Cardiology · Medanta – The Medicity, Gurugram</span>
            </div>
            <div className="trt-hero-chip trt-hero-chip--gold">
              <span>🏅</span>
              <span>Padma Shri Awardee 2016 · Pioneer of TAVI &amp; MitraClip in India</span>
            </div>
          </div>

          {/* Premium 2-Column Hero: Left Directives & Verifications, Right Prominent Clinical Centerpiece */}
          <div className="trt-hero-command-grid">
            {/* Col 1: Directive & Typography */}
            <div className="trt-hero-directive-col">
              <div className="section-kicker">Catheter Interventions</div>
              <h1 className="trt-hero-headline">
                Precision Catheter Therapies &amp; Transcatheter Valve Repair
              </h1>
              <p className="trt-hero-lead">
                Advanced percutaneous techniques eliminating sternotomy and heart-lung bypass for severe aortic stenosis, mitral regurgitation, and complex multi-vessel coronary blockages under the leadership of Padma Shri Dr. Praveen Chandra.
              </p>

              <div className="trt-hero-actions">
                <AppointmentButton variant="primary" size="lg" label="Book Procedure Evaluation" />
                <a href={`tel:${CONTACT_INFO.phones[0]}`} className="btn-clinical btn-clinical--secondary tabular-nums">
                  Call {CONTACT_INFO.phones[0]}
                </a>
              </div>

              {/* Verified Clinical Credentials */}
              <div className="trt-hero-metrics-row">
                <div className="trt-metric-pill">
                  <span className="trt-metric-val">1st in India</span>
                  <span className="trt-metric-lbl">TAVI &amp; MitraClip</span>
                </div>
                <div className="trt-metric-pill">
                  <span className="trt-metric-val">Beating Heart</span>
                  <span className="trt-metric-lbl">Zero Bypass Required</span>
                </div>
                <div className="trt-metric-pill">
                  <span className="trt-metric-val">100+ Papers</span>
                  <span className="trt-metric-lbl">Indexed Publications</span>
                </div>
              </div>
            </div>

            {/* Col 2: Prominent Medical Centerpiece Showcase (Full Width & Clean) */}
            <div className="trt-hero-centerpiece">
              <div className="trt-centerpiece-visual">
                <img
                  src="/images/treatments/valve-replacement-tavi.webp"
                  alt="Transcatheter Aortic Valve Implantation bioprosthetic frame"
                  loading="eager"
                />
                <div className="trt-scanline-beam" aria-hidden="true" />
              </div>
              <div className="trt-centerpiece-readout">
                <span className="trt-readout-indicator" />
                <span>Transcatheter Aortic Valve Implantation · Non-Surgical Femoral Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FULL PROCEDURE DIRECTORY — AUTO-CYCLING SHOWCASE ── */}
      <section className="section trt-directory-stage" id="directory" aria-label="Full Procedure Directory">
        <div className="container trt-z1">
          <div className="stage-header-row">
            <div>
              <div className="section-kicker">Full Procedure Directory</div>
              <h2 className="section-heading">Auto-Cycling Clinical Protocols</h2>
            </div>
            <p className="section-lead">
              Cycles automatically across all 7 catheter procedures. Select any procedure to inspect clinical indications and mechanism.
            </p>
          </div>

          <div className="dir-showcase-grid">
            {/* Left 7-Procedure Rail with Synchronized Auto-Cycle Progress */}
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

            {/* Right Synchronized Uncropped Visual Showcase */}
            <div className="dir-showcase-display">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcedure.id}
                  className="dir-display-card"
                  initial={{ opacity: 0, x: 28, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: 0.98 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dir-card-media">
                    <img
                      src={activeProcedure.image}
                      alt={activeProcedure.fullName}
                      loading="eager"
                    />
                  </div>

                  <div className="dir-card-body">
                    <div className="dir-card-meta">
                      <span>{activeProcedure.category}</span>
                      {activeProcedure.pioneer && (
                        <>
                          <span>·</span>
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

      {/* ── 3. FULL CATALOG ZIGZAG EDITORIAL BREAKDOWN ── */}
      <section className="section trt-zigzag-stage" aria-label="All Treatment Details">
        <div className="container trt-z1">
          <div className="stage-header-row" style={{ marginBottom: '2.5rem' }}>
            <div>
              <div className="section-kicker">Clinical Catalog</div>
              <h2 className="section-heading">Detailed Indications &amp; Device Anatomy</h2>
            </div>
            <p className="section-lead">
              Every procedure is individually tailored with intravascular diagnostics, physiological flow tests, and multidisciplinary Heart Team planning.
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
                  {/* Uncropped High-Fidelity Medical Visual */}
                  <div className="trt-zigzag-media">
                    <img src={trt.image} alt={trt.fullName} loading="lazy" />
                  </div>

                  {/* Concise Clinical Text */}
                  <div className="trt-zigzag-text">
                    <div className="trt-zigzag-meta">
                      <span className="tabular-nums">0{idx + 1}</span>
                      <span>·</span>
                      <span>{trt.category}</span>
                      {trt.pioneer && (
                        <>
                          <span>·</span>
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

      {/* ── 4. SURGERY VS CATHETER CLINICAL COMPARISON ── */}
      <section className="section trt-compare-stage" aria-label="Catheter vs Open Surgery">
        <div className="container trt-z1">
          <div className="trt-catalog-header trt-comp-reveal">
            <div>
              <div className="section-kicker">Clinical Comparison</div>
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
      </section>

      {/* ── 5. COMPLETELY REDESIGNED PREMIUM APPOINTMENT BANNER ── */}
      <section className="trt-appointment-banner" aria-label="Book Procedure Consultation">
        <SectionBackground variant="ecg-monitor" opacity={0.35} />
        <div className="container trt-z1">
          <div className="trt-appointment-content">
            <span className="trt-appt-kicker">
              🏥 Medanta – The Medicity · Department of Cardiology, Gurugram
            </span>

            <h2 className="trt-appt-heading">
              Schedule a Specialized Valve or Coronary Consultation
            </h2>

            <p className="trt-appt-desc">
              Review prior coronary angiograms, determine non-surgical TAVI or MitraClip eligibility, or receive a dedicated second opinion with Padma Shri Dr. Praveen Chandra and the Medanta Heart Team.
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
              <span>Medanta Board: <strong>{CONTACT_INFO.hospitalBoard}</strong></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
