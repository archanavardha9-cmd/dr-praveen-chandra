// SplitHeading.jsx – Accessible word-by-word masked heading primitive for GSAP reveals
export default function SplitHeading({
  as = 'h2',
  text,
  className = '',
  style,
}) {
  const Tag = as;
  const words = String(text).trim().split(/\s+/);

  return (
    <Tag className={`split-heading ${className}`.trim()} style={style} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="split-word-mask" aria-hidden="true">
          <span className="split-word-inner">{word}</span>
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
