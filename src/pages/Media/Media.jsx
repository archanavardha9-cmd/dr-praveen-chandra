// Media.jsx – Dynamic auto-cycling cinema stage, video archive, publications stage & gallery lightbox
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import VideoModal from '../../components/media/VideoModal';
import AppointmentButton from '../../components/common/AppointmentButton';
import { useAutoCycle } from '../../hooks/useAutoCycle';
import {
  MEDIA_VIDEOS,
  PUBLICATIONS_ARTICLES,
  PHOTO_GALLERY,
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

const SPOTLIGHT_VIDEOS = MEDIA_VIDEOS.slice(0, 4);

export default function Media() {
  const spotlightCycle = useAutoCycle(SPOTLIGHT_VIDEOS.length, 6000);
  const pubCycle = useAutoCycle(PUBLICATIONS_ARTICLES.length, 5500);
  const galleryCycle = useAutoCycle(PHOTO_GALLERY.length, 5200);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const pageRef = useRef(null);

  const activeSpotlight = SPOTLIGHT_VIDEOS[spotlightCycle.activeIndex];
  const activePub = PUBLICATIONS_ARTICLES[pubCycle.activeIndex];
  const activePhoto = PHOTO_GALLERY[galleryCycle.activeIndex];

  const filteredVideos =
    activeTab === 'all' ? MEDIA_VIDEOS : MEDIA_VIDEOS.filter((v) => v.type === activeTab);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.med-hero-left',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.med-hero-right',
          { opacity: 0, x: 42 },
          { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.08 }
        );

        gsap.fromTo(
          '.med-archive-row',
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-archive-stage',
              start: 'top 86%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          '.med-pubs-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-pubs-stage',
              start: 'top 85%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          '.med-gal-reveal',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.media-gallery-stage',
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
      {/* ── 1. AUTO-CYCLING SPOTLIGHT VIDEO CINEMA HERO ── */}
      <section className="media-cinema-hero" aria-label="Featured Clinical Cinema">
        <div className="media-hero-wedge" aria-hidden="true" />
        <SectionBackground variant="multimedia-waves" opacity={0.45} />

        <div className="container med-z1">
          <div className="media-cinema-header med-hero-left">
            <div>
              <div className="section-kicker">Media, Videos &amp; Research</div>
              <h1 className="media-main-title">
                Patient Guides, Stories &amp; Clinical Insights
              </h1>
            </div>
            <p className="media-main-lead">
              10 verified clinical videos covering TAVI valve replacement, IVL angioplasty, patient recovery journeys, and preventive guidance.
            </p>
          </div>

          <div className="media-spotlight-grid">
            {/* Left Large 16:9 Cinema Stage */}
            <div className="media-player-col med-hero-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpotlight.id}
                  className="media-stage-box"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="media-stage-poster"
                    onClick={() => setSelectedVideo(activeSpotlight)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedVideo(activeSpotlight);
                      }
                    }}
                    aria-label={`Play video: ${activeSpotlight.title}`}
                  >
                    <img src={activeSpotlight.thumbnail} alt={activeSpotlight.title} loading="eager" />
                    <div className="media-play-ring" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                      </svg>
                    </div>
                  </div>

                  <div className="media-stage-caption">
                    <div>
                      <span className="media-cap-meta">
                        {activeSpotlight.category} · <span className="tabular-nums">{activeSpotlight.duration}</span>
                      </span>
                      <h2>{activeSpotlight.title}</h2>
                      <p>{activeSpotlight.description}</p>
                    </div>
                    <div className="media-cap-actions">
                      <button
                        type="button"
                        className="btn-clinical btn-clinical--primary"
                        onClick={() => setSelectedVideo(activeSpotlight)}
                      >
                        Play Video
                      </button>
                      <a
                        href={`https://www.youtube.com/watch?v=${activeSpotlight.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-clinical btn-clinical--secondary"
                      >
                        YouTube ↗
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Auto-Cycling Spotlight Selector */}
            <div className="media-spotlight-list med-hero-right" role="tablist" aria-label="Spotlight playlist">
              {SPOTLIGHT_VIDEOS.map((vid, idx) => {
                const isActive = spotlightCycle.activeIndex === idx;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`med-spot-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => spotlightCycle.selectIndex(idx)}
                  >
                    <div className="med-spot-thumb">
                      <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                    </div>
                    <div className="med-spot-info">
                      <span className="med-spot-cat">
                        {vid.category} · <span className="tabular-nums">{vid.duration}</span>
                      </span>
                      <h3>{vid.title}</h3>
                      {isActive && (
                        <div className="cycle-progress-track" style={{ marginTop: '0.45rem' }}>
                          <div
                            key={`ms-vid-prog-${spotlightCycle.cycleKey}`}
                            className="cycle-progress-bar"
                            style={{ animationDuration: '6s' }}
                          />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FILTERABLE FULL VIDEO ARCHIVE (OPEN VISUAL ROWS) ── */}
      <section className="section media-archive-stage" aria-label="Complete Video Archive">
        <div className="container med-z1">
          <div className="media-stage-header">
            <div>
              <div className="section-kicker">01 · Full Video Archive</div>
              <h2 className="section-heading">All {MEDIA_VIDEOS.length} Verified Educational Videos</h2>
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

          <div className="media-archive-list">
            {filteredVideos.map((vid, idx) => (
              <article key={vid.id} className="med-archive-row">
                <div
                  className="med-row-poster"
                  onClick={() => setSelectedVideo(vid)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedVideo(vid);
                    }
                  }}
                  aria-label={`Play ${vid.title}`}
                >
                  <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                  <span className="med-row-play" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.5 4.5v11l9-5.5-9-5.5z" />
                    </svg>
                  </span>
                </div>

                <div className="med-row-info">
                  <span className="med-row-meta tabular-nums">
                    0{idx + 1} · {vid.category} · {vid.duration}
                  </span>
                  <h3>{vid.title}</h3>
                  <p>{vid.description}</p>
                </div>

                <div className="med-row-actions">
                  <button
                    type="button"
                    className="btn-clinical btn-clinical--primary"
                    onClick={() => setSelectedVideo(vid)}
                  >
                    Play Video
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-clinical btn-clinical--secondary"
                  >
                    Open in YouTube ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AUTO-CYCLING PUBLICATIONS & INSIGHTS STAGE (LUMINOUS AZURE) ── */}
      <section className="section media-pubs-stage" aria-label="Medical Publications">
        <div className="container med-z1">
          <div className="media-stage-header med-pubs-reveal">
            <div>
              <div className="section-kicker">02 · Clinical Writings &amp; Research</div>
              <h2 className="section-heading">100+ Indexed Papers &amp; Clinical Briefs</h2>
            </div>
            <a
              href="https://drpraveenchandra.com/blogs/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clinical btn-clinical--secondary"
            >
              Visit Official Blog ↗
            </a>
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
                    <a
                      href={activePub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-clinical btn-clinical--primary"
                    >
                      Read Full Brief ↗
                    </a>
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

      {/* ── 4. AUTO-CYCLING PHOTO SHOWCASE & LIGHTBOX ── */}
      <section className="section media-gallery-stage" aria-label="Clinical Photography Showcase">
        <div className="container med-z1">
          <div className="media-stage-header med-gal-reveal">
            <div>
              <div className="section-kicker">03 · Photo Archive</div>
              <h2 className="section-heading">Clinical Practice, Padma Shri &amp; Symposia</h2>
            </div>
            <a
              href={DOCTOR.medantaMediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clinical btn-clinical--secondary"
            >
              Medanta Press Archive ↗
            </a>
          </div>

          <div className="gal-stage-layout med-gal-reveal">
            <div className="gal-focal-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.src}
                  className="gal-focal-inner"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightboxPhoto(activePhoto)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxPhoto(activePhoto);
                    }
                  }}
                  aria-label={`Zoom image: ${activePhoto.title}`}
                >
                  <img src={activePhoto.src} alt={activePhoto.title} loading="lazy" />
                </motion.div>
              </AnimatePresence>

              <div className="gal-focal-caption">
                <div>
                  <span className="gal-cat-mono">{activePhoto.category}</span>
                  <h3>{activePhoto.title}</h3>
                  <p>{activePhoto.caption}</p>
                </div>
                <button
                  type="button"
                  className="btn-clinical btn-clinical--secondary"
                  onClick={() => setLightboxPhoto(activePhoto)}
                >
                  Enlarge ↗
                </button>
              </div>
            </div>

            <div className="gal-strip-grid" role="tablist" aria-label="Select gallery photo">
              {PHOTO_GALLERY.map((photo, idx) => {
                const isActive = galleryCycle.activeIndex === idx;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gal-thumb-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => galleryCycle.selectIndex(idx)}
                  >
                    <div className="gal-thumb-img">
                      <img src={photo.src} alt={photo.title} loading="lazy" />
                    </div>
                    <span>{photo.title}</span>
                    {isActive && (
                      <div className="cycle-progress-track" style={{ marginTop: '0.4rem' }}>
                        <div
                          key={`gal-prog-${galleryCycle.cycleKey}`}
                          className="cycle-progress-bar"
                          style={{ animationDuration: '5.2s' }}
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

      {/* ── 5. COMPACT CTA RIBBON ── */}
      <section className="media-cta-ribbon" aria-label="Schedule Appointment">
        <div className="container">
          <div className="media-cta-flex">
            <div>
              <h2>Consult Dr. Praveen Chandra at Medanta</h2>
              <p>In-person cardiology clinics &amp; remote record evaluations at Sector 38, Gurugram.</p>
            </div>
            <AppointmentButton variant="white" size="lg" label="Book Appointment" />
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      {lightboxPhoto && (
        <div
          className="photo-lightbox-overlay"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
        >
          <div className="photo-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="photo-lightbox-close"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <img src={lightboxPhoto.src} alt={lightboxPhoto.title} />
            <div className="photo-lightbox-meta">
              <h4>{lightboxPhoto.title}</h4>
              <p>{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
