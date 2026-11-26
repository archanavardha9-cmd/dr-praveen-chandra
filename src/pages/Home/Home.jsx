// Home.jsx – Completely redesigned, highly visual, section-by-section animated experience
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppointmentButton from '../../components/common/AppointmentButton';
import HeartAnimation from '../../components/backgrounds/HeartAnimation';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import { DOCTOR, STATS, ACHIEVEMENTS, TREATMENTS, MEDIA_VIDEOS } from '../../data/doctorData';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE_AREAS = [
  { icon: '🫀', title: 'TAVI / TAVR', category: 'Structural Heart', desc: 'India’s first transcatheter aortic valve implantation. Replaces diseased aortic valves via catheter without surgical sternotomy.' },
  { icon: '🔬', title: 'MitraClip (TEER)', category: 'Structural Heart', desc: 'Pioneered in India by Dr. Chandra. Minimally invasive catheter clipping of leaking mitral valves for patients unfit for surgery.' },
  { icon: '❤️', title: 'Complex & CTO PCI', category: 'Coronary Interventions', desc: 'Recanalization of 100% Chronic Total Occlusions, left main bifurcations, and heavily calcified vessels using rotablation.' },
  { icon: '🚑', title: 'Acute MI Emergency PCI', category: 'Emergency Cardiology', desc: '24/7 rapid primary angioplasty with AngioJet mechanical thrombectomy for superior myocardial salvage during heart attacks.' },
  { icon: '🩸', title: 'Carotid & Endovascular', category: 'Vascular Interventions', desc: 'Carotid artery stenting with dual-filter brain embolic protection to prevent strokes, plus peripheral limb salvage.' },
  { icon: '📊', title: 'Physiologic FFR & IVL', category: 'Precision Technology', desc: 'Shockwave lithotripsy (IVL) and high-fidelity Fractional Flow Reserve guiding stenting only where clinically essential.' },
];

export default function Home() {
  const [activeVideo, setActiveVideo] = useState(null);
  const homeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero text reveal
      gsap.fromTo('.hero-text-col > *',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
      );

      // 2. Hero photo frame entrance
      gsap.fromTo('.hero-visual-frame',
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.3 }
      );

      // 3. About section reveal
      gsap.fromTo('.about-dual-frame',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.home-about', start: 'top 75%' }
        }
      );
      gsap.fromTo('.home-about-text-col > *',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.home-about', start: 'top 75%' }
        }
      );

      // 4. Expertise tiles stagger
      gsap.fromTo('.expertise-modern-tile',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.expertise-asymmetric-grid', start: 'top 80%' }
        }
      );

      // 5. Featured treatments
      gsap.fromTo('.treatment-visual-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.treatments-split-showcase', start: 'top 80%' }
        }
      );

      // 6. Achievements
      gsap.fromTo('.achievements-photo-banner',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.achievements-rich-layout', start: 'top 80%' }
        }
      );
      gsap.fromTo('.milestone-interactive-row',
        { opacity: 0, x: 35 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.achievements-milestone-list', start: 'top 85%' }
        }
      );

      // 7. Media spotlight cards
      gsap.fromTo('.media-interactive-thumb',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.media-cards-triad', start: 'top 85%' }
        }
      );
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={homeRef}>
      {/* ── 1. HERO SECTION ── */}
      <section className="hero" aria-label="Hero Introduction">
        <div className="hero-bg">
          <div className="hero-bg-gradient" />
          <HeartAnimation variant="hero" />
        </div>

        <div className="hero-content">
          <div className="hero-text-col">
            <div className="hero-award-badge">
              <span style={{ fontSize: '1.2rem' }}>🏅</span>
              Padma Shri Awardee 2016 · Government of India
            </div>

            <h1 className="hero-name">
              <span className="hero-name-dr">Dr.</span> Praveen Chandra
            </h1>

            <p className="hero-designation">
              Chairman, Interventional Cardiology · Medanta – The Medicity
            </p>

            <div className="hero-pioneer-tags">
              <div className="hero-tag-pill">
                <span>🫀</span> First TAVI in India
              </div>
              <div className="hero-tag-pill">
                <span>🔬</span> First MitraClip in India
              </div>
              <div className="hero-tag-pill">
                <span>⚡</span> Asia First Laser Revasc
              </div>
              <div className="hero-tag-pill">
                <span>🏆</span> 30+ Years Global Leadership
              </div>
            </div>

            <div className="hero-actions">
              <AppointmentButton variant="primary" size="lg" showPulse label="Book Appointment" />
              <Link to="/about" className="btn btn-secondary">
                View Credentials →
              </Link>
            </div>

            <div className="hero-stats-strip">
              {STATS.map((s, i) => (
                <div className="hero-stat-box" key={i}>
                  <div className="hero-stat-val">{s.value}</div>
                  <span className="hero-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual: Authentic High-Res Portrait */}
          <div className="hero-visual-frame">
            <div className="hero-photo-glow" />
            <div className="hero-photo-wrapper">
              <img
                src={DOCTOR.images.hero}
                alt="Dr. Praveen Chandra - Padma Shri Cardiologist"
                loading="eager"
              />
            </div>

            <div className="hero-badge-float hbf-top">
              <span style={{ fontSize: '1.4rem' }}>🏅</span>
              <div>
                <strong style={{ fontSize: '0.8rem', color: 'var(--color-accent)', display: 'block' }}>Padma Shri 2016</strong>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>Presidential Honor</span>
              </div>
            </div>

            <div className="hero-badge-float hbf-bottom">
              <span style={{ fontSize: '1.4rem' }}>🏥</span>
              <div>
                <strong style={{ fontSize: '0.8rem', color: '#fff', display: 'block' }}>Medanta Medicity</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)' }}>Chairman, Cardiology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT PREVIEW SECTION ── */}
      <section className="section home-about" aria-label="About Doctor Preview">
        <SectionBackground variant="telemetry-grid" opacity={0.65} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="home-about-layout">
            {/* Visual Column with Dual Real Photos */}
            <div className="home-about-media-col">
              <div className="about-dual-frame">
                <img
                  src={DOCTOR.images.cathLab}
                  alt="Dr. Praveen Chandra in Cath Lab"
                  className="about-main-img"
                  loading="lazy"
                />
                <img
                  src={DOCTOR.images.consultation}
                  alt="Dr. Praveen Chandra Consultation"
                  className="about-sub-img"
                  loading="lazy"
                />
                <div className="about-exp-callout">
                  <span>30+</span>
                  <span>Years Clinical Mastery</span>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="home-about-text-col">
              <div className="section-label">Pioneering Legacy</div>
              <h2 className="section-title">
                Redefining Cardiac Care with Precision & Empathy
              </h2>

              <p style={{ color: 'var(--color-text-light)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                Dr. Praveen Chandra has stood at the vanguard of Asian cardiology for three decades.
                From establishing groundbreaking structural heart valve programs to training generations
                of interventional fellows, his clinical leadership at Medanta – The Medicity brings
                world-standard surgical alternatives to high-risk cardiac patients.
              </p>

              <div className="about-key-highlights">
                <div className="about-highlight-card">
                  <h4>50,000+ Interventions</h4>
                  <p>Comprehensive spectrum of structural, coronary and vascular catheterizations.</p>
                </div>
                <div className="about-highlight-card">
                  <h4>KGMC Alumnus</h4>
                  <p>MBBS, MD (Medicine) & DM (Cardiology) from King George’s Medical College.</p>
                </div>
                <div className="about-highlight-card">
                  <h4>5 Global Fellowships</h4>
                  <p>Conferred FACC (USA), FESC (Europe), FSCAI (USA), FAPSIC, and FCSI honors.</p>
                </div>
                <div className="about-highlight-card">
                  <h4>Pioneering Devices</h4>
                  <p>First to introduce TAVI, MitraClip, bioabsorbable stents & AngioJet in India.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/about" className="btn btn-dark">
                  Read Full Journey →
                </Link>
                <AppointmentButton variant="outline" size="md" showIcon={false} label="Book Consultation" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. AREAS OF EXPERTISE ── */}
      <section className="section home-expertise" aria-label="Areas of Expertise">
        <SectionBackground variant="coronary-tree" opacity={0.7} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Specialized Disciplines</div>
            <h2 className="section-title light">Areas of Advanced Expertise</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Specialized, image-guided catheter solutions designed to eliminate open-heart trauma and accelerate patient recovery.
            </p>
          </div>

          <div className="expertise-asymmetric-grid">
            {EXPERTISE_AREAS.map((item, i) => (
              <div className="expertise-modern-tile" key={i}>
                <div className="tile-top-row">
                  <div className="tile-icon-bubble">{item.icon}</div>
                  <span className="tile-category-tag">{item.category}</span>
                </div>
                <h3 className="tile-title">{item.title}</h3>
                <p className="tile-summary">{item.desc}</p>
                <Link to="/treatments" className="tile-footer-link">
                  Explore Technique <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED TREATMENTS SHOWCASE ── */}
      <section className="section home-treatments" aria-label="Featured Treatments">
        <SectionBackground variant="valve-motion" opacity={0.65} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Landmark Interventions</div>
            <h2 className="section-title">Breakthrough Procedures</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Catheter-delivered valve therapies and complex coronary reconstructions pioneered in India by Dr. Praveen Chandra.
            </p>
          </div>

          <div className="treatments-split-showcase">
            {TREATMENTS.slice(0, 2).map((t) => (
              <div className="treatment-visual-card" key={t.id}>
                <div className="treatment-card-photo-wrap">
                  <img src={t.image} alt={t.name} loading="lazy" />
                  {t.pioneer && (
                    <div className="treatment-pioneer-ribbon">
                      🏆 First in India
                    </div>
                  )}
                </div>

                <div className="treatment-card-details">
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: t.color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    {t.category}
                  </span>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>

                  <ul className="treatment-bullet-strip">
                    {t.details.slice(0, 3).map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
                    <AppointmentButton variant="primary" size="sm" label={`Consult for ${t.name}`} />
                    <Link to={`/treatments#${t.id}`} className="treatment-link">
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/treatments" className="btn btn-dark">
              View All 6 Clinical Treatments →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. ACHIEVEMENTS & PADMA SHRI ── */}
      <section className="section home-achievements" aria-label="Achievements & Honors">
        <SectionBackground variant="awards-constellation" opacity={0.8} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="achievements-rich-layout">
            {/* Authentic Felicitation Photo */}
            <div className="achievements-photo-banner">
              <img
                src={DOCTOR.images.awardPodium}
                alt="Dr. Praveen Chandra Padma Shri Ceremony"
                loading="lazy"
              />
              <div className="achievements-overlay-card">
                <h4>Padma Shri Award (2016)</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  Conferred by the President of India for transformative service in cardiovascular medicine.
                </p>
              </div>
            </div>

            {/* Interactive Milestones List */}
            <div>
              <div className="section-label">Honors & Milestones</div>
              <h2 className="section-title light" style={{ marginBottom: '1.75rem' }}>
                National Recognition & Pioneer Breakthroughs
              </h2>

              <div className="achievements-milestone-list">
                {ACHIEVEMENTS.map((a) => (
                  <div className="milestone-interactive-row" key={a.id}>
                    <div className="milestone-year-pill">{a.year}</div>
                    <div className="milestone-info">
                      <h4>{a.title}</h4>
                      <p>{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. STATS STRIP ── */}
      <div className="home-stats-strip" aria-label="Clinical Metrics">
        <SectionBackground variant="cellular-particles" opacity={0.4} />
        <div className="container">
          <div className="stats-grid-quad">
            {STATS.map((s, i) => (
              <div className="stat-unit" key={i}>
                <div className="stat-unit-val">{s.value}</div>
                <span className="stat-unit-lbl">{s.label}</span>
                <span className="stat-unit-sub">{s.highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. MEDIA SPOTLIGHT ── */}
      <section className="section home-media-spotlight" aria-label="Media & Video Spotlight">
        <SectionBackground variant="multimedia-waves" opacity={0.7} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Watch & Learn</div>
            <h2 className="section-title light">Featured Patient Stories & Insights</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Authentic video documentaries, patient recoveries, and cardiology lectures with Dr. Praveen Chandra.
            </p>
          </div>

          <div className="media-cards-triad">
            {MEDIA_VIDEOS.slice(0, 3).map((v) => (
              <div
                className="media-interactive-thumb"
                key={v.id}
                onClick={() => setActiveVideo(v)}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${v.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveVideo(v); }}
              >
                <div className="media-thumb-img-box">
                  <img src={v.thumbnail} alt={v.title} loading="lazy" />
                  <div className="media-play-center-icon">
                    <span>▶</span>
                  </div>
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'rgba(6,15,30,0.85)',
                    color: 'var(--color-accent)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {v.category}
                  </span>
                </div>
                <div className="media-thumb-content">
                  <h4>{v.title}</h4>
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/media" className="btn btn-outline-gold">
              Explore Complete Media & Articles Hub →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. APPOINTMENT CTA ── */}
      <section className="section home-cta-section" aria-label="Book Appointment">
        <SectionBackground variant="ecg-monitor" opacity={0.5} />
        <div className="container">
          <div className="home-cta-box">
            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1rem', animation: 'heartbeat 1.8s ease-in-out infinite' }}>🫀</span>
            <h2>Your Heart Deserves Direct Pioneer Care</h2>
            <p>
              Schedule an in-person OPD consultation or virtual second opinion with Dr. Praveen Chandra at Medanta – The Medicity, Gurugram.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <AppointmentButton variant="primary" size="xl" showPulse label="Book Appointment at Medanta" />
              <Link to="/contact" className="btn btn-secondary" style={{ padding: '20px 36px' }}>
                Hospital Coordinates →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
