// VideoModal.jsx – Bright clinical video player with direct YouTube fallback
import { useEffect } from 'react';
import './VideoModal.css';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!video) return null;

  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className="vmodal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div className="vmodal-card" onClick={(e) => e.stopPropagation()}>
        <div className="vmodal-topbar">
          <div className="vmodal-meta-inline">
            <span>{video.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{video.duration}</span>
          </div>
          <div className="vmodal-topbar-actions">
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vmodal-yt-link"
            >
              Watch on YouTube
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M5 11 11 5m0 0H6.5M11 5v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              className="vmodal-close"
              onClick={onClose}
              aria-label="Close video player"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4.5 4.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="vmodal-player-box">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="vmodal-footer">
          <h3 className="vmodal-heading">{video.title}</h3>
          <p className="vmodal-summary">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
