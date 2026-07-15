"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, HardDrive, Wrench, Check, Copy, ArrowRight, Lock, Battery } from "lucide-react";
import { TactileLink, GliderTab, GliderPill } from "@/components/motion/MotionPrimitives";

type PropertyType = "commercial_office" | "residential_block" | "industrial_warehouse";
type Resolution = "3k" | "4k";

export function InteractiveSystemBuilder() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<PropertyType>("commercial_office");
  const [cameraCount, setCameraCount] = useState<number>(16);
  const [retentionDays, setRetentionDays] = useState<number>(30);
  const [resolution, setResolution] = useState<Resolution>("4k");
  const [includeUps, setIncludeUps] = useState<boolean>(true);
  const [includeAccess, setIncludeAccess] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Deterministic Math Engine (Strictly 12th-grade plain English outputs)
  const calculations = useMemo(() => {
    const bitrateMbps = resolution === "4k" ? 6.0 : 3.5;
    const rawTb = (bitrateMbps * 3600 * 24 * retentionDays * cameraCount) / (8 * 1024 * 1024);
    const requiredTb = Math.ceil(rawTb * 1.15);
    const hddCount = Math.ceil(requiredTb / 24);
    const totalStorageTb = hddCount * 24;

    let switchModel = "1x 24-Port High-Speed Network Switch";
    if (cameraCount <= 8) switchModel = "1x 8-Port High-Speed Network Switch";
    else if (cameraCount <= 16) switchModel = "1x 16-Port High-Speed Network Switch";
    else if (cameraCount > 24) switchModel = `${Math.ceil(cameraCount / 24)}x 24-Port High-Speed Network Switches`;

    const nvrModel =
      cameraCount <= 32
        ? "32-Channel Dedicated Video Recorder"
        : "64-Channel Commercial Video Recorder";

    const executiveSummary = `DRIEVU PROJECT REQUIREMENT ESTIMATE:
- Property Type: ${propertyType.replace("_", " ").toUpperCase()}
- Security Cameras: ${cameraCount}x Weather-Proof Smart Cameras (${resolution.toUpperCase()} Resolution with Human/Vehicle Detection)
- Video Storage: Stores ${retentionDays} days of clear video on-site (${hddCount}x high-capacity drives, ${totalStorageTb}TB total) without monthly cloud fees
- Network & Setup: ${switchModel}, neat structured wiring, and professional mobile app configuration
- Emergency Power: ${includeUps ? "Includes battery backup unit so cameras keep recording during power cuts" : "Standard main power connection"}
- Door Entry: ${includeAccess ? "Includes keyless intercom entry panels and smart access fobs" : "Not specified"}
- Design Standard: British Standards (BS EN guidelines) with strict UK GDPR privacy protection`;

    return { requiredTb, totalStorageTb, hddCount, switchModel, nvrModel, executiveSummary };
  }, [propertyType, cameraCount, retentionDays, resolution, includeUps, includeAccess]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(calculations.executiveSummary);
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleAttachAndProceed = () => {
    sessionStorage.setItem(
      "drievu_scoping_blueprint",
      JSON.stringify({
        propertyType,
        cameraCount,
        retentionDays,
        resolution,
        totalStorageTb: calculations.totalStorageTb,
        summary: calculations.executiveSummary,
      })
    );
    router.push("/consultation");
  };

  const propertyTabs = [
    { id: "commercial_office", label: "Office / Retail" },
    { id: "residential_block", label: "Residential Block" },
    { id: "industrial_warehouse", label: "Warehouse / Site" },
  ];

  const resolutionOptions = [
    { id: "3k", label: "3K Crisp HD" },
    { id: "4k", label: "4K Ultra HD" },
  ];

  return (
    <div className="bg-brand-paper rounded-2xl border border-brand-grey/20 shadow-xl overflow-hidden max-w-[1150px] mx-auto select-none">
      {/* HEADER: Enforcing maximum weight-500 ceiling */}
      <div className="bg-brand-slate text-white p-8 md:p-12 border-b border-brand-grey/20">
        <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
          Plain-English System Estimator
        </span>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-[-0.02em] mb-4">
          Estimate Your Building&rsquo;s Needs.
        </h2>
        <p className="font-body font-normal text-brand-grey-light text-sm md:text-base max-w-2xl leading-relaxed">
          Use the sliders below to match your property size. We calculate the exact equipment, storage drives, and wiring required automatically&mdash;no technical jargon, no monthly cloud fees, and zero guesswork.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT PANE: Interactive Controls */}
        <div className="lg:col-span-7 p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-brand-grey/15">
          
          {/* 1. Property Sector Selector with Emil Kowalski Layout Glider */}
          <div>
            <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
              1. What type of property is this?
            </label>
            <GliderTab
              tabs={propertyTabs}
              activeTab={propertyType}
              onChange={(id) => setPropertyType(id as PropertyType)}
              gliderId="property-sector-glider"
            />
          </div>

          {/* 2. Camera Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                2. How many cameras do you need?
              </label>
              <motion.span
                key={cameraCount}
                initial={{ scale: 1.1, color: "var(--color-teal-text)" }}
                animate={{ scale: 1, color: "var(--color-teal-text)" }}
                className="font-display font-medium text-lg font-mono inline-block"
              >
                {cameraCount} Cameras
              </motion.span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={cameraCount}
              onChange={(e) => setCameraCount(Number(e.target.value))}
              className="w-full h-2 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal active:scale-[0.99] transition-transform"
            />
            <div className="flex justify-between text-[11px] text-brand-grey font-mono mt-1">
              <span>4 (Small Site)</span>
              <span>32 (Medium Block)</span>
              <span>64 (Large Estate)</span>
            </div>
          </div>

          {/* 3. Retention Days Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                3. How long should video be saved?
              </label>
              <motion.span
                key={retentionDays}
                initial={{ scale: 1.1, color: "var(--color-teal-text)" }}
                animate={{ scale: 1, color: "var(--color-teal-text)" }}
                className="font-display font-medium text-lg font-mono inline-block"
              >
                {retentionDays} Days
              </motion.span>
            </div>
            <input
              type="range"
              min="14"
              max="90"
              step="7"
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full h-2 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal active:scale-[0.99] transition-transform"
            />
            <div className="flex justify-between text-[11px] text-brand-grey font-mono mt-1">
              <span>14 Days</span>
              <span>30 Days (UK Standard)</span>
              <span>90 Days</span>
            </div>
          </div>

          {/* 4. Resolution & Resilience Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-grey/15">
            <div>
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                Video Clarity
              </span>
              <GliderPill
                options={resolutionOptions}
                activeOption={resolution}
                onChange={(id) => setResolution(id as Resolution)}
                gliderId="video-res-glider"
              />
            </div>

            <div className="space-y-3">
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                Essential Add-Ons
              </span>
              <label className="flex items-start gap-2.5 text-xs font-body text-brand-slate cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={includeUps}
                  onChange={(e) => setIncludeUps(e.target.checked)}
                  className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4 mt-0.5 shrink-0 cursor-pointer transition-transform group-active:scale-90"
                />
                <div>
                  <span className="font-medium text-brand-slate flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-brand-teal" /> Emergency Battery Backup
                  </span>
                  <span className="text-[11px] text-brand-grey leading-tight block mt-0.5">
                    Keeps cameras recording even during building power cuts.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 text-xs font-body text-brand-slate cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={includeAccess}
                  onChange={(e) => setIncludeAccess(e.target.checked)}
                  className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4 mt-0.5 shrink-0 cursor-pointer transition-transform group-active:scale-90"
                />
                <div>
                  <span className="font-medium text-brand-slate flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-brand-teal" /> Keyless Door Entry
                  </span>
                  <span className="text-[11px] text-brand-grey leading-tight block mt-0.5">
                    Add intercom entry panels and smart fobs for doors/gates.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Plain-English Output */}
        <div className="lg:col-span-5 bg-brand-mist p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-6 border-b border-brand-grey/20 pb-3">
              What Your System Includes
            </span>

            {/* Tactile Benefit Cards with Subtle Spring Hover */}
            <div className="space-y-4 mb-8">
              <TactileLink
                href="#"
                variant="ghost"
                className="w-full justify-start p-5 rounded-xl border border-brand-grey/15 bg-white hover:bg-brand-paper"
                onClick={(e) => e.preventDefault()}
              >
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    Dedicated On-Site Video Recorder
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Stores {retentionDays} days of crisp video safely inside your building ({calculations.hddCount}x high-capacity drives). You own 100% of the footage&mdash;zero cloud subscriptions.
                  </span>
                </div>
              </TactileLink>

              <TactileLink
                href="#"
                variant="ghost"
                className="w-full justify-start p-5 rounded-xl border border-brand-grey/15 bg-white hover:bg-brand-paper"
                onClick={(e) => e.preventDefault()}
              >
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    Professional Wiring & Setup
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Our engineers run neat, high-speed wiring, connect all {cameraCount} weather-proof cameras, and configure your mobile viewing app so it works instantly.
                  </span>
                </div>
              </TactileLink>

              <TactileLink
                href="#"
                variant="ghost"
                className="w-full justify-start p-5 rounded-xl border border-brand-grey/15 bg-white hover:bg-brand-paper"
                onClick={(e) => e.preventDefault()}
              >
                <div className="p-3 rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    British Standard Quality
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Engineered to strict UK safety guidelines with documented handover packs and privacy protection for tenants and staff.
                  </span>
                </div>
              </TactileLink>
            </div>

            {/* Copyable Specification Brief */}
            <div className="bg-brand-slate text-brand-paper p-4 rounded-xl font-mono text-[11px] leading-relaxed mb-8 shadow-inner">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-grey/20 text-brand-grey-light">
                <span>YOUR REQUIREMENT SUMMARY</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-brand-teal hover:text-white transition-colors cursor-pointer active:scale-95"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-1 text-brand-green"
                      >
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Details
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="line-clamp-4 text-brand-paper/80">{calculations.executiveSummary}</p>
            </div>
          </div>

          {/* PRIMARY CTA: Emil Kowalski Tactile Button Physics */}
          <TactileLink
            href="/consultation"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={handleAttachAndProceed}
            className="w-full flex items-center justify-center gap-2 group"
          >
            <span>Send To Requirement Form</span>
          </TactileLink>
        </div>
      </div>
    </div>
  );
}