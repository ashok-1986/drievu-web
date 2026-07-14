import Lenis from "lenis";

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (prefersReduced.matches) return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    lerp: 0.08,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", () => {
    if (typeof window !== "undefined") {
      const { ScrollTrigger } = require("gsap/ScrollTrigger");
      ScrollTrigger.update();
    }
  });

  return lenis;
}