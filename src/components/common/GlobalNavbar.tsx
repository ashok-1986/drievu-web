"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        shouldBeDark
          ? "h-[60px] bg-brand-slate/95 backdrop-blur-md border-b border-brand-grey/20 text-white shadow-soft"
          : "h-[80px] bg-transparent border-b border-white/10 text-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Brand Logo - Strict Weight-500 Ceiling with Optical Tracking */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer select-none">
          <Image
            src="/logo.png"
            alt="Drievu"
            width={40}
            height={40}
            className="group-hover:opacity-80 transition-opacity duration-200"
          />
          <span className="font-display font-medium text-xl tracking-tight text-white">
            DRIEVU<span className="text-brand-teal">.</span>
          </span>
        </Link>

        {/* Desktop Navigation with Underline Draw */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-display font-medium text-[15px] tracking-tight transition-colors duration-150 py-1 cursor-pointer select-none ${
                  isActive
                    ? "text-brand-teal"
                    : shouldBeDark
                      ? "text-brand-paper/85 hover:text-brand-paper"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
                {/* Underline draw signature animation */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-teal transform origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Primary Lead Capture CTA - Directs to Requirement Form */}
        <div className="flex items-center gap-4">
          <Link
            href="/consultation"
            className="bg-brand-teal text-white font-display font-medium text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-soft hover:bg-[#006666] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] inline-flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Book Scoping Review</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </header>
  );
}
