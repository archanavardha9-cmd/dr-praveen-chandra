// Blog.jsx – Editorial cardiology archive with word reveals, counters, curtain masks, and staggered card tilts
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitHeading from '../../components/motion/SplitHeading';
import { animateNumericCounters } from '../../utils/motionHelpers';
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

  // Static page sections: Bold Hero mount + float + scroll-exit, Filter Bar, and Consultation Ribbon
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const heroMount = gsap.timeline();
        heroMount
          .fromTo(
            '.blog-hero-content',
            { x: -120, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.95, ease: 'power3.out' }
          )
          .fromTo(
            '.blog-hero-graphic-col',
            { x: 135, scale: 0.72, rotate: 2.5, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
            0.06
          )
          .fromTo('.blog-hero-content .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0.16)
          .fromTo(
            '.blog-hero-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.055, ease: 'power3.out' },
            0.22
          )
          .fromTo('.blog-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.45)
          .fromTo('.blog-stat-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.58);

        animateNumericCounters('.blog-stat-num', {
          trigger: '.blog-hero-monument',
          start: 'top 95%',
        });

        gsap.to('.blog-stage-float', {
          y: -8,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });

        const heroExit = gsap.timeline({
          scrollTrigger: {
            trigger: '.blog-hero-monument',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
        heroExit
          .to('.blog-hero-copy-inner', { x: -75, y: -24, opacity: 0.2, ease: 'none' }, 0)
          .to('.blog-hero-visual-scrub', { x: 75, y: -32, scale: 0.84, opacity: 0.2, ease: 'none' }, 0);

        gsap.fromTo(
          '.blog-filter-bar',
          { x: -65, opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.blog-listing-stage',
              start: 'top 92%',
              end: 'top 55%',
              scrub: 0.65,
            },
          }
        );

        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.blog-cta-ribbon',
            start: 'top 95%',
            end: 'bottom 10%',
            scrub: 0.75,
          },
        });
        ctaTl
          .fromTo('.blog-cta-inner > div:first-child', { x: -90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .fromTo('.blog-cta-inner .btn-clinical', { x: 90, opacity: 0.15 }, { x: 0, opacity: 1, duration: 0.38 }, 0)
          .to('.blog-cta-inner', { scale: 1, opacity: 1, duration: 0.34 }, 0.38)
          .to('.blog-cta-inner', { scale: 0.9, y: -24, opacity: 0.32, duration: 0.28 }, 0.72);
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Article grid cards: per-card 3-phase scrubbed scale, subtle rotation, plateau, and shrink exit
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.blog-compact-card');
        cards.forEach((card, i) => {
          const rot = i % 3 === 0 ? -2.8 : i % 3 === 2 ? 2.8 : 0;
          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              end: 'bottom 6%',
              scrub: 0.75,
            },
          });

          cardTl
            .fromTo(
              card,
              { scale: 0.76, y: 60, rotate: rot, opacity: 0.18 },
              { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 0.34, ease: 'power2.out' },
              0
            )
            .to(card, { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 0.38 }, 0.34)
            .to(card, { scale: 0.84, y: -28, opacity: 0.28, duration: 0.28, ease: 'power2.in' }, 0.72);
        });
      }, pageRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [currentPage, selectedCategory]);

  return (
    <div ref={pageRef} className="blog-page-root">
      {/* ── 1. CLEAN CLINICAL BLOG HERO ── */}
      <section className="blog-hero-monument" aria-label="Cardiology Insights & Articles">
        <div className="container blog-z1">
          <div className="blog-hero-split-grid">
            <div className="blog-hero-content">
              <div className="blog-hero-copy-inner">
                <span className="section-kicker">Clinical Monograph &amp; Editorial Archive</span>
                <SplitHeading
                  as="h1"
                  className="blog-hero-title"
                  text="Comprehensive Cardiology Knowledge Base"
                />
                <p className="blog-hero-lead">
                  Over 50 clinical articles and procedure guides authored by Padma Shri Dr. Praveen Chandra — covering TAVI aortic valves, MitraClip repair, Intravascular Lithotripsy (IVL), and acute cardiac care at Medanta – The Medicity.
                </p>
                <div className="blog-hero-stats">
                  <div className="blog-stat-item">
                    <span className="blog-stat-num">{BLOG_POSTS.length}+</span>
                    <span className="blog-stat-lbl">Full Articles</span>
                  </div>
                  <div className="blog-stat-item">
                    <span className="blog-stat-num">30+ Yrs</span>
                    <span className="blog-stat-lbl">Clinical Insight</span>
                  </div>
                  <div className="blog-stat-item">
                    <span className="blog-stat-num">100%</span>
                    <span className="blog-stat-lbl">Original Text</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="blog-hero-graphic-col">
              <div className="blog-hero-visual-scrub">
                <div className="blog-stage-float">
                  <div className="blog-hero-graphic-frame">
                    <div className="blog-hero-mask media-reveal-mask">
                      <img
                        src="/images/illustrations/coronary-stent-ivl.webp"
                        alt="Precision Coronary Interventions and Catheter Therapeutics"
                        loading="eager"
                      />
                    </div>
                    <div className="blog-hero-graphic-caption">
                      <span>Evidence-Based Structural &amp; Coronary Clinical Literature</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT BLOG LISTING ── */}
      <section className="section blog-listing-stage" aria-label="All Blog Articles">
        <div className="container blog-z1">
          <div className="blog-filter-bar" role="tablist" aria-label="Filter articles by category">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`blog-filter-tab ${selectedCategory === cat ? 'is-active' : ''}`}
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
                </div>

                <div className="blog-compact-body">
                  <div className="blog-compact-meta">
                    {post.category && (
                      <>
                        <span className="blog-compact-cat-text">{post.category}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span>{post.date}</span>
                  </div>
                  <h2 className="blog-compact-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="blog-compact-action">
                    <Link to={`/blog/${post.slug}`} className="btn-read-full">
                      Read Full Article <span aria-hidden="true">→</span>
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
