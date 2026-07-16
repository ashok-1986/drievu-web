"use client";

import React from "react";
import Image from "next/image";
import { ProseReveal } from "@/components/motion/ProseReveal";

interface PageHeaderProps {
  badgeText?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function PageHeader({
  badgeText,
  title,
  description,
  imageSrc,
  imageAlt,
}: PageHeaderProps) {
  return (
    // FIX: Explicitly lock the container to our deep slate background color
    <section className="relative w-full min-h-[60vh] pt-36 pb-20 px-6 md:px-12 flex flex-col justify-center items-start text-left overflow-hidden bg-brand-slate select-none">
      
      {/* LAYER 0: Background Architectural Asset */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center opacity-30 z-0 pointer-events-none select-none"
        sizes="100vw"
      />

      {/* LAYER 1: Deepened Directional Scrim for High-Contrast Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/60 to-brand-slate/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(var(--color-brand-slate)/0.4)_60%,rgb(var(--color-brand-slate)/0.9)_100%)] z-10 pointer-events-none" />

      {/* LAYER 2: High-Contrast White Typography */}
      <div className="relative z-20 max-w-[1200px] w-full mx-auto space-y-6 flex flex-col items-start pointer-events-auto select-none">
        {badgeText && (
          <ProseReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-display font-medium uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              {badgeText}
            </div>
          </ProseReveal>
        )}

        <h1 className="font-display font-medium text-hero w-full text-white uppercase drop-shadow-md">
          {title}
        </h1>

        <ProseReveal delay={0.2}>
          {/* FIX: Swapped out dark text class for high-contrast white over the dark background */}
          <p className="font-body font-normal text-white/90 text-base md:text-lg leading-relaxed prose-text-shadow max-w-2xl block">
            {description}
          </p>
        </ProseReveal>
      </div>
    </section>
  );
}
