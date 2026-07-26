import React, { useState } from 'react';
import { Mail, Copy, ExternalLink, X, Shield, FileText } from 'lucide-react';
import { EMAIL_ADDRESS, DOMAIN_NAME } from '../data/landingData';

interface FooterProps {
  onCopyEmail: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCopyEmail }) => {
  const [legalModal, setLegalModal] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openLegalModal = (title: string, content: string) => {
    setLegalModal({ title, content });
  };

  return (
    <footer className="bg-[#0a0a0b] text-white/60 border-t border-white/10 pt-16 pb-24 lg:pb-12 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-white text-base backdrop-blur-md">
                U<span className="text-blue-300">→</span>D
              </div>
              <span className="font-bold text-lg text-white">USource Direct</span>
            </div>

            <p className="text-white/60 leading-relaxed text-xs max-w-sm">
              Закупочная инфраструктура в США для российских продавцов. Вы выбираете товары для своей аудитории — мы проверяем, выкупаем и организуем прямую доставку.
            </p>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-white/40">Домен:</span>
              <span className="text-blue-300 font-bold">{DOMAIN_NAME}</span>
            </div>
          </div>

          {/* Contact & Mail (3 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Прямая связь для селлеров
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-[10px] text-white/40 mb-1">E-mail партнерского отдела:</div>
              <div className="font-mono font-bold text-white text-sm mb-2">{EMAIL_ADDRESS}</div>
              <div className="flex gap-2">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="py-1.5 px-3 rounded-xl bg-white text-black font-semibold text-xs transition-all inline-flex items-center gap-1 hover:bg-white/90"
                >
                  <Mail className="w-3 h-3 text-black" />
                  <span>Написать</span>
                </a>
                <button
                  onClick={onCopyEmail}
                  className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all inline-flex items-center gap-1 backdrop-blur-md"
                >
                  <Copy className="w-3 h-3 text-blue-400" />
                  <span>Скопировать</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Правовая информация
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() =>
                    openLegalModal(
                      'Политика конфиденциальности',
                      'Настоящий сайт носит информационный характер. Мы не собираем персональные данные через формы на сайте. Все обращения направляются пользователем добровольно на адрес электронной почты go@usourcedirect.com.'
                    )
                  }
                  className="hover:text-white transition-colors text-left text-white/60"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    openLegalModal(
                      'Условия пилотной программы',
                      'Пилотная программа предназначена для исследования спроса и первоначальной отработки B2B-модели. Вступление в пилот не гарантирует автоматическое утверждение всех позиций и осуществляется по индивидуальному согласованию.'
                    )
                  }
                  className="hover:text-white transition-colors text-left text-white/60"
                >
                  Условия пилотной программы
                </button>
              </li>
              <li>
                <a href="#trust" className="hover:text-white transition-colors text-white/60">
                  Ограничения по товарам
                </a>
              </li>
              <li>
                <button
                  onClick={() =>
                    openLegalModal(
                      'Правовая информация',
                      'USource Direct работает как B2B-инфраструктурный агент и координатор закупок. Компания не является банком, инвестиционным фондом или платежной системой.'
                    )
                  }
                  className="hover:text-white transition-colors text-left text-white/60"
                >
                  Правовой статус
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* B2B Legal Disclaimer */}
        <div className="pt-8 text-[11px] text-white/40 leading-relaxed max-w-4xl">
          <p className="mb-2">
            <strong className="text-white/60">Правовая оферта:</strong> Информация, представленная на сайте usourcedirect.com, носит предварительный информационно-аналитический характер и не является публичной офертой (ст. 437 ГК РФ). Возможность сотрудничества, окончательные тарифные ставки, коммерческие условия, маршрут расчетов и параметры логистики определяются индивидуально по итогам проверки товаров и заключения B2B-соглашения.
          </p>
          <p>
            USource Direct не оказывает банковские, инвестиционные, страховые, брокерские или юридические услуги.
          </p>
        </div>

      </div>

      {/* Legal Modal Drawer */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#0a0a0b]/90 border border-white/20 rounded-3xl p-6 max-w-lg w-full text-white relative shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="font-bold text-base text-white">{legalModal.title}</h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
              {legalModal.content}
            </p>
            <div className="text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-white/90 shadow-md"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
