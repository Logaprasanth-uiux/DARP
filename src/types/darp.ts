export type ThemeMode = 'dark' | 'light';

export type OnboardingStep = 
  | 'landing'
  | 'ai-welcome'
  | 'analysis-focus'
  | 'document-upload'
  | 'ready-for-analysis';

export type AnalysisFocusId = 
  | 'purchase-payables'
  | 'revenue-receivables'
  | 'gst-tax'
  | 'bank-rec'
  | 'financial-statements'
  | 'other-issues';

export interface AnalysisFocusOption {
  id: AnalysisFocusId;
  title: string;
  shortDescription: string;
  detailedScope: string;
  iconName: string;
  categoryBadge: string;
}

export interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  focusAreaId: AnalysisFocusId;
  acceptedFormats: string[];
  isRequired: boolean;
  recommendedType: string;
}

export interface UploadedFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  categoryId: string; // DocumentRequirement id
  uploadTimestamp: number;
  autoDetectedCategory?: string; // Prepared for future AI document recognition
}

// Future Service Architecture Interfaces (Stubs for Phase 2 readiness)
export interface AIServiceStub {
  analyzeDocuments(files: UploadedFileItem[], focusAreas: AnalysisFocusId[]): Promise<void>;
  getStatus(): 'idle' | 'ready';
}

export interface AuthServiceStub {
  isAuthenticated(): boolean;
  getUserSession(): null;
}

export interface DocumentServiceStub {
  uploadDocument(file: File, categoryId: string): Promise<UploadedFileItem>;
  autoCategorizeDocument?(file: File): Promise<string>;
}

export interface PaymentServiceStub {
  getSubscriptionPlan(): string;
}

export interface NotificationServiceStub {
  notifyUser(message: string): void;
}
