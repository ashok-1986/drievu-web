// src/app/compliance/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Lock, FileText, Network } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";
import { ScrollReveal } from "@/components/motion/MotionPrimitives";

export default function CompliancePage() {
  return (
    <div className="w-full bg-brand-paper min-h-screen">
      {/* 
        * HERO HEADER SECTION
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking [-0.03em].
        */}
      <section className="bg-brand-slate text-brand-paper pt-28 md:pt-36 pb-16 md:pb-24 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1000px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-8 hover:underline cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Engineering & Legal Governance
          </div>

          <h1 className="font-display font-medium text-hero w-full text-white uppercase drop-shadow-md mb-6">
            <SplitTextReveal text="Compliance & Design Standards." />
          </h1>
          <ProseReveal>
            <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg  prose-text-shadow max-w-2xl mx-auto block">
              We operate with absolute transparency. Below are the statutory regulations, British engineering standards, and cybersecurity frameworks that govern how Drievu designs, installs, and hands over your physical building systems.
            </p>
          </ProseReveal>
        </div>
      </section>

      {/* 
        * COMPLIANCE PILLARS GRID
        * Focuses on PSTI, UK GDPR, and BS EN Standards as design commitments.
        */}
      <section className="py-20 px-6 max-w-[1000px] mx-auto">
        <ScrollReveal stagger={0.08} className="space-y-12">

          {/* 1. British Standards (BS EN) */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-brand-grey/20 shadow-soft flex flex-col md:flex-row gap-8 items-start hover:border-brand-teal/50 transition-colors duration-200">
            <div className="w-14 h-14 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
                  Smart Home & Automation Design
                </span>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate ">
                  British Standards (BS EN) Adherence
                </h2>
              </div>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                We do not install ad-hoc hardware. Our systems are designed with reference to applicable, scope-specific standards—such as <span className="font-mono text-xs bg-brand-mist px-1.5 py-0.5 rounded border border-brand-grey/20">BS EN 50131</span> for perimeter security and <span className="font-mono text-xs bg-brand-mist px-1.5 py-0.5 rounded border border-brand-grey/20">BS EN 62676</span> for video systems—where relevant to the project brief, alongside KNX and DALI-2 open architecture protocols for lighting and climate.
              </p>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                By referencing these established architectural methodologies, we support the robust operational, environmental, and mechanical thresholds typically required for architect review and M&E consultant evaluation.
              </p>
            </div>
          </div>

          {/* 2. PSTI Act Awareness (Cybersecurity) */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-brand-grey/20 shadow-soft flex flex-col md:flex-row gap-8 items-start hover:border-brand-teal/50 transition-colors duration-200">
            <div className="w-14 h-14 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <Network className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
                  Hardware Cybersecurity
                </span>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate ">
                  PSTI Act Supply Chain Compliance
                </h2>
              </div>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                In alignment with the UK Product Security and Telecommunications Infrastructure (PSTI) Act, where applicable, Drievu sources internet-connected devices (such as IP cameras and NVRs) from manufacturers, importers, or distributors that provide relevant product-specific Statements of Compliance.
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span className="font-body font-normal text-sm text-brand-slate/80">No hardware is deployed with universal default passwords.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span className="font-body font-normal text-sm text-brand-slate/80">All network devices feature documented vulnerability reporting channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span className="font-body font-normal text-sm text-brand-slate/80">Clear transparency on minimum guaranteed security update periods.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. UK GDPR Data Processing */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-brand-grey/20 shadow-soft flex flex-col md:flex-row gap-8 items-start hover:border-brand-teal/50 transition-colors duration-200">
            <div className="w-14 h-14 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
                  Privacy & Data Governance
                </span>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate ">
                  UK GDPR Deployment Discipline
                </h2>
              </div>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                Video surveillance, access control, and smart home occupancy sensors inherently process personal data. Drievu engineers your physical network with documented, risk-based controls to support you—the Data Controller—in meeting your UK GDPR responsibilities.
              </p>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                Our designs incorporate physical network isolation, configurable privacy-masking features, and support for Data Protection Impact Assessments (DPIAs). We define secure credential storage, access, and rotation controls—ensuring data collection, retention, and processing remain aligned with your specific organizational policies.
              </p>
            </div>
          </div>

          {/* 4. The Handover Guarantee */}
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-brand-grey/20 shadow-soft flex flex-col md:flex-row gap-8 items-start hover:border-brand-teal/50 transition-colors duration-200">
            <div className="w-14 h-14 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-4">
              <div>
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-1">
                  Project Closure Standard
                </span>
                <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate ">
                  The Documented Handover pack
                </h2>
              </div>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                Our internal compliance law is simple: <em className="text-brand-slate font-medium">If it isn't documented, it isn't done.</em> 
              </p>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                Every Drievu deployment concludes with a structured handover pack. This mandatory file includes your as-installed equipment schedules, logical network topology maps, an administrator account inventory, user training sign-offs, and UK GDPR data-processing guidance.
              </p>
              <p className="font-body font-normal text-brand-slate/85 text-sm md:text-base ">
                Secrets are transferred exclusively via secure out-of-band processes—never as plaintext—and all temporary deployment credentials must be rotated upon handover. This documented baseline supports insurer review and streamlines onboarding for future maintenance contracts.
              </p>
            </div>
          </div>

        </ScrollReveal>
      </section>

      {/* 
        * CONVERSION FOOTER
        * Funnels compliance-focused specifiers into the requirement form.
        */}
      <section className="mt-12 bg-brand-teal text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            Pass Your Procurement Audit
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl  mb-6">
            <SplitTextReveal text="Require a Compliant System Design?" />
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 ">
            Submit your floor plans and unit counts to our engineering team today. We provide structured scoping reviews backed by transparent, standards-driven engineering.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition duration-200 active:scale-[0.97] cursor-pointer"
          >
            Start Your Requirement Form
          </Link>
        </div>
      </section>
    </div>
  );
}
