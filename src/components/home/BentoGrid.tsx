"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Flame, Radio, Cpu, ArrowRight } from "lucide-react";
import { TactileLink } from "@/components/motion/MotionPrimitives";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

export function BentoGrid() {
  const bentoRef = useRef<HTMLDivElement>(null);

  // GSAP bento entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = bentoRef.current?.querySelectorAll("[data-bento-card]");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          clearProps: "all",
        }
      );
    }, bentoRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: "lighting",
      title: "Intelligent Lighting & Shading",
      desc: "Automated architectural lighting scenes and motorized window blinds. Flush-mounted wall keypads replace banks of messy light switches, wired directly to a central distribution board.",
      icon: Cpu,
      href: "/systems/lighting",
      // Large Top Left: 7 cols
      spanClasses: "col-span-12 lg:col-span-7",
      bgClasses: "bg-gradient-to-br from-brand-slate to-brand-slate/90 text-brand-paper",
      iconBg: "bg-brand-teal/20 text-brand-teal border border-brand-teal/30",
      titleColor: "text-brand-paper",
      descColor: "text-brand-mist",
      isDark: true,
    },
    {
      id: "climate",
      title: "Climate & Energy Control",
      desc: "Room-by-room temperature scheduling and real-time solar monitoring. Heats and cools automatically based on occupancy, slashing wasted energy without manual tweaking.",
      icon: Flame,
      href: "/systems/climate",
      // Top Right: 5 cols
      spanClasses: "col-span-12 lg:col-span-5",
      bgClasses: "bg-brand-teal-500/5 border border-brand-teal-500/15 text-brand-slate",
      iconBg: "bg-brand-teal-500/10 text-brand-teal-500 border border-brand-teal-500/20",
      titleColor: "text-brand-slate",
      descColor: "text-brand-grey",
      isDark: false,
    },
    {
      id: "media",
      title: "Concealed Sound & Media",
      desc: "High-fidelity architectural ceiling speakers and invisible living room cinema audio. Zero bulky black speakers or trailing cords—clean acoustic engineering driven by a centralized rack.",
      icon: Radio,
      href: "/systems/media",
      // Bottom Left: 5 cols
      spanClasses: "col-span-12 lg:col-span-5",
      bgClasses: "bg-brand-teal-600/5 border border-brand-teal-600/15 text-brand-slate",
      iconBg: "bg-brand-teal-600/10 text-brand-teal-600 border border-brand-teal-600/20",
      titleColor: "text-brand-slate",
      descColor: "text-brand-grey",
      isDark: false,
    },
    {
      id: "security",
      title: "Perimeter & Access Security",
      desc: "Weather-proof outdoor cameras, flush-mounted video intercoms, and keyless gate entry. 30 days of continuous local video storage with zero monthly cloud subscriptions and 100% privacy.",
      icon: Shield,
      href: "/systems/security",
      // Bottom Right: 7 cols
      spanClasses: "col-span-12 lg:col-span-7",
      bgClasses: "bg-brand-teal-900/5 border border-brand-teal-900/15 text-brand-slate",
      iconBg: "bg-brand-teal-deep/10 text-brand-teal-deep border border-brand-teal-deep/20",
      titleColor: "text-brand-slate",
      descColor: "text-brand-grey",
      isDark: false,
    },
  ];

  return (
    <section className="w-full min-h-screen bg-brand-paper py-20 lg:py-28 px-6 md:px-12 flex flex-col justify-center border-b border-brand-grey/20 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto w-full space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
              The 4-Pillar Taxonomy
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate ">
              Everything Your Building Needs.
            </h2>
          </div>
          <p className="font-body font-normal text-base text-brand-grey max-w-md ">
            We package the smart home offering into four distinct engineering disciplines. Everything runs on clean, structured cabling with centralized processing—guaranteeing instant response times.
          </p>
        </div>

        {/* Proportional Grid Container */}
        <div ref={bentoRef} className="grid grid-cols-12 gap-6 auto-rows-auto pb-8 md:pb-0">
          {services.map((sys, index) => {
            const IconComponent = sys.icon;
            return (
              <TactileLink
                key={sys.id}
                href={sys.href}
                variant="ghost"
                data-bento-card
                className={`group relative ${sys.spanClasses} rounded-3xl p-6 md:p-8 lg:p-8 transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl active:scale-[0.97] flex flex-col justify-between overflow-hidden ${sys.bgClasses}`}
              >
                {/* Top Row: Icon Badge & Arrow Indicator */}
                <div className="flex items-start justify-between gap-4 z-10 mb-8">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-brand-slate mb-4 lg:mb-6 ${sys.iconBg}`}>
                    <IconComponent className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-[background-color,color,transform] duration-250 transform group-hover:translate-x-1 ${sys.isDark ? "bg-white/10 text-white group-hover:bg-brand-teal" : "bg-brand-mist/60 text-brand-slate/80 group-hover:bg-brand-teal-deep group-hover:text-white"}`}>
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                </div>

                {/* Bottom Row: Typography & Description */}
                <div className="space-y-3 z-10 mt-auto">
                  <h3 className="m-0 p-0 block">
                    <SplitTextReveal text={sys.title} delay={0.15 + index * 0.06} charStagger={0.012} className={`font-display font-medium text-xl md:text-2xl  transition-colors ${sys.titleColor} ${sys.isDark ? "group-hover:text-brand-teal" : "group-hover:text-brand-teal-deep"}`} />
                  </h3>
                  <ProseReveal delay={0.25 + index * 0.06} className="w-full">
                    <p className={`font-body font-normal text-xs md:text-sm  max-w-xl ${sys.descColor}`}>
                      {sys.desc}
                    </p>
                  </ProseReveal>
                </div>
              </TactileLink>
            );
          })}
        </div>

        {/* Bottom Handoff Assurance */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-brand-mist/80 font-body text-xs text-brand-grey">
          <span>British Standards Compliant Engineering</span>
          <span>Zero Sales Fluff · Direct Principal Consultation</span>
          <TactileLink
            href="/consultation"
            variant="ghost"
            size="sm"
            className="text-brand-teal-deep hover:underline flex items-center gap-1 font-medium"
          >
            <span>Book a Scoping Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </TactileLink>
        </div>

      </div>
    </section>
  );
}