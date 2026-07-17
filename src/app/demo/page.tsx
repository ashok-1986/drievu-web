import { MagneticText } from "@/components/ui/morphing-cursor"

export default function Page() {
  return (
    <main className="min-h-screen bg-brand-paper flex flex-col items-center justify-center gap-16 p-8">
      <p className="text-brand-grey text-xs tracking-[0.25em] uppercase font-display font-normal">Hover to interact</p>

      <div className="flex flex-col items-center gap-8 font-display">
        <MagneticText text="CREATE" hoverText="ELEVATE" />
        <MagneticText text="VISION" hoverText="DESIGN" />
      </div>
    </main>
  )
}
