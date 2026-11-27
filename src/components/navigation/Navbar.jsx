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
          {/* Zone 1: Single-element text wordmark */}
          <Link to="/" className="nav-brand-wordmark" onClick={() => setMenuOpen(false)}>
            Dr. Praveen Chandra
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
