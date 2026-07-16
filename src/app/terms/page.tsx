import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText, MapPin, Phone, Mail, Building2, CheckCircle2 } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

export default function TermsOfServicePage() {
  const lastUpdated = "July 2026";

  return (
    <div className="w-full pt-28 md:pt-36 pb-24 bg-brand-paper min-h-screen">
      {/* 
        * LEGAL HEADER SECTION
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking [-0.02em].
        */}
      <section className="bg-brand-slate text-brand-paper py-16 md:py-20 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1000px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-6 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Procurement Due Diligence Schedule
          </div>

          <h1 className="font-display font-medium text-hero-lg w-full text-center text-white uppercase mb-4">
            <SplitTextReveal text="Terms of Service & Scoping Conditions." />
          </h1>
          <ProseReveal>
            <p className="font-body font-normal text-brand-grey text-base md:text-lg max-w-2xl leading-relaxed">
              The operational and legal conditions governing use of the Drievu Limited platform, interactive system configurators, and initial engineering scoping engagements.
            </p>
          </ProseReveal>
          <span className="inline-block mt-6 text-xs font-mono text-brand-paper/60">
            Document Reference: DRIEVU-LEGAL-TERMS-V1 · Last Updated: {lastUpdated}
          </span>
        </div>
      </section>

      {/* DOCUMENT BODY */}
      <section className="py-16 px-6 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: Canonical Identity & Direct Access (4 Columns) */}
          <div className="lg:col-span-4 bg-brand-mist p-8 rounded-2xl border border-brand-grey/20 space-y-6 lg:sticky lg:top-28 shadow-soft">
            <div>
              <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
                Corporate Entity
              </span>
              <h3 className="font-display font-medium text-lg text-brand-slate tracking-tight">
                Drievu Limited
              </h3>
              <p className="font-body font-normal text-xs text-brand-grey mt-2 leading-relaxed">
                Registered in England and Wales under Companies House Registration No. 15479482. Operating as an intelligence-led security and smart building systems consultancy.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-brand-grey/20 font-body text-xs text-brand-slate">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-display font-medium block text-brand-slate">Registered Office</span>
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
                  <span className="font-display font-medium block text-brand-slate">Statutory Jurisdiction</span>
                  <span className="text-brand-grey block mt-0.5">England & Wales</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-grey/20">
              <Link
                href="/consultation"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-teal text-white font-display font-medium text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-soft hover:bg-[#006666] transition-all duration-200 active:scale-[0.97]"
              >
                <span>Book Scoping Review</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Operational & Legal Conditions (8 Columns) */}
          <div className="lg:col-span-8 space-y-10 font-body font-normal text-sm md:text-base text-brand-slate/85 leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                1. General Application & Scope
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated by Drievu Limited (<span className="font-mono text-xs">drievu.com</span>), including our digital scoping wizards, system configurators, and initial consultative engineering reviews.
              </p>
              <p>
                By accessing this website or submitting an engineering scoping review request, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a commercial entity, housing association, or public-sector body, you represent that you possess the legal authority to bind that organization.
              </p>
            </div>

            {/* Section 2: Operational Commitments */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                2. Scoping Reviews & Response Commitments
              </h2>
              <p>
                We operate with consultative engineering discipline. Every project begins with independent advice on system architecture, site risk, and budget before any hardware specification is formally quoted.
              </p>
              <div className="bg-brand-mist p-5 rounded-xl border border-brand-grey/20 space-y-2">
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Our Operational Commitment
                </span>
                <p className="font-body font-normal text-xs md:text-sm text-brand-slate leading-relaxed">
                  We commit to responding to all formal scoping review requests within <strong>one working day</strong>. We do not advertise unverified emergency mobilization SLAs. Physical site surveys, technical audits, and formal design presentations are scheduled collaboratively with an engineering principal following your initial consultation.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                3. System Design, Supply & Installation Standards
              </h2>
              <p>
                Drievu Limited is not a box-shifter or a one-van installer. Where systems are subsequently quoted and commissioned, delivery is governed by the following engineering standards:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-slate/80">
                <li>
                  <strong className="font-medium text-brand-slate">Quality-Verified Supply Chain:</strong> We specify quality-verified equipment from established manufacturers (such as IP PoE surveillance, addressable fire panels, and DIN-rail automation modules), engineered to withstand UK operating environments.
                </li>
                <li>
                  <strong className="font-medium text-brand-slate">British Standards Compliance:</strong> Systems are designed and specified to relevant British Standards, including BS EN guidelines (such as BS EN 50131 and BS EN 62676 for electronic security and surveillance).
                </li>
              </ul>
            </div>

            {/* Section 4: The Handover Guarantee */}
            <div className="bg-brand-mist p-6 rounded-2xl border border-brand-grey/20 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-teal" />
                <h3 className="font-display font-medium text-lg text-brand-slate tracking-tight">
                  4. Documented Handover Guarantee
                </h3>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-brand-slate/85">
                We close the delivery gap inherent in the property management sector. We operate under the strict organizational standard: <em>&quot;If it isn’t documented, it isn’t done&quot;</em>.
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-brand-slate/85">
                Every completed Drievu installation project closes with a structured, verifiable handover pack containing: as-installed device schedules, network and IP topology documentation, administrative credential records, end-user training verification, and data-processing guidance to support your ongoing UK GDPR compliance.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                5. Annual Maintenance Contracts (AMC)
              </h2>
              <p>
                Systems are only as reliable as their ongoing maintenance. Long-term operational support, scheduled preventive maintenance visits, emergency call-out SLAs, and firmware management are provided exclusively under formal Annual Maintenance Contracts (AMC) across our Essential, Professional, and Commercial tiers. The specific response commitments governing active installations are defined within each client&apos;s individual AMC agreement.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                6. Intellectual Property & Website Content
              </h2>
              <p>
                All content, system schematics, deterministic calculation formulas, visual assets, and text published on <span className="font-mono text-xs">drievu.com</span> remain the intellectual property of Drievu Limited. You may download or print indicative system summaries for internal project evaluation, procurement due diligence, or tender structuring. Unauthorized commercial reproduction or automated scraping of our engineering calculation models is strictly prohibited.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                7. Limitation of Liability & Governing Law
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Drievu Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of our digital scoping tools or reliance on initial online estimates. Nothing in these Terms shall limit or exclude our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under English law.
              </p>
              <p>
                These Terms of Service and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction to settle any dispute arising from these Terms or our consultative scoping engagements.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4 pt-4 border-t border-brand-grey/20">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight">
                8. Contacting Our Legal & Engineering Team
              </h2>
              <p className="text-sm">
                For formal due-diligence inquiries, procurement onboarding requests, or clarification regarding these Terms of Service, please contact us in writing at <a href="mailto:enquiries@drievu.com" className="text-brand-teal underline hover:text-brand-slate font-mono">enquiries@drievu.com</a> or via post to our registered office at Minotaur House, London SE18 6LH.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
