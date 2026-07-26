import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarketProblems } from './components/MarketProblems';
import { ModelComparison } from './components/ModelComparison';
import { ProductPipeline } from './components/ProductPipeline';
import { EndToEndTimeline } from './components/EndToEndTimeline';
import { BenefitsGrid } from './components/BenefitsGrid';
import { Pricing } from './components/Pricing';
import { CostBreakdown } from './components/CostBreakdown';
import { EconomicsCalculator } from './components/EconomicsCalculator';
import { BalanceDashboardMockup } from './components/BalanceDashboardMockup';
import { TrustFramework } from './components/TrustFramework';
import { ProductEligibility } from './components/ProductEligibility';
import { ChannelStrategy } from './components/ChannelStrategy';
import { GrowthRoadmap } from './components/GrowthRoadmap';
import { PilotProgram } from './components/PilotProgram';
import { EmailInstructions } from './components/EmailInstructions';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { SeoJsonLd } from './components/SeoJsonLd';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Toast } from './components/Toast';
import { EMAIL_ADDRESS } from './data/landingData';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(EMAIL_ADDRESS)
        .then(() => {
          setToastMessage('E-mail скопирован');
          setTimeout(() => setToastMessage(null), 3000);
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = EMAIL_ADDRESS;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setToastMessage('E-mail скопирован');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      setToastMessage('Ошибка копирования');
      setTimeout(() => setToastMessage(null), 3000);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col font-['Golos_Text',sans-serif] selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      <SeoJsonLd />

      {/* Mesh Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[20%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Header */}
      <Header onCopyEmail={handleCopyEmail} />

      {/* Main Page Sections */}
      <main className="flex-1 relative z-10">
        <Hero onCopyEmail={handleCopyEmail} />
        <MarketProblems />
        <ModelComparison />
        <ProductPipeline />
        <EndToEndTimeline />
        <BenefitsGrid />
        <Pricing onCopyEmail={handleCopyEmail} />
        <CostBreakdown />
        <EconomicsCalculator />
        <BalanceDashboardMockup />
        <TrustFramework />
        <ProductEligibility />
        <ChannelStrategy />
        <GrowthRoadmap />
        <PilotProgram onCopyEmail={handleCopyEmail} />
        <EmailInstructions onCopyEmail={handleCopyEmail} />
        <FAQ />
        <FinalCTA onCopyEmail={handleCopyEmail} />
      </main>

      {/* Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Mobile Sticky Action Bar */}
      <StickyMobileCTA onCopyEmail={handleCopyEmail} />

      {/* Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
