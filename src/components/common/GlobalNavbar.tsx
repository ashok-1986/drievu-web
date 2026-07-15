"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { TactileLink } from "@/components/motion/MotionPrimitives";

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

  const darkHeader = "h-[60px] bg-brand-slate/90 backdrop-blur-md border-b border-white/10 shadow-soft";
  const lightHeader = "h-[80px] bg-transparent border-none";
  const headerClass = `fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${shouldBeDark ? darkHeader : lightHeader}`;

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SECTORS", href: "/sectors" },
    { name: "TRACK RECORD", href: "/track-record" },
    { name: "SYSTEM BUILDER", href: "/system-builder" },
    { name: "COMPLIANCE", href: "/compliance" },
  ];

  return (
    <>
      <header className={headerClass}>
        {/* Scrim for transparent state */}
        {!shouldBeDark && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/85 via-brand-dark/50 to-transparent pointer-events-none transition-opacity duration-300" />
        )}
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">

          {/* Brand Logo - PNG Asset */}
          <Link href="/" className="flex items-center shrink-0 cursor-pointer">
            <Image src="/logo.png" alt="Drievu Engineering" width={130} height={48} className="h-8 md:h-[58px] w-auto object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const baseClass = "relative px-3.5 py-2 rounded-lg font-display font-medium text-sm transition-all duration-150";
              const textStyle = !shouldBeDark ? "text-white drop-shadow-md" : (isActive ? "text-white" : "text-white/80");
              const linkClass = isActive
                ? `${baseClass} ${textStyle} bg-white/10`
                : `${baseClass} ${textStyle} hover:text-white hover:bg-white/10`;
              return (
                <TactileLink
                  key={link.name}
                  href={link.href}
                  variant="ghost"
                  size="sm"
                  className={linkClass}
                >
                  {link.name}
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
              icon={<ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />}
              iconPosition="right"
              className="shadow-soft hover:bg-brand-teal-deep hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] group cursor-pointer"
            >
              <span>BOOK SCOPING REVIEW</span>
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
            className="fixed inset-0 z-[110] bg-brand-slate/80 backdrop-blur-sm lg:hidden"
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
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[110] bg-brand-slate border-l border-brand-grey/20 lg:hidden flex flex-col"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/logo.png" alt="Drievu Engineering" width={130} height={38} className="h-8 w-auto object-contain" priority />
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
                icon={<ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />}
                iconPosition="right"
                className="w-full justify-center shadow-elevated hover:bg-brand-teal-deep group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BOOK SCOPING REVIEW
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