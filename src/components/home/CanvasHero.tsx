"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

    // 1. Asset Pipeline Preloading
    const imgDay = new Image();
    const imgDusk = new Image();
    const imgNight = new Image();

    imgDay.src = "/hero/house-day.jpeg";
    imgDusk.src = "/hero/house-dusk.jpeg";
    imgNight.src = "/hero/house-night.jpeg";

    let loadedCount = 0;
    const handleLoadComplete = () => {
      loadedCount++;
      if (loadedCount === 3) {
        imagesRef.current = { day: imgDay, dusk: imgDusk, night: imgNight };
        setImagesLoaded(true);
        handleResize();
        renderCanvas(0); // Initial frame paint
      }
    };

    imgDay.onload = handleLoadComplete;
    imgDusk.onload = handleLoadComplete;
    imgNight.onload = handleLoadComplete;
    
    imgDay.onerror = handleLoadComplete;
    imgDusk.onerror = handleLoadComplete;
    imgNight.onerror = handleLoadComplete;

    // 2. Multi-Pass Alpha Blending Logic
    const drawImageCover = (context: CanvasRenderingContext2D, img: HTMLImageElement, canvasWidth: number, canvasHeight: number) => {
      if (!img.complete || img.naturalWidth === 0) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      let renderWidth = canvasWidth;
      let renderHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio < canvasRatio) {
        renderHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - renderHeight) / 2;
      } else {
        renderWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - renderWidth) / 2;
      }
      context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const renderCanvas = (progress: number) => {
      const { day, dusk, night } = imagesRef.current;
      if (!day || !dusk || !night) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Base Layer: Day image is always painted first
      ctx.globalAlpha = 1.0;
      drawImageCover(ctx, day, canvas.width, canvas.height);

      // Phase 1: Transition from Day to Dusk (Progress 0.0 to 0.5)
      if (progress <= 0.5) {
        const duskAlpha = progress / 0.5;
        ctx.globalAlpha = duskAlpha;
        drawImageCover(ctx, dusk, canvas.width, canvas.height);
      } 
      // Phase 2: Transition from Dusk to Full Night (Progress 0.5 to 1.0)
      else {
        // Keep Dusk fully visible as intermediate base
        ctx.globalAlpha = 1.0;
        drawImageCover(ctx, dusk, canvas.width, canvas.height);

        // Blend Night emission layer over it
        const nightAlpha = (progress - 0.5) / 0.5;
        ctx.globalAlpha = nightAlpha;
        drawImageCover(ctx, night, canvas.width, canvas.height);
      }
    };

    // 3. Scroll Management Listener
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (containerRef.current.scrollHeight - window.innerHeight), 0), 1);
      
      requestAnimationFrame(() => renderCanvas(progress));
    };

    // 4. Responsive Aspect-Ratio Scaling
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-trigger scroll paint to prevent blank canvas stretching
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
    <div ref={containerRef} className="relative w-full h-[300vh] bg-brand-slate select-none">
      {/* STICKY WINDOW: Locks view to screen height while scrolling the track */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />
        
        {/* Subtle cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-slate/85 via-brand-slate/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* FOREGROUND CONTENT LAYER: Content fades and shifts past naturally */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        {/* Section 1: Hero Text (Top of Track) */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-center pointer-events-auto">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-paper/90 text-xs font-display font-medium uppercase tracking-widest drop-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-teal" />
              Independent UK Engineering · London Based
            </div>

            <h1 className="text-white font-display font-medium text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tightest uppercase drop-shadow-sm">
              Security Systems,<br />
              <span className="text-brand-teal">Delivered Properly.</span>
            </h1>

            <p className="text-brand-paper/90 font-body font-normal text-base md:text-lg max-w-xl leading-relaxed drop-shadow-sm">
              Most properties buy good hardware but end up with poor results—late installations, messy wiring, and systems nobody maintains. We design, install, and look after your security from start to finish.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/consultation"
                className="bg-brand-teal text-white font-display font-medium text-sm px-8 py-4 rounded-xl hover:bg-[#006666] transition-colors flex items-center gap-2 group shadow-lg shadow-brand-teal/20"
              >
                <span>Book a Scoping Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/system-builder"
                className="bg-brand-paper/95 text-brand-slate border border-brand-grey/30 font-display font-medium text-sm px-8 py-4 rounded-xl hover:border-brand-teal hover:bg-white transition-colors shadow-md"
              >
                Try Interactive Estimator
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Informational Interstitial (Middle of Track) */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 flex items-center justify-end pointer-events-auto">
          <div className="text-white max-w-md space-y-4 drop-shadow-sm">
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
              Continuous Protection
            </span>
            <h2 className="font-display font-medium text-xl md:text-2xl tracking-tight uppercase">
              Impeccable Transitions from Day to Night.
            </h2>
            <p className="font-body font-normal text-xs md:text-sm text-brand-paper/80 leading-relaxed">
              Scroll down to watch our engineered design adapt. As day light turns into nautical twilight, our architectural integrations seamlessly activate interior zones, keyless checkpoints, and exterior security paths automatically.
            </p>
          </div>
        </section>

        {/* Section 3: Value Summary Footer (End of Track) */}
        <section className="h-screen w-full max-w-[1200px] mx-auto px-6 flex flex-col justify-center pointer-events-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-body text-xs text-brand-paper/90 w-full drop-shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span className="font-medium text-white">Full Handover Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span className="font-medium text-white">20+ Years Track Record</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span className="font-medium text-white">Strict Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
              <span className="font-medium text-white">British Safety Standards</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
