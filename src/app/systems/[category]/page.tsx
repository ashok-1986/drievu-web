// src/app/systems/[category]/page.tsx
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, HardDrive, Network, FileText, CheckCircle2 } from "lucide-react";

/* 
 * STRICT GOVERNANCE: This is the ONLY page where technical jargon is permitted[cite: 5].
 * Front-of-house pages remain 100% plain English for 12th-grade readability[cite: 5].
 * Maximum font weight across this entire file is strictly capped at 500 (font-medium).
 */
const technicalSpecifications: Record<string, any> = {
  surveillance: {
    title: "Surveillance & CCTV Systems",
    headline: "High-Definition Video Surveillance Engineered to BS EN 62676 Standards[cite: 5].",
    description: "Our surveillance installations utilize IP PoE (Power over Ethernet) architecture, delivering 3K and 4K ultra-high-definition resolution with smart human and vehicle target classification to eliminate false alarms[cite: 8]. All footage is retained locally on high-speed surveillance hard drives with zero recurring cloud storage fees[cite: 8].",
    imagePrompt: "Technical close up of 4K PTZ camera lens with infrared night vision array, industrial lighting --ar 16:9 --style raw",
    specs: [
      { label: "Video Resolution", val: "3K (3072×1728) / 4K (3840×2160) Ultra HD[cite: 8]" },
      { label: "Night Vision", val: "EXIR 2.0 Infrared & Dual-Light Color Night Vision up to 40m[cite: 8]" },
      { label: "Weather Protection", val: "IP67 Waterproof & Dustproof Ingress Protection Rating[cite: 8]" },
      { label: "Vandal Resistance", val: "IK10 Vandal-Proof Mini-Dome Options for Low Ceilings[cite: 8]" },
      { label: "Video Compression", val: "H.265+ Dynamic Bitrate Encoding (35% to 50% Storage Reduction)[cite: 8]" },
      { label: "Network Protocols", val: "ONVIF Profile S/G/T Protocol-Neutral Open Architecture[cite: 5]" },
    ],
    hardwareTable: [
      { sku: "IP PoE Dome Camera", spec: "3K outdoor PoE dome, EXIR 2.0 night vision, built-in mic, IP67 waterproof[cite: 8]", use: "General communal & perimeter monitoring[cite: 8]" },
      { sku: "IP PoE PTZ Speed Dome", spec: "4K mini PT, 345° pan / 80° tilt, auto-tracking lite, two-way audio[cite: 8]", use: "Large car parks, industrial yards, active perimeters[cite: 8]" },
      { sku: "64-Channel Commercial NVR", spec: "4K 64-ch recorder, 32MP decoding, 8x SATA HDD bays (up to 112TB)[cite: 8]", use: "Centralized multi-camera recording & local monitoring[cite: 8]" },
      { sku: "24TB Surveillance HDD", spec: "24TB high-speed hard drive optimized for 24/7 NVR read/write cycles[cite: 8]", use: "Extended footage retention (30 to 90 days)[cite: 8]" },
      { sku: "24-Port Gigabit PoE Switch", spec: "24-port Fast Ethernet PoE switch, 370W power budget, metal rack mount[cite: 8]", use: "Dedicated network backbone & device power[cite: 8]" },
    ]
  },
  access: {
    title: "Access Control & Entry",
    headline: "IP Door Entry & Credential Management Engineered to BS EN 60839 Standards[cite: 5].",
    description: "We deploy multi-flat IP door entry panels and encrypted proximity reader networks that seamlessly integrate with video intercoms[cite: 7, 8]. Systems provide immutable audit trails for commercial facilities and managed residential blocks while maintaining strict fail-safe fire evacuation override protocols[cite: 7, 8].",
    imagePrompt: "Close-up of a flush-mounted brushed black glass IP door entry panel with glowing illuminated keypad, architectural entrance --ar 16:9 --style raw",
    specs: [
      { label: "Entry Authentication", val: "Encrypted Proximity FOBs, Mobile Bluetooth Credentials & PIN Keypads[cite: 8]" },
      { label: "Communal Panels", val: "Multi-Flat IP Video Door Entry Panels with HD Camera & Two-Way Audio[cite: 8]" },
      { label: "Locking Hardware", val: "Monitored Magnetic Locks (Maglocks), Electric Strikes & Request-to-Exit Buttons[cite: 8]" },
      { label: "Remote Connectivity", val: "GSM Intercom Gateways for Remote Access Control Without Wired Cabling[cite: 8]" },
      { label: "Fire Safety Integration", val: "Automated Fail-Safe Drop-Out Relay Integration with Building Fire Alarms[cite: 7]" },
      { label: "Audit & Compliance", val: "Time-Stamped Event Logging with UK GDPR Compliant Credential Storage[cite: 7, 8]" },
    ],
    hardwareTable: [
      { sku: "Multi-Flat IP Entry Panel", spec: "Communal IP video intercom with wide-angle camera, RFID reader & keypad[cite: 8]", use: "Main residential block & office entrance doors[cite: 8]" },
      { sku: "Video Door Phone System", spec: "7-inch indoor touchscreen monitor with instant unlock & two-way talkback[cite: 8]", use: "Individual residential apartments & reception desks[cite: 8]" },
      { sku: "Proximity / Mobile Reader", spec: "IP65 multi-technology reader supporting RFID card and smartphone BLE access[cite: 8]", use: "Internal office doors & restricted server rooms[cite: 8]" },
      { sku: "Monitored Maglock & Strike", spec: "1200lb holding force magnetic locks and heavy-duty fail-secure strikes[cite: 8]", use: "High-security perimeter doors & fire escape routes[cite: 8]" },
      { sku: "GSM Gate Intercom", spec: "Cellular 4G/GSM intercom unit with SIM dial-to-open functionality[cite: 8]", use: "Remote perimeter gates & construction phase access[cite: 8]" },
    ]
  },
  fire: {
    title: "Fire, Gas & Life Safety",
    headline: "Life Safety & Early Warning Detection Engineered to British Standards[cite: 6].",
    description: "Our life safety division engineers addressable fire alarm networks, industrial gas leak detection units, and standalone smoke/heat alarms[cite: 7, 8]. Systems are designed with consultative discipline to ensure early detection, swift voice evacuation, and full insurance compliance without over-specification[cite: 7, 8].",
    imagePrompt: "Immaculate commercial plant room wall showing a sleek addressable fire alarm control panel with glowing green status indicators --ar 16:9 --style raw",
    specs: [
      { label: "Design Standards", val: "Systems Specified to British Standards (BS 5839 / BS EN 54 Guidelines)[cite: 6]" },
      { label: "Fire Detection Architecture", val: "Addressable Commercial Fire Alarm Panels & Optical Smoke/Heat Sensors[cite: 8]" },
      { label: "Hazardous Gas Monitoring", val: "Commercial Kitchen & Plant Room Gas Leak Detection Units with Shut-Off Relays[cite: 7, 8]" },
      { label: "Carbon Monoxide Safety", val: "Hardwired CO Detectors Interlinked for Managed Residential Compliance[cite: 8]" },
      { label: "Emergency Illumination", val: "3-Hour Non-Maintained & Maintained LED Emergency Exit Lighting[cite: 8]" },
      { label: "Evacuation Systems", val: "Integrated Voice Evacuation & Public Address (PA-VA) Alarm Broadcast[cite: 8]" },
    ],
    hardwareTable: [
      { sku: "Addressable Fire Panel", spec: "Multi-loop addressable fire detection panel with touchscreen zone mapping[cite: 8]", use: "Commercial offices, retail & industrial facilities[cite: 7, 8]" },
      { sku: "Standalone Smoke & Heat Alarm", spec: "Optical smoke and rate-of-rise heat detectors with RF/wired interlink[cite: 8]", use: "Managed residential blocks & HMO tenant compliance[cite: 8]" },
      { sku: "Gas Leak Detection Unit", spec: "Industrial methane/LPG gas sensing unit with automated solenoid valve shut-off[cite: 8]", use: "Commercial kitchens, boiler houses & plant rooms[cite: 7, 8]" },
      { sku: "Commercial CO Detector", spec: "Electro-chemical carbon monoxide sensor with relay output and audible alarm[cite: 8]", use: "Rented properties & enclosed parking garages[cite: 8]" },
      { sku: "Emergency & Exit Lighting", spec: "Flush-mounted LED emergency downlights and illuminated exit legend signage[cite: 8]", use: "Communal stairwells, corridors & fire escape routes[cite: 8]" },
    ]
  },
  communication: {
    title: "Communication & Audio",
    headline: "Public Address & Intercom Infrastructure Engineered for High-Clarity Speech[cite: 7].",
    description: "We supply and integrate commercial public address (PA) systems, two-way talkback intercoms, and audio-visual infrastructure[cite: 7]. Designed for demanding acoustic environments like transport hubs, warehouses, and commercial offices, ensuring crystal-clear communication and emergency broadcasting[cite: 7].",
    imagePrompt: "Modern minimalist wall-mounted acoustic speaker and stainless steel talkback intercom inside an industrial warehouse corridor --ar 16:9 --style raw",
    specs: [
      { label: "Public Address (PA)", val: "Multi-Zone 100V Line Audio Distribution & High-Efficiency Ceiling/Horn Speakers[cite: 7]" },
      { label: "Voice Evacuation (PA-VA)", val: "BS EN 54-16 Compliant Emergency Voice Evacuation Broadcast Controllers[cite: 8]" },
      { label: "Two-Way Talkback", val: "Industrial Hands-Free Intercom Stations with Background Noise Cancellation[cite: 7]" },
      { label: "Audio-Visual (AV)", val: "Commercial Meeting Room & Control Room AV Distribution Networks[cite: 7]" },
      { label: "Acoustic Engineering", val: "Speech Intelligibility Optimization (STI) for High-Reverberation Spaces" },
      { label: "System Integration", val: "SIP / VoIP PBX Telephone Network & Security Management Software Integration[cite: 8]" },
    ],
    hardwareTable: [
      { sku: "Voice Evacuation / PA-VA System", spec: "Multi-zone digital audio matrix controller with emergency firefighter microphone[cite: 8]", use: "Large commercial buildings, factories & transport hubs[cite: 7, 8]" },
      { sku: "Two-Way Talkback Intercom", spec: "IP65 weather-resistant industrial intercom station with heavy-duty call button[cite: 7]", use: "Industrial loading bays, security gates & plant rooms[cite: 7]" },
      { sku: "100V Line Ceiling Speaker", spec: "6-watt flush-mounted architectural ceiling speaker with fire dome enclosure", use: "Commercial office open-plan areas & reception lobbies[cite: 7]" },
      { sku: "Control Room Monitor (22–55\")", spec: "Commercial grade 24/7 continuous operation LED display screens[cite: 8]", use: "Concierge desks, security offices & AV control rooms[cite: 8]" },
      { sku: "GSM Gate Intercom", spec: "Cellular audio intercom with wireless call routing directly to mobile handsets[cite: 8]", use: "Remote entrance gates without hardwired cabling[cite: 8]" },
    ]
  },
  "smart-building": {
    title: "Smart Building Automation",
    headline: "Energy-Efficient Building Intelligence Engineered for Open-Protocol Automation[cite: 7].",
    description: "We design smart building systems that eliminate operational chaos and reduce energy consumption[cite: 7]. Utilizing DIN-rail automation controllers, DALI-2 lighting relays, and CT-clamp energy monitoring, we provide facilities managers with granular visibility over building performance and ESG reporting[cite: 7, 8].",
    imagePrompt: "Sleek glass touch screen building automation controller on a clean Mist white wall showing real time energy graph numbers --ar 16:9 --style raw",
    specs: [
      { label: "Automation Protocols", val: "Open-Protocol Architecture Supporting KNX, DALI-2 & Modbus Infrastructure[cite: 5]" },
      { label: "Smart Lighting Control", val: "Occupancy Sensing, Daylight Harvesting & Automated Dimming Schedules[cite: 8]" },
      { label: "Energy Monitoring", val: "Real-Time DIN-Rail & CT-Clamp Electrical Sub-Metering for ESG Reporting[cite: 5, 8]" },
      { label: "Leak Prevention", val: "Point & Cable Water Leak Detection Sensors with Automated Main Valve Shut-Off[cite: 8]" },
      { label: "HVAC Optimization", val: "Smart Temperature Relays and Automated Climate Scheduling[cite: 8]" },
      { label: "Central Management", val: "Single Mobile & Desktop Interface for Property-Wide Automation Control[cite: 7]" },
    ],
    hardwareTable: [
      { sku: "Smart Lighting Controller", spec: "DALI-2 / KNX multi-channel lighting control gateway with automated scheduling[cite: 8]", use: "Commercial offices, communal corridors & car parks[cite: 8]" },
      { sku: "Smart Relay & Automation Module", spec: "DIN-rail mounted multi-purpose relay module for heavy electrical load switching[cite: 8]", use: "Plant rooms, heating controls & architectural lighting[cite: 8]" },
      { sku: "Energy Monitoring (CT-Clamp)", spec: "Multi-channel electrical sub-metering unit with cloud ESG reporting data export[cite: 8]", use: "Housing association blocks & commercial tenant billing[cite: 8]" },
      { sku: "Water Leak Detection Sensor", spec: "Conductive polymer sensing cable and point sensor with audible alarm relay[cite: 8]", use: "High-value residential risers, server rooms & plant areas[cite: 8]" },
      { sku: "1–3 kVA UPS Unit", spec: "Online double-conversion uninterruptible power supply with SNMP network card[cite: 8]", use: "Keeping automation controllers & NVRs active during power cuts[cite: 8]" },
    ]
  }
};

export default function SystemDetailPage({ params }: { params: { category: string } }) {
  const data = technicalSpecifications[params.category] || technicalSpecifications.surveillance;

  return (
    <div className="w-full pb-24">
      {/* 
        * TECHNICAL HERO SECTION
        * Strict Rule: Capped at font-medium (500). Authority achieved via optical scale[cite: 5].
        */}
      <section className="bg-brand-slate text-brand-paper py-20 px-6 border-b border-brand-grey/20">
        <div className="max-w-[1200px] mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-display font-medium text-brand-teal uppercase tracking-wider mb-8 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Front of House
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 text-brand-teal text-xs font-display font-medium uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Technical Specification Sheet[cite: 5]
          </div>

          <h1 className="font-display font-medium text-4xl md:text-6xl text-white tracking-[-0.03em] mb-6 uppercase">
            {data.title}
          </h1>
          <p className="font-body font-normal text-brand-grey text-lg md:text-xl max-w-3xl leading-relaxed">
            {data.headline}
          </p>
        </div>
      </section>

      {/* 
        * TECHNICAL IMAGE ASSET BANNER
        * Embeds Antigravity AI generation instructions directly into the DOM[cite: 5].
        */}
      <section className="bg-brand-mist py-12 px-6 border-b border-brand-grey/15">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-full h-80 bg-brand-slate/10 rounded-2xl relative overflow-hidden flex items-center justify-center border border-brand-grey/20">
            <div className="text-center font-mono text-xs text-brand-slate/80 p-6 max-w-xl">
              <span className="font-medium block text-sm mb-2 text-brand-slate">[Technical Asset: {data.title}]</span>
              <span className="opacity-75 block leading-relaxed">Antigravity AI Prompt: {data.imagePrompt}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        * ENGINEERING ARCHITECTURE & COMPLIANCE GRID
        * Tailored specifically for M&E Consultants, Architects & Public Sector procurement[cite: 5].
        */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <h2 className="font-display font-medium text-2xl md:text-4xl text-brand-slate tracking-tight">
              Engineering Architecture
            </h2>
            <p className="font-body font-normal text-brand-slate/85 text-base leading-relaxed">
              {data.description}
            </p>
            <div className="bg-brand-mist p-6 rounded-xl border border-brand-grey/20 space-y-3">
              <span className="font-display font-medium text-xs text-brand-slate uppercase tracking-wider block flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-teal" /> Procurement Compliance Standards[cite: 5, 6]
              </span>
              <p className="font-body font-normal text-xs text-brand-grey leading-relaxed">
                All systems specified on this schedule adhere strictly to British Standards (BS EN guidelines)[cite: 6] and incorporate privacy-masking features to satisfy UK GDPR digital evidence requirements[cite: 6, 7]. We specify energy-efficient equipment sized to actual site risk rather than inflating invoice values[cite: 7].
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.specs.map((s: any) => (
              <div 
                key={s.label} 
                className="bg-brand-paper p-6 rounded-xl border border-brand-grey/20 shadow-sm hover:border-brand-teal transition-colors"
              >
                <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
                  {s.label}
                </span>
                <span className="font-mono text-sm text-brand-slate font-medium block leading-relaxed">
                  {s.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        * DEPLOYED HARDWARE SCHEDULE TABLE
        * Direct defensible SKU mapping from Drievu Product & Systems Range Doc v1.0[cite: 8].
        */}
      <section className="py-16 px-6 max-w-[1200px] mx-auto border-t border-brand-grey/15">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-display font-medium text-xs text-brand-teal uppercase tracking-widest block mb-2">
              Hardware Schedule
            </span>
            <h3 className="font-display font-medium text-2xl md:text-4xl text-brand-slate tracking-tight">
              Current Deployed Hardware Range[cite: 8].
            </h3>
          </div>
          <p className="font-body text-xs text-brand-grey max-w-sm">
            Range discipline: we specify quality-verified equipment from established manufacturers, backed by documented handover packs[cite: 7, 8].
          </p>
        </div>

        <div className="overflow-x-auto border border-brand-grey/20 rounded-xl bg-brand-paper shadow-sm">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-brand-mist border-b border-brand-grey/20 font-display font-medium text-xs text-brand-slate uppercase tracking-wider">
                <th className="p-5 w-1/4">Component SKU[cite: 8]</th>
                <th className="p-5 w-1/2">Technical Specification[cite: 8]</th>
                <th className="p-5 w-1/4">Typical Deployment Use[cite: 8]</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-grey/15 font-body text-sm text-brand-slate/85">
              {data.hardwareTable.map((row: any) => (
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
        * Routes specifiers and consultants directly into the 3-step Scoping Wizard[cite: 5].
        */}
      <section className="mt-16 bg-brand-teal text-white py-16 px-6 text-center rounded-2xl max-w-[1200px] mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto">
          <span className="font-display font-medium text-xs text-brand-paper/80 uppercase tracking-widest block mb-3">
            M&E Tender Integration
          </span>
          <h3 className="font-display font-medium text-3xl md:text-4xl tracking-tight mb-4">
            Specify This System For Your Project.
          </h3>
          <p className="font-body font-normal text-brand-paper/90 text-sm md:text-base mb-8 leading-relaxed">
            Ready to integrate these specifications into your mechanical and electrical tender? Submit your floor plans and channel counts to our engineering team for a structured quote without sales pressure[cite: 7].
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-white text-brand-slate font-display font-medium text-base px-8 py-4 rounded-xl shadow-lg hover:bg-brand-mist hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97]"
          >
            <span>Proceed To Requirement Form[cite: 5]</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
