import React from "react";
import Image from "next/image";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

export interface PageHeaderProps {
  badgeText?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function PageHeader({ badgeText, title, description, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Scrim Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-slate via-brand-slate/90 to-brand-slate/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 text-center mt-12">
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            {badgeText}
          </div>
        )}

        <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white tracking-[-0.03em] uppercase mb-6">
          <SplitTextReveal text={title} />
        </h1>
        
        <ProseReveal delay={0.15}>
          <p className="font-body font-normal text-brand-paper/90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            {description}
          </p>
        </ProseReveal>
      </div>
    </section>
  );
}
