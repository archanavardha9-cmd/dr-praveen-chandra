// BlogDetail.jsx – Dedicated full-length article detail page preserving exact clinical prose with ResponsiveImage & scroll choreography
import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitHeading from '../../components/motion/SplitHeading';
import ResponsiveImage from '../../components/common/ResponsiveImage';
import { BLOG_POSTS } from '../../data/blogData';
import { DOCTOR, CONTACT_INFO } from '../../data/doctorData';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

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
        const headerMount = gsap.timeline();
        headerMount
          .fromTo('.blog-breadcrumbs', { x: -90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out' })
          .fromTo('.blog-detail-header .section-kicker', { x: -75, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.08)
          .fromTo(
            '.blog-detail-title .split-word-inner',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.72, stagger: 0.048, ease: 'power3.out' },
            0.16
          )
          .fromTo('.blog-detail-meta-bar', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.58, ease: 'power3.out' }, 0.42);

        gsap.to('.blog-detail-header-inner', {
          y: -24,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: '.blog-detail-header',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });

        if (document.querySelector('.blog-hero-image-frame')) {
          const heroImgTl = gsap.timeline({
            scrollTrigger: {
              trigger: '.blog-hero-image-frame',
              start: 'top 95%',
              end: 'bottom 5%',
              scrub: 0.8,
            },
          });
          heroImgTl
            .fromTo('.blog-hero-image-frame', { scale: 0.72, y: 45, opacity: 0.2 }, { scale: 1.02, y: 0, opacity: 1, duration: 0.36 }, 0)
            .to('.blog-hero-image-frame', { scale: 1, y: 0, opacity: 1, duration: 0.34 }, 0.36)
            .to('.blog-hero-image-frame', { scale: 0.86, y: -30, opacity: 0.3, duration: 0.3 }, 0.7);
        }

        gsap.fromTo(
          '.blog-sidebar',
          { x: 90, opacity: 0.2 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.blog-detail-stage',
              start: 'top 92%',
              end: 'top 45%',
              scrub: 0.75,
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

      ScrollTrigger.refresh();
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
            <SplitHeading as="h1" className="blog-detail-title" text={post.title} />

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
            <article className="blog-article-body">
              {post.image && (
                <div className="blog-hero-image-frame">
                  <div className="blog-hero-image-mask media-reveal-mask">
                    <ResponsiveImage
                      src={post.image}
                      fallbackSrc="/images/illustrations/coronary-stent-ivl.webp"
                      alt={post.title}
                      priority
                      objectFit="contain"
                      sizes="(max-width: 960px) 92vw, 760px"
                    />
                  </div>
                </div>
              )}

              {/* Exact unedited HTML directly as published on drpraveenchandra.com */}
              <div
                className="blog-exact-content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>

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
              className="btn-clinical btn-clinical--light"
            >
              Schedule Consultation ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
