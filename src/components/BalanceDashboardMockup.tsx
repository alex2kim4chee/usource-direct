import React, { useState } from 'react';
import { Wallet, ShieldCheck, ArrowDownRight, ArrowUpRight, Download, FileText, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

export const BalanceDashboardMockup: React.FC = () => {
  const [selectedTx, setSelectedTx] = useState<string | null>('tx-1');

  const mockTransactions = [
    {
      id: 'tx-1',
      date: '2026-07-25 14:20',
      type: 'hold',
      orderId: '#USD-9428',
      desc: 'Зарезервировано под выкуп SKU-4891 (Поставщик NJ)',
      amount: '-$142.00',
      fee: '-$38.34',
      cdekEstimate: '-$18.00',
      status: 'Зарезервировано',
      badgeClass: 'bg-amber-950 text-amber-300 border-amber-800',
    },
    {
      id: 'tx-2',
      date: '2026-07-24 11:05',
      type: 'charge',
      orderId: '#USD-9410',
      desc: 'Выкуплен и передан в CDEK (Трек: 88219412)',
      amount: '-$210.00',
      fee: '-$56.70',
      cdekEstimate: '-$24.50',
      status: 'Списано / В пути',
      badgeClass: 'bg-blue-950 text-blue-300 border-blue-800',
    },
    {
      id: 'tx-3',
      date: '2026-07-20 09:00',
      type: 'deposit',
      orderId: '—',
      desc: 'Пополнение Закупочного резерва по B2B-договору #481-B',
      amount: '+$5,000.00',
      fee: '$0.00',
      cdekEstimate: '$0.00',
      status: 'Зачислено',
      badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0b] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4 backdrop-blur-md">
            <Wallet className="w-3.5 h-3.5 text-blue-400" />
            <span>Прозрачность финансов</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Баланс, который можно проверить
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Демонстрация интерфейса Закупочного резерва селлера: каждый цент привязан к конкретному выкупу, трек-номеру CDEK и электронному чеку.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-5xl mx-auto mb-12">
          
          {/* Top Balance Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase font-mono">Внесено:</div>
              <div className="text-sm sm:text-base font-bold text-white font-mono">$5,000.00</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20">
              <div className="text-[10px] text-emerald-300 uppercase font-mono">Доступно:</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">$2,340.00</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/40">
              <div className="text-[10px] text-amber-300 uppercase font-mono">Зарезервировано:</div>
              <div className="text-sm sm:text-base font-bold text-amber-300 font-mono">$1,810.00</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase font-mono">Списано:</div>
              <div className="text-sm sm:text-base font-bold text-white/80 font-mono">$850.00</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase font-mono">Возвраты:</div>
              <div className="text-sm sm:text-base font-bold text-white/60 font-mono">$0.00</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] text-indigo-300 uppercase font-mono">Бонусы:</div>
              <div className="text-sm sm:text-base font-bold text-indigo-300 font-mono">$150.00</div>
            </div>
          </div>

          {/* Transactions Table Preview */}
          <div className="rounded-2xl border border-white/10 overflow-hidden mb-6 bg-black/40">
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-white/80">
              <span>Журнал операций (Детализация резерва)</span>
              <button
                onClick={() => alert('Демо-выписка за период сгенерирована!')}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать PDF выписку</span>
              </button>
            </div>

            <div className="divide-y divide-white/10 text-xs">
              {mockTransactions.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx.id)}
                  className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                    selectedTx === tx.id ? 'bg-white/15' : 'bg-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      tx.type === 'deposit'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-white/10 text-blue-400 border-white/20'
                    }`}>
                      {tx.type === 'deposit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono">{tx.orderId}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${tx.badgeClass}`}>
                          {tx.status}
                        </span>
                      </div>
                      <div className="text-white/60 text-xs">{tx.desc}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                      {tx.amount}
                    </div>
                    <div className="text-[10px] text-white/40">{tx.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Reserve Statement Banner */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed flex items-center gap-3 backdrop-blur-md">
            <Lock className="w-5 h-5 text-blue-400 shrink-0" />
            <p>
              <strong className="text-white">Правовой статус резерва:</strong> Закупочный резерв — это целевой B2B-аванс на исполнение будущих заказов селлера, а не банковский вклад, счет до востребования и не инвестиционный инструмент. USource Direct не оказывает банковских или финансово-кредитных услуг.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
