import React from 'react';
import { PROBLEM_CARDS } from '../data/landingData';
import { AlertTriangle, Lock, TrendingDown, Layers, RefreshCcw, UserX, CheckCircle, ShieldAlert } from 'lucide-react';

export const MarketProblems: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'capital':
        return <Lock className="w-5 h-5 text-amber-400" />;
      case 'warehouse':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'rules':
        return <TrendingDown className="w-5 h-5 text-amber-400" />;
      case 'sku-risk':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'returns':
        return <RefreshCcw className="w-5 h-5 text-amber-400" />;
      case 'customer':
        return <UserX className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <span>Анализ операционных рисков</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Старый формат становится слишком рискованным
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Привычные модели классической торговли требуют постоянной заморозки оборотного капитала и несут высокие риски изменения внешних коммерческих условий.
          </p>
        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PROBLEM_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    {getIcon(card.id)}
                  </div>
                  <span className="font-mono text-xs text-white/40 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs font-medium text-amber-300/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{card.impact}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Strong Conclusion Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                Стратегия диверсификации каналов
              </h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-3xl">
                <strong className="text-white">USource Direct не заменяет все каналы продаж.</strong> Мы создаем дополнительный устойчивый канал, в котором вы самостоятельно контролируете выбор ассортимента, маржинальность, коммуникацию и долгосрочные отношения со своей аудиторией.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
