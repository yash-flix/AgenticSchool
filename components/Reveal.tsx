"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-in wrapper. `.reveal` starts at opacity 0 and only becomes visible
 * once this adds `.in`, so the one thing it must never do is fail to add it.
 *
 * On a client-side navigation the whole page mounts with its top sections
 * already on screen, and leaving that to an IntersectionObserver callback left
 * the arriving page blank. Anything already in the viewport at mount is now
 * revealed synchronously; the observer only handles what is below the fold.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.style.animationDelay = `${delay}ms`;
      el.classList.add("in");
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    io.observe(el);

    // Content must never be left permanently invisible, whatever happens above.
    const failsafe = window.setTimeout(show, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
