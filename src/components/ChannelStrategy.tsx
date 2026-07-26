import React from 'react';
import { Store, Send, ShoppingBag, Globe, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ChannelStrategy: React.FC = () => {
  const channels = [
    { title: 'Telegram-каналы и Mini Apps', desc: 'Идеальный канал для эксклюзивных анонсов и прямых продаж целевой аудитории' },
    { title: 'Собственный интернет-магазин (D2C)', desc: 'Полный контроль оформления, коммуникации, клиентских данных и повторных покупок' },
    { title: 'Закрытые клубы и Сообщества', desc: 'Продажи по постоянной лояльной базе подписчиков под персональные запросы' },
    { title: 'Социальные сети & Блоги', desc: 'Прямые предзаказы через обзоры распаковок, рекомендации и сторис' },
    { title: 'Нишевые витрины VK & Маркетплейс D2C', desc: 'Каталоги товаров «под заказ из США» с четким описанием сроков' },
  ];

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Store className="w-3.5 h-3.5 text-blue-400" />
            <span>Стратегия каналов сбыта</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Где эффективно тестировать продажи
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Рекомендуемые точки контакта с вашей аудиторией для запуска предзаказов из США.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {channels.map((c, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white font-bold">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">{c.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Pre-Order Rule Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-950/40 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              Правило честного позиционирования сроков
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              <strong className="text-amber-300">Критически важно:</strong> Модель не предназначена для обещания экспресс-доставки с российского склада за 24 часа, если фактический товар выкупается в США. Канал продаж селлера должен прозрачно информировать покупателя о том, что товар поставляется в формате индивидуального заказа из США (ориентировочно 14–24 рабочих дня).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
