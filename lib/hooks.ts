import { useState, useEffect, useRef } from "react";

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Uses easeOutExpo for a fast start that decelerates — feels satisfying
 * for score reveals because you see it climb fast then settle.
 *
 * `delay` offsets the start so multiple counters can stagger.
 */
export function useCountUp(
  target: number,
  duration = 1200,
  delay = 0
): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Wait for the delay before starting the animation
    const timeout = setTimeout(() => {
      const start = performance.now();

      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutExpo: fast start, slow finish
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(Math.round(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}
