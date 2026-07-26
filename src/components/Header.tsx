import React, { useState, useEffect } from 'react';
import { Menu, X, Copy, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { EMAIL_ADDRESS } from '../data/landingData';

interface HeaderProps {
  onCopyEmail: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCopyEmail }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Как это работает', href: '#how-it-works' },
    { name: 'Преимущества', href: '#benefits' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Безопасность', href: '#trust' },
    { name: 'Развитие', href: '#roadmap' },
    { name: 'Вопросы', href: '#faq' },
  ];

  const pilotMailto = `mailto:${EMAIL_ADDRESS}?subject=Хочу стать пилотным партнером USource Direct`;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-red-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-white/5 border-b border-white/10 shadow-2xl py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded text-sm shadow-md group-hover:scale-105 transition-transform">
                U
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-white/80 transition-colors">
                  USource Direct
                </span>
                <span className="text-[9px] text-white/50 font-medium tracking-wider uppercase">
                  US B2B Sourcing
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors py-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={onCopyEmail}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                title="Скопировать e-mail"
              >
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                <span>{EMAIL_ADDRESS}</span>
              </button>

              <a
                href={pilotMailto}
                className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-black bg-white hover:bg-white/90 rounded-full shadow-lg transition-all"
              >
                <span>Стать пилотным партнером</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onCopyEmail}
                className="p-2 text-white/80 hover:text-white bg-white/5 rounded-xl border border-white/10"
                title="Скопировать e-mail"
              >
                <Copy className="w-4 h-4 text-blue-400" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white bg-white/5 rounded-xl border border-white/10"
                aria-label="Переключить меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0a0a0b]/95 backdrop-blur-2xl lg:hidden pt-24 px-6 pb-10 flex flex-col justify-between border-b border-white/10">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Навигация по сайту
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white py-2 border-b border-white/10 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-white/40" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/50 mb-1">
              <span>Прямой e-mail:</span>
              <button
                onClick={onCopyEmail}
                className="text-blue-400 font-mono underline hover:text-blue-300"
              >
                Скопировать
              </button>
            </div>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 text-white font-mono text-sm border border-white/10"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{EMAIL_ADDRESS}</span>
            </a>

            <a
              href={pilotMailto}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-white text-black font-semibold text-sm shadow-lg"
            >
              <span>Стать пилотным партнером</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
