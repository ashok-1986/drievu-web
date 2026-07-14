// src/app/consultation/page.tsx
import React from "react";
import { ConsultationIntake } from "@/components/consultation/ConsultationIntake";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Scoping Review Intake | Drievu UK Engineering",
  description: "Define your electronic security and smart building requirements. Speak directly with London principal engineers without sales pressure.",
};

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-brand-mist py-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-[1200px] mx-auto w-full space-y-12">
        
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-grey/20 text-brand-slate text-xs font-display font-medium uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
            Zero Sales Pressure · Direct Principal Access
          </div>

          <h1 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tighter uppercase">
            Start Your Engineering Scoping.
          </h1>

          <p className="font-body font-normal text-brand-grey text-base md:text-lg leading-relaxed">
            Whether you are planning a new residential development or upgrading legacy systems across a commercial tower, provide your initial parameters below for a structured technical review.
          </p>
        </div>

        {/* MOUNT THE 3-STEP CLIENT WIZARD */}
        <ConsultationIntake />

        {/* BOTTOM ENGINEERING ASSURANCE BAR */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-body text-brand-grey">
            <ShieldCheck className="w-4 h-4 text-brand-teal shrink-0" />
            <span>Strict UK GDPR Data Privacy</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-body text-brand-grey">
            <Lock className="w-4 h-4 text-brand-teal shrink-0" />
            <span>Encrypted Handoff Routing</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-body text-brand-grey">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span>BS EN 50131 / 62676 Compliant</span>
          </div>
        </div>

      </div>
    </main>
  );
}