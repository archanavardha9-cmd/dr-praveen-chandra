// ResponsiveImage.jsx – Intrinsic aspect-ratio / progressive-loading image wrapper (zero CLS)
import { useState } from 'react';

const FALLBACK_IMAGE = '/images/illustrations/coronary-stent-ivl.webp';

export default function ResponsiveImage({
  src,
  fallbackSrc,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  width,
  height,
  aspectRatio,
  objectFit = 'contain',
  style,
  imgStyle,
  onClick,
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const [loadedSrc, setLoadedSrc] = useState(null);

  const resolvedFallback = fallbackSrc || FALLBACK_IMAGE;
  const effectiveSrc = failedSrc === src ? resolvedFallback : src;
  const loaded = loadedSrc === effectiveSrc;

  const handleLoad = () => {
    setLoadedSrc(effectiveSrc);
  };

  const handleError = () => {
    if (failedSrc !== src) {
      setFailedSrc(src);
    }
    setLoadedSrc(resolvedFallback);
  };

  const isLocalWebp =
    typeof effectiveSrc === 'string' &&
    effectiveSrc.startsWith('/images/') &&
    effectiveSrc.endsWith('.webp');

  return (
    <div
      className={`resp-img-wrap ${loaded ? 'is-loaded' : ''} ${className}`.trim()}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style,
      }}
      onClick={onClick}
    >
      <picture className="resp-picture">
        {isLocalWebp && <source srcSet={effectiveSrc} type="image/webp" sizes={sizes} />}
        <img
          src={effectiveSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`resp-img ${imgClassName}`.trim()}
          style={{
            objectFit,
            ...imgStyle,
          }}
        />
      </picture>
    </div>
  );
}
