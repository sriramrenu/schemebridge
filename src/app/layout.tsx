import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import AccessibilityPanel from "./components/AccessibilityPanel";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Scheme Bridge | One-Stop Portal for Government Schemes",
  description: "Discover, understand, and apply for government schemes that empower your life. Bridging the gap between policy and people.",
  openGraph: {
    title: "Scheme Bridge",
    description: "India's smartest gateway to government schemes.",
    type: "website",
  },
};

import { getSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased">
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <Script id="google-translate-config" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ta',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        {/* ── Animated Background Blobs ── */}
        <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="animate-float absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }}
          />
          <div
            className="animate-float-delayed absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }}
          />
        </div>

        <Navbar session={session} />
        <main className="pt-28 pb-16">
          {children}
        </main>

        {/* ── Footer ── */}
        <div className="px-4 pb-4 mt-12">
          <footer className="glass rounded-3xl max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left shadow-xl shadow-blue-900/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#1e3a8a] to-[#3b82f6] rounded-lg flex items-center justify-center shadow-lg shadow-blue-800/30">
                <span className="text-white font-extrabold text-sm italic">RR</span>
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">Scheme<span className="text-[#3b82f6]">Bridge</span></span>
            </div>
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Data sourced from public government repositories.
            </p>
            <p className="text-sm text-slate-500 font-medium max-w-md">
              Built for public good.
            </p>
            <div className="text-sm font-bold text-slate-600 flex items-center justify-center gap-6">
              <a href="/faqs" className="hover:text-[#1e3a8a] transition-all hover:-translate-y-0.5 inline-block">FAQs</a>
              <a href="/about" className="hover:text-[#1e3a8a] transition-all hover:-translate-y-0.5 inline-block">About</a>
              <a href="/terms" className="hover:text-[#1e3a8a] transition-all hover:-translate-y-0.5 inline-block">Terms</a>
            </div>
          </footer>
        </div>

        <AccessibilityPanel />
        <Toaster position="top-center" expand={false} richColors />
      </body>
    </html>
  );
}
