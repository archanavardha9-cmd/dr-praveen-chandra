// BlogDetail.jsx – Dedicated full-length article detail page rendering exact original HTML
import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import SectionBackground from '../../components/backgrounds/SectionBackground';
import { BLOG_POSTS } from '../../data/blogData';
import { DOCTOR, CONTACT_INFO } from '../../data/doctorData';
import './Blog.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const pageRef = useRef(null);

  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug && p.id !== slug).slice(0, 4);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.blog-detail-header-inner',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.blog-article-body',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' }
        );
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div ref={pageRef} className="blog-detail-root">
      {/* ── 1. ARTICLE HEADER ── */}
      <header className="blog-detail-header" aria-label="Article Details">
        <SectionBackground variant="telemetry-grid" opacity={0.4} />
        <div className="container blog-z1">
          <div className="blog-detail-header-inner">
            <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blog">Blog</Link>
              <span>/</span>
              <span>{post.category || 'Article'}</span>
            </nav>

            <span className="section-kicker">{post.category || 'Cardiology Clinical Monograph'}</span>
            <h1 className="blog-detail-title">{post.title}</h1>

            <div className="blog-detail-meta-bar">
              <div className="blog-author-chip">
                <img
                  src={DOCTOR.images.profile}
                  alt={DOCTOR.name}
                  className="blog-author-avatar"
                />
                <div>
                  <div className="blog-author-name">{DOCTOR.name}</div>
                  <div className="blog-author-role">{DOCTOR.title}</div>
                </div>
              </div>

              <div className="blog-card-meta" style={{ margin: 0 }}>
                <span>Published: {post.date}</span>
                <span>·</span>
                <span>Medanta – The Medicity, Gurugram</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. EXACT ORIGINAL ARTICLE CONTENT + SIDEBAR ── */}
      <section className="section blog-detail-stage">
        <div className="container blog-z1">
          <div className="blog-detail-layout">
            {/* Main Longform Article: Exact Raw HTML from Official Source */}
            <article className="blog-article-body">
              {post.image && (
                <div className="blog-hero-image-frame">
                  <img src={post.image} alt={post.title} loading="eager" />
                </div>
              )}

              {/* Exact unedited HTML directly as published on drpraveenchandra.com */}
              <div
                className="blog-exact-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              <div className="blog-sidebar-card">
                <h3>About Dr. Praveen Chandra</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {DOCTOR.bio}
                </p>
                <a
                  href={CONTACT_INFO.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clinical btn-clinical--primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Book Consultation ↗
                </a>
              </div>

              <div className="blog-sidebar-card">
                <h3>Related Articles</h3>
                <div className="blog-recent-list">
                  {otherPosts.map((op) => (
                    <Link key={op.id} to={`/blog/${op.slug}`} className="blog-recent-item">
                      <h4>{op.title}</h4>
                      <span className="blog-recent-date">{op.date} · {op.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM CTA ── */}
      <section className="blog-cta-ribbon" aria-label="Book Consultation">
        <div className="container">
          <div className="blog-cta-inner">
            <div>
              <h2>Consult with Padma Shri Dr. Praveen Chandra</h2>
              <p>Specialist outpatient evaluations &amp; angiogram second opinions at Medanta – The Medicity.</p>
            </div>
            <a
              href={CONTACT_INFO.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-clinical btn-clinical--primary"
            >
              Schedule Consultation ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
