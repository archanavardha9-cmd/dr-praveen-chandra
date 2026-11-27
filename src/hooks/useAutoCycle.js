// useAutoCycle.js – Synchronized automatic + manual cycling hook
import { useState, useEffect, useCallback, useRef } from 'react';

export function useAutoCycle(length, intervalMs = 5500) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const timerRef = useRef(null);

  const selectIndex = useCallback(
    (nextIndex) => {
      const normalized = ((nextIndex % length) + length) % length;
      setActiveIndex(normalized);
      setCycleKey((k) => k + 1);
    },
    [length]
  );

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % length);
    setCycleKey((k) => k + 1);
  }, [length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
    setCycleKey((k) => k + 1);
  }, [length]);

  useEffect(() => {
    if (length <= 1) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prevIdx) => (prevIdx + 1) % length);
      setCycleKey((k) => k + 1);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [length, intervalMs, cycleKey]);

  return { activeIndex, cycleKey, selectIndex, next, prev };
}

export default useAutoCycle;
