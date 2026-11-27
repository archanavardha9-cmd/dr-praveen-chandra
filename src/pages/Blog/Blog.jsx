// Blog.jsx – Expansive Hero, Compact Cards (Title + Read Full Article only), Pagination & GSAP reveals
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

  // Derive unique categories from genuine scraped articles
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
        // Hero entrance
        gsap.fromTo(
          '.blog-hero-content > *',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.blog-hero-graphic-col',
          { opacity: 0, scale: 0.92, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' }
        );

        // Cards entrance (reversible)
        const cards = gsap.utils.toArray('.blog-compact-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 35, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              delay: (i % 3) * 0.08,
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

            {/* Right Rich Medical Graphic Centerpiece */}
            <div className="blog-hero-graphic-col">
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

      {/* ── 2. COMPACT BLOG LISTING (TITLE + READ BUTTON ONLY) ── */}
      <section className="section blog-listing-stage" aria-label="All Blog Articles">
        <SectionBackground variant="ecg-monitor" opacity={0.3} />
        <div className="container blog-z1">
          {/* Category Filter Bar */}
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

          {/* Compact Articles Grid: Title + Button Only */}
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

          {/* Pagination Controls */}
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
