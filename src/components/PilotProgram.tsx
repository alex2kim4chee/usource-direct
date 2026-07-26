import React from 'react';
import { Users, Mail, CheckCircle2, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface PilotProgramProps {
  onCopyEmail: () => void;
}

export const PilotProgram: React.FC<PilotProgramProps> = ({ onCopyEmail }) => {
  const mailtoPilot = `mailto:${EMAIL_ADDRESS}?subject=Хочу участвовать в пилоте USource Direct`;

  const benefits = [
    'Прямой контакт с фаундерами проекта',
    'Индивидуальный разбор и калькуляция юнит-экономики',
    'Влияние на приоритеты разработки личного кабинета',
    'Приоритетный онбординг первых заказов',
    'Прозрачные пилотные комиссии и условия',
    'Ранний доступ к SaaS-панели селлера',
    'Без обязательства покупать оптовые партии',
  ];

  const expectations = [
    'Наличие действующей аудитории или канала продаж',
    'Понимание своей ниши и потребностей клиентов',
    'Готовность предметно обсудить категории товаров',
    'Адекватная оценка сроков международной доставки',
    'Готовность предоставлять обратную связь',
    'Легальный и прозрачный характер бизнеса',
  ];

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Исследование спроса и пилот</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ищем первых пилотных партнеров
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Сейчас мы проводим исследование спроса и собираем ограниченную группу селлеров, готовых вместе с нами проверить модель на реальных товарах и заказах.
          </p>
        </div>

        {/* Benefits vs Expectations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Pilot Benefits */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Что получают участники пилота</h3>
                <p className="text-xs text-blue-300 font-mono">Эксклюзивные условия раннего доступа</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              {benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pilot Expectations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Чего мы ждем от партнера</h3>
                <p className="text-xs text-white/40 font-mono">Критерии отбора проектов</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-white/80">
              {expectations.map((e, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Action Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 max-w-3xl mx-auto text-center shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-2">
            Готовы стать пилотным партнером?
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mb-6 max-w-xl mx-auto">
            Напишите, что вы продаете, где находится ваша аудитория и какие товары из США вы хотели бы протестировать.
          </p>

          <a
            href={mailtoPilot}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm sm:text-base hover:bg-white/90 shadow-2xl transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5" />
            <span>Предложить свою нишу и товары</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
