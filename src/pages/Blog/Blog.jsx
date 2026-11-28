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
        // ── 1. EDITORIAL PUBLICATION COLLAGE HERO — Multi-visual layered entrance + float + scroll separation ──
        const heroMount = gsap.timeline();
        heroMount
          .fromTo('.blog-hero-content', { x: -110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.92, ease: 'power3.out' })
          .fromTo(
            '.blog-hero-primary-panel',
            { x: 110, scale: 0.78, rotate: 2, opacity: 0 },
            { x: 0, scale: 1, rotate: 0, opacity: 1, duration: 0.95, ease: 'power3.out' },
            0.06
          )
          .fromTo(
            '.blog-pub-spread-top',
            { x: -65, y: -50, scale: 0.72, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' },
            0.26
          )
          .fromTo(
            '.blog-pub-spread-left',
            { x: -75, y: 55, scale: 0.72, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' },
            0.34
          )
          .fromTo(
            '.blog-pub-spread-bottom',
            { x: 65, y: 55, scale: 0.72, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' },
            0.4
          )
          .fromTo('.blog-hero-content .section-kicker', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.16)
          .fromTo(
            '.blog-hero-title .split-word-inner',
            { yPercent: 125, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.055, ease: 'power3.out' },
            0.22
          )
          .fromTo('.blog-hero-lead', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55 }, 0.44)
          .fromTo('.blog-stat-item', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.48, stagger: 0.08 }, 0.54);

        animateNumericCounters('.blog-stat-num', {
          trigger: '.blog-hero-monument',
          start: 'top 95%',
        });

        gsap.to('.blog-stage-float', {
          y: -8,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.15,
        });
        gsap.to('.blog-pub-spread-top', {
          y: 6,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2,
        });
        gsap.to('.blog-pub-spread-bottom', {
          y: -7,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.3,
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
          .to('.blog-hero-copy-inner', { x: -70, y: -24, opacity: 0.22, ease: 'none' }, 0)
          .to('.blog-hero-visual-scrub', { x: 70, y: -30, scale: 0.85, opacity: 0.22, ease: 'none' }, 0);

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
      {/* ── 1. MULTI-LAYER PUBLICATION COLLAGE HERO ── */}
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

            {/* Layered Editorial Collage replacing lonely right square */}
            <div className="blog-hero-graphic-col">
              <div className="blog-hero-visual-scrub">
                <div className="blog-collage-stage">
                  {/* Top Editorial Spread */}
                  <div className="blog-pub-spread blog-pub-spread-top" aria-hidden="true">
                    <ResponsiveImage
                      src="/images/publications/tavi-multidisciplinary-planning.webp"
                      alt=""
                      objectFit="cover"
                      sizes="180px"
                    />
                    <span>TAVI Planning</span>
                  </div>

                  {/* Left Clinical Spread */}
                  <div className="blog-pub-spread blog-pub-spread-left" aria-hidden="true">
                    <ResponsiveImage
                      src="/images/publications/complex-coronary-disease.webp"
                      alt=""
                      objectFit="cover"
                      sizes="170px"
                    />
                    <span>Complex PCI</span>
                  </div>

                  {/* Centerpiece Graphic */}
                  <div className="blog-stage-float blog-hero-primary-panel">
                    <div className="blog-hero-graphic-frame">
                      <div className="blog-hero-mask media-reveal-mask">
                        <ResponsiveImage
                          src="/images/illustrations/coronary-stent-ivl.webp"
                          alt="Precision Coronary Interventions and Catheter Therapeutics"
                          priority
                          objectFit="contain"
                          sizes="(max-width: 960px) 92vw, 440px"
                        />
                      </div>
                      <div className="blog-hero-graphic-caption">
                        <span>Evidence-Based Structural &amp; Coronary Literature</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Editorial Spread */}
                  <div className="blog-pub-spread blog-pub-spread-bottom" aria-hidden="true">
                    <ResponsiveImage
                      src="/images/publications/cardiovascular-risk-management.webp"
                      alt=""
                      objectFit="cover"
                      sizes="190px"
                    />
                    <span>Preventive Cardiology</span>
                  </div>
                </div>
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
