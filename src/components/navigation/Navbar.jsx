// Navbar.jsx – Clean 3-zone Top Bar Contract with bright frost surface
import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CONTACT_INFO } from '../../data/doctorData';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Treatments', path: '/treatments' },
  { label: 'Media', path: '/media' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 24 : false));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-navbar-inner">
          {/* Zone 1: Logo-style cardiology brand mark + wordmark */}
          <Link
            to="/"
            className="nav-brand"
            onClick={() => setMenuOpen(false)}
            aria-label="Dr. Praveen Chandra — Home"
          >
            <span className="nav-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
                <defs>
                  <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0a74b8" />
                    <stop offset="100%" stopColor="#097c7c" />
                  </linearGradient>
                </defs>
                <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="url(#brandGrad)" />
                <path
                  d="M20 27.5c-4.2-3.1-7-5.7-7-9.1a3.9 3.9 0 0 1 7-2.3 3.9 3.9 0 0 1 7 2.3c0 3.4-2.8 6-7 9.1Z"
                  fill="rgba(255,255,255,0.18)"
                  stroke="#ffffff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <polyline
                  className="nav-brand-ecg"
                  points="6,20.5 13,20.5 16,14.5 19.5,26 23,17.5 25.5,20.5 34,20.5"
                  stroke="#ffffff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="nav-brand-text">
              <span className="nav-brand-name">Dr. Praveen Chandra</span>
              <span className="nav-brand-sub">Interventional Cardiology</span>
            </span>
          </Link>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="nav-desktop-links" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-text-link${isActive ? ' is-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Single primary CTA */}
          <div className="nav-action-zone">
            <a
              href={CONTACT_INFO.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-book-btn"
            >
              Book Appointment
            </a>

            <button
              type="button"
              className={`nav-mobile-toggle${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="mobile-drawer-panel" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `mobile-drawer-link${isActive ? ' is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <a
            href={CONTACT_INFO.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-cta"
            onClick={() => setMenuOpen(false)}
          >
            Book Appointment
          </a>
        </nav>
      </div>
    </>
  );
}
