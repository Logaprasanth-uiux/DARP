import React from 'react';
import { ArrowRight, ShieldCheck, FileCheck, Lock } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { UploadCard } from '../components/ui/UploadCard';
import { Button } from '../components/ui/Button';

export const IntelligentUploadPage: React.FC = () => {
  const {
    requiredDocuments,
    uploadedFiles,
    addFile,
    removeFile,
    replaceFile,
    setStep,
    uploadedRequiredCount,
    totalRequiredCount,
    totalUploadedFileCount
  } = useOnboarding();

  const isReadyToProceed = totalUploadedFileCount > 0 || totalRequiredCount === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header & Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Step 2 of 2 — Intelligent Upload</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Upload Financial Documents
        </h1>

        <p className="text-sm sm:text-base text-text-secondary">
          Displaying requested documents based on your chosen analysis areas. Upload your files below for audit analysis.
        </p>
      </div>

      {/* Upload Completeness Status Bar */}
      <div className="p-5 rounded-2xl glass-panel bg-bg-secondary border border-border-subtle space-y-3">
        <div className="flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="text-text-primary font-semibold">Document Completion Status</span>
            <span className="text-text-muted">
              ({uploadedRequiredCount} of {totalRequiredCount} required categories filled)
            </span>
          </div>
          <span className="text-cyan-400 font-bold">
            {totalRequiredCount > 0 ? Math.round((uploadedRequiredCount / totalRequiredCount) * 100) : 100}%
          </span>
        </div>

        <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 transition-all duration-500"
            style={{ width: `${totalRequiredCount > 0 ? (uploadedRequiredCount / totalRequiredCount) * 100 : 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-text-muted pt-1">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-cyan-400" />
            256-Bit SSL Client Encryption
          </span>
          <span>Total Files Added: <strong className="text-text-primary">{totalUploadedFileCount}</strong></span>
        </div>
      </div>

      {/* Dynamic Grid of Document Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requiredDocuments.map((req) => (
          <UploadCard
            key={req.id}
            requirement={req}
            uploadedFiles={uploadedFiles[req.id] || []}
            onAddFile={(fileItem) => addFile(req.id, fileItem)}
            onRemoveFile={(fileId) => removeFile(req.id, fileId)}
            onReplaceFile={(fileId, newFileItem) => replaceFile(req.id, fileId, newFileItem)}
          />
        ))}
      </div>

      {/* Trust Callout Footer */}
      <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-subtle flex items-center justify-center gap-2 text-xs text-text-muted text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Your uploaded financial files are processed securely with automatic data purging options.</span>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border-subtle">
        <button
          onClick={() => setStep('analysis-focus')}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          ← Adjust Analysis Focus
        </button>

        <Button
          variant="glow"
          size="lg"
          disabled={!isReadyToProceed}
          onClick={() => setStep('ready-for-analysis')}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          {totalUploadedFileCount > 0 ? 'Proceed to Confirmation' : 'Continue with Selected Documents'}
        </Button>
      </div>
    </div>
  );
};
