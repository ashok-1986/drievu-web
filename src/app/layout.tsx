// src/app/layout.tsx
import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ParallaxEngine } from "@/components/common/ParallaxEngine";
import { GlobalNavbar } from "@/components/common/GlobalNavbar";
import { GlobalFooter } from "@/components/common/GlobalFooter";

/* 
 * STRICT GOVERNANCE: Only weights 400 (Normal) and 500 (Medium) are loaded.
 * All visual weight is achieved via optical scale and letter tracking.
 */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500"], // STRICT CEILING: 500 MAX
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
  weight: ["400", "500"], // STRICT CEILING: 500 MAX
});

export const metadata: Metadata = {
  title: "Drievu | Security & Smart Building Systems",
  description:
    "Independent security, life safety, and building automation systems. We design, install, and maintain reliable systems for UK properties without the jargon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${hanken.variable} ${ibmPlex.variable} antialiased selection:bg-brand-teal selection:text-white`}>
      <body className="bg-brand-paper text-brand-slate font-body min-h-screen flex flex-col">
        <ParallaxEngine />
        <GlobalNavbar />
        {/* Safe-area top padding prevents header overlap with H1 text */}
        <main className="flex-grow flex flex-col pt-28 md:pt-36">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
