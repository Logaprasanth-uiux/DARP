import React, { useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { SecurityModal } from '../onboarding/SecurityModal';
import { ContactModal } from '../onboarding/ContactModal';

export const Footer: React.FC = () => {
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-bg-secondary/60 border-t border-border-subtle py-8 px-4 sm:px-6 lg:px-8 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-muted">
          {/* Tagline & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-text-secondary">DARP Financial Recovery Platform</span>
            <span className="hidden sm:inline text-border-strong">•</span>
            <span>Discover • Assess • Recover • Prevent</span>
          </div>

          {/* Security Badges & Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setSecurityModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>256-Bit SSL Encrypted</span>
            </button>
            <span className="text-border-strong">•</span>
            <button
              onClick={() => setSecurityModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOC2 Type II Compliant</span>
            </button>
            <span className="text-border-strong">•</span>
            <button
              onClick={() => setContactModalOpen(true)}
              className="hover:text-text-primary transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </footer>

      <SecurityModal isOpen={securityModalOpen} onClose={() => setSecurityModalOpen(false)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
};
