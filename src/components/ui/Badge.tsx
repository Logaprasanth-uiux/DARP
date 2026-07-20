import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'indigo' | 'emerald' | 'amber' | 'slate';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  icon,
  className,
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25 dark:text-cyan-300',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25 dark:text-indigo-300',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 dark:text-emerald-300',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25 dark:text-amber-300',
    slate: 'bg-slate-500/10 text-text-secondary border-border-subtle',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full border tracking-wide uppercase',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
