// src/app/consultation/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, MapPin, Phone, Mail, Building2, Lock, Flame, Radio, Cpu, FileText } from "lucide-react";

type Step = 1 | 2 | 3;

interface FormData {
  role: string;
  propertyType: string;
  systemsOfInterest: string[];
  approximateScale: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  gdprConsent: boolean;
  attachedBlueprint?: any;
}

export default function ConsultationPage() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    role: "Property Manager / Managing Agent",
    propertyType: "Commercial Office / Retail",
    systemsOfInterest: ["Smart Cameras & Security"],
    approximateScale: "10–25 Units / Medium Site",
    fullName: "",
    email: "",
    phone: "",
    message: "",
    gdprConsent: false,
  });

  /* 
   * AUTOMATIC BLUEPRINT INGESTION (CN-2)
   * Reads sessionStorage on mount. If the client used the System Builder, 
   * their calculated HDD storage, camera counts, and wiring schedule attach instantly.
   */
  useEffect(() => {
    const savedBlueprint = sessionStorage.getItem("drievu_scoping_blueprint");
    if (savedBlueprint) {
      try {
        const parsed = JSON.parse(savedBlueprint);
        setFormData((prev) => ({
          ...prev,
          propertyType: parsed.propertyType ? parsed.propertyType.replace("_", " ").toUpperCase() : prev.propertyType,
          attachedBlueprint: parsed,
          message: `[System Estimator Attached]: ${parsed.summary || "Pre-configured estimate loaded."}`,
        }));
      } catch (e) {
        console.error("Failed to parse attached system estimate:", e);
      }
    }
  }, []);

  const handleSystemToggle = (systemName: string) => {
    setFormData((prev) => {
      const exists = prev.systemsOfInterest.includes(systemName);
      if (exists) {
        return { ...prev, systemsOfInterest: prev.systemsOfInterest.filter((s) => s !== systemName) };
      } else {
        return { ...prev, systemsOfInterest: [...prev.systemsOfInterest, systemName] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) return;

    setIsSubmitting(true);
    
    // Simulate clean server-side action / email dispatch (CN-3)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    sessionStorage.removeItem("drievu_scoping_blueprint");
  };

  const roles = [
    "Property Manager / Managing Agent",
    "Commercial Facility Owner / Manager",
    "Property Developer / Builder",
    "M&E Consultant / Specifier",
    "Housing Association / Public Sector",
    "Other Professional",
  ];

  const propertyTypes = [
    "Commercial Office / Retail",
    "Managed Residential Block",
    "Industrial / Warehouse / Logistics",
    "New Development Site",
    "Public Sector / Institutional",
  ];

  const availableSystems = [
    { id: "Smart Cameras & Security", label: "Smart Cameras & CCTV", icon: Shield },
    { id: "Keyless Door Entry", label: "Keyless Door Entry & Access", icon: Lock },
    { id: "Fire & Safety Alarms", label: "Fire, Gas & Life Safety Alarms", icon: Flame },
    { id: "Intercoms & Sound", label: "Intercoms & Public Address Sound", icon: Radio },
    { id: "Energy & Comfort Control", label: "Smart Building Energy & Comfort", icon: Cpu },
  ];

  const scaleOptions = [
    "Under 10 Units / Small Property",
    "10–25 Units / Medium Site",
    "26–100 Units / Large Block",
    "100+ Units / Multi-Site Estate",
    "Unsure / Require Scoping Advice",
  ];

  return (
    <div className="w-full pb-24 bg-brand-paper min-h-[85vh]">
      {/* 
        * HEADER SECTION
        * Enforces Weight-500 Ceiling: Uses font-medium with optical tracking [-0.02em].
        * 100% Human-readable, 12th-grade plain English.
        */}
      <section className="bg-brand-slate text-brand-paper py-16 md:py-20 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>

          <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
            Structured Scoping Workflow
          </span>
          <h1 className="font-display font-medium text-3xl md:text-5xl text-white tracking-tighter uppercase mb-4">
            Request an Engineering Scoping Review.
          </h1>
          <p className="font-body font-normal text-brand-grey text-base md:text-lg max-w-2xl leading-relaxed">
            Tell us about your property and security needs. An engineering principal will review your requirements and provide an honest, structured assessment without sales pressure.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-12 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: 3-Step Wizard Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-brand-grey/20 shadow-soft">
            
            {isSubmitted ? (
              /* SUCCESS STATE: Animated SVG Check & Honest Follow-Up Promise (CN-3, CN-4) */
              <div className="py-12 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h2 className="font-display font-medium text-2xl md:text-3xl text-brand-slate tracking-tight">
                  Scoping Request Received.
                </h2>
                <div className="bg-brand-mist p-6 rounded-xl border border-brand-grey/20 max-w-md mx-auto text-left space-y-2">
                  <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
                    Our Operational Commitment (CN-4)
                  </span>
                  <p className="font-body font-normal text-sm text-brand-slate leading-relaxed">
                    <strong>We respond within one working day.</strong> Your dedicated regional engineering contact will review your site details and reach out to schedule your site survey at booking.
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-block bg-brand-mist text-brand-slate font-display font-medium text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:border-brand-teal border border-brand-grey/20 transition-all duration-200 active:scale-[0.97]"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* STEP INDICATOR BAR (CN-1) */}
                <div className="flex items-center justify-between border-b border-brand-grey/15 pb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest">
                      Step {step} of 3
                    </span>
                    <span className="font-body text-xs text-brand-grey">
                      — {step === 1 ? "Your Role & Building" : step === 2 ? "Systems & Scale" : "Contact Details"}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step ? "w-8 bg-brand-teal" : s < step ? "w-4 bg-brand-teal/40" : "w-4 bg-brand-mist"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* ATTACHED BLUEPRINT NOTIFICATION BANNER */}
                {formData.attachedBlueprint && step === 1 && (
                  <div className="bg-brand-teal/5 border border-brand-teal/30 p-4 rounded-xl flex items-start gap-3">
                    <FileText className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
                        System Estimator Attached
                      </span>
                      <p className="font-body font-normal text-xs text-brand-slate mt-0.5">
                        We have automatically attached your calculated storage ({formData.attachedBlueprint.totalStorageTb}TB) and camera schedule to this review.
                      </p>
                    </div>
                  </div>
                )}

                {/* STEP 1: ROLE & PROPERTY TYPOLOGY */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                        What is your role on this project?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {roles.map((r) => (
                          <button
                            type="button"
                            key={r}
                            onClick={() => setFormData({ ...formData, role: r })}
                            className={`p-3.5 rounded-xl font-display font-medium text-xs text-left border transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                              formData.role === r
                                ? "bg-brand-teal text-white border-brand-teal shadow-soft"
                                : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                        What type of property is this?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {propertyTypes.map((pt) => (
                          <button
                            type="button"
                            key={pt}
                            onClick={() => setFormData({ ...formData, propertyType: pt })}
                            className={`p-3.5 rounded-xl font-display font-medium text-xs text-left border transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                              formData.propertyType === pt
                                ? "bg-brand-teal text-white border-brand-teal shadow-soft"
                                : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                            }`}
                          >
                            {pt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: SYSTEMS OF INTEREST & SCALE */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                        Which systems require engineering review? (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {availableSystems.map((sys) => {
                          const IconComp = sys.icon;
                          const isSelected = formData.systemsOfInterest.includes(sys.id);
                          return (
                            <button
                              type="button"
                              key={sys.id}
                              onClick={() => handleSystemToggle(sys.id)}
                              className={`p-4 rounded-xl font-display font-medium text-xs text-left border flex items-center justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                                isSelected
                                  ? "bg-brand-teal text-white border-brand-teal shadow-soft"
                                  : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <IconComp className={`w-4 h-4 ${isSelected ? "text-white" : "text-brand-teal"}`} />
                                <span>{sys.label}</span>
                              </div>
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isSelected ? "border-white bg-white/20 text-white" : "border-brand-grey/40"
                                }`}
                              >
                                {isSelected && "✓"}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                        What is the approximate scale of the site?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {scaleOptions.map((sc) => (
                          <button
                            type="button"
                            key={sc}
                            onClick={() => setFormData({ ...formData, approximateScale: sc })}
                            className={`p-3.5 rounded-xl font-display font-medium text-xs text-left border transition-all duration-200 active:scale-[0.98] cursor-pointer ${
                              formData.approximateScale === sc
                                ? "bg-brand-slate text-white border-brand-slate shadow-soft"
                                : "bg-brand-mist text-brand-slate border-brand-grey/20 hover:border-brand-teal"
                            }`}
                          >
                            {sc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT DETAILS & UK GDPR CONSENT */}
                {step === 3 && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ashok Verma"
                        className="w-full bg-brand-mist border border-brand-grey/20 rounded-xl p-3.5 text-sm font-body text-brand-slate focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-1.5">
                          Professional Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. name@company.co.uk"
                          className="w-full bg-brand-mist border border-brand-grey/20 rounded-xl p-3.5 text-sm font-body text-brand-slate focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-1.5">
                          Direct Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +44 7000 000000"
                          className="w-full bg-brand-mist border border-brand-grey/20 rounded-xl p-3.5 text-sm font-body text-brand-slate focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-1.5">
                        Additional Project Notes / Floor Plan Details (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about specific security risks, target installation dates, or existing hardware..."
                        className="w-full bg-brand-mist border border-brand-grey/20 rounded-xl p-3.5 text-sm font-body text-brand-slate focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all resize-none"
                      />
                    </div>

                    {/* MANDATORY UK GDPR PRIVACY CONSENT (CN-5) */}
                    <div className="pt-2 border-t border-brand-grey/15">
                      <label className="flex items-start gap-3 text-xs font-body text-brand-slate cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={formData.gdprConsent}
                          onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                          className="rounded text-brand-teal focus:ring-brand-teal accent-brand-teal w-4 h-4 mt-0.5 shrink-0 cursor-pointer"
                        />
                        <span className="text-brand-grey leading-relaxed">
                          I consent to Drievu Limited processing my contact data to arrange this engineering review in accordance with the UK General Data Protection Regulation (UK GDPR). View our{" "}
                          <Link href="/privacy" className="text-brand-teal underline hover:text-brand-slate">
                            Privacy Policy
                          </Link>{" "}.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* FORM NAVIGATION CONTROLS */}
                <div className="flex items-center justify-between pt-6 border-t border-brand-grey/15">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => (prev - 1) as Step)}
                      className="inline-flex items-center gap-2 font-display font-medium text-xs text-brand-slate hover:text-brand-teal uppercase tracking-wider px-4 py-3 rounded-xl border border-brand-grey/20 hover:border-brand-teal transition-all duration-200 active:scale-[0.97] cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : (
                    <div /> // Spacer
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => (prev + 1) as Step)}
                      className="bg-brand-teal text-white font-display font-medium text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-soft hover:bg-[#006666] transition-all duration-200 active:scale-[0.97] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.gdprConsent}
                      className="bg-brand-teal text-white font-display font-medium text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-elevated hover:bg-[#006666] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97] inline-flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Submit Scoping Request</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>

          {/* RIGHT COLUMN: Verifiable Due Diligence & Canonical Contact Data (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* CANONICAL IDENTITY BOX (Zero conflicting addresses or placeholder phone numbers) */}
            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/20 space-y-6 shadow-soft">
              <div>
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
                  Direct Engineering Access
                </span>
                <h3 className="font-display font-medium text-xl text-brand-slate tracking-tight">
                  No Call Centers. No Salesmen.
                </h3>
                <p className="font-body font-normal text-xs text-brand-grey mt-2 leading-relaxed">
                  When you book a scoping review, your site details are routed directly to an engineering principal with national-infrastructure delivery discipline.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-brand-grey/20 font-body text-xs text-brand-slate">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display font-medium block text-brand-slate">Registered Canonical Office</span>
                    <span className="text-brand-grey leading-relaxed block mt-0.5">
                      Apartment 3, Minotaur House, 3 Thunderer Walk, London SE18 6LH
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-display font-medium block text-brand-slate">Direct Engineering Line</span>
                    <span className="text-brand-grey font-mono block mt-0.5">+44 7442 605205</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-display font-medium block text-brand-slate">Monitored Corporate Email</span>
                    <span className="text-brand-grey font-mono block mt-0.5">enquiries@drievu.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-display font-medium block text-brand-slate">UK Companies House</span>
                    <span className="text-brand-grey font-mono block mt-0.5">Registration No. 15479482</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HONEST SLA COMMITMENT BOX (Strict enforcement of CN-4) */}
            <div className="bg-brand-slate text-brand-paper p-8 rounded-2xl border border-brand-grey/20 space-y-3 shadow-elevated">
              <span className="font-display font-medium text-xs text-brand-green uppercase tracking-widest block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Procurement-Safe Assurance
              </span>
              <h4 className="font-display font-medium text-lg text-white">
                Our Response Commitment
              </h4>
              <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                We do not promise unrealistic emergency mobilization times before assessing your site. We guarantee an engineering response within <strong>one working day</strong> of your submission, with site survey dates agreed collaboratively during your initial consultation call.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
