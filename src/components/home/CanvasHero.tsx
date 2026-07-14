// src/components/home/CanvasHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HardDrive, Cpu } from "lucide-react";

export function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preloads high-resolution architectural assets into memory
  const imagesRef = useRef<{
    day: HTMLImageElement | null;
    dusk: HTMLImageElement | null;
    night: HTMLImageElement | null;
  }>({ day: null, dusk: null, night: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgDay = new Image();
    const imgDusk = new Image();
    const imgNight = new Image();

    imgDay.src = "/hero/house-day.webp";
    imgDusk.src = "/hero/house-dusk.webp";
    imgNight.src = "/hero/house-night.webp";

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 3) {
        imagesRef.current = { day: imgDay, dusk: imgDusk, night: imgNight };
        setImagesLoaded(true);
        handleResize();
        renderCanvas(0);
      }
    };

    imgDay.onload = checkLoaded;
    imgDusk.onload = checkLoaded;
    imgNight.onload = checkLoaded;

    imgDay.onerror = checkLoaded;
    imgDusk.onerror = checkLoaded;
    imgNight.onerror = checkLoaded;

    const drawCoverImage = (img: HTMLImageElement) => {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    // Multi-Pass GPU Alpha Blending across the 300vh runway
    const renderCanvas = (progress: number) => {
      const { day, dusk, night } = imagesRef.current;
      if (!day || !dusk || !night) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base Layer: Day image is always painted first
      ctx.globalAlpha = 1.0;
      drawCoverImage(day);

      // Phase 1 (0.0 to 0.5): Crossfade Day to Dusk
      if (progress <= 0.5) {
        const duskAlpha = progress / 0.5;
        ctx.globalAlpha = duskAlpha;
        drawCoverImage(dusk);
      } 
      // Phase 2 (0.5 to 1.0): Crossfade Dusk to Night Emission
      else {
        ctx.globalAlpha = 1.0;
        drawCoverImage(dusk);

        const nightAlpha = (progress - 0.5) / 0.5;
        ctx.globalAlpha = nightAlpha;
        drawCoverImage(night);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      requestAnimationFrame(() => renderCanvas(progress));
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    /* 
     * RESTORED TO 300VH RUNWAY:
     * Provides generous, uncompressed physical pacing for the day-to-night transition.
     */
    <div ref={containerRef} className="relative w-full h-[300vh] bg-brand-slate select-none">
      
      {/* STICKY CANVAS TRACK */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />
        
        {/* Left-to-Right Scrim guarantees text legibility without clunky white card boxes */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-slate/90 via-brand-slate/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-transparent to-transparent opacity-80 z-10 pointer-events-none" />
      </div>

      {/* 
       * 3-STAGE NARRATIVE CONTENT OVERLAY:
       * Exactly 3 vertically stacked screens (300vh total) to eliminate all empty voids.
       */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        
        {/* CHAPTER 1 (0–100vh): Morning Aesthetics & Planning */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-auto">
          <div className="max-w-2xl space-y-6 pt-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-white text-xs font-display font-medium uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-teal" />
              Independent UK Engineering · London Based
            </div>

            <h1 className="font-display font-medium text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-white uppercase drop-shadow-md">
              Security Systems,<br />
              <span className="text-brand-teal">Delivered Properly.</span>
            </h1>

            <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg max-w-xl leading-relaxed drop-shadow">
              Most properties buy good hardware but end up with poor results—late installations, messy wiring, and systems nobody maintains. We design, install, and look after your security from start to finish.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/consultation"
                className="bg-brand-teal text-white font-display font-medium text-sm px-8 py-4 rounded-xl hover:bg-[#006666] transition-all duration-200 active:scale-[0.98] flex items-center gap-2 group shadow-elevated cursor-pointer"
              >
                <span>Book a Scoping Review</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/system-builder"
                className="bg-brand-slate/80 text-white border border-white/20 backdrop-blur-md font-display font-medium text-sm px-8 py-4 rounded-xl hover:border-brand-teal hover:bg-brand-slate transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Try Interactive Estimator
              </Link>
            </div>
          </div>
        </section>

        {/* CHAPTER 2 (100–200vh): Twilight Automation & Smart Triggers */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-start pointer-events-auto">
          <div className="max-w-xl space-y-4 bg-brand-slate/80 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/10 shadow-elevated">
            <div className="inline-flex items-center gap-2 text-brand-teal font-display font-medium text-xs uppercase tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Intelligent Building Automation</span>
            </div>
            
            <h2 className="font-display font-medium text-2xl md:text-4xl text-white tracking-tight uppercase leading-snug">
              Invisible By Day.<br />
              <span className="text-brand-teal">Vigilant At Dusk.</span>
            </h2>
            
            <p className="font-body font-normal text-sm md:text-base text-brand-paper/90 leading-relaxed">
              As ambient UK daylight fades, our integrated control systems autonomously adapt your property. Exterior perimeter lighting softly illuminates without blinding neighbors, while smart surveillance cameras silently shift into high-contrast night vision modes.
            </p>

            {/* UPGRADED: Clean, tactile UI badges without bracket artifacts */}
            <div className="pt-3 flex flex-wrap items-center gap-3 border-t border-white/10 font-display font-medium text-xs">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-paper/80">
                01 · Autonomous Lux Sensors
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-paper/80">
                02 · Zero False Alarms
              </span>
            </div>
          </div>
        </section>

        {/* CHAPTER 3 (200–300vh): Active Night Defense & Local Storage */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-end pointer-events-auto pb-12">
          <div className="bg-brand-slate/85 backdrop-blur-md text-white p-8 md:p-10 rounded-2xl border border-white/10 max-w-md shadow-elevated space-y-4">
            <div className="inline-flex items-center gap-2 text-brand-teal font-display font-medium text-xs uppercase tracking-widest">
              <HardDrive className="w-4 h-4" />
              <span>Active Nighttime Defense</span>
            </div>

            <h2 className="font-display font-medium text-xl md:text-3xl tracking-tight uppercase leading-snug">
              Total Protection.<br />
              <span className="text-brand-teal">Zero Cloud Fees.</span>
            </h2>

            <p className="font-body font-normal text-xs md:text-sm text-brand-paper/85 leading-relaxed">
              While your building sleeps, dedicated on-site video recorders capture crystal-clear 4K footage across every critical entry point. Your sensitive security data stays safely inside your property under strict UK GDPR privacy standards—never hosted on external cloud servers.
            </p>

            {/* UPGRADED: Clickable Trust CTA wired to Compliance & SLA terms */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between font-display font-medium text-xs">
              <span className="flex items-center gap-1.5 text-brand-paper/90">
                <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" /> British Standards Compliant
              </span>
              <Link 
                href="/compliance#sla" 
                className="inline-flex items-center gap-1 text-brand-teal hover:text-white transition-colors duration-150 active:scale-[0.98] group cursor-pointer"
              >
                <span className="underline underline-offset-4">View SLA Guarantee</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
