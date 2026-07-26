import React from 'react';
import { Layers, ShieldCheck, DollarSign, Building, Cpu, RefreshCw, Scale } from 'lucide-react';

export const CostBreakdown: React.FC = () => {
  const breakdownItems = [
    { title: 'Комплаенс & проверка поставщика', desc: 'Анализ надежности магазина в США, экспортных ограничений и категории' },
    { title: 'Валютно-платежная координация', desc: 'Банковские комиссии, конвертации рубль-доллар, обработка транзакций' },
    { title: 'Выкуп & логистический хаб в США', desc: 'Приемка товара в Нью-Джерси, сверка содержимого, упаковка под CDEK' },
    { title: 'Мониторинг & клиентская поддержка', desc: 'Персональное сопровождение заказов, трекинг и координация доставки' },
    { title: 'SaaS-инфраструктура & интеграции', desc: 'Разработка личного кабинета, API, серверов и протоколов защиты' },
    { title: 'Рисковый резерв & возвратный фонд', desc: 'Фонд страхования форс-мажоров, повреждений и содействия возвратам' },
  ];

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Структура сервисного процента</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Вы платите не только за выкуп товара
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Мы строим полнофункциональную инфраструктурную B2B-платформу. Посмотрите, из чего складывается комиссионное вознаграждение USource Direct.
          </p>
        </div>

        {/* Cost Architecture Graphic */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl mb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {breakdownItems.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-white/20">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Core Infrastructure Message */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
              «Наша задача — построить устойчивую инфраструктуру, а не временно субсидировать заказы за счет собственных денег.»
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl mx-auto">
              Процент рассчитывается не от конечной розничной цены для вашего покупателя, а строго от согласованной расчетной базы (цена товара в США + внутренние расходы по США). Международная доставка CDEK и специальные расходы указываются отдельно.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
