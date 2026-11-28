// Footer.jsx – Institutional footer with scroll-rise reveal & individual staggered element wave animations
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_INFO, FELLOWSHIPS } from '../../data/doctorData';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Dr. Chandra', path: '/about' },
  { label: 'Treatments & Devices', path: '/treatments' },
  { label: 'Media & Press Archive', path: '/media' },
  { label: 'Cardiology Blog', path: '/blog' },
  { label: 'Contact & OPD', path: '/contact' },
];

const TREATMENT_LINKS = [
  { label: 'TAVI / TAVR', path: '/treatments#tavi' },
  { label: 'MitraClip & TMVR', path: '/treatments#mitraclip' },
  { label: 'Complex & CTO Angioplasty', path: '/treatments#angioplasty' },
  { label: 'Acute MI Emergency PCI', path: '/treatments#acute-mi' },
  { label: 'Balloon Mitral Valvuloplasty', path: '/treatments#bmv' },
  { label: 'Endovascular & Leadless Pacing', path: '/treatments#peripheral' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // 1. Scrubbed architectural rise as the footer enters viewport from bottom
        gsap.fromTo(
          '.footer-rise-wrap',
          { y: 44, scale: 0.985 },
          {
            y: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.site-footer',
              start: 'top 100%',
              end: 'top 64%',
              scrub: 0.65,
            },
          }
        );

        // 2. Top sapphire accent rule expands across from center
        gsap.fromTo(
          '.footer-top-accent',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.site-footer',
              start: 'top 94%',
              toggleActions: 'play none none none',
            },
          }
        );

        // 3. Individual staggered wave animation for EVERY element in the footer
        const itemsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        itemsTl
          .fromTo(
            '.footer-wordmark',
            { x: -32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.52, ease: 'power3.out' },
            0
          )
          .fromTo(
            '.footer-role-line',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0.08
          )
          .fromTo(
            '.footer-bio-brief',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: 'power2.out' },
            0.14
          )
          .fromTo(
            '.footer-fellowship-item',
            { y: 14, scale: 0.88, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.36, stagger: 0.055, ease: 'back.out(1.6)' },
            0.22
          )
          .fromTo(
            '.footer-col-heading',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.44, stagger: 0.09, ease: 'power2.out' },
            0.12
          )
          .fromTo(
            '.footer-link-item',
            { x: -16, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.36, stagger: 0.042, ease: 'power2.out' },
            0.22
          )
          .fromTo(
            '.footer-contact-row',
            { x: 22, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.42, stagger: 0.075, ease: 'power2.out' },
            0.26
          )
          .fromTo(
            '.footer-divider-rule',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.7, ease: 'power3.out' },
            0.35
          )
          .fromTo(
            '.footer-legal',
            { x: -22, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0.44
          )
          .fromTo(
            '.footer-disclaimer',
            { x: 22, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0.48
          );
      }, footerRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <footer className="site-footer" role="contentinfo" ref={footerRef}>
      <div className="footer-top-accent" aria-hidden="true" />
      <div className="container footer-rise-wrap">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-wordmark">
              Dr. Praveen Chandra
            </Link>
            <p className="footer-role-line">
              Padma Shri Awardee (2016) · Chairman, Interventional Cardiology · Medanta – The Medicity
            </p>
            <p className="footer-bio-brief">
              Pioneering non-surgical transcatheter valve replacements (TAVI), percutaneous mitral repair (MitraClip), and complex coronary interventions in India.
            </p>
            <div className="footer-fellowship-line">
              {FELLOWSHIPS.map((f, idx) => (
                <span key={f.short} className="footer-fellowship-item">
                  {f.short}
                  {idx < FELLOWSHIPS.length - 1 && <span className="footer-sep" aria-hidden="true"> · </span>}
                </span>
              ))}
            </div>
          </div>

          <div className="footer-nav-col">
            <h3 className="footer-col-heading">Navigation</h3>
            <ul className="footer-link-list">
              {NAV_LINKS.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav-col">
            <h3 className="footer-col-heading">Specializations</h3>
            <ul className="footer-link-list">
              {TREATMENT_LINKS.map((item) => (
                <li key={item.path} className="footer-link-item">
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h3 className="footer-col-heading">Medanta OPD &amp; Contact</h3>
            <dl className="footer-contact-dl">
              <div className="footer-contact-row">
                <dt>Location</dt>
                <dd>{CONTACT_INFO.hospital}, Sector 38, Gurugram 122001</dd>
              </div>
              <div className="footer-contact-row">
                <dt>Coordinator</dt>
                <dd className="tabular-nums">
                  <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a>
                  <span aria-hidden="true"> · </span>
                  <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a>
                </dd>
              </div>
              <div className="footer-contact-row">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </dd>
              </div>
              <div className="footer-contact-row">
                <dt>24/7 Cardiac Emergency</dt>
                <dd className="tabular-nums">
                  <a href={`tel:${CONTACT_INFO.emergencyLine}`} className="footer-emergency-link">
                    Dial {CONTACT_INFO.emergencyLine}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="footer-divider-rule" aria-hidden="true" />

        <div className="footer-bottom-bar">
          <p className="footer-legal">
            © {CURRENT_YEAR} Dr. Praveen Chandra · Medanta – The Medicity, Gurugram.
          </p>
          <p className="footer-disclaimer">
            Clinical content is provided for patient education. Always consult a qualified cardiologist for medical evaluation.
          </p>
        </div>
      </div>
    </footer>
  );
}
