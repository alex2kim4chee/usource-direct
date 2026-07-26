import React from 'react';
import { Check, Mail, Info, ShieldCheck, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface PricingProps {
  onCopyEmail: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onCopyEmail }) => {
  const mailtoTariff1 = `mailto:${EMAIL_ADDRESS}?subject=Интересует тариф «По заказу»`;
  const mailtoTariff2 = `mailto:${EMAIL_ADDRESS}?subject=Интересует тариф с закупочным резервом`;

  return (
    <section id="pricing" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Прозрачная коммерческая модель</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Две гибкие модели сотрудничества
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Выбирайте уровень интеграции в зависимости от готовности оборотного капитала и объемов тестирования товаров.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Tariff 1: По заказу */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col justify-between relative group hover:border-white/20 transition-all shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 text-xs font-semibold">
                  Для тестирования и небольшого объема
                </span>
                <span className="text-xs font-mono text-white/40">Тариф 01</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">«По заказу»</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
                Разовый выкуп каждого отдельного заказа. Не требует постоянно поддерживаемого баланса или больших депозитов.
              </p>

              {/* Price Highlight */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                  ~35% <span className="text-xs font-normal text-white/50 font-sans">от расчетной базы США</span>
                </div>
                <div className="text-xs text-white/60">
                  Минимальный сервисный сбор: <strong className="text-white">от $25 за заказ</strong>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 text-xs sm:text-sm text-white/80 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Без обязательного авансового депозита</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Каждый одобренный заказ оплачивается отдельно</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Выкуп начинается строго после подтверждения поступления денег</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Включено до 10 новых проверок SKU в месяц в пилоте</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Идеально подходит для первых 1–5 тестовых заказов</span>
                </li>
              </ul>
            </div>

            <div>
              {/* Clarifying note */}
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-[11px] text-white/60 leading-relaxed mb-6">
                <Info className="w-4 h-4 text-white/50 inline shrink-0 mr-1.5 -mt-0.5" />
                Вы не передаете нам крупный аванс, но каждая операция требует отдельной банковской обработки, проверки и конвертации. Поэтому стоимость обслуживания выше.
              </div>

              <a
                href={mailtoTariff1}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                <span>Начать без баланса</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tariff 2: Закупочный резерв */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 flex flex-col justify-between relative shadow-2xl group hover:border-white/30 transition-all">
            <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Популярный выбор
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold">
                  Выгоднее при регулярных заказах
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">«Закупочный резерв»</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Авансовое формирование B2B-депозита под будущие выкупы. Существенная экономия за счет снижения транзакционных издержек.
              </p>

              {/* Price Highlight */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 font-mono mb-1">
                  ~27% <span className="text-xs font-normal text-white/60 font-sans">от расчетной базы США</span>
                </div>
                <div className="text-xs text-white/70">
                  Сниженный сервисный сбор: <strong className="text-emerald-400">от $15 за заказ</strong>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 text-xs sm:text-sm text-white/80 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Мгновенный выкуп без ожидания проведения платежей</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Снижение комиссии за счет отсутствия разовых конвертаций</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Приоритетная обработка и консолидация на складе</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Включено до 30 новых проверок SKU в месяц</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Прозрачная выписка и возврат неиспользованного остатка</span>
                </li>
              </ul>
            </div>

            <div>
              {/* Clarifying note */}
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-[11px] text-white/70 leading-relaxed mb-6">
                <Info className="w-4 h-4 text-blue-400 inline shrink-0 mr-1.5 -mt-0.5" />
                Сниженная стоимость возникает за счет меньшего количества переводов, конвертаций, сверок и задержек, а не за счет использования средств селлера для чужих заказов.
              </div>

              <a
                href={mailtoTariff2}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 shadow-xl transition-all"
              >
                <span>Обсудить закупочный резерв</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Global Commercial Disclaimer */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/50 text-center max-w-3xl mx-auto backdrop-blur-md">
          <strong className="text-white/80">Предварительный статус тарифов:</strong> Указанные ставки — рабочая модель для исследования спроса и пилотного запуска. Итоговые коммерческие условия зависят от категории товара, валютного маршрута, объемов, сложности проверки и параметров международной логистики.
        </div>

      </div>
    </section>
  );
};
