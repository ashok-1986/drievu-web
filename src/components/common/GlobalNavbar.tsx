"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { TactileLink, Tactile } from "@/components/motion/MotionPrimitives";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On home page: transparent until scroll. On other pages: always dark (scrolled state).
  const shouldBeDark = !isHome || isScrolled;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Sectors", href: "/sectors" },
    { name: "Track Record", href: "/track-record" },
    { name: "System Builder", href: "/system-builder" },
    { name: "Compliance", href: "/compliance" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          shouldBeDark
            ? "h-[60px] bg-brand-slate/95 backdrop-blur-md border-b border-brand-grey/20 text-white shadow-soft"
            : "h-[80px] bg-transparent border-b border-white/10 text-white"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Brand Logo - Force white/bright for visibility on all backgrounds */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer select-none">
            <Image
              src="/logo.png"
              alt="Drievu"
              width={40}
              height={40}
              className="group-hover:opacity-80 transition-opacity duration-200 brightness-0 invert"
            />
            <span className="font-display font-medium text-xl tracking-tight text-white">
              DRIEVU<span className="text-brand-teal">.</span>
            </span>
          </Link>

          {/* Desktop Navigation with Underline Draw */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <TactileLink
                  key={link.name}
                  href={link.href}
                  variant="ghost"
                  size="sm"
                  className={`relative py-1 font-display font-medium text-sm tracking-tight transition-colors duration-150 ${
                    isActive
                      ? "text-brand-teal"
                      : shouldBeDark
                        ? "text-brand-paper/85 hover:text-brand-paper"
                        : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.name}
                  {/* Underline draw signature animation */}
                  <motion.span
                    layoutId={isActive ? "nav-glider" : undefined}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-teal transform origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </TactileLink>
            );
            })}
          </nav>

          {/* Primary Lead Capture CTA - Directs to Requirement Form */}
          <div className="hidden lg:flex items-center gap-4">
            <TactileLink
              href="/consultation"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="shadow-soft hover:bg-brand-teal-deep hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Book Scoping Review</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </TactileLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors active:scale-[0.95]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-slate/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-brand-slate border-l border-brand-grey/20 lg:hidden flex flex-col"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/logo.png" alt="Drievu" width={32} height={32} className="brightness-0 invert" />
                  <span className="font-display font-medium text-lg tracking-tight text-white">
                    DRIEVU<span className="text-brand-teal">.</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors active:scale-[0.95]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1">
                <TactileLink
                  href="/"
                  variant={pathname === "/" ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </TactileLink>
                <TactileLink
                  href="/sectors"
                  variant={pathname === "/sectors" ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sectors
                </TactileLink>
                <TactileLink
                  href="/track-record"
                  variant={pathname === "/track-record" ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Record
                </TactileLink>
                <TactileLink
                  href="/system-builder"
                  variant={pathname === "/system-builder" ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  System Builder
                </TactileLink>
                <TactileLink
                  href="/compliance"
                  variant={pathname === "/compliance" ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Compliance
                </TactileLink>
              </nav>

              {/* Mobile CTA */}
              <TactileLink
                href="/consultation"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full justify-center shadow-elevated hover:bg-brand-teal-deep"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Scoping Review
              </TactileLink>

              {/* Secondary Links */}
              <div className="mt-8 pt-8 border-t border-brand-grey/20 space-y-3">
                <Link
                  href="/privacy"
                  className="font-body font-normal text-sm text-brand-grey-light hover:text-brand-paper transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="font-body font-normal text-sm text-brand-grey-light hover:text-brand-paper transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/compliance"
                  className="font-body font-normal text-sm text-brand-grey-light hover:text-brand-paper transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Compliance & SLA
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}