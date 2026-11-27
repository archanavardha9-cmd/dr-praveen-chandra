// useScrollAnimation.js – Centralized, repeatable GSAP ScrollTrigger animation system
// Single source of truth for all scroll reveals. No `once: true` – every animation
// plays/reverses/replays whenever its element enters or leaves the viewport.
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Reveal presets – varied, premium, non-repetitive compositions     */
/* ------------------------------------------------------------------ */
export const REVEAL_PRESETS = {
  // Bottom-to-top rise
  fadeUp: {
    from: { opacity: 0, y: 48 },
    to: { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' },
  },
  // Top-to-bottom fall
  fadeDown: {
    from: { opacity: 0, y: -48 },
    to: { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' },
  },
  // Left-to-right entry
  fadeLeft: {
    from: { opacity: 0, x: 56 },
    to: { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' },
  },
  // Right-to-left entry
  fadeRight: {
    from: { opacity: 0, x: -56 },
    to: { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' },
  },
  // Rise with scale (pop)
  fadeUpScale: {
    from: { opacity: 0, y: 34, scale: 0.86 },
    to: { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
  },
  // Mask / clip-path reveal from top
  clipTop: {
    from: { opacity: 0, clipPath: 'inset(62% 0 0 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 0.85, ease: 'power3.out' },
  },
  // Mask / clip-path reveal from bottom
  clipBottom: {
    from: { opacity: 0, clipPath: 'inset(0 0 62% 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 0.85, ease: 'power3.out' },
  },
  // Diagonal left-to-right
  diagonalLeft: {
    from: { opacity: 0, x: -56, y: 44 },
    to: { opacity: 1, x: 0, y: 0, duration: 0.82, ease: 'power3.out' },
  },
  // Diagonal right-to-left
  diagonalRight: {
    from: { opacity: 0, x: 56, y: -44 },
    to: { opacity: 1, x: 0, y: 0, duration: 0.82, ease: 'power3.out' },
  },
  // Softer float up
  floatUp: {
    from: { opacity: 0, y: 64 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
  },
  // Back-out pop
  popIn: {
    from: { opacity: 0, scale: 0.82, y: 22 },
    to: { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' },
  },
};

const DEFAULTS = {
  start: 'top 78%',
  end: 'bottom 20%',
  toggleActions: 'play reverse play reverse',
  once: false,
};

/**
 * useScrollAnimation
 * animations: array of {
 *   ref | selector | triggerRef, preset, from, to, duration, delay, stagger, ease,
 *   start, end, toggleActions, once, ...scrollTrigger overrides
 * }
 * scopeRef: element used to scope gsap context + selector queries
 */
export function useScrollAnimation(animations = [], deps = [], options = {}, scopeRef = null) {
  const ctxRef = useRef(null);
  const {
    once = DEFAULTS.once,
    start = DEFAULTS.start,
    end = DEFAULTS.end,
    toggleActions = DEFAULTS.toggleActions,
  } = options;

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        animations.forEach((anim) => {
          const {
            ref, selector, triggerRef, preset, duration, delay, stagger, ease, from, to,
            ...rest
          } = anim;

          let target = null;
          if (ref && ref.current) target = ref.current;
          else if (selector) target = selector;
          else if (triggerRef && triggerRef.current) target = triggerRef.current;
          if (!target) return;

          const p = preset ? REVEAL_PRESETS[preset] : {};
          const fromObj = from !== undefined ? from : p.from || { opacity: 0, y: 40 };
          const baseTo = p.to || { opacity: 1, y: 0 };
          const toObj = {
            ...baseTo,
            ...to,
            duration: duration !== undefined ? duration : p.to ? p.to.duration : 0.72,
            ease: ease !== undefined ? ease : p.to ? p.to.ease : 'power3.out',
          };
          if (delay !== undefined) toObj.delay = delay;
          if (stagger !== undefined) toObj.stagger = stagger;

          const triggerElement = (triggerRef && triggerRef.current) ||
            (rest.triggerElement ? rest.triggerElement.current : null) ||
            (ref ? ref.current : null);

          toObj.scrollTrigger = {
            trigger: triggerElement || undefined,
            start: rest.start ?? start,
            end: rest.end ?? end,
            toggleActions:
              rest.once === true || once === true ? 'play none none none' : toggleActions,
            ...(rest.scrollTrigger || {}),
          };

          gsap.fromTo(target, fromObj, toObj);
        });
      }, scopeRef);

      ctxRef.current = ctx;
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, /* eslint-disable react-hooks/exhaustive-deps */ deps /* eslint-enable */);

  return ctxRef;
}

/* Scroll-gated background / particle wrapper: reveals on section enter, reverses on exit */
export function useScrollBackground(ref, options = {}) {
  const {
    start = 'top 85%',
    end = 'bottom 20%',
    toggleActions = 'play reverse play reverse',
    from = { opacity: 0, y: 16, scale: 0.96 },
    to = { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: { trigger: el, start, end, toggleActions },
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [start, end, toggleActions]);
}

/* Continuous scrubbed parallax (kept for decorative layers) */
export function useParallax(speed = 0.25) {
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
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [speed]);

  return ref;
}

/* Reposition all ScrollTriggers after route change / dynamic content mount */
export function refreshScrollTriggers() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

export default useScrollAnimation;
