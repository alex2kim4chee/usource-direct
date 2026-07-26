import React from 'react';
import { Mail, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface FinalCTAProps {
  onCopyEmail: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onCopyEmail }) => {
  const finalMailto = `mailto:${EMAIL_ADDRESS}?subject=Хочу обсудить сотрудничество с USource Direct`;

  return (
    <section className="py-24 bg-[#0a0a0b] border-t border-white/10 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-6 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Готовы протестировать спрос без риска?</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Ваш следующий товар не обязательно должен начинаться с закупки партии
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
          Предложите товар, который нужен вашей аудитории. Мы проверим, можно ли превратить его в работающий B2B-процесс от покупки в США до доставки вашему клиенту.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-8">
          <a
            href={finalMailto}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm sm:text-base hover:bg-white/90 shadow-2xl transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5 text-black" />
            <span>Написать USource Direct</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onCopyEmail}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs backdrop-blur-md transition-all"
          >
            <Copy className="w-4 h-4 text-blue-400" />
            <span>partners@usource.direct</span>
          </button>
        </div>

        {/* Response Commitment Notice */}
        <p className="text-xs text-white/50 font-medium">
          Ответим по существу: что можно проверить, какие данные нужны и подходит ли ваш товар для пилотной модели.
        </p>

      </div>
    </section>
  );
};
