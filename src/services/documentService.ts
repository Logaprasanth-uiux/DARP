import type { DocumentServiceStub, UploadedFileItem } from '../types/darp';

/**
 * Document Service Stub — Architected for future automated AI document recognition
 */
export const documentService: DocumentServiceStub = {
  async uploadDocument(file: File, categoryId: string): Promise<UploadedFileItem> {
    return {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      categoryId,
      uploadTimestamp: Date.now(),
      autoDetectedCategory: categoryId,
    };
  },
  async autoCategorizeDocument(file: File): Promise<string> {
    // Stub for Phase 2 OCR/LLM document classifier
    const filename = file.name.toLowerCase();
    if (filename.includes('gstr') || filename.includes('tax')) return 'gst-gstr1';
    if (filename.includes('bank') || filename.includes('stmt')) return 'bank-statement';
    if (filename.includes('sales') || filename.includes('customer')) return 'rec-ledger';
    if (filename.includes('trial') || filename.includes('tb')) return 'fs-tb';
    return 'general';
  }
};
