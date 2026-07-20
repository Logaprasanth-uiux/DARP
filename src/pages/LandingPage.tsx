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
  Lock,
  ChevronRight,
  Shield,
  EyeOff,
  Cpu
} from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { TrustBadge } from '../components/ui/TrustBadge';

export const LandingPage: React.FC = () => {
  const { setStep } = useOnboarding();

  return (
    <div className="space-y-20 sm:space-y-28 pb-16 hero-gradient min-h-[calc(100vh-80px)]">
      {/* 1. Hero Section */}
      <section className="relative pt-10 sm:pt-20 max-w-5xl mx-auto px-4 text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center gap-2">
          <Badge variant="cyan" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            AI-Powered Financial Recovery Platform
          </Badge>
        </div>

        {/* Outcome-Focused Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15] max-w-4xl mx-auto">
          Turn Hidden Financial Leakage Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Recovered Working Capital.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-normal">
          DARP autonomously inspects accounts payable ledgers, customer receivables, and tax filings to pinpoint overpayments, unclaimed tax credits, and uncollected revenue — restoring capital straight to your balance sheet.
        </p>

        {/* Primary CTA & Trust Note */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="glow"
            size="lg"
            onClick={() => setStep('ai-welcome')}
            icon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto min-w-[220px]"
          >
            Start Free Analysis
          </Button>

          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Free 2-minute assessment • No credit card required</span>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 max-w-3xl mx-auto">
          <TrustBadge type="all" />
        </div>
      </section>

      {/* 2. DARP Story — Customer Recovery Journey */}
      <section className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="indigo" size="sm">The Recovery Journey</Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
            How DARP Restores Your Capital
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            From initial ledger inspection to continuous protection, experience a guided AI recovery lifecycle.
          </p>
        </div>

        {/* 4 Connected Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Journey Stage 1: Discover */}
          <div className="relative p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-cyan-500/40 transition-all space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                01 • DISCOVER
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text-primary">Uncover Leakage</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Scan vendor payables and sales registers to detect duplicate payments, unapplied credit notes, and pricing variances.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-cyan-400 gap-1">
              <span>Deep Ledger Audit</span>
              <ChevronRight className="w-4 h-4 hidden lg:block text-text-muted" />
            </div>
          </div>

          {/* Journey Stage 2: Assess */}
          <div className="relative p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-indigo-500/40 transition-all space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                02 • ASSESS
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <BarChart2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text-primary">Quantify Impact</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Evaluate GSTR-2B mismatches, unclaimed Input Tax Credits (ITC), and bank statement reconciliation gaps.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-indigo-400 gap-1">
              <span>Compliance Matching</span>
              <ChevronRight className="w-4 h-4 hidden lg:block text-text-muted" />
            </div>
          </div>

          {/* Journey Stage 3: Recover */}
          <div className="relative p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-emerald-500/40 transition-all space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                03 • RECOVER
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text-primary">Claw Back Cash</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Generate structured vendor claim packages, tax adjustment filings, and actionable recovery steps.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-emerald-400 gap-1">
              <span>Immediate Liquidity</span>
              <ChevronRight className="w-4 h-4 hidden lg:block text-text-muted" />
            </div>
          </div>

          {/* Journey Stage 4: Prevent (Future Vision) */}
          <div className="relative p-6 rounded-2xl glass-panel bg-bg-card/70 border border-amber-500/30 hover:border-amber-500/60 transition-all space-y-4 group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                Future Vision
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text-primary">Prevent Leakage</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Future automated guardrails to detect and block financial errors at the source before disbursements occur.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-amber-400 gap-1">
              <span>Continuous Defense</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Value Proposition Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="cyan" size="sm">Value Delivered</Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Designed for Modern Finance Leaders
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto">
            Empowering CFOs, Controllers, and Audit Teams with automated financial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-cyan-500/30 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-primary">Capital Restoration</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Identify forgotten credit memos, unbilled customer deliveries, and overbilled vendor invoices to reclaim lost gross margin.
            </p>
          </div>

          <div className="p-7 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-indigo-500/30 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-primary">Tax & Compliance Matching</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Seamlessly cross-verify purchase registers against GSTR-2B filings to capture every eligible Input Tax Credit before deadlines.
            </p>
          </div>

          <div className="p-7 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-emerald-500/30 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-text-primary">Stateless AI Audit</h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Upload standard accounting exports safely. DARP processes files statelessly with 256-bit client-side encryption.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Trust & Security Showcase */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-bg-secondary border border-border-strong space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Bank-Grade Assurance</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                Security Built Into Every Layer
              </h2>
            </div>
            <Badge variant="emerald" size="md" icon={<Shield className="w-3.5 h-3.5" />}>
              SOC2 Type II Ready
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-text-primary text-sm">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>256-Bit TLS 1.3</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                All document uploads are encrypted end-to-end using enterprise TLS standards.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-text-primary text-sm">
                <EyeOff className="w-4 h-4 text-indigo-400" />
                <span>Zero Data Sales</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Your financial ledgers are never shared, sold, or used to train public AI models.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold text-text-primary text-sm">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Stateless Processing</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Files are processed ephemerally with automatic client data purging options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Conversion CTA Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel bg-gradient-to-r from-cyan-500/10 via-bg-secondary to-indigo-500/10 border border-cyan-500/30 text-center space-y-6 shadow-2xl shadow-cyan-950/20">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Ready to Recover Your Trapped Cash?
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Start your free financial recovery assessment now. It takes less than 2 minutes to configure your focus areas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="glow"
              size="lg"
              onClick={() => setStep('ai-welcome')}
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Start Free Analysis
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-text-muted pt-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No integration required • Confidential document inspection</span>
          </div>
        </div>
      </section>
    </div>
  );
};
