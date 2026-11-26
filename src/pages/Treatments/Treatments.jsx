// Treatments.jsx – Imposing Hero, Compact Sections & Reversible Bidirectional Animations
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { TREATMENTS } from '../../data/doctorData';
import './Treatments.css';

gsap.registerPlugin(ScrollTrigger);

const FILTER_TABS = ['All Procedures', 'Structural Heart', 'Coronary', 'Emergency', 'Vascular'];

const COMPARISON_ROWS = [
  { param: 'Incision & Access', surgery: 'Full sternotomy chest incision (8–10 in)', catheter: 'Micro-puncture in groin (2 mm puncture)' },
  { param: 'Heart-Lung Bypass', surgery: 'Mandatory cardiopulmonary bypass', catheter: 'No bypass; performed on beating heart' },
  { param: 'Anesthesia Protocol', surgery: 'Deep general anesthesia on ventilator', catheter: 'Local anesthesia with twilight sedation' },
  { param: 'Hospital Stay', surgery: '7 to 14 days with intensive ICU', catheter: 'Typically 48 to 72 hours total' },
  { param: 'Recovery to Daily Life', surgery: '2 to 3 months restricted mobility', catheter: 'Walking next day; normal activity in 7 days' },
  { param: 'High-Risk Elderly Safety', surgery: 'Often prohibitive due to frailty', catheter: 'Safe & clinically proven for elderly (80+ yrs)' },
];

export default function Treatments() {
  const [activeFilter, setActiveFilter] = useState('All Procedures');
  const pageRef = useRef(null);
  const location = useLocation();

  const filteredTreatments = activeFilter === 'All Procedures'
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === activeFilter);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO BIDIRECTIONAL ENTRANCE ──
      gsap.fromTo('.treatments-hero-text-col > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: {
            trigger: '.treatments-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      gsap.fromTo('.treatments-anatomical-card',
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.25,
          scrollTrigger: {
            trigger: '.treatments-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 1. PROCEDURES CATALOG REVERSIBLE STAGGER ──
      gsap.fromTo('.treatment-rich-card',
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.treatments-rich-grid',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 2. COMPARISON TABLE BIDIRECTIONAL REVEAL ──
      gsap.fromTo('.comp-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.comparison-table-wrapper',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={pageRef}>
      {/* ── REDESIGNED IMPOSING HERO (~88vh) ── */}
      <section className="treatments-hero-revamp" aria-label="Treatments Hero">
        <div className="treatments-hero-bg" />
        <SectionBackground variant="treatments-cathlab" opacity={0.7} />

        <div className="treatments-hero-container">
          <div className="treatments-hero-grid">
            <div className="treatments-hero-text-col">
              <div className="treatments-badge-strip">
                <span className="treatments-hero-tag">🫀 Landmark Interventions</span>
                <span className="treatments-hero-tag" style={{ background: 'rgba(26,74,124,0.3)', borderColor: 'rgba(201,168,76,0.25)' }}>
                  Non-Surgical Valve Therapies
                </span>
              </div>

              <h1 className="treatments-hero-title">
                Pioneering <span>Transcatheter Valve & Coronary Therapies</span>
              </h1>

              <p className="treatments-hero-subtitle">
                Over 50,000 Procedures · 1st TAVI in India · 1st MitraClip in India · 99.4% Success Benchmark
              </p>

              <p className="treatments-hero-desc">
                Specialized in minimally invasive catheter techniques replacing high-risk open-heart surgery.
                From percutaneous aortic valve implants to complex left-main bifurcations, delivering precision outcomes.
              </p>

              <div className="treatments-hero-actions">
                <AppointmentButton variant="primary" size="lg" showPulse label="Consult on Treatment" />
                <a href="#procedures" className="btn btn-secondary">
                  Browse Procedures ↓
                </a>
              </div>

              <div className="treatments-hero-ticker">
                <div className="treatments-ticker-box">
                  <span className="treatments-ticker-val">48 Hrs</span>
                  <span className="treatments-ticker-lbl">Typical Recovery</span>
                </div>
                <div className="treatments-ticker-box">
                  <span className="treatments-ticker-val">0 Incisions</span>
                  <span className="treatments-ticker-lbl">No Sternotomy</span>
                </div>
                <div className="treatments-ticker-box">
                  <span className="treatments-ticker-val">99.4%</span>
                  <span className="treatments-ticker-lbl">Clinical Safety</span>
                </div>
              </div>
            </div>

            {/* Right Anatomical Interactive Preview */}
            <div className="treatments-hero-visual">
              <div className="treatments-anatomical-card">
                <div className="anatomical-svg-container">
                  <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%' }}>
                    <circle cx="200" cy="120" r="85" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
                    <circle cx="200" cy="120" r="55" fill="rgba(201,168,76,0.12)" stroke="#c9a84c" strokeWidth="2" />
                    <path d="M 170,120 Q 200,90 230,120 Q 200,105 170,120 Z" fill="rgba(201,168,76,0.5)" stroke="#c9a84c" strokeWidth="1.5" />
                    <path d="M 170,120 Q 200,150 230,120 Q 200,135 170,120 Z" fill="rgba(201,168,76,0.5)" stroke="#c9a84c" strokeWidth="1.5" />
                    <circle cx="200" cy="120" r="4" fill="#fff" />
                  </svg>
                </div>

                <div className="anatomical-pills-wrap">
                  <a href="#tavi" className="anatomical-pill-item">
                    <span>🫀 TAVI / TAVR</span>
                    <span>1st in India →</span>
                  </a>
                  <a href="#mitraclip" className="anatomical-pill-item">
                    <span>🔬 MitraClip (TEER)</span>
                    <span>1st in India →</span>
                  </a>
                  <a href="#angioplasty" className="anatomical-pill-item">
                    <span>❤️ Complex PCI / CTO</span>
                    <span>High-Risk →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. COMPACT PROCEDURES CATALOG ── */}
      <section className="section treatments-catalog-section" id="procedures" aria-label="Procedures Catalog">
        <SectionBackground variant="valve-motion" opacity={0.45} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="treatment-filter-bar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                className={`treatment-filter-btn ${activeFilter === tab ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="treatments-rich-grid">
            {filteredTreatments.map((t) => (
              <article className="treatment-rich-card" id={t.id} key={t.id}>
                <div className="treatment-rich-media">
                  <img src={t.image} alt={t.name} loading="lazy" />
                  <span className="treatment-badge-tag">{t.category}</span>
                  {t.pioneer && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: 'var(--gradient-gold)',
                      color: 'var(--color-primary)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                    }}>
                      🏆 First in India
                    </div>
                  )}
                </div>

                <div className="treatment-rich-body">
                  <h2 className="treatment-rich-title">{t.name}</h2>
                  <div className="treatment-rich-fullname">{t.fullName}</div>
                  <p className="treatment-rich-desc">{t.description}</p>

                  <ul className="treatment-highlights-list">
                    {t.details.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <div className="treatment-card-actions">
                    <AppointmentButton variant="primary" size="sm" label={`Consult for ${t.name}`} />
                    <Link to="/contact" className="treatment-link">
                      Hospital OPD Info →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT CLINICAL COMPARISON ── */}
      <section className="section treatments-comparison-section" aria-label="Surgical vs Catheter Comparison">
        <SectionBackground variant="ecg-monitor" opacity={0.5} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Surgical Innovation</div>
            <h2 className="section-title light">Why Choose Transcatheter Intervention?</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Comparing traditional open-heart surgery with modern catheter-based techniques pioneered by Dr. Praveen Chandra.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <div className="comp-row comp-head">
              <div>Clinical Parameter</div>
              <div>Traditional Open-Heart Surgery</div>
              <div className="comp-col-catheter">Dr. Chandra's Catheter Approach (TAVI / MitraClip)</div>
            </div>

            {COMPARISON_ROWS.map((row, i) => (
              <div className="comp-row" key={i}>
                <div className="comp-col-param">{row.param}</div>
                <div className="comp-col-surgery">{row.surgery}</div>
                <div className="comp-col-catheter">✓ {row.catheter}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPACT SECOND OPINION CALLOUT ── */}
      <section className="section" style={{ background: 'var(--color-white)', textAlign: 'center', padding: 'clamp(50px, 7vh, 85px) 0' }}>
        <SectionBackground variant="telemetry-grid" opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title">Seek an Expert Second Opinion</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
            Have you or a loved one been advised open-heart surgery? Evaluate whether you qualify for minimally invasive catheter treatment.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <AppointmentButton variant="primary" size="lg" showPulse label="Book Appointment at Medanta" />
            <Link to="/contact" className="btn btn-dark">
              Clinic Location & Emergency Lines →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
