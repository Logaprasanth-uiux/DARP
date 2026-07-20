import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { ThemeToggle } from '../ui/ThemeToggle';
import { AboutModal } from '../onboarding/AboutModal';
import { SecurityModal } from '../onboarding/SecurityModal';
import { ContactModal } from '../onboarding/ContactModal';

export const Navbar: React.FC = () => {
  const { currentStep, setStep, resetOnboarding } = useOnboarding();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<'about' | 'security' | 'contact' | null>(null);

  const handleStartAnalysis = () => {
    if (currentStep === 'landing') {
      setStep('ai-welcome');
    } else {
      setStep('analysis-focus');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-bg-glass/90 border-b border-border-subtle transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Product Identity */}
          <div 
            onClick={() => resetOnboarding()}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-bg-primary rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-lg tracking-wider">
                  D
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-text-primary group-hover:text-cyan-400 transition-colors">
                  DARP
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-widest hidden sm:inline-block">
                  AI Recovery
                </span>
              </div>
              <p className="text-[10px] text-text-muted hidden md:block font-medium tracking-wide">
                Discover • Assess • Recover • Prevent
              </p>
            </div>
          </div>

          {/* Desktop Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-text-secondary">
            <button
              onClick={() => setActiveModal('about')}
              className="hover:text-text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-bg-tertiary"
            >
              About
            </button>
            <button
              onClick={() => setActiveModal('security')}
              className="hover:text-text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-bg-tertiary"
            >
              Security & Privacy
            </button>
            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-bg-tertiary"
            >
              Contact Support
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {currentStep === 'landing' ? (
              <button
                onClick={handleStartAnalysis}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 border border-cyan-300/30 transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Free Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setStep('landing')}
                className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-bg-secondary border border-border-subtle transition-colors"
              >
                Back to Overview
              </button>
            )}
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary rounded-xl bg-bg-secondary border border-border-subtle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-bg-secondary border-b border-border-subtle space-y-3 animate-fade-in">
            <div className="flex flex-col space-y-2 text-sm font-medium text-text-secondary">
              <button
                onClick={() => { setActiveModal('about'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg hover:bg-bg-tertiary hover:text-text-primary"
              >
                About DARP
              </button>
              <button
                onClick={() => { setActiveModal('security'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg hover:bg-bg-tertiary hover:text-text-primary"
              >
                Security & Privacy
              </button>
              <button
                onClick={() => { setActiveModal('contact'); setMobileMenuOpen(false); }}
                className="text-left px-3 py-2 rounded-lg hover:bg-bg-tertiary hover:text-text-primary"
              >
                Contact Support
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleStartAnalysis}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Free Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Informational Modals */}
      <AboutModal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} />
      <SecurityModal isOpen={activeModal === 'security'} onClose={() => setActiveModal(null)} />
      <ContactModal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} />
    </>
  );
};
