import React from "react";
import { GliderTab } from "./MotionPrimitives";

interface GliderProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeId: string;
  onChange: (id: string) => void;
  layoutIdNamespace?: string;
  className?: string;
}

export function Glider({ tabs, activeId, onChange, layoutIdNamespace = "glider", className = "" }: GliderProps) {
  return (
    <GliderTab
      tabs={tabs}
      activeTab={activeId}
      onChange={onChange}
      gliderId={layoutIdNamespace}
      className={className}
    />
  );
}
