'use client';

import { useState } from 'react';
import { Plus, Minus, Search, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is Scheme Bridge?",
    answer: "Scheme Bridge is an AI-matching platform that helps Indian citizens find and understand government schemes based on their individual eligibility profiles. It simplifies thousands of pages of government documentation into simple, actionable information."
  },
  {
    question: "Are these official government schemes?",
    answer: "Yes. All data is sourced from official government portals like myScheme.gov.in and various ministry websites. We consolidate this data to provide a unified, accessible interface."
  },
  {
    question: "How do I apply for a scheme?",
    answer: "Once you find a scheme you are eligible for on Scheme Bridge, we provide the specific list of documents required and a detailed application process. Most schemes require you to apply via the official ministry website or at a Common Service Centre (CSC)."
  },
  {
    question: "Is my personal data safe?",
    answer: "Scheme Bridge is designed with privacy-first principles. We do not store any personal data you enter into the eligibility wizard. The data is only used during your session to filter relevant schemes locally."
  },
  {
    question: "How often is the data updated?",
    answer: "We run automated scripts periodically to sync with official government data sources to ensure that scheme details, eligibility criteria, and last dates are current."
  },
  {
    question: "Is Scheme Bridge free to use?",
    answer: "Absolutely. Scheme Bridge is a public service utility designed for social impact and is completely free for all citizens."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-600">Everything you need to know about navigating government benefits.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for common questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl glass focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, i) => (
            <div 
              key={i} 
              className={`glass rounded-2xl border transition-all duration-300 ${openIndex === i ? 'border-brand-primary/20 ring-1 ring-brand-primary/10' : 'border-white/40'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-bold text-slate-800 pr-4">{faq.question}</span>
                <div className={`p-2 rounded-xl transition-colors ${openIndex === i ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="h-px bg-slate-200/50 mb-6" />
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 glass rounded-3xl">
            <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No results found</h3>
            <p className="text-slate-500">Try adjusting your search terms.</p>
          </div>
        )}
      </div>

      {/* Contact Support CTA */}
      <div className="mt-20 glass p-10 rounded-3xl border border-brand-primary/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <MessageCircle className="w-32 h-32" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">Our support team is ready to help you navigate through complex scheme information.</p>
        <a href="/contact" className="px-8 py-3.5 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-all shadow-lg hover:shadow-brand-secondary/20">
          Contact Support
        </a>
      </div>
    </div>
  );
}
