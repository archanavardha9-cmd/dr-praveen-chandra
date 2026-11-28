// Footer.jsx – Clean bright institutional footer with scroll animations
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
        gsap.fromTo('.footer-brand-col', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-wordmark', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-role-line', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-bio-brief', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.85, delay: 0.25, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-fellowship-line', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-col-heading', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-link-list li', { opacity: 0, x: -25, y: 15 }, { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-contact-dl > div', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-bottom-bar', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-legal', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
        gsap.fromTo('.footer-disclaimer', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.site-footer', start: 'top 92%', end: 'bottom 5%', toggleActions: 'play reverse play reverse' } });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <footer className="site-footer" role="contentinfo" ref={footerRef}>
      <div className="container">
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
                <span key={f.short}>
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
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav-col">
            <h3 className="footer-col-heading">Specializations</h3>
            <ul className="footer-link-list">
              {TREATMENT_LINKS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h3 className="footer-col-heading">Medanta OPD & Contact</h3>
            <dl className="footer-contact-dl">
              <div>
                <dt>Location</dt>
                <dd>{CONTACT_INFO.hospital}, Sector 38, Gurugram 122001</dd>
              </div>
              <div>
                <dt>Coordinator</dt>
                <dd className="tabular-nums">
                  <a href={`tel:${CONTACT_INFO.phones[0]}`}>{CONTACT_INFO.phones[0]}</a>
                  <span aria-hidden="true"> · </span>
                  <a href={`tel:${CONTACT_INFO.phones[1]}`}>{CONTACT_INFO.phones[1]}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
                </dd>
              </div>
              <div>
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
