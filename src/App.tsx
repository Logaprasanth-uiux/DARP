import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StepIndicator } from './components/ui/StepIndicator';

import { LandingPage } from './pages/LandingPage';
import { AIWelcomePage } from './pages/AIWelcomePage';
import { AnalysisFocusPage } from './pages/AnalysisFocusPage';
import { IntelligentUploadPage } from './pages/IntelligentUploadPage';
import { ReadyForAnalysisPage } from './pages/ReadyForAnalysisPage';

const AppContent: React.FC = () => {
  const { currentStep, setStep } = useOnboarding();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'ai-welcome':
        return <AIWelcomePage />;
      case 'analysis-focus':
        return <AnalysisFocusPage />;
      case 'document-upload':
        return <IntelligentUploadPage />;
      case 'ready-for-analysis':
        return <ReadyForAnalysisPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary transition-colors duration-300">
      {/* Minimal Header */}
      <Navbar />

      {/* Onboarding Top Progress Indicator (Only visible after Landing Page) */}
      {currentStep !== 'landing' && (
        <div className="border-b border-border-subtle bg-bg-secondary/40 backdrop-blur-md">
          <StepIndicator currentStep={currentStep} onStepClick={(s) => setStep(s)} />
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full">
        {renderCurrentStep()}
      </main>

      {/* Minimal Public Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <OnboardingProvider>
        <AppContent />
      </OnboardingProvider>
    </ThemeProvider>
  );
};

export default App;
