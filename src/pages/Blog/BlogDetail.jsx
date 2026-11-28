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
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.blog-detail-header', start: 'top 85%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } }
        );
        gsap.fromTo(
          '.blog-article-body',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.blog-detail-stage', start: 'top 85%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } }
        );

        // Sidebar cards
        gsap.fromTo('.blog-sidebar-card', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.blog-detail-stage', start: 'top 85%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-sidebar-card h3', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.blog-detail-stage', start: 'top 85%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-recent-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.blog-detail-stage', start: 'top 85%', end: 'bottom 20%', toggleActions: 'play reverse play reverse' } });

        // Bottom CTA ribbon
        gsap.fromTo('.blog-cta-ribbon', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.blog-cta-ribbon', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-cta-ribbon h2', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.blog-cta-ribbon', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-cta-ribbon p', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.blog-cta-ribbon', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.blog-cta-ribbon .btn-clinical', { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.85, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.blog-cta-ribbon', start: 'top 90%', end: 'bottom 10%', toggleActions: 'play reverse play reverse' } });
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
        {/* Floating Medical Decor — BlogDetail Header */}
        <div className="floating-medical-decor floating-heart floating-heart--gold" style={{ top: '12%', left: '8%', fontSize: '2rem' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ top: '28%', right: '6%' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ bottom: '40%', left: '10%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ top: '45%', right: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ bottom: '30%', right: '18%' }} />
        <div className="floating-pulse-ring" style={{ top: '15%', left: '40%', width: '80px', height: '80px', animation: 'pulseRing 4s ease-in-out infinite' }} />
        <div className="floating-pulse-ring" style={{ bottom: '25%', right: '40%', width: '50px', height: '50px', animation: 'pulseRing 5s ease-in-out infinite 1s' }} />
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
        {/* Floating Medical Decor — BlogDetail Article */}
        <div className="floating-medical-decor floating-heart floating-heart--teal" style={{ top: '8%', left: '8%', fontSize: '2rem' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ top: '25%', right: '6%' }} />
        <div className="floating-medical-decor floating-med-cross" style={{ bottom: '38%', left: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ top: '42%', right: '12%' }} />
        <div className="floating-medical-decor floating-ecg-dot" style={{ bottom: '30%', right: '18%' }} />
        <div className="floating-pulse-ring" style={{ top: '12%', left: '42%', width: '75px', height: '75px', animation: 'pulseRing 4s ease-in-out infinite' }} />
        <div className="floating-pulse-ring" style={{ bottom: '22%', right: '42%', width: '50px', height: '50px', animation: 'pulseRing 5s ease-in-out infinite 1s' }} />
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
        {/* Floating Medical Decor — BlogDetail CTA */}
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
