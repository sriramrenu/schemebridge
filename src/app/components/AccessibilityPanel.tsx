'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  X, 
  Moon, 
  Sun, 
  Type, 
  Eye, 
  ZapOff, 
  Undo2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    contrast: 'normal',
    dyslexiaFont: 'off',
    textSpacing: 'normal',
    lineHeight: 'normal',
    motion: 'normal',
    fontScale: 1
  });

  // Apply settings to document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-contrast', config.contrast);
    root.setAttribute('data-dyslexia-font', config.dyslexiaFont);
    root.setAttribute('data-text-spacing', config.textSpacing);
    root.setAttribute('data-line-height', config.lineHeight);
    root.setAttribute('data-motion', config.motion === 'reduced' ? 'reduced' : 'normal');
    root.style.setProperty('--user-font-scale', config.fontScale.toString());
  }, [config]);

  const toggle = (key: keyof typeof config, value: string | number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setConfig({
      contrast: 'normal',
      dyslexiaFont: 'off',
      textSpacing: 'normal',
      lineHeight: 'normal',
      motion: 'normal',
      fontScale: 1
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-brand-primary text-white rounded-full shadow-2xl hover:bg-brand-secondary transition-all active:scale-90"
        aria-label="Accessibility Settings"
      >
        <Settings className="w-6 h-6 animate-spin-slow" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-brand-primary" />
                  Accessibility
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-8">
                {/* Contrast */}
                <section>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Visual Contrast</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => toggle('contrast', 'normal')}
                      className={`p-3 rounded-xl border-2 flex items-center gap-2 font-semibold ${config.contrast === 'normal' ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-slate-100'}`}
                    >
                      <Sun className="w-4 h-4" /> Normal
                    </button>
                    <button 
                      onClick={() => toggle('contrast', 'high')}
                      className={`p-3 rounded-xl border-2 flex items-center gap-2 font-semibold ${config.contrast === 'high' ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-slate-100'}`}
                    >
                      <Moon className="w-4 h-4" /> High
                    </button>
                  </div>
                </section>

                {/* Font Scaling */}
                <section>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Text Size ({Math.round(config.fontScale * 100)}%)</label>
                  <input 
                    type="range" min="0.8" max="1.5" step="0.1" 
                    value={config.fontScale}
                    onChange={(e) => toggle('fontScale', parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                    <span>SMALL</span>
                    <span>LARGE</span>
                  </div>
                </section>

                {/* Dyslexia Font */}
                <section>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Dyslexia Friendly Font</label>
                  <button 
                    onClick={() => toggle('dyslexiaFont', config.dyslexiaFont === 'on' ? 'off' : 'on')}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between font-semibold ${config.dyslexiaFont === 'on' ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-slate-100'}`}
                  >
                    <div className="flex items-center gap-2">
                        <Type className="w-4 h-4" /> 
                        {config.dyslexiaFont === 'on' ? 'Enabled' : 'Disabled'}
                    </div>
                    {config.dyslexiaFont === 'on' && <Check className="w-4 h-4" />}
                  </button>
                </section>

                {/* Motion */}
                <section>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Animations</label>
                  <button 
                    onClick={() => toggle('motion', config.motion === 'reduced' ? 'normal' : 'reduced')}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between font-semibold ${config.motion === 'reduced' ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-slate-100'}`}
                  >
                    <div className="flex items-center gap-2">
                        <ZapOff className="w-4 h-4" /> 
                        {config.motion === 'reduced' ? 'Reduced Motion' : 'Standard'}
                    </div>
                    {config.motion === 'reduced' && <Check className="w-4 h-4" />}
                  </button>
                </section>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button 
                  onClick={reset}
                  className="w-full py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all"
                >
                  <Undo2 className="w-4 h-4" /> Reset Settings
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
