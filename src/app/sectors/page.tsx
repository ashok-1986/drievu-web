"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Building2, Wrench, FileText } from "lucide-react";

export default function SectorsPage() {
  const [activeSection, setActiveSection] = useState<string>("architects");

  // Scroll Spy: Automatically updates active tab as buyer scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["architects", "developers", "facilities", "public-sector"];
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
      id: "architects",
      title: "Architects & Specifiers",
      tagline: "Clean design without last-minute wiring clutter.",
      icon: Building2,
      problem: "You design beautiful, clean spaces, but traditional security installers often ruin the aesthetic with bulky boxes, ugly surface-mounted cables, and hardware that clashes with your finishes.",
      solution: "We work with you during the early planning stage. We map out hidden wiring routes, specify flush-mounted cameras and glass intercom panels, and ensure every piece of technology blends invisibly into your design without sacrificing safety.",
      proofTitle: "Verified Leadership Track Record",
      proofDesc: "Our executive team engineered seamless, high-end building systems across luxury residential towers like Altair and landmark commercial developments like GIFT City.",
      imagePrompt: "Architectural close-up of a minimalist white flush-mounted camera on a clean concrete gallery ceiling, zero visible wires, interior design focus --ar 16:9 --style raw",
    },
    {
      id: "developers",
      title: "Property Developers",
      tagline: "On-time installations that never delay your building handover.",
      icon: Shield,
      problem: "Subcontractors routinely over-specify expensive gear to inflate their invoices, show up late, and leave you with incomplete paperwork that delays your ability to sell, let, or hand over the property.",
      solution: "We price transparently and install strictly to your construction schedule. You receive reliable, right-sized equipment without fluff, finished with a complete, structured handover document pack so you can close your project immediately.",
      proofTitle: "Live UK Delivery Discipline",
      proofDesc: "At our Staines Road commercial estate installation in London, we delivered a 31-camera network and video storage system on schedule with zero tenant disruption and full insurance documentation.",
      imagePrompt: "Wide architectural shot of a newly completed luxury commercial building exterior at dusk, clean glass facades, professional landscaping, zero clutter --ar 16:9 --style raw",
    },
    {
      id: "facilities",
      title: "Facilities Managers",
      tagline: "Reliable systems that work every day, backed by fast support.",
      icon: Wrench,
      problem: "You inherit systems with messy wiring, zero documentation, and constant false alarms. When something breaks, the original installer is nowhere to be found, leaving your building exposed.",
      solution: "We bring order to operational chaos. We provide SLA-backed annual maintenance contracts with a guaranteed response within one working day. We tidy up your existing setups and give you a single, simple app to manage cameras and doors easily.",
      proofTitle: "Infrastructure-Grade Reliability",
      proofDesc: "Our leadership team spent over two decades managing mission-critical security and communication systems for major airports, metros, and stadiums where failure is not an option.",
      imagePrompt: "Clean, brightly lit facilities management office with a modern computer monitor showing a clear, organized building security layout, neat desk --ar 16:9 --style raw",
    },
    {
      id: "public-sector",
      title: "Housing Associations & Public Sector",
      tagline: "British safety standards with strict tenant privacy protection.",
      icon: FileText,
      problem: "You need to protect residents and communal properties while staying strictly within public budgets and complying with complex UK data privacy and building safety laws.",
      solution: "We specify durable, energy-efficient hardware engineered to British safety guidelines. Every system builds in automatic privacy protection for residents, zero recurring cloud storage fees, and full audit documentation for your compliance records.",
      proofTitle: "Public Due-Diligence Ready",
      proofDesc: "Drievu Limited is a UK-registered company (Reg No. 15479482) operating with self-hosted digital systems and transparent, documented processes designed to pass rigorous procurement audits.",
      imagePrompt: "Exterior of a modern, well-maintained UK brick residential apartment block on a bright day, neat communal entrance with a secure video doorbell panel --ar 16:9 --style raw",
    },
  ];

  return (
    <div className="w-full pt-28 md:pt-36 pb-24 bg-brand-paper min-h-screen select-none">
      {/* HERO HEADER SECTION */}
      <section className="bg-brand-slate text-brand-paper py-16 md:py-24 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            Tailored Engineering Engagement
          </div>

          <h1 className="font-display font-medium text-4xl md:text-6xl text-white tracking-[-0.03em] uppercase mb-6">
            How We Protect Your Sector.
          </h1>
          <p className="font-body font-normal text-brand-grey text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            We do not force a single boxed product onto every building. Whether you specify new developments, manage day-to-day facilities, or oversee public housing, here is how our consulting-to-maintenance discipline solves your exact problems in plain English.
          </p>

          <div className="bg-brand-mist/10 border-l-4 border-brand-teal p-5 rounded-r-xl max-w-4xl font-body text-xs text-brand-grey leading-relaxed font-mono">
            <strong>PROCUREMENT DUE DILIGENCE:</strong> National-infrastructure track records referenced below were delivered by members of Drievu’s leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482).
          </div>
        </div>
      </section>

      {/* 
        * STICKY SECTOR JUMP NAVIGATION (Emil Kowalski Spring Glider)
        * Uses Framer Motion layoutId="activeSectorTab" for buttery macOS tab transitions.
        */}
      <section className="bg-brand-mist/90 py-4 px-6 border-b border-brand-grey/15 sticky top-[60px] z-40 backdrop-blur-md shadow-soft">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="font-display font-medium text-xs text-brand-grey uppercase tracking-widest mr-2 hidden sm:inline shrink-0">
            Jump To:
          </span>
          {sectorsData.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative px-5 py-2.5 rounded-full font-display font-medium text-xs whitespace-nowrap z-10 transition-colors duration-150 active:scale-[0.97] cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "bg-white text-brand-slate border border-brand-grey/20 hover:border-brand-teal hover:text-brand-teal"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSectorTab"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-brand-teal rounded-full shadow-soft -z-10"
                  />
                )}
                {tab.title}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4 ANCHORED SECTOR SECTIONS */}
      <div className="max-w-[1200px] mx-auto px-6 divide-y divide-brand-grey/15">
        {sectorsData.map((sec, idx) => {
          const IconComp = sec.icon;
          const isEven = idx % 2 === 1;

          return (
            <section
              key={sec.id}
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
                    <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tight mb-3">
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
                      <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
                        {sec.problem}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-brand-teal/40 shadow-soft space-y-2">
                      <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-wider block flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> How Drievu Solves It
                      </span>
                      <p className="font-body font-normal text-sm text-brand-slate/85 leading-relaxed">
                        {sec.solution}
                      </p>
                    </div>
                  </div>

                  {/* Proof Point */}
                  <div className="border-l-2 border-brand-slate pl-5 py-1 space-y-1">
                    <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block">
                      Proof Point: {sec.proofTitle}
                    </span>
                    <p className="font-body font-normal text-xs md:text-sm text-brand-grey leading-relaxed">
                      {sec.proofDesc}
                    </p>
                  </div>

                  {/* Conversion Goal */}
                  <div className="pt-2">
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-2 bg-brand-teal text-white font-display font-medium text-sm px-8 py-4 rounded-xl shadow-soft hover:bg-[#006666] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] group cursor-pointer"
                    >
                      <span>Book a Scoping Review for This Sector</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Technical Asset Placeholder */}
                <div className={`lg:col-span-5 ${isEven ? "lg:col-start-1" : ""}`}>
                  <div className="w-full h-[380px] md:h-[440px] bg-brand-slate/10 rounded-2xl relative overflow-hidden border border-brand-grey/20 shadow-soft flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/40 via-transparent to-transparent z-10" />
                    <div className="text-center font-mono text-xs text-brand-grey p-8 max-w-sm relative z-20">
                      <span className="font-medium text-brand-slate block text-sm mb-2">
                        [Sector Asset: {sec.title}]
                      </span>
                      <span className="opacity-80 block leading-relaxed text-[11px]">
                        Antigravity Prompt: {sec.imagePrompt}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* FINAL UNIVERSAL CONVERSION BANNER */}
      <section className="mt-12 bg-brand-teal text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            No Sales Pressure · Honest Engineering
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-6">
            Ready To Discuss Your Sector’s Needs?
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
            Submit your site details or unit counts today. An engineering principal will review your requirements and respond within one working day to arrange your structured scoping review.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
          >
            Start Your Requirement Form
          </Link>
        </div>
      </section>
    </div>
  );
}
