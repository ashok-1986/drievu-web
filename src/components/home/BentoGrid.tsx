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
      id: "surveillance",
      title: "Smart Cameras & Surveillance",
      desc: "Weather-proof 4K cameras that spot intruders instantly and record crystal-clear footage locally. Enjoy 30 days of continuous security without paying monthly cloud storage fees, fully compliant with UK GDPR privacy rules.",
      icon: Shield,
      href: "/systems/surveillance",
      // Large Hero Feature: Spans 8 cols, 2 rows on desktop
      spanClasses: "col-span-12 md:col-span-12 lg:col-span-8 lg:row-span-2",
      bgClasses: "bg-gradient-to-br from-slate-900 to-slate-800 text-white",
      accent: "bg-slate-900/50",
      iconBg: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
      titleColor: "text-white",
      descColor: "text-slate-300",
      isDark: true,
    },
    {
      id: "access",
      title: "Keyless Door Entry",
      desc: "Manage main gates and secure doors directly from your smartphone. See who is ringing and let staff or deliveries in without cutting physical keys.",
      icon: Lock,
      href: "/systems/access",
      // Medium Top Right Card: Spans 4 cols on desktop
      spanClasses: "col-span-12 md:col-span-6 lg:col-span-4",
      bgClasses: "bg-emerald-950/5 border border-emerald-900/15 text-slate-900",
      accent: "bg-emerald-900/20",
      iconBg: "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
      isDark: false,
    },
    {
      id: "fire",
      title: "Fire & Life Safety",
      desc: "Instant warning sensors for smoke, heat, and water leaks. Engineered strictly to British Safety Standards to protect occupants and property before damage occurs.",
      icon: Flame,
      href: "/systems/fire",
      // Medium Middle Right Card: Spans 4 cols on desktop
      spanClasses: "col-span-12 md:col-span-6 lg:col-span-4",
      bgClasses: "bg-amber-950/5 border border-amber-900/15 text-slate-900",
      accent: "bg-amber-900/20",
      iconBg: "bg-amber-600/10 text-amber-700 border border-amber-600/20",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
      isDark: false,
    },
    {
      id: "communication",
      title: "Intercoms & Sound",
      desc: "Clear two-way audio communication and public announcement speakers designed for residential gates, reception desks, and logistics yards.",
      icon: Radio,
      href: "/systems/communication",
      // Medium Bottom Left Card: Spans 5 cols on desktop
      spanClasses: "col-span-12 md:col-span-6 lg:col-span-5",
      bgClasses: "bg-indigo-950/5 border border-indigo-900/15 text-slate-900",
      accent: "bg-indigo-900/20",
      iconBg: "bg-indigo-600/10 text-indigo-700 border border-indigo-600/20",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
      isDark: false,
    },
    {
      id: "automation",
      title: "Energy & Comfort Control",
      desc: "Intelligent building sensors that quietly turn off heating and lighting in empty zones, trimming up to 30% off your monthly energy waste automatically.",
      icon: Cpu,
      href: "/systems/smart-building",
      // Wide Bottom Right Card: Spans 7 cols on desktop
      spanClasses: "col-span-12 md:col-span-6 lg:col-span-7",
      bgClasses: "bg-teal-950/5 border border-teal-900/15 text-slate-900",
      accent: "bg-teal-900/20",
      iconBg: "bg-teal-600/10 text-teal-700 border border-teal-600/20",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
      isDark: false,
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <ProseReveal delay={0.05}>
              <span className="font-display font-medium text-xs text-teal-700 uppercase tracking-widest block mb-2">
                What We Protect
              </span>
            </ProseReveal>
            <h2 className="m-0 p-0 block">
              <SplitTextReveal text="Everything Your Building Needs." className="font-display font-medium text-3xl md:text-5xl text-slate-900 tracking-tight" />
            </h2>
          </div>
          <ProseReveal delay={0.2}>
            <p className="font-body font-normal text-slate-600 text-sm md:text-base max-w-md leading-relaxed">
              We handle the essential engineering that keeps your property secure, compliant, and energy-efficient—all managed easily from your smartphone or desktop.
            </p>
          </ProseReveal>
        </div>

        {/* Responsive 12-Column Asymmetric Bento Grid */}
        <div ref={bentoRef} className="grid grid-cols-12 gap-6 auto-rows-[minmax(240px,auto)]">
          {services.map((sys, index) => {
            const IconComponent = sys.icon;
            return (
              <TactileLink
                key={sys.id}
                href={sys.href}
                variant="ghost"
                data-bento-card
                className={`group relative ${sys.spanClasses} rounded-3xl p-8 md:p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] flex flex-col justify-between overflow-hidden ${sys.bgClasses}`}
              >
                {/* Subtle background ambient glow on hover */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl group-hover:bg-teal-500/20 transition-all duration-500 pointer-events-none" />
                
                {/* Top Row: Icon Badge & Arrow Indicator */}
                <div className="flex items-start justify-between gap-4 z-10 mb-8">
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-brand-slate mb-4 lg:mb-6 ${sys.accent} ${sys.iconBg}`}>
                    <IconComponent className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 ${sys.isDark ? "bg-white/10 text-white group-hover:bg-teal-500" : "bg-slate-200/60 text-slate-700 group-hover:bg-teal-600 group-hover:text-white"}`}>
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                </div>

                {/* Bottom Row: Typography & Description */}
                <div className="space-y-3 z-10 mt-auto">
                  <h3 className="m-0 p-0 block">
                    <SplitTextReveal text={sys.title} delay={0.15 + index * 0.06} charStagger={0.012} className={`font-display font-medium text-xl md:text-2xl tracking-tight transition-colors ${sys.titleColor} ${sys.isDark ? "group-hover:text-teal-300" : "group-hover:text-teal-700"}`} />
                  </h3>
                  <ProseReveal delay={0.25 + index * 0.06} className="w-full">
                    <p className={`font-body font-normal text-xs md:text-sm leading-relaxed max-w-xl ${sys.descColor}`}>
                      {sys.desc}
                    </p>
                  </ProseReveal>
                </div>
              </TactileLink>
            );
          })}
        </div>

        {/* Bottom Handoff Assurance */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200/80 font-body text-xs text-slate-500">
          <span>British Standards Compliant Engineering</span>
          <span>Zero Sales Fluff · Direct Principal Consultation</span>
          <TactileLink
            href="/consultation"
            variant="ghost"
            size="sm"
            className="text-teal-700 hover:text-teal-800 flex items-center gap-1 font-medium"
          >
            <span>Book a Scoping Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </TactileLink>
        </div>

      </div>
    </section>
  );
}