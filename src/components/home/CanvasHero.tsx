// src/components/home/CanvasHero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, HardDrive, Cpu } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

export function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapter1Ref = useRef<HTMLElement>(null);
  const chapter2Ref = useRef<HTMLElement>(null);
  const chapter3Ref = useRef<HTMLElement>(null);
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
      
      requestAnimationFrame(() => {
        renderCanvas(progress);

        let o1 = 0, o2 = 0, o3 = 0;
        if (progress <= 0.2) o1 = 1;
        else if (progress <= 0.3) o1 = 1 - (progress - 0.2) / 0.1;
        
        if (progress > 0.3 && progress <= 0.4) o2 = (progress - 0.3) / 0.1;
        else if (progress > 0.4 && progress <= 0.6) o2 = 1;
        else if (progress > 0.6 && progress <= 0.7) o2 = 1 - (progress - 0.6) / 0.1;
        
        if (progress > 0.7 && progress <= 0.8) o3 = (progress - 0.7) / 0.1;
        else if (progress > 0.8) o3 = 1;

        if (chapter1Ref.current) {
          chapter1Ref.current.style.opacity = o1.toString();
          chapter1Ref.current.style.pointerEvents = o1 > 0 ? "auto" : "none";
          if (o1 === 0) {
            chapter1Ref.current.setAttribute("inert", "");
            chapter1Ref.current.setAttribute("aria-hidden", "true");
          } else {
            chapter1Ref.current.removeAttribute("inert");
            chapter1Ref.current.setAttribute("aria-hidden", "false");
          }
        }
        if (chapter2Ref.current) {
          chapter2Ref.current.style.opacity = o2.toString();
          chapter2Ref.current.style.pointerEvents = o2 > 0 ? "auto" : "none";
          if (o2 === 0) {
            chapter2Ref.current.setAttribute("inert", "");
            chapter2Ref.current.setAttribute("aria-hidden", "true");
          } else {
            chapter2Ref.current.removeAttribute("inert");
            chapter2Ref.current.setAttribute("aria-hidden", "false");
          }
        }
        if (chapter3Ref.current) {
          chapter3Ref.current.style.opacity = o3.toString();
          chapter3Ref.current.style.pointerEvents = o3 > 0 ? "auto" : "none";
          if (o3 === 0) {
            chapter3Ref.current.setAttribute("inert", "");
            chapter3Ref.current.setAttribute("aria-hidden", "true");
          } else {
            chapter3Ref.current.removeAttribute("inert");
            chapter3Ref.current.setAttribute("aria-hidden", "false");
          }
        }
      });
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initialize immediately
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    /* 
     * 300VH RUNWAY — Three Full-Screen Chapters
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

        {/* 
         * 3-STAGE NARRATIVE CONTENT OVERLAY:
         * Now positioned absolutely within the sticky track and faded via scroll progress.
         */}
        <div className="absolute inset-0 z-20 max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
          
          {/* CHAPTER 1 (0–100vh): Morning Aesthetics & Planning */}
          <section ref={chapter1Ref} className="absolute inset-x-6 md:inset-x-12 max-w-2xl flex flex-col gap-4 pointer-events-auto transition-opacity duration-150 will-change-opacity">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-white text-xs font-display font-medium uppercase tracking-widest w-fit drop-shadow-md">
              <span className="w-2 h-2 rounded-full bg-brand-teal" />
              Independent UK Engineering · London Based
            </div>

            <h1 className="font-display font-medium text-[clamp(2.75rem,7vw,8.75rem)] w-full leading-[0.92] tracking-[-0.03em] text-white uppercase drop-shadow-md">
              <SplitTextReveal text="Security Systems," />
              <br />
              <SplitTextReveal text="Delivered Properly." className="text-brand-teal" />
            </h1>

            <ProseReveal delay={0.3}>
              <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                Most properties buy good hardware but end up with poor results—late installations, messy wiring, and systems nobody maintains. We design, install, and look after your security from start to finish.
              </p>
            </ProseReveal>

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
          </section>

          {/* CHAPTER 2 (100–200vh): Twilight Automation & Smart Triggers */}
          <section ref={chapter2Ref} inert={true} aria-hidden="true" className="absolute inset-x-6 md:inset-x-12 max-w-2xl ml-auto flex flex-col items-end text-right gap-4 pointer-events-none opacity-0 transition-opacity duration-150 will-change-opacity">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-white text-xs font-display font-medium uppercase tracking-widest w-fit drop-shadow-md">
              <Cpu className="w-3.5 h-3.5 text-brand-teal" />
              <span>Intelligent Building Automation</span>
            </div>
            
            <h2 className="font-display font-medium text-[clamp(2.75rem,7vw,8.75rem)] w-full leading-[0.92] tracking-[-0.03em] text-white uppercase drop-shadow-md">
              <SplitTextReveal text="Invisible By Day." />
              <br />
              <SplitTextReveal text="Vigilant At Dusk." className="text-brand-teal" />
            </h2>
            
            <ProseReveal delay={0.3}>
              <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                As ambient UK daylight fades, our integrated control systems autonomously adapt your property. Exterior perimeter lighting softly illuminates without blinding neighbors, while smart surveillance cameras silently shift into high-contrast night vision modes.
              </p>
            </ProseReveal>

            <div className="pt-2 flex flex-wrap justify-end items-center gap-3 font-display font-medium text-xs drop-shadow-md">
              <span className="px-3 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-brand-paper/90">
                01 · Autonomous Lux Sensors
              </span>
              <span className="px-3 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-brand-paper/90">
                02 · Zero False Alarms
              </span>
            </div>
          </section>

          {/* CHAPTER 3 (200–300vh): Active Night Defense & Local Storage */}
          <section ref={chapter3Ref} inert={true} aria-hidden="true" className="absolute inset-x-6 md:inset-x-12 max-w-2xl flex flex-col gap-4 pointer-events-none opacity-0 transition-opacity duration-150 will-change-opacity">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10 text-white text-xs font-display font-medium uppercase tracking-widest w-fit drop-shadow-md">
              <HardDrive className="w-3.5 h-3.5 text-brand-teal" />
              <span>Active Nighttime Defense</span>
            </div>

            <h2 className="font-display font-medium text-[clamp(2.75rem,7vw,8.75rem)] w-full leading-[0.92] tracking-[-0.03em] text-white uppercase drop-shadow-md">
              <SplitTextReveal text="Total Protection." />
              <br />
              <SplitTextReveal text="Zero Cloud Fees." className="text-brand-teal" />
            </h2>

            <ProseReveal delay={0.3}>
              <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg leading-relaxed drop-shadow-md">
                While your building sleeps, dedicated on-site video recorders capture crystal-clear 4K footage across every critical entry point. Your sensitive security data stays safely inside your property under strict UK GDPR privacy standards—never hosted on external cloud servers.
              </p>
            </ProseReveal>

            <div className="pt-2 flex items-center gap-6 font-display font-medium text-xs drop-shadow-md">
              <span className="flex items-center gap-1.5 text-brand-paper/90 px-3.5 py-1.5 rounded-full bg-brand-slate/80 backdrop-blur-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal shrink-0" /> British Standards Compliant
              </span>
              <Link 
                href="/compliance#sla" 
                className="inline-flex items-center gap-1 text-brand-teal hover:text-white transition-colors duration-150 active:scale-[0.98] group cursor-pointer"
              >
                <span className="underline underline-offset-4">View SLA Guarantee</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
