import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface StickyMobileCTAProps {
  onCopyEmail: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onCopyEmail }) => {
  const mailtoDefault = `mailto:${EMAIL_ADDRESS}?subject=Хочу протестировать USource Direct`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#0a0a0b]/80 backdrop-blur-2xl border-t border-white/10 p-3 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center gap-2">
        <a
          href={mailtoDefault}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs sm:text-sm active:scale-[0.98] shadow-lg"
        >
          <Mail className="w-4 h-4 text-black" />
          <span>Написать нам</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onCopyEmail}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shrink-0"
          title="Скопировать e-mail"
          aria-label="Скопировать e-mail"
        >
          <Mail className="w-4 h-4 text-blue-400" />
        </button>
      </div>
    </div>
  );
};
