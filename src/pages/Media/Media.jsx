// Media.jsx – Imposing Hero, Compact Sections & Reversible Bidirectional Animations
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import AppointmentButton from '../../components/common/AppointmentButton';
import { MEDIA_VIDEOS, PUBLICATIONS_ARTICLES, PHOTO_GALLERY } from '../../data/doctorData';
import './Media.css';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_TABS = [
  { id: 'all', label: 'All Videos' },
  { id: 'procedure', label: 'Procedure Guides' },
  { id: 'patient-story', label: 'Patient Stories' },
  { id: 'informational', label: 'Doctor Talks' },
  { id: 'media', label: 'Conferences & Awards' },
];

export default function Media() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [featuredQueueIndex, setFeaturedQueueIndex] = useState(0);
  const pageRef = useRef(null);

  const featuredVideo = MEDIA_VIDEOS[featuredQueueIndex] || MEDIA_VIDEOS[0];

  const filteredVideos = activeTab === 'all'
    ? MEDIA_VIDEOS
    : MEDIA_VIDEOS.filter(v => v.type === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO BIDIRECTIONAL ENTRANCE ──
      gsap.fromTo('.media-hero-text-col > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: {
            trigger: '.media-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      gsap.fromTo('.media-hero-preview-box',
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.25,
          scrollTrigger: {
            trigger: '.media-hero-revamp',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 1. CINEMA STAGE BIDIRECTIONAL REVEAL ──
      gsap.fromTo('.cinema-main-stage',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.media-cinema-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
      gsap.fromTo('.cinema-queue-item',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cinema-queue-column',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 2. FULL VIDEO LIBRARY REVERSIBLE STAGGER ──
      gsap.fromTo('.media-video-item',
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.media-full-grid',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 3. PUBLICATIONS & ARTICLES BIDIRECTIONAL ──
      gsap.fromTo('.article-visual-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.articles-masonry-grid',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );

      // ── 4. PHOTO MOSAIC REVERSIBLE ──
      gsap.fromTo('.gallery-mosaic-tile',
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-mosaic-grid',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div ref={pageRef}>
      {/* ── REDESIGNED IMPOSING HERO (~88vh) ── */}
      <section className="media-hero-revamp" aria-label="Media Hub Hero">
        <div className="media-hero-bg" />
        <SectionBackground variant="media-broadcasting" opacity={0.7} />

        <div className="container media-hero-container">
          <div className="media-hero-grid">
            <div className="media-hero-text-col">
              <div className="media-badge-strip">
                <span className="media-hero-tag">🎥 Clinical Media & Broadcasts</span>
                <span className="media-hero-tag" style={{ background: 'rgba(26,74,124,0.3)', borderColor: 'rgba(201,168,76,0.25)' }}>
                  11+ Verified Films
                </span>
              </div>

              <h1 className="media-hero-title">
                Documented <span>Case Recoveries & Keynote Lectures</span>
              </h1>

              <p className="media-hero-subtitle">
                Authentic Patient Journeys · High-Resolution Procedure Demonstrations · Presidential Felicitation
              </p>

              <p className="media-hero-desc">
                Explore real clinical recoveries, educational talks on structural heart disease,
                and national media coverage chronicling Dr. Praveen Chandra’s medical milestones at Medanta.
              </p>

              <div className="media-hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedVideo(MEDIA_VIDEOS[0])}
                  aria-label="Play Featured TAVI Film"
                >
                  <span>▶</span> Play Spotlight Film
                </button>
                <a href="#library" className="btn btn-secondary">
                  Browse Video Library ↓
                </a>
              </div>

              <div className="media-hero-ticker">
                <div>
                  <span className="media-ticker-val">11+</span>
                  <span className="media-ticker-lbl">Clinical Videos</span>
                </div>
                <div>
                  <span className="media-ticker-val">100K+</span>
                  <span className="media-ticker-lbl">Patient Reach</span>
                </div>
                <div>
                  <span className="media-ticker-val">National</span>
                  <span className="media-ticker-lbl">Press Coverage</span>
                </div>
              </div>
            </div>

            {/* Right Video Reel Hero Preview */}
            <div className="media-hero-visual">
              <div
                className="media-hero-preview-box"
                onClick={() => setSelectedVideo(MEDIA_VIDEOS[0])}
                role="button"
                tabIndex={0}
                aria-label={`Watch ${MEDIA_VIDEOS[0].title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedVideo(MEDIA_VIDEOS[0]); }}
              >
                <div className="media-hero-thumb-wrap">
                  <img src={MEDIA_VIDEOS[0].thumbnail} alt={MEDIA_VIDEOS[0].title} loading="eager" />
                  <div className="media-hero-play-beacon">▶</div>
                </div>
                <div className="media-hero-box-meta">
                  <h4>{MEDIA_VIDEOS[0].title}</h4>
                  <p>{MEDIA_VIDEOS[0].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. COMPACT FEATURED VIDEO CINEMA ── */}
      <section className="section media-cinema-section" aria-label="Featured Cinema">
        <SectionBackground variant="telemetry-grid" opacity={0.45} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="media-cinema-layout">
            <div className="cinema-main-stage">
              <div
                className="cinema-stage-player"
                onClick={() => setSelectedVideo(featuredVideo)}
                role="button"
                tabIndex={0}
                aria-label={`Play: ${featuredVideo.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedVideo(featuredVideo); }}
              >
                <img src={featuredVideo.thumbnail} alt={featuredVideo.title} />
                <div className="cinema-play-hero-btn">
                  <span>▶</span>
                </div>
              </div>

              <div className="cinema-stage-meta">
                <span className="cinema-meta-tag">{featuredVideo.category}</span>
                <h3>{featuredVideo.title}</h3>
                <p>{featuredVideo.description}</p>
              </div>
            </div>

            <div className="cinema-queue-column">
              <h3 className="cinema-queue-title">Spotlight Queue</h3>
              {MEDIA_VIDEOS.slice(0, 4).map((v, i) => (
                <div
                  key={v.id}
                  className={`cinema-queue-item ${featuredQueueIndex === i ? 'active' : ''}`}
                  onClick={() => setFeaturedQueueIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setFeaturedQueueIndex(i); }}
                >
                  <div className="cinema-q-thumb">
                    <img src={v.thumbnail} alt={v.title} />
                    <div className="cinema-q-play">▶</div>
                  </div>
                  <div className="cinema-q-info">
                    <h5>{v.title}</h5>
                    <span>{v.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT FULL VIDEO LIBRARY ── */}
      <section className="section media-library-section" id="library" aria-label="Video Library">
        <SectionBackground variant="valve-motion" opacity={0.5} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Watch All Recordings</div>
            <h2 className="section-title light">Complete Video Archive</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Explore patient recovery stories, TAVI animations, and national felicitation ceremony broadcasts.
            </p>
          </div>

          <div className="media-filter-bar">
            {VIDEO_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`media-filter-pill ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="media-full-grid">
            {filteredVideos.map((v) => (
              <div
                className="media-video-item"
                key={v.id}
                onClick={() => setSelectedVideo(v)}
                role="button"
                tabIndex={0}
                aria-label={`Play: ${v.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedVideo(v); }}
              >
                <div className="media-video-thumb-box">
                  <img src={v.thumbnail} alt={v.title} loading="lazy" />
                  <div className="media-video-play-icon">▶</div>
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

                <div className="media-video-details">
                  <h4>{v.title}</h4>
                  <p>{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. COMPACT PUBLICATIONS & MEDICAL ARTICLES ── */}
      <section className="section media-articles-section" aria-label="Articles & Publications">
        <SectionBackground variant="laser-energy" opacity={0.55} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Clinical Literature</div>
            <h2 className="section-title">Published Articles & Clinical Insights</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Educational articles authored by Dr. Praveen Chandra discussing multidisciplinary TAVI planning, complex CTOs, and cardiovascular prevention.
            </p>
          </div>

          <div className="articles-masonry-grid">
            {PUBLICATIONS_ARTICLES.map((art) => (
              <a
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="article-visual-card"
                key={art.id}
              >
                <div className="article-banner-wrap">
                  <img src={art.image} alt={art.title} loading="lazy" />
                </div>
                <div className="article-card-body">
                  <span className="article-card-cat">{art.category} · {art.readTime}</span>
                  <h3>{art.title}</h3>
                  <p>{art.excerpt}</p>
                  <div className="article-read-more">
                    Read Article On Official Blog <span>↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. COMPACT PHOTO GALLERY & CONFERENCES ── */}
      <section className="section media-gallery-section" aria-label="Photo Gallery">
        <SectionBackground variant="awards-constellation" opacity={0.65} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Moments In Cardiology</div>
            <h2 className="section-title light">Cath Lab, Keynotes & Honors</h2>
            <p className="section-subtitle light" style={{ margin: '0 auto' }}>
              Photographic highlights documenting Dr. Praveen Chandra in surgery, on international keynotes, and receiving national felicitations.
            </p>
          </div>

          <div className="gallery-mosaic-grid">
            {PHOTO_GALLERY.map((item, idx) => (
              <div className="gallery-mosaic-tile" key={idx}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-tile-caption">
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {item.category}
                  </span>
                  <h4>{item.title}</h4>
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '3.5rem',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                Access Official Medanta Press & Hospital Archives
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem' }}>
                View institutional press releases, live television appearances, and national news coverage on Medanta’s portal.
              </p>
            </div>
            <a
              href="https://www.medanta.org/media-listing/dr-praveen-chandra"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
            >
              Medanta Media Listing ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. COMPACT APPOINTMENT CTA ── */}
      <section className="section" style={{ background: 'var(--gradient-primary)', textAlign: 'center', color: '#fff', padding: 'clamp(50px, 7vh, 85px) 0' }}>
        <SectionBackground variant="ecg-monitor" opacity={0.45} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title light" style={{ marginBottom: '1rem' }}>
            Consult Dr. Praveen Chandra at Medanta
          </h2>
          <p className="section-subtitle light" style={{ margin: '0 auto 2rem' }}>
            Book an appointment with India’s foremost structural heart and TAVI expert.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <AppointmentButton variant="primary" size="lg" showPulse label="Schedule Consultation at Medanta" />
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
