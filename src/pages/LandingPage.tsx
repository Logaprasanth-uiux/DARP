import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  BarChart2, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Coins, 
  TrendingUp, 
  FileSearch,
  Lock
} from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TrustBadge } from '../components/ui/TrustBadge';

export const LandingPage: React.FC = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 hero-gradient min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 max-w-5xl mx-auto px-4 text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2">
          <Badge variant="cyan" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Autonomous Financial Recovery Platform
          </Badge>
        </div>

        {/* Outcome-Focused Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
          Discover Hidden Revenue.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400">
            Recover Blocked Cash Flow.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-normal">
          DARP analyzes your accounting ledgers, ERP records, and tax filings to uncover overpayments, unclaimed tax credits, and unbilled receivables — restoring capital straight to your bottom line.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="glow"
            size="lg"
            onClick={() => setStep('ai-welcome')}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start Free Analysis
          </Button>

          <span className="text-xs text-text-muted flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            No credit card • Free 2-minute assessment
          </span>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 max-w-2xl mx-auto">
          <TrustBadge type="all" />
        </div>
      </section>

      {/* Discover • Assess • Recover • Prevent Overview */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            The DARP Framework
          </h2>
          <p className="text-sm text-text-secondary max-w-lg mx-auto">
            A comprehensive 4-pillar methodology built specifically for financial recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Discover */}
          <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-cyan-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Pillar 1</span>
              <h3 className="text-lg font-bold text-text-primary">Discover</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Scan accounts payable registers to spot duplicate payments, missed supplier credits, and pricing variances.
            </p>
          </div>

          {/* Assess */}
          <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Pillar 2</span>
              <h3 className="text-lg font-bold text-text-primary">Assess</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Evaluate GSTR-2B filing mismatches, bank statement gaps, and unclaimed Input Tax Credits (ITC).
            </p>
          </div>

          {/* Recover */}
          <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Pillar 3</span>
              <h3 className="text-lg font-bold text-text-primary">Recover</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Generate vendor claim packages and actionable collection steps to claw back trapped liquidity fast.
            </p>
          </div>

          {/* Prevent */}
          <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-amber-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Pillar 4</span>
              <h3 className="text-lg font-bold text-text-primary">Prevent</h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Establish automated guardrails to eliminate systemic accounting leakage before invoices get paid.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-bg-secondary border border-border-strong space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Why Leading Finance Teams Choose DARP
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Designed for finance directors, controllers, and recovery specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-text-primary text-sm">Uncover Hidden Cash</h4>
                <p className="text-xs text-text-secondary mt-1">Identify unclaimed tax credits & overpaid vendor bills.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-text-primary text-sm">Fast Turnaround</h4>
                <p className="text-xs text-text-secondary mt-1">Get an actionable recovery report in minutes, not months.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileSearch className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-text-primary text-sm">Zero Data Retention</h4>
                <p className="text-xs text-text-secondary mt-1">Encrypted statelessly with automatic client data purging.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ready to inspect your financial ledgers securely?</span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setStep('ai-welcome')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Begin Free Recovery Analysis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
