"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Home, PenTool, HardHat } from "lucide-react";
import { ScrollReveal, TactileLink } from "@/components/motion/MotionPrimitives";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

export default function SectorsPage() {
  const [activeSection, setActiveSection] = useState<string>("homeowners");

  // Scroll Spy: Automatically updates active tab as buyer scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["homeowners", "architects", "developers"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Accounts for fixed header + sticky nav clearance
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 12th-Grade Plain English Sector Dictionary (Zero technical jargon)
  const sectorsData = [
    {
      id: "homeowners",
      title: "Private Homeowners",
      tagline: "A smart home so simple anyone can use it.",
      icon: Home,
      problem: "You want luxury and convenience, but you are terrified of complicated technology that fails when guests come over. Traditional smart home kits clog your Wi-Fi and rely on glitchy cloud servers.",
      solution: "One tap on your smartphone or a single wall keypad sets the mood, secures the perimeter, and manages your climate. We build systems that work like infrastructure—invisible, hardwired, and strictly private.",
      proofTitle: "National-Infrastructure Rigor",
      proofDesc: "Our executive team brings the same engineering discipline used in luxury residential towers and landmark commercial developments directly to your private residence.",
      image: "/images/hero-property-dusk.jpg",
      imagePrompt: "Wide architectural shot of a newly completed luxury commercial building exterior at dusk, clean glass facades, professional landscaping, zero clutter --ar 16:9 --style raw",
    },
    {
      id: "architects",
      title: "Architects & Interior Designers",
      tagline: "We engineer invisible technology.",
      icon: PenTool,
      problem: "Tech contractors routinely ruin clean visual lines with ugly thermostats, bulky plastic sensors, and messy ceiling cutouts that clash with your carefully specified finishes.",
      solution: "We provide CAD-ready electrical schematics, flush-mounted architectural sensors, and centralized wiring racks that keep living spaces completely unburdened by hardware. We ensure every piece of technology blends invisibly into your design.",
      proofTitle: "Architectural Integration",
      proofDesc: "We work with you during the early planning stage to map out hidden wiring routes and specify equipment that respects your aesthetic vision.",
      image: "/images/system-surveillance.jpg",
      imagePrompt: "Architectural close-up of a minimalist white flush-mounted camera on a clean concrete gallery ceiling, zero visible wires, interior design focus --ar 16:9 --style raw",
    },
    {
      id: "developers",
      title: "Residential Developers & Builders",
      tagline: "A single accountability partner for all low-voltage building systems.",
      icon: HardHat,
      problem: "You deal with delays, blown budgets, and constant finger-pointing between electricians, heating engineers, and alarm installers on site.",
      solution: "We deliver complete handover packs, documented compliance certificates, and structured cabling that increases gross development value. We specify accurately and install strictly to your construction schedule.",
      proofTitle: "Live UK Delivery Discipline",
      proofDesc: "At our Staines Road commercial estate installation in London, we delivered a 31-camera network and video storage system on schedule with zero tenant disruption.",
      image: "/images/system-automation.jpg",
      imagePrompt: "Exterior of a modern, well-maintained UK brick residential apartment block on a bright day, neat communal entrance with a secure video doorbell panel --ar 16:9 --style raw",
    },
  ];

  const sectorTabs = sectorsData.map((s) => ({
    id: s.id,
    label: s.title.toUpperCase(),
  }));

  return (
    <div className="w-full bg-brand-paper min-h-screen select-none">
      {/* HERO IMAGE — 100vh, 100% width, fixed cover */}
      <section className="relative w-full h-screen max-h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/hero_sector.jpeg"
            alt="Drievu sector engineering — UK architectural security systems"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Single dark gradient overlay for text legibility — no conflicting radial gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-slate/90 via-brand-slate/50 to-transparent" />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              Tailored Engineering Engagement
            </div>

            <h1 className="font-display font-medium text-hero w-full text-center text-white uppercase mb-6">
              <SplitTextReveal text="How We Protect Your Sector." />
            </h1>
            <ProseReveal>
              <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg  prose-text-shadow max-w-2xl mx-auto block">
                We do not force a single boxed product onto every building. Whether you specify new developments, manage day-to-day facilities, or oversee public housing, here is how our consulting-to-maintenance discipline solves your exact problems in plain English.
              </p>
            </ProseReveal>
          </div>
        </div>

        {/* Due Diligence Notice */}
        <div className="absolute bottom-6 right-6 max-w-xs md:max-w-sm p-3.5 rounded-2xl bg-brand-slate/80 backdrop-blur-md border border-white/15 text-brand-paper/85 font-mono text-[11px]  text-left z-20 shadow-elevated pointer-events-auto">
          PROCUREMENT DUE DILIGENCE: National-infrastructure track records referenced below were delivered by members of Drievu&rsquo;s leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482).
        </div>
      </section>

      {/* STICKY SECTOR JUMP NAVIGATION — Capsule filter bar */}
      <section className="bg-brand-mist/90 py-4 px-6 border-b border-brand-grey/15 sticky top-[60px] z-40 backdrop-blur-md shadow-soft">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-full max-w-full flex flex-row items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-4 touch-pan-x overscroll-x-contain select-none">
            <span className="font-display font-medium text-xs text-brand-grey uppercase tracking-widest mx-3 hidden sm:inline shrink-0 whitespace-nowrap">
              Jump To:
            </span>
            {sectorTabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={
                    isActive
                      ? "min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full font-display font-medium text-xs text-white bg-brand-teal border border-brand-teal shadow-md cursor-pointer shrink-0"
                      : "min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full font-display font-medium text-xs text-brand-slate bg-white/80 border border-brand-grey/15 hover:border-brand-teal transition-colors cursor-pointer shadow-sm shrink-0"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 ANCHORED SECTOR SECTIONS */}
      <div className="max-w-[1200px] mx-auto px-6 divide-y divide-brand-grey/15 pb-24">
        {sectorsData.map((sec, idx) => {
          const IconComp = sec.icon;
          const isEven = idx % 2 === 1;

          return (
            <ScrollReveal key={sec.id} direction="up" delay={idx * 0.15} stagger={0.08}>
              <section
                id={sec.id}
                className="py-20 md:py-28 scroll-mt-32"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isEven ? "lg:grid-flow-dense" : ""}`}>
                  
                  {/* Text & Value Proposition */}
                  <div className={`lg:col-span-7 space-y-8 ${isEven ? "lg:col-start-6" : ""}`}>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-mist border border-brand-grey/20 text-brand-slate text-xs font-display font-medium uppercase tracking-widest mb-4">
                        <IconComp className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Sector Profile 0{idx + 1}</span>
                      </div>
                      <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate  mb-3">
                        {sec.title}
                      </h2>
                      <p className="font-display font-medium text-lg text-brand-teal">
                        {sec.tagline}
                      </p>
                    </div>

                    {/* Problem vs Solution Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="bg-brand-mist p-6 rounded-2xl border border-brand-grey/20 space-y-2">
                        <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block">
                          The Common Problem
                        </span>
                        <p className="font-body font-normal text-sm text-brand-grey ">
                          {sec.problem}
                        </p>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-brand-teal/40 shadow-soft space-y-2">
                        <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-wider block flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> How Drievu Solves It
                        </span>
                        <p className="font-body font-normal text-sm text-brand-slate/85 ">
                          {sec.solution}
                        </p>
                      </div>
                    </div>

                    {/* Proof Point */}
                    <div className="border-l-2 border-brand-slate pl-5 py-1 space-y-1">
                      <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block">
                        Proof Point: {sec.proofTitle}
                      </span>
                      <p className="font-body font-normal text-xs md:text-sm text-brand-grey ">
                        {sec.proofDesc}
                      </p>
                    </div>

                    {/* Conversion Goal */}
                    <div className="pt-2">
                      <TactileLink
                        href="/consultation"
                        variant="primary"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Book a Scoping Review for This Sector
                      </TactileLink>
                    </div>
                  </div>

                  {/* Sector Image */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:col-start-1" : ""}`}>
                    <div className="w-full h-[380px] md:h-[440px] bg-brand-slate/10 rounded-2xl relative overflow-hidden border border-brand-grey/20 shadow-soft">
                      <Image
                        src={sec.image}
                        alt={`Drievu engineering for ${sec.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/20 to-transparent pointer-events-none" />
                    </div>
                  </div>

                </div>
              </section>
            </ScrollReveal>
          );
        })}
      </div>

      {/* FINAL UNIVERSAL CONVERSION BANNER */}
      <section className="mt-12 bg-brand-teal text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            No Sales Pressure &middot; Honest Engineering
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl  mb-6">
            <SplitTextReveal text="Ready To Discuss Your Sector's Needs?" />
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 ">
            Submit your site details or unit counts today. An engineering principal will review your requirements and respond within one working day to arrange your structured scoping review.
          </p>
          <TactileLink
            href="/consultation"
            variant="secondary"
            size="lg"
            className="shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition duration-200"
          >
            Start Your Requirement Form
          </TactileLink>
        </div>
      </section>
    </div>
  );
}