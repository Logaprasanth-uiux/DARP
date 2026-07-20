import React from 'react';
import { 
  ShoppingBag, 
  TrendingUp, 
  FileCheck2, 
  Landmark, 
  BarChart3, 
  Sparkles, 
  Check 
} from 'lucide-react';
import type { AnalysisFocusOption } from '../../types/darp';

interface SelectionCardProps {
  option: AnalysisFocusOption;
  isSelected: boolean;
  onToggle: (id: AnalysisFocusOption['id']) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  ShoppingBag,
  TrendingUp,
  FileCheck2,
  Landmark,
  BarChart3,
  Sparkles,
};

export const SelectionCard: React.FC<SelectionCardProps> = ({
  option,
  isSelected,
  onToggle,
}) => {
  const IconComponent = ICON_MAP[option.iconName] || Sparkles;

  return (
    <div
      onClick={() => onToggle(option.id)}
      tabIndex={0}
      role="checkbox"
      aria-checked={isSelected}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle(option.id);
        }
      }}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none outline-none ${
        isSelected
          ? 'bg-gradient-to-b from-cyan-500/10 via-bg-secondary to-bg-secondary border-cyan-600/70 dark:border-cyan-400/60 shadow-lg shadow-cyan-500/15 ring-2 ring-cyan-500/30'
          : 'glass-panel bg-bg-card hover:bg-bg-card-hover border-border-subtle hover:border-border-strong hover:-translate-y-1'
      }`}
    >
      {/* Card Header: Icon & Selection Node */}
      <div className="flex items-center justify-between gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 text-white shadow-md shadow-cyan-500/30'
              : 'bg-bg-tertiary text-text-secondary group-hover:text-cyan-700 dark:group-hover:text-cyan-400 group-hover:bg-cyan-500/10'
          }`}
        >
          <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Custom Checkbox Node */}
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-200 ${
            isSelected
              ? 'bg-cyan-600 dark:bg-cyan-500 border-cyan-600 dark:border-cyan-400 text-white shadow-sm'
              : 'border-border-strong bg-bg-tertiary/40 group-hover:border-cyan-500/40'
          }`}
        >
          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
        </div>
      </div>

      {/* Card Body: Title & Description */}
      <div className="mt-5 space-y-2">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
          {option.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {option.shortDescription}
        </p>
      </div>
    </div>
  );
};
