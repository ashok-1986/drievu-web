"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShieldCheck, MapPin, ArrowRight, CheckCircle2, Filter } from "lucide-react";

type SectorFilter = "ALL" | "UK_LIVE" | "INFRASTRUCTURE" | "COMMERCIAL" | "INDUSTRIAL";

interface Project {
  id: string;
  name: string;
  location: string;
  sector: SectorFilter;
  scope: string;
  isUkLive?: boolean;
  imagePrompt: string;
}

/* 
 * VERIFIED TRACK RECORD DICTIONARY
 * 100% 12th-grade plain English for front-of-house readability.
 * Strict Rule: Zero fabricated claims or imaginary metrics.
 */
const leadershipProjects: Project[] = [
  {
    id: "uk-1",
    name: "Staines Road Commercial Estate",
    location: "London, United Kingdom",
    sector: "UK_LIVE",
    scope: "31 smart security cameras and high-capacity on-site video recording installed across the commercial estate. Delivered on schedule with zero disruption to active tenants and a complete handover document pack.",
    isUkLive: true,
    imagePrompt: "Architectural exterior of a modern London commercial industrial estate on a bright overcast day, clean brick and glass facades, neat security camera mounted on corner --ar 16:9 --style raw",
  },
  {
    id: "proj-1",
    name: "Wankhede Stadium",
    location: "Mumbai, India",
    sector: "INFRASTRUCTURE",
    scope: "Stadium-wide camera monitoring and high-capacity crowd door access controls engineered for over 33,000 visitors during international events.",
    imagePrompt: "Architectural wide shot of a massive modern sports stadium exterior at dusk, illuminated gates, clean structural engineering lines --ar 16:9 --style raw",
  },
  {
    id: "proj-2",
    name: "Bhabha Atomic Research Centre (B.A.R.C.)",
    location: "Mumbai, India",
    sector: "INFRASTRUCTURE",
    scope: "High-security government perimeter defense networks, intrusion warning sensors, and mission-critical restricted door access controls.",
    imagePrompt: "Clean, high-security modern institutional research facility exterior, manicured lawns, architectural concrete and glass, high tech perimeter --ar 16:9 --style raw",
  },
  {
    id: "proj-3",
    name: "Ahmedabad Airport",
    location: "Ahmedabad, India",
    sector: "INFRASTRUCTURE",
    scope: "Terminal security camera networks, automated vehicle number-plate tracking at entrance gates, and clear public announcement speaker systems.",
    imagePrompt: "Modern international airport terminal exterior at twilight, sweeping architectural glass roofs, clean roadway approaches --ar 16:9 --style raw",
  },
  {
    id: "proj-4",
    name: "Kolkata & Nagpur Metros",
    location: "Kolkata & Nagpur, India",
    sector: "INFRASTRUCTURE",
    scope: "Multi-station video monitoring, secure fiber network equipment cabinets, and central security control room displays.",
    imagePrompt: "Sleek modern underground metro station concourse, polished floors, clean architectural lighting, stainless steel ticket barriers --ar 16:9 --style raw",
  },
  {
    id: "proj-5",
    name: "GIFT City Financial Hub",
    location: "Gandhinagar, India",
    sector: "COMMERCIAL",
    scope: "Smart city building management integration, automated energy-saving control relays, and centralized life safety alarm networks.",
    imagePrompt: "Towering ultra-modern glass commercial skyscrapers in a high-tech financial district against a clear blue sky, architectural perfection --ar 16:9 --style raw",
  },
  {
    id: "proj-6",
    name: "Saint-Gobain & Honda Manufacturing",
    location: "Chennai & Bhiwadi, India",
    sector: "INDUSTRIAL",
    scope: "Heavy industrial perimeter protection, hazardous gas leak warning sensors with auto-shutoff, and emergency voice evacuation broadcast systems.",
    imagePrompt: "Immaculate modern high-tech manufacturing plant exterior, clean industrial cladding, neat roadway approaches, precision engineering --ar 16:9 --style raw",
  },
  {
    id: "proj-7",
    name: "Altair Residential Towers",
    location: "Colombo, Sri Lanka",
    sector: "COMMERCIAL",
    scope: "Luxury high-rise residential video intercoms, keyless communal door entry panels, and smart lighting controls across shared areas.",
    imagePrompt: "Iconic leaning luxury architectural residential skyscrapers overlooking the water at sunset, dramatic architectural design --ar 16:9 --style raw",
  },
  {
    id: "proj-8",
    name: "National Assembly Building",
    location: "Banjul, The Gambia",
    sector: "INFRASTRUCTURE",
    scope: "Government parliamentary building security, restricted voting access controls, and master camera networks.",
    imagePrompt: "Dignified modern government parliamentary building with clean geometric architectural lines, warm natural lighting, secure plaza --ar 16:9 --style raw",
  },
];

export default function TrackRecordPage() {
  const [filter, setFilter] = useState<SectorFilter>("ALL");

  const filteredProjects = leadershipProjects.filter((p) =>
    filter === "ALL" ? true : p.sector === filter
  );

  const filterTabs: { id: SectorFilter; label: string }[] = [
    { id: "ALL", label: "All Projects (9+)" },
    { id: "UK_LIVE", label: "UK Deployed Range" },
    { id: "INFRASTRUCTURE", label: "Infrastructure & Transport" },
    { id: "COMMERCIAL", label: "Commercial & Real Estate" },
    { id: "INDUSTRIAL", label: "Industrial & Manufacturing" },
  ];

  return (
    <div className="w-full pt-28 md:pt-36 pb-24 bg-brand-paper min-h-screen">
      {/* 
        * HERO HEADER SECTION (TR-1)
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking [-0.03em].
        */}
      <section className="bg-brand-slate text-brand-paper py-16 md:py-24 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6 select-none">
            <ShieldCheck className="w-3.5 h-3.5" />
            Uncompromising Due Diligence
          </div>

          <h1 className="font-display font-medium text-4xl md:text-6xl text-white tracking-[-0.03em] uppercase mb-6">
            Delivered by Our Leadership Team Over Two Decades.
          </h1>
          
          <p className="font-body font-normal text-brand-grey text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            We brought national-infrastructure delivery discipline to the UK for a simple reason: the market is full of products, but short on accountable delivery. Below is the verifiable project track record of our executive engineering team.
          </p>

          {/* MANDATORY LEGAL & PROCUREMENT DISCLAIMER (TR-1) */}
          <div className="bg-brand-mist/10 border-l-4 border-brand-teal p-6 rounded-r-xl max-w-4xl shadow-soft">
            <p className="font-body font-normal text-xs md:text-sm text-brand-paper/90 leading-relaxed font-mono">
              <strong>LEGAL & PROCUREMENT DISCLAIMER:</strong> National-infrastructure projects listed below (such as Wankhede Stadium, Ahmedabad Airport, and BARC) were delivered by members of Drievu’s leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482). UK deployments are tagged explicitly as live Drievu contracts.
            </p>
          </div>
        </div>
      </section>

      {/* 
        * STICKY FLIP FILTER BAR (TR-3)
        * Tactile touch physics: active:scale-[0.97].
        */}
      <section className="bg-brand-mist py-4 px-6 border-b border-brand-grey/15 sticky top-[60px] z-40 backdrop-blur-md shadow-soft">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-brand-mist/80 border border-brand-grey/20 backdrop-blur-sm w-fit">
            <div className="flex items-center gap-1.5 text-xs font-display font-medium text-brand-grey uppercase tracking-widest mx-3 hidden sm:flex select-none shrink-0">
              <Filter className="w-3.5 h-3.5 text-brand-teal" />
              <span>Filter Sector:</span>
            </div>
            
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={
                  filter === tab.id
                    ? "px-5 py-2.5 rounded-full font-display font-medium text-xs text-white bg-brand-teal border border-brand-teal shadow-md cursor-pointer select-none shrink-0"
                    : "px-5 py-2.5 rounded-full font-display font-medium text-xs text-brand-slate bg-white/80 border border-brand-grey/15 hover:border-brand-teal transition-all cursor-pointer shadow-2xs select-none shrink-0"
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 
        * PROJECT MASONRY GRID WITH FLIP ANIMATIONS (TR-2, TR-3)
        * Framer Motion layout transitions (350ms, out-expo curve).
        * Zero bold typography: all headers capped at font-medium (500).
        */}
      <section className="py-16 px-6 max-w-[1200px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} // 350ms out-expo curve per spec
                key={project.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                  project.isUkLive
                    ? "bg-white border-brand-teal ring-1 ring-brand-teal shadow-elevated"
                    : "bg-white border-brand-grey/20 shadow-soft hover:shadow-elevated hover:border-brand-teal/60"
                }`}
              >
                <div>
                  {/* DB Longbow Curtain Image Container with AI Prompt Reference */}
                  <div className="w-full h-48 bg-brand-slate/10 relative overflow-hidden" data-reveal="curtain">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/50 via-transparent to-transparent z-10" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`text-[10px] font-display font-medium uppercase px-3 py-1.5 rounded-full shadow-sm select-none ${
                          project.isUkLive
                            ? "bg-brand-teal text-white"
                            : "bg-brand-paper/90 backdrop-blur-md text-brand-slate border border-brand-grey/20"
                        }`}
                      >
                        {project.isUkLive ? "UK LIVE CONTRACT" : project.sector}
                      </span>
                    </div>

                    {/* Image Asset Placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-brand-grey p-6 text-center select-none">
                      <div>
                        <span className="font-medium text-brand-slate block mb-1">[Asset: {project.name}]</span>
                        <span className="text-[10px] opacity-75 block line-clamp-2">Asset pending final approval.</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content (100% 12th-Grade Plain English) */}
                  <div className="p-8">
                    <h3 className="font-display font-medium text-2xl text-brand-slate mb-2 tracking-tight">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-brand-grey font-mono mb-4">
                      <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <p className="font-body font-normal text-brand-slate/85 text-sm leading-relaxed">
                      {project.scope}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Funnel directly to Scoping Review */}
                <div className="px-8 pb-8 pt-4 border-t border-brand-grey/10 flex items-center justify-between">
                  <span className="font-display font-medium text-xs text-brand-teal flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{project.isUkLive ? "British Standards Verified" : "Leadership Track Record"}</span>
                  </span>
                  
                  <Link
                    href="/consultation"
                    className="font-display font-medium text-xs text-brand-slate hover:text-brand-teal uppercase tracking-wider flex items-center gap-1 group transition-colors"
                  >
                    <span>Request Scoping</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 
        * UNIVERSAL CONVERSION FOOTER BANNER
        * Funnels engaged decision-makers directly into the Requirement Form (/consultation).
        */}
      <section className="mt-12 bg-brand-teal text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            Bring Delivery Discipline To Your Site
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tighter mb-6">
            Ready To Engineer Your Property?
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
            Whether you need communal CCTV for a residential estate, access control for a commercial tower, or life safety systems for a new development, get a structured assessment without sales pressure.
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
