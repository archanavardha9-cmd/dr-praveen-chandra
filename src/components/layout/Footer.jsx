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
        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 98%',
            end: 'bottom 96%',
            scrub: 0.7,
          },
        });

        footerTl
          .fromTo(
            '.footer-brand-col',
            { y: 75, x: -40, opacity: 0.1 },
            { y: 0, x: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.footer-nav-col',
            { y: 90, scale: 0.9, opacity: 0.1 },
            { y: 0, scale: 1, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
            0.06
          )
          .fromTo(
            '.footer-contact-col',
            { y: 80, x: 40, opacity: 0.1 },
            { y: 0, x: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
            0.12
          )
          .fromTo(
            '.footer-bottom-bar',
            { y: 45, opacity: 0.1 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
            0.35
          );
      }, footerRef);
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
