import React from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIMessageBubbleProps {
  title?: string;
  message: string;
  subtitle?: string;
  className?: string;
}

export const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({
  title = 'DARP Recovery AI',
  message,
  subtitle,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 sm:p-8 rounded-2xl bg-bg-glass border border-cyan-500/30 backdrop-blur-xl shadow-xl shadow-cyan-950/10 relative overflow-hidden ${className}`}
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start gap-4">
        {/* Animated AI Avatar */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-500 to-indigo-600 dark:from-cyan-500 dark:to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/25">
            <div className="w-full h-full bg-bg-secondary rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-bg-primary flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-white animate-pulse" />
          </span>
        </div>

        {/* Message Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold tracking-wide text-cyan-700 dark:text-cyan-400 uppercase flex items-center gap-1.5">
              <span>{title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-semibold">
                Autonomous
              </span>
            </h4>
          </div>

          <p className="text-base sm:text-lg text-text-primary leading-relaxed font-normal">
            {message}
          </p>

          {subtitle && (
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
