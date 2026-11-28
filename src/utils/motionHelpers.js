// motionHelpers.js – Clean GSAP helpers for numeric counters and timelines
import { gsap } from 'gsap';

/**
 * Animates numeric values on elements containing a number (e.g. "30+", "15,000+", "100%").
 * Keeps exact prefix/suffix/comma formatting untouched.
 */
export function animateNumericCounters(elements, scrollTrigger) {
  const list = gsap.utils.toArray(elements);
  list.forEach((el, idx) => {
    const raw = (el.dataset.targetText || el.textContent || '').trim();
    el.dataset.targetText = raw;

    const match = raw.match(/^(.*?)(\d[\d,]*)(.*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ''), 10);
    if (!Number.isFinite(target) || target <= 0) return;

    const useCommas = numStr.includes(',');
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 1.15,
      delay: idx * 0.08,
      ease: 'power2.out',
      scrollTrigger,
      onUpdate: () => {
        const rounded = Math.round(counter.value);
        const formatted = useCommas ? rounded.toLocaleString('en-US') : String(rounded);
        el.textContent = `${prefix}${formatted}${suffix}`;
      },
    });
  });
}
