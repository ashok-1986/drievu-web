import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, FileText, Mail, MapPin, Phone } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" /> UK GDPR Compliance Schedule
          </div>

          <h1 className="font-display font-medium text-3xl md:text-5xl text-white tracking-[-0.02em] uppercase mb-4">
            Privacy Policy & Data Governance.
          </h1>
          <p className="font-body font-normal text-brand-grey text-base md:text-lg max-w-2xl leading-relaxed">
            How Drievu Limited processes website lead data, client engineering specifications, and adheres to the UK General Data Protection Regulation (UK GDPR) across surveillance deployments.
          </p>
          <span className="inline-block mt-6 text-xs font-mono text-brand-paper/60">
            Document Reference: DRIEVU-LEGAL-PRIVACY-V1 · Last Updated: {lastUpdated}
          </span>
        </div>
      </section>

      {/* DOCUMENT BODY */}
      <section className="py-16 px-6 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR: Canonical Controller Details (4 Columns) */}
          <div className="lg:col-span-4 bg-brand-mist p-8 rounded-2xl border border-brand-grey/20 space-y-6 lg:sticky lg:top-28 shadow-soft">
            <div>
              <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
                Data Controller
              </span>
              <h3 className="font-display font-medium text-lg text-brand-slate tracking-tight">
                Drievu Limited
              </h3>
              <p className="font-body font-normal text-xs text-brand-grey mt-2 leading-relaxed">
                We are registered in England and Wales under Company Registration No. 15479482 and act as the Data Controller for contact data collected on this website.
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
                  <span className="font-display font-medium block text-brand-slate">Direct Enquiries</span>
                  <span className="text-brand-grey font-mono block mt-0.5">+44 7442 605205</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                <div>
                  <span className="font-display font-medium block text-brand-slate">Privacy & Legal Contact</span>
                  <span className="text-brand-grey font-mono block mt-0.5">enquiries@drievu.com</span>
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

          {/* RIGHT COLUMN: Legal Terms & Surveillance Protocols (8 Columns) */}
          <div className="lg:col-span-8 space-y-10 font-body font-normal text-sm md:text-base text-brand-slate/85 leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                1. Introduction & Scope
              </h2>
              <p>
                This Privacy Policy sets out how Drievu Limited (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) protects and processes any personal data that you provide when using our website (<span className="font-mono text-xs">drievu.com</span>) or engaging our engineering consulting, design, installation, and maintenance services.
              </p>
              <p>
                We are committed to ensuring that your privacy is protected in strict accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                2. Information We Collect
              </h2>
              <p>
                When you interact with our website, Interactive System Builder, or book an engineering scoping review, we may collect the following categories of personal and technical data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-slate/80">
                <li>
                  <strong className="font-medium text-brand-slate">Identity & Contact Data:</strong> Your full name, professional email address, direct telephone number, and job title/role (e.g., Property Manager, Facilities Manager, Developer).
                </li>
                <li>
                  <strong className="font-medium text-brand-slate">Project & Property Specification Data:</strong> Building typology, approximate unit counts, physical site address, existing hardware setups, and system requirements submitted via our requirement forms.
                </li>
                <li>
                  <strong className="font-medium text-brand-slate">Technical & Analytics Data:</strong> In accordance with our Phase 1 privacy rules, we deploy zero third-party advertising trackers. We may process anonymous, cookieless telemetry (such as page visits and viewport sizing) via privacy-first analytics tools to ensure site performance.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                3. How We Use Your Information
              </h2>
              <p>
                We process your personal data under the lawful basis of <em>contractual necessity</em> and <em>legitimate commercial interests</em> for the following specific purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-brand-slate/80">
                <li>
                  <strong className="font-medium text-brand-slate">Engineering Scoping & Surveys:</strong> To review your property requirements and contact you within our operational commitment of one working day to schedule a site survey.
                </li>
                <li>
                  <strong className="font-medium text-brand-slate">System Design & Quoting:</strong> To engineer tailored proposals, storage calculations, and network diagrams for your building.
                </li>
                <li>
                  <strong className="font-medium text-brand-slate">Contract & Maintenance Fulfillment:</strong> To execute installation testing, commissioning, and SLA-backed Annual Maintenance Contracts (AMC) once a project is awarded.
                </li>
              </ul>
            </div>

            {/* Section 4: Critical Surveillance Differentiator */}
            <div className="bg-brand-mist p-6 rounded-2xl border border-brand-grey/20 space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-teal" />
                <h3 className="font-display font-medium text-lg text-brand-slate tracking-tight">
                  4. CCTV & Surveillance Data Governance
                </h3>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-brand-slate/85">
                CCTV, video intercoms, and access control systems inherently process personal data (video footage and access logs). Drievu Limited designs and installs systems specified to UK GDPR requirements—incorporating appropriate privacy masking, encrypted credentials, and secure on-site NVR storage.
              </p>
              <p className="text-xs md:text-sm leading-relaxed text-brand-slate/85">
                <strong>Important Governance Note:</strong> Upon completion of commissioning and documented handover, the client (Property Manager, Managing Agent, or Building Owner) becomes the statutory <em>Data Controller</em> for all operational CCTV footage and access logs captured on their premises. Every Drievu handover pack includes structured data-processing guidance and retention recommendations to assist controllers in maintaining continuous legal compliance.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                5. Data Security & Retention
              </h2>
              <p>
                We are committed to ensuring your information is secure. We have implemented robust technical and organizational measures to prevent unauthorized access, accidental loss, or disclosure. 
              </p>
              <p>
                We retain client project specifications, engineering drawings, and contact records for the duration of any active warranty or Annual Maintenance Contract (AMC), plus a statutory accounting retention period of six years, after which records are securely archived or deleted.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight border-b border-brand-grey/20 pb-3">
                6. Your Statutory Rights
              </h2>
              <p>
                Under the UK GDPR, you possess rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-brand-slate/80 text-sm">
                <li><strong>The right to access:</strong> Request copies of personal data we hold about you.</li>
                <li><strong>The right to rectification:</strong> Request correction of inaccurate or incomplete project records.</li>
                <li><strong>The right to erasure:</strong> Request deletion of your lead data where ongoing contractual retention is not required.</li>
                <li><strong>The right to restriction & objection:</strong> Object to or restrict the processing of your contact details for marketing communications.</li>
              </ul>
              <p className="text-sm pt-2">
                To exercise any of these statutory rights, please contact our privacy team in writing at <a href="mailto:enquiries@drievu.com" className="text-brand-teal underline hover:text-brand-slate font-mono">enquiries@drievu.com</a> or via our registered postal address. We respond to all formal data requests within 30 days.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4 pt-4 border-t border-brand-grey/20">
              <h2 className="font-display font-medium text-xl md:text-2xl text-brand-slate tracking-tight">
                7. Supervisory Authority
              </h2>
              <p className="text-sm">
                If you have concerns about how we handle your personal data, you have the right to lodge a formal complaint with the UK Information Commissioner&apos;s Office (ICO) via their website (<span className="font-mono text-xs">ico.org.uk</span>) or helpline (0303 123 1113). We welcome the opportunity to resolve any concerns directly before you approach the ICO.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
