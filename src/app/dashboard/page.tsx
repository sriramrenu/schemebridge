import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { ArrowRight, Sparkles, User as UserIcon, MapPin, Briefcase, GraduationCap, LayoutDashboard } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import rawSchemesData from '../data/schemes.json';

const schemesData = rawSchemesData as Array<{
  id: string; slug: string; title: string; category: string; ministry: string; summary: string; state?: string;
}>;

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id as string },
  });

  if (!user) {
    redirect("/login");
  }

  // Smart Matching Logic
  const getPersonalizedSchemes = () => {
    return schemesData.filter(scheme => {
      // 1. State Filter (Central or match user state)
      const stateMatch = !scheme.state || scheme.state === "Central" || scheme.state === user.state;
      if (!stateMatch) return false;

      // 2. Profile Quality Filtering (Simple heuristic for demo)
      const content = (scheme.title + " " + scheme.summary + " " + scheme.category).toLowerCase();
      
      // Gender specific
      if (user.gender === "Female" && content.includes("women") || content.includes("girl") || content.includes("penn")) return true;
      
      // Employment specific
      if (user.employmentStatus === "Farmer / Agriculture" && content.includes("agriculture") || content.includes("kisan")) return true;
      if (user.employmentStatus === "Unemployed" && content.includes("skill") || content.includes("employment")) return true;

      // Student specific
      if (user.studentStatus?.includes("Student") && content.includes("education") || content.includes("scholarship") || content.includes("student")) return true;

      // Caste specific
      if (user.casteCategory !== "General" && content.includes(user.casteCategory!.toLowerCase())) return true;

      // Fallback: If it's a general scheme or matches the user's state
      return stateMatch;
    }).slice(0, 12); // Limit for performance/view
  };

  const recommendedSchemes = getPersonalizedSchemes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Welcome Header */}
      <section className="glass rounded-[3rem] p-8 md:p-12 border-white/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/5 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e3a8a]/10 text-[#1e3a8a] text-xs font-bold rounded-full mb-2">
                <Sparkles className="w-3 h-3" />
                Personalized Dashboard
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, <span className="text-[#1e3a8a]">{user.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-slate-500 font-medium">We&apos;ve analyzed {schemesData.length} records to find the best matches for you.</p>
          </div>
          <Link 
            href="/search" 
            className="px-6 py-3 bg-[#1e3a8a] text-white font-bold rounded-2xl shadow-lg hover:bg-[#3b82f6] transition-all flex items-center gap-2 whitespace-nowrap self-start md:self-center"
          >
            Find More <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-slate-100/50">
            <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{user.state}</span>
            </div>
            <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{user.gender}</span>
            </div>
            <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">{user.studentStatus}</span>
            </div>
            <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700 text-truncate">{user.employmentStatus}</span>
            </div>
        </div>
      </section>

      {/* Recommended Schemes Grid */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-[#1e3a8a]" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Recommended For You</h2>
            </div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{recommendedSchemes.length} Best Matches</span>
        </div>

        {recommendedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedSchemes.map((scheme, idx) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-bold">No direct matches found for your current profile filters.</p>
             <Link href="/search" className="text-[#1e3a8a] font-bold mt-4 inline-block hover:underline">Browse all schemes manually</Link>
          </div>
        )}
      </section>
    </div>
  );
}
