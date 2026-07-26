import React from 'react';
import { ROADMAP_STAGES } from '../data/landingData';
import { TrendingUp, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const GrowthRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Стратегическая эволюция</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Пять этапов роста партнерства
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Начинаем с одного проверенного товара. Строим инфраструктуру, которая расширяется вместе с ростом ваших оборотов.
          </p>
        </div>

        {/* 5 Stages Horizontal / Vertical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {ROADMAP_STAGES.map((s) => (
            <div
              key={s.stage}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{s.stage}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-blue-300 border border-white/20">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {s.stage}. {s.title}
                </h3>

                <ul className="space-y-2 text-xs text-white/60">
                  {s.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-1.5">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-white/40">
                Этап #{s.stage}
              </div>
            </div>
          ))}
        </div>

        {/* Central Motto Banner */}
        <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 text-center max-w-3xl mx-auto shadow-2xl">
          <Sparkles className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <h3 className="text-lg font-extrabold text-white mb-1">
            «Начинаем с одного товара. Строим инфраструктуру, которая вырастет вместе с вашим бизнесом.»
          </h3>
          <p className="text-xs text-white/70">
            Мы одинаково внимательно сопровождаем как первые штучные тесты, так и масштабные B2B-потоки регулярных партнеров.
          </p>
        </div>

      </div>
    </section>
  );
};
