// src/components/consultation/ConsultationIntake.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  MapPin,
  User,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { Tactile } from "@/components/motion/MotionPrimitives";
import { EASING_OUT_EXPO } from "@/lib/physics";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const UK_PHONE = /^[\d\s+-]{10,}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_TIMEOUT_MS = 15000;
const FALLBACK_PHONE = "+44 7442 605205";

type PropertyType =
  | "commercial-office"
  | "residential-block"
  | "industrial-logistics"
  | "public-infrastructure"
  | "private-residence";

type TriggerType = "new-install" | "upgrading-existing" | "compliance-requirement";
type CallTime = "morning" | "afternoon" | "either";

interface FormState {
  propertyType: PropertyType | "";
  buildings: number;
  postcode: string;
  trigger: TriggerType[];
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  callTime: CallTime | "";
  website: string; // honeypot — must stay empty
}

const propertyTypes: { id: PropertyType; label: string; desc: string }[] = [
  { id: "commercial-office", label: "Commercial Office", desc: "Multi-floor towers & business parks" },
  { id: "residential-block", label: "Residential Block", desc: "Managed apartments & gated estates" },
  { id: "industrial-logistics", label: "Industrial & Logistics", desc: "Warehouses, depots & manufacturing" },
  { id: "public-infrastructure", label: "Public Infrastructure", desc: "Healthcare, education & civic sites" },
  { id: "private-residence", label: "Private Residence", desc: "High-value independent dwellings" },
];

const triggerOptions: { id: TriggerType; label: string }[] = [
  { id: "new-install", label: "New installation" },
  { id: "upgrading-existing", label: "Upgrading existing system" },
  { id: "compliance-requirement", label: "Compliance requirement" },
];

function validateForm(s: FormState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!s.propertyType) e.propertyType = "Select a property type.";
  if (!Number.isFinite(s.buildings) || s.buildings < 1 || s.buildings > 50) {
    e.buildings = "Enter a number of buildings between 1 and 50.";
  }
  if (!UK_POSTCODE.test(s.postcode.trim())) e.postcode = "Enter a valid UK postcode, e.g. SW1A 1AA.";
  if (s.trigger.length === 0) e.trigger = "Select at least one reason for your enquiry.";
  if (s.name.trim().length < 2) e.name = "Please enter your full name.";
  if (s.company.trim().length < 2) e.company = "Please enter your company or organisation name.";
  if (s.role.trim().length < 2) e.role = "Please enter your role or title.";
  if (!EMAIL.test(s.email.trim())) e.email = "Enter a valid work email, e.g. name@company.co.uk.";
  const phoneDigits = s.phone.replace(/[^\d]/g, "").length;
  if (!UK_PHONE.test(s.phone.trim()) || phoneDigits < 10) e.phone = "Enter a valid phone number — at least 10 digits.";
  if (!s.callTime) e.callTime = "Choose a preferred time to be called.";
  return e;
}

export function ConsultationIntake() {
  const [formState, setFormState] = useState<FormState>({
    propertyType: "",
    buildings: 1,
    postcode: "",
    trigger: [],
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    callTime: "",
    website: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<{ message: string; showPhoneFallback: boolean } | null>(null);

  const liveErrors = validateForm(formState);
  const showError = (field: string) => (touched[field] || submitAttempted) && !!liveErrors[field];

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const markTouched = (field: string) => setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));

  const selectPropertyType = (id: PropertyType) => {
    setField("propertyType", id);
    markTouched("propertyType");
  };

  const toggleTrigger = (id: TriggerType) => {
    setFormState((prev) => {
      const exists = prev.trigger.includes(id);
      return { ...prev, trigger: exists ? prev.trigger.filter((t) => t !== id) : [...prev.trigger, id] };
    });
    markTouched("trigger");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Honeypot tripped — silently drop, no network call, no tell to the bot.
    if (formState.website.trim().length > 0) return;

    if (Object.keys(liveErrors).length > 0) {
      setFormError({ message: "Please correct the highlighted fields before submitting.", showPhoneFallback: false });
      return;
    }

    if (isSubmitting) return;
    setFormError(null);
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType: formState.propertyType,
          buildings: formState.buildings,
          postcode: formState.postcode,
          trigger: formState.trigger,
          name: formState.name,
          company: formState.company,
          role: formState.role,
          email: formState.email,
          phone: formState.phone,
          callTime: formState.callTime,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          setFormError({
            message: "You've submitted a few requests already. Please wait a little while and try again.",
            showPhoneFallback: true,
          });
        } else {
          setFormError({
            message: "Something went wrong on our end and your request didn't send. Please try again in a moment.",
            showPhoneFallback: true,
          });
        }
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof DOMException && err.name === "AbortError") {
        setFormError({
          message: "The request timed out. Please check your connection and try again — your details are still here.",
          showPhoneFallback: true,
        });
      } else {
        setFormError({
          message: "We couldn't reach our servers. Check your internet connection and try again — nothing has been lost.",
          showPhoneFallback: true,
        });
      }
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-paper rounded-2xl border border-brand-grey/15 shadow-elevated overflow-hidden">
      {/* HEADER */}
      <div className="bg-brand-slate text-white p-6 md:p-8 border-b border-white/10 text-center">
        <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
          One Screen. One Submission.
        </span>
        <h1 className="font-display font-medium text-[clamp(1.5rem,3vw,3rem)] w-full text-white tracking-tight">
          Project Scoping Review
        </h1>
      </div>

      <div className="p-6 md:p-12">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASING_OUT_EXPO }}
              className="py-12 text-center max-w-lg mx-auto space-y-4"
            >
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight">
                Received. An engineer will call you within one working day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASING_OUT_EXPO }}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8"
            >
              {/* PROPERTY TYPE */}
              <div>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate mb-2">
                  <SplitTextReveal text="What type of property are we protecting?" />
                </h2>
                <ProseReveal delay={0.3}>
                  <p className="font-body font-normal text-sm text-brand-grey mb-4">
                    Select your environment so we can assign the correct engineering framework.
                  </p>
                </ProseReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {propertyTypes.map((pt) => {
                    const isSelected = formState.propertyType === pt.id;
                    return (
                      <Tactile
                        key={pt.id}
                        tapScale={0.99}
                        aria-label={`${pt.label}${isSelected ? " (selected)" : ""}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            selectPropertyType(pt.id);
                          }
                        }}
                      >
                        <div
                          onClick={() => selectPropertyType(pt.id)}
                          className={`p-5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-brand-slate text-white border-brand-slate shadow-md"
                              : "bg-white text-brand-slate border-brand-grey/20 hover:border-brand-teal/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-medium text-base">{pt.label}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-brand-teal bg-brand-teal text-white" : "border-brand-grey/30"
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className={`font-body font-normal text-xs ${isSelected ? "text-brand-paper/80" : "text-brand-grey"}`}>
                            {pt.desc}
                          </p>
                        </div>
                      </Tactile>
                    );
                  })}
                </div>
                {showError("propertyType") && (
                  <p className="mt-2 font-body font-normal text-xs text-danger-strong">{liveErrors.propertyType}</p>
                )}
              </div>

              {/* BUILDING COUNT */}
              <div className="bg-brand-mist p-5 rounded-xl border border-brand-grey/15">
                <label htmlFor="intake-buildings" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                  Number of Buildings / Blocks
                </label>
                <input
                  id="intake-buildings"
                  type="number"
                  min={1}
                  max={50}
                  required
                  value={formState.buildings}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const num = raw === "" ? NaN : parseInt(raw, 10);
                    setField("buildings", Number.isNaN(num) ? 0 : num);
                  }}
                  onBlur={() => markTouched("buildings")}
                  aria-invalid={showError("buildings")}
                  aria-describedby={showError("buildings") ? "err-buildings" : undefined}
                  className={`w-full bg-white font-body text-sm text-brand-slate px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                    showError("buildings") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                  }`}
                />
                {showError("buildings") && (
                  <p id="err-buildings" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                    {liveErrors.buildings}
                  </p>
                )}
              </div>

              {/* POSTCODE */}
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
                    onBlur={() => markTouched("postcode")}
                    aria-invalid={showError("postcode")}
                    aria-describedby={showError("postcode") ? "err-postcode" : undefined}
                    className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors uppercase ${
                      showError("postcode") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                    }`}
                  />
                </div>
                {showError("postcode") && (
                  <p id="err-postcode" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                    {liveErrors.postcode}
                  </p>
                )}
              </div>

              {/* TRIGGER */}
              <div>
                <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-3">
                  Reason for Enquiry *
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {triggerOptions.map((opt) => {
                    const isChecked = formState.trigger.includes(opt.id);
                    return (
                      <Tactile
                        key={opt.id}
                        tapScale={0.99}
                        aria-label={`${opt.label}${isChecked ? " (selected)" : ""}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleTrigger(opt.id);
                          }
                        }}
                      >
                        <div
                          onClick={() => toggleTrigger(opt.id)}
                          className={`p-4 rounded-xl border flex items-center gap-3 transition-all duration-150 cursor-pointer ${
                            isChecked
                              ? "bg-brand-slate text-white border-brand-slate shadow-md"
                              : "bg-white text-brand-slate border-brand-grey/20 hover:border-brand-teal/50"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                              isChecked ? "border-brand-teal bg-brand-teal text-white" : "border-brand-grey/40 bg-white"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <span className="font-body font-normal text-sm">{opt.label}</span>
                        </div>
                      </Tactile>
                    );
                  })}
                </div>
                {showError("trigger") && (
                  <p className="mt-2 font-body font-normal text-xs text-danger-strong">{liveErrors.trigger}</p>
                )}
              </div>

              {/* CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="intake-name" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-name"
                      type="text"
                      required
                      placeholder="e.g. David Harrison"
                      value={formState.name}
                      onChange={(e) => setField("name", e.target.value)}
                      onBlur={() => markTouched("name")}
                      aria-invalid={showError("name")}
                      aria-describedby={showError("name") ? "err-name" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${
                        showError("name") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                      }`}
                    />
                  </div>
                  {showError("name") && (
                    <p id="err-name" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-company" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Company / Organisation *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-brand-grey absolute left-4 top-4" />
                    <input
                      id="intake-company"
                      type="text"
                      required
                      placeholder="e.g. Harrison Estates Ltd"
                      value={formState.company}
                      onChange={(e) => setField("company", e.target.value)}
                      onBlur={() => markTouched("company")}
                      aria-invalid={showError("company")}
                      aria-describedby={showError("company") ? "err-company" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${
                        showError("company") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                      }`}
                    />
                  </div>
                  {showError("company") && (
                    <p id="err-company" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.company}
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
                    onBlur={() => markTouched("role")}
                    aria-invalid={showError("role")}
                    aria-describedby={showError("role") ? "err-role" : undefined}
                    className={`w-full bg-white font-body text-sm text-brand-slate px-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${
                      showError("role") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                    }`}
                  />
                  {showError("role") && (
                    <p id="err-role" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.role}
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
                      onBlur={() => markTouched("email")}
                      aria-invalid={showError("email")}
                      aria-describedby={showError("email") ? "err-email" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${
                        showError("email") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                      }`}
                    />
                  </div>
                  {showError("email") && (
                    <p id="err-email" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.email}
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
                      onBlur={() => markTouched("phone")}
                      aria-invalid={showError("phone")}
                      aria-describedby={showError("phone") ? "err-phone" : undefined}
                      className={`w-full bg-white font-body text-sm text-brand-slate pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none transition-colors ${
                        showError("phone") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                      }`}
                    />
                  </div>
                  {showError("phone") && (
                    <p id="err-phone" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="intake-callTime" className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block mb-2">
                    Best Time To Call *
                  </label>
                  <select
                    id="intake-callTime"
                    required
                    value={formState.callTime}
                    onChange={(e) => setField("callTime", e.target.value as CallTime)}
                    onBlur={() => markTouched("callTime")}
                    aria-invalid={showError("callTime")}
                    aria-describedby={showError("callTime") ? "err-callTime" : undefined}
                    className={`w-full bg-white font-body text-sm text-brand-slate px-4 py-3.5 rounded-xl border focus:outline-none transition-colors cursor-pointer ${
                      showError("callTime") ? "border-danger focus:border-danger" : "border-brand-grey/30 focus:border-brand-teal"
                    }`}
                  >
                    <option value="" disabled>Select a time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="either">Either</option>
                  </select>
                  {showError("callTime") && (
                    <p id="err-callTime" className="mt-1.5 font-body font-normal text-xs text-danger-strong">
                      {liveErrors.callTime}
                    </p>
                  )}
                </div>
              </div>

              {/* HONEYPOT — hidden from real users, catches bots that fill every field */}
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="intake-website">Leave this field blank</label>
                <input
                  id="intake-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.website}
                  onChange={(e) => setFormState((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              {/* SUBMISSION ERROR SURFACE — announced to assistive tech */}
              {formError && (
                <div role="alert" aria-live="assertive" className="flex items-start gap-3 p-4 rounded-xl bg-danger/5 border border-danger/30">
                  <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-body font-normal text-sm text-danger-strong leading-relaxed">{formError.message}</p>
                    {formError.showPhoneFallback && (
                      <p className="font-body font-normal text-xs text-brand-grey">
                        Prefer to talk now? Call us directly on{" "}
                        <a href={`tel:${FALLBACK_PHONE.replace(/\s/g, "")}`} className="text-brand-teal underline hover:text-brand-slate font-mono">
                          {FALLBACK_PHONE}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-brand-grey/15 flex justify-end">
                <Tactile tapScale={0.98}>
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(liveErrors).length > 0}
                    className="bg-brand-teal text-white font-display font-medium text-sm px-8 py-4 rounded-xl hover:bg-[#006666] transition-all duration-200 flex items-center gap-2 shadow-elevated cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Request Scoping Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </Tactile>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
