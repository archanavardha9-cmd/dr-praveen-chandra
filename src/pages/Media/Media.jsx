// Media.jsx – Cardiology video library, press archive, and curated photo stage with distinct scroll choreography
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoModal from '../../components/media/VideoModal';
import SplitHeading from '../../components/motion/SplitHeading';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import { animateNumericCounters } from '../../utils/motionHelpers';
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

const MAIN_GRAPHIC_IMAGE_MAP = {
  procedure: '/images/treatments/valve-replacement-tavi.webp',
  'patient-story': '/images/doctor/dr-praveen-consultation.webp',
  informational: '/images/doctor/dr-praveen-speaking.webp',
  media: '/images/doctor/dr-praveen-award-podium.webp',
};

export default function Media() {
  const [modalVideo, setModalVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('procedure');
  const [activeInlineVideo, setActiveInlineVideo] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const [newsIndex, setNewsIndex] = useState(0);
  const [newsDirection, setNewsDirection] = useState(1);
  const [isNewsPaused, setIsNewsPaused] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);

  const pageRef = useRef(null);

  const heroCycle = useAutoCycle(MEDIA_VIDEOS.slice(0, 4).length, 6000);
  const currentHeroVideo = MEDIA_VIDEOS.slice(0, 4)[heroCycle.activeIndex];

  const filteredVideos = MEDIA_VIDEOS.filter((v) => v.type === activeTab);

  useEffect(() => {
    if (isNewsPaused) return;
    const timer = setInterval(() => {
      setNewsDirection((d) => -d);
      setNewsIndex((prev) => (prev + 1) % NEWS_ARTICLES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isNewsPaused]);

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

  // Bold hero mount, float, scroll-exit, and 3-phase scrubbed section transformations
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. CINEMA HERO — Bold opposing left/right mount + counters + float + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.med-hero-content',
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' }
          )
          .fromTo(
            '.med-hero-theater-col',
            { x: 135, scale: 0.72, rotate: 2.5, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
            0.06
          )
          .fromTo('.med-hero-content .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.16)
          .fromTo(
            '.med-hero-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055, ease: 'power3.out' },
            0.22
          )
          .fromTo('.med-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.45)
          .fromTo('.med-metric-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.55)
          .fromTo(
            '.med-hero-actions > *',
            { scale: 0.82, y: 18, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
            0.65
          );

        animateNumericCounters('.med-metric-num', {
          trigger: '.media-cinema-hero',
          start: 'top 95%',
        });

        gsap.to('.med-stage-float', {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-cinema-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.med-hero-copy-inner', { x: -75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.med-hero-visual-scrub', { x: 75, y: -32, scale: 0.84, opacity: 0.2, ease: 'none' }, 0);

        // ── 2. VIDEO DIRECTORY — Scrubbed player stage growth + playlist rail glide & shrink exit ──
        const dirTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-archive-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        dirTl
          .fromTo(
            '.media-stage-header .section-heading',
            { x: -60, color: '#5a738c', opacity: 0.25 },
            { x: 0, color: '#09223a', opacity: 1, duration: 0.34, ease: 'power2.out' },
            0
          )
          .fromTo('.media-filter-tabs', { x: 70, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo(
            '.med-main-display-stage',
            { scale: 0.62, x: -95, y: 60, opacity: 0.15 },
            { scale: 1.02, x: 0, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.med-cards-rail-grid',
            { x: 105, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.03
          )
          // Plateau
          .to('.med-main-display-stage', { scale: 1, x: 0, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.med-cards-rail-grid', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.med-main-display-stage', { scale: 0.78, y: -45, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.med-cards-rail-grid', { x: 75, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 3. NEWSPAPER PRESS ARCHIVE — Scrubbed zoom surge, plateau & shrink exit ──
        const newsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-news-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        newsTl
          .fromTo(
            '.news-stage-header .section-heading',
            { y: -35, color: '#5a738c', opacity: 0.25 },
            { y: 0, color: '#09223a', opacity: 1, duration: 0.32, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.news-opposing-wrapper',
            { scale: 0.64, y: 75, rotate: -2, opacity: 0.15 },
            { scale: 1.02, y: 0, rotate: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.02
          )
          // Plateau
          .to('.news-opposing-wrapper', { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink
          .to('.news-opposing-wrapper', { scale: 0.78, y: -50, opacity: 0.2, duration: 0.32, ease: 'power2.in' }, 0.68);

        // ── 4. PHOTO ARCHIVE — Small aperture expanding into full-presence stage + horizontal strip sweep + handoff ──
        const galTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-zigzag-gallery',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        galTl
          .fromTo(
            '.gal-stage-header .section-heading',
            { y: -35, color: '#5a738c', opacity: 0.25 },
            { y: 0, color: '#09223a', opacity: 1, duration: 0.32, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.photo-shared-viewport',
            { scale: 0.6, y: 70, clipPath: 'inset(10% 18% 10% 18%)', opacity: 0.2 },
            { scale: 1.03, y: 0, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.photo-sequence-selector',
            { x: 130, opacity: 0.15 },
            { x: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0.04
          )
          // Plateau
          .to('.photo-shared-viewport', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.photo-sequence-selector', { x: 0, opacity: 1, duration: 0.32 }, 0.36)
          // Exit shrink into Footer
          .to('.photo-shared-viewport', { scale: 0.78, y: -45, opacity: 0.22, duration: 0.32, ease: 'power2.in' }, 0.68)
          .to('.photo-sequence-selector', { x: -85, opacity: 0.22, duration: 0.32, ease: 'power2.in' }, 0.68);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Filtered video cards alternating micro-tilt stagger when switching categories
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.med-uniform-video-card');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, x: 32, rotate: 1.5 },
            {
              opacity: 1,
              x: 0,
              rotate: 0,
              duration: 0.45,
              stagger: 0.06,
              clearProps: 'transform',
              ease: 'power3.out',
            }
          );
        }
      }, pageRef);

      ScrollTrigger.refresh();
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
        <div className="container med-z1">
          <div className="med-hero-split">
            <div className="med-hero-content">
              <div className="med-hero-copy-inner">
                <div className="section-kicker">Clinical Media Library</div>
                <SplitHeading as="h1" className="med-hero-title" text="Cardiology Cinema & Clinical Explainers" />
                <p className="med-hero-lead">
                  Procedure guides, patient recovery stories, and clinical talks with Dr. Praveen Chandra at Medanta – The Medicity.
                </p>

                <div className="med-hero-metrics">
                  <div className="med-metric-item">
                    <span className="med-metric-num tabular-nums">10+</span>
                    <span className="med-metric-label">Clinical Films</span>
                  </div>
                  <div className="med-metric-item">
                    <span className="med-metric-num tabular-nums">6</span>
                    <span className="med-metric-label">Press Clippings</span>
                  </div>
                  <div className="med-metric-item">
                    <span className="med-metric-num tabular-nums">5</span>
                    <span className="med-metric-label">Gallery Photos</span>
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
            </div>

            <div className="med-hero-theater-col">
              <div className="med-hero-visual-scrub">
                <div className="med-stage-float">
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
                      <div className="med-theater-mask media-reveal-mask">
                        <img
                          src={currentHeroVideo.thumbnail}
                          alt={currentHeroVideo.title}
                          loading="eager"
                        />
                      </div>
                      <div className="theater-play-badge" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                        </svg>
                      </div>
                    </div>

                    <div className="theater-caption-bar">
                      <div>
                        <span className="theater-cat-mono tabular-nums">
                          {currentHeroVideo.category} · {currentHeroVideo.duration}
                        </span>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. BALANCED VIDEO DIRECTORY ── */}
      <section className="section media-archive-stage" id="videos" aria-label="Complete Video Archive">
        <div className="container med-z1">
          <div className="media-stage-header">
            <div>
              <div className="section-kicker">Video Directory</div>
              <SplitHeading as="h2" className="section-heading" text="Educational Cardiology Video Library" />
            </div>

            <div className="media-filter-tabs" role="tablist" aria-label="Filter videos by category">
              {VIDEO_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`media-filter-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveInlineVideo(null);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="med-video-directory-layout">
            <div className="med-main-display-stage">
              <div className="med-display-mask media-reveal-mask">
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
                        <span className="med-active-tag tabular-nums">
                          {activeInlineVideo.category} · {activeInlineVideo.duration}
                        </span>
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
                      src={MAIN_GRAPHIC_IMAGE_MAP[activeTab] || '/images/illustrations/cardiac-anatomy-bright.webp'}
                      alt={activeTab === 'procedure' ? 'Transcatheter Valve Procedure Illustration' : activeTab === 'patient-story' ? 'Patient Consultation Scene' : activeTab === 'informational' ? 'Doctor Speaking at Symposium' : 'Medical Awards and Media Coverage'}
                      className="med-placeholder-graphic"
                    />
                    <div className="med-placeholder-overlay">
                      <span className="med-placeholder-kicker">Interactive Video Hub</span>
                      <h3>Select Any Video to Play</h3>
                      <p>Choose a film on the right to watch procedural explainers and patient recovery stories.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                      <span className="med-card-play-overlay">
                        {isCurrent ? 'Playing' : 'Play ▶'}
                      </span>
                      <span className="med-card-dur tabular-nums">{vid.duration}</span>
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

      {/* ── 3. NEWSPAPER & PRESS COVERAGE ── */}
      <section className="section media-news-stage" aria-label="Newspaper and News Coverage">
        <div className="container med-z1">
          <div className="stage-header-row news-stage-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ margin: '0 auto', maxWidth: '640px' }}>
              <div className="section-kicker">Press Archive</div>
              <SplitHeading as="h2" className="section-heading" text="Newspaper & Media Coverage" />
              <p className="section-lead" style={{ margin: '0.4rem auto 0' }}>
                Verified newspaper clippings and features from national publications.
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
                  initial={{ opacity: 0, x: newsDirection * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -newsDirection * 48 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="news-large-image-frame">
                    <img src={activeArticle.image} alt={activeArticle.headline} />
                    <div className="news-zoom-badge">
                      <span>Enlarge Clipping ↗</span>
                    </div>
                  </div>

                  <div className="news-condensed-info">
                    <div className="news-meta-row">
                      <span className="clip-source-label">{activeArticle.source}</span>
                      <span aria-hidden="true">·</span>
                      <span className="clip-date-tag">{activeArticle.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="clip-topic-label">{activeArticle.tag}</span>
                    </div>
                    <h3>{activeArticle.headline}</h3>
                    <p>{activeArticle.excerpt}</p>

                    <div className="news-switch-footer">
                      <span className="news-drag-hint">Swipe or use controls to browse</span>
                      <span className="news-counter-label tabular-nums">
                        {newsIndex + 1} / {NEWS_ARTICLES.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

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

      {/* ── 4. CURATED PHOTO ARCHIVE ── */}
      <section className="section media-zigzag-gallery" aria-label="Clinical Photography Archive">
        <div className="container med-z1">
          <div className="stage-header-row gal-stage-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ margin: '0 auto', maxWidth: '640px' }}>
              <div className="section-kicker">Photo Archive</div>
              <SplitHeading as="h2" className="section-heading" text="Curated Clinical Gallery" />
              <p className="section-lead" style={{ margin: '0.4rem auto 0' }}>
                Moments from catheterization suites, international symposia, and national honors.
              </p>
            </div>
          </div>

          <div className="photo-shared-container">
            <div className="photo-shared-viewport">
              <div className="photo-viewport-mask media-reveal-mask">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhoto.src}
                    className="photo-shared-slide"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxPhoto(activePhoto)}
                  >
                    <img src={activePhoto.src} alt={activePhoto.title} />
                    <div className="photo-shared-overlay">
                      <span className="photo-shared-cat">{activePhoto.category}</span>
                      <h3>{activePhoto.title}</h3>
                      <p>{activePhoto.caption}</p>
                      <span className="photo-zoom-tag">View full resolution ↗</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

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
