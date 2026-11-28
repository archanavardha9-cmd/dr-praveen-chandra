// Media.jsx – Distinct Multi-Frame Cinema Hero, Full-Width Spotlight Video Hub, Broadsheet Press Showcase & 5-Photo Mosaic
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoModal from '../../components/media/VideoModal';
import SplitHeading from '../../components/motion/SplitHeading';
import ResponsiveImage from '../../components/common/ResponsiveImage';
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
    }, 4800);
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
        // ── 1. MULTI-FRAME CINEMA HERO — Opposing entrance + staggered inset frames + scroll-exit ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo('.med-hero-content', { x: -115, opacity: 0 }, { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' })
          .fromTo(
            '.med-hero-theater-col',
            { x: 130, scale: 0.74, rotate: 2, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
            0.06
          )
          .fromTo(
            '.med-hero-inset-talk',
            { x: -75, y: -55, scale: 0.65, rotate: -4, opacity: 0 },
            { x: 0, y: 0, scale: 1, rotate: -2, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' },
            0.34
          )
          .fromTo(
            '.med-hero-inset-press',
            { x: 75, y: 55, scale: 0.65, rotate: 4, opacity: 0 },
            { x: 0, y: 0, scale: 1, rotate: 2, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' },
            0.4
          )
          .fromTo('.med-hero-content .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.16)
          .fromTo(
            '.med-hero-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.055, ease: 'power3.out' },
            0.22
          )
          .fromTo('.med-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.52 }, 0.44)
          .fromTo('.med-metric-item', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, stagger: 0.08 }, 0.54)
          .fromTo(
            '.med-hero-actions > *',
            { scale: 0.84, y: 16, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.52, stagger: 0.1, ease: 'back.out(1.6)' },
            0.64
          );

        animateNumericCounters('.med-metric-num', {
          trigger: '.media-cinema-hero',
          start: 'top 95%',
        });

        gsap.to('.med-stage-float', {
          y: -7,
          duration: 3.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.1,
        });
        gsap.to('.med-hero-inset-talk', {
          y: 7,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2,
        });
        gsap.to('.med-hero-inset-press', {
          y: -6,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.3,
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
          .to('.med-hero-copy-inner', { x: -70, y: -24, opacity: 0.22, ease: 'none' }, 0)
          .to('.med-hero-visual-scrub', { x: 70, y: -30, scale: 0.85, opacity: 0.22, ease: 'none' }, 0);

        // ── 2. VIDEO SPOTLIGHT + HORIZONTAL DECK — Full-width growth & exit ──
        const dirTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-archive-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        dirTl
          .fromTo('.media-stage-header .section-heading', { x: -55, color: '#5a738c', opacity: 0.25 }, { x: 0, color: '#09223a', opacity: 1, duration: 0.34 }, 0)
          .fromTo('.media-filter-tabs', { x: 65, opacity: 0.2 }, { x: 0, opacity: 1, duration: 0.34 }, 0)
          .fromTo(
            '.med-main-display-stage',
            { scale: 0.68, y: 55, opacity: 0.18 },
            { scale: 1.02, y: 0, opacity: 1, duration: 0.36, ease: 'power2.out' },
            0
          )
          .fromTo('.med-cards-deck-grid', { y: 45, opacity: 0.18 }, { y: 0, opacity: 1, duration: 0.36 }, 0.05)
          .to('.med-main-display-stage', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.med-main-display-stage', { scale: 0.82, y: -40, opacity: 0.22, duration: 0.32 }, 0.68)
          .to('.med-cards-deck-grid', { y: -20, opacity: 0.22, duration: 0.32 }, 0.68);

        // ── 3. BROADSHEET PRESS ARCHIVE — Centerpiece + Flanking Wings convergence ──
        const newsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-news-stage',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        newsTl
          .fromTo('.news-stage-header .section-heading', { y: -35, color: '#5a738c', opacity: 0.25 }, { y: 0, color: '#09223a', opacity: 1, duration: 0.32 }, 0)
          .fromTo('.news-opposing-wrapper', { scale: 0.68, y: 65, opacity: 0.18 }, { scale: 1.02, y: 0, opacity: 1, duration: 0.36 }, 0.02)
          .fromTo('.news-wing-prev', { x: -90, opacity: 0, rotate: -6 }, { x: 0, opacity: 0.88, rotate: -3, duration: 0.36 }, 0.06)
          .fromTo('.news-wing-next', { x: 90, opacity: 0, rotate: 6 }, { x: 0, opacity: 0.88, rotate: 3, duration: 0.36 }, 0.06)
          .to('.news-opposing-wrapper', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.news-opposing-wrapper', { scale: 0.8, y: -45, opacity: 0.22, duration: 0.32 }, 0.68);

        // ── 4. 5-PHOTO MOSAIC — Aperture expansion + flanking photos converge into Footer handoff ──
        const galTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.media-zigzag-gallery',
            start: 'top 95%',
            end: 'bottom 5%',
            scrub: 0.8,
          },
        });

        galTl
          .fromTo('.gal-stage-header .section-heading', { y: -35, color: '#5a738c', opacity: 0.25 }, { y: 0, color: '#09223a', opacity: 1, duration: 0.32 }, 0)
          .fromTo(
            '.photo-shared-viewport',
            { scale: 0.64, y: 65, clipPath: 'inset(8% 12% 8% 12%)', opacity: 0.2 },
            { scale: 1.02, y: 0, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.36 },
            0
          )
          .fromTo('.photo-mosaic-rail', { x: 100, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.36 }, 0.04)
          .to('.photo-shared-viewport', { scale: 1, y: 0, opacity: 1, duration: 0.32 }, 0.36)
          .to('.photo-shared-viewport', { scale: 0.82, y: -40, opacity: 0.24, duration: 0.32 }, 0.68)
          .to('.photo-mosaic-rail', { x: -65, opacity: 0.24, duration: 0.32 }, 0.68);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.med-uniform-video-card');
        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 24, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.44,
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
  const prevArticle = NEWS_ARTICLES[(newsIndex - 1 + NEWS_ARTICLES.length) % NEWS_ARTICLES.length];
  const nextArticle = NEWS_ARTICLES[(newsIndex + 1) % NEWS_ARTICLES.length];
  const activePhoto = PHOTO_GALLERY[photoIndex];

  return (
    <div ref={pageRef} className="media-root">
      {/* ── 1. MULTI-FRAME CINEMA & PRESS HERO (DISTINCT FROM BLOG HERO) ── */}
      <section className="media-cinema-hero" aria-label="Clinical Cinema Hero">
        <div className="container med-z1">
          <div className="med-hero-split">
            <div className="med-hero-content">
              <div className="med-hero-copy-inner">
                <div className="section-kicker">Clinical Media Library</div>
                <SplitHeading as="h1" className="med-hero-title" text="Cardiology Cinema, Press & Symposia" />
                <p className="med-hero-lead">
                  Procedure explainers, patient recovery stories, national press features, and keynote addresses with Dr. Praveen Chandra at Medanta – The Medicity.
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
                    <span className="med-metric-label">Gallery Stills</span>
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

            {/* Layered Multi-Frame Visual Cluster: 16:9 Theater + Symposium Still + Press Feature */}
            <div className="med-hero-theater-col">
              <div className="med-hero-visual-scrub">
                <div className="med-hero-cluster">
                  <div className="med-hero-inset med-hero-inset-talk" aria-hidden="true">
                    <ResponsiveImage
                      src={DOCTOR.images.speaking}
                      alt=""
                      objectFit="cover"
                      sizes="170px"
                    />
                    <span>Global Faculty</span>
                  </div>

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
                          <ResponsiveImage
                            src={currentHeroVideo.thumbnail}
                            alt={currentHeroVideo.title}
                            priority
                            objectFit="cover"
                            sizes="(max-width: 960px) 92vw, 520px"
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

                  <div className="med-hero-inset med-hero-inset-press" aria-hidden="true">
                    <ResponsiveImage
                      src="/images/newspaper/dr-1-1024x625.webp"
                      fallbackSrc="/images/newspaper/dr-1-1024x625.jpg"
                      alt=""
                      objectFit="cover"
                      sizes="180px"
                    />
                    <span>Times of India Feature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WIDESCREEN VIDEO SPOTLIGHT + MULTI-COLUMN DECK ── */}
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

          <div className="med-video-spotlight-stack">
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
                  <div className="med-graphic-banner-stage">
                    <div className="med-banner-visual">
                      <ResponsiveImage
                        src={MAIN_GRAPHIC_IMAGE_MAP[activeTab] || '/images/illustrations/cardiac-anatomy-bright.webp'}
                        alt={
                          activeTab === 'procedure'
                            ? 'Transcatheter Valve Procedure Illustration'
                            : activeTab === 'patient-story'
                            ? 'Patient Consultation Scene'
                            : activeTab === 'informational'
                            ? 'Doctor Speaking at Symposium'
                            : 'Medical Awards and Media Coverage'
                        }
                        objectFit="contain"
                        sizes="(max-width: 900px) 92vw, 480px"
                      />
                    </div>
                    <div className="med-placeholder-overlay">
                      <span className="med-placeholder-kicker">Interactive Video Hub</span>
                      <h3>Select Any Video Below to Watch</h3>
                      <p>Choose a film from the deck below to view procedural walkthroughs, patient recovery journeys, and clinical talks directly inline.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="med-cards-deck-grid" role="list" aria-label="Video Cards">
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
                      <ResponsiveImage src={vid.thumbnail} alt={vid.title} objectFit="cover" sizes="240px" />
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

      {/* ── 3. BROADSHEET PRESS ARCHIVE WITH FLANKING PREV/NEXT CLIPPING STACK ── */}
      <section className="section media-news-stage" aria-label="Newspaper and News Coverage">
        <div className="container med-z1">
          <div className="stage-header-row news-stage-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ margin: '0 auto', maxWidth: '640px' }}>
              <div className="section-kicker">Press Archive</div>
              <SplitHeading as="h2" className="section-heading" text="Newspaper & National Press" />
              <p className="section-lead" style={{ margin: '0.4rem auto 0' }}>
                Verified newspaper clippings and clinical breakthroughs featured in national dailies.
              </p>
            </div>
          </div>

          <div className="news-opposing-wrapper">
            <div className="news-broadsheet-arena">
              {/* Peeking Previous Clipping Wing */}
              <button
                type="button"
                className="news-wing-card news-wing-prev"
                onClick={() => handleManualNewsChange(-1)}
                aria-label={`Previous article: ${prevArticle.headline}`}
              >
                <ResponsiveImage src={prevArticle.image} alt="" objectFit="cover" sizes="200px" />
                <span>← Prev Feature</span>
              </button>

              {/* Centerpiece Focal Clipping */}
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
                      <ResponsiveImage
                        src={activeArticle.image}
                        alt={activeArticle.headline}
                        objectFit="contain"
                        sizes="(max-width: 900px) 92vw, 720px"
                      />
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
                        <span className="news-drag-hint">Swipe or click adjacent clippings</span>
                        <span className="news-counter-label tabular-nums">
                          {newsIndex + 1} / {NEWS_ARTICLES.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Peeking Next Clipping Wing */}
              <button
                type="button"
                className="news-wing-card news-wing-next"
                onClick={() => handleManualNewsChange(1)}
                aria-label={`Next article: ${nextArticle.headline}`}
              >
                <ResponsiveImage src={nextArticle.image} alt="" objectFit="cover" sizes="200px" />
                <span>Next Feature →</span>
              </button>
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

      {/* ── 4. 5-PHOTO ASYMMETRIC CURATED CLINICAL GALLERY ── */}
      <section className="section media-zigzag-gallery" aria-label="Clinical Photography Archive">
        <div className="container med-z1">
          <div className="stage-header-row gal-stage-header" style={{ marginBottom: '2rem' }}>
            <div>
              <div className="section-kicker">Photo Archive</div>
              <SplitHeading as="h2" className="section-heading" text="Curated Clinical Mosaic" />
            </div>
            <p className="section-lead">
              Select any frame across the mosaic to expand it into full-screen resolution.
            </p>
          </div>

          <div className="photo-mosaic-layout">
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
                    <ResponsiveImage
                      src={activePhoto.src}
                      alt={activePhoto.title}
                      objectFit="contain"
                      sizes="(max-width: 900px) 92vw, 760px"
                    />
                    <div className="photo-shared-overlay">
                      <span className="photo-shared-cat">{activePhoto.category}</span>
                      <h3>{activePhoto.title}</h3>
                      <p>{activePhoto.caption}</p>
                      <span className="photo-zoom-tag">Open full resolution ↗</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="photo-mosaic-rail">
              {PHOTO_GALLERY.map((p, idx) => (
                <button
                  key={p.src}
                  type="button"
                  className={`photo-mosaic-tile ${idx === photoIndex ? 'is-active' : ''}`}
                  onClick={() => setPhotoIndex(idx)}
                  aria-label={`Show photo ${idx + 1}: ${p.title}`}
                >
                  <div className="photo-seq-thumb">
                    <ResponsiveImage src={p.src} alt="" objectFit="cover" sizes="240px" />
                  </div>
                  <div className="photo-seq-meta">
                    <span className="photo-seq-cat">{p.category}</span>
                    <span className="photo-seq-label">{p.title}</span>
                  </div>
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
