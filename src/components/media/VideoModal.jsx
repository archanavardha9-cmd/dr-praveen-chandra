// VideoModal.jsx – Accessible high-performance video player modal
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

  return (
    <div className="vmodal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={video.title}>
      <div className="vmodal-container" onClick={(e) => e.stopPropagation()}>
        <button className="vmodal-close-btn" onClick={onClose} aria-label="Close video">
          ✕
        </button>
        <div className="vmodal-player-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="vmodal-caption">
          <span className="vmodal-badge">{video.category}</span>
          <h3 className="vmodal-title">{video.title}</h3>
          <p className="vmodal-desc">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
