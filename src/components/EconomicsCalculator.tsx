import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

export const EconomicsCalculator: React.FC = () => {
  const [itemPriceUsd, setItemPriceUsd] = useState<number>(100);
  const [usTaxShippingUsd, setUsTaxShippingUsd] = useState<number>(15);
  const [intlShippingUsd, setIntlShippingUsd] = useState<number>(18);
  const [retailPriceUsd, setRetailPriceUsd] = useState<number>(195);
  const [selectedTariff, setSelectedTariff] = useState<'pay_as_you_go' | 'reserve'>('reserve');

  // Calculation Logic
  const baseUsd = itemPriceUsd + usTaxShippingUsd;
  
  // Rate: 35% for pay_as_you_go, 27% for reserve
  const feePercent = selectedTariff === 'pay_as_you_go' ? 0.35 : 0.27;
  const minFee = selectedTariff === 'pay_as_you_go' ? 25 : 15;
  
  const rawServiceFee = baseUsd * feePercent;
  const actualServiceFee = Math.max(rawServiceFee, minFee);

  const totalCostUsd = baseUsd + actualServiceFee + intlShippingUsd;
  const grossProfitUsd = retailPriceUsd - totalCostUsd;
  const marginPercent = retailPriceUsd > 0 ? (grossProfitUsd / retailPriceUsd) * 100 : 0;

  // Comparison savings with Reserve
  const payAsYouGoFee = Math.max(baseUsd * 0.35, 25);
  const reserveFee = Math.max(baseUsd * 0.27, 15);
  const reserveSavings = Math.max(0, payAsYouGoFee - reserveFee);

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Интерактивный калькулятор</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Примерный расчет юнит-экономики (USD)
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Настройте входные параметры, чтобы оценить расчетную чистую прибыль и сравнить выгоду от использования Закупочного резерва.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider font-mono border-b border-white/10 pb-2">
                1. Входные параметры сделки ($)
              </h3>

              {/* Tariff Selector */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-2">
                  Выбор тарифа
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/40 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedTariff('pay_as_you_go')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedTariff === 'pay_as_you_go'
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    По заказу (~35%, мин. $25)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTariff('reserve')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedTariff === 'reserve'
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Закупочный резерв (~27%, мин. $15)
                  </button>
                </div>
              </div>

              {/* Slider 1: Item Price in US */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-white/80 font-medium">Стоимость товара в США:</span>
                  <span className="font-mono text-emerald-400 font-bold">${itemPriceUsd}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={5}
                  value={itemPriceUsd}
                  onChange={(e) => setItemPriceUsd(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Slider 2: Tax & Domestic Shipping US */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-white/80 font-medium">Налог (Sales Tax) и доставка по США:</span>
                  <span className="font-mono text-emerald-400 font-bold">${usTaxShippingUsd}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={150}
                  step={1}
                  value={usTaxShippingUsd}
                  onChange={(e) => setUsTaxShippingUsd(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Slider 3: Intl Shipping (CDEK) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-white/80 font-medium">Ориентировочная международная доставка (CDEK):</span>
                  <span className="font-mono text-emerald-400 font-bold">${intlShippingUsd}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={1}
                  value={intlShippingUsd}
                  onChange={(e) => setIntlShippingUsd(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              {/* Slider 4: Retail Price for Customer */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-white/80 font-medium">Ваша розничная цена для покупателя:</span>
                  <span className="font-mono text-emerald-400 font-bold">${retailPriceUsd}</span>
                </div>
                <input
                  type="range"
                  min={itemPriceUsd + 20}
                  max={itemPriceUsd * 3}
                  step={5}
                  value={retailPriceUsd}
                  onChange={(e) => setRetailPriceUsd(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

            </div>

            {/* Output Display Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider font-mono border-b border-white/10 pb-2 mb-4">
                  2. Результат расчета (Демо)
                </h3>

                <div className="space-y-3 text-xs mb-6 font-mono">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/60">Расчетная база США:</span>
                    <span className="text-white font-bold">${baseUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/60">Комиссия USource Direct:</span>
                    <span className="text-blue-400 font-bold">${actualServiceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/60">Доставка CDEK:</span>
                    <span className="text-white font-bold">${intlShippingUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-white/80 font-bold">Итого себестоимость:</span>
                    <span className="text-white font-bold">${totalCostUsd.toFixed(2)}</span>
                  </div>
                </div>

                {/* Final Profit Display */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 mb-4 backdrop-blur-md">
                  <div className="text-[11px] text-white/60 uppercase font-mono mb-1">
                    Валовая прибыль селлера:
                  </div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono ${
                    grossProfitUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    ${grossProfitUsd.toFixed(2)}{' '}
                    <span className="text-sm font-normal text-white/70 font-sans">
                      ({marginPercent.toFixed(1)}% маржа)
                    </span>
                  </div>
                </div>

                {/* Tariff Savings Indicator */}
                {reserveSavings > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-[11px] text-emerald-300 font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Экономия с Закупочным резервом: <strong>+${reserveSavings.toFixed(2)}</strong> с каждого заказа!
                    </span>
                  </div>
                )}
              </div>

              {/* Warning Notice */}
              <div className="mt-6 pt-3 border-t border-white/10 text-[10px] text-white/40 leading-normal">
                <Info className="w-3.5 h-3.5 text-white/40 inline mr-1 -mt-0.5" />
                Расчет является предварительным и не учитывает возможные таможенные пошлины, спец-обработку, возвраты, страхование и индивидуальные валютные курсы.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
