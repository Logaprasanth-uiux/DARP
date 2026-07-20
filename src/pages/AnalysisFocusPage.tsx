import React from 'react';
import { ArrowRight, AlertCircle, Sparkles, Check } from 'lucide-react';
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
      // Unselect all except first
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
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1 of 2</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          What would you like DARP to analyze today?
        </h1>

        <p className="text-sm sm:text-base text-text-secondary">
          Select one or more financial areas below. DARP will dynamically tailor the document upload step to your selection.
        </p>
      </div>

      {/* Select All Quick Control */}
      <div className="flex items-center justify-between px-2 text-xs text-text-muted">
        <span>
          Selected: <strong className="text-cyan-400 font-semibold">{selectedFocusAreas.length}</strong> of {FOCUS_OPTIONS.length} areas
        </span>
        <button
          onClick={handleSelectAll}
          className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
        >
          {selectedFocusAreas.length === FOCUS_OPTIONS.length ? 'Reset Selection' : 'Select All Areas'}
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
              Configured for <strong className="font-semibold text-white">{requiredDocuments.length} document categories</strong> across your selected focus.
            </span>
          </div>
          <span className="text-[11px] text-cyan-400/80 font-medium">Ready for upload</span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Please select at least one analysis area to continue.</span>
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
          Continue to Upload ({selectedFocusAreas.length} Selected)
        </Button>
      </div>
    </div>
  );
};
