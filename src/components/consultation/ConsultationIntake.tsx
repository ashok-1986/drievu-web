// src/components/consultation/ConsultationIntake.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Shield, 
  Lock, 
  Flame, 
  Radio, 
  Cpu, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  User,
  Mail,
  Phone,
  AlertCircle
} from "lucide-react";
import { Tactile, GliderTab, TactileLink } from "@/components/motion/MotionPrimitives";
import { EASING_OUT_EXPO } from "@/lib/physics";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";
import { z } from "zod";

// --- Client-side validation (mirrors the Zod schema in /api/consultation) ---
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const UK_PHONE = /^[\d\s+-]{10,}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DRAFT_KEY = "drievu_consultation_draft";
const REQUEST_TIMEOUT_MS = 15000;

const DraftSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  formState: z.object({
    sector: z.enum(["residential_block", "commercial_office", "industrial_site", "public_sector", "private_estate"]),
    buildingCount: z.string(),
    selectedSystems: z.array(z.string()),
    cameraCount: z.number(),
    hasDrawings: z.boolean(),
    timeline: z.enum(["immediate", "within_3_months", "budgeting_6_months"]),
    postcode: z.string(),
    fullName: z.string(),
    role: z.string(),
    email: z.string(),
    phone: z.string(),
    notes: z.string(),
  }).partial().optional()
});

// Human-readable, field-level messages. Server field keys are kept identical so
// a 400 response's `details` map can be surfaced inline without translation.
function validateContactStep(s: {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  postcode: string;
  buildingCount: string;
  selectedSystems: string[];
}): Record<string, string> {
  const e: Record<string, string> = {};
  if (!s.buildingCount || parseInt(s.buildingCount, 10) < 1) e.buildingCount = "Building count must be at least 1.";
  if (!s.selectedSystems || s.selectedSystems.length === 0) e.selectedSystems = "Select at least one system.";
  
  if (s.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (s.role.trim().length < 2) e.role = "Please enter your role or title.";
  if (!EMAIL.test(s.email.trim())) e.email = "Enter a valid work email, e.g. name@company.co.uk.";
  
  const phoneDigits = s.phone.replace(/[^\d]/g, '').length;
  if (!UK_PHONE.test(s.phone.trim()) || phoneDigits < 10) e.phone = "Enter a valid phone number — at least 10 digits.";
  
  if (!UK_POSTCODE.test(s.postcode.trim())) e.postcode = "Enter a valid UK postcode, e.g. SW1A 1AA.";
  return e;
}

function getEarliestErrorStep(errors: Record<string, string>): 1 | 2 | 3 {
  if (errors.sector || errors.buildingCount) return 1;
  if (errors.selectedSystems || errors.cameraCount) return 2;
  return 3;
}

// Types for our engineering intake state
type SectorType = "residential_block" | "commercial_office" | "industrial_site" | "public_sector" | "private_estate";
type TimelineType = "immediate" | "within_3_months" | "budgeting_6_months";

interface IntakeFormState {
  sector: SectorType;
  buildingCount: string;
  selectedSystems: string[];
  cameraCount: number;
  hasDrawings: boolean;
  timeline: TimelineType;
  postcode: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  notes: string;
}

export function ConsultationIntake() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formState, setFormState] = useState<IntakeFormState>({
    sector: "commercial_office",
    buildingCount: "1",
    selectedSystems: ["surveillance", "access"],
    cameraCount: 16,
    hasDrawings: false,
    timeline: "within_3_months",
    postcode: "",
    fullName: "",
    role: "",
    email: "",
    phone: "",
    notes: "",
  });

  // SSR-safe hydration. Order matters: apply the System Builder spec first, then
  // let a saved in-progress draft override it (the draft is the user's most recent
  // intent), so a refresh mid-form never discards entered details or step position.
  useEffect(() => {
    try {
      const savedSpec = sessionStorage.getItem("drievu_estimator_summary");
      if (savedSpec) {
        const parsed = JSON.parse(savedSpec);
        setFormState((prev) => ({
          ...prev,
          sector: parsed.environment || prev.sector,
          cameraCount: parsed.cameraCount || prev.cameraCount,
          selectedSystems: [
            "surveillance",
            ...(parsed.addons?.includes("access") ? ["access"] : []),
          ],
        }));
      }

      const savedDraft = sessionStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        const parsed = DraftSchema.safeParse(draft);
        if (parsed.success) {
          if (parsed.data.formState) {
            setFormState((prev) => ({ ...prev, ...parsed.data.formState as Partial<IntakeFormState> }));
          }
          if (parsed.data.step && parsed.data.step !== 4) {
            setCurrentStep(parsed.data.step as 1 | 2 | 3);
          }
        }
      }
    } catch (e) {
      // Silently ignore if session storage is unavailable (private mode, etc.)
    }
  }, []);

  // Persist an in-progress draft as the user works. Cleared on successful submit.
  useEffect(() => {
    if (currentStep >= 4) return;
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ formState, step: currentStep })
      );
    } catch (e) {
      // Storage may be unavailable or full; drafting is best-effort, never blocking.
    }
  }, [formState, currentStep]);

  // Update a single field and clear its inline error as the user corrects it.
  const setField = (field: keyof IntakeFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field as string]) return prev;
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const handleSystemToggle = (systemId: string) => {
    setFormState((prev) => {
      const exists = prev.selectedSystems.includes(systemId);
      return {
        ...prev,
        selectedSystems: exists
          ? prev.selectedSystems.filter((id) => id !== systemId)
          : [...prev.selectedSystems, systemId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // guard against rapid double-submit

    // Validate on the client first — instant feedback, no wasted round-trip.
    const errors = validateContactStep(formState);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("Please correct the highlighted fields before submitting.");
      setCurrentStep(getEarliestErrorStep(errors));
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({} as Record<string, unknown>));

      if (!response.ok) {
        if (response.status === 400 && payload && (payload as any).details) {
          const details = (payload as any).details as Record<string, string[]>;
          const mapped: Record<string, string> = {};
          for (const [key, messages] of Object.entries(details)) {
            if (Array.isArray(messages) && messages[0]) mapped[key] = messages[0];
          }
          setFieldErrors(mapped);
          setSubmitError("Some details need attention. Please review the highlighted fields.");
          setCurrentStep(getEarliestErrorStep(mapped));
        } else if (response.status === 429) {
          setSubmitError(
            "You've submitted a few requests already. Please wait a little while and try again — or call us directly if it's urgent."
          );
        } else {
          setSubmitError(
            "Something went wrong on our end and your request didn't send. Please try again in a moment."
          );
        }
        setIsSubmitting(false);
        return;
      }

      // Success — clear the carried spec and the working draft.
      setIsSubmitting(false);
      setCurrentStep(4);
      try {
        sessionStorage.removeItem("drievu_estimator_summary");
        sessionStorage.removeItem(DRAFT_KEY);
      } catch (e) {}
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof DOMException && err.name === "AbortError") {
        setSubmitError(
          "The request timed out. Please check your connection and try again — your details are still here."
        );
      } else {
        setSubmitError(
          "We couldn't reach our servers. Check your internet connection and try again — nothing has been lost."
        );
      }
    } finally {
      clearTimeout(timeout);
    }
  };

  const sectors = [
    { id: "commercial_office", label: "Commercial Office", desc: "Multi-floor towers & business parks" },
    { id: "residential_block", label: "Residential Block", desc: "Managed apartments & gated estates" },
    { id: "industrial_site", label: "Industrial & Logistics", desc: "Warehouses, depots & manufacturing" },
    { id: "public_sector", label: "Public Infrastructure", desc: "Healthcare, education & civic sites" },
    { id: "private_estate", label: "Private Residence", desc: "High-value independent dwellings" },
  ];

  const systems = [
    { id: "surveillance", label: "Smart CCTV Surveillance", icon: Shield, desc: "4K AI cameras with night vision & zero cloud monthly fees." },
    { id: "access", label: "Keyless Door Entry", icon: Lock, desc: "Video doorbells & remote access gates managed from your phone." },
    { id: "fire", label: "Fire & Life Safety", icon: Flame, desc: "Instant smoke & heat sensors compliant with British Safety Standards." },
    { id: "intercom", label: "Audio & Intercoms", icon: Radio, desc: "Clear two-way communication across entrances and large sites." },
    { id: "automation", label: "Energy & Comfort Control", icon: Cpu, desc: "Smart automation trimming up to 30% off building energy waste." },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-paper rounded-2xl border border-brand-grey/15 shadow-elevated overflow-hidden">
      
      {/* STEP INDICATOR HEADER */}
      {currentStep < 4 && (
        <div className="bg-brand-slate text-white p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
              Direct Engineering Routing
            </span>
            <h1 className="font-display font-medium text-[clamp(1.5rem,3vw,3rem)] w-full text-center text-white tracking-tight">
              Project Scoping Review
            </h1>
          </div>

          {/* Progress Pills */}
          <div className="flex items-center gap-2 font-display font-medium text-xs">
            <span className={`px-3 py-1.5 rounded-full ${currentStep === 1 ? "bg-brand-teal text-white" : "bg-white/10 text-brand-paper/80"}`}>
              01 · Sector
            </span>
            <span className={`px-3 py-1.5 rounded-full ${currentStep === 2 ? "bg-brand-teal text-white" : "bg-white/10 text-brand-paper/80"}`}>
              02 · Systems
            </span>
            <span className={`px-3 py-1.5 rounded-full ${currentStep === 3 ? "bg-brand-teal text-white" : "bg-white/10 text-brand-paper/80"}`}>
              03 · Handoff
            </span>
          </div>
        </div>
      )}

      {/* STEP CONTENT AREA WITH ZERO-JANK ANIMATE PRESENCE */}
      <div className="p-6 md:p-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PROPERTY SECTOR & SCALE */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: EASING_OUT_EXPO }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate mb-2">
                  <SplitTextReveal text="What type of property are we protecting?" />
                </h2>
                <ProseReveal delay={0.3}>
                  <p className="font-body font-normal text-sm text-brand-grey">
                    Select your environment so we can assign the correct British Standard engineering framework.
                  </p>
                </ProseReveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectors.map((sec) => {
                  const isSelected = formState.sector === sec.id;
                  return (
                    <Tactile key={sec.id} tapScale={0.99} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFormState({ ...formState, sector: sec.id as SectorType }); }}>
                      <div
                        onClick={() => setFormState({ ...formState, sector: sec.id as SectorType })}
                        className={`p-5 rounded-xl border text-left transition-all duration-150 ${
                          isSelected 
                            ? "bg-brand-slate text-white border-brand-slate shadow-md" 
                            : "bg-white text-brand-slate border-brand-grey/20 hover:border-brand-teal/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-display font-medium text-base">{sec.label}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-brand-teal bg-brand-teal text-white" : "border-brand-grey/30"}`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                        </div>
                        <p className={`font-body font-normal text-xs ${isSelected ? "text-brand-paper/80" : "text-brand-grey"}`}>
                          {sec.desc}
                        </p>
                      </div>
                    </Tactile>
                  );
                })}
              </div>

              {/* Building Count Input */}
              <div className="bg-brand-mist p-5 rounded-xl border border-brand-grey/15">
                <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                  Number of Buildings / Blocks
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formState.buildingCount}
                  onChange={(e) => setFormState({ ...formState, buildingCount: e.target.value })}
                  className="w-full bg-white font-body text-sm text-brand-slate px-4 py-3 rounded-xl border border-brand-grey/30 focus:outline-none focus:border-brand-teal transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-brand-grey/15 flex items-center justify-between">
                <span className="font-body font-normal text-xs text-brand-grey">
                  Step 1 of 3 · No obligation or sales pressure
                </span>
                <Tactile tapScale={0.98}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-brand-teal text-white font-display font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-[#006666] transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Define Systems</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Tactile>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SYSTEM BLUEPRINT */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: EASING_OUT_EXPO }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate mb-2">
                  <SplitTextReveal text="Which systems require engineering attention?" />
                </h2>
                <ProseReveal delay={0.3}>
                  <p className="font-body font-normal text-sm text-brand-grey">
                    We design integrated systems that work seamlessly from one app. Select all that apply.
                  </p>
                </ProseReveal>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {systems.map((sys) => {
                  const isSelected = formState.selectedSystems.includes(sys.id);
                  const IconComp = sys.icon;
                  return (
                    <Tactile key={sys.id} tapScale={0.99} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleSystemToggle(sys.id); }}>
                      <div
                        onClick={() => handleSystemToggle(sys.id)}
                        className={`p-5 rounded-xl border flex items-start gap-4 transition-all duration-150 ${
                          isSelected 
                            ? "bg-brand-slate text-white border-brand-slate shadow-md" 
                            : "bg-white text-brand-slate border-brand-grey/20 hover:border-brand-teal/50"
                        }`}
                      >
                        <div className={`p-3 rounded-lg mt-0.5 shrink-0 ${isSelected ? "bg-brand-teal text-white" : "bg-brand-mist text-brand-slate"}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display font-medium text-base">{sys.label}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-brand-teal bg-brand-teal text-white" : "border-brand-grey/30"}`}>
                              {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className={`font-body font-normal text-xs ${isSelected ? "text-brand-paper/80" : "text-brand-grey"}`}>
                            {sys.desc}
                          </p>
                        </div>
                      </div>
                    </Tactile>
                  );
                })}
              </div>

              {/* Dynamic Camera Count Slider if CCTV selected */}
              {formState.selectedSystems.includes("surveillance") && (
                <div className="bg-brand-mist p-6 rounded-xl border border-brand-grey/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-medium text-sm text-brand-slate">
                      Estimated Camera Spots Required
                    </span>
                    <span className="font-display font-medium text-base text-brand-teal bg-white px-3 py-1 rounded-md border border-brand-grey/20 shadow-sm">
                      {formState.cameraCount} Cameras
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    step="4"
                    value={formState.cameraCount}
                    onChange={(e) => setFormState({ ...formState, cameraCount: parseInt(e.target.value) })}
                    className="w-full accent-brand-teal cursor-pointer"
                  />
                  <p className="font-body font-normal text-xs text-brand-grey">
                    Includes night-vision zoning and 30-day on-site local recording without monthly cloud storage fees.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-brand-grey/15 flex items-center justify-between">
                <Tactile tapScale={0.98}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="bg-white text-brand-slate border border-brand-grey/30 font-display font-medium text-sm px-5 py-3.5 rounded-xl hover:bg-brand-mist transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </Tactile>

                <div className="flex flex-col items-end gap-2">
                  {formState.selectedSystems.length === 0 && (
                    <span className="font-body font-normal text-xs text-danger-strong">
                      Select at least one system to continue.
                    </span>
                  )}
                  <Tactile tapScale={0.98}>
                    <button
                      type="button"
                      disabled={formState.selectedSystems.length === 0}
                      onClick={() => {
                        if (formState.selectedSystems.length > 0) setCurrentStep(3);
                      }}
                      className="bg-brand-teal text-white font-display font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-[#006666] transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Site Logistics</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Tactile>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SITE LOGISTICS & HANDOFF */}
          {currentStep === 3 && (
            <motion.form
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: EASING_OUT_EXPO }}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate mb-2">
                  <SplitTextReveal text="Where should we send the technical review?" />
                </h2>
                <ProseReveal delay={0.3}>
                  <p className="font-body font-normal text-sm text-brand-grey">
                    Your details are protected under UK GDPR. You speak directly with principal engineers—never salespeople.
                  </p>
                </ProseReveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="intake-fullName" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-fullName"
                      type="text"
                      required
                      placeholder="e.g. David Harrison"
                      value={formState.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      aria-invalid={!!fieldErrors.fullName}
                      aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${fieldErrors.fullName ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"}`}
                    />
                  </div>
                  {fieldErrors.fullName && (
                    <p id="err-fullName" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-role" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Your Role / Title *
                  </label>
                  <input
                    id="intake-role"
                    type="text"
                    required
                    placeholder="e.g. Facilities Director / Architect"
                    value={formState.role}
                    onChange={(e) => setField("role", e.target.value)}
                    aria-invalid={!!fieldErrors.role}
                    aria-describedby={fieldErrors.role ? "err-role" : undefined}
                    className={`w-full bg-white font-body text-sm text-brand-slate px-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${fieldErrors.role ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"}`}
                  />
                  {fieldErrors.role && (
                    <p id="err-role" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {fieldErrors.role}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-email" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-email"
                      type="email"
                      required
                      placeholder="david@harrison-estates.co.uk"
                      value={formState.email}
                      onChange={(e) => setField("email", e.target.value)}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "err-email" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${fieldErrors.email ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"}`}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p id="err-email" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-phone" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Direct Phone / Mobile *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-phone"
                      type="tel"
                      required
                      placeholder="07700 900077"
                      value={formState.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${fieldErrors.phone ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"}`}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p id="err-phone" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="intake-postcode" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Site UK Postcode *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-postcode"
                      type="text"
                      required
                      placeholder="e.g. SW1A 1AA"
                      value={formState.postcode}
                      onChange={(e) => setField("postcode", e.target.value)}
                      aria-invalid={!!fieldErrors.postcode}
                      aria-describedby={fieldErrors.postcode ? "err-postcode" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors uppercase ${fieldErrors.postcode ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"}`}
                    />
                  </div>
                  {fieldErrors.postcode && (
                    <p id="err-postcode" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {fieldErrors.postcode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Target Timeline
                  </label>
                  <select
                    value={formState.timeline}
                    onChange={(e) => setFormState({ ...formState, timeline: e.target.value as TimelineType })}
                    className="w-full bg-white font-body text-sm text-brand-slate px-4 py-3.5 rounded-xl border border-brand-grey/30 focus:outline-none focus:border-brand-teal transition-colors cursor-pointer"
                  >
                    <option value="immediate">Immediate / Emergency Review</option>
                    <option value="within_3_months">Within Next 3 Months</option>
                    <option value="budgeting_6_months">Planned Budgeting (6+ Months)</option>
                  </select>
                </div>
              </div>

              {/* CAD / Drawings Checkbox */}
              <div 
                onClick={() => setFormState({ ...formState, hasDrawings: !formState.hasDrawings })}
                className="p-4 rounded-xl bg-brand-mist border border-brand-grey/15 flex items-center justify-between cursor-pointer hover:border-brand-teal/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-display font-medium text-sm text-brand-slate block">
                      I have architectural CAD drawings or floorplans available
                    </span>
                    <span className="font-body font-normal text-xs text-brand-grey">
                      We will provide a secure upload link in our follow-up email.
                    </span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formState.hasDrawings ? "border-brand-teal bg-brand-teal text-white" : "border-brand-grey/40 bg-white"}`}>
                  {formState.hasDrawings && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Submission error surface — announced to assistive tech */}
              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 p-4 rounded-xl bg-danger/5 border border-danger/30"
                >
                  <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="font-body font-normal text-sm text-danger-strong leading-relaxed">
                    {submitError}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-brand-grey/15 flex items-center justify-between">
                <Tactile tapScale={0.98}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-white text-brand-slate border border-brand-grey/30 font-display font-medium text-sm px-5 py-3.5 rounded-xl hover:bg-brand-mist transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </Tactile>

                <Tactile tapScale={0.98}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-teal text-white font-display font-medium text-sm px-8 py-4 rounded-xl hover:bg-[#006666] transition-all duration-200 flex items-center gap-2 shadow-elevated cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Routing...</span>
                    ) : (
                      <>
                        <span>Submit For Principal Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </Tactile>
              </div>
            </motion.form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION VIEW */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASING_OUT_EXPO }}
              className="py-12 text-center max-w-lg mx-auto space-y-6"
            >
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-display font-medium text-xs text-brand-green uppercase tracking-widest block">
                  Transmission Confirmed
                </span>
                <h2 className="font-display font-medium text-2xl md:text-3xl text-brand-slate tracking-tight">
                  <SplitTextReveal text="Your Scoping Blueprint is with our Principal Engineers." />
                </h2>
                <ProseReveal delay={0.3}>
                  <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
                    Thank you, {formState.fullName}. We have routed your property specifications for the <strong className="font-medium text-brand-slate uppercase">{formState.sector.replace("_", " ")}</strong> sector in <strong className="font-medium text-brand-slate">{formState.postcode}</strong> directly to our technical desk.
                  </p>
                </ProseReveal>
              </div>

              <div className="bg-brand-mist p-6 rounded-xl border border-brand-grey/15 text-left space-y-2">
                <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block">
                  What happens next?
                </span>
                <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                  1. A principal systems architect will review your system selections within 4 working hours.<br />
                  2. You will receive an email with preliminary hardware recommendations and SLA terms.<br />
                  3. If drawings were indicated, a secure cloud upload link will be included.
                </p>
              </div>

              <div className="pt-4">
                <Tactile tapScale={0.98}>
                  <a
                    href="/"
                    className="inline-block bg-brand-slate text-white font-display font-medium text-sm px-8 py-4 rounded-xl hover:bg-[#2A383E] transition-colors shadow-md"
                  >
                    Return to Homepage
                  </a>
                </Tactile>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}