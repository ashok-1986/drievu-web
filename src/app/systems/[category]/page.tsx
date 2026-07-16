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
  surveillance: {
    title: "Surveillance & CCTV Systems",
    headline: "High-Definition Video Surveillance Engineered to BS EN 62676 Standards.",
    description: "Our surveillance installations utilize IP PoE (Power over Ethernet—transmitting data and electrical power over a single network cable) architecture, delivering 3K and 4K ultra-high-definition resolution with smart human and vehicle target classification to eliminate false alarms. All footage is retained locally on high-speed surveillance hard drives with zero recurring cloud storage fees.",
    imagePrompt: "Technical close up of 4K PTZ camera lens with infrared night vision array, industrial lighting --ar 16:9 --style raw",
    specs: [
      { label: "Video Resolution", val: "3K (3072×1728) / 4K (3840×2160) Ultra HD", def: "High-pixel density sensors enabling digital zoom identification of license plates and facial features." },
      { label: "Night Vision", val: "EXIR 2.0 Infrared & Dual-Light Color Night Vision up to 40m", def: "Advanced emitter technology providing even infrared illumination without center-screen overexposure." },
      { label: "Weather Protection", val: "IP67 Waterproof & Dustproof Ingress Protection Rating", def: "International standard certifying complete protection against dust ingress and water immersion up to 1 meter." },
      { label: "Vandal Resistance", val: "IK10 Vandal-Proof Mini-Dome Options for Low Ceilings", def: "The highest international mechanical impact rating, protecting camera housings against 20 joules of direct kinetic impact." },
      { label: "Video Compression", val: "H.265+ Dynamic Bitrate Encoding (35% to 50% Storage Reduction)", def: "Intelligent predictive codec that compresses static background footage while retaining maximum detail on moving subjects." },
      { label: "Network Protocols", val: "ONVIF Profile S/G/T Protocol-Neutral Open Architecture", def: "Open industry standard guaranteeing seamless interoperability with third-party video management software and network recorders." },
    ],
    hardwareTable: [
      { sku: "IP PoE Dome Camera", spec: "3K outdoor PoE dome, EXIR 2.0 night vision, built-in microphone, IP67 waterproof", use: "General communal & perimeter monitoring" },
      { sku: "IP PoE PTZ Speed Dome", spec: "4K mini pan-tilt, 345° pan / 80° tilt, auto-tracking lite, two-way audio", use: "Large car parks, industrial yards, active perimeters" },
      { sku: "64-Channel Commercial NVR", spec: "4K 64-channel recorder, 32MP decoding, 8x SATA HDD bays (up to 112TB capacity)", use: "Centralized multi-camera recording & local control room monitoring" },
      { sku: "24TB Surveillance HDD", spec: "24TB high-speed hard drive optimized for 24/7 continuous NVR read/write cycles", use: "Extended footage retention (30 to 90 days compliant storage)" },
      { sku: "24-Port Gigabit PoE Switch", spec: "24-port Fast Ethernet PoE switch, 370W power budget, metal rack-mount chassis", use: "Dedicated network backbone & centralized device power distribution" },
    ]
  },
  access: {
    title: "Access Control & Entry",
    headline: "IP Door Entry & Credential Management Engineered to BS EN 60839 Standards.",
    description: "We deploy multi-flat IP door entry panels and encrypted proximity reader networks that seamlessly integrate with video intercoms. Systems provide immutable audit trails for commercial facilities and managed residential blocks while maintaining strict fail-safe fire evacuation override protocols.",
    imagePrompt: "Close-up of a flush-mounted brushed black glass IP door entry panel with glowing illuminated keypad, architectural entrance --ar 16:9 --style raw",
    specs: [
      { label: "Entry Authentication", val: "Encrypted Proximity FOBs, Mobile Bluetooth Credentials & PIN Keypads", def: "Multi-factor authentication supporting RFID smart cards and touchless smartphone BLE (Bluetooth Low Energy) unlocking." },
      { label: "Communal Panels", val: "Multi-Flat IP Video Door Entry Panels with HD Camera & Two-Way Audio", def: "Power-over-Ethernet visitor intercoms with wide-angle camera lenses and noise-canceling microphones." },
      { label: "Locking Hardware", val: "Monitored Magnetic Locks (Maglocks), Electric Strikes & Request-to-Exit Buttons", def: "High-holding force electromagnetic locks paired with mechanical egress sensors to verify door physical status." },
      { label: "Remote Connectivity", val: "GSM Intercom Gateways for Remote Access Control Without Wired Cabling", def: "Cellular 4G communication modules that route gate intercom calls directly to mobile handsets or reception desks." },
      { label: "Fire Safety Integration", val: "Automated Fail-Safe Drop-Out Relay Integration with Building Fire Alarms", def: "Life-safety electrical interlock that automatically cuts power to magnetic locks upon fire alarm activation to ensure unimpeded emergency egress." },
      { label: "Audit & Compliance", val: "Time-Stamped Event Logging with UK GDPR Compliant Credential Storage", def: "Encrypted local event logs recording exact entry timestamps without storing unencrypted biometric or personal resident data." },
    ],
    hardwareTable: [
      { sku: "Multi-Flat IP Entry Panel", spec: "Communal IP video intercom with wide-angle camera, RFID reader & illuminated keypad", use: "Main residential block & commercial building entrance doors" },
      { sku: "Video Door Phone System", spec: "7-inch indoor touchscreen monitor with instant door unlock & two-way talkback", use: "Individual residential apartments & concierge reception desks" },
      { sku: "Proximity / Mobile Reader", spec: "IP65 weather-resistant multi-technology reader supporting RFID card and smartphone BLE access", use: "Internal office doors, stairwells & restricted server rooms" },
      { sku: "Monitored Maglock & Strike", spec: "1200lb holding force magnetic locks and heavy-duty fail-secure mechanical strikes", use: "High-security perimeter doors & fire escape routes" },
      { sku: "GSM Gate Intercom", spec: "Cellular 4G/GSM intercom unit with SIM dial-to-open and PIN code functionality", use: "Remote perimeter gates & temporary construction phase access" },
    ]
  },
  fire: {
    title: "Fire, Gas & Life Safety",
    headline: "Life Safety & Early Warning Detection Engineered to British Standards.",
    description: "Our life safety division engineers addressable fire alarm networks, industrial gas leak detection units, and standalone smoke/heat alarms. Systems are designed with consultative discipline to ensure early detection, swift voice evacuation, and full insurance compliance without over-specification.",
    imagePrompt: "Immaculate commercial plant room wall showing a sleek addressable fire alarm control panel with glowing green status indicators --ar 16:9 --style raw",
    specs: [
      { label: "Design Standards", val: "Systems Specified to British Standards (BS 5839 / BS EN 54 Guidelines)", def: "The rigorous code of practice governing the design, installation, commissioning, and maintenance of fire detection and fire alarm systems in buildings." },
      { label: "Fire Detection Architecture", val: "Addressable Commercial Fire Alarm Panels & Optical Smoke/Heat Sensors", def: "Intelligent loop wiring where each detector possesses a unique digital address, identifying the exact room or zone of an incident immediately." },
      { label: "Hazardous Gas Monitoring", val: "Commercial Kitchen & Plant Room Gas Leak Detection Units with Shut-Off Relays", def: "Industrial catalytic sensors that detect methane and LPG leaks, automatically triggering solenoid valves to shut off main gas supplies." },
      { label: "Carbon Monoxide Safety", val: "Hardwired CO Detectors Interlinked for Managed Residential Compliance", def: "Electro-chemical sensing units continuously monitoring for toxic carbon monoxide, wired into shared residential alarm loops." },
      { label: "Emergency Illumination", val: "3-Hour Non-Maintained & Maintained LED Emergency Exit Lighting", def: "Backup battery-powered escape lighting that automatically illuminates egress corridors and stairwells during a mains power failure." },
      { label: "Evacuation Systems", val: "Integrated Voice Evacuation & Public Address (PA-VA) Alarm Broadcast", def: "Automated spoken emergency messaging proven to evacuate complex commercial buildings up to 35% faster than traditional alarm sirens." },
    ],
    hardwareTable: [
      { sku: "Addressable Fire Panel", spec: "Multi-loop addressable fire detection panel with touchscreen zone mapping & event log", use: "Commercial offices, retail complexes & industrial facilities" },
      { sku: "Standalone Smoke & Heat Alarm", spec: "Optical smoke and rate-of-rise heat detectors with RF/wired interlink capability", use: "Managed residential blocks & HMO tenant safety compliance" },
      { sku: "Gas Leak Detection Unit", spec: "Industrial methane/LPG gas sensing unit with automated solenoid valve shut-off relay", use: "Commercial kitchens, boiler houses & mechanical plant rooms" },
      { sku: "Commercial CO Detector", spec: "Electro-chemical carbon monoxide sensor with relay output and audible alarm sounder", use: "Rented residential properties & enclosed parking garages" },
      { sku: "Emergency & Exit Lighting", spec: "Flush-mounted LED emergency downlights and illuminated exit legend signage", use: "Communal stairwells, corridors & designated fire escape routes" },
    ]
  },
  communication: {
    title: "Communication & Audio",
    headline: "Public Address & Intercom Infrastructure Engineered for High-Clarity Speech.",
    description: "We supply and integrate commercial public address (PA) systems, two-way talkback intercoms, and audio-visual infrastructure. Designed for demanding acoustic environments like transport hubs, warehouses, and commercial offices, ensuring crystal-clear communication and emergency broadcasting.",
    imagePrompt: "Modern minimalist wall-mounted acoustic speaker and stainless steel talkback intercom inside an industrial warehouse corridor --ar 16:9 --style raw",
    specs: [
      { label: "Public Address (PA)", val: "Multi-Zone 100V Line Audio Distribution & High-Efficiency Ceiling/Horn Speakers", def: "High-voltage audio transmission system allowing dozens of loudspeakers to be connected over long cable runs with minimal signal loss." },
      { label: "Voice Evacuation (PA-VA)", val: "BS EN 54-16 Compliant Emergency Voice Evacuation Broadcast Controllers", def: "Certified life-safety audio matrices with monitored speaker lines and backup amplifier failover for emergency broadcasting." },
      { label: "Two-Way Talkback", val: "Industrial Hands-Free Intercom Stations with Background Noise Cancellation", def: "Heavy-duty communication points utilizing active acoustic echo cancellation to enable clear speech in noisy industrial settings." },
      { label: "Audio-Visual (AV)", val: "Commercial Meeting Room & Control Room AV Distribution Networks", def: "Structured HDMI over Ethernet and wireless presentation switching engineered for corporate boardrooms and security operations centers." },
      { label: "Acoustic Engineering", val: "Speech Intelligibility Optimization (STI) for High-Reverberation Spaces", def: "Acoustic modeling and speaker placement designed to achieve a Speech Transmission Index exceeding 0.50 in echo-heavy environments." },
      { label: "System Integration", val: "SIP / VoIP PBX Telephone Network & Security Management Software Integration", def: "Session Initiation Protocol integration allowing security intercoms to be answered directly from standard corporate desk phones or mobile devices." },
    ],
    hardwareTable: [
      { sku: "Voice Evacuation / PA-VA System", spec: "Multi-zone digital audio matrix controller with emergency firefighter override microphone", use: "Large commercial buildings, factories & transport hubs" },
      { sku: "Two-Way Talkback Intercom", spec: "IP65 weather-resistant industrial intercom station with heavy-duty call button & mic", use: "Industrial loading bays, security gates & mechanical plant rooms" },
      { sku: "100V Line Ceiling Speaker", spec: "6-watt flush-mounted architectural ceiling speaker with steel fire dome enclosure", use: "Commercial office open-plan areas & reception lobbies" },
      { sku: "Control Room Monitor (22–55\")", spec: "Commercial grade 24/7 continuous operation LED display screens with HDMI/VGA inputs", use: "Concierge desks, security offices & AV control rooms" },
      { sku: "GSM Gate Intercom", spec: "Cellular audio intercom with wireless call routing directly to mobile handsets", use: "Remote entrance gates without hardwired network cabling" },
    ]
  },
  "smart-building": {
    title: "Smart Building Automation",
    headline: "Energy-Efficient Building Intelligence Engineered for Open-Protocol Automation.",
    description: "We design smart building systems that eliminate operational chaos and reduce energy consumption. Utilizing DIN-rail automation controllers, DALI-2 lighting relays, and CT-clamp energy monitoring, we provide facilities managers with granular visibility over building performance and ESG reporting.",
    imagePrompt: "Sleek glass touch screen building automation controller on a clean Mist white wall showing real time energy graph numbers --ar 16:9 --style raw",
    specs: [
      { label: "Automation Protocols", val: "Open-Protocol Architecture Supporting KNX, DALI-2 & Modbus Infrastructure", def: "Vendor-neutral communication standards allowing lighting, HVAC, and energy meters from different manufacturers to operate as one unified system." },
      { label: "Smart Lighting Control", val: "Occupancy Sensing, Daylight Harvesting & Automated Dimming Schedules", def: "Intelligent lighting automation that dims artificial lights when natural sunlight is present and powers off zones when rooms are unoccupied." },
      { label: "Energy Monitoring", val: "Real-Time DIN-Rail & CT-Clamp Electrical Sub-Metering for ESG Reporting", def: "Non-invasive current transformers that clamp around electrical circuits to log precise kilowatt-hour energy consumption across individual building zones." },
      { label: "Leak Prevention", val: "Point & Cable Water Leak Detection Sensors with Automated Main Valve Shut-Off", def: "Conductive polymer sensing cables installed under raised floors or pipework that trigger motorized brass valves to cut water supply instantly upon detecting moisture." },
      { label: "HVAC Optimization", val: "Smart Temperature Relays and Automated Climate Scheduling", def: "Programmable thermostats and relay modules that prevent heating and cooling systems from operating simultaneously or out of business hours." },
      { label: "Central Management", val: "Single Mobile & Desktop Interface for Property-Wide Automation Control", def: "Unified dashboard providing facilities managers with remote visibility, scheduling, and alert management across all building technical services." },
    ],
    hardwareTable: [
      { sku: "Smart Lighting Controller", spec: "DALI-2 / KNX multi-channel lighting control gateway with automated scheduling", use: "Commercial offices, communal residential corridors & car parks" },
      { sku: "Smart Relay & Automation Module", spec: "DIN-rail mounted multi-purpose relay module for heavy electrical load switching", use: "Plant rooms, heating controls & architectural lighting circuits" },
      { sku: "Energy Monitoring (CT-Clamp)", spec: "Multi-channel electrical sub-metering unit with cloud ESG reporting data export", use: "Housing association blocks & commercial tenant energy billing" },
      { sku: "Water Leak Detection Sensor", spec: "Conductive polymer sensing cable and point sensor with audible alarm relay", use: "High-value residential risers, server rooms & mechanical plant areas" },
      { sku: "1–3 kVA UPS Unit", spec: "Online double-conversion uninterruptible power supply with SNMP network monitoring card", use: "Keeping automation controllers & surveillance NVRs active during power cuts" },
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
            <p className="font-body font-normal text-brand-paper/90 text-base md:text-lg leading-relaxed prose-text-shadow max-w-2xl mx-auto block">
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
              <span className="opacity-75 block leading-relaxed">Asset pending final approval.</span>
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
            <h2 className="font-display font-medium text-2xl md:text-4xl text-brand-slate tracking-tight">
              Engineering Architecture
            </h2>
            <p className="font-body font-normal text-brand-slate/85 text-base leading-relaxed">
              {data.description}
            </p>
            <div className="bg-brand-mist p-6 rounded-2xl border border-brand-grey/20 space-y-3 shadow-soft">
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Procurement Compliance Standards
              </span>
              <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                All systems specified on this schedule adhere strictly to British Standards (BS EN guidelines) and incorporate privacy-masking features to satisfy UK GDPR digital evidence requirements. We specify energy-efficient equipment sized to actual site risk rather than inflating invoice values.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {data.specs.map((s) => (
              <div 
                key={s.label} 
                className="bg-brand-paper p-6 rounded-2xl border border-brand-grey/20 shadow-soft hover:border-brand-teal transition-all duration-200"
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
                  <p className="font-body font-normal text-xs text-brand-grey leading-relaxed pt-2 border-t border-brand-grey/10">
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
            <h3 className="font-display font-medium text-2xl md:text-4xl text-brand-slate tracking-tight">
              Current Deployed Hardware Range.
            </h3>
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
                  <td className="p-5 text-xs text-brand-grey leading-relaxed align-top">{row.spec}</td>
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
          <h3 className="font-display font-medium text-3xl md:text-4xl tracking-tight mb-4">
            <SplitTextReveal text="Specify This System For Your Project." />
          </h3>
          <p className="font-body font-normal text-brand-paper/90 text-sm md:text-base mb-8 leading-relaxed">
            Ready to integrate these specifications into your mechanical and electrical tender? Submit your floor plans and channel counts to our engineering team for a structured quote without sales pressure.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-elevated hover:bg-brand-mist hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] cursor-pointer group"
          >
            <span>Proceed To Requirement Form</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
