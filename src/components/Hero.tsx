import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2, Truck, DollarSign, Store, Copy, RefreshCw } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface HeroProps {
  onCopyEmail: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopyEmail }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'card'>('flow');
  const [simulatedStep, setSimulatedStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedStep((prev) => (prev % 4) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const offerMailto = `mailto:${EMAIL_ADDRESS}?subject=Хочу предложить товары для проверки`;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0a0a0b]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Qualification Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-white/80 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="uppercase tracking-widest text-[11px] font-semibold">B2B Sourcing Infrastructure</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Продавайте товары из США <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-red-400">
                без закупки партий
              </span>{' '}
              и риска заморозки
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-white/60 font-normal leading-relaxed mb-6 max-w-2xl">
              Вы выбираете товары для своей аудитории. USource Direct проверяет их, организует выкуп в США и отправляет напрямую вашему клиенту в Россию.
            </p>

            {/* Qualification Subtitle */}
            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/70 mb-8 max-w-2xl flex items-center gap-3">
              <Store className="w-4 h-4 text-white/80 shrink-0" />
              <span>
                <strong className="text-white">Для кого:</strong> селлеры маркетплейсов, нишевые интернет-магазины, Telegram-каналы и предприниматели со своей аудиторией.
              </span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <a
                href={offerMailto}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black font-bold text-sm sm:text-base rounded-xl hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/10"
              >
                <Mail className="w-5 h-5 text-black" />
                <span>Предложить товары</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm rounded-xl transition-all"
              >
                <span>Схема работы</span>
              </a>

              <button
                onClick={onCopyEmail}
                className="flex items-center justify-center gap-2 px-4 py-4 bg-white/5 border border-white/10 text-white/70 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Скопировать e-mail"
              >
                <Copy className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">go@usourcedirect.com</span>
              </button>
            </div>

            {/* Trust Line Under CTA */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-white/60 max-w-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="leading-normal">
                <strong className="text-white">Гарантия прозрачности:</strong> Без обязательной закупки партии и хранения на нашем складе. Оплата только после реального заказа или через Закупочный резерв.
              </p>
            </div>

          </div>

          {/* Right Column: Visual Interactive Supply Chain Dashboard */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
              
              {/* Header of Dashboard Mockup */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    Кабинет селлера
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono text-white/70 border border-white/10">
                  <RefreshCw className="w-3 h-3 text-blue-400 animate-spin" />
                  <span>CDEK / US Hub Live</span>
                </div>
              </div>

              {/* Status Simulation Controls */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/40 mb-5 border border-white/10 text-[11px] font-medium text-center">
                <button
                  onClick={() => setSimulatedStep(1)}
                  className={`py-1.5 rounded-lg transition-colors ${
                    simulatedStep === 1
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  1. Оплата
                </button>
                <button
                  onClick={() => setSimulatedStep(2)}
                  className={`py-1.5 rounded-lg transition-colors ${
                    simulatedStep === 2
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  2. Проверка
                </button>
                <button
                  onClick={() => setSimulatedStep(3)}
                  className={`py-1.5 rounded-lg transition-colors ${
                    simulatedStep === 3
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  3. Выкуп
                </button>
                <button
                  onClick={() => setSimulatedStep(4)}
                  className={`py-1.5 rounded-lg transition-colors ${
                    simulatedStep === 4
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  4. CDEK
                </button>
              </div>

              {/* Active Order Card Simulation */}
              <div className="space-y-4">
                
                {/* Product Abstract Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-mono text-blue-300 text-xs font-bold shrink-0">
                      SKU
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40">SKU: #88219-US • Telegram Store</div>
                      <div className="text-xs sm:text-sm font-semibold text-white">Премиальный девайс / Хобби</div>
                      <div className="text-[10px] text-white/50">NJ Hub, USA</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold font-mono text-emerald-400">$142.00</div>
                    <div className="text-[10px] text-white/40">Розничная: $210</div>
                  </div>
                </div>

                {/* Supply Chain Steps Visualization */}
                <div className="space-y-2">
                  
                  {/* Step 1 Node */}
                  <div className={`p-3 rounded-xl border transition-all ${
                    simulatedStep >= 1
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-black/20 border-white/5 text-white/40 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                        <span>1. Оплата клиентом селлера</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Подтверждено</span>
                    </div>
                    <p className="text-[10px] text-white/50 pl-5">
                      Покупатель оплатил заказ в вашем магазине.
                    </p>
                  </div>

                  {/* Step 2 Node */}
                  <div className={`p-3 rounded-xl border transition-all ${
                    simulatedStep >= 2
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-black/20 border-white/5 text-white/40 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>2. Комплаенс-валидация США</span>
                      </div>
                      <span className="text-[10px] font-mono text-blue-400">
                        {simulatedStep >= 2 ? 'Compliant' : 'Ожидание'}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 pl-5">
                      Проверка экспортного кода (ECCN) и продавца.
                    </p>
                  </div>

                  {/* Step 3 Node */}
                  <div className={`p-3 rounded-xl border transition-all ${
                    simulatedStep >= 3
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-black/20 border-white/5 text-white/40 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>3. Выкуп в США & NJ Hub</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {simulatedStep >= 3 ? 'Закуплен в NJ' : 'Ожидание'}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 pl-5">
                      Оплачен корп-картой US и принят в Нью-Джерси.
                    </p>
                  </div>

                  {/* Step 4 Node */}
                  <div className={`p-3 rounded-xl border transition-all ${
                    simulatedStep >= 4
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-black/20 border-white/5 text-white/40 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <div className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-amber-400" />
                        <span>4. Прямая доставка CDEK</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300">
                        {simulatedStep >= 4 ? 'Трек: CDEK-882194' : 'Ожидание'}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 pl-5">
                      Передан в курьерскую доставку до покупателя в РФ.
                    </p>
                  </div>

                </div>

                {/* Bottom Stats Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-mono">
                  <div>
                    Маржа: <span className="text-emerald-400 font-bold">$68.00 (32%)</span>
                  </div>
                  <div>
                    Складской остаток: <span className="text-blue-400 font-bold">$0.00</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
