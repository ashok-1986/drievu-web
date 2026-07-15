"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASING_OUT_EXPO } from "@/lib/physics";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  charStagger?: number;
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  charStagger = 0.018, // Ultra-snappy 18ms stagger between letters
}: SplitTextRevealProps) {
  // Split string into words to prevent awkward mid-word line breaking
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: charStagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 16, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: EASING_OUT_EXPO,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`inline-block ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`char-${wordIndex}-${charIndex}`}
              variants={charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
