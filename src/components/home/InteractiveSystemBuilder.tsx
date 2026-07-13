// src/components/home/InteractiveSystemBuilder.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Shield, HardDrive, Wrench, Check, Copy, ArrowRight } from "lucide-react";

export function InteractiveSystemBuilder() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState("commercial_office");
  const [cameraCount, setCameraCount] = useState(16);
  const [retentionDays, setRetentionDays] = useState(30);
  const [includeUps, setIncludeUps] = useState(true);
  const [copied, setCopied] = useState(false);

  // Math runs silently; outputs translated to 12th-grade plain English[cite: 5, 6].
  const estimate = useMemo(() => {
    const rawTb = (6.0 * 3600 * 24 * retentionDays * cameraCount) / (8 * 1024 * 1024);
    const storageTb = Math.ceil(rawTb * 1.15);
    const hddCount = Math.ceil(storageTb / 24);

    const summary = `DRIEVU PROJECT REQUIREMENT SUMMARY[cite: 5]:
- Property Type: ${propertyType.replace("_", " ").toUpperCase()}[cite: 6]
- Security Cameras: ${cameraCount}x Weather-Proof Smart Cameras[cite: 8]
- Video Storage: Stores ${retentionDays} days of clear video on-site (${hddCount}x high-capacity drives) without monthly cloud fees[cite: 8]
- Wiring & Power: Includes neat, high-speed network wiring and professional setup[cite: 8]
- Power Backup: ${includeUps ? "Includes emergency battery backup so cameras record during power cuts[cite: 8]" : "Standard main power connection"}`;

    return { storageTb, hddCount, summary };
  }, [propertyType, cameraCount, retentionDays, includeUps]);

  const handleCopy = () => {
    navigator.clipboard.writeText(estimate.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleProceedToForm = () => {
    sessionStorage.setItem("drievu_scoping_blueprint", JSON.stringify(estimate));
    router.push("/consultation");
  };

  return (
    <div className="bg-brand-paper rounded-2xl border border-brand-grey/20 shadow-xl overflow-hidden max-w-[1100px] mx-auto">
      <div className="bg-brand-slate text-white p-8 md:p-12 border-b border-brand-grey/20">
        <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
          Plain English Estimate
        </span>
        <h2 className="font-display font-medium text-3xl md:text-4xl tracking-tight mb-4">
          Estimate Your System Needs.
        </h2>
        <p className="font-body font-normal text-brand-grey text-sm md:text-base max-w-2xl">
          Use the sliders below to match your property size. We calculate the equipment and storage required automatically—no technical jargon, no monthly cloud fees, and no guesswork[cite: 6, 8].
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-brand-grey/15">
          <div>
            <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
              1. What type of building is this?[cite: 6]
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "commercial_office", label: "Office / Retail" },
                { id: "residential_block", label: "Residential Block" },
                { id: "industrial_warehouse", label: "Warehouse / Site" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPropertyType(tab.id)}
                  className={`py-3 px-4 rounded-xl font-display font-medium text-xs border text-center transition-all ${
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                2. How many cameras do you need?[cite: 8]
              </label>
              <span className="font-display font-medium text-base text-brand-teal font-mono">
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
              className="w-full h-2 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal"
            />
            <div className="flex justify-between text-[11px] text-brand-grey mt-1">
              <span>4 (Small Property)</span>
              <span>32 (Medium Building)</span>
              <span>64 (Large Estate)[cite: 8]</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                3. How long should video be saved?[cite: 8]
              </label>
              <span className="font-display font-medium text-base text-brand-teal font-mono">
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
              className="w-full h-2 bg-brand-mist rounded-lg appearance-none cursor-pointer accent-brand-teal"
            />
            <div className="flex justify-between text-[11px] text-brand-grey mt-1">
              <span>14 Days</span>
              <span>30 Days (UK Standard)[cite: 8]</span>
              <span>90 Days</span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-grey/15">
            <label className="flex items-center gap-3 text-sm font-body text-brand-slate cursor-pointer">
              <input
                type="checkbox"
                checked={includeUps}
                onChange={(e) => setIncludeUps(e.target.checked)}
                className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4"
              />
              <div>
                <span className="font-medium block">Include Emergency Battery Backup[cite: 8]</span>
                <span className="text-xs text-brand-grey block mt-0.5">Keeps cameras recording even if building power fails[cite: 8].</span>
              </div>
            </label>
          </div>
        </div>

        {/* Output & Lead Generation Goal (5 cols)[cite: 5] */}
        <div className="lg:col-span-5 bg-brand-mist p-8 md:p-12 flex flex-col justify-between">
          <div>
            <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-6 border-b border-brand-grey/20 pb-3">
              What Your System Includes
            </span>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal"><HardDrive className="w-5 h-5" /></div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">Dedicated On-Site Video Recorder[cite: 8]</span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-0.5">
                    Stores {retentionDays} days of crisp video safely inside your building. You own the footage—zero cloud subscriptions[cite: 8].
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-teal/10 text-brand-teal"><Wrench className="w-5 h-5" /></div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">Professional Wiring & Setup[cite: 8]</span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-0.5">
                    Our engineers run neat, high-speed cables, connect all {cameraCount} cameras, and configure your mobile viewing app[cite: 8].
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-grey/15 shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-lg bg-brand-green/10 text-brand-green"><Shield className="w-5 h-5" /></div>
                <div>
                  <span className="font-display font-medium text-sm text-brand-slate block">British Standard Quality[cite: 6]</span>
                  <span className="font-body font-normal text-xs text-brand-grey block mt-0.5">
                    Installed to strict UK safety guidelines with full documentation and privacy protection[cite: 6, 7].
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-brand-slate text-brand-paper p-4 rounded-xl font-mono text-[11px] leading-relaxed mb-8">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-brand-grey/20 text-brand-grey">
                <span>YOUR PROJECT REQUIREMENT[cite: 5]</span>
                <button onClick={handleCopy} className="flex items-center gap-1 text-brand-teal hover:text-white">
                  {copied ? <Check className="w-3.5 h-3.5 text-brand-green" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Details"}</span>
                </button>
              </div>
              <p className="line-clamp-4 text-brand-paper/80">{estimate.summary}</p>
            </div>
          </div>

          {/* PRIMARY LEAD GENERATION GOAL: Submit to Requirement Form[cite: 5] */}
          <button
            onClick={handleProceedToForm}
            className="w-full bg-brand-teal text-white font-display font-medium text-base py-4 rounded-xl shadow-md hover:bg-[#006666] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Send To Requirement Form[cite: 5]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
