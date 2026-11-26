// AppointmentButton.jsx – Reusable appointment CTA button
import './AppointmentButton.css';

const APPOINTMENT_URL =
  'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra';

export default function AppointmentButton({
  variant = 'primary',
  size = 'md',
  label = 'Book Appointment',
  className = '',
  showIcon = true,
  showPulse = false,
}) {
  return (
    <a
      href={APPOINTMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`appt-btn appt-btn--${variant} appt-btn--${size} ${className}`}
      aria-label={`${label} at Medanta – opens in new tab`}
    >
      {showPulse && <span className="appt-pulse" aria-hidden="true" />}
      {showIcon && <span className="appt-icon" aria-hidden="true">🫀</span>}
      <span className="appt-label">{label}</span>
      <span className="appt-arrow" aria-hidden="true">→</span>
    </a>
  );
}
