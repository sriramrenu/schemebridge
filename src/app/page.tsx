'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Globe, 
  ShieldCheck, 
  Zap, 
  CreditCard,
  GraduationCap,
  HeartPulse,
  Sprout,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';
import SchemeCard from './components/SchemeCard';
import rawSchemesData from '../app/data/schemes.json';
import { ReactNode } from 'react';

const schemesData = rawSchemesData as Array<{
  id: string; slug: string; title: string; category: string; ministry: string; summary: string; state?: string;
}>;

const categoryIcons: Record<string, ReactNode> = {
  'Agriculture': <Sprout />,
  'Education & Learning': <GraduationCap />,
  'Health & Wellness': <HeartPulse />,
  'Banking': <CreditCard />,
  'IT & Communications': <Smartphone />,
  'Social welfare & Empowerment': <Users />,
};

export default function Home() {
  // Get enriched schemes first
  const heroSlugs = ['pm-kisan', 'pmsby', 'sui', 'post-dis'];
  const enriched = schemesData.filter(s => heroSlugs.includes(s.slug));
  const otherFeatured = schemesData.filter(s => !heroSlugs.includes(s.slug)).slice(0, 3);
  const featuredSchemes = [...enriched, ...otherFeatured].slice(0, 6);

  const stats = [
    { icon: BarChart3, label: 'Schemes Listed', value: `${schemesData.length}+` },
    { icon: Zap, label: 'Search Speed', value: `< 100ms` },
    { icon: Globe, label: 'Coverage', value: 'Pan India' },
  ];

  const categories = [
    { name: 'Agriculture', count: schemesData.filter(s => s.category.includes('Agriculture')).length },
    { name: 'Education & Learning', count: schemesData.filter(s => s.category.includes('Education')).length },
    { name: 'Health & Wellness', count: schemesData.filter(s => s.category.includes('Health')).length },
    { name: 'Social welfare & Empowerment', count: schemesData.filter(s => s.category.includes('Social welfare')).length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 mb-20">
      {/* ── Hero Section ── */}
      <section className="pt-16 pb-12 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 text-sm font-bold text-[#1e3a8a] mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>India&apos;s Smartest Gateway to Government Benefits</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl px-2"
        >
          Bridging the gap between <br />
          <span className="text-gradient">Policy and People</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed"
        >
          Discover, understand, and apply for government schemes tailored specifically for your profile. 100% free, private, and accessible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/eligibility"
            className="px-8 py-4 bg-[#1e3a8a] text-white text-lg font-bold rounded-2xl shadow-2xl shadow-blue-900/20 hover:bg-[#3b82f6] transition-all active:scale-95 flex items-center gap-2"
          >
            Check Your Eligibility
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/search"
            className="px-8 py-4 glass text-[#1e3a8a] text-lg font-bold rounded-2xl hover:bg-white transition-all border-[#1e3a8a]/10"
          >
            Browse All Schemes
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-20">
          {stats.map((stat, i) => (
            <motion.div 
                key={stat.label} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/50 border border-white/80 shadow-sm flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Schemes ── */}
      <section>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Featured Initiatives</h2>
            <p className="text-slate-500 font-medium tracking-tight">Handpicked schemes with high impact and wide coverage.</p>
          </div>
          <Link href="/search" className="hidden md:flex items-center gap-2 text-sm font-bold text-[#1e3a8a] hover:underline">
            View All Schemes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSchemes.map((scheme, idx) => (
            <SchemeCard key={scheme.id} scheme={scheme} index={idx} />
          ))}
        </div>
      </section>

      {/* ── Search by Category ── */}
      <section className="glass rounded-[40px] p-8 md:p-16 border-white/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-3xl -z-10" />
        
        <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Explore by Category</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Quickly jump into the specific sector you&apos;re interested in.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
                <Link 
                    key={cat.name} 
                    href={`/search?category=${encodeURIComponent(cat.name)}`}
                    className="p-8 bg-white/40 hover:bg-white rounded-[32px] border border-white/60 transition-all group"
                >
                    <div className="w-12 h-12 rounded-2xl bg-[#1e3a8a]/5 text-[#1e3a8a] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:bg-[#1e3a8a] group-hover:text-white">
                        {categoryIcons[cat.name] || <Zap />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{cat.count} Schemes</p>
                </Link>
            ))}
        </div>
      </section>

      {/* ── Commitment Section ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                Our Commitment to <br/>
                <span className="text-gradient">Accessible Governance</span>
            </h2>
            <div className="space-y-8">
                {[
                    { title: 'Privacy First', desc: 'We never store your personal data. All eligibility matches happen in real-time.', icon: <ShieldCheck className="text-green-500" /> },
                    { title: 'Data Driven', desc: 'Sourced directly from official myScheme repositories ensuring 100% accuracy.', icon: <BarChart3 className="text-blue-500" /> },
                    { title: 'Inclusive UX', desc: 'Built-in tools for high contrast and dyslexia-friendly reading.', icon: <Users className="text-amber-500" /> }
                ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/10 to-transparent rounded-[48px]" />
            <div className="glass h-full rounded-[48px] p-12 border-white/60 flex flex-col justify-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8">
                    <Sparkles className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Experience Digital <br/> Inclusivity</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                    Scheme Bridge isn&apos;t just a portal; it&apos;s a commitment to ensuring no citizen is left behind in India&apos;s digital revolution.
                </p>
                <Link href="/about" className="font-bold text-[#1e3a8a] flex items-center gap-2 hover:underline">
                    Read our full story <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      </section>

      {/* ── Final Call to Action ── */}
      <section className="py-24 text-center rounded-[64px] bg-gradient-to-b from-[#1e3a8a] to-[#0f172a] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <h2 className="text-4xl md:text-5xl font-black mb-8 px-4">Find your benefits today.</h2>
        <p className="text-blue-200 text-lg mb-12 max-w-xl mx-auto px-4 font-medium">Join thousands of citizens discovering support that changes lives.</p>
        <Link href="/eligibility" className="px-12 py-5 bg-white text-[#1e3a8a] text-xl font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-2xl shadow-blue-500/10 active:scale-95">
            Start Eligible Check
        </Link>
      </section>
    </div>
  );
}
