"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function GlobalFooter() {
  const [currentTime, setCurrentTime] = useState<string>("00:00:00 UTC");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-brand-slate text-brand-paper pt-16 pb-12 border-t border-brand-grey/20 select-none">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* 
          * KOMMA-KOMMA LIVE OPS TELEMETRY BAR
          * Connects real-time London UTC time with BS EN compliance flags.
          * Capped strictly at font-medium (500) or font-normal (400).
          */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-brand-grey/20 font-body text-xs text-brand-grey uppercase tracking-widest">
          <div>
            <span className="block text-brand-paper/60 mb-1">HQ Location</span>
            <span className="text-brand-paper font-mono font-medium">LONDON SE18 · UK</span>
          </div>
          <div>
            <span className="block text-brand-paper/60 mb-1">System Telemetry</span>
            <span className="text-brand-green font-mono font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              ALL SYSTEMS NOMINAL
            </span>
          </div>
          <div>
            <span className="block text-brand-paper/60 mb-1">Design Engineering</span>
            <span className="text-brand-paper font-mono font-medium">BS EN 50131 / BS 8418</span>
          </div>
          <div>
            <span className="block text-brand-paper/60 mb-1">London Time (UTC)</span>
            <span className="text-brand-paper font-mono font-medium">
              {isMounted ? currentTime : "SYNCING TELEMETRY..."}
            </span>
          </div>
        </div>

        {/* MAIN FOOTER DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          
          {/* Brand & Canonical Due Diligence (5 Columns) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block font-display font-medium text-2xl tracking-tight text-white">
              DRIEVU<span className="text-brand-teal">.</span>
            </Link>
            <p className="text-brand-grey text-sm leading-relaxed max-w-sm font-body font-normal">
              Security, life safety, and smart building systems. Designed, installed, and maintained with consultancy discipline. We commit to outcomes, not just equipment lists.
            </p>
            <div className="text-xs text-brand-grey/80 space-y-1 font-mono pt-2 border-t border-brand-grey/15 max-w-xs">
              <p className="text-white font-medium">Company Registration No: 15479482</p>
              <p>Apartment 3, Minotaur House, 3 Thunderer Walk, London SE18 6LH</p>
            </div>
          </div>

          {/* Core Systems Navigation (3 Columns) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-display font-medium text-xs text-white uppercase tracking-widest block mb-4">
              Core Capabilities
            </span>
            <ul className="space-y-2.5 text-sm text-brand-grey font-body font-normal">
              <li><Link href="/systems/surveillance" className="hover:text-brand-teal transition-colors">Smart Cameras & CCTV</Link></li>
              <li><Link href="/systems/access" className="hover:text-brand-teal transition-colors">Keyless Door Entry</Link></li>
              <li><Link href="/systems/fire" className="hover:text-brand-teal transition-colors">Fire & Safety Alarms</Link></li>
              <li><Link href="/systems/communication" className="hover:text-brand-teal transition-colors">Intercoms & Sound</Link></li>
              <li><Link href="/systems/smart-building" className="hover:text-brand-teal transition-colors">Energy & Comfort Control</Link></li>
            </ul>
          </div>

          {/* Governance & Due Diligence (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-display font-medium text-xs text-white uppercase tracking-widest block mb-4">
              Governance
            </span>
            <ul className="space-y-2.5 text-sm text-brand-grey font-body font-normal">
              <li><Link href="/compliance" className="hover:text-brand-teal transition-colors">UK GDPR Standards</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-teal transition-colors">Terms of Service</Link></li>
              <li><Link href="/track-record" className="hover:text-brand-teal transition-colors">Verified Portfolio</Link></li>
            </ul>
          </div>

          {/* Direct Access & Conversion (2 Columns) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-display font-medium text-xs text-white uppercase tracking-widest block mb-4">
              Direct Contact
            </span>
            <div className="text-sm text-brand-grey space-y-2 font-body font-normal">
              <p className="font-mono text-white font-medium">+44 7442 605205</p>
              <p className="text-xs font-mono break-all">enquiries@drievu.com</p>
              <div className="pt-3">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-1 font-display font-medium text-xs text-brand-teal border border-brand-teal/40 px-3.5 py-2 rounded-xl hover:bg-brand-teal hover:text-white transition-all duration-200 active:scale-[0.97]"
                >
                  <span>Book Scoping</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="pt-8 border-t border-brand-grey/15 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-grey/60 font-body font-normal">
          <p>© {new Date().getFullYear()} Drievu Limited. All rights reserved. Delivered properly in the UK.</p>
          <p className="mt-2 sm:mt-0 font-mono tracking-wider">DELIVER · RELIABLE · IMBUE · ETHICAL · VALUE · UPSTANDING</p>
        </div>

      </div>
    </footer>
  );
}
