// Contact.jsx – Medanta OPD location hub with multi-technique GSAP choreography
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SplitHeading from '../../components/motion/SplitHeading';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { CONTACT_INFO, DOCTOR } from '../../data/doctorData';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const PRE_VISIT_DOCS = [
  { id: 'ecg', label: 'Recent 12-Lead ECG report' },
  { id: 'echo', label: '2D Echocardiogram (Echo) report & measurements' },
  { id: 'angio', label: 'Coronary Angiogram CD / DVD (if previously performed)' },
  { id: 'meds', label: 'Current prescription list & prior discharge summaries' },
];

const TRANSIT_ROUTES = [
  {
    id: 'airport',
    mode: 'Air Arrival',
    name: 'Indira Gandhi International Airport (T3)',
    distance: '~19 km · 30–35 min via NH-48',
    detail: 'Direct cab via NH-48 (~30 min). International Desk concierge assists with airport transfers and medical visa coordination.',
  },
  {
    id: 'metro',
    mode: 'Delhi Metro',
    name: 'Millennium City Centre (Yellow Line)',
    distance: '~5.2 km · 12 min auto/cab',
    detail: 'Yellow Line terminal connects Central Delhi and New Delhi Railway Station directly to the Medanta Road approach.',
  },
  {
    id: 'highway',
    mode: 'Expressway',
    name: 'NH-48 / Bakhtawar Chowk Approach',
    distance: 'Gate 1 & Cardiology OPD Wing',
    detail: 'Multi-level hospital parking available for patient families entering via CH Baktawar Singh Road, Sector 38, Gurugram.',
  },
];

export default function Contact() {
  const transitCycle = useAutoCycle(TRANSIT_ROUTES.length, 5000);
  const [checkedDocs, setCheckedDocs] = useState({});
  const pageRef = useRef(null);

  const activeRoute = TRANSIT_ROUTES[transitCycle.activeIndex];
  const completedCount = PRE_VISIT_DOCS.filter((d) => checkedDocs[d.id]).length;

  const toggleDoc = (id) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. CONTACT HERO — Strong opposing left/right mount + continuous float + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.cnt-hero-wedge',
            { xPercent: 45, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
          )
          .fromTo(
            '.cnt-hero-copy',
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            '.cnt-hero-visual',
            { x: 135, scale: 0.72, rotate: 2.5, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
            0.08
          )
          .fromTo('.cnt-hero-copy .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.18)
          .fromTo(
            '.cnt-main-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055, ease: 'power3.out' },
            0.24
          )
          .fromTo('.cnt-main-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.46)
          .fromTo(
            '.cnt-hero-actions > *',
            { scale: 0.82, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.56
          )
          .fromTo(
            '.cnt-quick-facts > div',
            { x: -26, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            0.66
          );

        gsap.to('.cnt-stage-float', {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.cnt-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.cnt-hero-copy-inner', { x: -75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.cnt-hero-visual-scrub', { x: 75, y: -32, scale: 0.84, opacity: 0.2, ease: 'none' }, 0)
          .to('.cnt-hero-wedge', { yPercent: -12, opacity: 0.3, ease: 'none' }, 0);

        // ── 2. HOSPITAL HUB & MAP — Opposite diagonal corner merge, map growth & split exit ──
        const hubTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.cnt-hub-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        hubTl
          .fromTo(
            '.cnt-hub-left .section-heading',
            { x: -55, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.cnt-hub-left',
            { x: -110, y: 55, opacity: 0.15 },
            { x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.cnt-hub-right',
            { x: 115, y: -50, scale: 0.66, opacity: 0.15 },
            { x: 0, y: 0, scale: 1.02, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.cnt-hub-right', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.cnt-hub-left', { x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Split exit
          .to('.cnt-hub-left', { x: -70, y: -30, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.cnt-hub-right', { x: 70, y: 30, scale: 0.78, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. PRE-VISIT PREPARATION — Checklist left glide + international desk growth & shrink exit ──
        const prepTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.cnt-prep-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        prepTl
          .fromTo(
            '.cnt-checklist-col .section-heading',
            { x: -55, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.cnt-checklist-col', { x: -95, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' }, 0)
          .fromTo(
            '.cnt-intl-col',
            { scale: 0.65, x: 95, y: 65, opacity: 0.15 },
            { scale: 1.02, x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          // Plateau
          .to('.cnt-intl-col', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.cnt-checklist-col', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.cnt-checklist-col', { x: -65, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.cnt-intl-col', { scale: 0.8, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 4. EMERGENCY BAND — Opposing split + Footer handoff recession ──
        const emgTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.cnt-emergency-band',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        emgTl
          .fromTo('.cnt-emergency-flex > div:first-child', { x: -90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.cnt-emergency-flex .btn-clinical', { x: 90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.cnt-emergency-flex', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.cnt-emergency-flex', { scale: 0.9, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={pageRef} className="contact-root">
      {/* ── 1. CONSULTATION HERO SPLIT ── */}
      <section className="cnt-hero-stage" aria-label="Medanta OPD Contact">
        <div className="cnt-hero-wedge" aria-hidden="true" />

        <div className="container cnt-z1">
          <div className="cnt-hero-grid">
            <div className="cnt-hero-copy">
              <div className="cnt-hero-copy-inner">
                <div className="section-kicker">
                  {CONTACT_INFO.hospital} · Gurugram
                </div>
                <SplitHeading
                  as="h1"
                  className="cnt-main-title"
                  text="OPD Consultations & Hospital Access"
                />
                <p className="cnt-main-lead">
                  Schedule outpatient appointments or angiogram second opinions with Dr. Praveen Chandra.
                </p>

                <div className="cnt-hero-actions">
                  <AppointmentButton variant="primary" size="lg" label="Book Appointment" />
                  <a href={`tel:${CONTACT_INFO.phones[0]}`} className="btn-clinical btn-clinical--secondary tabular-nums">
                    Call {CONTACT_INFO.phones[0]}
                  </a>
                </div>

                <dl className="cnt-quick-facts">
                  <div>
                    <dt>Direct OPD Lines</dt>
                    <dd className="tabular-nums">
                      <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a> ·{' '}
                      <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Clinical Email</dt>
                    <dd>
                      <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>24/7 Cardiac Emergency</dt>
                    <dd className="tabular-nums">
                      Medanta Helpline {CONTACT_INFO.emergencyLine} · Board {CONTACT_INFO.hospitalBoard}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="cnt-hero-visual">
              <div className="cnt-hero-visual-scrub">
                <div className="cnt-stage-float">
                  <div className="cnt-photo-frame">
                    <div className="cnt-photo-mask media-reveal-mask">
                      <img
                        src={DOCTOR.images.consultation}
                        alt="Dr. Praveen Chandra reviewing diagnostic records during patient consultation"
                        loading="eager"
                      />
                    </div>
                  </div>
                  <div className="cnt-photo-caption">
                    Outpatient Cardiology Wing · Sector 38, Gurugram
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CAMPUS MAP & AUTO-CYCLING TRANSIT STAGE ── */}
      <section className="section cnt-hub-stage" aria-label="Campus Location and Transit">
        <div className="container cnt-z1">
          <div className="cnt-hub-grid">
            <div className="cnt-hub-left">
              <div className="section-kicker">Campus Location &amp; Directions</div>
              <SplitHeading as="h2" className="section-heading" text="Medanta – The Medicity, Gurugram" />

              <div className="cnt-address-block">
                <span className="cnt-label-mono">Department Address</span>
                <p>
                  <strong>{CONTACT_INFO.division}</strong>
                  <br />
                  {CONTACT_INFO.address}
                </p>
              </div>

              <div className="cnt-transit-stage">
                <span className="cnt-label-mono">Transit &amp; Arrival Guide</span>
                <div className="transit-tab-bar" role="tablist" aria-label="Arrival routes">
                  {TRANSIT_ROUTES.map((route, idx) => {
                    const isActive = transitCycle.activeIndex === idx;
                    return (
                      <button
                        key={route.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`transit-tab-btn ${isActive ? 'is-active' : ''}`}
                        onClick={() => transitCycle.selectIndex(idx)}
                      >
                        <span>{route.mode}</span>
                        {isActive && (
                          <div className="cycle-progress-track" style={{ marginTop: '0.35rem' }}>
                            <div
                              key={`tr-prog-${transitCycle.cycleKey}`}
                              className="cycle-progress-bar"
                              style={{ animationDuration: '5s' }}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoute.id}
                    className="transit-detail-box"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="transit-dist-mono tabular-nums">{activeRoute.distance}</span>
                    <h3>{activeRoute.name}</h3>
                    <p>{activeRoute.detail}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="cnt-hub-right">
              <div className="cnt-map-frame">
                <iframe
                  title="Medanta – The Medicity, Sector 38, Gurugram Location Map"
                  src="https://maps.google.com/maps?q=Medanta%20The%20Medicity%20Sector%2038%20Gurugram&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PRE-VISIT CHECKLIST & GLOBAL CARE DESK ── */}
      <section className="section cnt-prep-stage" aria-label="Consultation Checklist">
        <div className="container cnt-z1">
          <div className="cnt-prep-grid">
            <div className="cnt-checklist-col">
              <div className="section-kicker">Patient Preparation</div>
              <SplitHeading as="h2" className="section-heading" text="Diagnostic Records Checklist" />
              <p className="section-lead" style={{ marginBottom: '1.25rem' }}>
                Reports to carry for your outpatient evaluation ({completedCount} / {PRE_VISIT_DOCS.length} ready).
              </p>

              <div className="cnt-checklist-rows">
                {PRE_VISIT_DOCS.map((doc) => {
                  const checked = !!checkedDocs[doc.id];
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      className={`cnt-check-row ${checked ? 'is-checked' : ''}`}
                      onClick={() => toggleDoc(doc.id)}
                      aria-pressed={checked}
                    >
                      <span className="cnt-checkbox-square" aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                      <span>{doc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="cnt-intl-col">
              <div className="cnt-intl-visual">
                <div className="cnt-intl-mask media-reveal-mask">
                  <img
                    src="/images/medical/medanta-hospital-gurugram.webp"
                    alt="Medanta – The Medicity Hospital Campus, Gurugram"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="cnt-intl-body">
                <h3>Outstation &amp; International Patient Coordination</h3>
                <p>
                  Assistance with prior angiogram film review, visa letters, airport transfers from IGI Airport, and remote follow-up via Medanta eClinic.
                </p>
                <div className="cnt-intl-actions">
                  <AppointmentButton variant="primary" size="md" label="Schedule Evaluation" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="btn-clinical btn-clinical--secondary">
                    Email OPD Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 24/7 EMERGENCY BAND ── */}
      <section className="cnt-emergency-band" aria-label="24/7 Emergency Heart Line">
        <div className="container">
          <div className="cnt-emergency-flex">
            <div>
              <span className="cnt-emg-kicker">Acute Chest Pain or Suspected Heart Attack</span>
              <h2 className="tabular-nums">24/7 Medanta Emergency Helpline: Dial {CONTACT_INFO.emergencyLine}</h2>
              <p>Immediate catheter lab triage for Acute Myocardial Infarction &amp; Emergency Angioplasty.</p>
            </div>
            <a href={`tel:${CONTACT_INFO.emergencyLine}`} className="btn-clinical btn-clinical--light tabular-nums">
              Call Emergency {CONTACT_INFO.emergencyLine}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
