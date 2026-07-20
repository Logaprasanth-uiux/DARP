import React, { useState } from 'react';
import { X, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel bg-bg-secondary border border-border-strong shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Contact DARP Support</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-bg-tertiary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Success State */}
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-text-primary">Message Sent Successfully!</h4>
            <p className="text-xs text-text-muted">Our financial advisory team will follow up shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Business Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-subtle focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs sm:text-sm text-text-primary placeholder:text-text-muted outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">How can we assist you?</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your recovery needs or custom ledger format..."
                className="w-full px-4 py-2.5 rounded-xl bg-bg-tertiary border border-border-subtle focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs sm:text-sm text-text-primary placeholder:text-text-muted outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Typical response time &lt; 2 hours</span>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-md shadow-cyan-900/20"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
