'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import SchemeCard from '../components/SchemeCard';
import schemesData from '@/app/data/schemes.json';

const PAGE_SIZE = 24;

type SchemeTypeTab = 'all' | 'state' | 'central';

type GenderFilter = 'all' | 'female' | 'male' | 'transgender';
type AgeFilter = 'all' | '0-17' | '18-35' | '36-59' | '60+';
type CasteFilter = 'all' | 'sc' | 'st' | 'obc' | 'general';
type ResidenceFilter = 'both' | 'rural' | 'urban';
type OccupationFilter = 'all' | 'student' | 'farmer' | 'entrepreneur' | 'employed' | 'unemployed';
type BenefitTypeFilter = 'all' | 'cash' | 'in-kind' | 'composite';

function splitCategories(raw: string): string[] {
  return raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

function inferGender(blob: string): GenderFilter {
  if (blob.includes('transgender')) return 'transgender';
  if (blob.includes('women') || blob.includes('female') || blob.includes('girl') || blob.includes('widow')) return 'female';
  if (blob.includes('male') || blob.includes('boy') || blob.includes('men')) return 'male';
  return 'all';
}

function inferAgeBand(blob: string): AgeFilter {
  if (blob.includes('senior') || blob.includes('old age') || blob.includes('pension')) return '60+';
  if (blob.includes('student') || blob.includes('child') || blob.includes('school')) return '0-17';
  if (blob.includes('youth') || blob.includes('unemployed') || blob.includes('skill')) return '18-35';
  return '36-59';
}

function inferCaste(blob: string): CasteFilter {
  if (blob.includes('scheduled caste') || blob.includes('sc/')) return 'sc';
  if (blob.includes('scheduled tribe') || blob.includes('st/')) return 'st';
  if (blob.includes('obc')) return 'obc';
  if (blob.includes('general')) return 'general';
  return 'all';
}

function inferResidence(blob: string): ResidenceFilter {
  const hasRural = blob.includes('rural');
  const hasUrban = blob.includes('urban');
  if (hasRural && hasUrban) return 'both';
  if (hasRural) return 'rural';
  if (hasUrban) return 'urban';
  return 'both';
}

function inferOccupation(blob: string): OccupationFilter {
  if (blob.includes('student')) return 'student';
  if (blob.includes('farmer') || blob.includes('agriculture')) return 'farmer';
  if (blob.includes('entrepreneur') || blob.includes('startup') || blob.includes('business')) return 'entrepreneur';
  if (blob.includes('employed') || blob.includes('employee')) return 'employed';
  if (blob.includes('unemployed') || blob.includes('dropout')) return 'unemployed';
  return 'all';
}

function inferBenefitType(blob: string): BenefitTypeFilter {
  const hasCash =
    blob.includes('cash') ||
    blob.includes('scholarship') ||
    blob.includes('pension') ||
    blob.includes('loan') ||
    blob.includes('financial assistance');
  const hasInKind =
    blob.includes('training') ||
    blob.includes('insurance') ||
    blob.includes('equipment') ||
    blob.includes('hostel') ||
    blob.includes('service');
  if (hasCash && hasInKind) return 'composite';
  if (hasCash) return 'cash';
  if (hasInKind) return 'in-kind';
  return 'all';
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<SchemeTypeTab>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'title-asc' | 'title-desc'>('relevance');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all');
  const [casteFilter, setCasteFilter] = useState<CasteFilter>('all');
  const [residenceFilter, setResidenceFilter] = useState<ResidenceFilter>('both');
  const [occupationFilter, setOccupationFilter] = useState<OccupationFilter>('all');
  const [benefitTypeFilter, setBenefitTypeFilter] = useState<BenefitTypeFilter>('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const category = params.get('category') || 'All';
    const type = params.get('type');
    const nextTab: SchemeTypeTab = type === 'state' || type === 'central' ? type : 'all';

    setTimeout(() => {
      setQuery(q);
      setSelectedCategory(category);
      setTab(nextTab);
    }, 0);
  }, []);

  const allCategories = useMemo(() => {
    const unique = new Set<string>();
    for (const scheme of schemesData) {
      for (const cat of splitCategories(scheme.category)) {
        unique.add(cat);
      }
    }
    return ['All', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: schemesData.length };
    for (const category of allCategories) {
      if (category === 'All') continue;
      counts[category] = schemesData.filter((scheme) => splitCategories(scheme.category).includes(category)).length;
    }
    return counts;
  }, [allCategories]);

  // Calculate counts for gender filter options
  const genderCounts = useMemo(() => {
    const all = schemesData.length;
    const female = schemesData.filter((s) => inferGender(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'female').length;
    const male = schemesData.filter((s) => inferGender(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'male').length;
    const transgender = schemesData.filter((s) => inferGender(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'transgender').length;
    return { all, female, male, transgender };
  }, []);

  // Calculate counts for age filter options
  const ageCounts = useMemo(() => {
    const all = schemesData.length;
    const band0_17 = schemesData.filter((s) => inferAgeBand(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === '0-17').length;
    const band18_35 = schemesData.filter((s) => inferAgeBand(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === '18-35').length;
    const band36_59 = schemesData.filter((s) => inferAgeBand(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === '36-59').length;
    const band60plus = schemesData.filter((s) => inferAgeBand(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === '60+').length;
    return { all, '0-17': band0_17, '18-35': band18_35, '36-59': band36_59, '60+': band60plus };
  }, []);

  // Calculate counts for caste filter options
  const casteCounts = useMemo(() => {
    const all = schemesData.length;
    const sc = schemesData.filter((s) => inferCaste(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'sc').length;
    const st = schemesData.filter((s) => inferCaste(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'st').length;
    const obc = schemesData.filter((s) => inferCaste(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'obc').length;
    const general = schemesData.filter((s) => inferCaste(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'general').length;
    return { all, sc, st, obc, general };
  }, []);

  // Calculate counts for residence filter options
  const residenceCounts = useMemo(() => {
    const both = schemesData.length;
    const rural = schemesData.filter((s) => {
      const res = inferResidence(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase());
      return res === 'rural' || res === 'both';
    }).length;
    const urban = schemesData.filter((s) => {
      const res = inferResidence(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase());
      return res === 'urban' || res === 'both';
    }).length;
    return { both, rural, urban };
  }, []);

  // Calculate counts for occupation filter options
  const occupationCounts = useMemo(() => {
    const all = schemesData.length;
    const student = schemesData.filter((s) => inferOccupation(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'student').length;
    const farmer = schemesData.filter((s) => inferOccupation(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'farmer').length;
    const entrepreneur = schemesData.filter((s) => inferOccupation(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'entrepreneur').length;
    const employed = schemesData.filter((s) => inferOccupation(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'employed').length;
    const unemployed = schemesData.filter((s) => inferOccupation(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'unemployed').length;
    return { all, student, farmer, entrepreneur, employed, unemployed };
  }, []);

  // Calculate counts for benefit type filter options
  const benefitTypeCounts = useMemo(() => {
    const all = schemesData.length;
    const cash = schemesData.filter((s) => inferBenefitType(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'cash').length;
    const inKind = schemesData.filter((s) => inferBenefitType(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'in-kind').length;
    const composite = schemesData.filter((s) => inferBenefitType(`${s.title} ${s.summary} ${s.ministry}`.toLowerCase()) === 'composite').length;
    return { all, cash, 'in-kind': inKind, composite };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const results = schemesData.filter((scheme) => {
      const blob = `${scheme.title} ${scheme.summary} ${scheme.ministry} ${scheme.category}`.toLowerCase();
      const inferredGender = inferGender(blob);
      const inferredAgeBand = inferAgeBand(blob);
      const inferredCaste = inferCaste(blob);
      const inferredResidence = inferResidence(blob);
      const inferredOccupation = inferOccupation(blob);
      const inferredBenefitType = inferBenefitType(blob);

      const queryMatch = !q || blob.includes(q);
      const typeMatch =
        tab === 'all' ||
        (tab === 'central' && (scheme.state || '').toLowerCase() === 'central') ||
        (tab === 'state' && (scheme.state || '').toLowerCase() !== 'central');
      const categoryMatch = selectedCategory === 'All' || splitCategories(scheme.category).includes(selectedCategory);
      const genderMatch = genderFilter === 'all' || inferredGender === genderFilter;
      const ageMatch = ageFilter === 'all' || inferredAgeBand === ageFilter;
      const casteMatch = casteFilter === 'all' || inferredCaste === casteFilter;
      const residenceMatch = residenceFilter === 'both' || inferredResidence === residenceFilter;
      const occupationMatch = occupationFilter === 'all' || inferredOccupation === occupationFilter;
      const benefitTypeMatch = benefitTypeFilter === 'all' || inferredBenefitType === benefitTypeFilter;

      return (
        queryMatch &&
        typeMatch &&
        categoryMatch &&
        genderMatch &&
        ageMatch &&
        casteMatch &&
        residenceMatch &&
        occupationMatch &&
        benefitTypeMatch
      );
    });

    if (sortBy === 'title-asc') {
      return [...results].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'title-desc') {
      return [...results].sort((a, b) => b.title.localeCompare(a.title));
    }
    return results;
  }, [
    query,
    tab,
    selectedCategory,
    sortBy,
    genderFilter,
    ageFilter,
    casteFilter,
    residenceFilter,
    occupationFilter,
    benefitTypeFilter,
  ]);

  const activeFilters = useMemo(() => {
    const chips: Array<{ key: string; label: string; clear: () => void }> = [];

    if (tab !== 'all') {
      chips.push({ key: 'tab', label: `Type: ${tab}`, clear: () => setTab('all') });
    }
    if (selectedCategory !== 'All') {
      chips.push({ key: 'category', label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory('All') });
    }
    if (genderFilter !== 'all') {
      chips.push({ key: 'gender', label: `Gender: ${genderFilter}`, clear: () => setGenderFilter('all') });
    }
    if (ageFilter !== 'all') {
      chips.push({ key: 'age', label: `Age: ${ageFilter}`, clear: () => setAgeFilter('all') });
    }
    if (casteFilter !== 'all') {
      chips.push({ key: 'caste', label: `Caste: ${casteFilter.toUpperCase()}`, clear: () => setCasteFilter('all') });
    }
    if (residenceFilter !== 'both') {
      chips.push({ key: 'residence', label: `Residence: ${residenceFilter}`, clear: () => setResidenceFilter('both') });
    }
    if (occupationFilter !== 'all') {
      chips.push({ key: 'occupation', label: `Occupation: ${occupationFilter}`, clear: () => setOccupationFilter('all') });
    }
    if (benefitTypeFilter !== 'all') {
      chips.push({ key: 'benefitType', label: `Benefit: ${benefitTypeFilter}`, clear: () => setBenefitTypeFilter('all') });
    }
    if (query.trim()) {
      chips.push({ key: 'query', label: `Search: ${query.trim()}`, clear: () => setQuery('') });
    }

    return chips;
  }, [
    tab,
    selectedCategory,
    genderFilter,
    ageFilter,
    casteFilter,
    residenceFilter,
    occupationFilter,
    benefitTypeFilter,
    query,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const goToPage = (nextPage: number) => {
    const bounded = Math.max(1, Math.min(totalPages, nextPage));
    setPage(bounded);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Search Schemes</h1>
        <p className="text-slate-600 text-lg">Filter, sort, and browse schemes in one place.</p>
      </div>

      <div className="glass rounded-2xl p-5 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder='For exact match, use quotes like "Scheme Name"'
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-secondary/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 font-semibold">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'relevance' | 'title-asc' | 'title-desc');
                setPage(1);
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white/70 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: 'All Schemes', value: 'all' as SchemeTypeTab },
            { label: 'State Schemes', value: 'state' as SchemeTypeTab },
            { label: 'Central Schemes', value: 'central' as SchemeTypeTab },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setTab(item.value);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                tab === item.value ? 'bg-[#1e3a8a] text-white' : 'bg-white/70 text-slate-700 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside className="glass rounded-2xl p-5 h-fit lg:sticky lg:top-28">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-brand-secondary" />
            <h2 className="text-lg font-bold text-slate-800">Filter By</h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setGenderFilter('all');
              setAgeFilter('all');
              setCasteFilter('all');
              setResidenceFilter('both');
              setOccupationFilter('all');
              setBenefitTypeFilter('all');
              setPage(1);
            }}
            className="text-sm font-semibold text-brand-secondary hover:underline mb-4"
          >
            Reset Filters
          </button>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-2">Scheme Category</h3>
            <div className="max-h-[420px] overflow-auto pr-1 space-y-2">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-brand-primary font-semibold'
                      : 'hover:bg-white/70 text-slate-700'
                  }`}
                >
                  {category} <span className="text-slate-400">{categoryCounts[category] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Gender</h3>
              <select
                value={genderFilter}
                onChange={(e) => {
                  setGenderFilter(e.target.value as GenderFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="all">All ({genderCounts.all})</option>
                <option value="female">Female ({genderCounts.female})</option>
                <option value="male">Male ({genderCounts.male})</option>
                <option value="transgender">Transgender ({genderCounts.transgender})</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Age</h3>
              <select
                value={ageFilter}
                onChange={(e) => {
                  setAgeFilter(e.target.value as AgeFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="all">All ({ageCounts.all})</option>
                <option value="0-17">0-17 ({ageCounts['0-17']})</option>
                <option value="18-35">18-35 ({ageCounts['18-35']})</option>
                <option value="36-59">36-59 ({ageCounts['36-59']})</option>
                <option value="60+">60+ ({ageCounts['60+']})</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Caste</h3>
              <select
                value={casteFilter}
                onChange={(e) => {
                  setCasteFilter(e.target.value as CasteFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="all">All ({casteCounts.all})</option>
                <option value="sc">Scheduled Caste (SC) ({casteCounts.sc})</option>
                <option value="st">Scheduled Tribe (ST) ({casteCounts.st})</option>
                <option value="obc">Other Backward Class (OBC) ({casteCounts.obc})</option>
                <option value="general">General ({casteCounts.general})</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Residence</h3>
              <select
                value={residenceFilter}
                onChange={(e) => {
                  setResidenceFilter(e.target.value as ResidenceFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="both">Both ({residenceCounts.both})</option>
                <option value="rural">Rural ({residenceCounts.rural})</option>
                <option value="urban">Urban ({residenceCounts.urban})</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Occupation</h3>
              <select
                value={occupationFilter}
                onChange={(e) => {
                  setOccupationFilter(e.target.value as OccupationFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="all">All ({occupationCounts.all})</option>
                <option value="student">Student ({occupationCounts.student})</option>
                <option value="farmer">Farmer ({occupationCounts.farmer})</option>
                <option value="entrepreneur">Entrepreneur ({occupationCounts.entrepreneur})</option>
                <option value="employed">Employed ({occupationCounts.employed})</option>
                <option value="unemployed">Unemployed ({occupationCounts.unemployed})</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 mb-1">Benefit Type</h3>
              <select
                value={benefitTypeFilter}
                onChange={(e) => {
                  setBenefitTypeFilter(e.target.value as BenefitTypeFilter);
                  setPage(1);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm"
              >
                <option value="all">All ({benefitTypeCounts.all})</option>
                <option value="cash">Cash ({benefitTypeCounts.cash})</option>
                <option value="in-kind">In Kind ({benefitTypeCounts['in-kind']})</option>
                <option value="composite">Composite ({benefitTypeCounts.composite})</option>
              </select>
            </div>
          </div>
        </aside>

        <section>
          <p className="text-sm text-slate-600 mb-4">
            Total <span className="font-bold text-slate-900">{filtered.length}</span> schemes available
          </p>

          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {activeFilters.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => {
                    chip.clear();
                    setPage(1);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100"
                >
                  {chip.label} ×
                </button>
              ))}
            </div>
          )}

          {paged.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paged.map((scheme, idx) => (
                <SchemeCard key={`${scheme.id}-${idx}`} scheme={scheme} index={idx} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <h3 className="text-xl font-bold text-slate-800 mb-2">No matching schemes found</h3>
              <p className="text-slate-500">Try changing tab, category, or search text.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                const start = Math.max(1, safePage - 3);
                const current = Math.min(totalPages, start + i);
                return (
                  <button
                    key={current}
                    onClick={() => goToPage(current)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      current === safePage ? 'bg-[#1e3a8a] text-white' : 'border border-slate-300'
                    }`}
                  >
                    {current}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
