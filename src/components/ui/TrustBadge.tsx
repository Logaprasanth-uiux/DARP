import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

interface TrustBadgeProps {
  type?: 'encryption' | 'privacy' | 'soc2' | 'all';
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ type = 'all', className = '' }) => {
  if (type === 'all') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 py-3 px-4 rounded-xl bg-bg-secondary/80 border border-border-subtle text-xs text-text-muted ${className}`}>
        <div className="flex items-center gap-1.5 font-medium text-text-secondary">
          <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>256-Bit AES Encryption</span>
        </div>
        <span className="text-border-strong hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5 font-medium text-text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>SOC2 Type II Ready</span>
        </div>
        <span className="text-border-strong hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5 font-medium text-text-secondary">
          <EyeOff className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Zero Data Retention Without Permission</span>
        </div>
      </div>
    );
  }

  return null;
};
