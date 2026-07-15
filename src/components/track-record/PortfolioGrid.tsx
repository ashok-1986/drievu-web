// src/components/track-record/PortfolioGrid.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Building2, Train, Landmark, Warehouse, Home } from "lucide-react";
import { Glider } from "@/components/motion/Glider";
import { Tactile } from "@/components/motion/Tactile";
import { EASING_OUT_EXPO } from "@/lib/physics";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

interface ProjectCase {
  id: string;
  title: string;
  sectorId: "commercial" | "infrastructure" | "residential" | "industrial";
  sectorLabel: string;
  location: string;
  scale: string;
  outcome: string;
  icon: React.ElementType;
}

export function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Projects (20+ Years)" },
    { id: "commercial", label: "Commercial & Office" },
    { id: "infrastructure", label: "National Infrastructure" },
    { id: "residential", label: "Residential Estates" },
    { id: "industrial", label: "Logistics & Industrial" },
  ];

  const projects: ProjectCase[] = [
    {
      id: "staines-road",
      title: "Staines Road Commercial Campus",
      sectorId: "commercial",
      sectorLabel: "Commercial Office",
      location: "London Borough of Hounslow",
      scale: "320+ Flush-Mounted Cameras & Keyless Access",
      outcome: "Delivered a completely hidden wiring architecture across a multi-story commercial workspace. Integrated mobile smartphone access gates and local 4K surveillance without disrupting tenant daily operations.",
      icon: Building2,
    },
    {
      id: "national-metro",
      title: "National Metro & Rail Transit Network",
      sectorId: "infrastructure",
      sectorLabel: "Public Infrastructure",
      location: "Regional UK Transit Grid",
      scale: "1,200+ Networked CCTV Nodes & Fiber Backbones",
      outcome: "Engineered high-density video surveillance adhering strictly to British Standard BS EN 62676. Configured zero-latency local control rooms with automated failover recording and zero cloud storage fees.",
      icon: Train,
    },
    {
      id: "gift-city",
      title: "GIFT City International Financial Tower",
      sectorId: "commercial",
      sectorLabel: "Financial & Real Estate",
      location: "Global Financial District",
      scale: "Turnkey Perimeter Security & Speed Gates",
      outcome: "Executed an end-to-end electronic security blueprint for a landmark financial hub. Deployed optical speed turnstiles, encrypted elevator destination control, and multi-zone intrusion alarms.",
      icon: Landmark,
    },
    {
      id: "heritage-estate",
      title: "Heritage Residential Block & Gardens",
      sectorId: "residential",
      sectorLabel: "Residential Block",
      location: "Central London",
      scale: "64 Weather-Proof Cameras & Video Intercoms",
      outcome: "Upgraded legacy analogue wiring to modern high-definition IP surveillance without altering exterior heritage masonry. Residents gained secure smartphone gate entry and crystal-clear visitor verification.",
      icon: Home,
    },
    {
      id: "freight-depot",
      title: "Midlands Logistics & Distribution Yard",
      sectorId: "industrial",
      sectorLabel: "Logistics & Industrial",
      location: "West Midlands Freight Hub",
      scale: "Thermal Perimeter Fence & Automated Gate Barriers",
      outcome: "Eliminated after-hours theft using autonomous thermal detection cameras linked to high-output public announcement speakers. System triggers instant alerts to local security guards with zero false alarms.",
      icon: Warehouse,
    },
    {
      id: "stadium-grid",
      title: "International Civic Arena & Event Grid",
      sectorId: "infrastructure",
      sectorLabel: "Public Infrastructure",
      location: "Metropolitan Sports Hub",
      scale: "High-Capacity Crowd Surveillance & Audio Intercoms",
      outcome: "Designed an integrated safety control matrix capable of monitoring 50,000+ visitors. Supported by our priority 4-hour emergency engineering response SLA to guarantee zero system downtime during major events.",
      icon: ShieldCheck,
    },
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.sectorId === activeTab);

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto space-y-12">
      
      {/* FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-grey/20">
        <div className="space-y-1">
          <SplitTextReveal
            text="Proven Engineering Heritage."
            className="font-display font-medium text-2xl md:text-3xl text-brand-slate tracking-tight"
          />
          <ProseReveal delay={0.15}>
            <p className="font-body font-normal text-xs md:text-sm text-brand-grey">
              Filter our leadership team’s historical delivery record by property environment.
            </p>
          </ProseReveal>
        </div>

        {/* Standardized Capsule Glider */}
        <Glider
          tabs={filterTabs}
          activeId={activeTab}
          onChange={setActiveTab}
          layoutIdNamespace="portfolio-filter-bar"
          className="self-start md:self-auto bg-brand-mist/80 p-1.5 rounded-full border border-brand-grey/20"
        />
      </div>

      {/* CASE STUDIES GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const IconComp = project.icon;
            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASING_OUT_EXPO, delay: idx * 0.05 }}
              >
                <Tactile hoverLift={-4} tapScale={0.99} className="h-full">
                  <div className="h-full p-8 rounded-3xl bg-white border border-brand-grey/15 shadow-sm hover:border-brand-teal/40 hover:shadow-md transition-all flex flex-col justify-between space-y-6 group">
                    
                    {/* Top Row: Sector Badge & Icon */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-medium text-[11px] uppercase tracking-wider text-brand-teal bg-brand-mist px-3 py-1 rounded-full border border-brand-grey/10">
                          {project.sectorLabel}
                        </span>
                        <div className="w-10 h-10 rounded-2xl bg-brand-mist text-brand-slate flex items-center justify-center shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-body font-normal text-xs text-brand-grey uppercase tracking-wider block">
                          {project.location}
                        </span>
                        <h3 className="font-display font-medium text-xl text-brand-slate tracking-tight group-hover:text-brand-teal transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Middle Row: Engineering Scale */}
                    <div className="py-3 border-y border-brand-grey/15">
                      <span className="font-body font-normal text-[11px] text-brand-grey uppercase tracking-wider block">
                        Hardware & System Scope
                      </span>
                      <span className="font-display font-medium text-xs md:text-sm text-brand-slate block mt-0.5">
                        {project.scale}
                      </span>
                    </div>

                    {/* Bottom Row: Plain English Outcome */}
                    <div className="space-y-4 mt-auto">
                      <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                        {project.outcome}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-brand-teal font-display font-medium text-xs">
                        <span>BS EN Compliant Delivery</span>
                        <span className="text-brand-grey/80">
                          Scoping Details Verified
                        </span>
                      </div>
                    </div>

                  </div>
                </Tactile>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* BOTTOM DUE DILIGENCE ASSURANCE CARD */}
      <div className="p-8 rounded-3xl bg-brand-slate text-white border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-elevated">
        <div className="space-y-1 max-w-xl">
          <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
            Procurement Due Diligence
          </span>
          <h4 className="font-display font-medium text-lg md:text-xl text-white tracking-tight">
            Need references or formal tender qualification documents?
          </h4>
          <p className="font-body font-normal text-xs md:text-sm text-brand-paper/80 leading-relaxed">
            Historical track records referenced above were delivered by members of Drievu’s executive leadership team over two decades in prior executive roles. We supply full technical qualification packs for public sector and commercial tenders.
          </p>
        </div>
        <Tactile tapScale={0.98}>
          <a
            href="/consultation"
            className="bg-brand-teal text-white font-display font-medium text-sm px-6 py-4 rounded-xl hover:bg-[#006666] transition-colors shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Request Tender Pack</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Tactile>
      </div>

    </section>
  );
}
