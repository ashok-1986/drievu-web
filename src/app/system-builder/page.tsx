// src/app/system-builder/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, HelpCircle, ChevronDown, HardDrive, Lock, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveSystemBuilder } from "@/components/home/InteractiveSystemBuilder";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

interface FaqItem {
  question: string;
  answer: string;
}

export default function SystemBuilderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* 
   * 12TH-GRADE PLAIN ENGLISH FAQ DICTIONARY
   * Eliminates sales friction by answering the most common technical and pricing concerns
   * in simple, everyday language. Max structural font weight: font-medium (500).
   */
  const faqData: FaqItem[] = [
    {
      question: "Why do you recommend on-site video recorders instead of cloud storage?",
      answer: "Storing continuous, high-definition video in the cloud for multiple cameras requires massive internet upload speeds and costs hundreds of pounds in recurring monthly subscription fees. By providing a dedicated on-site video recorder with high-capacity surveillance drives, your footage stays crystal-clear, 100% private, and entirely under your ownership with zero monthly cloud fees."
    },
    {
      question: "How accurate are these hard drive and wiring calculations?",
      answer: "Our mathematical engine uses the exact data rates of our deployed weather-proof smart cameras. When you select your camera count and require 30 days of saved video, we calculate the precise number of high-capacity hard drives and network switches needed so your system never runs out of recording space or processing power."
    },
    {
      question: "What happens after I click 'Send to Requirement Form'?",
      answer: "Your customized estimate—including your camera channels, video storage capacity, and property type—is silently attached to your browser session. When you proceed to the requirement form, your blueprint is pre-filled automatically. An engineering principal then reviews your layout and responds within one working day to arrange your structured site survey."
    },
    {
      question: "Can I start with security cameras and add keyless door entry later?",
      answer: "Yes. All our structured network wiring and high-speed switches are specified with spare capacity. This means you can easily expand your property's protection by adding keyless intercom panels, smart access fobs, or emergency battery backups whenever your timeline and budget allow."
    }
  ];

  return (
    <div className="w-full bg-brand-paper min-h-screen select-none">
      {/* 
        * HERO HEADER SECTION
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking [-0.03em].
        */}
      <section className="bg-brand-slate text-brand-paper pt-28 md:pt-36 pb-16 md:pb-24 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-8 hover:underline cursor-pointer w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Transparent Engineering Sizing
          </div>

          <h1 className="font-display font-medium text-hero w-full text-white uppercase drop-shadow-md mb-6">
            <SplitTextReveal text="Interactive System Builder." />
          </h1>
          <ProseReveal>
            <p className="font-body font-normal text-brand-grey text-lg md:text-xl max-w-3xl leading-relaxed">
              Most security quotes are inflated with unnecessary hardware and recurring subscription traps. Use our plain-English sizing engine below to calculate your exact equipment, video storage, and wiring requirements automatically—without sales pressure.
            </p>
          </ProseReveal>
        </div>
      </section>

      {/* 
        * WHY WE BUILT THIS TOOL (3-Column Educational Grid)
        * Reinforces Drievu's consulting-to-maintenance discipline in everyday language.
        */}
      <section className="bg-brand-mist py-16 px-6 border-b border-brand-grey/15">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-brand-grey/15 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-xl text-brand-slate mb-2 tracking-tight">
                Zero Cloud Fee Traps
              </h3>
              <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
                We size dedicated on-site video recorders with high-capacity surveillance drives. You own your footage completely, avoiding expensive monthly cloud storage bills.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-brand-grey/10 flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Data Ownership</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-grey/15 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-xl text-brand-slate mb-2 tracking-tight">
                Right-Sized Hardware
              </h3>
              <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
                Whether you manage a 10-unit residential block or a large commercial estate, our mathematical engine specifies the exact camera channels and network switches required.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-brand-grey/10 flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>British Standards Quality</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-grey/15 shadow-soft flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-xl text-brand-slate mb-2 tracking-tight">
                Direct Engineer Handoff
              </h3>
              <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
                When you finish estimating, your configuration attaches directly to your review request. You deal with executive engineering principals, never call-center salesmen.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-brand-grey/10 flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>1 Working Day Response</span>
            </div>
          </div>

        </div>
      </section>

      {/* 
        * THE EMBEDDED CONFIGURATOR TOOL
        * Renders our clean InteractiveSystemBuilder component in the center of the experience.
        */}
      <section className="py-20 px-6 max-w-[1250px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
            Interactive Calculator
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tight">
            Configure Your Blueprint.
          </h2>
        </div>

        {/* Embedded Configurator Component */}
        <InteractiveSystemBuilder />
      </section>

      {/* 
        * FREQUENTLY ASKED SCOPING QUESTIONS (UI/UX Pro Max Accordion)
        * Emil Kowalski tactile touch physics: active:scale-[0.99] with smooth height expansions.
        */}
      <section className="py-16 px-6 max-w-[900px] mx-auto border-t border-brand-grey/15">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal mb-4">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="font-display font-medium text-3xl md:text-4xl text-brand-slate tracking-tight mb-3">
            Frequently Asked Scoping Questions.
          </h2>
          <p className="font-body font-normal text-sm md:text-base text-brand-grey">
            Everything you need to know about our sizing calculations, hardware ownership, and engineering reviews.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-brand-teal shadow-soft ring-1 ring-brand-teal/20"
                    : "bg-brand-mist/50 border-brand-grey/20 hover:border-brand-teal/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left font-display font-medium text-base md:text-lg text-brand-slate flex items-center justify-between gap-4 cursor-pointer active:scale-[0.99] transition-transform select-none"
                >
                  <span className="tracking-tight">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? "#008080" : "#FFFFFF", color: isOpen ? "#FFFFFF" : "#1F2A2E" }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-brand-grey/20 shadow-sm"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* EMIL KOWALSKI ORIGIN-AWARE DRAWER UNROLL */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} // Asymmetric out-expo curve
                      className="overflow-hidden origin-top"
                    >
                      <div className="px-6 pb-6 pt-2 font-body font-normal text-sm md:text-base text-brand-grey leading-relaxed border-t border-brand-grey/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        * UNIVERSAL CONVERSION FOOTER BANNER
        * Catches decision-makers who explored the FAQ and funnels them into /consultation.
        */}
      <section className="mt-12 bg-brand-teal text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            No Call Centers · No Salesmen
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tighter mb-6">
            <SplitTextReveal text="Ready For An Engineering Assessment?" />
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
            If you prefer to skip the calculator and speak directly with our team, submit your building details today. An engineering principal will review your property and respond within one working day.
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
