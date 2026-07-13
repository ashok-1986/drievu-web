"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Shield, HardDrive, Wrench, Check, Copy, ArrowRight, Lock, Battery } from "lucide-react";

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

  /* 
   * THE SILENT MATH ENGINE
   * Executes deterministic storage and network sizing based on Drievu's H.265+ hardware schedule.
   * Bitrates: 3K (5MP EXIR) = ~3.5 Mbps | 4K (8MP Ultra HD) = ~6.0 Mbps.
   * Formula: (Bitrate * 3600 * 24 * Days * Cameras) / (8 * 1024 * 1024) = TB.
   */
  const calculations = useMemo(() => {
    const bitrateMbps = resolution === "4k" ? 6.0 : 3.5;
    const rawTb = (bitrateMbps * 3600 * 24 * retentionDays * cameraCount) / (8 * 1024 * 1024);
    const requiredTb = Math.ceil(rawTb * 1.15); // 15% formatting and safety buffer

    // Map against Drievu 24TB Surveillance HDD range
    const hddCount = Math.ceil(requiredTb / 24);
    const totalStorageTb = hddCount * 24;

    // Map against PoE Switch Range (8, 16, or 24 port)
    let switchModel = "1x 24-Port High-Speed Network Switch";
    if (cameraCount <= 8) switchModel = "1x 8-Port High-Speed Network Switch";
    else if (cameraCount <= 16) switchModel = "1x 16-Port High-Speed Network Switch";
    else if (cameraCount > 24) switchModel = `${Math.ceil(cameraCount / 24)}x 24-Port High-Speed Network Switches`;

    // NVR Hardware Mapping
    const nvrModel =
      cameraCount <= 32
        ? "32-Channel Dedicated Video Recorder"
        : "64-Channel Commercial Video Recorder";

    // Plain-English Procurement Summary for Clipboard & Handover
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

  const handleCopy = () => {
    navigator.clipboard.writeText(calculations.executiveSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAttachAndProceed = () => {
    /* 
     * SEAMLESS CONSULTATION HANDOFF
     * Serializes the plain-English blueprint into sessionStorage so the 3-step wizard 
     * at /consultation can instantly pre-fill the customer's technical scope.
     */
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

  return (
    <div className="bg-brand-paper rounded-2xl border border-brand-grey/20 shadow-xl overflow-hidden max-w-[1150px] mx-auto">
      {/* 
        * ESTIMATOR HEADER
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking-[-0.02em].
        */}
      <div className="bg-brand-slate text-white p-8 md:p-12 border-b border-brand-grey/20">
        <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
          Plain-English System Estimator
        </span>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-[-0.02em] mb-4">
          Estimate Your Building’s Needs.
        </h2>
        <p className="font-body font-normal text-brand-grey text-sm md:text-base max-w-2xl leading-relaxed">
          Use the sliders below to match your property size. We calculate the exact equipment, storage drives, and wiring required automatically—no technical jargon, no monthly cloud fees, and zero guesswork.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT PANE: Interactive Sliders & Toggles (7 Columns) */}
        <div className="lg:col-span-7 p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-brand-grey/15">
          
          {/* 1. Property Sector Selector */}
          <div>
            <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
              1. What type of property is this?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "commercial_office", label: "Office / Retail" },
                { id: "residential_block", label: "Residential Block" },
                { id: "industrial_warehouse", label: "Warehouse / Site" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPropertyType(tab.id as PropertyType)}
                  className={`py-3 px-4 rounded-xl font-display font-medium text-xs border text-center transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                    propertyType === tab.id
                      ? "bg-brand-teal text-white border-brand-teal shadow-sm"
                      : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Camera Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                2. How many cameras do you need?
              </label>
              <span className="font-display font-medium text-lg text-brand-teal font-mono">
                {cameraCount} Cameras
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              step="4"
              value={cameraCount}
              onChange={(e) => setCameraCount(Number(e.target.value))}
              className="w-full h-2.5 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal"
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
              <span className="font-display font-medium text-lg text-brand-teal font-mono">
                {retentionDays} Days
              </span>
            </div>
            <input
              type="range"
              min="14"
              max="90"
              step="7"
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full h-2.5 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal"
            />
            <div className="flex justify-between text-[11px] text-brand-grey font-mono mt-1">
              <span>14 Days</span>
              <span>30 Days (UK Standard)</span>
              <span>90 Days</span>
            </div>
          </div>

          {/* 4. Resolution & Resilience Toggles (100% Human Language) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-brand-grey/15">
            <div>
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                Video Clarity
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setResolution("3k")}
                  className={`flex-1 py-2.5 rounded-lg font-display font-medium text-xs border transition-all active:scale-[0.97] cursor-pointer ${
                    resolution === "3k"
                      ? "bg-brand-slate text-white border-brand-slate shadow-sm"
                      : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                  }`}
                >
                  3K Crisp HD
                </button>
                <button
                  onClick={() => setResolution("4k")}
                  className={`flex-1 py-2.5 rounded-lg font-display font-medium text-xs border transition-all active:scale-[0.97] cursor-pointer ${
                    resolution === "4k"
                      ? "bg-brand-slate text-white border-brand-slate shadow-sm"
                      : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                  }`}
                >
                  4K Ultra HD
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                Essential Add-Ons
              </span>
              <label className="flex items-start gap-2.5 text-xs font-body text-brand-slate cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeUps}
                  onChange={(e) => setIncludeUps(e.target.checked)}
                  className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4 mt-0.5 shrink-0 cursor-pointer"
                />
                <div>
                  <span className="font-medium text-brand-slate block flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-brand-teal" /> Emergency Battery Backup
                  </span>
                  <span className="text-[11px] text-brand-grey leading-tight block mt-0.5">
                    Keeps cameras recording even during building power cuts.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 text-xs font-body text-brand-slate cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeAccess}
                  onChange={(e) => setIncludeAccess(e.target.checked)}
                  className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4 mt-0.5 shrink-0 cursor-pointer"
                />
                <div>
                  <span className="font-medium text-brand-slate block flex items-center gap-1">
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

        {/* RIGHT PANE: Human-Language Output & Conversion Goal (5 Columns) */}
        <div className="lg:col-span-5 bg-brand-mist p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-6 border-b border-brand-grey/20 pb-3">
              What Your System Includes
            </span>

            {/* Benefit-Driven Output Cards (Zero Techy Jargon) */}
            <div className="space-y-4 mb-8">
              
              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    Dedicated On-Site Video Recorder
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Stores {retentionDays} days of crisp video safely inside your building ({calculations.hddCount}x high-capacity drives). You own 100% of the footage—zero cloud subscriptions.
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    Professional Wiring & Setup
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Our engineers run neat, high-speed wiring, connect all {cameraCount} weather-proof cameras, and configure your mobile viewing app so it works instantly.
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-green/10 text-brand-green shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">
                    British Standard Quality
                  </span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-1 leading-relaxed">
                    Engineered to strict UK safety guidelines with documented handover packs and privacy protection for tenants and staff.
                  </span>
                </div>
              </div>

            </div>

            {/* Copyable Specification Brief for Procurement Records */}
            <div className="bg-brand-slate text-brand-paper p-4 rounded-xl font-mono text-[11px] leading-relaxed mb-8 shadow-inner">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-grey/20 text-brand-grey">
                <span>YOUR REQUIREMENT SUMMARY</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-brand-teal hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Details"}</span>
                </button>
              </div>
              <p className="line-clamp-4 text-brand-paper/80">{calculations.executiveSummary}</p>
            </div>
          </div>

          {/* 
            * PRIMARY LEAD GENERATION GOAL
            * Funnels the customized estimate directly into /consultation (Requirement Form).
            * Incorporates UI/UX Pro Max tactile physics: active:scale-[0.98].
            */}
          <button
            onClick={handleAttachAndProceed}
            className="w-full bg-brand-teal text-white font-display font-medium text-base py-4 rounded-xl shadow-elevated hover:bg-[#006666] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Send To Requirement Form</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
