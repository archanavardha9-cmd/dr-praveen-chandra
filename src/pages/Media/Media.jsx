// Media.jsx – Redesigned Cinema Hero, Dynamic Video Hub, Zigzag Photo Archive, Newspaper Coverage & Publications
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import {
  MEDIA_VIDEOS,
  PUBLICATIONS_ARTICLES,
  PHOTO_GALLERY,
  NEWS_ARTICLES,
  DOCTOR,
} from '../../data/doctorData';
import './Media.css';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_TABS = [
  { id: 'all', label: 'All Videos' },
  { id: 'procedure', label: 'Procedure Guides' },
  { id: 'patient-story', label: 'Patient Stories' },
  { id: 'informational', label: 'Doctor Talks' },
  { id: 'media', label: 'Ceremony & Telemedicine' },
];

export default function Media() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const pageRef = useRef(null);

  // Auto-cycle for featured hero spotlight
  const heroCycle = useAutoCycle(MEDIA_VIDEOS.slice(0, 4).length, 6000);
  const currentHeroVideo = MEDIA_VIDEOS.slice(0, 4)[heroCycle.activeIndex];

  const pubCycle = useAutoCycle(PUBLICATIONS_ARTICLES.length, 5500);
  const activePub = PUBLICATIONS_ARTICLES[pubCycle.activeIndex];

  const filteredVideos =
    activeTab === 'all' ? MEDIA_VIDEOS : MEDIA_VIDEOS.filter((v) => v.type === activeTab);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // 1. Media Cinema Hero Entrance
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

        // 2. Video Hub Section Reveals (Reversible)
        gsap.fromTo(
          '.med-hub-featured',
          { opacity: 0, x: -40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
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
        gsap.fromTo(
          '.med-hub-rail',
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
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

        // 3. Newspaper Editorial Archive Reveals (Staggered Bottom Up)
        const newsItems = gsap.utils.toArray('.news-editorial-card');
        newsItems.forEach((item, idx) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 35, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                end: 'bottom 12%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });

        // 4. Zigzag Photo Archive Reveals (Alternating progressive expansion)
        const photoRows = gsap.utils.toArray('.photo-zigzag-item');
        photoRows.forEach((item, idx) => {
          const fromLeft = idx % 2 === 0;
          gsap.fromTo(
            item,
            { opacity: 0, x: fromLeft ? -50 : 50, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 86%',
                end: 'bottom 12%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });

        // 5. Publications Showcase Reveal
        gsap.fromTo(
          '.med-pubs-reveal',
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-pubs-stage',
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

  return (
    <div ref={pageRef} className="media-root">
      {/* ── 1. REDESIGNED CINEMA HERO (HIGH-IMPACT STUDIO THEATER) ── */}
      <section className="media-cinema-hero" aria-label="Clinical Cinema Hero">
        <SectionBackground variant="multimedia-waves" opacity={0.65} />

        <div className="container med-z1">
          <div className="med-hero-split">
            {/* Left Typography & Quick Media Counters */}
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
                  <span className="med-metric-num">100+</span>
                  <span className="med-metric-label">Research Papers</span>
                </div>
                <div className="med-metric-chip">
                  <span className="med-metric-num">5</span>
                  <span className="med-metric-label">National Press Reports</span>
                </div>
              </div>

              <div className="med-hero-actions">
                <button
                  type="button"
                  className="btn-clinical btn-clinical--primary"
                  onClick={() => setSelectedVideo(currentHeroVideo)}
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

            {/* Right Sleek 16:9 Featured Cinema Frame */}
            <div className="med-hero-theater">
              <div
                className="theater-screen-box"
                onClick={() => setSelectedVideo(currentHeroVideo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedVideo(currentHeroVideo);
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
                  onClick={() => setSelectedVideo(currentHeroVideo)}
                  aria-label="Play video"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. REDESIGNED FULL VIDEO ARCHIVE (CREATIVE MEDIA HUB) ── */}
      <section className="section media-archive-stage" id="videos" aria-label="Complete Video Archive">
        <div className="container med-z1">
          <div className="media-stage-header">
            <div>
              <div className="section-kicker">Video Directory</div>
              <h2 className="section-heading">Browse All {MEDIA_VIDEOS.length} Educational Videos</h2>
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

          {/* Asymmetrical Media Hub Layout: Featured Video + Sleek Playlist Rail */}
          <div className="media-hub-grid">
            {/* Left Featured Large Premiere Video */}
            {filteredVideos[0] && (
              <article className="med-hub-featured">
                <div
                  className="hub-featured-poster"
                  onClick={() => setSelectedVideo(filteredVideos[0])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedVideo(filteredVideos[0]);
                    }
                  }}
                  aria-label={`Play: ${filteredVideos[0].title}`}
                >
                  <img
                    src={filteredVideos[0].thumbnail}
                    alt={filteredVideos[0].title}
                    loading="lazy"
                  />
                  <div className="hub-play-circle" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                    </svg>
                  </div>
                  <span className="hub-duration-tag">{filteredVideos[0].duration}</span>
                </div>

                <div className="hub-featured-details">
                  <span className="hub-tag-mono">{filteredVideos[0].category}</span>
                  <h3>{filteredVideos[0].title}</h3>
                  <p>{filteredVideos[0].description}</p>
                  <div className="hub-featured-actions">
                    <button
                      type="button"
                      className="btn-clinical btn-clinical--primary"
                      onClick={() => setSelectedVideo(filteredVideos[0])}
                    >
                      Watch Video
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${filteredVideos[0].youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-clinical btn-clinical--secondary"
                    >
                      YouTube ↗
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* Right Compact Sleek Playlist Rail */}
            <div className="med-hub-rail" role="list" aria-label="Playlist items">
              {filteredVideos.slice(1).map((vid) => (
                <article
                  key={vid.id}
                  className="hub-rail-card"
                  onClick={() => setSelectedVideo(vid)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedVideo(vid);
                    }
                  }}
                  aria-label={`Play: ${vid.title}`}
                >
                  <div className="hub-rail-thumb">
                    <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                    <span className="hub-rail-play" aria-hidden="true">▶</span>
                  </div>
                  <div className="hub-rail-info">
                    <div className="hub-rail-meta">
                      <span className="hub-cat-name">{vid.category}</span>
                      <span className="tabular-nums">{vid.duration}</span>
                    </div>
                    <h4>{vid.title}</h4>
                    <p>{vid.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. AUTHENTIC NEWSPAPER CLIPPINGS PRESS ARCHIVE ── */}
      <section className="section media-news-stage" aria-label="Newspaper and News Coverage">
        <SectionBackground variant="telemetry-grid" opacity={0.25} />

        <div className="container med-z1">
          <div className="stage-header-row" style={{ marginBottom: '2.5rem' }}>
            <div>
              <div className="section-kicker">Press Archive</div>
              <h2 className="section-heading">Newspaper &amp; Media Coverage</h2>
            </div>
            <p className="section-lead">
              Genuine press clippings from leading national publications covering Dr. Praveen Chandra's breakthroughs and honors.
            </p>
          </div>

          <div className="news-clippings-grid">
            {NEWS_ARTICLES.map((article, idx) => {
              const fromLeft = idx % 2 === 0;
              return (
                <article
                  key={article.id}
                  className={`news-clipping-card ${fromLeft ? 'clip-from-left' : 'clip-from-right'} news-editorial-card`}
                  onClick={() => setLightboxPhoto({ src: article.image, title: article.headline, caption: article.source + ' · ' + article.date })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxPhoto({ src: article.image, title: article.headline, caption: article.source + ' · ' + article.date });
                    }
                  }}
                  aria-label={`Enlarge newspaper clipping: ${article.headline}`}
                >
                  <div className="clip-image-frame">
                    <img src={article.image} alt={article.headline} loading="lazy" />
                    <div className="clip-zoom-overlay" aria-hidden="true">
                      <span className="clip-zoom-icon">🔍 Enlarge</span>
                    </div>
                  </div>

                  <div className="clip-meta-strip">
                    <span className="clip-source-badge">{article.source}</span>
                    <span className="clip-date-tag">{article.date}</span>
                    <span className="clip-topic-pill">{article.tag}</span>
                  </div>

                  <div className="clip-caption-area">
                    <h3>{article.headline}</h3>
                    <p>{article.excerpt}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. COMPACT EDITORIAL ZIGZAG PHOTO ARCHIVE ── */}
      <section className="section media-zigzag-gallery" aria-label="Clinical Photography Archive">
        <div className="container med-z1">
          <div className="stage-header-row" style={{ marginBottom: '2.25rem' }}>
            <div>
              <div className="section-kicker">Photo Archive</div>
              <h2 className="section-heading">Clinical Practice &amp; Honors Gallery</h2>
            </div>
            <p className="section-lead">
              Curated photographic record spanning catheterization suites, national investitures, and global faculty symposia.
            </p>
          </div>

          {/* Compact Zigzag Editorial Arrangement */}
          <div className="photo-zigzag-container">
            {PHOTO_GALLERY.map((photo, idx) => {
              const isLandscape = idx % 2 === 0;
              return (
                <div
                  key={photo.src}
                  className={`photo-zigzag-item ${isLandscape ? 'is-landscape' : 'is-portrait'}`}
                  onClick={() => setLightboxPhoto(photo)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxPhoto(photo);
                    }
                  }}
                  aria-label={`Enlarge photo: ${photo.title}`}
                >
                  <div className="photo-zigzag-frame">
                    <img src={photo.src} alt={photo.title} loading="lazy" />
                    <div className="photo-reveal-overlay">
                      <span className="photo-zoom-icon">🔍</span>
                    </div>
                  </div>
                  <div className="photo-zigzag-caption">
                    <span className="photo-cat-mono">{photo.category}</span>
                    <h4>{photo.title}</h4>
                    <p>{photo.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. AUTO-CYCLING PUBLICATIONS & CLINICAL BRIEFS ── */}
      <section className="section media-pubs-stage" aria-label="Medical Publications">
        <div className="container med-z1">
          <div className="media-stage-header med-pubs-reveal">
            <div>
              <div className="section-kicker">Clinical Writings &amp; Research</div>
              <h2 className="section-heading">100+ Indexed Papers &amp; Clinical Briefs</h2>
            </div>
          </div>

          <div className="pubs-split-stage med-pubs-reveal">
            {/* Left Dynamic Uncropped Visual + Article Detail */}
            <div className="pubs-visual-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePub.id}
                  className="pubs-display-panel"
                  initial={{ opacity: 0, x: -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pubs-display-art">
                    <img src={activePub.image} alt={activePub.title} loading="lazy" />
                  </div>
                  <div className="pubs-display-copy">
                    <span className="pubs-meta-mono">
                      {activePub.category} · <span className="tabular-nums">{activePub.readTime}</span>
                    </span>
                    <h3>{activePub.title}</h3>
                    <p>{activePub.excerpt}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Selectable Article Rail */}
            <div className="pubs-list-col" role="tablist" aria-label="Featured articles">
              {PUBLICATIONS_ARTICLES.map((pub, idx) => {
                const isActive = pubCycle.activeIndex === idx;
                return (
                  <button
                    key={pub.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`pub-select-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => pubCycle.selectIndex(idx)}
                  >
                    <div className="pub-row-top">
                      <span>{pub.category}</span>
                      <span className="tabular-nums">{pub.readTime}</span>
                    </div>
                    <h4>{pub.title}</h4>
                    {isActive && (
                      <div className="cycle-progress-track" style={{ marginTop: '0.5rem' }}>
                        <div
                          key={`pub-prog-${pubCycle.cycleKey}`}
                          className="cycle-progress-bar"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
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
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
