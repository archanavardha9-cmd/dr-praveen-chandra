// usePremiumAnimation.js – Premium immersive GSAP ScrollTrigger animation system
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PREMIUM_PRESETS = {
  centerRise: {
    from: { opacity: 0, y: 80, scale: 0.75, rotateX: 15 },
    to: { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.1, ease: 'power4.out' },
  },
  sweepLeft: {
    from: { opacity: 0, x: -90, scale: 0.92 },
    to: { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
  },
  sweepRight: {
    from: { opacity: 0, x: 90, scale: 0.92 },
    to: { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
  },
  plungeBottomLeft: {
    from: { opacity: 0, x: -70, y: 70, rotate: -8 },
    to: { opacity: 1, x: 0, y: 0, rotate: 0, duration: 1, ease: 'power4.out' },
  },
  plungeBottomRight: {
    from: { opacity: 0, x: 70, y: 70, rotate: 8 },
    to: { opacity: 1, x: 0, y: 0, rotate: 0, duration: 1, ease: 'power4.out' },
  },
  clipRevealTop: {
    from: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 1, ease: 'power4.out' },
  },
  clipRevealBottom: {
    from: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 1, ease: 'power4.out' },
  },
  clipRevealLeft: {
    from: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 1, ease: 'power4.out' },
  },
  clipRevealRight: {
    from: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)', duration: 1, ease: 'power4.out' },
  },
  floatUp: {
    from: { opacity: 0, y: 56 },
    to: { opacity: 1, y: 0, duration: 0.95, ease: 'power4.out' },
  },
  popIn: {
    from: { opacity: 0, scale: 0.8, y: 30 },
    to: { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.6)' },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.7, ease: 'power3.out' },
  },
  textLine: {
    from: { opacity: 0, y: 22 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
  },
  depthScale: {
    from: { opacity: 0, scale: 0.6, y: 100 },
    to: { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power4.out' },
  },
};

export const TRIGGER_PRESETS = {
  hero: { start: 'top 80%', end: 'bottom 20%' },
  section: { start: 'top 85%', end: 'bottom 12%' },
  sectionLate: { start: 'top 90%', end: 'bottom 10%' },
  card: { start: 'top 88%', end: 'bottom 15%' },
  footer: { start: 'top 92%', end: 'bottom 5%' },
};

export function usePremiumReveal({
  preset = 'floatUp',
  duration,
  delay = 0,
  stagger = 0,
  ease,
  start,
  end,
  toggleActions = 'play reverse play reverse',
  scrub = false,
  scrubDuration = 1,
  once = false,
  fromOverride,
  toOverride,
} = {}) {
  const elRef = useRef(null);
  const cfg = {
    preset,
    duration: duration ?? PREMIUM_PRESETS[preset]?.to?.duration ?? 0.8,
    delay,
    stagger,
    ease: ease ?? PREMIUM_PRESETS[preset]?.to?.ease ?? 'power3.out',
    start: start ?? TRIGGER_PRESETS.section.start,
    end: end ?? TRIGGER_PRESETS.section.end,
    toggleActions,
    scrub,
    scrubDuration,
    once,
    fromOverride,
    toOverride,
  };

  useEffect(() => {
    const root = elRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const p = PREMIUM_PRESETS[cfg.preset] || PREMIUM_PRESETS.floatUp;
        const fromObj = cfg.fromOverride ?? p.from;
        const toObj = {
          ...(cfg.toOverride ?? p.to),
          duration: cfg.duration,
          delay: cfg.delay,
          ease: cfg.ease,
          scrollTrigger: {
            trigger: root,
            start: cfg.start,
            end: cfg.end,
            toggleActions: cfg.once ? 'play none none none' : cfg.toggleActions,
          },
        };
        if (cfg.scrub) {
          gsap.to(root, {
            ...fromObj,
            ...toObj,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: cfg.scrubDuration },
          });
          return;
        }
        if (cfg.stagger && cfg.stagger > 0) {
          const children = gsap.utils.toArray(root.children);
          if (children.length) {
            gsap.fromTo(children, fromObj, { ...toObj, stagger: cfg.stagger });
          } else {
            gsap.fromTo(root, fromObj, toObj);
          }
        } else {
          gsap.fromTo(root, fromObj, toObj);
        }
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return elRef;
}

export function usePremiumStagger({
  selector = '.premium-child',
  preset = 'floatUp',
  duration = 0.75,
  stagger = 0.08,
  delay = 0,
  ease = 'power3.out',
  start = TRIGGER_PRESETS.section.start,
  end = TRIGGER_PRESETS.section.end,
  toggleActions = 'play reverse play reverse',
  once = false,
} = {}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const targets = container.querySelectorAll(selector);
        if (!targets.length) return;
        const p = PREMIUM_PRESETS[preset] || PREMIUM_PRESETS.floatUp;
        gsap.fromTo(targets, p.from, {
          ...p.to,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: container,
            start,
            end,
            toggleActions: once ? 'play none none none' : toggleActions,
          },
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [selector, preset, duration, stagger, delay, ease, start, end, toggleActions, once]);
  return containerRef;
}

export function usePremiumParallax({
  speed = 0.25,
  yPercent = -25,
  scale = 1.05,
  rotate = 0,
  start = 'top bottom',
  end = 'bottom top',
  scrub = 1,
} = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to(el, {
          yPercent,
          scale,
          rotation: rotate,
          ease: 'none',
          scrollTrigger: { trigger: el, start, end, scrub },
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [speed, yPercent, scale, rotate, start, end, scrub]);
  return ref;
}

export function usePremiumFloating({
  y = -12,
  x = 0,
  rotate = 3,
  duration = 4,
  delay = 0,
  ease = 'sine.inOut',
  repeat = -1,
  yoyo = true,
} = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to(el, {
          y,
          x,
          rotation: rotate,
          duration,
          delay,
          ease,
          repeat,
          yoyo,
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [y, x, rotate, duration, delay, ease, repeat, yoyo]);
  return ref;
}

export function usePremiumScrollDraw({
  selector,
  start = 'top 85%',
  end = 'bottom 40%',
  scrub = 0.5,
  toggleActions = 'play reverse play reverse',
} = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const targets = selector ? root.querySelectorAll(selector) : [root];
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { strokeDashoffset: (t) => (t.getTotalLength ? t.getTotalLength() : 800) },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start,
              end,
              scrub,
              toggleActions,
            },
          }
        );
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [selector, start, end, scrub, toggleActions]);
  return ref;
}

export function usePremiumPinned({
  start = 'top top',
  end = '+=100%',
  pinSpacing = true,
  scrub = false,
  anticipatePin = 0,
} = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: el,
          start,
          end,
          pin: true,
          pinSpacing,
          scrub,
          anticipatePin,
        });
      });
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [start, end, pinSpacing, scrub, anticipatePin]);
  return ref;
}

export function refreshScrollTriggers() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

export default usePremiumReveal;