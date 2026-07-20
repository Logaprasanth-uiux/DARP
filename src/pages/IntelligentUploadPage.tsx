import React, { useRef, useState, useMemo } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Trash2, 
  RefreshCw, 
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  PlusCircle,
  Cpu,
  Loader2
} from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { documentService } from '../services/documentService';
import type { UploadedFileItem, DocumentRequirement } from '../types/darp';

export const IntelligentUploadPage: React.FC = () => {
  const {
    requiredDocuments,
    uploadedFiles,
    addFile,
    removeFile,
    replaceFile,
    setStep,
    totalUploadedFileCount,
    selectedFocusAreas
  } = useOnboarding();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [replacingFileId, setReplacingFileId] = useState<string | null>(null);
  const [replacingCatId, setReplacingCatId] = useState<string | null>(null);
  const [isAnalyzingTransition, setIsAnalyzingTransition] = useState(false);
  const [transitionStepText, setTransitionStepText] = useState('Organizing Financial Records...');

  // Flatten all uploaded files
  const allUploadedFiles = useMemo(() => {
    return Object.entries(uploadedFiles).flatMap(([catId, files]) => {
      const req = requiredDocuments.find((r) => r.id === catId);
      return files.map((f) => ({ ...f, categoryTitle: req ? req.title : catId, catId }));
    });
  }, [uploadedFiles, requiredDocuments]);

  // Group uploaded files by category for AI Recognition view
  const recognizedCategories = useMemo(() => {
    const map = new Map<string, { requirement: DocumentRequirement; files: UploadedFileItem[] }>();
    requiredDocuments.forEach((req) => {
      const files = uploadedFiles[req.id] || [];
      if (files.length > 0) {
        map.set(req.id, { requirement: req, files });
      }
    });
    return Array.from(map.values());
  }, [requiredDocuments, uploadedFiles]);

  // Detect missing recommended/required documents
  const missingRequirements = useMemo(() => {
    return requiredDocuments.filter((req) => (uploadedFiles[req.id] || []).length === 0);
  }, [requiredDocuments, uploadedFiles]);

  // Calculate estimated coverage percentage
  const estimatedCoverage = useMemo(() => {
    if (requiredDocuments.length === 0) return 100;
    const filledCount = recognizedCategories.length;
    return Math.min(100, Math.round((filledCount / requiredDocuments.length) * 100));
  }, [recognizedCategories, requiredDocuments]);

  // Handle batch file drop / upload
  const handleIntelligentBatchUpload = async (files: FileList | null, targetCategoryId?: string) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Auto-determine category or use target category
      let categoryId = targetCategoryId;
      if (!categoryId) {
        categoryId = await documentService.autoCategorizeDocument(file);
        // Fallback to first requirement if category not matched
        const validCategory = requiredDocuments.find((r) => r.id === categoryId);
        if (!validCategory && requiredDocuments.length > 0) {
          categoryId = requiredDocuments[0].id;
        }
      }

      if (categoryId) {
        const fileItem = await documentService.uploadDocument(file, categoryId);
        if (replacingFileId && replacingCatId) {
          replaceFile(replacingCatId, replacingFileId, fileItem);
          setReplacingFileId(null);
          setReplacingCatId(null);
        } else {
          addFile(categoryId, fileItem);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleIntelligentBatchUpload(e.dataTransfer.files);
  };

  const triggerReplace = (catId: string, fileId: string) => {
    setReplacingCatId(catId);
    setReplacingFileId(fileId);
    replaceInputRef.current?.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (filename: string) => {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
    }
    if (lower.endsWith('.json') || lower.endsWith('.xml')) {
      return <FileCode className="w-4 h-4 text-amber-400" />;
    }
    if (lower.endsWith('.zip') || lower.endsWith('.rar')) {
      return <FileArchive className="w-4 h-4 text-indigo-400" />;
    }
    return <FileText className="w-4 h-4 text-cyan-400" />;
  };

  // Seamless Automatic Transition into Phase 2 AI Analysis
  const handleBeginAIAnalysis = () => {
    setIsAnalyzingTransition(true);
    setTransitionStepText('Organizing Financial Records...');
    
    setTimeout(() => {
      setTransitionStepText('Preparing AI Analysis Engine...');
    }, 1000);

    setTimeout(() => {
      setIsAnalyzingTransition(false);
      setStep('ai-analyzing');
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in relative">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.xlsx,.csv,.zip,.json,.png,.jpg"
        onChange={(e) => handleIntelligentBatchUpload(e.target.files)}
      />
      <input
        ref={replaceInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.xlsx,.csv,.zip,.json,.png,.jpg"
        onChange={(e) => handleIntelligentBatchUpload(e.target.files, replacingCatId || undefined)}
      />

      {/* Transition Overlay */}
      {isAnalyzingTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-bg-secondary border border-cyan-500/40 text-center space-y-6 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center relative">
              <Loader2 className="w-8 h-8 animate-spin" />
              <Cpu className="w-4 h-4 absolute text-cyan-300" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Documents Received</h3>
              <p className="text-sm font-medium text-cyan-400 animate-pulse">{transitionStepText}</p>
            </div>

            <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 animate-pulse w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Title & Guidance Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 2 • Intelligent Intake</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Drop Your Financial Records Here
        </h1>

        <p className="text-sm sm:text-base text-text-secondary">
          Upload ledgers, bank statements, or returns together. DARP will automatically identify, group, and organize them.
        </p>
      </div>

      {/* Part 2: Primary Single Large Intelligent Upload Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center gap-4 group ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01] shadow-xl shadow-cyan-500/20'
            : 'glass-panel bg-bg-card hover:bg-bg-card-hover border-border-strong hover:border-cyan-400/60'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>

        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-text-primary">
            Drop your financial documents here or <span className="text-cyan-400 underline underline-offset-4">Browse Files</span>
          </h3>
          <p className="text-xs text-text-muted">
            Supported formats: <strong className="text-text-secondary">PDF, Excel (.xlsx, .csv), ZIP</strong>
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-bg-tertiary/70 border border-border-subtle text-xs text-text-secondary flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Upload all documents together — DARP will automatically organize them.</span>
        </div>
      </div>

      {/* Part 3 & 5: AI Document Recognition & Summary Dashboard */}
      {allUploadedFiles.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Dashboard */}
          <div className="p-6 rounded-2xl glass-panel bg-bg-secondary border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0 border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">Documents Received & Recognized</h4>
                <p className="text-xs text-text-muted mt-0.5">
                  <strong className="text-text-primary font-semibold">{totalUploadedFileCount} files</strong> categorized across <strong className="text-cyan-400 font-semibold">{recognizedCategories.length} categories</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-[10px] text-text-muted uppercase font-semibold block">Estimated Coverage</span>
                <span className="text-lg font-extrabold text-cyan-400">{estimatedCoverage}%</span>
              </div>
              <Button
                variant="glow"
                size="md"
                onClick={handleBeginAIAnalysis}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Begin AI Analysis
              </Button>
            </div>
          </div>

          {/* Part 3: AI-Recognized Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">
              AI Organized Categories
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recognizedCategories.map(({ requirement, files }) => (
                <div
                  key={requirement.id}
                  className="p-5 rounded-2xl glass-panel bg-bg-card border border-border-subtle space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h5 className="text-sm font-semibold text-text-primary">{requirement.title}</h5>
                    </div>
                    <Badge variant="cyan" size="sm">
                      {files.length} {files.length === 1 ? 'file' : 'files'}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-bg-secondary border border-border-subtle text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {getFileIcon(f.name)}
                          <span className="truncate font-medium text-text-primary">{f.name}</span>
                          <span className="text-[10px] text-text-muted">({formatSize(f.size)})</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <button
                            onClick={() => triggerReplace(requirement.id, f.id)}
                            className="p-1 rounded text-text-muted hover:text-cyan-400 transition-colors"
                            title="Replace"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeFile(requirement.id, f.id)}
                            className="p-1 rounded text-text-muted hover:text-red-400 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Part 4: Missing Document Detection (Friendly Suggestions) */}
      {missingRequirements.length > 0 && (
        <div className="p-6 rounded-2xl bg-bg-secondary/80 border border-border-subtle space-y-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-text-primary">
                Recommended Additional Documents
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                To improve the accuracy of your assessment for <strong className="text-cyan-400 font-medium">{selectedFocusAreas.length} selected areas</strong>, we recommend attaching:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {missingRequirements.map((req) => (
              <div
                key={req.id}
                onClick={() => fileInputRef.current?.click()}
                className="p-3 rounded-xl bg-bg-tertiary/60 border border-border-subtle hover:border-cyan-500/40 transition-all flex items-center justify-between gap-2 cursor-pointer group"
              >
                <div className="truncate">
                  <p className="text-xs font-semibold text-text-primary group-hover:text-cyan-400 transition-colors truncate">
                    {req.title}
                  </p>
                  <p className="text-[10px] text-text-muted">{req.recommendedType}</p>
                </div>
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <PlusCircle className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Guarantee Footer */}
      <div className="p-4 rounded-xl bg-bg-secondary/40 border border-border-subtle flex items-center justify-center gap-2 text-xs text-text-muted text-center">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span>Files are processed statelessly with 256-bit client-side encryption.</span>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border-subtle">
        <button
          onClick={() => setStep('analysis-focus')}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          ← Adjust Analysis Focus
        </button>

        <Button
          variant="glow"
          size="lg"
          onClick={handleBeginAIAnalysis}
          icon={<ArrowRight className="w-5 h-5" />}
        >
          {totalUploadedFileCount > 0 ? 'Automatically Begin AI Analysis' : 'Continue to AI Analysis'}
        </Button>
      </div>
    </div>
  );
};
