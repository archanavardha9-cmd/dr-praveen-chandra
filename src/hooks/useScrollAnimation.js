// useScrollAnimation.js – Reversible GSAP scroll animation utilities
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 32 },
      to = { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      start = 'top 86%',
      end = 'bottom 12%',
      once = false,
    } = optionsRef.current;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return ref;
};

export const useParallax = (speed = 0.25) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to(el, {
          yPercent: -25 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [speed]);

  return ref;
};

export default useScrollAnimation;
