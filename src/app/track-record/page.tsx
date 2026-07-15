// src/app/track-record/page.tsx
import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PortfolioGrid } from "@/components/track-record/PortfolioGrid";

export const metadata = {
  title: "Verified Track Record & Case Studies | Drievu UK Engineering",
  description: "Explore 20+ years of executive engineering delivery across national infrastructure, commercial towers, residential blocks, and industrial depots.",
};

export default function TrackRecordPage() {
  return (
    <main className="min-h-screen bg-brand-paper pb-24">
      
      {/* UNIVERSAL CINEMATIC HEADER */}
      <PageHeader
        badgeText="Executive Track Record · 20+ Years"
        title="Delivered At Major Scale."
        description="Before founding Drievu, our leadership team spent two decades delivering complex electronic security and building systems across national transit grids, financial centers, and commercial real estate."
        imageSrc="/headers/track-record-hero.webp" // Place your blue-hour transport/campus image here
        imageAlt="Modern UK transport hub and commercial real estate campus at blue hour"
      />

      {/* INTERACTIVE CLIENT PORTFOLIO GRID */}
      <PortfolioGrid />

    </main>
  );
}
