import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = true,
  hoverable = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border transition-all duration-300',
          glass ? 'glass-panel' : 'bg-bg-secondary border-border-subtle',
          hoverable && 'card-hover-effect cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
