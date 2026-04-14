'use client';

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  Share2,
  Info
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const body = formData.get('message') as string;
    
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rightreach.schemebridge@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\nFrom: ' + name + ' <' + email + '>')}`;
    window.open(composeUrl, '_blank');
    
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions or feedback about Scheme Bridge? We&apos;d love to hear from you. Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/40">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <MessageSquare className="text-[#1e3a8a]" />
              Contact Info
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1e3a8a]/10 rounded-xl text-[#1e3a8a]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</p>
                  <p className="text-lg font-semibold text-slate-900 break-all">rightreach.schemebridge@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1e3a8a]/10 rounded-xl text-[#1e3a8a]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phone</p>
                  <p className="text-lg font-semibold text-slate-900">+91 6379390238</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1e3a8a]/10 rounded-xl text-[#1e3a8a]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Office</p>
                  <p className="text-lg font-semibold text-slate-900">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-[#1e3a8a] hover:text-white transition-all cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-[#1e3a8a] hover:text-white transition-all cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="p-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-[#1e3a8a] hover:text-white transition-all cursor-pointer">
                  <Info className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass p-8 md:p-10 rounded-[40px] border border-white/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1e3a8a]/5 rounded-bl-full" />

            <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>

            {formState === 'sent' ? (
              <div className="py-20 text-center animate-in zoom-in-50 duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h4 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h4>
                <p className="text-slate-600 text-lg mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="px-8 py-3 bg-[#1e3a8a] text-white font-bold rounded-xl hover:bg-[#3b82f6] transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <input
                    name="subject"
                    required
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full md:w-auto px-10 py-4 bg-[#1e3a8a] text-white font-bold rounded-2xl hover:bg-[#3b82f6] transition-all shadow-xl hover:shadow-[#3b82f6]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
