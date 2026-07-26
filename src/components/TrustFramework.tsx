import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Award, ChevronRight, Lock } from 'lucide-react';

export const TrustFramework: React.FC = () => {
  const ladderSteps = [
    { num: 1, label: '1–5 разовых заказов', desc: 'Тестирование модели без депозита по тарифу «По заказу»' },
    { num: 2, label: 'Небольшой резерв', desc: 'Апробация Закупочного резерва для снижения комиссии до 27%' },
    { num: 3, label: 'Регулярный поток', desc: 'Ускоренный выкуп и включение до 30 проверок SKU в месяц' },
    { num: 4, label: 'Еженедельные акты', desc: 'Консолидированная B2B-отчетность и персональный менеджмент' },
    { num: 5, label: 'Спец-условия', desc: 'Индивидуальные тарифные сетки и прямой переход на мелкий опт' },
  ];

  return (
    <section id="trust" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Управление рисками</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Мы строим модель на прозрачности, а не на обещаниях
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Фундамент долгосрочного B2B-сотрудничества — это юридическая ясность, измеримые стандарты и предсказуемость каждого шага.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-blue-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Письменный B2B-договор</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Фиксация прав, обязанностей, порядка расчетов, параметров ответственности и правил обработки Закупочного резерва.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Контролируемый порог цены</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Вы сами устанавливаете допустимое отклонение цены у продавца в США (например, ±3%). При превышении выкуп приостанавливается.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-blue-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Раздельный показ логистики</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Никаких скрытых наценок: стоимость выкупа, внутренних налогов США, нашей комиссии и доставки CDEK отображаются отдельно.
            </p>
          </div>
        </div>

        {/* Gradual Trust Ladder Graphic */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl font-bold text-white mb-2">Доверие строится поэтапно</h3>
            <p className="text-xs sm:text-sm text-white/70">
              Вам не нужно сразу рисковать депозитами. Вы можете протестировать модель на 1–2 заказах и плавно переходить на выгодные тарифы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {ladderSteps.map((step, idx) => (
              <div
                key={step.num}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between relative group hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">Уровень 0{step.num}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{step.label}</h4>
                  <p className="text-[11px] text-white/60 leading-normal">{step.desc}</p>
                </div>

                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
