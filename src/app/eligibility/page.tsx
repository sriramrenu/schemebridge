'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  Briefcase, 
  CheckCircle2,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import rawSchemesData from '../data/schemes.json';

const schemesData = rawSchemesData as Array<{
  title: string; summary: string; category: string; state?: string; slug: string; ministry: string;
}>;

type Step = 1 | 2 | 3 | 4 | 5;

export default function EligibilityWizard() {
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState({
    gender: '',
    age: '',
    state: 'Central',
    caste: 'General',
    occupation: '',
    income: ''
  });

  const states = useMemo(() => {
    return Array.from(new Set(schemesData.map(s => s.state || 'Central'))).sort();
  }, []);

  const occupations = [
    "Student", "Farmer", "Business Owner", "Unemployed", "Self Employed", "Government Employee", "Retired"
  ];

  const filteredSchemes = useMemo(() => {
    if (step < 5) return [];

    return schemesData.filter(scheme => {
      const text = `${scheme.title} ${scheme.summary} ${scheme.category}`.toLowerCase();
      
      // Gender Filter
      if (profile.gender === 'female' && !text.includes('women') && !text.includes('female') && !text.includes('girl') && !text.includes('mother')) {
          // If a scheme is specifically for males/others we might want to hide it, 
          // but usually 'women' schemes are the specific ones. 
          // For now, let's just rank or keep all.
      }

      // State Filter
      const stateMatch = profile.state === 'Central' || scheme.state === 'Central' || scheme.state === profile.state;
      
      // Income Filter (Rough estimation)
      const incomeNum = parseInt(profile.income) || 0;
      if (incomeNum > 800000 && (text.includes('poor') || text.includes('bpl') || text.includes('marginal'))) {
          return false;
      }

      return stateMatch;
    }).slice(0, 15); // Show top 15 matches
  }, [profile, step]);

  const handleNext = () => setStep((s) => (s + 1) as Step);
  const handleBack = () => setStep((s) => (s - 1) as Step);

  const canProceed = (() => {
    if (step === 1) return profile.gender !== '' && profile.age !== '';
    if (step === 2) return profile.state !== '';
    if (step === 3) return profile.caste !== '';
    if (step === 4) return profile.occupation !== '' && profile.income !== '';
    return true;
  })();

  const progress = (step / 5) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      {/* Header & Progress */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Elite Eligibility Checker</h1>
        <p className="text-slate-600 mb-8">Find your perfect matches in less than 60 seconds.</p>
        
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          />
        </div>
      </div>

      <div className="glass rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex-grow"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Basic Profile</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Your Gender</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Male', 'Female', 'Transgender'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setProfile({...profile, gender: g.toLowerCase()})}
                        className={`py-6 rounded-2xl font-bold border-2 transition-all ${
                          profile.gender === g.toLowerCase() 
                          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                          : 'border-slate-100 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Your Age</label>
                  <input 
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: e.target.value})}
                    placeholder="Enter age (e.g. 25)"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-brand-primary transition-all text-lg font-semibold"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex-grow"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Location Details</h2>
              </div>

              <div className="space-y-6">
                <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider">State / Union Territory</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {states.slice(0, 10).map((s) => (
                    <button
                      key={s}
                      onClick={() => setProfile({...profile, state: s})}
                      className={`px-6 py-4 rounded-xl text-left font-semibold border-2 transition-all ${
                        profile.state === s 
                        ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                        : 'border-slate-100 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  {states.length > 10 && (
                    <select 
                      className="px-6 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 font-semibold"
                      onChange={(e) => setProfile({...profile, state: e.target.value})}
                      value={states.includes(profile.state) ? profile.state : ''}
                    >
                      <option value="">More States...</option>
                      {states.slice(10).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex-grow"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Demographics</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Caste Category</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['General', 'SC', 'ST', 'OBC'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setProfile({...profile, caste: c})}
                        className={`py-4 rounded-xl font-bold border-2 transition-all ${
                          profile.caste === c 
                          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                          : 'border-slate-100 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex-grow"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Economic Profile</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Occupation</label>
                  <select 
                    value={profile.occupation}
                    onChange={(e) => setProfile({...profile, occupation: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-brand-primary transition-all font-semibold"
                  >
                    <option value="">Select Occupation</option>
                    {occupations.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Family Annual Income (₹)</label>
                  <input 
                    type="number"
                    value={profile.income}
                    onChange={(e) => setProfile({...profile, income: e.target.value})}
                    placeholder="Enter amount (e.g. 500000)"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 outline-none focus:border-brand-primary transition-all text-lg font-semibold"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-grow"
            >
              <div className="text-center py-6">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-2">We found matches!</h2>
                 <p className="text-slate-600 mb-8">Based on your profile, here are the best schemes for you.</p>

                 <div className="space-y-4 text-left">
                    {filteredSchemes.map((s, i) => (
                      <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-brand-primary/30 transition-all">
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{s.title}</h4>
                          <p className="text-sm text-slate-500">{s.ministry}</p>
                        </div>
                        <Link href={`/schemes/${s.slug}`} className="p-2 bg-slate-50 text-slate-400 group-hover:bg-brand-primary group-hover:text-white rounded-lg transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    ))}
                 </div>

                 <div className="mt-10 flex gap-3 justify-center">
                    <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600">Restart</button>
                    <Link href="/search" className="px-6 py-3 rounded-xl font-bold bg-brand-primary text-white shadow-lg">Browse All</Link>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 font-bold transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-10 py-4 font-bold rounded-2xl flex items-center gap-2 transition-all ${
                canProceed 
                ? 'bg-brand-primary text-white hover:bg-brand-secondary shadow-xl hover:shadow-brand-secondary/20 active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {step === 4 ? 'See Results' : 'Next Step'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Trust Badge */}
      <div className="mt-8 flex items-center justify-center gap-4 text-slate-400">
        <AlertCircle className="w-4 h-4" />
        <p className="text-sm font-medium">Your data remains private and is never stored on our servers.</p>
      </div>
    </div>
  );
}
