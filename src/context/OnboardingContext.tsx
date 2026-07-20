import React, { createContext, useContext, useState, useMemo } from 'react';
import type { 
  OnboardingStep, 
  AnalysisFocusId, 
  AnalysisFocusOption, 
  DocumentRequirement, 
  UploadedFileItem 
} from '../types/darp';

export const FOCUS_OPTIONS: AnalysisFocusOption[] = [
  {
    id: 'purchase-payables',
    title: 'Purchase & Payables',
    shortDescription: 'Vendor payments, supplier reconciliation, duplicate payments, outstanding payables.',
    detailedScope: 'Identify overpayments, unapplied credit notes, vendor disputes, and duplicate invoicing.',
    iconName: 'ShoppingBag',
    categoryBadge: 'Payables & Vendors'
  },
  {
    id: 'revenue-receivables',
    title: 'Revenue & Receivables',
    shortDescription: 'Customer collections, overdue invoices, outstanding receivables.',
    detailedScope: 'Recover uncollected revenue, unbilled deliveries, short payments, and age-defying debts.',
    iconName: 'TrendingUp',
    categoryBadge: 'Receivables & Sales'
  },
  {
    id: 'gst-tax',
    title: 'GST & Tax Compliance',
    shortDescription: 'GST reconciliation, filing mismatches, tax-related issues.',
    detailedScope: 'Reconcile GSTR-2B vs Purchase Register, reclaim unclaimed ITC, and fix tax return mismatches.',
    iconName: 'FileCheck2',
    categoryBadge: 'Tax & Compliance'
  },
  {
    id: 'bank-rec',
    title: 'Bank Reconciliation',
    shortDescription: 'Missing transactions, unmatched entries, statement reconciliation.',
    detailedScope: 'Identify unrecorded bank charges, uncleared deposits, statement gaps, and timing differences.',
    iconName: 'Landmark',
    categoryBadge: 'Banking & Cash'
  },
  {
    id: 'financial-statements',
    title: 'Financial Statements',
    shortDescription: 'Trial Balance, Profit & Loss, Balance Sheet, Cash Flow.',
    detailedScope: 'Audit trial balance equity balances, suspense accounts, and ledger misclassifications.',
    iconName: 'BarChart3',
    categoryBadge: 'Financial Statements'
  },
  {
    id: 'other-issues',
    title: 'Other Financial Issues',
    shortDescription: 'Custom finance challenges and unique recovery scenarios.',
    detailedScope: 'Custom document inspection for specialized audit or recovery projects.',
    iconName: 'Sparkles',
    categoryBadge: 'Custom Audit'
  }
];

export const DOCUMENT_REQUIREMENTS: DocumentRequirement[] = [
  // Purchase & Payables
  { id: 'pay-vendor-stmt', title: 'Vendor Statements', description: 'Monthly or yearly ledger statements from key suppliers.', focusAreaId: 'purchase-payables', acceptedFormats: ['.pdf', '.xlsx', '.csv'], isRequired: true, recommendedType: 'PDF or Excel' },
  { id: 'pay-pur-reg', title: 'Purchase Register', description: 'Itemized purchase register with invoice dates and tax values.', focusAreaId: 'purchase-payables', acceptedFormats: ['.xlsx', '.csv', '.pdf'], isRequired: true, recommendedType: 'Excel or CSV' },
  { id: 'pay-invoices', title: 'Purchase Invoices', description: 'Sample or batch purchase invoices for verification.', focusAreaId: 'purchase-payables', acceptedFormats: ['.pdf', '.zip', '.png', '.jpg'], isRequired: false, recommendedType: 'PDF / Batch Zip' },
  { id: 'pay-bank-stmt', title: 'Bank Statements', description: 'Bank account statements showing outgoing supplier payments.', focusAreaId: 'purchase-payables', acceptedFormats: ['.pdf', '.csv', '.xlsx'], isRequired: true, recommendedType: 'Bank PDF or CSV' },

  // Revenue & Receivables
  { id: 'rec-ledger', title: 'Customer Ledger', description: 'Customer receivables balance report and sub-ledger details.', focusAreaId: 'revenue-receivables', acceptedFormats: ['.xlsx', '.csv', '.pdf'], isRequired: true, recommendedType: 'Excel or CSV' },
  { id: 'rec-sales-reg', title: 'Sales Register', description: 'Comprehensive sales register for the target financial period.', focusAreaId: 'revenue-receivables', acceptedFormats: ['.xlsx', '.csv'], isRequired: true, recommendedType: 'Excel / CSV' },
  { id: 'rec-aging-rpt', title: 'Outstanding Receivable Report', description: 'Debtor aging schedule with invoice-level breakdowns.', focusAreaId: 'revenue-receivables', acceptedFormats: ['.pdf', '.xlsx'], isRequired: true, recommendedType: 'Excel or PDF' },
  { id: 'rec-bank-stmt', title: 'Bank Statements (Incoming)', description: 'Bank account statements showing customer receipts.', focusAreaId: 'revenue-receivables', acceptedFormats: ['.pdf', '.csv'], isRequired: false, recommendedType: 'Bank PDF' },

  // GST & Tax
  { id: 'gst-gstr1', title: 'GSTR-1', description: 'Outward supplies tax return files.', focusAreaId: 'gst-tax', acceptedFormats: ['.json', '.xlsx', '.pdf'], isRequired: true, recommendedType: 'JSON or Excel' },
  { id: 'gst-gstr2b', title: 'GSTR-2B', description: 'Auto-drafted ITC statement from GST portal.', focusAreaId: 'gst-tax', acceptedFormats: ['.json', '.xlsx', '.pdf'], isRequired: true, recommendedType: 'JSON or Excel' },
  { id: 'gst-gstr3b', title: 'GSTR-3B', description: 'Monthly summary tax return files.', focusAreaId: 'gst-tax', acceptedFormats: ['.json', '.xlsx', '.pdf'], isRequired: true, recommendedType: 'JSON or Excel' },

  // Bank Rec
  { id: 'bank-stmt-full', title: 'Bank Statements', description: 'Complete bank statements covering the analysis period.', focusAreaId: 'bank-rec', acceptedFormats: ['.pdf', '.csv', '.xlsx'], isRequired: true, recommendedType: 'Bank PDF or CSV' },
  { id: 'bank-cashbook', title: 'Cash Book / Passbook', description: 'Internal cash book or bank ledger entries from ERP.', focusAreaId: 'bank-rec', acceptedFormats: ['.xlsx', '.csv'], isRequired: true, recommendedType: 'Excel or CSV' },

  // Financial Statements
  { id: 'fs-tb', title: 'Trial Balance', description: 'Detailed trial balance with opening and closing balances.', focusAreaId: 'financial-statements', acceptedFormats: ['.xlsx', '.csv', '.pdf'], isRequired: true, recommendedType: 'Excel or CSV' },
  { id: 'fs-bs', title: 'Balance Sheet', description: 'Audited or provisional balance sheet.', focusAreaId: 'financial-statements', acceptedFormats: ['.pdf', '.xlsx'], isRequired: true, recommendedType: 'PDF or Excel' },
  { id: 'fs-pl', title: 'Profit & Loss Statement', description: 'Statement of profit & loss for the target period.', focusAreaId: 'financial-statements', acceptedFormats: ['.pdf', '.xlsx'], isRequired: true, recommendedType: 'PDF or Excel' },
  { id: 'fs-cf', title: 'Cash Flow Statement', description: 'Cash flow statement (operating, investing, financing).', focusAreaId: 'financial-statements', acceptedFormats: ['.pdf', '.xlsx'], isRequired: false, recommendedType: 'PDF or Excel' },

  // Other Issues
  { id: 'other-custom-doc', title: 'Supporting Financial Documents', description: 'Any contracts, audit notes, or custom finance files.', focusAreaId: 'other-issues', acceptedFormats: ['.pdf', '.docx', '.xlsx', '.zip'], isRequired: true, recommendedType: 'Any standard format' }
];

interface OnboardingContextType {
  currentStep: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  selectedFocusAreas: AnalysisFocusId[];
  toggleFocusArea: (id: AnalysisFocusId) => void;
  clearFocusAreas: () => void;
  uploadedFiles: Record<string, UploadedFileItem[]>; // categoryId -> UploadedFileItem[]
  addFile: (categoryId: string, fileItem: UploadedFileItem) => void;
  removeFile: (categoryId: string, fileId: string) => void;
  replaceFile: (categoryId: string, fileId: string, newFileItem: UploadedFileItem) => void;
  requiredDocuments: DocumentRequirement[];
  totalRequiredCount: number;
  uploadedRequiredCount: number;
  totalUploadedFileCount: number;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('landing');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<AnalysisFocusId[]>(['purchase-payables', 'revenue-receivables']); // Pre-select popular areas for convenience
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileItem[]>>({});

  const toggleFocusArea = (id: AnalysisFocusId) => {
    setSelectedFocusAreas((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearFocusAreas = () => {
    setSelectedFocusAreas([]);
  };

  // Dynamically calculate required documents based on selected focus areas
  const requiredDocuments = useMemo(() => {
    if (selectedFocusAreas.length === 0) return [];
    // Deduplicate requirements by requirement id (e.g. Bank Statements shared between payables & receivables)
    const docsMap = new Map<string, DocumentRequirement>();
    DOCUMENT_REQUIREMENTS.forEach((doc) => {
      if (selectedFocusAreas.includes(doc.focusAreaId)) {
        if (!docsMap.has(doc.id)) {
          docsMap.set(doc.id, doc);
        }
      }
    });
    return Array.from(docsMap.values());
  }, [selectedFocusAreas]);

  const addFile = (categoryId: string, fileItem: UploadedFileItem) => {
    setUploadedFiles((prev) => {
      const existing = prev[categoryId] || [];
      return {
        ...prev,
        [categoryId]: [...existing, fileItem]
      };
    });
  };

  const removeFile = (categoryId: string, fileId: string) => {
    setUploadedFiles((prev) => {
      const existing = prev[categoryId] || [];
      return {
        ...prev,
        [categoryId]: existing.filter((f) => f.id !== fileId)
      };
    });
  };

  const replaceFile = (categoryId: string, fileId: string, newFileItem: UploadedFileItem) => {
    setUploadedFiles((prev) => {
      const existing = prev[categoryId] || [];
      const updated = existing.map((f) => (f.id === fileId ? newFileItem : f));
      return {
        ...prev,
        [categoryId]: updated
      };
    });
  };

  const totalRequiredCount = useMemo(() => {
    return requiredDocuments.filter((doc) => doc.isRequired).length;
  }, [requiredDocuments]);

  const uploadedRequiredCount = useMemo(() => {
    return requiredDocuments
      .filter((doc) => doc.isRequired)
      .filter((doc) => (uploadedFiles[doc.id] || []).length > 0).length;
  }, [requiredDocuments, uploadedFiles]);

  const totalUploadedFileCount = useMemo(() => {
    return Object.values(uploadedFiles).reduce((sum, list) => sum + list.length, 0);
  }, [uploadedFiles]);

  const resetOnboarding = () => {
    setCurrentStep('landing');
    setSelectedFocusAreas(['purchase-payables', 'revenue-receivables']);
    setUploadedFiles({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setStep: setCurrentStep,
        selectedFocusAreas,
        toggleFocusArea,
        clearFocusAreas,
        uploadedFiles,
        addFile,
        removeFile,
        replaceFile,
        requiredDocuments,
        totalRequiredCount,
        uploadedRequiredCount,
        totalUploadedFileCount,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
