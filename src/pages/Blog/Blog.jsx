// Blog.jsx – Full Blog Listing with category filters and rich previews
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { BLOG_POSTS } from '../../data/blogData';
import { CONTACT_INFO } from '../../data/doctorData';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const BLOG_CATEGORIES = [
  'All',
  'Clinical Practice',
  'TAVI & Structural Heart',
  'Coronary Artery Disease',
  'Preventive Cardiology',
  'Patient Guidance',
];

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState('All');
  const pageRef = useRef(null);

  const filteredPosts =
    selectedCat === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCat);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo(
          '.blog-hero-content',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        );

        // Staggered Blog Cards entrance (reversible)
        const cards = gsap.utils.toArray('.blog-listing-card');
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              delay: (i % 3) * 0.1,
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
  }, [selectedCat]);

  return (
    <div ref={pageRef} className="blog-page-root">
      {/* ── 1. BLOG HERO ── */}
      <section className="blog-hero-stage" aria-label="Cardiology Insights & Articles">
        <SectionBackground variant="telemetry-grid" opacity={0.65} />
        <div className="container blog-z1">
          <div className="blog-hero-content">
            <span className="section-kicker">Clinical Insights &amp; Perspectives</span>
            <h1 className="blog-hero-title">Cardiology Blog &amp; Scientific Articles</h1>
            <p className="blog-hero-lead">
              In-depth articles authored by Padma Shri Dr. Praveen Chandra covering cutting-edge catheter therapies, TAVI clinical protocols, multi-vessel PCI, and heart attack prevention strategies.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. BLOG LISTING STAGE ── */}
      <section className="section blog-listing-stage" aria-label="All Blog Articles">
        <SectionBackground variant="ecg-monitor" opacity={0.3} />
        <div className="container blog-z1">
          {/* Category Filter Bar */}
          <div className="blog-filter-bar" role="tablist" aria-label="Filter articles by category">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCat === cat}
                className={`blog-filter-pill ${selectedCat === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-listing-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-media-link">
                  <div className="blog-card-thumb">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="blog-cat-badge">{post.category}</span>
                  </div>
                </Link>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-meta-date">{post.date}</span>
                    <span>·</span>
                    <span className="blog-meta-time">{post.readTime}</span>
                  </div>

                  <h2 className="blog-card-heading">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="blog-card-excerpt">{post.excerpt}</p>

                  <div className="blog-card-footer">
                    <Link to={`/blog/${post.slug}`} className="blog-read-btn">
                      Read Full Article <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CONSULTATION CALLOUT ── */}
      <section className="blog-cta-ribbon" aria-label="Schedule Consultation">
        <div className="container">
          <div className="blog-cta-inner">
            <div>
              <h2>Have Questions About a Specific Heart Procedure?</h2>
              <p>Schedule an evaluation with Dr. Praveen Chandra at Medanta – The Medicity, Gurugram.</p>
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
