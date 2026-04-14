import { Shield, Users, Zap, Globe, HeartHandshake, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Universal Access",
      desc: "Ensuring every citizen, regardless of their technology literacy, can discover relevant government benefits."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Discovery",
      desc: "Powered by smart matching algorithms that filter through 500+ schemes in milliseconds."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Citizen Centric",
      desc: "Designed with an inclusive approach, featuring high-accessibility tools for all users."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Bridging the gap between <br />
            <span className="text-gradient">Policy and People</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed mb-10">
            Scheme Bridge is a next-generation platform designed to simplify the complex landscape of government schemes in India. We believe every citizen deserves easy access to the support they are entitled to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {values.map((v, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/40 hover:translate-y-[-4px] transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white/40 py-24 px-4 sm:px-6 lg:px-8 border-y border-white/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Governments launch hundreds of welfare schemes every year, but information often fails to reach the last mile. This &quot;Information Deficit&quot; prevents millions from accessing life-changing benefits in health, education, and finance.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              At Scheme Bridge, we leverage modern software architecture and inclusive design to ensure that matching a citizen to a scheme is as simple as a few clicks.
            </p>
            
            <ul className="space-y-4">
              {[
                "100% Free for Citizens",
                "Privacy-first approach (No data stored)",
                "Accessible in High Contrast & Dyslexia Fonts",
                "Simplified complex government terminology"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-800 font-semibold">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="glass rounded-[40px] aspect-square flex items-center justify-center p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent" />
              <Shield className="w-48 h-48 text-brand-primary/40 animate-pulse" />
              <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border border-white/60">
                <p className="text-brand-primary font-bold text-lg mb-1 italic">&quot;Empowering 1.4 Billion citizens through digital inclusivity.&quot;</p>
                <p className="text-slate-500 text-sm">— The Scheme Bridge Vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to find your match?</h2>
        <a href="/search" className="inline-flex items-center px-8 py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-secondary transition-all shadow-xl hover:shadow-brand-secondary/20 active:scale-95">
          Get Started Now
          <HeartHandshake className="ml-3 w-6 h-6" />
        </a>
      </section>
    </div>
  );
}
