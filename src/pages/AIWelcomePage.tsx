import React from 'react';
import { ArrowRight, Clock, ShieldCheck, FileCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { AIMessageBubble } from '../components/ui/AIMessageBubble';
import { Button } from '../components/ui/Button';

export const AIWelcomePage: React.FC = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* AI Message Header */}
      <AIMessageBubble
        title="DARP Financial Recovery Assistant"
        message="Welcome to DARP. I will guide you through a quick, 2-step setup to assess your financial documents and identify hidden recovery opportunities."
        subtitle="Our analysis is confidential, encrypted, and designed to provide immediate clarity on blocked revenue or filing discrepancies."
      />

      {/* Process Overview & Expectations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass-panel bg-bg-card border border-border-subtle flex flex-col justify-between space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">2 Minutes</h4>
            <p className="text-xs text-text-muted mt-0.5">Approximate setup time</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-bg-card border border-border-subtle flex flex-col justify-between space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Select Focus</h4>
            <p className="text-xs text-text-muted mt-0.5">Target specific payables or tax areas</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel bg-bg-card border border-border-subtle flex flex-col justify-between space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">100% Private</h4>
            <p className="text-xs text-text-muted mt-0.5">Bank-grade AES encryption</p>
          </div>
        </div>
      </div>

      {/* Assurance Callout */}
      <div className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle space-y-3">
        <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>How DARP Works</span>
        </h4>
        <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>You select the financial areas you want DARP to inspect (e.g. Payables, Receivables, GST).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>DARP displays only the relevant document slots needed for your chosen focus.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Upload ledgers, bank statements, or returns securely without complex questionnaires.</span>
          </li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle">
        <button
          onClick={() => setStep('landing')}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          ← Back to Overview
        </button>

        <Button
          variant="glow"
          size="lg"
          onClick={() => setStep('analysis-focus')}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          Begin Analysis Setup
        </Button>
      </div>
    </div>
  );
};
