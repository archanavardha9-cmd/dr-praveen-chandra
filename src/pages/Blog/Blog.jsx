// Blog.jsx – Editorial cardiology knowledge base with publication-collage hero, wide lead spread & scrubbed article grid
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitHeading from '../../components/motion/SplitHeading';
import ResponsiveImage from '../../components/common/ResponsiveImage';
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

  // Separate lead feature from staggered grid when multiple articles exist
  const hasLeadFeature = currentPosts.length > 1;
  const leadPost = hasLeadFeature ? currentPosts[0] : null;
  const gridPosts = hasLeadFeature ? currentPosts.slice(1) : currentPosts;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // ── 1. EDITORIAL CENTERED TYPOGRAPHY HERO — Background image scale + centered typography reveal ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo('.blog-hero-bg img', { scale: 1.05, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' })
          .fromTo('.blog-hero-overlay', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.1)
          .fromTo('.blog-hero-center .section-kicker', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.2)
          .fromTo(
            '.blog-hero-title .split-word-inner',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.055, ease: 'power3.out' },
            0.28
          )
          .fromTo('.blog-hero-lead', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.45)
          .fromTo('.blog-stat-item', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, stagger: 0.08 }, 0.54);

        animateNumericCounters('.blog-stat-num', {
          trigger: '.blog-hero-monument',
          start: 'top 95%',
        });

        gsap.to('.blog-hero-bg img', {
          scale: 1.02,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        // ── HERO — Individual element scroll exit/re-entry (repeatable, not pinned) ──
        const heroHide = gsap.timeline({ paused: true });
        heroHide
          .to('.blog-hero-bg img', { opacity: 0.3, scale: 1.05, duration: 0.5 }, 0)
          .to('.blog-hero-overlay', { opacity: 0.1, duration: 0.5 }, 0)
          .to('.blog-hero-center .section-kicker', { opacity: 0, y: -30, duration: 0.5 }, 0)
          .to('.blog-hero-title .split-word-inner', { opacity: 0, yPercent: -60, duration: 0.6, stagger: 0.03 }, 0.05)
          .to('.blog-hero-lead', { opacity: 0, y: -30, duration: 0.5 }, 0.1)
          .to('.blog-stat-item', { opacity: 0, y: -30, duration: 0.4, stagger: 0.05 }, 0.15);

        ScrollTrigger.create({
          trigger: '.blog-hero-monument',
          start: 'top 85%',
          end: 'bottom top',
          onEnter: () => heroHide.reverse(),
          onLeave: () => heroHide.play(),
          onEnterBack: () => heroHide.reverse(),
          onLeaveBack: () => heroHide.play(),
        });

        gsap.fromTo(
          '.blog-filter-bar',
          { x: -60, opacity: 0.2 },
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

  // Lead editorial banner + staggered grid cards
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        if (document.querySelector('.blog-lead-spread')) {
          gsap.fromTo(
            '.blog-lead-spread',
            { scale: 0.88, y: 40, opacity: 0.2 },
            {
              scale: 1,
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.blog-lead-spread',
                start: 'top 95%',
                end: 'top 52%',
                scrub: 0.7,
              },
            }
          );
        }

        const cards = gsap.utils.toArray('.blog-compact-card');
        cards.forEach((card, i) => {
          const rot = i % 3 === 0 ? -2.2 : i % 3 === 2 ? 2.2 : 0;
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
              { scale: 0.78, y: 55, rotate: rot, opacity: 0.2 },
              { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 0.34, ease: 'power2.out' },
              0
            )
            .to(card, { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 0.38 }, 0.34)
            .to(card, { scale: 0.86, y: -26, opacity: 0.3, duration: 0.28, ease: 'power2.in' }, 0.72);
        });
      }, pageRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [currentPage, selectedCategory]);

  return (
    <div ref={pageRef} className="blog-page-root">
      {/* ── 1. EDITORIAL CENTERED TYPOGRAPHY HERO WITH FEATURED IMAGE ── */}
      <section className="blog-hero-monument" aria-label="Cardiology Insights & Articles">
        <div className="blog-hero-bg" aria-hidden="true">
          <ResponsiveImage
            src="/images/illustrations/coronary-stent-ivl.webp"
            alt="Precision Coronary Interventions"
            priority
            objectFit="cover"
            sizes="100vw"
          />
        </div>
        <div className="blog-hero-overlay"></div>
        <div className="container blog-z1">
          <div className="blog-hero-center">
            <span className="section-kicker">Clinical Monograph & Editorial Archive</span>
            <SplitHeading as="h1" className="blog-hero-title" text="Comprehensive Cardiology Knowledge Base" />
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
      </section>

      {/* ── 2. EDITORIAL LEAD SPREAD + STAGGERED ARTICLE GRID ── */}
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

          {/* Wide Editorial Lead Article (breaks uniform card grid) */}
          {leadPost && (
            <article className="blog-lead-spread">
              <div className="blog-lead-media">
                <ResponsiveImage
                  src={leadPost.image}
                  fallbackSrc="/images/publications/tavi-multidisciplinary-planning.webp"
                  alt={leadPost.title}
                  objectFit="contain"
                  sizes="(max-width: 960px) 92vw, 520px"
                />
              </div>
              <div className="blog-lead-body">
                <div className="blog-compact-meta">
                  <span className="blog-lead-tag">Featured Clinical Guide</span>
                  <span aria-hidden="true">·</span>
                  {leadPost.category && (
                    <>
                      <span className="blog-compact-cat-text">{leadPost.category}</span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span>{leadPost.date}</span>
                </div>
                <h2 className="blog-lead-title">
                  <Link to={`/blog/${leadPost.slug}`}>{leadPost.title}</Link>
                </h2>
                <Link to={`/blog/${leadPost.slug}`} className="btn-clinical btn-clinical--primary">
                  Read Full Monograph →
                </Link>
              </div>
            </article>
          )}

          <div className="blog-compact-grid">
            {gridPosts.map((post) => (
              <article key={post.id} className="blog-compact-card">
                <div className="blog-compact-thumb">
                  <ResponsiveImage
                    src={post.image}
                    fallbackSrc="/images/illustrations/coronary-stent-ivl.webp"
                    alt={post.title}
                    objectFit="contain"
                    sizes="(max-width: 768px) 92vw, 360px"
                  />
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
              className="btn-clinical btn-clinical--light"
            >
              Book Consultation at Medanta ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
