import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2, Send, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface EmailInstructionsProps {
  onCopyEmail: () => void;
}

export const EmailInstructions: React.FC = ({ onCopyEmail }) => {
  const [projectName, setProjectName] = useState('');
  const [salesChannel, setSalesChannel] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const subjectText = `Пилот USource Direct — ${projectName || '[название вашего проекта]'}`;

  const emailBodyDraft = `Здравствуйте, команда USource Direct!

Хочу обсудить участие в пилотной программе.

1. Мое имя и проект: ${projectName || '[имя и название проекта]'}
2. Канал продаж: ${salesChannel || '[ссылка на Telegram-канал / магазин]'}
3. Интересующие товары / категории из США: ${productCategory || '[категории и бренды]'}
4. Ожидаемый объём: [примерное кол-во заказов в месяц]
5. Предпочтительный тариф: [По заказу / Закупочный резерв]

Буду рад рассчитать первые товары и обсудить условия.`;

  const mailtoGenerated = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    subjectText
  )}&body=${encodeURIComponent(emailBodyDraft)}`;

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Прямой канал связи</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Что написать в первом письме
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Мы собираем заявки исключительно через e-mail, чтобы сразу погрузиться в контекст вашего бизнеса без шаблонных форм.
          </p>
        </div>

        {/* Email Guidance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Checklist (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span>Чек-лист для заявки</span>
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-white/80 mb-6">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Ваше имя и название проекта</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Где вы продаете (ссылка на канал, сайт, VK)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Размер аудитории и особенности ниши</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Ссылки на интересующие товары или бренды США</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Примерная розничная цена и маржинальность</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Предпочтительный тариф («По заказу» / «Закупочный резерв»)</span>
              </li>
            </ul>

            {/* Direct Email Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-[10px] text-white/40 uppercase font-mono mb-1">
                E-mail для партнерских заявок:
              </div>
              <div className="text-lg font-bold font-mono text-blue-300 mb-3 select-all">
                {EMAIL_ADDRESS}
              </div>
              <div className="flex gap-2">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-white text-black hover:bg-white/90 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-black" />
                  <span>Написать</span>
                </a>
                <button
                  onClick={onCopyEmail}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5 backdrop-blur-md"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-400" />
                  <span>Скопировать</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Interactive Email Constructor Draft (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold text-white uppercase">
                  Конструктор вашего обращения
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40">Предпросмотр письма</span>
            </div>

            {/* Inputs to customize draft */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">
                  Название проекта
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Например: ZenShop"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">
                  Канал продаж
                </label>
                <input
                  type="text"
                  value={salesChannel}
                  onChange={(e) => setSalesChannel(e.target.value)}
                  placeholder="t.me/zenshop_ru"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/60 mb-1">
                  Категория товара
                </label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="Товары для хобби"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Generated Subject */}
            <div className="mb-3 p-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
              <span className="text-white/40">Тема: </span>
              <span className="text-blue-300 font-bold">{subjectText}</span>
            </div>

            {/* Textarea Preview */}
            <div className="mb-6">
              <textarea
                readOnly
                rows={8}
                value={emailBodyDraft}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs font-mono text-white/80 focus:outline-none resize-none"
              />
            </div>

            {/* CTA to send prepared mail */}
            <a
              href={mailtoGenerated}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 shadow-2xl transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Открыть почтовый клиент с готовым черновиком</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
