// useScrollAnimation.js – Custom hook for GSAP scroll animations
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      trigger = el,
      start = 'top 80%',
      once = true,
    } = options;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useStaggerAnimation = (childSelector = '.stagger-item', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      from = { opacity: 0, y: 50 },
      stagger = 0.15,
      duration = 0.8,
      ease = 'power3.out',
      start = 'top 80%',
    } = options;

    const ctx = gsap.context(() => {
      const children = el.querySelectorAll(childSelector);
      if (!children.length) return;

      gsap.fromTo(
        children,
        from,
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -50 * speed,
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
  }, [speed]);

  return ref;
};

export const useCountUp = (end, options = {}) => {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { duration = 2, start = 0, prefix = '', suffix = '' } = options;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: start };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });

    return () => st.kill();
  }, [end]);

  return ref;
};

export default useScrollAnimation;
