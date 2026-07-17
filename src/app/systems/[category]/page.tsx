// src/app/systems/[category]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Cpu, HardDrive, Network, FileText } from "lucide-react";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { ProseReveal } from "@/components/motion/ProseReveal";

interface SpecItem {
  label: string;
  val: string;
  def?: string;
}

interface HardwareRow {
  sku: string;
  spec: string;
  use: string;
}

interface SystemCategoryData {
  title: string;
  headline: string;
  description: string;
  imagePrompt: string;
  specs: SpecItem[];
  hardwareTable: HardwareRow[];
}

const technicalSpecifications: Record<string, SystemCategoryData> = {
  lighting: {
    title: "Intelligent Lighting & Shading",
    headline: "Architectural Lighting Control Engineered to Open Protocols.",
    description: "Our intelligent lighting installations utilize KNX and DALI-2 protocols (Digital Addressable Lighting Interface), replacing messy switch banks with flush-mounted keypads. We integrate motorized shading and daylight harvesting algorithms to automatically balance natural and artificial lux levels.",
    imagePrompt: "Close-up of a minimalist flush-mounted smart lighting keypad on a textured white gallery wall --ar 16:9 --style raw",
    specs: [
      { label: "Lighting Protocols", val: "Architectural Lighting Control", def: "Vendor-neutral communication standards allowing lighting fixtures from different manufacturers to operate as one unified system." },
      { label: "Daylight Harvesting", val: "Automated Lux Sensor Dimming", def: "Intelligent lighting automation that dims artificial lights when natural sunlight is present, reducing energy consumption." },
      { label: "Motorized Shading", val: "PoE Window Blinds & Curtain Tracks", def: "Automated window shading that adjusts to precise solar positions to prevent room overheating." },
      { label: "Control Interfaces", val: "Flush-Mounted Keypads & Mobile Integration", def: "Laser-engraved architectural wall plates that trigger complex multi-room lighting scenes with a single button press." },
      { label: "Emergency Lighting", val: "DALI Monitored LED Escape Lighting", def: "Self-testing backup battery lights that automatically illuminate egress corridors during a mains power failure." },
      { label: "Cable Infrastructure", val: "One High-Speed Cable for Power and Data", def: "Structured cabling that delivers both network data and power to compatible low-voltage devices, while leaving required mains and DALI-2 control circuits to the electrical design." },
    ],
    hardwareTable: [
      { sku: "DALI-2 Dimming Actuator", spec: "Multi-channel LED dimming controller with precise 1-100% fade curves", use: "Main architectural lighting circuits & LED strip drivers" },
      { sku: "KNX Keypad Controller", spec: "6-button laser engraved flush wall switch with integrated temperature sensor", use: "Room-level manual override & scene selection" },
      { sku: "PoE Roller Blind Motor", spec: "Ultra-quiet tubular motor powered directly via Ethernet switch", use: "Automated window shading in living spaces & boardrooms" },
      { sku: "Lux/Presence Sensor", spec: "360-degree ceiling mounted motion and ambient light sensor", use: "Corridors, bathrooms & daylight harvesting zones" },
      { sku: "Central Lighting Gateway", spec: "DIN-rail mounted logic controller linking DALI, KNX, and mobile apps", use: "Main electrical distribution board integration" },
    ]
  },
  climate: {
    title: "Climate & Energy Control",
    headline: "Automated Climate Control That Knows When You Arrive.",
    description: "We design intelligent heating and cooling infrastructure that slashes wasted energy without manual tweaking. By integrating HVAC systems, underfloor heating manifolds, and real-time solar/battery power monitoring into a single logic controller, we eliminate conflicting thermostats and guarantee optimum environmental comfort.",
    imagePrompt: "Sleek glass touch screen building automation controller on a clean Mist white wall showing real time temperature numbers --ar 16:9 --style raw",
    specs: [
      { label: "HVAC Integration", val: "Automated Climate Control", def: "Industrial data protocols that allow the smart home processor to directly command air conditioning units and boilers." },
      { label: "Occupancy Logic", val: "Geofencing & Motion-Based Setbacks", def: "Automated climate control that drops temperature set-points in empty rooms and pre-heats when your smartphone enters a defined geographic radius." },
      { label: "Underfloor Heating", val: "Smart Manifold Valve Actuators", def: "Precise motorized valves that control hot water flow to individual room zones, preventing temperature overshoot." },
      { label: "Energy Sub-Metering", val: "Real-Time Electrical Monitoring", def: "Non-invasive current transformers that clamp around electrical circuits to log precise kilowatt-hour energy consumption." },
      { label: "Air Quality", val: "CO2 & VOC (Volatile Organic Compound) Sensors", def: "Environmental sensors that automatically trigger fresh air ventilation systems when indoor air quality drops." },
      { label: "System Interlock", val: "Window/Door Contact Intervention", def: "Logic rules that automatically shut off air conditioning in a room if a window is left open for more than 60 seconds." },
    ],
    hardwareTable: [
      { sku: "HVAC Protocol Gateway", spec: "BACnet to KNX translation module for VRF/VRV air conditioning systems", use: "Direct digital control of Daikin/Mitsubishi AC units" },
      { sku: "Smart Heating Manifold", spec: "8-zone underfloor heating controller with 24V thermal actuators", use: "Precise hydronic radiant floor heating management" },
      { sku: "Energy Monitoring Module", spec: "Multi-channel electrical sub-metering unit with cloud data export", use: "Tracking solar generation vs property consumption" },
      { sku: "Invisible Temp Sensor", spec: "Flush-mounted plaster-in temperature probe (zero visible footprint)", use: "Accurate room temperature reading without wall clutter" },
      { sku: "Air Quality Monitor", spec: "Combined CO2, Humidity, and VOC sensor module", use: "Automated mechanical ventilation and heat recovery (MVHR)" },
    ]
  },
  media: {
    title: "Concealed Sound & Media",
    headline: "Whole-Home Synchronized Audio Engineered for Acoustic Excellence.",
    description: "Our media division engineers high-fidelity acoustic environments without the visual clutter of traditional AV equipment. Utilizing centralized audio matrices and architectural plaster-in speakers, we deliver perfectly synchronized, uncompressed audio streaming driven by a centralized amplification rack.",
    imagePrompt: "Clean white architectural ceiling with a completely flush invisible speaker grille, warm ambient lighting --ar 16:9 --style raw",
    specs: [
      { label: "Audio Distribution", val: "Whole-Home Synchronized Audio", def: "Centralized digital signal processors that perfectly synchronize music playback across multiple rooms without latency." },
      { label: "Architectural Speakers", val: "Plaster-In Invisible & Micro-Aperture Drivers", def: "High-performance loudspeakers that are skimmed over with plaster, rendering them completely invisible to the eye." },
      { label: "Video Distribution", val: "4K/8K Video over IP (AVoIP) Transceivers", def: "Encoding uncompressed ultra-high-definition HDMI video onto standard network cables for distribution to any screen in the property." },
      { label: "Acoustic Engineering", val: "Room Correction Calibration", def: "Advanced software measurement that digitally compensates for room reflections and standing waves to ensure perfect audio fidelity." },
      { label: "Network Backbone", val: "Enterprise-Grade Layer 3 Managed Switches", def: "High-capacity network hardware required to handle the massive data throughput of uncompressed multi-room video streaming." },
      { label: "User Interface", val: "Unified Smart Remote & Application Control", def: "A single remote control that powers on the TV, selects the Apple TV, routes the audio, and dims the lights simultaneously." },
    ],
    hardwareTable: [
      { sku: "DSP Matrix Amplifier", spec: "8-zone / 16-channel digital amplifier with built-in streaming endpoints", use: "Centralized power and routing for whole-home audio" },
      { sku: "Invisible Plaster-In Speaker", spec: "Vibrational panel speaker designed to be skimmed with 2mm of plaster", use: "High-end living rooms & minimalist dining areas" },
      { sku: "Video over IP Encoder", spec: "4K60 4:4:4 AV-over-IP transmitter with ultra-low latency (<1 frame)", use: "Centralizing media players in the rack" },
      { sku: "Managed AV Switch", spec: "48-port Gigabit PoE+ switch configured for multicast video", use: "The core data backbone for all media distribution" },
      { sku: "Unified Smart Remote", spec: "Wi-Fi enabled touchscreen remote with hard buttons for tactile control", use: "Replacing multiple cluttered remotes in cinema rooms" },
    ]
  },
  security: {
    title: "Perimeter & Access Security",
    headline: "High-Definition Video Surveillance & Keyless Entry Engineered to BS EN Standards.",
    description: "We deploy IP PoE (Power over Ethernet) camera architectures and encrypted proximity reader networks to protect your perimeter. Our systems provide 4K ultra-high-definition resolution with smart human classification to reduce false alerts, storing 30 days of continuous footage locally to support privacy-focused deployments with zero recurring cloud storage fees.",
    imagePrompt: "Technical close up of 4K PTZ camera lens with infrared night vision array, industrial lighting --ar 16:9 --style raw",
    specs: [
      { label: "Video Resolution", val: "4K (3840×2160) Ultra HD IP PoE Cameras", def: "High-pixel density sensors utilizing one high-speed cable for power and data, enabling digital zoom identification." },
      { label: "Intelligent Analytics", val: "Human/Vehicle Target Classification Algorithms", def: "Edge-based AI processing that filters out rain, shadows, and animals to reduce false alert notifications." },
      { label: "Night Vision", val: "EXIR 2.0 Infrared & Dual-Light Color Night Vision up to 40m", def: "Advanced emitter technology providing even infrared illumination without center-screen overexposure." },
      { label: "Local Data Storage", val: "Weather-Proof Cameras With Dedicated On-Site Video Recorders", def: "Dedicated on-site video recorders providing 30 days of storage, supporting privacy-focused deployments." },
      { label: "Entry Authentication", val: "Encrypted Proximity FOBs & Touchless BLE", def: "Multi-factor authentication supporting RFID smart cards and touchless smartphone Bluetooth Low Energy unlocking." },
      { label: "Intercom Gateways", val: "Flush-Mounted IP Video Door Entry Panels", def: "Power-over-Ethernet visitor intercoms that route gate calls directly to your smartphone or interior touchscreens." },
    ],
    hardwareTable: [
      { sku: "4K IP PoE Turret Camera", spec: "8MP outdoor PoE turret, EXIR 2.0 night vision, IP67 waterproof", use: "General perimeter monitoring & driveway surveillance" },
      { sku: "Multi-Flat IP Entry Panel", spec: "IP video intercom with wide-angle camera & illuminated keypad", use: "Main entry gates & pedestrian access doors" },
      { sku: "32-Channel NVR", spec: "4K 32-channel recorder with 16TB surveillance-grade hard drives", use: "Centralized local video recording (zero cloud fees)" },
      { sku: "Monitored Maglock", spec: "1200lb holding force magnetic lock with mechanical egress sensor", use: "High-security automated vehicle & pedestrian gates" },
      { sku: "Proximity / Mobile Reader", spec: "IP65 weather-resistant reader supporting encrypted RFID and smartphone BLE", use: "Keyless entry for side doors and outbuildings" },
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(technicalSpecifications).map((category) => ({
    category,
  }));
}

export default function SystemDetailPage({ params }: { params: { category: string } }) {
  const data = technicalSpecifications[params.category];

  if (!data) {
    notFound();
  }

  return (
    <div className="w-full pt-28 md:pt-36 pb-24 bg-brand-paper min-h-screen select-none">
      {/* 
        * TECHNICAL HERO SECTION
        * Strict Weight-500 Ceiling: Uses font-medium with optical tracking [-0.03em].
        */}
      <section className="bg-brand-slate text-brand-paper py-16 md:py-24 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-8 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Technical Specification Sheet
          </div>

          <h1 className="font-display font-medium text-hero w-full text-center text-white mb-6 uppercase">
            <SplitTextReveal text={data.title} />
          </h1>
          <ProseReveal>
            <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg  prose-text-shadow max-w-2xl mx-auto block">
              {data.headline}
            </p>
          </ProseReveal>
        </div>
      </section>

      {/* 
        * TECHNICAL IMAGE ASSET BANNER
        */}
      <section className="bg-brand-mist py-12 px-6 border-b border-brand-grey/15">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-full h-80 bg-brand-slate/10 rounded-2xl relative overflow-hidden flex items-center justify-center border border-brand-grey/20 shadow-soft">
            <div className="text-center font-mono text-xs text-brand-slate/80 p-6 max-w-xl">
              <span className="font-medium block text-sm mb-2 text-brand-slate">[Technical Asset: {data.title}]</span>
              <span className="opacity-75 block ">Asset pending final approval.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        * ENGINEERING ARCHITECTURE & COMPLIANCE GRID
        * Tailored specifically for M&E Consultants, Architects & Public Sector procurement.
        * Defines all technical jargoninline on first use.
        */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate ">
              Engineering Architecture
            </h2>
            <p className="font-body font-normal text-brand-slate/85 text-base ">
              {data.description}
            </p>
            <div className="bg-brand-mist p-6 rounded-2xl border border-brand-grey/20 space-y-3 shadow-soft">
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Procurement Compliance Standards
              </span>
              <p className="font-body font-normal text-xs text-brand-grey ">
                All systems specified on this schedule adhere strictly to British Standards (BS EN guidelines) and incorporate privacy-masking features to satisfy UK GDPR digital evidence requirements. We specify energy-efficient equipment sized to actual site risk rather than inflating invoice values.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {data.specs.map((s) => (
              <div 
                key={s.label} 
                className="bg-brand-paper p-6 rounded-2xl border border-brand-grey/20 shadow-soft hover:border-brand-teal transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest">
                    {s.label}
                  </span>
                  <span className="font-mono text-xs font-medium text-brand-slate">
                    {s.val}
                  </span>
                </div>
                {s.def && (
                  <p className="font-body font-normal text-xs text-brand-grey  pt-2 border-t border-brand-grey/10">
                    <span className="font-medium text-brand-slate/90">Engineering Definition:</span> {s.def}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        * DEPLOYED HARDWARE SCHEDULE TABLE
        * Direct defensible SKU mapping from Drievu Product & Systems Range Doc.
        */}
      <section className="py-16 px-6 max-w-[1200px] mx-auto border-t border-brand-grey/15">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
              Hardware Schedule
            </span>
            <h2 className="font-display font-medium text-3xl md:text-5xl text-brand-slate ">
              Current Deployed Hardware Range.
            </h2>
          </div>
          <p className="font-body text-xs text-brand-grey max-w-sm">
            Range discipline: we specify quality-verified equipment from established manufacturers, backed by documented handover packs.
          </p>
        </div>

        <div className="overflow-x-auto border border-brand-grey/20 rounded-2xl bg-brand-paper shadow-soft">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-brand-mist border-b border-brand-grey/20 font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                <th className="p-5 w-1/4">Component SKU</th>
                <th className="p-5 w-1/2">Technical Specification</th>
                <th className="p-5 w-1/4">Typical Deployment Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-grey/15 font-body text-sm text-brand-slate/85">
              {data.hardwareTable.map((row) => (
                <tr key={row.sku} className="hover:bg-brand-mist/40 transition-colors">
                  <td className="p-5 font-mono font-medium text-brand-slate align-top">{row.sku}</td>
                  <td className="p-5 text-xs text-brand-grey  align-top">{row.spec}</td>
                  <td className="p-5 text-xs text-brand-slate/80 align-top">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 
        * PRIMARY LEAD GENERATION GOAL
        * Routes specifiers and consultants directly into the 3-step Scoping Wizard.
        */}
      <section className="mt-16 bg-brand-teal text-white py-16 px-6 text-center rounded-2xl max-w-[1200px] mx-auto shadow-elevated">
        <div className="max-w-2xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            M&E Tender Integration
          </span>
          <h2 className="font-display font-medium text-3xl md:text-5xl mb-4">
            <SplitTextReveal text="Specify This System For Your Project." />
          </h2>
          <p className="font-body font-normal text-brand-paper/90 text-sm md:text-base mb-8 ">
            Ready to integrate these specifications into your mechanical and electrical tender? Submit your floor plans and channel counts to our engineering team for a structured quote without sales pressure.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition duration-200 active:scale-[0.97] cursor-pointer group"
          >
            <span>Proceed To Requirement Form</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
