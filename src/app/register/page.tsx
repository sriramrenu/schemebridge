'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, MapPin, Users, Briefcase, GraduationCap, Coins } from 'lucide-react';
import { register } from '@/app/actions/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const toastId = toast.loading('Creating your account...');
    
    try {
      const result = await register(formData);
      
      if (result?.error) {
        setError(result.error);
        setLoading(false);
        toast.error(result.error, { id: toastId });
      } else {
        toast.success('Account created! Welcome to SchemeBridge.', { id: toastId });
      }
    } catch (e) {
      toast.success('Redirecting to dashboard...', { id: toastId });
    }
  }

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/40 overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl text-blue-500" />
          
          <div className="text-center mb-10 relative">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create Your Account</h1>
            <p className="text-slate-500 font-medium mt-3">Join SchemeBridge to get personalized government recommendations</p>
            
            <div className="flex items-center justify-center mt-8 gap-3">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-[#1e3a8a]' : 'w-4 bg-slate-200'}`}
                />
              ))}
            </div>
          </div>

          <form action={handleSubmit} className="relative">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold mb-8">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Step 1: Account Info */}
              <div className={step !== 1 ? 'hidden' : 'space-y-6'}>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Full Name</label>
                       <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <input name="name" type="text" required={step === 1} placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Email</label>
                       <div className="relative group">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <input name="email" type="email" required={step === 1} placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium" />
                       </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                      <input name="password" type="password" required={step === 1} placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium" />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} className="w-full py-4 bg-[#1e3a8a] text-white font-extrabold rounded-2xl shadow-xl hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-2 group">
                    Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>

              {/* Step 2: Demographics */}
              <div className={step !== 2 ? 'hidden' : 'space-y-6'}>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">State / Region</label>
                       <div className="relative group">
                         <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="state" required={step === 2} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select State</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Other">Other</option>
                         </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Gender</label>
                       <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="gender" required={step === 2} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                         </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Age Segment</label>
                       <div className="relative group">
                         <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="ageSegment" required={step === 2} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select Age Range</option>
                            <option value="Under 18">Under 18</option>
                            <option value="18-35">18 to 35</option>
                            <option value="36-60">36 to 60</option>
                            <option value="Senior Citizen (60+)">Senior Citizen (60+)</option>
                         </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Caste Category</label>
                       <div className="relative group">
                         <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="casteCategory" required={step === 2} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select Category</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="EBC">EBC</option>
                         </select>
                       </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-white transition-all">Back</button>
                    <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-[#1e3a8a] text-white font-extrabold rounded-2xl shadow-xl hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-2 group">
                      Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Step 3: Status & Income */}
              <div className={step !== 3 ? 'hidden' : 'space-y-6'}>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Currently Studying?</label>
                       <div className="relative group">
                         <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="studentStatus" required={step === 3} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select Status</option>
                            <option value="School Student">School Student</option>
                            <option value="College Student">College Student</option>
                            <option value="Research/PhD">Research/PhD</option>
                            <option value="Not a Student">Not a Student</option>
                         </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Employment</label>
                       <div className="relative group">
                         <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                         <select name="employmentStatus" required={step === 3} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                            <option value="">Select Status</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Self-Employed">Self-Employed</option>
                            <option value="Government Job">Government Job</option>
                            <option value="Private Sector">Private Sector</option>
                            <option value="Farmer / Agriculture">Farmer / Agriculture</option>
                         </select>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Annual Household Income</label>
                    <div className="relative group">
                      <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6]" />
                      <select name="incomeBracket" required={step === 3} className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] outline-none transition-all font-medium appearance-none">
                        <option value="">Select Income Bracket</option>
                        <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                        <option value="₹1 Lakh - ₹2.5 Lakh">₹1 Lakh to ₹2.5 Lakh</option>
                        <option value="₹2.5 Lakh - ₹5 Lakh">₹2.5 Lakh to ₹5 Lakh</option>
                        <option value="₹5 Lakh - ₹8 Lakh">₹5 Lakh to ₹8 Lakh</option>
                        <option value="Above ₹8 Lakh">Above ₹8 Lakh</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={prevStep} className="flex-1 py-4 border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-white transition-all">Back</button>
                    <button disabled={loading} type="submit" className="flex-[2] py-4 bg-[#1e3a8a] text-white font-extrabold rounded-2xl shadow-xl hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-2 group disabled:opacity-70">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finish Registration <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> </>}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </form>

          <p className="text-center mt-10 text-slate-500 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1e3a8a] font-bold hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
