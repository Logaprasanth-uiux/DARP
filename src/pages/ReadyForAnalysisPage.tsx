import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { useOnboarding, FOCUS_OPTIONS } from '../context/OnboardingContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { aiService } from '../services/aiService';

export const ReadyForAnalysisPage: React.FC = () => {
  const {
    selectedFocusAreas,
    uploadedFiles,
    requiredDocuments,
    setStep,
    totalUploadedFileCount,
    resetOnboarding
  } = useOnboarding();

  const selectedOptions = FOCUS_OPTIONS.filter((opt) => selectedFocusAreas.includes(opt.id));

  // Collect all uploaded file items across categories
  const allUploadedFiles = Object.entries(uploadedFiles).flatMap(([catId, files]) => {
    const req = requiredDocuments.find((r) => r.id === catId);
    return files.map((f) => ({ ...f, categoryName: req ? req.title : catId }));
  });

  const handlePhase2Handoff = () => {
    aiService.analyzeDocuments(allUploadedFiles, selectedFocusAreas);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Ready Confirmation Banner */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-gradient-to-b from-cyan-500/10 via-bg-secondary to-bg-secondary border border-cyan-500/30 text-center space-y-6 shadow-xl shadow-cyan-950/20">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full bg-bg-primary rounded-[14px] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="emerald" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Phase 1 Onboarding Complete
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Ready for Analysis
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            All required financial documents have been successfully received and encrypted. Your assessment pipeline is established.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted pt-2">
          <span className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-full border border-border-subtle">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            {selectedFocusAreas.length} Analysis Focus Areas
          </span>
          <span className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-full border border-border-subtle">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            {totalUploadedFileCount} Documents Uploaded
          </span>
          <span className="flex items-center gap-1 bg-bg-tertiary px-3 py-1.5 rounded-full border border-border-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Stateless Encryption Active
          </span>
        </div>
      </div>

      {/* Summary Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected Focus Areas Card */}
        <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Target Analysis Focus</span>
            </h3>
            <button
              onClick={() => setStep('analysis-focus')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Edit Focus
            </button>
          </div>

          <div className="space-y-3">
            {selectedOptions.map((opt) => (
              <div key={opt.id} className="p-3 rounded-xl bg-bg-secondary border border-border-subtle flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-text-primary">{opt.title}</h4>
                  <p className="text-[11px] text-text-muted mt-0.5">{opt.categoryBadge}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Document Inventory</span>
            </h3>
            <button
              onClick={() => setStep('document-upload')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Manage Files
            </button>
          </div>

          {allUploadedFiles.length > 0 ? (
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {allUploadedFiles.map((file) => (
                <div key={file.id} className="p-3 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <p className="font-medium text-text-primary truncate">{file.name}</p>
                    <p className="text-[10px] text-text-muted">{file.categoryName}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium shrink-0">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-text-muted space-y-2">
              <p>No external documents attached yet.</p>
              <button
                onClick={() => setStep('document-upload')}
                className="text-cyan-400 underline"
              >
                Upload documents now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Handoff Notice Banner */}
      <div className="p-6 rounded-2xl bg-bg-secondary border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-semibold text-text-primary flex items-center justify-center sm:justify-start gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Phase 2 Handoff Point</span>
          </h4>
          <p className="text-xs text-text-secondary">
            Phase 1 onboarding is complete. The DARP AI analysis engine will execute in Phase 2.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => resetOnboarding()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-text-secondary hover:text-text-primary bg-bg-tertiary border border-border-subtle hover:bg-bg-secondary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Assessment</span>
          </button>

          <Button
            variant="glow"
            size="md"
            onClick={handlePhase2Handoff}
            icon={<Sparkles className="w-4 h-4" />}
          >
            Phase 2 Ready
          </Button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-start pt-2">
        <button
          onClick={() => setStep('document-upload')}
          className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Document Upload</span>
        </button>
      </div>
    </div>
  );
};
