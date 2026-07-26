import React from 'react';
import { BENEFITS } from '../data/landingData';
import {
  PackageCheck,
  Coins,
  Store,
  Globe,
  ShieldCheck,
  Zap,
  Calculator,
  Truck,
  Layers,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export const BenefitsGrid: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-blue-400" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-blue-400" />;
      case 'Store':
        return <Store className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-400" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-blue-400" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="benefits" className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Ценность для селлера</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Что получает селлер
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Ключевые преимущества использования B2B-инфраструктуры USource Direct для защиты собственного капитала и развития каналов продаж.
          </p>
        </div>

        {/* 10 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={benefit.id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(benefit.iconName)}
                </div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-white/40">
                Преимущество #0{idx + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
