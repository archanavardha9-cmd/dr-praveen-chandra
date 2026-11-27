// BlogDetail.jsx – Dedicated full-length article detail page
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
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug && p.id !== slug).slice(0, 3);

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
          '.blog-hero-image-frame',
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.85, delay: 0.15, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.blog-article-content',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' }
        );
      }, pageRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Parse simple markdown into paragraphs & headings
  const renderContent = (contentStr) => {
    const lines = contentStr.trim().split('\n');
    const elements = [];
    let currentParagraph = [];
    let inList = false;
    let listItems = [];

    const flushParagraph = (key) => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${key}`}>{currentParagraph.join(' ')}</p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (key) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${key}`}>
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        flushParagraph(index);
        flushList(index);
        // Skip main h1 since title is already in header
      } else if (trimmed.startsWith('## ')) {
        flushParagraph(index);
        flushList(index);
        elements.push(<h2 key={`h2-${index}`}>{trimmed.replace('## ', '')}</h2>);
      } else if (trimmed.startsWith('### ')) {
        flushParagraph(index);
        flushList(index);
        elements.push(<h3 key={`h3-${index}`}>{trimmed.replace('### ', '')}</h3>);
      } else if (trimmed.startsWith('- ')) {
        flushParagraph(index);
        inList = true;
        listItems.push(trimmed.replace('- ', ''));
      } else if (trimmed === '') {
        flushParagraph(index);
        flushList(index);
      } else {
        if (inList) flushList(index);
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph(lines.length);
    flushList(lines.length);

    return elements;
  };

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
              <span>{post.category}</span>
            </nav>

            <span className="section-kicker">{post.category}</span>
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
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. ARTICLE BODY + SIDEBAR ── */}
      <section className="section blog-detail-stage">
        <div className="container blog-z1">
          <div className="blog-detail-layout">
            {/* Main Longform Article */}
            <article className="blog-article-body">
              <div className="blog-hero-image-frame">
                <img src={post.image} alt={post.title} loading="eager" />
              </div>

              <div className="blog-article-content">
                {renderContent(post.content)}
              </div>
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
                      <span className="blog-recent-date">{op.date} · {op.readTime}</span>
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
              <h2>Consult with Dr. Praveen Chandra</h2>
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
