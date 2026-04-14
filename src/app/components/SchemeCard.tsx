'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  ministry: string;
}

export default function SchemeCard({ scheme, index = 0 }: { scheme: Scheme; index?: number }) {
  const categoryColors: Record<string, string> = {
    'Agriculture,Rural & Environment': '#16a34a',
    'Health & Wellness': '#dc2626',
    'Business & Commerce': '#9333ea',
    'Banking, Financial Services and Insurance': '#0891b2',
    'Social Welfare & Empowerment': '#ea580c',
    'Education & Learning': '#2563eb',
    'Skills, Employment & Entrepreneurship': '#ca8a04',
  };
  const accent = categoryColors[scheme.category] || '#3b82f6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' }}
    >
      <Link href={`/schemes/${scheme.slug}`} className="block h-full">
        <div className="scheme-card glass rounded-2xl p-6 flex flex-col h-full relative overflow-hidden group cursor-pointer">
          {/* Accent corner */}
          <div
            className="absolute top-0 right-0 w-28 h-28 rounded-bl-full -z-10 opacity-15 transition-all group-hover:opacity-25 group-hover:w-36 group-hover:h-36"
            style={{ background: accent }}
          />

          <div className="flex items-center justify-between mb-4">
            <span
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full"
              style={{ background: `${accent}18`, color: accent }}
            >
              {scheme.category}
            </span>
            <ShieldCheck className="w-5 h-5 text-slate-300" />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug line-clamp-2">
            {scheme.title}
          </h3>

          <p className="text-xs text-slate-500 mb-3 flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{scheme.ministry}</span>
          </p>

          <p className="text-sm text-slate-600 flex-grow line-clamp-3 mb-6">
            {scheme.summary}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: accent }}>
              View Details
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ background: `${accent}15` }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: accent }} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
