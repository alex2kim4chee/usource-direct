import React, { useState } from 'react';
import { ELIGIBILITY_CATEGORIES } from '../data/landingData';
import { CheckCircle2, AlertCircle, XCircle, Search, Filter, Shield } from 'lucide-react';

export const ProductEligibility: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'approved' | 'review' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = ELIGIBILITY_CATEGORIES.filter((cat) => {
    if (selectedFilter !== 'all' && cat.status !== selectedFilter) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchesTitle = cat.title.toLowerCase().includes(query);
    const matchesItem = cat.items.some((item) => item.toLowerCase().includes(query));
    return matchesTitle || matchesItem;
  });

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Комплаенс-гид по категориям</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Не каждый товар подходит для этой модели
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Мы работаем строго в рамках законодательства США и РФ. Ознакомьтесь со статусами категорий перед отправкой ссылок.
          </p>
        </div>

        {/* Filter Controls & Search Input */}
        <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-medium w-full md:w-auto">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-2 rounded-xl transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Все категории
            </button>
            <button
              onClick={() => setSelectedFilter('approved')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedFilter === 'approved'
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'bg-white/5 text-emerald-400 hover:text-emerald-300 border border-white/10'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Одобрено</span>
            </button>
            <button
              onClick={() => setSelectedFilter('review')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedFilter === 'review'
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'bg-white/5 text-amber-400 hover:text-amber-300 border border-white/10'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Проверка</span>
            </button>
            <button
              onClick={() => setSelectedFilter('rejected')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                selectedFilter === 'rejected'
                  ? 'bg-rose-500 text-black font-bold shadow-md'
                  : 'bg-white/5 text-rose-400 hover:text-rose-300 border border-white/10'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Запрещено</span>
            </button>
          </div>

          {/* Keyword Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товара (например, обувь)..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

        </div>

        {/* Category Cards Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl backdrop-blur-xl border flex flex-col justify-between shadow-2xl transition-all ${
                cat.status === 'approved'
                  ? 'bg-white/5 border-emerald-500/30'
                  : cat.status === 'review'
                  ? 'bg-white/5 border-amber-500/30'
                  : 'bg-white/5 border-rose-500/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    cat.status === 'approved'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                      : cat.status === 'review'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                      : 'bg-rose-950/80 text-rose-300 border-rose-800'
                  }`}>
                    {cat.badgeText}
                  </span>

                  {cat.status === 'approved' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {cat.status === 'review' && <AlertCircle className="w-5 h-5 text-amber-400" />}
                  {cat.status === 'rejected' && <XCircle className="w-5 h-5 text-rose-400" />}
                </div>

                <h3 className="text-base font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-xs text-white/60 mb-4 leading-relaxed">{cat.description}</p>

                <ul className="space-y-2 text-xs text-white/80">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-white/40 font-mono">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-white/40 text-center">
                Комплаенс фильтр USource Direct
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/50 text-center max-w-3xl mx-auto backdrop-blur-md">
          <strong className="text-white/80">Примечание:</strong> Окончательное решение о допуске принимается персонально после анализа конкретного товара, продавца в США и параметров международной цепочки поставки.
        </div>

      </div>
    </section>
  );
};
