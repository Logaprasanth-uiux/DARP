import React from 'react';
import type { OnboardingStep } from '../../types/darp';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: OnboardingStep;
  onStepClick?: (step: OnboardingStep) => void;
}

interface StepItem {
  id: OnboardingStep;
  label: string;
  number: number;
}

const STEPS: StepItem[] = [
  { id: 'ai-welcome', label: 'Welcome', number: 1 },
  { id: 'analysis-focus', label: 'Focus', number: 2 },
  { id: 'document-upload', label: 'Upload', number: 3 },
  { id: 'ai-analyzing', label: 'Analysis', number: 4 },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  if (currentStep === 'landing') return null;

  const currentStepObj = STEPS.find((s) => s.id === currentStep) || STEPS[0];

  return (
    <div className="w-full max-w-3xl mx-auto py-3 px-4 sm:px-6">
      {/* Desktop & Tablet Minimal Circular Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Thin 2px Connector Line Track */}
        <div className="absolute top-[15px] left-6 right-6 h-[2px] bg-border-subtle/80 z-0" />
        
        {/* Active Thin 2px Gradient Progress Connector */}
        <div 
          className="absolute top-[15px] left-6 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 z-0 transition-all duration-500 shadow-sm shadow-cyan-500/40"
          style={{ width: `${((currentStepObj.number - 1) / (STEPS.length - 1)) * 88}%` }}
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
              {/* Circular Step Node */}
              <motion.div
                whileHover={isDone ? { scale: 1.1 } : {}}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-300 ${
                  isDone
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-500 text-white shadow-md shadow-cyan-500/25 ring-2 ring-bg-primary'
                    : isCurrent
                    ? 'bg-bg-secondary text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-500/60 dark:ring-cyan-400/60 shadow-lg shadow-cyan-500/30 scale-110'
                    : 'bg-bg-tertiary/70 text-text-muted border border-border-subtle'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </motion.div>

              {/* Concise Label Underneath */}
              <span
                className={`text-xs transition-colors tracking-tight ${
                  isCurrent
                    ? 'text-cyan-700 dark:text-cyan-300 font-bold'
                    : isDone
                    ? 'text-text-primary font-semibold'
                    : 'text-text-muted font-normal'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="md:hidden flex flex-col gap-1.5 py-1">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-text-primary font-semibold">{currentStepObj.label}</span>
          <span className="text-[11px] font-bold text-cyan-700 dark:text-cyan-300">
            {currentStepObj.number} of {STEPS.length}
          </span>
        </div>
        <div className="w-full h-1 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 transition-all duration-500"
            style={{ width: `${(currentStepObj.number / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
