// Media.jsx – Balanced Video Directory, Dynamic Opposing Directional Newspaper Archive, and Shared Image Photo Sequence
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import {
  MEDIA_VIDEOS,
  PHOTO_GALLERY,
  NEWS_ARTICLES,
  DOCTOR,
} from '../../data/doctorData';
import './Media.css';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_TABS = [
  { id: 'procedure', label: 'Procedure Guides' },
  { id: 'patient-story', label: 'Patient Stories' },
  { id: 'informational', label: 'Doctor Talks' },
  { id: 'media', label: 'Ceremony & Telemedicine' },
];

export default function Media() {
  const [modalVideo, setModalVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('procedure');
  const [activeInlineVideo, setActiveInlineVideo] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  // Opposing Directional Newspaper State
  const [newsIndex, setNewsIndex] = useState(0);
  const [newsDirection, setNewsDirection] = useState(1); // 1 = right, -1 = left
  const [isNewsPaused, setIsNewsPaused] = useState(false);

  // Shared Display Area Photo Sequence State
  const [photoIndex, setPhotoIndex] = useState(0);

  const pageRef = useRef(null);

  // Auto-cycle for featured hero spotlight
  const heroCycle = useAutoCycle(MEDIA_VIDEOS.slice(0, 4).length, 6000);
  const currentHeroVideo = MEDIA_VIDEOS.slice(0, 4)[heroCycle.activeIndex];

  const filteredVideos = MEDIA_VIDEOS.filter((v) => v.type === activeTab);

  // Keep inline player synchronized or null (shows placeholder graphic before selection)
  useEffect(() => {
    setActiveInlineVideo(null); // Shows the graphic placeholder first
  }, [activeTab]);

  // Opposing Directional Newspaper Auto-rotation
  useEffect(() => {
    if (isNewsPaused) return;
    const timer = setInterval(() => {
      setNewsDirection((d) => -d); // Alternate opposing directions
      setNewsIndex((prev) => (prev + 1) % NEWS_ARTICLES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isNewsPaused]);

  // Shared Display Photo Sequence Auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % PHOTO_GALLERY.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleManualNewsChange = (dir) => {
    setIsNewsPaused(true);
    setNewsDirection(dir);
    setNewsIndex((prev) => {
      if (dir > 0) return (prev + 1) % NEWS_ARTICLES.length;
      return (prev - 1 + NEWS_ARTICLES.length) % NEWS_ARTICLES.length;
    });
    setTimeout(() => setIsNewsPaused(false), 9000);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // 1. Cinema Hero Entrance
        gsap.fromTo(
          '.med-hero-content',
          { opacity: 0, x: -45 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.med-hero-theater',
          { opacity: 0, scale: 0.93, x: 45 },
          { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        );

        // Continuous Hero Parallax
        gsap.to('.med-hero-theater', {
          yPercent: 10,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.media-cinema-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // 2. Video Directory Reveal (Reversible)
        gsap.fromTo(
          '.med-video-directory-layout',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-archive-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // 3. Opposing Newspaper Section Reveal
        gsap.fromTo(
          '.news-opposing-wrapper',
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-news-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        // 4. Photo Archive Shared Stage Reveal
        gsap.fromTo(
          '.photo-shared-container',
          { opacity: 0, y: 32, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-zigzag-gallery',
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
  }, [activeTab]);

  const activeArticle = NEWS_ARTICLES[newsIndex];
  const activePhoto = PHOTO_GALLERY[photoIndex];

  return (
    <div ref={pageRef} className="media-root">
      {/* ── 1. CINEMA HERO ── */}
      <section className="media-cinema-hero" aria-label="Clinical Cinema Hero">
        <SectionBackground variant="multimedia-waves" opacity={0.65} />

        <div className="container med-z1">
          <div className="med-hero-split">
            <div className="med-hero-content">
              <div className="section-kicker">Clinical Media Library</div>
              <h1 className="med-hero-title">Cardiology Cinema &amp; Clinical Explainers</h1>
              <p className="med-hero-lead">
                Verified video guides, surgical animations, and patient recovery stories covering TAVI valve replacement, Intravascular Lithotripsy, and beating-heart interventions with Dr. Praveen Chandra.
              </p>

              <div className="med-hero-metrics">
                <div className="med-metric-chip">
                  <span className="med-metric-num">10+</span>
                  <span className="med-metric-label">Clinical Films</span>
                </div>
                <div className="med-metric-chip">
                  <span className="med-metric-num">6</span>
                  <span className="med-metric-label">National Press Clippings</span>
                </div>
                <div className="med-metric-chip">
                  <span className="med-metric-num">5</span>
                  <span className="med-metric-label">Curated Gallery Photos</span>
                </div>
              </div>

              <div className="med-hero-actions">
                <button
                  type="button"
                  className="btn-clinical btn-clinical--primary"
                  onClick={() => setModalVideo(currentHeroVideo)}
                >
                  Watch Featured Film
                </button>
                <a
                  href={DOCTOR.medantaMediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clinical btn-clinical--secondary"
                >
                  Medanta Press Desk ↗
                </a>
              </div>
            </div>

            <div className="med-hero-theater">
              <div
                className="theater-screen-box"
                onClick={() => setModalVideo(currentHeroVideo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalVideo(currentHeroVideo);
                  }
                }}
                aria-label={`Play featured film: ${currentHeroVideo.title}`}
              >
                <img
                  src={currentHeroVideo.thumbnail}
                  alt={currentHeroVideo.title}
                  loading="eager"
                />
                <div className="theater-play-badge" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                  </svg>
                </div>
                <div className="theater-live-tag">
                  <span className="live-dot" />
                  <span>Featured Film</span>
                </div>
              </div>

              <div className="theater-caption-bar">
                <div>
                  <span className="theater-cat-mono">{currentHeroVideo.category} · {currentHeroVideo.duration}</span>
                  <h3>{currentHeroVideo.title}</h3>
                </div>
                <button
                  type="button"
                  className="round-nav-btn"
                  onClick={() => setModalVideo(currentHeroVideo)}
                  aria-label="Play video"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BALANCED VIDEO DIRECTORY WITH GRAPHIC PLACEHOLDER & ACTIVE INLINE PLAYER ── */}
      <section className="section media-archive-stage" id="videos" aria-label="Complete Video Archive">
        <div className="container med-z1">
          <div className="media-stage-header">
            <div>
              <div className="section-kicker">Video Directory</div>
              <h2 className="section-heading">Educational Cardiology Video Library</h2>
            </div>

            <div className="media-filter-tabs" role="tablist" aria-label="Filter videos by category">
              {VIDEO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`media-filter-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Balanced Layout: Left Main Display Area (Graphic placeholder replaced with video on click), Right Compact Uniform Cards */}
          <div className="med-video-directory-layout">
            {/* Main Interactive Stage */}
            <div className="med-main-display-stage">
              {activeInlineVideo ? (
                <div className="med-active-video-player">
                  <div className="med-iframe-box">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeInlineVideo.youtubeId}?autoplay=1&rel=0`}
                      title={activeInlineVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="med-active-video-bar">
                    <div>
                      <span className="med-active-tag">{activeInlineVideo.category} · {activeInlineVideo.duration}</span>
                      <h3>{activeInlineVideo.title}</h3>
                      <p>{activeInlineVideo.description}</p>
                    </div>
                    <button
                      type="button"
                      className="btn-clinical btn-clinical--secondary"
                      onClick={() => setActiveInlineVideo(null)}
                    >
                      Close Player ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="med-graphic-placeholder-frame">
                  <img
                    src="/images/illustrations/cardiac-anatomy-bright.webp"
                    alt="Precision Cardiac Interventions & Anatomy"
                    className="med-placeholder-graphic"
                  />
                  <div className="med-placeholder-overlay">
                    <span className="med-placeholder-kicker">Interactive Video Hub</span>
                    <h3>Select Any Video Below to Play</h3>
                    <p>Click any card to watch high-definition surgical animations, clinical explainers, and patient recovery stories.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Compact Neatly Arranged Video Cards (All equal, compact size) */}
            <div className="med-cards-rail-grid" role="list" aria-label="Video Cards">
              {filteredVideos.map((vid) => {
                const isCurrent = activeInlineVideo?.id === vid.id;
                return (
                  <article
                    key={vid.id}
                    className={`med-uniform-video-card ${isCurrent ? 'is-playing' : ''}`}
                    onClick={() => setActiveInlineVideo(vid)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveInlineVideo(vid);
                      }
                    }}
                    aria-label={`Play: ${vid.title}`}
                  >
                    <div className="med-card-thumb-wrap">
                      <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                      <span className="med-card-play-pill">
                        {isCurrent ? 'Playing ■' : 'Play ▶'}
                      </span>
                      <span className="med-card-dur">{vid.duration}</span>
                    </div>
                    <div className="med-card-body-wrap">
                      <span className="med-card-cat-label">{vid.category}</span>
                      <h4>{vid.title}</h4>
                      <p>{vid.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DYNAMIC OPPOSING DIRECTIONAL NEWSPAPER ARCHIVE ── */}
      <section className="section media-news-stage" aria-label="Newspaper and News Coverage">
        <SectionBackground variant="telemetry-grid" opacity={0.25} />

        <div className="container med-z1">
          <div className="stage-header-row" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ margin: '0 auto', maxWidth: '680px' }}>
              <div className="section-kicker">Press Archive</div>
              <h2 className="section-heading">Genuine Newspaper &amp; Media Coverage</h2>
              <p className="section-lead" style={{ margin: '0.4rem auto 0' }}>
                Prominent scanned newspaper clippings from national publications. Slides automatically with opposing directional transitions. Swipe or use controls to browse.
              </p>
            </div>
          </div>

          <div className="news-opposing-wrapper">
            <div className="news-opposing-stage">
              <AnimatePresence mode="wait" custom={newsDirection}>
                <motion.div
                  key={activeArticle.id}
                  custom={newsDirection}
                  className="news-opposing-card"
                  initial={{ opacity: 0, x: newsDirection * 90, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -newsDirection * 90, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (Math.abs(offset.x) > 60) {
                      handleManualNewsChange(offset.x > 0 ? -1 : 1);
                    }
                  }}
                  onClick={() =>
                    setLightboxPhoto({
                      src: activeArticle.image,
                      title: activeArticle.headline,
                      caption: `${activeArticle.source} · ${activeArticle.date}`,
                    })
                  }
                >
                  {/* Large Prominent Newspaper Image */}
                  <div className="news-large-image-frame">
                    <img src={activeArticle.image} alt={activeArticle.headline} />
                    <div className="news-zoom-badge">
                      <span>🔍 Tap to Enlarge Full Newspaper</span>
                    </div>
                  </div>

                  {/* Concise English-Only Meta & Information */}
                  <div className="news-condensed-info">
                    <div className="news-meta-pills">
                      <span className="clip-source-badge">{activeArticle.source}</span>
                      <span className="clip-date-tag">{activeArticle.date}</span>
                      <span className="clip-topic-pill">{activeArticle.tag}</span>
                    </div>
                    <h3>{activeArticle.headline}</h3>
                    <p>{activeArticle.excerpt}</p>

                    <div className="news-switch-footer">
                      <span className="news-drag-hint">← Drag left / right to transition →</span>
                      <span className="news-counter-pill">
                        {newsIndex + 1} of {NEWS_ARTICLES.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Opposing Navigation Arrow Controls */}
            <div className="news-opposing-nav">
              <button
                type="button"
                className="round-nav-btn"
                onClick={() => handleManualNewsChange(-1)}
                aria-label="Previous clipping"
              >
                ←
              </button>
              <div className="news-indicator-track">
                {NEWS_ARTICLES.map((_, i) => (
                  <span
                    key={i}
                    className={`news-nav-dot ${i === newsIndex ? 'is-active' : ''}`}
                    onClick={() => {
                      setIsNewsPaused(true);
                      setNewsDirection(i > newsIndex ? 1 : -1);
                      setNewsIndex(i);
                      setTimeout(() => setIsNewsPaused(false), 9000);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="round-nav-btn"
                onClick={() => handleManualNewsChange(1)}
                aria-label="Next clipping"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SINGLE SHARED DISPLAY AREA PHOTO ARCHIVE ── */}
      <section className="section media-zigzag-gallery" aria-label="Clinical Photography Archive">
        <div className="container med-z1">
          <div className="stage-header-row" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ margin: '0 auto', maxWidth: '640px' }}>
              <div className="section-kicker">Photo Archive</div>
              <h2 className="section-heading">Curated Clinical Gallery</h2>
              <p className="section-lead" style={{ margin: '0.4rem auto 0' }}>
                Single shared display stage. Images emerge, expand into focus, and transition sequentially.
              </p>
            </div>
          </div>

          {/* Single Shared Display Stage with Continuous Sequential Transition */}
          <div className="photo-shared-container">
            <div className="photo-shared-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.src}
                  className="photo-shared-slide"
                  initial={{ opacity: 0, scale: 0.92, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightboxPhoto(activePhoto)}
                >
                  <img src={activePhoto.src} alt={activePhoto.title} />
                  <div className="photo-shared-overlay">
                    <span className="photo-shared-cat">{activePhoto.category}</span>
                    <h3>{activePhoto.title}</h3>
                    <p>{activePhoto.caption}</p>
                    <span className="photo-zoom-tag">🔍 Click to View Full Resolution</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Photo Sequence Selector Dots */}
            <div className="photo-sequence-selector">
              {PHOTO_GALLERY.map((p, idx) => (
                <button
                  key={p.src}
                  type="button"
                  className={`photo-seq-btn ${idx === photoIndex ? 'is-active' : ''}`}
                  onClick={() => setPhotoIndex(idx)}
                  aria-label={`Show photo ${idx + 1}: ${p.title}`}
                >
                  <span className="photo-seq-thumb">
                    <img src={p.src} alt="" />
                  </span>
                  <span className="photo-seq-label">{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="gal-lightbox"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
        >
          <div className="gal-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxPhoto.src} alt={lightboxPhoto.title} />
            <div className="gal-lightbox-info">
              <h3>{lightboxPhoto.title}</h3>
              <p>{lightboxPhoto.caption}</p>
            </div>
            <button
              type="button"
              className="gal-lightbox-close"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close image"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Video Modal Component */}
      {modalVideo && (
        <VideoModal video={modalVideo} onClose={() => setModalVideo(null)} />
      )}
    </div>
  );
}
