import React, { useState } from 'react';
import { XCircle, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const ModelComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'old' | 'usource'>('both');

  const oldSteps = [
    'Найти подходящий товар у производителя или оптовика',
    'Сформировать и согласовать минимальную оптовую партию',
    'Оплатить производство или полную закупку товара заранее',
    'Оплатить международную карго-доставку и растаможку',
    'Завезти товар в страну и принять на локальный склад',
    'Разместить товар на складе маркетплейса или арендном складе',
    'Запустить платную рекламу и выкупы для продвижения',
    'Надеяться, что товар будет раскупаться по расчетной цене',
    'Оплачивать неликвидное хранение, комиссию и обратную логистику',
    'Заморозить капитал на 2–6 месяцев с риском уценки',
  ];

  const usourceSteps = [
    'Выбрать оригинальный товар в США под свою аудиторию',
    'Отправить ссылку в USource Direct на бесплатную проверку',
    'Получить точную юнит-экономику, доставку и статус допуска',
    'Разместить предложение в своем магазине, Telegram или каталоге',
    'Получить 100% предоплату от реального покупателя',
    'Передать оплаченный заказ в работу через USource Direct',
    'Мы моментально выкупаем конкретный товар у поставщика в США',
    'Отправляем посылку напрямую клиенту через курьерскую службу CDEK',
    'Вы отслеживаете статус выкупа и трекинг в одном кабинете',
    'Нет партии — нет залежавшегося остатка и замороженных денег',
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Сравнение операционных моделей</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Обычная модель против USource Direct
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Посмотрите, как меняется цепочка создания ценности, когда вы переходите от предзакупки оптовых партий к модели финансирования от реального спроса.
          </p>

          {/* Central Highlight Banner */}
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-base sm:text-lg shadow-xl backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
            <span>Главный принцип: Сначала спрос. Потом закупка.</span>
          </div>
        </div>

        {/* Filter Toggle for Mobile */}
        <div className="flex justify-center mb-8 lg:hidden">
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/70">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'both' ? 'bg-white text-black font-bold' : 'hover:text-white'
              }`}
            >
              Сравнение
            </button>
            <button
              onClick={() => setActiveTab('old')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'old' ? 'bg-white/20 text-rose-300 font-bold' : 'hover:text-white'
              }`}
            >
              Обычная модель
            </button>
            <button
              onClick={() => setActiveTab('usource')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'usource' ? 'bg-white text-black font-bold' : 'hover:text-white'
              }`}
            >
              USource Direct
            </button>
          </div>
        </div>

        {/* Side-by-side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Old Model Card */}
          {(activeTab === 'both' || activeTab === 'old') && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/50 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Обычная модель</h3>
                      <p className="text-xs text-rose-400 font-mono">Классический импорт / опт</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/40 font-mono">
                    Высокий риск
                  </span>
                </div>

                <div className="space-y-3">
                  {oldSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5 text-xs sm:text-sm text-white/50">
                      <span className="font-mono text-xs text-rose-400/80 font-bold shrink-0 mt-0.5">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-rose-400/90 text-center">
                ❌ Итог: Замороженный капитал и постоянный риск неликвида
              </div>
            </div>
          )}

          {/* USource Direct Card */}
          {(activeTab === 'both' || activeTab === 'usource') && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 relative shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shrink-0 shadow-md">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Модель USource Direct</h3>
                      <p className="text-xs text-blue-300 font-mono">B2B Sourcing on Demand</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white text-black font-mono font-bold">
                    Капиталоэффективно
                  </span>
                </div>

                <div className="space-y-3">
                  {usourceSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white">
                      <span className="font-mono text-xs text-blue-400 font-bold shrink-0 mt-0.5">
                        {idx + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-emerald-400 font-bold text-center">
                ✓ Итог: Гибкое расширение ассортимента без закупки партии
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
