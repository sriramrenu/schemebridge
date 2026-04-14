import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, FileText, Info, Building } from 'lucide-react';
import schemesData from '@/app/data/schemes.json';

export default async function SchemeDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const typedSchemesData = schemesData as Array<{
    slug: string; title: string; category: string; ministry: string; summary: string;
    benefits: string; eligibility: string; exclusion?: string; applicationProcess: string;
    documentsRequired: string;
  }>;
  const scheme = typedSchemesData.find(s => s.slug === resolvedParams.slug);

  if (!scheme) {
    notFound();
  }

  // Helper to parse HTML or format text slightly if needed. For now we use the raw strings safely.
  const formatContent = (text: string) => {
      // In a real app we might use something like DOMPurify and dangerouslySetInnerHTML if it was rich text.
      // Assuming plain text with numbers for now based on our mock data.
      return text.split(/(?=\d\.)/).map((item, idx) => (
          <p key={idx} className="mb-2 leading-relaxed text-slate-700">{item.trim()}</p>
      ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/search" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#1e3a8a] transition-colors mb-8 group">
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Finder
      </Link>

      <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#1e3a8a] to-brand-secondary/5 rounded-bl-full -z-10" />
        
        <div className="flex items-center space-x-3 mb-6">
          <span className="px-4 py-1.5 bg-[#1e3a8a] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
            {scheme.category}
          </span>
          <span className="text-sm font-medium text-slate-500 flex items-center">
            <Building className="w-4 h-4 mr-1 text-slate-400" />
            {scheme.ministry}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {scheme.title}
        </h1>

        <div className="prose prose-lg max-w-none text-slate-600 mb-12">
          <p className="text-xl leading-relaxed font-medium">{scheme.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Benefits */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white/40 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              Benefits
            </h3>
            {formatContent(scheme.benefits)}
          </div>

          {/* Eligibility */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white/40 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <Info className="w-5 h-5" />
              </span>
              Eligibility Criteria
            </h3>
            {formatContent(scheme.eligibility)}
          </div>
        </div>

        <div className="space-y-8">
            {/* Exclusion */}
            {scheme.exclusion && (
                <div className="border-l-4 border-red-400 pl-4 py-2">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Exclusions</h4>
                    <p className="text-slate-600">{scheme.exclusion}</p>
                </div>
            )}

            {/* Application Process */}
            <div className="bg-[#1e3a8a]/5 p-6 rounded-2xl border border-brand-primary/10">
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Application Process
                </h3>
                {formatContent(scheme.applicationProcess)}
            </div>

            {/* Documents Required */}
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Documents Required</h3>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    {formatContent(scheme.documentsRequired)}
                </div>
            </div>
        </div>

        <div className="mt-12 space-y-6">
          {/* Application Info Card */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] border-2 border-[#1e3a8a] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 shadow-sm">Ready to Apply?</h3>
            <p className="text-blue-50 mb-4 font-medium leading-relaxed">
              You now have all the information needed to apply for this scheme. The application details, eligibility criteria, and required documents are shown above.
            </p>
            <p className="text-sm text-blue-100/90 mb-6">
              Next steps: Ensure you meet all eligibility criteria, gather the required documents, and follow the application process outlined above. Visit the official government portal or contact the ministry directly to submit your application.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="px-6 py-2.5 bg-white text-[#1e3a8a] shadow-md rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Back to Find Schemes
              </Link>
              <Link
                href="/search"
                className="px-6 py-2.5 border-2 border-white/40 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Similar Schemes
              </Link>
            </div>
          </div>

          {/* Ministry Contact Info Suggestion */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Tip: Contact the Ministry</h4>
            <p className="text-sm text-blue-800">
              For official application portals and submission guidelines, contact <span className="font-semibold">{scheme.ministry}</span> directly or visit your state government&apos;s social welfare department website.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
