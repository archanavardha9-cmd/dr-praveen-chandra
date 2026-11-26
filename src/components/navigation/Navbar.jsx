// Navbar.jsx – Premium sticky navigation component
import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Treatments', path: '/treatments' },
  { label: 'Media & Videos', path: '/media' },
  { label: 'Contact', path: '/contact' },
];

const APPOINTMENT_URL =
  'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : (isHome ? 'transparent' : 'inner-page-nav')}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="Dr. Praveen Chandra Home">
            <div className="nav-logo-icon">🫀</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">Dr. Praveen Chandra</span>
              <span className="nav-logo-title">Padma Shri · Cardiologist</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  end={path === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Book Appointment CTA */}
          <a
            href={APPOINTMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            aria-label="Book Appointment at Medanta"
          >
            <span className="nav-cta-pulse" aria-hidden="true" />
            Book Appointment
          </a>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <nav className="mobile-menu-panel" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
          <a
            href={APPOINTMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu-cta"
          >
            🫀 Book Appointment
          </a>
        </nav>
      </div>
    </>
  );
}
