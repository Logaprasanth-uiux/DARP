import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  FileArchive
} from 'lucide-react';
import type { DocumentRequirement, UploadedFileItem } from '../../types/darp';
import { documentService } from '../../services/documentService';

interface UploadCardProps {
  requirement: DocumentRequirement;
  uploadedFiles: UploadedFileItem[];
  onAddFile: (fileItem: UploadedFileItem) => void;
  onRemoveFile: (fileId: string) => void;
  onReplaceFile: (fileId: string, newFileItem: UploadedFileItem) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  requirement,
  uploadedFiles,
  onAddFile,
  onRemoveFile,
  onReplaceFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [replacingFileId, setReplacingFileId] = useState<string | null>(null);

  const hasUploads = uploadedFiles.length > 0;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = await documentService.uploadDocument(file, requirement.id);
      if (replacingFileId) {
        onReplaceFile(replacingFileId, item);
        setReplacingFileId(null);
      } else {
        onAddFile(item);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const triggerReplace = (fileId: string) => {
    setReplacingFileId(fileId);
    replaceInputRef.current?.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (filename: string) => {
    const lower = filename.toLowerCase();
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    }
    if (lower.endsWith('.json') || lower.endsWith('.xml')) {
      return <FileCode className="w-5 h-5 text-amber-400" />;
    }
    if (lower.endsWith('.zip') || lower.endsWith('.rar')) {
      return <FileArchive className="w-5 h-5 text-indigo-400" />;
    }
    return <FileText className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-border-strong transition-all">
      {/* Category Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-text-primary">{requirement.title}</h4>
            {requirement.isRequired ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium uppercase">
                Required
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-500/10 text-text-muted border border-border-subtle font-medium uppercase">
                Optional
              </span>
            )}
          </div>
          <p className="text-xs text-text-secondary mt-1">{requirement.description}</p>
        </div>

        {hasUploads ? (
          <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{uploadedFiles.length} Uploaded</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-text-muted shrink-0 bg-bg-tertiary px-2.5 py-1 rounded-full border border-border-subtle">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Pending</span>
          </span>
        )}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept={requirement.acceptedFormats.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={replaceInputRef}
        type="file"
        className="hidden"
        accept={requirement.acceptedFormats.join(',')}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-5 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
            : 'border-border-subtle hover:border-cyan-500/40 bg-bg-tertiary/40 hover:bg-bg-tertiary/80'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
          <UploadCloud className="w-5 h-5" />
        </div>

        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-medium text-text-primary">
            <span className="text-cyan-400 underline underline-offset-2">Click to browse</span> or drag & drop files here
          </p>
          <p className="text-[11px] text-text-muted">
            Formats: {requirement.acceptedFormats.join(', ')} ({requirement.recommendedType})
          </p>
        </div>
      </div>

      {/* Uploaded File List */}
      {hasUploads && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary border border-border-subtle hover:border-border-strong transition-all text-xs"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-bg-tertiary shrink-0">
                  {getFileIcon(file.name)}
                </div>
                <div className="truncate">
                  <p className="font-medium text-text-primary truncate">{file.name}</p>
                  <p className="text-[10px] text-text-muted">{formatSize(file.size)} • Ready for analysis</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerReplace(file.id);
                  }}
                  className="p-1.5 rounded-lg text-text-muted hover:text-cyan-400 hover:bg-bg-tertiary transition-colors"
                  title="Replace file"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(file.id);
                  }}
                  className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-bg-tertiary transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
