import type { AIServiceStub, UploadedFileItem, AnalysisFocusId } from '../types/darp';

/**
 * AI Service Stub — Phase 1 Handoff Placeholder
 * Phase 2 will plug into this service to execute real-time autonomous document analysis.
 */
export const aiService: AIServiceStub = {
  async analyzeDocuments(_files: UploadedFileItem[], _focusAreas: AnalysisFocusId[]): Promise<void> {
    console.log('[DARP AI Service] Handoff point reached. Ready for Phase 2 AI engine integration.');
  },
  getStatus() {
    return 'ready';
  }
};
