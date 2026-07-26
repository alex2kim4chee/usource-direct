import React, { useState } from 'react';
import { TIMELINE_STEPS } from '../data/landingData';
import { Clock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const EndToEndTimeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Полный прозрачный процесс</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            От идеи товара до доставки вашему клиенту
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Детализация каждого из 11 этапов операционного цикла в B2B-инфраструктуре USource Direct.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar scroll-smooth">
          {TIMELINE_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => setSelectedStep(s.step)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold shrink-0 transition-all border ${
                selectedStep === s.step
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
              }`}
            >
              Шаг {s.step}
            </button>
          ))}
        </div>

        {/* Selected Step Spotlight Banner */}
        {(() => {
          const activeStep = TIMELINE_STEPS.find((s) => s.step === selectedStep) || TIMELINE_STEPS[0];
          return (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                      {activeStep.badge}
                    </span>
                    <span className="text-xs text-white/50 font-mono">
                      Этап {activeStep.step} из 11
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Шаг {activeStep.step}. {activeStep.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl">
                    {activeStep.detail}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                  <button
                    disabled={selectedStep === 1}
                    onClick={() => setSelectedStep((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold border border-white/10"
                  >
                    Назад
                  </button>
                  <button
                    disabled={selectedStep === 11}
                    onClick={() => setSelectedStep((prev) => Math.min(11, prev + 1))}
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <span>Следующий шаг</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 11 Steps Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMELINE_STEPS.map((step) => {
            const isCurrent = step.step === selectedStep;
            return (
              <div
                key={step.step}
                onClick={() => setSelectedStep(step.step)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-white/15 border-white/30 shadow-xl ring-1 ring-white/30'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-blue-400">
                    0{step.step < 10 ? `0${step.step}` : step.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-white/60 border border-white/10">
                    {step.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  {step.shortDesc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
