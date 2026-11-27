// useScrollReveal.js – Complete reusable GSAP ScrollTrigger animation system
// Provides varied, premium, repeatable scroll animations for every element type.
// All animations use toggleActions 'play reverse play reverse' so they replay
// every time a section enters/leaves the viewport, in both scroll directions.
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation preset factory. Returns a from/to pair for gsap.fromTo.
const presets = {
  // ── Directional enters ──
  fromLeft: (x = -50) => ({ from: { opacity: 0, x }, to: { opacity: 1, x: 0 } }),
  fromRight: (x = 50) => ({ from: { opacity: 0, x }, to: { opacity: 1, x: 0 } }),
  fromTop: (y = -40) => ({ from: { opacity: 0, y }, to: { opacity: 1, y: 0 } }),
  fromBottom: (y = 40) => ({ from: { opacity: 0, y }, to: { opacity: 1, y: 0 } }),

  // ── Scale + position combines ──
  scaleUp: (scale = 0.85, y = 30) => ({
    from: { opacity: 0, scale, y },
    to: { opacity: 1, scale: 1, y: 0 },
  }),
  scaleDownPop: (scale = 1.15, y = -20) => ({
    from: { opacity: 0, scale, y },
    to: { opacity: 1, scale: 1, y: 0 },
  }),

  // ── Diagonal / split directional ──
  fromBottomLeft: (x = -40, y = 50) => ({ from: { opacity: 0, x, y }, to: { opacity: 1, x: 0, y: 0 } }),
  fromBottomRight: (x = 40, y = 50) => ({ from: { opacity: 0, x, y }, to: { opacity: 1, x: 0, y: 0 } }),
  fromTopLeft: (x = -40, y = -40) => ({ from: { opacity: 0, x, y }, to: { opacity: 1, x: 0, y: 0 } }),
  fromTopRight: (x = 40, y = -40) => ({ from: { opacity: 0, x, y }, to: { opacity: 1, x: 0, y: 0 } }),

  // ── Mask / clip-path reveal ──
  clipTop: () => ({
    from: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    to: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  }),
  clipBottom: () => ({
    from: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  }),
  clipLeft: () => ({
    from: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  }),
  clipRight: () => ({
    from: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    to: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  }),

  // ── Fade only (minimal, for subtle elements) ──
  fade: () => ({ from: { opacity: 0 }, to: { opacity: 1 } }),
};

// Trigger start/end presets per section position
const triggerDefaults = { start: 'top 85%', end: 'bottom 12%' };

export function useScrollReveal({
  preset = 'fromBottom',
  duration = 0.8,
  delay = 0,
  stagger = 0,
  ease = 'power3.out',
  start = triggerDefaults.start,
  end = triggerDefaults.end,
  toggleActions = 'play reverse play reverse',
  scrub = false,
  scrubDuration = 1,
  once = false,
} = {}) {
  const elsRef = useRef(null);
  const cfgRef = useRef({ preset, duration, delay, stagger, ease, start, end, toggleActions, scrub, scrubDuration, once });

  useEffect(() => {
    const root = elsRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cfg = cfgRef.current;
        const p = presets[cfg.preset]?.() || presets.fromBottom();

        const baseTo = {
          ...cfg.to || p.to,
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
            ...p.from,
            ...p.to,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: cfg.scrubDuration,
            },
          });
          return;
        }

        if (cfg.stagger && stagger > 0) {
          const children = gsap.utils.toArray(root.children);
          if (children.length) {
            gsap.fromTo(children, p.from, {
              ...baseTo,
              stagger: cfg.stagger,
            });
          } else {
            gsap.fromTo(root, p.from, baseTo);
          }
        } else {
          gsap.fromTo(root, p.from, baseTo);
        }
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return elsRef;
}

// Ref-based version for animating a single element by selector or ref
export function useScrollElement({
  selector,
  preset = 'fromBottom',
  duration = 0.8,
  delay = 0,
  stagger = 0,
  ease = 'power3.out',
  start = triggerDefaults.start,
  end = triggerDefaults.end,
  toggleActions = 'play reverse play reverse',
  scrub = false,
  once = false,
} = {}) {
  const elRef = useRef(null);
  const cfgRef = useRef({ preset, duration, delay, stagger, ease, start, end, toggleActions, scrub, once });

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cfg = cfgRef.current;
        const target = selector ? document.querySelectorAll(selector) : elRef.current ? [elRef.current] : [];
        if (!target.length) return;

        const p = presets[cfg.preset]?.() || presets.fromBottom();

        const baseTo = {
          ...cfg.to || p.to,
          duration: cfg.duration,
          delay: cfg.delay,
          ease: cfg.ease,
          scrollTrigger: {
            trigger: target,
            start: cfg.start,
            end: cfg.end,
            toggleActions: cfg.once ? 'play none none none' : cfg.toggleActions,
          },
        };

        if (cfg.scrub) {
          gsap.to(target, {
            ...p.from,
            ...p.to,
            ease: 'none',
            scrollTrigger: {
              trigger: target,
              start: 'top bottom',
              end: 'bottom top',
              scrub: cfg.scrubDuration || 1,
            },
          });
          return;
        }

        gsap.fromTo(target, p.from, {
          ...baseTo,
          stagger: cfg.stagger && stagger > 0 ? stagger : 0,
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return elRef;
}

// Group stagger: animate multiple elements with staggered scroll triggers
export function useScrollStagger({
  selector = '.reveal-child',
  preset = 'fromBottom',
  duration = 0.7,
  stagger = 0.1,
  delay = 0,
  ease = 'power3.out',
  start = triggerDefaults.start,
  end = triggerDefaults.end,
  toggleActions = 'play reverse play reverse',
  once = false,
} = {}) {
  const containerRef = useRef(null);
  const cfgRef = useRef({ selector, preset, duration, stagger, delay, ease, start, end, toggleActions, once });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cfg = cfgRef.current;
        const targets = container.querySelectorAll(cfg.selector);
        if (!targets.length) return;

        const p = presets[cfg.preset]?.() || presets.fromBottom();

        gsap.fromTo(targets, p.from, {
          ...p.to,
          duration: cfg.duration,
          delay: cfg.delay,
          ease: cfg.ease,
          stagger: cfg.stagger,
          scrollTrigger: {
            trigger: container,
            start: cfg.start,
            end: cfg.end,
            toggleActions: cfg.once ? 'play none none none' : cfg.toggleActions,
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return containerRef;
}

// Section background reveal: fades in background layer when section enters
export function useScrollBackground({
  selector = '.sec-bg-layer',
  duration = 1,
  delay = 0.1,
  start = 'top 90%',
  end = 'bottom 20%',
  toggleActions = 'play reverse play reverse',
} = {}) {
  const sectionRef = useRef(null);
  const cfgRef = useRef({ selector, duration, delay, start, end, toggleActions });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cfg = cfgRef.current;
        const layers = section.querySelectorAll(cfg.selector);
        if (!layers.length) return;

        gsap.fromTo(layers, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: cfg.duration,
          delay: cfg.delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: cfg.start,
            end: cfg.end,
            toggleActions: cfg.toggleActions,
          },
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return sectionRef;
}

export default useScrollReveal;
export { presets, triggerDefaults };
