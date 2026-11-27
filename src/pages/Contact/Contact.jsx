// Contact.jsx – Dynamic Medanta hospital access, auto-cycling transit routes & pre-visit records checklist
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import AppointmentButton from '../../components/common/AppointmentButton';
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
    detail: 'Direct cab via NH-48 (~30 min). Dedicated International Desk concierge assists with airport pickup, transfers, and medical visa facilitation.',
  },
  {
    id: 'metro',
    mode: 'Delhi Metro',
    name: 'Millennium City Centre (Yellow Line)',
    distance: '~5.2 km · 12 min auto/cab',
    detail: 'Yellow Line terminal connects Central Delhi & New Delhi Railway Station directly to Subhash Chowk and the Medanta Road approach.',
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
        // 1. Hero Entrance & Continuous 3D Scrub
        gsap.fromTo(
          '.cnt-hero-left',
          { opacity: 0, x: -48 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.cnt-hero-right',
          { opacity: 0, x: 48, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        );

        // Continuous Hero Photo Elevation on Scroll
        gsap.to('.cnt-photo-frame', {
          yPercent: 12,
          scale: 1.05,
          rotationY: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cnt-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to('.cnt-orbital-1', {
          yPercent: -42,
          xPercent: 12,
          rotation: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cnt-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
        gsap.to('.cnt-orbital-2', {
          yPercent: 32,
          xPercent: -10,
          rotation: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cnt-hero-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        // 2. Hospital Hub & Maps with Continuous Parallax
        gsap.fromTo(
          '.cnt-hub-left',
          { opacity: 0, x: -45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cnt-hub-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.cnt-hub-right',
          { opacity: 0, x: 45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cnt-hub-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
        gsap.fromTo(
          '.cnt-map-frame',
          { scale: 0.95, y: 30 },
          {
            scale: 1.02,
            y: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.cnt-hub-stage',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );

        // 3. Pre-Visit Preparation
        gsap.fromTo(
          '.cnt-prep-reveal',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.cnt-prep-stage',
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
    <div ref={pageRef} className="contact-root">
      {/* ── 1. CONSULTATION HERO SPLIT ── */}
      <section className="cnt-hero-stage" aria-label="Medanta OPD Contact">
        <div className="cnt-hero-wedge" aria-hidden="true" />
        <SectionBackground variant="contact-radar" opacity={0.65} />

        <div className="container cnt-z1">
          <div className="cnt-hero-grid">
            <div className="cnt-hero-copy cnt-hero-left">
              <div className="section-kicker">
                {CONTACT_INFO.hospital} · Gurugram
              </div>
              <h1 className="cnt-main-title">
                OPD Consultations &amp; Hospital Access
              </h1>
              <p className="cnt-main-lead">
                Book outpatient appointments or second opinions for structural heart valve and complex coronary care with Dr. Praveen Chandra.
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

            {/* Right Large Uncropped Consultation Photo with 3D Depth */}
            <div className="cnt-hero-visual cnt-hero-right perspective-stage" style={{ position: 'relative' }}>
              <div className="floating-orbital-badge floating-orbital-badge--gold cnt-orbital-1" style={{ top: '-14px', right: '-12px' }}>
                <span>🟢</span>
                <span>OPD Clinic Active · Sector 38</span>
              </div>
              <div className="floating-orbital-badge floating-orbital-badge--teal cnt-orbital-2" style={{ bottom: '26px', left: '-12px' }}>
                <span>🚑</span>
                <span>24/7 Acute Heart Trauma 1068</span>
              </div>

              <div className="cnt-photo-frame">
                <img
                  src={DOCTOR.images.consultation}
                  alt="Dr. Praveen Chandra reviewing diagnostic records during patient consultation"
                  loading="eager"
                />
              </div>
              <div className="cnt-photo-caption">
                Outpatient Cardiology Wing · Sector 38, Gurugram
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE CAMPUS MAP & AUTO-CYCLING TRANSIT STAGE ── */}
      <section className="section cnt-hub-stage" aria-label="Campus Location and Transit">
        <div className="container cnt-z1">
          <div className="cnt-hub-grid">
            {/* Left Address + Auto-Cycling Transit Switcher */}
            <div className="cnt-hub-left">
              <div className="section-kicker">Campus Location &amp; Directions</div>
              <h2 className="section-heading">Medanta – The Medicity, Gurugram</h2>

              <div className="cnt-address-block">
                <span className="cnt-label-mono">Department Address</span>
                <p>
                  <strong>{CONTACT_INFO.division}</strong>
                  <br />
                  {CONTACT_INFO.address}
                </p>
              </div>

              {/* Interactive Auto-Cycling Transit Stage */}
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="transit-dist-mono tabular-nums">{activeRoute.distance}</span>
                    <h3>{activeRoute.name}</h3>
                    <p>{activeRoute.detail}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Interactive Map Embed */}
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
          <div className="cnt-prep-grid cnt-prep-reveal">
            {/* Left Interactive Pre-Visit Records Checklist */}
            <div className="cnt-checklist-col">
              <div className="section-kicker">Patient Preparation</div>
              <h2 className="section-heading">Diagnostic Records Checklist</h2>
              <p className="section-lead" style={{ marginBottom: '1.25rem' }}>
                Verify the cardiac reports to carry for your outpatient evaluation ({completedCount} / {PRE_VISIT_DOCS.length} ready).
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

            {/* Right Verified Medanta Exterior Photo + International Desk Info */}
            <div className="cnt-intl-col">
              <div className="cnt-intl-visual">
                <img
                  src="/images/medical/medanta-hospital-gurugram.webp"
                  alt="Medanta – The Medicity Hospital Campus, Gurugram"
                  loading="lazy"
                />
              </div>
              <div className="cnt-intl-body">
                <h3>Outstation &amp; International Patient Coordination</h3>
                <p>
                  Dedicated assistance with prior angiogram film review, visa invitation letters, airport transfers from IGI Airport, and post-procedure follow-up via Medanta eClinic.
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
