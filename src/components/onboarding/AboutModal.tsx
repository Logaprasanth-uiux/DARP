import React from 'react';
import { X, Sparkles, Target, ShieldCheck, Zap } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel bg-bg-secondary border border-border-strong shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              D
            </div>
            <h3 className="text-lg font-bold text-text-primary">About DARP</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary font-semibold">DARP (Discover • Assess • Recover • Prevent)</strong> is an autonomous AI-powered Financial Recovery Platform engineered to help enterprises and SMBs uncover lost capital hidden within complex accounting ledgers, ERP filings, and tax registers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-bg-tertiary/60 border border-border-subtle flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary text-xs">Discover</h4>
                <p className="text-[11px] text-text-muted">Uncover vendor overpayments & unbilled receivables.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-bg-tertiary/60 border border-border-subtle flex items-start gap-2.5">
              <Target className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary text-xs">Assess</h4>
                <p className="text-[11px] text-text-muted">Analyze GSTR-2B mismatches and bank statements.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-bg-tertiary/60 border border-border-subtle flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary text-xs">Recover</h4>
                <p className="text-[11px] text-text-muted">Streamline recovery actions & credit note claims.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-bg-tertiary/60 border border-border-subtle flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary text-xs">Prevent</h4>
                <p className="text-[11px] text-text-muted">Establish guardrails against future duplicate leaks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
