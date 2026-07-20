import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileText, 
  ShieldCheck, 
  RotateCcw,
  ArrowLeft,
  Bot
} from 'lucide-react';
import { useOnboarding, FOCUS_OPTIONS } from '../context/OnboardingContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const AIAnalyzingPage: React.FC = () => {
  const {
    selectedFocusAreas,
    uploadedFiles,
    requiredDocuments,
    setStep,
    totalUploadedFileCount,
    resetOnboarding
  } = useOnboarding();

  const selectedOptions = FOCUS_OPTIONS.filter((opt) => selectedFocusAreas.includes(opt.id));

  // Flatten uploaded files
  const allUploadedFiles = Object.entries(uploadedFiles).flatMap(([catId, files]) => {
    const req = requiredDocuments.find((r) => r.id === catId);
    return files.map((f) => ({ ...f, categoryName: req ? req.title : catId }));
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* AI Analysis Handoff Card */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-gradient-to-b from-cyan-500/10 via-bg-secondary to-bg-secondary border border-cyan-500/30 text-center space-y-6 shadow-2xl shadow-cyan-950/20">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full bg-bg-primary rounded-[14px] flex items-center justify-center">
            <Bot className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="cyan" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Phase 2 AI Handoff Point
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            AI Financial Analysis Engine Ready
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            DARP has organized your financial records and established cross-ledger relationships. Ready to launch Phase 2 recovery execution.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted pt-2">
          <span className="flex items-center gap-1.5 bg-bg-tertiary px-3.5 py-1.5 rounded-full border border-border-subtle font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Records Categorized
          </span>
          <span className="flex items-center gap-1.5 bg-bg-tertiary px-3.5 py-1.5 rounded-full border border-border-subtle font-medium">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            {selectedFocusAreas.length} Target Focus Areas
          </span>
          <span className="flex items-center gap-1.5 bg-bg-tertiary px-3.5 py-1.5 rounded-full border border-border-subtle font-medium">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            {totalUploadedFileCount} Financial Documents
          </span>
        </div>
      </div>

      {/* Summary Inventory Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Focus Summary */}
        <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Target Analysis Areas</span>
            </h3>
            <button
              onClick={() => setStep('analysis-focus')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Modify Focus
            </button>
          </div>

          <div className="space-y-2.5">
            {selectedOptions.map((opt) => (
              <div key={opt.id} className="p-3 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-semibold text-text-primary">{opt.title}</h4>
                  <p className="text-[10px] text-text-muted">{opt.categoryBadge}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* AI-Organized Documents List */}
        <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Organized Document Inventory</span>
            </h3>
            <button
              onClick={() => setStep('document-upload')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Add Files
            </button>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {allUploadedFiles.map((file) => (
              <div key={file.id} className="p-3 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-between text-xs">
                <div className="truncate pr-2">
                  <p className="font-medium text-text-primary truncate">{file.name}</p>
                  <p className="text-[10px] text-text-muted">{file.categoryName}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium shrink-0">
                  Categorized
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Stateless 256-bit AES encryption active.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => resetOnboarding()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary bg-bg-tertiary border border-border-subtle hover:bg-bg-secondary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Assessment</span>
          </button>

          <Button
            variant="glow"
            size="md"
            onClick={() => alert('Phase 1 onboarding complete! Phase 2 AI Analysis will execute here.')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Phase 2 AI Engine Ready
          </Button>
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => setStep('document-upload')}
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Intelligent Intake</span>
        </button>
      </div>
    </div>
  );
};
