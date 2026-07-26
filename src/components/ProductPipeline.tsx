import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, XCircle, ShieldCheck, Mail } from 'lucide-react';
import {
  checkEligibility,
  type EligibilityCheckResult,
  type EligibilityResultStatus,
} from '../data/eligibilityCatalog';

const resultStyles: Record<
  EligibilityResultStatus,
  {
    wrapper: string;
    icon: string;
    Icon: typeof CheckCircle2;
  }
> = {
  approved: {
    wrapper: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
    icon: 'text-emerald-400',
    Icon: CheckCircle2,
  },
  review: {
    wrapper: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
    icon: 'text-amber-400',
    Icon: AlertCircle,
  },
  restricted: {
    wrapper: 'bg-orange-950/40 border-orange-800/60 text-orange-200',
    icon: 'text-orange-400',
    Icon: AlertCircle,
  },
  rejected: {
    wrapper: 'bg-rose-950/40 border-rose-800/60 text-rose-200',
    icon: 'text-rose-400',
    Icon: XCircle,
  },
  unknown: {
    wrapper: 'bg-sky-950/50 border-sky-500/70 text-sky-100',
    icon: 'text-sky-300',
    Icon: Search,
  },
};

export const ProductPipeline: React.FC = () => {
  const [sampleInput, setSampleInput] = useState('');
  const [simulatedResult, setSimulatedResult] = useState<EligibilityCheckResult | null>(null);

  const pipelineSteps = [
    { num: 1, title: 'Ссылка от селлера', desc: 'Вы отправляете ссылку на товар из США' },
    { num: 2, title: 'Проверка поставщика', desc: 'Анализ надежности магазина и отзывов' },
    { num: 3, title: 'Проверка категории', desc: 'Комплаенс экспортных правил США и РФ' },
    { num: 4, title: 'Расчет габаритов', desc: 'Оценка физического и объемного веса' },
    { num: 5, title: 'Возвратные риски', desc: 'Правила возврата у продавца в США' },
    { num: 6, title: 'Расчет цены селлера', desc: 'Калькуляция чистой себестоимости' },
    { num: 7, title: 'Присвоение статуса', desc: 'Одобрен / Уточнение / Ограничено / Не подходит' },
    { num: 8, title: 'Доступ к продажам', desc: 'Публикация SKU в каталоге под заказ' },
  ];

  const handleSimulateCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleInput.trim()) return;

    setSimulatedResult(checkEligibility(sampleInput));
  };

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Принцип свободы выбора</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Мы не будем рассказывать вам, что должна хотеть ваша аудитория
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Вы знаете своих клиентов лучше нас. Поэтому вы сами предлагаете товары, бренды и категории, которые хотите продавать. Наша задача — определить, можно ли построить вокруг них безопасную, законную и экономически работающую цепочку поставки.
          </p>
        </div>

        {/* Pipeline Grid Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-white/40">
                    Этап проверки
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {step.num === 7 && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold">Одобрен</span> •{' '}
                  <span className="text-amber-400 font-bold">Уточнение</span> •{' '}
                  <span className="text-orange-400 font-bold">Ограничено</span> •{' '}
                  <span className="text-rose-400 font-bold">Отклонен</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Check Simulator Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-5 h-5 text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Симулятор проверки категории товара
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/60 mb-6">
            Введите название товара или категорию из США, чтобы протестировать симулированный ответ комплаенс-модели USource Direct:
          </p>

          <form onSubmit={handleSimulateCheck} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              placeholder="Например: Набор органайзеров, Обувь Nike, Набор кистей..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all shrink-0"
            >
              Проверить модель
            </button>
          </form>

          {simulatedResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                resultStyles[simulatedResult.status].wrapper
              }`}
            >
              {React.createElement(resultStyles[simulatedResult.status].Icon, {
                className: `w-5 h-5 ${resultStyles[simulatedResult.status].icon} shrink-0 mt-0.5`,
              })}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{simulatedResult.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-current opacity-80">
                    {simulatedResult.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">{simulatedResult.details}</p>
                {simulatedResult.status === 'unknown' && simulatedResult.mailtoHref && (
                  <a
                    href={simulatedResult.mailtoHref}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-sky-300 px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-sky-200"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Отправить запрос</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 text-center">
            <strong className="text-white/80">Важное замечание:</strong> Мы не принимаем любой товар автоматически. Предварительный комплаенс отбор защищает вас, конечного покупателя и нашу общую B2B-инфраструктуру.
          </div>
        </div>

      </div>
    </section>
  );
};
