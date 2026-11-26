// About.jsx – Imposing Hero, Balanced Viewport-Compact Sections & Reversible Bidirectional Animations
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { DOCTOR, QUALIFICATIONS, FELLOWSHIPS, CAREER_TIMELINE, ACHIEVEMENTS } from '../../data/doctorData';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO BIDIRECTIONAL ENTRANCE ──
      gsap.fromTo('.about-hero-text-col > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: {
            trigger: '.about-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      gsap.fromTo('.about-hero-card-stack',
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.25,
          scrollTrigger: {
            trigger: '.about-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 1. EXECUTIVE BIO BIDIRECTIONAL REVEAL ──
      gsap.fromTo('.exec-portrait-frame',
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-exec-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
      gsap.fromTo('.exec-text-block > *',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-exec-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 2. CAREER TIMELINE REVERSIBLE STAGGER ──
      gsap.fromTo('.career-card-row',
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.career-cards-stack',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 3. HERITAGE DEGREE CARDS BIDIRECTIONAL ──
      gsap.fromTo('.heritage-degree-card',
        { opacity: 0, y: 35, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.heritage-grid',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 4. FELLOWSHIPS MATRIX REVERSIBLE ──
      gsap.fromTo('.fellowship-badge-tile',
        { opacity: 0, y: 30, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fellowships-flex-matrix',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 5. PADMA SHRI BANNER REVERSIBLE ──
      gsap.fromTo('.padma-photo-side',
        { opacity: 0, scale: 0.92, x: -40 },
        {
          opacity: 1, scale: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-padma-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
      gsap.fromTo('.padma-text-side > *',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-padma-section',
            start: 'top 80%',
            end: 'bottom 20%',
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
      <section className="about-hero-revamp" aria-label="About Dr. Praveen Chandra Hero">
        <div className="about-hero-bg-overlay" />
        <SectionBackground variant="about-monument" opacity={0.7} />

        <div className="about-hero-container">
          <div className="about-hero-grid-2col">
            <div className="about-hero-text-col">
              <div className="about-hero-badge-strip">
                <span className="about-hero-award-tag">🏅 Padma Shri 2016</span>
                <span className="about-hero-award-tag" style={{ background: 'rgba(26,74,124,0.3)', borderColor: 'rgba(201,168,76,0.2)' }}>
                  Chairman, Interventional Cardiology
                </span>
              </div>

              <h1 className="about-hero-title">
                Architect of <span>Modern Transcatheter Cardiology</span> in India
              </h1>

              <p className="about-hero-subtitle">
                Over 30 Years of Clinical Mastery · Pioneer of TAVI, MitraClip & Laser Revascularization
              </p>

              <p className="about-hero-desc">
                From performing India’s historic first transcatheter valve replacement to establishing
                international treatment protocols at Medanta – The Medicity, Dr. Praveen Chandra has
                redefined cardiac care for patients worldwide.
              </p>

              <div className="about-hero-actions">
                <AppointmentButton variant="primary" size="lg" showPulse label="Schedule Consultation" />
                <a href="#biography" className="btn btn-secondary">
                  Explore Journey ↓
                </a>
              </div>

              <div className="about-hero-ticker">
                <div className="ticker-item">
                  <span className="ticker-num">50,000+</span>
                  <span className="ticker-lbl">Interventions</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-num">100+</span>
                  <span className="ticker-lbl">Publications</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-num">5</span>
                  <span className="ticker-lbl">Int'l Fellowships</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-num">1st</span>
                  <span className="ticker-lbl">TAVI in India</span>
                </div>
              </div>
            </div>

            {/* Right Visual Stack with Badges */}
            <div className="about-hero-visual">
              <div className="about-hero-card-stack">
                <div className="about-hero-portrait-box">
                  <img
                    src={DOCTOR.images.hero}
                    alt="Dr. Praveen Chandra - Padma Shri"
                    loading="eager"
                  />
                </div>

                <div className="about-hero-floating-pill ahfp-1">
                  <span style={{ fontSize: '1.3rem' }}>🫀</span>
                  <div>
                    <strong style={{ fontSize: '0.78rem', color: 'var(--color-accent)', display: 'block' }}>First TAVI in India</strong>
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)' }}>Non-Surgical Valve</span>
                  </div>
                </div>

                <div className="about-hero-floating-pill ahfp-2">
                  <span style={{ fontSize: '1.3rem' }}>🔬</span>
                  <div>
                    <strong style={{ fontSize: '0.78rem', color: '#fff', display: 'block' }}>First MitraClip</strong>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-accent)' }}>Percutaneous Repair</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. COMPACT EXECUTIVE SUMMARY SECTION ── */}
      <section className="section about-exec-section" id="biography" aria-label="Executive Biography">
        <SectionBackground variant="cellular-particles" opacity={0.45} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-exec-grid">
            <div className="exec-portrait-frame">
              <img
                src={DOCTOR.images.speaking}
                alt="Dr. Praveen Chandra Speaking"
                loading="lazy"
              />
              <div className="exec-portrait-badge">
                <h4>Dr. Praveen Chandra</h4>
                <span>MBBS, MD, DM · Padma Shri Awardee</span>
              </div>
            </div>

            <div className="exec-text-block">
              <div className="section-label">Executive Biography</div>
              <h2>Pioneering Leadership with Compassion</h2>
              <p>
                Recognized by the President of India with the **Padma Shri** in 2016, Dr. Praveen Chandra
                bridges the divide between invasive surgical trauma and high-precision catheter therapies.
                He serves as Chairman of Interventional Cardiology at Medanta – The Medicity, leading high-volume
                catheter laboratories handling complex structural and coronary cases.
              </p>
              <p>
                Dr. Chandra has authored over 100 indexed publications in premier medical journals and
                regularly trains interventional cardiology fellows globally in advanced structural interventions.
              </p>

              <div className="exec-pills-row">
                <span className="exec-pill">🫀 1st TAVI Operator in India</span>
                <span className="exec-pill">🔬 1st MitraClip Specialist</span>
                <span className="exec-pill">⚡ Asia 1st Laser Revascularization</span>
                <span className="exec-pill">📚 100+ Peer-Reviewed Papers</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <AppointmentButton variant="primary" size="md" showPulse label="Schedule Consultation" />
                <Link to="/treatments" className="btn btn-dark">
                  Explore Treatments →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT VISUAL CAREER TIMELINE ── */}
      <section className="section about-career-section" aria-label="Career Milestones">
        <SectionBackground variant="laser-energy" opacity={0.65} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Leadership Milestones</div>
            <h2 className="section-title light">Three Decades of Clinical Excellence</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Pioneering cardiac programs and establishing benchmark catheterization registries across India.
            </p>
          </div>

          <div className="career-cards-stack">
            {CAREER_TIMELINE.map((item, i) => (
              <div className="career-card-row" key={i}>
                <div className="career-period-col">
                  <span className="career-period-badge">{item.period}</span>
                  <div className="career-inst-title">{item.institution}</div>
                </div>

                <div className="career-detail-col">
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="career-thumb-col">
                  <img src={item.photo} alt={item.role} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPACT EDUCATION & HERITAGE ── */}
      <section className="section about-heritage-section" aria-label="Education & Qualifications">
        <SectionBackground variant="ecg-monitor" opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Academic Foundation</div>
            <h2 className="section-title">King George’s Medical College Heritage</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Foundational and super-specialty training from one of India's most venerated medical institutions.
            </p>
          </div>

          <div className="heritage-grid">
            {QUALIFICATIONS.map((q, i) => (
              <div className="heritage-degree-card" key={i}>
                <div className="degree-seal-icon">🎓</div>
                <div className="degree-name">{q.degree}</div>
                <div className="degree-inst">{q.institution}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. COMPACT FELLOWSHIPS MATRIX ── */}
      <section className="section about-fellowships-section" aria-label="International Fellowships">
        <SectionBackground variant="awards-constellation" opacity={0.7} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Global Recognition</div>
            <h2 className="section-title light">Elected International Fellowships</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Recognized by premier cardiovascular colleges across North America, Europe, and Asia.
            </p>
          </div>

          <div className="fellowships-flex-matrix">
            {FELLOWSHIPS.map((f) => (
              <div className="fellowship-badge-tile" key={f.short}>
                <span className="fbadge-acronym">{f.short}</span>
                <span className="fbadge-region">{f.region}</span>
                <p className="fbadge-full-name">{f.full}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMPACT PADMA SHRI BANNER ── */}
      <section className="section about-padma-section" aria-label="Padma Shri Award">
        <SectionBackground variant="valve-motion" opacity={0.35} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="padma-highlight-box">
            <div className="padma-photo-side">
              <img
                src={DOCTOR.images.awardPodium}
                alt="Padma Shri Award Felicitation"
                loading="lazy"
              />
            </div>

            <div className="padma-text-side">
              <div className="section-label" style={{ color: '#fff' }}>National Honor</div>
              <h2>Conferred the Padma Shri (2016)</h2>
              <p>
                Conferred by the President of India in recognition of distinguished service to medicine,
                advancing life-saving transcatheter alternatives for patients across the nation.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <AppointmentButton variant="white" size="lg" label="Book Appointment at Medanta" />
                <Link to="/media" className="btn btn-outline-gold" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                  Watch Ceremony Video →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
