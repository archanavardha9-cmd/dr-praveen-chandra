// Blog.jsx – Complete GSAP scroll animation for every section and element
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { BLOG_POSTS } from '../../data/blogData';
import { CONTACT_INFO } from '../../data/doctorData';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const pageRef = useRef(null);

  const categories = ['All', ...new Set(BLOG_POSTS.map((p) => p.category).filter(Boolean))];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. BLOG HERO ──
        gsap.fromTo('.blog-hero-content > *', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-hero-graphic-col', { opacity: 0, scale: 0.92, x: 40 }, { opacity: 1, scale: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Individual hero elements
        gsap.fromTo('.section-kicker', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-hero-title', { opacity: 0, x: -50, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-hero-lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-hero-stats', { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 0.9, delay: 0.35, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        gsap.fromTo('.blog-hero-graphic-frame img', { opacity: 0, scale: 0.8, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-hero-graphic-caption', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        gsap.fromTo('.blog-orbital-1', { opacity: 0, x: 40, rotate: 10 }, { opacity: 1, x: 0, rotate: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-orbital-2', { opacity: 0, x: -40, rotate: -10 }, { opacity: 1, x: 0, rotate: 0, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // Continuous Hero Graphic Parallax & Orbital Float
        gsap.to('.blog-hero-graphic-frame img', { y: -25, scale: 1.05, ease: 'none', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.blog-orbital-1', { yPercent: -40, xPercent: -12, rotation: -3, ease: 'none', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top top', end: 'bottom top', scrub: 0.8 } });
        gsap.to('.blog-orbital-2', { yPercent: 32, xPercent: 10, rotation: 3, ease: 'none', scrollTrigger: { trigger: '.blog-hero-monument', start: 'top top', end: 'bottom top', scrub: 0.8 } });

        // ── 2. BLOG LISTING CARDS ──
        gsap.fromTo('.blog-filter-bar', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.blog-listing-stage', start: 'top 85%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        const cards = gsap.utils.toArray('.blog-compact-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 45, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              delay: (i % 4) * 0.06,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'bottom 12%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });

        // Individual card elements
        gsap.fromTo('.blog-compact-thumb img', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.blog-listing-stage', start: 'top 88%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-compact-cat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.blog-listing-stage', start: 'top 88%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-compact-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.75, delay: 0.18, ease: 'power3.out', scrollTrigger: { trigger: '.blog-listing-stage', start: 'top 88%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-compact-action', { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.28, ease: 'power3.out', scrollTrigger: { trigger: '.blog-listing-stage', start: 'top 88%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' } });

        // ── 3. CTA RIBBON ──
        gsap.fromTo('.blog-cta-ribbon', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.blog-cta-ribbon', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play reverse play reverse' } });
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [currentPage, selectedCategory]);

  return (
    <div ref={pageRef} className="blog-page-root">
      {/* ── 1. TALL, EXPANSIVE PREMIUM BLOG HERO ── */}
      <section className="blog-hero-monument" aria-label="Cardiology Insights & Articles">
        <SectionBackground variant="telemetry-grid" opacity={0.65} />
        {/* Floating Medical Decor — Blog Hero */}
        <div className="floating-medical-decor floating-heart floating-heart--gold" style={{ top: '12%', left: '8%', fontSize: '2.2rem' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ top: '28%', right: '6%' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ bottom: '40%', left: '10%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ top: '45%', right: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ bottom: '30%', right: '18%' }} />
        <div className="floating-pulse-ring" style={{ top: '15%', left: '40%', width: '80px', height: '80px', animation: 'pulseRing 4s ease-in-out infinite' }} />
        <div className="floating-pulse-ring" style={{ bottom: '25%', right: '40%', width: '50px', height: '50px', animation: 'pulseRing 5s ease-in-out infinite 1s' }} />
        <div className="container blog-z1">
          <div className="blog-hero-split-grid">
            <div className="blog-hero-content">
              <span className="section-kicker">Clinical Monograph &amp; Editorial Archive</span>
              <h1 className="blog-hero-title">
                Comprehensive Cardiology Knowledge Base
              </h1>
              <p className="blog-hero-lead">
                Over 50 full-length clinical articles, diagnostic guides, and procedure explainers authored by Padma Shri Dr. Praveen Chandra — exploring TAVI transcatheter aortic valves, MitraClip TEER repair, Intravascular Lithotripsy (IVL), and acute myocardial infarction management at Medanta – The Medicity.
              </p>
              <div className="blog-hero-stats">
                <div className="blog-stat-pill">
                  <span className="blog-stat-num">{BLOG_POSTS.length}+</span>
                  <span className="blog-stat-lbl">Full Articles</span>
                </div>
                <div className="blog-stat-pill">
                  <span className="blog-stat-num">30+ Yrs</span>
                  <span className="blog-stat-lbl">Clinical Insight</span>
                </div>
                <div className="blog-stat-pill">
                  <span className="blog-stat-num">100%</span>
                  <span className="blog-stat-lbl">Original Text</span>
                </div>
              </div>
            </div>

            <div className="blog-hero-graphic-col perspective-stage" style={{ position: 'relative' }}>
              <div className="blog-orbital-1" style={{ position: 'absolute', top: '-14px', right: '-12px', zIndex: 4, pointerEvents: 'none' }}>
                <div className="floating-orbital-badge floating-orbital-badge--gold">
                  <span>📚</span>
                  <span>55 Verified Clinical Monographs</span>
                </div>
              </div>
              <div className="blog-orbital-2" style={{ position: 'absolute', bottom: '45px', left: '-12px', zIndex: 4, pointerEvents: 'none' }}>
                <div className="floating-orbital-badge floating-orbital-badge--teal floating-orbital-badge--alt">
                  <span>🫀</span>
                  <span>Evidence-Based Cardiology</span>
                </div>
              </div>

              <div className="blog-hero-graphic-frame">
                <img
                  src="/images/illustrations/coronary-stent-ivl.webp"
                  alt="Precision Coronary Interventions and Catheter Therapeutics"
                  loading="eager"
                />
                <div className="blog-hero-graphic-caption">
                  <span className="blog-badge-dot" />
                  <span>Evidence-Based Structural &amp; Coronary Clinical Literature</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT BLOG LISTING ── */}
      <section className="section blog-listing-stage" aria-label="All Blog Articles">
        <SectionBackground variant="ecg-monitor" opacity={0.3} />
        {/* Floating Medical Decor — Blog Listing */}
        <div className="floating-medical-decor floating-heart floating-heart--teal" style={{ top: '8%', left: '8%', fontSize: '2rem' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ top: '25%', right: '6%' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ bottom: '38%', left: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ top: '42%', right: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ bottom: '30%', right: '18%' }} />
        <div className="floating-pulse-ring" style={{ top: '12%', left: '42%', width: '75px', height: '75px', animation: 'pulseRing 4s ease-in-out infinite' }} />
        <div className="floating-pulse-ring" style={{ bottom: '22%', right: '42%', width: '50px', height: '50px', animation: 'pulseRing 5s ease-in-out infinite 1s' }} />
        <div className="container blog-z1">
          <div className="blog-filter-bar" role="tablist" aria-label="Filter articles by category">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`blog-filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-compact-grid">
            {currentPosts.map((post) => (
              <article key={post.id} className="blog-compact-card">
                <div className="blog-compact-thumb">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blog-compact-cat">{post.category}</span>
                </div>

                <div className="blog-compact-body">
                  <div className="blog-compact-date">{post.date}</div>
                  <h2 className="blog-compact-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="blog-compact-action">
                    <Link to={`/blog/${post.slug}`} className="btn-read-full">
                      Read Full Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="blog-pagination" aria-label="Blog Pagination">
              <button
                type="button"
                className="pagination-btn"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`pagination-num ${currentPage === num ? 'is-active' : ''}`}
                    onClick={() => {
                      setCurrentPage(num);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-btn"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CONSULTATION CALLOUT ── */}
      <section className="blog-cta-ribbon" aria-label="Schedule Consultation">
        {/* Floating Medical Decor — Blog CTA */}
        <div className="floating-medical-decor floating-heart floating-heart--red" style={{ top: '15%', left: '8%', fontSize: '2rem' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ top: '35%', right: '6%' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ bottom: '45%', left: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ top: '50%', right: '15%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ bottom: '35%', right: '20%' }} />
        <div className="floating-pulse-ring" style={{ top: '20%', left: '42%', width: '75px', height: '75px', animation: 'pulseRing 4s ease-in-out infinite' }} />
        <div className="floating-pulse-ring" style={{ bottom: '25%', right: '40%', width: '50px', height: '50px', animation: 'pulseRing 5s ease-in-out infinite 1s' }} />
        <div className="container">
          <div className="blog-cta-inner">
            <div>
              <h2>Have Questions About a Complex Cardiac Condition?</h2>
              <p>Schedule an outpatient evaluation with Padma Shri Dr. Praveen Chandra at Medanta – The Medicity.</p>
            </div>
            <a
              href={CONTACT_INFO.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clinical btn-clinical--primary"
            >
              Book Consultation at Medanta ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
