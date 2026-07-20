import React from 'react';
import { ArrowRight, AlertCircle, Sparkles, Check, Info } from 'lucide-react';
import { useOnboarding, FOCUS_OPTIONS } from '../context/OnboardingContext';
import { SelectionCard } from '../components/ui/SelectionCard';
import { Button } from '../components/ui/Button';
import type { AnalysisFocusId } from '../types/darp';

export const AnalysisFocusPage: React.FC = () => {
  const { 
    selectedFocusAreas, 
    toggleFocusArea, 
    setStep,
    requiredDocuments
  } = useOnboarding();

  const hasSelection = selectedFocusAreas.length > 0;

  const handleSelectAll = () => {
    if (selectedFocusAreas.length === FOCUS_OPTIONS.length) {
      // Keep primary area selected
      toggleFocusArea('purchase-payables');
    } else {
      FOCUS_OPTIONS.forEach((opt) => {
        if (!selectedFocusAreas.includes(opt.id)) {
          toggleFocusArea(opt.id);
        }
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Title & Guidance Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1 • Focus Setup</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
          What would you like DARP to analyze today?
        </h1>

        {/* Conversational Explanation */}
        <div className="p-4 rounded-2xl bg-bg-secondary/70 border border-border-subtle max-w-2xl mx-auto flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Tell us what you'd like to analyze, and DARP will automatically determine which financial documents are recommended for your assessment.
          </p>
        </div>
      </div>

      {/* Select All Control & Count */}
      <div className="flex items-center justify-between px-1 text-xs text-text-muted">
        <span>
          Selected Focus Areas: <strong className="text-cyan-400 font-semibold">{selectedFocusAreas.length}</strong> of {FOCUS_OPTIONS.length}
        </span>
        <button
          onClick={handleSelectAll}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-medium"
        >
          {selectedFocusAreas.length === FOCUS_OPTIONS.length ? 'Clear Selection' : 'Select All Areas'}
        </button>
      </div>

      {/* 6 Selection Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FOCUS_OPTIONS.map((option) => (
          <SelectionCard
            key={option.id}
            option={option}
            isSelected={selectedFocusAreas.includes(option.id as AnalysisFocusId)}
            onToggle={toggleFocusArea}
          />
        ))}
      </div>

      {/* Selected Scope Summary Banner */}
      {hasSelection ? (
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cyan-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Configured for <strong className="font-semibold text-white">{requiredDocuments.length} document types</strong> across your chosen focus.
            </span>
          </div>
          <span className="text-[11px] text-cyan-400/80 font-medium">Ready for intelligent drop</span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Please select at least one financial area to proceed.</span>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border-subtle">
        <button
          onClick={() => setStep('ai-welcome')}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          ← Back to AI Welcome
        </button>

        <Button
          variant="glow"
          size="lg"
          disabled={!hasSelection}
          onClick={() => setStep('document-upload')}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          Continue to Intelligent Intake ({selectedFocusAreas.length} Selected)
        </Button>
      </div>
    </div>
  );
};
