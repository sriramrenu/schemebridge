'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAction } from '@/app/actions/auth';
import type { JWTPayload } from 'jose';

export default function Navbar({ session }: { session: JWTPayload | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const pathname = usePathname();

  useEffect(() => {
    const isTamil = document.cookie.includes('googtrans=/en/ta');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isTamil) setLang('தமிழ்');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else setLang('EN');
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'EN' ? 'ta' : 'en';
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${nextLang}; path=/`;
    document.cookie = `googtrans=/en/${nextLang}; domain=${domain}; path=/`;
    document.cookie = `googtrans=/en/${nextLang}; domain=.${domain}; path=/`;
    window.location.reload();
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Find Schemes', href: '/search' },
    { label: 'Eligibility Check', href: '/eligibility' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-2xl border ${scrolled ? 'bg-white/95 backdrop-blur-2xl border-slate-200 shadow-2xl shadow-blue-900/10 py-3' : 'glass border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#1e3a8a] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-800/30 transition-all group-hover:rotate-12 group-hover:scale-110">
            <span className="text-white font-extrabold text-sm tracking-tight italic">RR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Scheme<span style={{ color: '#3b82f6' }}>Bridge</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Right Reach</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1 text-slate-600">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive(link.href)
                  ? 'bg-[#1e3a8a]/10 text-[#1e3a8a]'
                  : 'hover:bg-white/60 hover:text-[#1e3a8a]'
                }`}
            >
              {link.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/dashboard') ? 'bg-[#1e3a8a]/10 text-[#1e3a8a]' : 'hover:bg-white/60 hover:text-[#1e3a8a]'}`}
              >
                Dashboard
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/login') ? 'bg-[#1e3a8a]/10 text-[#1e3a8a]' : 'hover:bg-white/60 hover:text-[#1e3a8a]'}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="group px-6 py-2.5 bg-[#1e3a8a] text-white text-sm font-bold rounded-xl shadow-xl shadow-blue-900/20 hover:bg-[#3b82f6] transition-all active:scale-95 flex items-center gap-2"
              >
                Register
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Action Icons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg border-2 border-slate-200 text-xs font-bold text-slate-500 hover:text-[#1e3a8a] hover:border-[#1e3a8a] transition-all flex items-center gap-1 active:scale-95"
            title="Translate English/Tamil"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === 'EN' ? 'A/அ' : 'EN'}
          </button>
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/60 text-slate-900 transition-all"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-slate-100 mt-4 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all ${isActive(link.href)
                      ? 'bg-[#1e3a8a] text-white'
                      : 'bg-white/40 text-slate-700 hover:bg-white'
                    }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}

              <div className="pt-6 space-y-3">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white/60 text-[#1e3a8a] font-bold rounded-2xl border border-white"
                    >
                      Dashboard
                    </Link>
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="w-full py-4 text-red-500 font-bold rounded-2xl bg-red-50"
                      >
                        Logout
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white/60 text-[#1e3a8a] font-bold rounded-2xl border border-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[#1e3a8a] text-white font-extrabold rounded-2xl shadow-xl shadow-blue-900/20"
                    >
                      Create Account <ChevronRight className="w-5 h-5" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
