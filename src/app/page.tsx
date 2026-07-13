"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, CheckCircle2, Shield, Lock, Flame, Radio, Cpu } from "lucide-react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Trionn Word-Stagger Hero Reveal (60ms stagger, out-expo curve) [source: 2, 5]
      const words = gsap.utils.toArray(".hero-word");
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          delay: 0.15,
        }
      );

      // 2. SVG Process Line Draw (Animates left-to-right on scroll into view) [source: 2, 5]
      if (processLineRef.current) {
        const length = processLineRef.current.getTotalLength();
        gsap.set(processLineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(processLineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#process-section",
            start: "top 75%",
            once: true, // Triggers once and never replays [source: 2, 5]
          },
        });
      }

      // 3. Stat Counter Animation (Counts up smoothly over 1.2s on first view) [source: 2, 5]
      const counters = gsap.utils.toArray(".stat-counter") as HTMLElement[];
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const suffix = counter.getAttribute("data-suffix") || "";
        
        gsap.fromTo(
          counter,
          { innerText: "0" },
          {
            innerText: target,
            duration: 1.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              once: true,
            },
            onUpdate: function () {
              counter.innerText = Math.floor(Number(counter.innerText)) + suffix;
            },
            onComplete: function () {
              counter.innerText = target + suffix;
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* 
   * 12TH-GRADE PLAIN ENGLISH SYSTEMS DICTIONARY [source: 3]
   * All technical jargon (IP67, IK10, H.265+, PoE, NVR) is strictly isolated to /systems/[category] [source: 3, 5].
   * Maximum structural font weight applied: font-medium (500) [source: 5].
   */
  const systemsGrid = [
    {
      title: "Smart Cameras & Security",
      desc: "Weather-proof cameras that spot intruders instantly and send crystal-clear video straight to your phone, day or night [source: 5, 8].",
      imagePrompt: "Architectural detail of a sleek white dome camera on concrete ceiling, soft lighting --ar 16:9 --style raw",
      icon: Shield,
      href: "/systems/surveillance",
    },
    {
      title: "Keyless Door Entry",
      desc: "Video doorbells and smart access panels that let you see who is at the gate and unlock doors from anywhere in the world [source: 5, 8].",
      imagePrompt: "Flush mounted black glass video intercom next to luxury brushed metal door handle --ar 16:9 --style raw",
      icon: Lock,
      href: "/systems/access",
    },
    {
      title: "Fire & Safety Alarms",
      desc: "Instant warning sensors for smoke, heat, and water leaks that alert you and emergency services before damage happens [source: 5, 8].",
      imagePrompt: "Minimalist modern smoke detector ceiling mount in clean commercial gallery room --ar 16:9 --style raw",
      icon: Flame,
      href: "/systems/fire",
    },
    {
      title: "Intercoms & Sound",
      desc: "Clear public announcement speakers and two-way intercoms that make communication effortless across large buildings [source: 7].",
      imagePrompt: "Modern minimalist wall speaker in luxury office lobby, wood and concrete textures --ar 16:9 --style raw",
      icon: Radio,
      href: "/systems/communication",
    },
    {
      title: "Energy & Comfort Control",
      desc: "Smart sensors that quietly turn off heating and lights in empty rooms, trimming up to 30% off your energy bills automatically [source: 5, 8].",
      imagePrompt: "Glass touch screen thermostat on white wall showing clean temperature numbers --ar 16:9 --style raw",
      icon: Cpu,
      href: "/systems/smart-building",
    },
  ];

  /* 
   * 12TH-GRADE PROCESS WORKFLOW [source: 3]
   * Friendly, humanized action words replacing dry corporate terminology [source: 3].
   */
  const workProcess = [
    { step: "01", name: "Listen", desc: "We discuss your property, safety concerns, and budget in plain English [source: 5]." },
    { step: "02", name: "Plan", desc: "We map out camera spots and wiring so nothing looks messy or out of place [source: 5]." },
    { step: "03", name: "Select", desc: "We provide high-quality, reliable equipment proven to last in the UK [source: 5]." },
    { step: "04", name: "Install", desc: "Our engineers fit and wire everything neatly with minimal disruption [source: 5]." },
    { step: "05", name: "Handover", desc: "We test every sensor and give you a simple guide on how to use your app [source: 5]." },
    { step: "06", name: "Support", desc: "We check your systems annually to ensure they never fail when you need them [source: 5]." },
  ];

  return (
    <div ref={heroRef} className="flex flex-col w-full overflow-hidden">
      {/* 
        * SECTION 1: Trionn Mega-Scale Editorial Hero [source: 3, 5]
        * Strictly capped at weight 500 (font-medium). Uses clamp() and negative tracking [-0.04em] [source: 5, 12].
        * Zero premature CTAs cluttering the top of the viewport [source: 5].
        */}
      <section className="relative min-h-[85vh] flex flex-col justify-between px-6 py-12 max-w-[1200px] mx-auto w-full">
        <div className="pt-6 md:pt-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mist border border-brand-grey/20 text-brand-slate text-xs font-display font-medium uppercase tracking-widest mb-8 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            Independent UK Engineering · London Based [source: 5, 7]
          </div>

          <h1 className="font-display font-medium text-[clamp(2.75rem,8vw,8.5rem)] leading-[0.92] tracking-tightest text-brand-slate uppercase select-none mb-8">
            <span className="inline-block overflow-hidden"><span className="hero-word inline-block">Security</span></span>{" "}
            <span className="inline-block overflow-hidden"><span className="hero-word inline-block">Systems,</span></span><br />
            <span className="inline-block overflow-hidden"><span className="hero-word inline-block text-brand-teal">Delivered</span></span>{" "}
            <span className="inline-block overflow-hidden"><span className="hero-word inline-block">Properly.</span></span>
          </h1>

          <p className="font-body font-normal text-brand-slate/85 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            Most properties buy good hardware but end up with poor results—late installations, messy wiring, and systems nobody maintains [source: 7]. We design, install, and look after your security and building controls from start to finish so they work every single day [source: 7].
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Emil Kowalski Tactile Button Physics: active:scale-[0.97] [source: 6, 11] */}
            <Link
              href="/consultation"
              className="bg-brand-teal text-white font-display font-medium text-base px-8 py-4 rounded-xl shadow-soft hover:bg-[#006666] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] flex items-center gap-2 group"
            >
              <span>Book a Scoping Review [source: 5]</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/system-builder"
              className="bg-brand-mist text-brand-slate border border-brand-grey/30 font-display font-medium text-base px-8 py-4 rounded-xl hover:border-brand-teal hover:bg-brand-teal/5 transition-all duration-200 active:scale-[0.97]"
            >
              Try Interactive System Estimate [source: 5]
            </Link>
          </div>
        </div>

        {/* Plain-English Trust Strip (Verifiable claims only) [source: 3, 5] */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-brand-grey/20 mt-16 font-body text-xs text-brand-grey">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span className="font-medium text-brand-slate">Full Handover Documents [source: 5, 7]</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span className="font-medium text-brand-slate">20+ Years Track Record [source: 5, 7]</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span className="font-medium text-brand-slate">Strict Privacy Protected [source: 5, 7]</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
            <span className="font-medium text-brand-slate">British Safety Standards [source: 6]</span>
          </div>
        </div>
      </section>

      {/* 
        * SECTION 2: DB Longbow Systems Grid [source: 3, 5]
        * 100vh Curtain Reveals [data-reveal="curtain"] + Embedded Antigravity AI Image Prompts [source: 3, 5].
        * All CTAs drive to Consultation OR Technical Depth pages [source: 5].
        */}
      <section className="bg-brand-mist py-24 px-6 border-y border-brand-grey/15">
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
              We handle the essential technology that keeps your property secure, comfortable, and well-managed—all controlled easily from your phone or computer [source: 8].
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemsGrid.map((sys) => {
              const IconComponent = sys.icon;
              return (
                <div
                  key={sys.title}
                  className="group bg-brand-paper rounded-2xl border border-brand-grey/15 overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-elevated hover:border-brand-teal transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* DB Longbow Curtain Reveal Container with AI Prompt Reference [source: 3, 5] */}
                    <div className="w-full h-48 bg-brand-slate/10 relative overflow-hidden" data-reveal="curtain">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/50 via-transparent to-transparent z-10" />
                      
                      {/* Icon Badge Floating in Scene */}
                      <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-lg bg-brand-paper/90 backdrop-blur-md flex items-center justify-center text-brand-slate shadow-sm group-hover:bg-brand-teal group-hover:text-white transition-colors duration-200">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* ANTIGRAVITY AI PROMPT INSTRUCTION BANNER [source: 5] */}
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-brand-grey p-6 text-center select-none">
                        <div>
                          <span className="font-medium text-brand-slate block mb-1">[Asset: {sys.title}]</span>
                          <span className="text-[10px] opacity-75 block line-clamp-2">Prompt: {sys.imagePrompt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="font-display font-medium text-xl text-brand-slate mb-3 group-hover:text-brand-teal transition-colors">
                        {sys.title}
                      </h3>
                      <p className="font-body font-normal text-brand-grey text-sm leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>
                  </div>

                  {/* Dual-Action Footer: Drive to Specifiers Tech Hub OR Scoping Quote [source: 5] */}
                  <div className="px-8 pb-8 pt-4 border-t border-brand-grey/10 flex items-center justify-between">
                    <Link
                      href={sys.href}
                      className="font-display font-medium text-xs text-brand-slate hover:text-brand-teal underline transition-colors"
                    >
                      View Tech Specs [source: 5]
                    </Link>
                    <Link
                      href="/consultation"
                      className="font-display font-medium text-xs text-brand-teal uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Get a Quote [source: 5]</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        * SECTION 3: Track Record Teaser & Stat Counters [source: 2, 5]
        * Zero Canary Wharf / Manchester fakes. References genuine Wankhede / BARC track record [source: 3, 4].
        */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block">
              Leadership Track Record [source: 2, 5]
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate tracking-tighter">
              Delivered at Major Scale.
            </h2>
            <p className="font-body font-normal text-brand-slate/85 text-base leading-relaxed">
              Drievu was founded in London in 2024 by a leadership team with more than two decades of experience delivering security and building systems across some of the most demanding sites in Asia and Africa [source: 4].
            </p>
            
            {/* MANDATORY LEGAL & PROCUREMENT DISCLAIMER [source: 3, 4] */}
            <div className="bg-brand-mist p-5 rounded-xl border-l-4 border-brand-teal font-body text-xs text-brand-grey leading-relaxed font-mono">
              <strong>DUE DILIGENCE NOTE [source: 3]:</strong> National-infrastructure projects listed were delivered by members of Drievu’s leadership team over the past two decades in prior executive roles [source: 3, 4]. Drievu Limited was incorporated in the UK in 2024 (Company No. 15479482) [source: 4].
            </div>

            <Link
              href="/track-record"
              className="inline-flex items-center gap-2 font-display font-medium text-sm text-brand-teal hover:underline group"
            >
              <span>View Verified Leadership Portfolio [source: 5]</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left shadow-soft">
              <span className="stat-counter font-display font-medium text-5xl text-brand-slate mb-2 block" data-target="18" data-suffix="+">
                0
              </span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Landmark Projects [source: 3]</span>
              <span className="font-body font-normal text-xs text-brand-grey">Stadiums, metros, airports & infrastructure [source: 4].</span>
            </div>
            
            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left shadow-soft">
              <span className="stat-counter font-display font-medium text-5xl text-brand-slate mb-2 block" data-target="20" data-suffix="+">
                0
              </span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Years Track Record [source: 2, 4]</span>
              <span className="font-body font-normal text-xs text-brand-grey">Executive engineering leadership [source: 4].</span>
            </div>

            <div className="bg-brand-mist p-8 rounded-2xl border border-brand-grey/15 flex flex-col justify-center text-center sm:text-left shadow-soft">
              <span className="stat-counter font-display font-medium text-5xl text-brand-teal mb-2 block" data-target="5" data-suffix="">
                0
              </span>
              <span className="font-display font-medium text-sm text-brand-slate block mb-1">Core Pillars [source: 2, 4]</span>
              <span className="font-body font-normal text-xs text-brand-grey">CCTV, Access, Fire, Audio, Automation [source: 4].</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        * SECTION 4: Process Rail with SVG Line Draw [source: 2, 5]
        * 12th-Grade friendly action words: Listen -> Support [source: 3, 5]. Max Weight 500 [source: 5].
        */}
      <section id="process-section" className="bg-brand-slate text-brand-paper py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-display font-medium text-xs text-brand-green uppercase tracking-widest block mb-2">
              Our Simple Process [source: 5]
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-white tracking-tighter mb-4">
              How We Deliver Without Stress.
            </h2>
            <p className="font-body font-normal text-brand-grey text-sm md:text-base">
              We never rush into selling you equipment. We take the time to understand your building first, install everything neatly, and show you exactly how it works [source: 4].
            </p>
          </div>

          <div className="relative">
            {/* Horizontal Connecting Line (SVG stroke-dashoffset animates on scroll) [source: 2, 5] */}
            <div className="hidden lg:block absolute top-[28px] left-[50px] right-[50px] h-[2px] z-0">
              <svg className="w-full h-[4px]" preserveAspectRatio="none">
                <path
                  ref={processLineRef}
                  d="M 0 2 L 1100 2"
                  fill="none"
                  stroke="#008080"
                  strokeWidth="2"
                  strokeDasharray="1100"
                  strokeDashoffset="1100"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
              {workProcess.map((step) => (
                <div key={step.name} className="flex flex-col items-start lg:items-center lg:text-center group">
                  <div className="w-14 h-14 rounded-full bg-brand-slate border-2 border-brand-teal text-white font-display font-medium text-base flex items-center justify-center mb-6 shadow-md group-hover:bg-brand-teal transition-colors duration-200">
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
        </div>
      </section>

      {/* 
        * SECTION 5: Primary Conversion Banner [source: 2, 3]
        * Funnels all engaged traffic directly into the Requirement Form (/consultation) [source: 2, 3].
        */}
      <section className="bg-brand-teal text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            Ready To Upgrade Your Property?
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tighter mb-6">
            Let’s Talk About Your Building.
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg mb-8 leading-relaxed">
            Whether you manage a residential block, a commercial office, or an industrial facility, get an honest engineering assessment and a clear quote without sales pressure [source: 4].
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
          >
            Start Your Requirement Form [source: 5]
          </Link>
        </div>
      </section>
    </div>
  );
}
