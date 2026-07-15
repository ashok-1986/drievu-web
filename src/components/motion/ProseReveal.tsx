"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASING_REVEAL } from "@/lib/physics";

interface ProseRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Allows delaying prose until after the H1/H2 finishes splitting
}

export function ProseReveal({
  children,
  className = "",
  delay = 0.25, // Default 250ms delay creates an intentional overlap with the heading reveal sequence
}: ProseRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: delay,
        ease: EASING_REVEAL,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
