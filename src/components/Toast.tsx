import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-white/70 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 px-4 py-3 text-black shadow-[0_18px_60px_rgba(56,189,248,0.45)] ring-4 ring-cyan-300/25 animate-bounce-short sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg">
        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
      </div>
      <span className="text-base font-extrabold">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto rounded-full p-1 text-black/60 transition-colors hover:bg-black/10 hover:text-black"
        aria-label="Закрыть"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
