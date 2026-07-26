import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/landingData';
import { HelpCircle, ChevronDown, Search, Filter } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'tariffs' | 'logistics' | 'pilot'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>База знаний</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Часто задаваемые вопросы (FAQ)
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Развернутые ответы на ключевые вопросы селлеров о бизнес-модели, тарифах, комплаенсе и пилоте.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-medium w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Все (22)
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeCategory === 'general'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Общие
            </button>
            <button
              onClick={() => setActiveCategory('tariffs')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeCategory === 'tariffs'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Тарифы & Комиссия
            </button>
            <button
              onClick={() => setActiveCategory('logistics')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeCategory === 'logistics'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Логистика & CDEK
            </button>
            <button
              onClick={() => setActiveCategory('pilot')}
              className={`px-3 py-2 rounded-xl transition-all ${
                activeCategory === 'pilot'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              Пилотная программа
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по вопросам..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

        </div>

        {/* Accordion FAQ List */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-white/60 text-sm bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
              По вашему запросу вопросов не найдено. Напишите нам напрямую на <strong className="text-blue-300 font-mono">go@usourcedirect.com</strong>!
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-white/10 backdrop-blur-xl border-white/30 shadow-2xl'
                      : 'bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
