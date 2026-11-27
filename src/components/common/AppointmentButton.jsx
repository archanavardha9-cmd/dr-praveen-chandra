// AppointmentButton.jsx – Accessible Medanta booking link button
import { CONTACT_INFO } from '../../data/doctorData';
import './AppointmentButton.css';

export default function AppointmentButton({
  variant = 'primary',
  size = 'md',
  label = 'Book Appointment',
  className = '',
}) {
  return (
    <a
      href={CONTACT_INFO.appointmentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`appt-cta appt-cta--${variant} appt-cta--${size} ${className}`}
      aria-label={`${label} at Medanta (opens in new tab)`}
    >
      <span>{label}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="appt-cta-arrow"
      >
        <path
          d="M3.5 8h9m0 0L9 4.5M12.5 8 9 11.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
