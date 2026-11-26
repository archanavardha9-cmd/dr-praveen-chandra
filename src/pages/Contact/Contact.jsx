// Contact.jsx – Imposing Hero, Compact Sections & Reversible Bidirectional Animations
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import AppointmentButton from '../../components/common/AppointmentButton';
import { CONTACT_INFO, DOCTOR } from '../../data/doctorData';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO BIDIRECTIONAL ENTRANCE ──
      gsap.fromTo('.contact-hero-text-col > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: {
            trigger: '.contact-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      gsap.fromTo('.contact-hero-beacon-box',
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.25,
          scrollTrigger: {
            trigger: '.contact-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 1. CLINIC CARD BIDIRECTIONAL REVEAL ──
      gsap.fromTo('.medanta-clinic-card',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-hub-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      gsap.fromTo('.contact-map-col > *',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-hub-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 2. OPD LOGISTICS REVERSIBLE STAGGER ──
      gsap.fromTo('.opd-box',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.opd-quad-grid',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ── REDESIGNED IMPOSING HERO (~88vh) ── */}
      <section className="contact-hero-revamp" aria-label="Contact Hero">
        <div className="contact-hero-bg" />
        <SectionBackground variant="contact-radar" opacity={0.7} />

        <div className="container contact-hero-container">
          <div className="contact-hero-grid">
            <div className="contact-hero-text-col">
              <div className="contact-badge-strip">
                <span className="contact-hero-tag">🏥 Medanta – The Medicity</span>
                <span className="contact-hero-tag" style={{ background: 'rgba(26,74,124,0.3)', borderColor: 'rgba(201,168,76,0.25)' }}>
                  Division of Interventional Cardiology
                </span>
              </div>

              <h1 className="contact-hero-title">
                Clinical Consultations & <span>Hospital Locations</span>
              </h1>

              <p className="contact-hero-subtitle">
                Sector 38 Gurugram, Delhi NCR · 24/7 Acute Cardiac Trauma Helpline (1068) · Global Concierge Desk
              </p>

              <p className="contact-hero-desc">
                Schedule an in-person diagnostic evaluation or second opinion with Dr. Praveen Chandra
                at Medanta – The Medicity. Conveniently accessible via NH-48 Expressway and IGI Airport.
              </p>

              <div className="contact-hero-actions">
                <AppointmentButton variant="primary" size="lg" showPulse label="Book Official Appointment" />
                <a href="#clinic" className="btn btn-secondary">
                  Hospital Coordinates ↓
                </a>
              </div>

              <div className="contact-hero-ticker">
                <div>
                  <span className="contact-ticker-val">Sector 38</span>
                  <span className="contact-ticker-lbl">Gurugram, NCR</span>
                </div>
                <div>
                  <span className="contact-ticker-val">25 Mins</span>
                  <span className="contact-ticker-lbl">From DEL Airport</span>
                </div>
                <div>
                  <span className="contact-ticker-val">24/7</span>
                  <span className="contact-ticker-lbl">Emergency 1068</span>
                </div>
              </div>
            </div>

            {/* Right Hospital Beacon Card */}
            <div className="contact-hero-visual">
              <div className="contact-hero-beacon-box">
                <div className="contact-hero-thumb">
                  <img
                    src={DOCTOR.images.consultation}
                    alt="Medanta Cardiology OPD"
                    loading="eager"
                  />
                  <div className="contact-live-beacon">
                    <span className="beacon-pulse-dot" />
                    OPD Active · By Appointment
                  </div>
                </div>

                <div className="contact-hero-box-meta">
                  <h4>Medanta Cardiac Center</h4>
                  <p>CH Baktawar Singh Rd, Sector 38, Gurugram, Haryana 122001</p>
                  <div className="contact-fast-dials">
                    <a href="tel:+919958872855" className="fast-dial-pill">
                      📞 +91-99588-72855
                    </a>
                    <a href="tel:1068" className="fast-dial-pill" style={{ color: '#e74c3c', borderColor: 'rgba(231,76,60,0.4)' }}>
                      🚑 1068 Emergency
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. COMPACT MAIN CONTACT HUB ── */}
      <section className="section contact-hub-section" id="clinic" aria-label="Official Medanta Coordinates">
        <SectionBackground variant="cellular-particles" opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-hub-layout">
            <div className="contact-action-col">
              <div className="medanta-clinic-card">
                <img
                  src={DOCTOR.images.cathLab}
                  alt="Medanta Hospital Cath Lab Suites"
                  className="clinic-banner-img"
                  loading="lazy"
                />

                <div className="clinic-card-body">
                  <h3>Medanta – The Medicity</h3>
                  <span className="clinic-dept-sub">Division of Interventional & Structural Cardiology</span>

                  <div className="clinic-info-list">
                    <div className="clinic-info-item">
                      <div className="clinic-icon-circle">🏥</div>
                      <div>
                        <strong>Hospital Address</strong>
                        <p>{CONTACT_INFO.address}</p>
                      </div>
                    </div>

                    <div className="clinic-info-item">
                      <div className="clinic-icon-circle">📞</div>
                      <div>
                        <strong>Direct Coordinator Lines</strong>
                        <p>
                          <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a> &nbsp;|&nbsp;{' '}
                          <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a>
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Medanta Hospital Board: <a href="tel:+911244141414">+91-124-4141414</a>
                        </p>
                      </div>
                    </div>

                    <div className="clinic-info-item">
                      <div className="clinic-icon-circle">✉️</div>
                      <div>
                        <strong>Clinical Email</strong>
                        <p>
                          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <AppointmentButton
                    variant="primary"
                    size="lg"
                    showPulse
                    label="Book Verified Medanta Appointment"
                  />
                </div>
              </div>

              <div className="emergency-alert-strip">
                <div className="emergency-info-side">
                  <h4>24/7 Acute Cardiac Emergency</h4>
                  <p>
                    Suspecting acute coronary syndrome, chest tightness, or heart attack symptoms? Connect directly to Medanta’s emergency trauma desk.
                  </p>
                </div>
                <a href="tel:1068" className="emergency-call-btn">
                  <span>🚑</span> Dial 1068
                </a>
              </div>
            </div>

            {/* Right Map & Transit Column */}
            <div className="contact-map-col">
              <div className="map-container-box">
                <iframe
                  title="Medanta The Medicity Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8099617827!2d77.07399041506!3d28.447889982491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f4c17eb3d7%3A0xac9fbc2a1413c89b!2sMedanta%20-%20The%20Medicity!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              <div className="transit-card">
                <h4>Reaching Medanta Gurugram</h4>
                <div className="transit-list">
                  <div className="transit-item">
                    <span className="transit-icon">✈️</span>
                    <div className="transit-text">
                      <h5>From IGI Airport New Delhi (DEL)</h5>
                      <p>Approx. 18 km / 25–35 minutes drive via NH-48.</p>
                    </div>
                  </div>

                  <div className="transit-item">
                    <span className="transit-icon">🚇</span>
                    <div className="transit-text">
                      <h5>Nearest Metro Station</h5>
                      <p>Millennium City Centre (Yellow Line) — 10 mins by taxi.</p>
                    </div>
                  </div>

                  <div className="transit-item">
                    <span className="transit-icon">🚗</span>
                    <div className="transit-text">
                      <h5>Expressway Access</h5>
                      <p>Direct entry via Sector 38 service road off Delhi-Jaipur Highway.</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark"
                    style={{ padding: '8px 18px', fontSize: '0.78rem' }}
                  >
                    Open Live Navigation in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT OPD LOGISTICS SECTION ── */}
      <section className="section contact-opd-section" aria-label="OPD Protocols">
        <SectionBackground variant="laser-energy" opacity={0.5} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Consultation Advisory</div>
            <h2 className="section-title light">OPD Timings & Appointment Advisory</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Guidelines to facilitate seamless clinic evaluation for local, outstation, and overseas patients.
            </p>
          </div>

          <div className="opd-quad-grid">
            <div className="opd-box">
              <h4>Regular OPD Hours</h4>
              <span>Monday to Saturday</span>
              <p>
                In-person clinical evaluations run by appointment at Medanta Medicity Cardiology OPD suites. Prior booking is mandatory to ensure verified scheduling.
              </p>
            </div>

            <div className="opd-box">
              <h4>Prior Records Checklist</h4>
              <span>What to Bring</span>
              <p>
                Please carry recent 12-lead ECGs, 2D Echocardiogram reports, diagnostic Coronary Angiogram CD/DVDs, and discharge summaries from previous admissions.
              </p>
            </div>

            <div className="opd-box">
              <h4>International Patients</h4>
              <span>Global Concierge Desk</span>
              <p>
                Overseas patients seeking TAVI or MitraClip evaluations receive expedited medical visa assistance, airport transfers, and interpreter support via Medanta International Desk.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <AppointmentButton variant="primary" size="lg" showPulse label="Proceed to Medanta Portal" />
          </div>
        </div>
      </section>
    </div>
  );
}
