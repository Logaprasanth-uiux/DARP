import React from 'react';
import type { OnboardingStep } from '../../types/darp';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: OnboardingStep;
  onStepClick?: (step: OnboardingStep) => void;
}

const STEPS: { id: OnboardingStep; label: string; number: number }[] = [
  { id: 'landing', label: 'Overview', number: 1 },
  { id: 'ai-welcome', label: 'AI Welcome', number: 2 },
  { id: 'analysis-focus', label: 'Analysis Focus', number: 3 },
  { id: 'document-upload', label: 'Document Upload', number: 4 },
  { id: 'ready-for-analysis', label: 'Ready for Analysis', number: 5 },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  const currentStepObj = STEPS.find((s) => s.id === currentStep) || STEPS[0];

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 sm:px-6">
      {/* Desktop & Tablet Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border-subtle -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStepObj.number - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isDone = step.number < currentStepObj.number;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              onClick={() => isDone && onStepClick && onStepClick(step.id)}
              className={`relative z-10 flex flex-col items-center gap-2 group ${
                isDone ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${
                  isDone
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 ring-4 ring-bg-primary'
                    : isCurrent
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white ring-4 ring-cyan-500/20 shadow-lg shadow-cyan-500/30 scale-110'
                    : 'bg-bg-tertiary text-text-muted border border-border-subtle'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isCurrent ? 'text-cyan-400 font-semibold dark:text-cyan-300' : isDone ? 'text-text-primary' : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="md:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-medium text-text-muted">
          <span>Step {currentStepObj.number} of {STEPS.length}</span>
          <span className="text-cyan-400 font-semibold">{currentStepObj.label}</span>
        </div>
        <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${(currentStepObj.number / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
