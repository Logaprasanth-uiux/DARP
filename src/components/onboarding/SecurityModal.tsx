import React from 'react';
import { X, ShieldCheck, Lock, Key, FileLock, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel bg-bg-secondary border border-border-strong shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Enterprise Security & Privacy</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
          <p>
            DARP places financial security and confidentiality at the core of our platform. Every document uploaded undergoes client-side encryption prior to processing.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">256-Bit AES TLS 1.3 Encryption</h4>
                <p className="text-xs text-text-muted">All documents are encrypted in transit and at rest using industry-leading cryptographic standards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
              <Key className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">Zero Third-Party Training</h4>
                <p className="text-xs text-text-muted">Your financial ledgers are NEVER used to train public language models or shared with external parties.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-tertiary/50 border border-border-subtle">
              <FileLock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-text-primary">Automated Data Purge Options</h4>
                <p className="text-xs text-text-muted">Documents are processed statelessly with automatic purge policies once recovery assessment concludes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>SOC2 Type II Certified Pipeline</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
