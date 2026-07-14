import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleReducedMotion = (e: MediaQueryListEvent) => {
    if (e.matches) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.getAll().forEach((st) => st.disable());
    } else {
      gsap.globalTimeline.timeScale(1);
      ScrollTrigger.getAll().forEach((st) => st.enable());
    }
  };
  prefersReduced.addEventListener("change", handleReducedMotion);
  if (prefersReduced.matches) {
    gsap.globalTimeline.timeScale(0);
    ScrollTrigger.getAll().forEach((st) => st.disable());
  }
}

export { gsap, ScrollTrigger };