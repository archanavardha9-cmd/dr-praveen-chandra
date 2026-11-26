// Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

const APPOINTMENT_URL =
  'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Dr. Praveen', path: '/about' },
  { label: 'Treatments & Expertise', path: '/treatments' },
  { label: 'Media & Videos', path: '/media' },
  { label: 'Contact', path: '/contact' },
];

const TREATMENT_LINKS = [
  { label: 'TAVI / TAVR', path: '/treatments#tavi' },
  { label: 'MitraClip & Mitral Valve', path: '/treatments#mitraclip' },
  { label: 'Coronary Angioplasty', path: '/treatments#angioplasty' },
  { label: 'Acute MI Angioplasty', path: '/treatments#acute-mi' },
  { label: 'Balloon Mitral Valvuloplasty', path: '/treatments#bmv' },
  { label: 'Peripheral Vascular', path: '/treatments#peripheral' },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-bg-glow" aria-hidden="true" />

      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">🫀</div>
            <div className="footer-logo-text">
              <span className="footer-logo-name">Dr. Praveen Chandra</span>
              <span className="footer-logo-award">Padma Shri 2016 · Chairman, Interventional Cardiology</span>
            </div>
          </div>
          <p className="footer-desc">
            One of India's most distinguished interventional cardiologists, pioneering transformative
            cardiac treatments at Medanta – The Medicity, Gurugram. India's first TAVI, MitraClip,
            and laser revascularization procedures.
          </p>
          <div className="footer-fellowships">
            {['FACC', 'FESC', 'FSCAI', 'FAPSIC', 'FCSI'].map((f) => (
              <span key={f} className="fellowship-badge">{f}</span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-col-title">Quick Links</h3>
          <ul className="footer-links">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div className="footer-col">
          <h3 className="footer-col-title">Treatments</h3>
          <ul className="footer-links">
            {TREATMENT_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-col-title">Contact</h3>
          <div className="footer-contact-items">
            <div className="footer-contact-item">
              <span className="contact-icon">🏥</span>
              <div>
                <span className="contact-label">Hospital</span>
                <span className="contact-value">Medanta – The Medicity, Sector 38, Gurugram, Haryana 122001</span>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <span className="contact-label">Appointment</span>
                <span className="contact-value">
                  <a href="tel:+919958872855">+91-99588-72855</a><br />
                  <a href="tel:+919717289363">+91-97172-89363</a>
                </span>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">
                  <a href="mailto:praveen.chandra@medanta.org">praveen.chandra@medanta.org</a>
                </span>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">🚑</span>
              <div>
                <span className="contact-label">Emergency</span>
                <span className="contact-value"><a href="tel:1068">1068</a> (24/7)</span>
              </div>
            </div>
          </div>
          <a
            href={APPOINTMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-appointment-btn"
          >
            🫀 Book Appointment
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} <span>Dr. Praveen Chandra</span>. All Rights Reserved.
          Medanta – The Medicity, Gurugram.
        </p>
        <p className="footer-disclaimer">
          Medical information on this website is for educational purposes only. 
          Please consult a qualified physician for medical advice.
        </p>
      </div>
    </footer>
  );
}
