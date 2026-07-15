"use client";

import Link from "next/link";
import { ArrowRight, Shield, Lock, Flame, Radio, Cpu } from "lucide-react";
import { CanvasHero } from "@/components/home/CanvasHero";
import { ScrollReveal, TactileLink } from "@/components/motion/MotionPrimitives";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";
import { BentoGrid } from "@/components/home/BentoGrid";

export default function HomePage() {
  const workProcess = [
    { step: "01", name: "Listen", desc: "We discuss your property, safety concerns, and budget in plain English." },
    { step: "02", name: "Plan", desc: "We map out camera spots and wiring so nothing looks messy or out of place." },
    { step: "03", name: "Select", desc: "We provide high-quality, reliable equipment proven to last in the UK." },
    { step: "04", name: "Install", desc: "Our engineers fit and wire everything neatly with minimal disruption." },
    { step: "05", name: "Handover", desc: "We test every sensor and give you a simple guide on how to use your app." },
    { step: "06", name: "Support", desc: "We check your systems annually to ensure they never fail when you need them." },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HIGH-PERFORMANCE APPLE 5K SCROLL CANVAS HERO */}
      <CanvasHero />

      {/* 2. CORE CAPABILITIES — BENTO GRID */}
      <BentoGrid />

      {/* 3. VERIFIED INFRASTRUCTURE METRICS SECTION */}
      <ScrollReveal direction="up">
        <section className="py-24 px-6 max-w-[1200px] mx-auto w-full relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
                Leadership Track Record
              </span>
              <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tighter">
                <SplitTextReveal text="Delivered at Major Scale." />
              </h2>
              <ProseReveal delay={0.3}>
                <p className="font-body font-normal text-brand-slate/85 text-base leading-relaxed">
                  Drievu was founded in London by a leadership team with more than two decades of experience delivering security and building systems across some of the most demanding infrastructure sites globally.
                </p>
              </ProseReveal>
              
              <div className="bg-brand-mist p-5 rounded-xl border-l-4 border-brand-teal font-body text-xs text-brand-grey leading-relaxed font-mono">
                <strong>DUE DILIGENCE NOTE:</strong> National-infrastructure projects listed inside our full profile were delivered by members of Drievu's leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482).
              </div>

              <TactileLink href="/track-record" variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                View Verified Leadership Portfolio
              </TactileLink>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <TactileLink href="/track-record" variant="ghost" className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left hover:border-brand-teal/40 transition-colors">
                <span className="font-display font-medium text-5xl text-brand-slate mb-2 block">18+</span>
                <span className="font-display font-medium text-sm text-brand-slate block mb-1">Landmark Projects</span>
                <span className="font-body font-normal text-xs text-brand-grey">Stadiums, metros, airports & infrastructure.</span>
              </TactileLink>
              
              <TactileLink href="/track-record" variant="ghost" className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left hover:border-brand-teal/40 transition-colors">
                <span className="font-display font-medium text-5xl text-brand-slate mb-2 block">20+</span>
                <span className="font-display font-medium text-sm text-brand-slate block mb-1">Years Track Record</span>
                <span className="font-body font-normal text-xs text-brand-grey">Executive engineering leadership.</span>
              </TactileLink>

              <TactileLink href="/track-record" variant="ghost" className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left hover:border-brand-teal/40 transition-colors">
                <span className="font-display font-medium text-5xl text-brand-teal mb-2 block">5</span>
                <span className="font-display font-medium text-sm text-brand-slate block mb-1">Core Pillars</span>
                <span className="font-body font-normal text-xs text-brand-grey">CCTV, Access, Fire, Audio, Automation.</span>
              </TactileLink>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. METHODOLOGY & CONVERSION SURFACE */}
      <section className="bg-brand-slate text-brand-paper py-24 px-6 relative z-30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-display font-medium text-xs text-brand-green uppercase tracking-widest block mb-2">
              Our Simple Process
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white tracking-tighter mb-4">
              <SplitTextReveal text="How We Deliver Without Stress." />
            </h2>
            <ProseReveal delay={0.3}>
              <p className="font-body font-normal text-brand-grey text-sm md:text-base">
                We never rush into selling you equipment. We take the time to understand your building first, install everything neatly, and show you exactly how it works.
              </p>
            </ProseReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {workProcess.map((step, index) => (
              <ScrollReveal key={step.name} delay={index * 0.08} direction="up">
                <TactileLink href="/consultation" variant="ghost" className="flex flex-col items-start lg:items-center lg:text-center group bg-transparent p-0">
                  <div className="w-14 h-14 rounded-full bg-brand-slate border-2 border-brand-teal text-white font-display font-medium text-base flex items-center justify-center mb-6">
                    {step.step}
                  </div>
                  <h3 className="font-display font-medium text-lg text-white mb-2">
                    {step.name}
                  </h3>
                  <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                    {step.desc}
                  </p>
                </TactileLink>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal text-white py-20 px-6 text-center relative z-30">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            Ready To Upgrade Your Property?
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tighter mb-6">
            <SplitTextReveal text="Let's Talk About Your Building." />
          </h2>
          <ProseReveal delay={0.3}>
            <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
              Whether you manage a residential block, a commercial office, or an industrial facility, get an honest engineering assessment and a clear quote without sales pressure.
            </p>
          </ProseReveal>
          <TactileLink
            href="/consultation"
            variant="secondary"
            size="lg"
            className="shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Your Requirement Form
          </TactileLink>
        </div>
      </section>
    </div>
  );
}