// Treatments.jsx – Architectural procedural triad, interactive protocol stage & varied editorial catalog
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import ResponsiveImage from '../../components/common/ResponsiveImage';
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
        // ── 1. TREATMENTS HERO — Left copy + 3-Layer Procedural Triad convergence & inverse exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.trt-hero-status-strip',
            { y: -22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
          )
          .fromTo(
            '.trt-hero-directive-col',
            { x: -110, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            '.trt-triad-main',
            { x: 110, scale: 0.78, opacity: 0 },
            { x: 0, scale: 1, opacity: 1, duration: 1.0, ease: 'power3.out' },
            0.08
          )
          .fromTo(
            '.trt-triad-wing--top',
            { x: -55, y: -45, scale: 0.72, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0.22
          )
          .fromTo(
            '.trt-triad-wing--bottom',
            { x: 65, y: 55, scale: 0.72, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
            0.28
          )
          .fromTo(
            '.trt-hero-headline .split-word-inner',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055, ease: 'power3.out' },
            0.22
          )
          .fromTo('.trt-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.45)
          .fromTo(
            '.trt-hero-actions > *',
            { scale: 0.86, y: 16, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.5)' },
            0.55
          )
          .fromTo('.trt-metric-item', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.65);

        animateNumericCounters('.trt-counter-val', {
          trigger: '.treatments-hero-monument',
          start: 'top 95%',
        });

        gsap.to('.trt-stage-float', {
          y: -8,
          duration: 3.8,
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
          .to('.trt-hero-copy-inner', { x: -75, y: -24, opacity: 0.22, ease: 'none' }, 0)
          .to('.trt-triad-main', { scale: 0.86, y: -28, opacity: 0.28, ease: 'none' }, 0)
          .to('.trt-triad-wing--top', { x: -55, y: -40, scale: 1.08, opacity: 0.35, ease: 'none' }, 0)
          .to('.trt-triad-wing--bottom', { x: 55, y: 35, scale: 1.08, opacity: 0.35, ease: 'none' }, 0);

        // ── 2. PROCEDURE DIRECTORY — Scrubbed rail + display growth ──
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
            { x: -55, opacity: 0.25 },
            { x: 0, opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.dir-section-header .section-lead', { x: 65, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo('.dir-showcase-rail', { x: -95, opacity: 0.18 }, { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' }, 0)
          .fromTo(
            '.dir-showcase-display',
            { scale: 0.7, x: 95, y: 50, opacity: 0.18 },
            { scale: 1.01, x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .to('.dir-showcase-display', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.dir-showcase-rail', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.dir-showcase-rail', { x: -70, opacity: 0.24, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.dir-showcase-display', { x: 45, scale: 0.84, y: -35, opacity: 0.24, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. VARIED EDITORIAL CATALOG BANDS — Distinct per-band motion choreography ──
        gsap.fromTo(
          '.trt-catalog-header-row .section-heading',
          { x: -55, opacity: 0.25 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.trt-catalog-header-row',
              start: 'top 92%',
              end: 'top 45%',
              scrub: 0.7,
            },
          }
        );

        const panBands = gsap.utils.toArray('.trt-panorama-band');
        panBands.forEach((band, idx) => {
          const media = band.querySelector('.trt-panorama-visual');
          const copy = band.querySelector('.trt-panorama-copy');
          const fromLeft = idx % 2 === 0;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: band,
              start: 'top 95%',
              end: 'bottom 5%',
              scrub: 0.8,
            },
          });
          if (media && copy) {
            tl.fromTo(
              media,
              { x: fromLeft ? -110 : 110, scale: 0.68, opacity: 0.15 },
              { x: 0, scale: 1.02, opacity: 1, duration: 0.36, ease: 'power2.out' },
              0
            )
              .fromTo(
                copy,
                { x: fromLeft ? 105 : -105, y: 35, opacity: 0.15 },
                { x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
                0
              )
              .to([media, copy], { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.34 }, 0.36)
              .to(media, { scale: 0.8, x: fromLeft ? -60 : 60, opacity: 0.22, duration: 0.3 }, 0.7)
              .to(copy, { x: fromLeft ? 60 : -60, opacity: 0.22, duration: 0.3 }, 0.7);
          }
        });

        const duoSpreads = gsap.utils.toArray('.trt-duo-spread');
        duoSpreads.forEach((spread) => {
          const cards = spread.querySelectorAll('.trt-duo-col');
          if (cards.length === 2) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: spread,
                start: 'top 94%',
                end: 'bottom 8%',
                scrub: 0.8,
              },
            });
            tl.fromTo(cards[0], { x: -85, y: 45, opacity: 0.18 }, { x: 0, y: 0, opacity: 1, duration: 0.38 }, 0)
              .fromTo(cards[1], { x: 85, y: 65, opacity: 0.18 }, { x: 0, y: 0, opacity: 1, duration: 0.38 }, 0)
              .to(cards, { x: 0, y: 0, opacity: 1, duration: 0.34 }, 0.38)
              .to(cards[0], { y: -30, opacity: 0.25, duration: 0.28 }, 0.72)
              .to(cards[1], { y: -45, opacity: 0.25, duration: 0.28 }, 0.72);
          }
        });

        // ── 4. COMPARISON HEADER ──
        gsap.fromTo(
          '.trt-comp-stage-header .section-heading',
          { x: -55, opacity: 0.25 },
          {
            x: 0,
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
            .fromTo('.comp-param-bar', { y: 40, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.32 }, 0)
            .fromTo(
              '.comp-duel-col:first-child',
              { x: -110, rotate: -1.5, opacity: 0.15 },
              { x: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
              0.04
            )
            .fromTo(
              '.comp-duel-col.is-catheter',
              { x: 110, rotate: 1.5, opacity: 0.15 },
              { x: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
              0.04
            )
            .fromTo(
              '.comp-duel-divider',
              { scale: 0.2, rotate: -35, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.6)' },
              0.12
            )
            .to('.comp-duel-col', { x: 0, rotate: 0, opacity: 1, duration: 0.32 }, 0.38)
            .to('.comp-duel-col:first-child', { x: -75, opacity: 0.2, duration: 0.3 }, 0.7)
            .to('.comp-duel-col.is-catheter', { x: 75, opacity: 0.2, duration: 0.3 }, 0.7)
            .to('.comp-duel-divider', { scale: 0.5, opacity: 0.2, duration: 0.3 }, 0.7);
        } else {
          compTl
            .fromTo('.trt-table-open', { scale: 0.78, y: 55, opacity: 0.15 }, { scale: 1, y: 0, opacity: 1, duration: 0.36 }, 0)
            .to('.trt-table-open', { scale: 1, y: 0, opacity: 1, duration: 0.34 }, 0.36)
            .to('.trt-table-open', { scale: 0.86, y: -35, opacity: 0.2, duration: 0.3 }, 0.7);
        }
      }, pageRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [compareView]);

  const taviProc = TREATMENTS[0];
  const mitraProc = TREATMENTS[1];
  const pciProc = TREATMENTS[2];
  const acuteProc = TREATMENTS[3];
  const bmvProc = TREATMENTS[4];
  const peripheralProc = TREATMENTS[5];
  const leadlessProc = TREATMENTS[6];

  return (
    <div ref={pageRef} className="treatments-root">
      {/* ── 1. TREATMENTS HERO WITH 3-LAYER PROCEDURAL TRIAD ── */}
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

            {/* 3-Layer Procedural Visual Triad */}
            <div className="trt-hero-triad-col">
              <div className="trt-stage-float trt-triad-canvas">
                <div className="trt-triad-main">
                  <div className="trt-triad-main-media">
                    <ResponsiveImage
                      src="/images/treatments/valve-replacement-tavi.webp"
                      alt="Transcatheter Aortic Valve Implantation bioprosthetic frame"
                      priority
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 440px"
                    />
                  </div>
                  <div className="trt-triad-readout">
                    <span>TAVI / TAVR · Non-Surgical Femoral Valve</span>
                  </div>
                </div>

                <div className="trt-triad-wing trt-triad-wing--top">
                  <div className="trt-triad-wing-media">
                    <ResponsiveImage
                      src="/images/illustrations/mitraclip-repair-diagram.webp"
                      alt="MitraClip percutaneous mitral leaflet clip repair"
                      priority
                      objectFit="contain"
                      sizes="220px"
                    />
                  </div>
                  <span>MitraClip TEER</span>
                </div>

                <div className="trt-triad-wing trt-triad-wing--bottom">
                  <div className="trt-triad-wing-media">
                    <ResponsiveImage
                      src="/images/illustrations/coronary-stent-ivl.webp"
                      alt="Intravascular lithotripsy and precision coronary stent"
                      priority
                      objectFit="contain"
                      sizes="220px"
                    />
                  </div>
                  <span>Complex PCI &amp; IVL</span>
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
                  className="dir-display-panel"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="dir-card-media">
                    <ResponsiveImage
                      src={activeProcedure.image}
                      alt={activeProcedure.fullName}
                      priority
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 560px"
                    />
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

      {/* ── 3. VARIED EDITORIAL CLINICAL CATALOG (Zero Repetitive Stacked White Cards) ── */}
      <section className="trt-catalog-stage" aria-label="All Treatment Details">
        <div className="container trt-z1 trt-catalog-intro">
          <div className="stage-header-row trt-catalog-header-row">
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
        </div>

        {/* Band A: TAVI Structural Flagship Panorama */}
        <article id={taviProc.id} className="trt-panorama-band trt-panorama-band--light">
          <div className="container trt-panorama-grid">
            <div className="trt-panorama-visual">
              <ResponsiveImage
                src={taviProc.image}
                alt={taviProc.fullName}
                objectFit="contain"
                sizes="(max-width: 900px) 92vw, 520px"
              />
            </div>
            <div className="trt-panorama-copy">
              <div className="trt-cat-meta">
                <span className="tabular-nums">01</span>
                <span> · </span>
                <span>{taviProc.category}</span>
                {taviProc.pioneer && (
                  <>
                    <span> · </span>
                    <span className="trt-meta-gold">{taviProc.pioneerLabel}</span>
                  </>
                )}
              </div>
              <h3>{taviProc.name}</h3>
              <div className="trt-cat-sub">{taviProc.fullName}</div>
              <p>{taviProc.description}</p>
              <ul className="trt-cat-points">
                {taviProc.details.slice(0, 3).map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="trt-cat-action">
                <AppointmentButton variant="primary" size="md" label="Evaluate TAVI Candidacy" />
              </div>
            </div>
          </div>
        </article>

        {/* Band B: Asymmetric 2-Up Editorial Spread — MitraClip & Complex PCI */}
        <div className="trt-duo-band trt-duo-band--white">
          <div className="container">
            <div className="trt-duo-spread">
              {[mitraProc, pciProc].map((trt, i) => (
                <article id={trt.id} key={trt.id} className="trt-duo-col">
                  <div className="trt-duo-visual">
                    <ResponsiveImage
                      src={trt.image}
                      alt={trt.fullName}
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 540px"
                    />
                  </div>
                  <div className="trt-duo-copy">
                    <div className="trt-cat-meta">
                      <span className="tabular-nums">0{i + 2}</span>
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
                    <div className="trt-cat-sub">{trt.fullName}</div>
                    <p>{trt.description}</p>
                    <ul className="trt-cat-points">
                      {trt.details.slice(0, 3).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="trt-cat-action">
                      <AppointmentButton variant="secondary" size="md" label="Evaluate Candidacy" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Band C: High-Contrast Sapphire Contrast Feature — 24/7 Acute MI */}
        <article id={acuteProc.id} className="trt-panorama-band trt-panorama-band--sapphire">
          <div className="container trt-panorama-grid trt-panorama-grid--flipped">
            <div className="trt-panorama-copy">
              <div className="trt-cat-meta trt-cat-meta--light">
                <span className="tabular-nums">04</span>
                <span> · </span>
                <span>{acuteProc.category}</span>
                {acuteProc.pioneer && (
                  <>
                    <span> · </span>
                    <span className="trt-meta-gold-light">{acuteProc.pioneerLabel}</span>
                  </>
                )}
              </div>
              <h3>{acuteProc.name}</h3>
              <div className="trt-cat-sub trt-cat-sub--light">{acuteProc.fullName}</div>
              <p>{acuteProc.description}</p>
              <ul className="trt-cat-points trt-cat-points--light">
                {acuteProc.details.slice(0, 3).map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="trt-cat-action">
                <AppointmentButton variant="white" size="md" label="24/7 Heart Emergency Protocol" />
              </div>
            </div>
            <div className="trt-panorama-visual trt-panorama-visual--dark">
              <ResponsiveImage
                src={acuteProc.image}
                alt={acuteProc.fullName}
                objectFit="contain"
                sizes="(max-width: 900px) 92vw, 520px"
              />
            </div>
          </div>
        </article>

        {/* Band D: Warm Stone 2-Up Editorial Spread — BMV & Vascular / Carotid / AAA */}
        <div className="trt-duo-band trt-duo-band--stone">
          <div className="container">
            <div className="trt-duo-spread">
              {[bmvProc, peripheralProc].map((trt, i) => (
                <article id={trt.id} key={trt.id} className="trt-duo-col">
                  <div className="trt-duo-visual">
                    <ResponsiveImage
                      src={trt.image}
                      alt={trt.fullName}
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 540px"
                    />
                  </div>
                  <div className="trt-duo-copy">
                    <div className="trt-cat-meta">
                      <span className="tabular-nums">0{i + 5}</span>
                      <span> · </span>
                      <span>{trt.category}</span>
                    </div>
                    <h3>{trt.name}</h3>
                    <div className="trt-cat-sub">{trt.fullName}</div>
                    <p>{trt.description}</p>
                    <ul className="trt-cat-points">
                      {trt.details.slice(0, 3).map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <div className="trt-cat-action">
                      <AppointmentButton variant="secondary" size="md" label="Evaluate Candidacy" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Band E: Final Leadless Pacing Wide Showcase */}
        <article id={leadlessProc.id} className="trt-panorama-band trt-panorama-band--ice">
          <div className="container trt-panorama-grid">
            <div className="trt-panorama-visual">
              <ResponsiveImage
                src={leadlessProc.image}
                alt={leadlessProc.fullName}
                objectFit="contain"
                sizes="(max-width: 900px) 92vw, 520px"
              />
            </div>
            <div className="trt-panorama-copy">
              <div className="trt-cat-meta">
                <span className="tabular-nums">07</span>
                <span> · </span>
                <span>{leadlessProc.category}</span>
              </div>
              <h3>{leadlessProc.name}</h3>
              <div className="trt-cat-sub">{leadlessProc.fullName}</div>
              <p>{leadlessProc.description}</p>
              <ul className="trt-cat-points">
                {leadlessProc.details.slice(0, 3).map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="trt-cat-action">
                <AppointmentButton variant="primary" size="md" label="Consult for Leadless Pacing" />
              </div>
            </div>
          </div>
        </article>
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
