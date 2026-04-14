'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { login } from '@/app/actions/auth';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const toastId = toast.loading('Logging you in...');
    
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
      toast.error(result.error, { id: toastId });
    } else {
      toast.success('Login successful! Redirecting...', { id: toastId });
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/40 overflow-hidden relative">
          {/* Decorative Background Blob */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-[#1e3a8a] to-[#3b82f6] rounded-2xl shadow-lg shadow-blue-800/20 mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 font-medium mt-2">Sign in to access your personalized schemes</p>
          </div>

          <form action={handleSubmit} className="space-y-6 relative">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6] transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] focus:bg-white outline-none transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-[#3b82f6] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#3b82f6] transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl focus:border-[#3b82f6] focus:bg-white outline-none transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-[#1e3a8a] text-white font-extrabold rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-[#3b82f6] hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:translate-y-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 font-medium">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#1e3a8a] font-bold hover:underline">
              Create one for free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
