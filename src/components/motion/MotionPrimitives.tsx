"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPRING_TACTILE, SPRING_GLIDER, EASING_OUT_EXPO, EASING_REVEAL } from "@/lib/physics";

/**
 * TactileButton - Universal interactive primitive with Emil Kowalski spring physics
 * Enforces: active:scale-[0.98], whileHover y:-1, spring transitions
 * Supports polymorphic `as` prop for rendering as Link, button, etc.
 */
export interface TactileButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export function TactileButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  isLoading = false,
  disabled = false,
  className = "",
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: TactileButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-display font-medium rounded-full tracking-wide transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper";

  const variantStyles = {
    primary: "bg-brand-teal text-white border border-white/20 shadow-[0_4px_20px_rgba(0,128,128,0.35)] hover:shadow-[0_6px_24px_rgba(0,128,128,0.5)] hover:bg-[#006666]",
    secondary: "bg-white/15 text-white hover:bg-white/25 border border-white/30 backdrop-blur-md shadow-sm",
    ghost: "bg-transparent text-brand-slate hover:bg-brand-mist",
    outline: "border-2 border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal/10",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const iconComponent = icon && !isLoading ? (
    <span className="flex-shrink-0">{icon}</span>
  ) : isLoading ? (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full flex-shrink-0"
    />
  ) : null;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={SPRING_TACTILE}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      onClick={onClick}
      type={type}
    >
      {iconPosition === "left" && iconComponent}
      <span>{children}</span>
      {iconPosition === "right" && iconComponent}
    </motion.button>
  );
}

/**
 * TactileLink - Link variant of TactileButton for navigation
 */
export interface TactileLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
}

export function TactileLink({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: TactileLinkProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-display font-medium rounded-full tracking-wide transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper";

  const variantStyles = {
    primary: "bg-brand-teal text-white border border-white/20 shadow-[0_4px_20px_rgba(0,128,128,0.35)] hover:shadow-[0_6px_24px_rgba(0,128,128,0.5)] hover:bg-[#006666]",
    secondary: "bg-white/15 text-white hover:bg-white/25 border border-white/30 backdrop-blur-md shadow-sm",
    ghost: "bg-transparent text-brand-slate hover:bg-brand-mist",
    outline: "border-2 border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal/10",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const iconComponent = icon ? (
    <span className="flex-shrink-0">{icon}</span>
  ) : null;

  return (
    <motion.a
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={SPRING_TACTILE}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {iconPosition === "left" && iconComponent}
      <span>{children}</span>
      {iconPosition === "right" && iconComponent}
    </motion.a>
  );
}

/**
 * Tactile - Generic wrapper for any element needing spring tap/hover physics
 * Use for cards, divs, or any interactive surface that isn't a button/link
 */
export interface TactileProps {
  children: React.ReactNode;
  className?: string;
  tapScale?: number;
  hoverLift?: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  "aria-label"?: string;
}

export function Tactile({
  children,
  className = "",
  tapScale = 0.98,
  hoverLift = -2,
  onClick,
  role = "button",
  tabIndex = 0,
  onKeyDown,
  "aria-label": ariaLabel,
}: TactileProps) {
  return (
    <motion.div
      whileTap={{ scale: tapScale }}
      whileHover={{ y: hoverLift }}
      transition={SPRING_TACTILE}
      className={`cursor-pointer select-none ${className}`}
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
}

/**
 * GliderTab - Segmented control with layoutId spring glider
 * Used for property type, resolution, sector navigation tabs
 */
export interface GliderTabProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  gliderId?: string;
  columns?: number; // override grid columns (default: tabs.length)
}

export function GliderTab({ tabs, activeTab, onChange, className = "", gliderId = "activeTabGlider", columns }: GliderTabProps) {
  const gridCols = columns || tabs.length;
  return (
    <div className={`relative grid grid-cols-${gridCols} gap-1.5 p-1.5 bg-brand-mist rounded-xl border border-brand-grey/15 ${className}`}>
      <motion.div
        layoutId={gliderId}
        transition={SPRING_GLIDER}
        className="absolute inset-0 bg-brand-teal rounded-lg shadow-sm -z-10"
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative z-10 px-3 py-2 rounded-lg font-display font-medium text-xs text-center transition-colors duration-150 active:scale-[0.97] cursor-pointer ${
            activeTab === tab.id ? "text-white" : "text-brand-slate hover:text-brand-teal"
          }`}
          aria-current={activeTab === tab.id ? "true" : "false"}
        >
          {tab.icon && <span className="flex justify-center mb-1">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/**
 * GliderPill - Horizontal pill-style segmented control with glider
 * Used for resolution toggles (3K/4K), binary options
 */
export interface GliderPillProps {
  options: Array<{ id: string; label: string }>;
  activeOption: string;
  onChange: (id: string) => void;
  className?: string;
  gliderId?: string;
}

export function GliderPill({ options, activeOption, onChange, className = "", gliderId = "activePillGlider" }: GliderPillProps) {
  return (
    <div className={`relative flex gap-1.5 p-1 rounded-xl bg-brand-mist border border-brand-grey/15 ${className}`}>
      <motion.div
        layoutId={gliderId}
        transition={SPRING_GLIDER}
        className="absolute inset-y-0.5 bg-brand-slate rounded-lg shadow-sm -z-10"
        style={{ width: `${100 / options.length}%` }}
      />
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`relative z-10 flex-1 py-2 rounded-lg font-display font-medium text-xs transition-colors active:scale-[0.97] cursor-pointer ${
            activeOption === opt.id ? "text-white" : "text-brand-slate hover:text-brand-teal"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * OriginAccordion - Zero-jank FAQ drawer with height:auto animation
 * Eliminates the 1-frame CSS details height pop using Framer Motion
 */
export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface OriginAccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function OriginAccordion({ items, defaultOpenId, className = "" }: OriginAccordionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} defaultOpen={defaultOpenId === item.id} />
      ))}
    </div>
  );
}

function AccordionItem({ item, defaultOpen }: { item: AccordionItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false);

  return (
    <div className="rounded-2xl border border-brand-grey/20 bg-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left active:scale-[0.995] cursor-pointer transition-transform"
        aria-expanded={isOpen}
      >
        <span className="font-display font-medium text-sm text-brand-slate pr-8">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASING_OUT_EXPO }}
          className="flex-shrink-0 text-brand-teal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASING_OUT_EXPO }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 border-t border-brand-grey/10">
          <p className="font-body font-normal text-sm text-brand-grey leading-relaxed">
            {item.answer}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * ScrollReveal - Viewport reveal wrapper using GSAP ScrollTrigger
 * Used for section scrolling entrances with staggered delays
 */
export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = 0,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const getOffsets = () => {
      switch (direction) {
        case "up": return { y: 40, opacity: 0 };
        case "down": return { y: -40, opacity: 0 };
        case "left": return { x: 40, opacity: 0 };
        case "right": return { x: -40, opacity: 0 };
        default: return { opacity: 0 };
      }
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        getOffsets(),
        {
          ...getOffsets(),
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            once: false,
          },
        }
      );

      if (stagger > 0) {
        gsap.fromTo(
          el.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: delay + 0.1,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, direction, stagger]);

  return <div ref={ref} className={className}>{children}</div>;
}