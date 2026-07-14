import Link from "next/link";
import { ArrowRight, Shield, Lock, Flame, Radio, Cpu } from "lucide-react";
import { CanvasHero } from "@/components/home/CanvasHero";

export default function HomePage() {
  const systemsGrid = [
    {
      title: "Smart Cameras & Security",
      desc: "Weather-proof cameras that spot intruders instantly and send crystal-clear video straight to your phone, day or night.",
      icon: Shield,
      href: "/systems/surveillance",
    },
    {
      title: "Keyless Door Entry",
      desc: "Video doorbells and smart access panels that let you see who is at the gate and unlock doors from anywhere in the world.",
      icon: Lock,
      href: "/systems/access",
    },
    {
      title: "Fire & Safety Alarms",
      desc: "Instant warning sensors for smoke, heat, and water leaks that alert you and emergency services before damage happens.",
      icon: Flame,
      href: "/systems/fire",
    },
    {
      title: "Intercoms & Sound",
      desc: "Clear public announcement speakers and two-way intercoms that make communication effortless across large buildings.",
      icon: Radio,
      href: "/systems/communication",
    },
    {
      title: "Energy & Comfort Control",
      desc: "Smart sensors that quietly turn off heating and lights in empty rooms, trimming up to 30% off your energy bills automatically.",
      icon: Cpu,
      href: "/systems/smart-building",
    },
  ];

  const workProcess = [
    { step: "01", name: "Listen", desc: "We discuss your property, safety concerns, and budget in plain English." },
    { step: "02", name: "Plan", desc: "We map out camera spots and wiring so nothing looks messy or out of place." },
    { step: "03", name: "Select", desc: "We provide high-quality, reliable equipment proven to last in the UK." },
    { step: "04", name: "Install", desc: "Our engineers fit and wire everything neatly with minimal disruption." },
    { step: "05", name: "Handover", desc: "We test every sensor and give you a simple guide on how to use your app." },
    { step: "06", name: "Support", desc: "We check your systems annually to ensure they never fail when you need them." },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HIGH-PERFORMANCE APPLE 5K SCROLL CANVAS HERO */}
      <CanvasHero />

      {/* 2. CORE CAPABILITIES DIVIDER SYSTEMS GRID */}
      <section className="bg-brand-mist py-24 px-6 border-y border-brand-grey/15 relative z-30">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
                What We Protect
              </span>
              <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tighter">
                Everything Your Building Needs.
              </h2>
            </div>
            <p className="font-body font-normal text-brand-grey text-sm md:text-base max-w-md mt-4 md:mt-0">
              We handle the essential technology that keeps your property secure, comfortable, and well-managed—all controlled easily from your phone or computer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemsGrid.map((sys) => {
              const IconComponent = sys.icon;
              return (
                <div
                  key={sys.title}
                  className="group bg-brand-paper rounded-2xl border border-brand-grey/15 overflow-hidden flex flex-col justify-between hover:border-brand-teal/40 transition-colors duration-200"
                >
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-lg bg-brand-mist flex items-center justify-center text-brand-slate mb-6">
                      <IconComponent className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h3 className="font-display font-medium text-xl text-brand-slate mb-3 group-hover:text-brand-teal transition-colors">
                      {sys.title}
                    </h3>
                    <p className="font-body font-normal text-brand-grey text-sm leading-relaxed">
                      {sys.desc}
                    </p>
                  </div>

                  <div className="px-8 pb-8 pt-4 border-t border-brand-grey/10 flex items-center justify-between">
                    <Link href={sys.href} className="font-display font-medium text-xs text-brand-slate hover:text-brand-teal underline transition-colors">
                      View Tech Specs
                    </Link>
                    <Link href="/consultation" className="font-display font-medium text-xs text-brand-teal uppercase tracking-wider flex items-center gap-1 group-hover:text-brand-slate transition-colors">
                      <span>Get a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED INFRASTRUCTURE METRICS SECTION */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto w-full relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
              Leadership Track Record
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tighter">
              Delivered at Major Scale.
            </h2>
            <p className="font-body font-normal text-brand-slate/85 text-base leading-relaxed">
              Drievu was founded in London by a leadership team with more than two decades of experience delivering security and building systems across some of the most demanding infrastructure sites globally.
            </p>
            
            <div className="bg-brand-mist p-5 rounded-xl border-l-4 border-brand-teal font-body text-xs text-brand-grey leading-relaxed font-mono">
              <strong>DUE DILIGENCE NOTE:</strong> National-infrastructure projects listed inside our full profile were delivered by members of Drievu’s leadership team over the past two decades in prior executive roles. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482).
            </div>

            <Link href="/track-record" className="inline-flex items-center gap-2 font-display font-medium text-sm text-brand-teal hover:underline group">
              <span>View Verified Leadership Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left">
              <span className="font-display font-medium text-5xl text-brand-slate mb-2 block">18+</span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Landmark Projects</span>
              <span className="font-body font-normal text-xs text-brand-grey">Stadiums, metros, airports & infrastructure.</span>
            </div>
            
            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left">
              <span className="font-display font-medium text-5xl text-brand-slate mb-2 block">20+</span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Years Track Record</span>
              <span className="font-body font-normal text-xs text-brand-grey">Executive engineering leadership.</span>
            </div>

            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left">
              <span className="font-display font-medium text-5xl text-brand-teal mb-2 block">5</span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Core Pillars</span>
              <span className="font-body font-normal text-xs text-brand-grey">CCTV, Access, Fire, Audio, Automation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & CONVERSION SURFACE */}
      <section className="bg-brand-slate text-brand-paper py-24 px-6 relative z-30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-display font-medium text-xs text-brand-green uppercase tracking-widest block mb-2">
              Our Simple Process
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white tracking-tighter mb-4">
              How We Deliver Without Stress.
            </h2>
            <p className="font-body font-normal text-brand-grey text-sm md:text-base">
              We never rush into selling you equipment. We take the time to understand your building first, install everything neatly, and show you exactly how it works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {workProcess.map((step) => (
              <div key={step.name} className="flex flex-col items-start lg:items-center lg:text-center group">
                <div className="w-14 h-14 rounded-full bg-brand-slate border-2 border-brand-teal text-white font-display font-medium text-base flex items-center justify-center mb-6">
                  {step.step}
                </div>
                <h3 className="font-display font-medium text-lg text-white mb-2">
                  {step.name}
                </h3>
                <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal text-white py-20 px-6 text-center relative z-30">
        <div className="max-w-3xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            Ready To Upgrade Your Property?
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tighter mb-6">
            Let’s Talk About Your Building.
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
            Whether you manage a residential block, a commercial office, or an industrial facility, get an honest engineering assessment and a clear quote without sales pressure.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl hover:bg-brand-mist transition-colors"
          >
            Start Your Requirement Form
          </Link>
        </div>
      </section>
    </div>
  );
}
