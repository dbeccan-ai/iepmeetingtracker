import { Check, Upload, X, FileText, Image } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface DocumentItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ParentReflection {
  topConcerns: string;
  strengths: string;
  challenges: string;
  homeSupports: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

interface PreMeetingPrepProps {
  documents: DocumentItem[];
  reflection: ParentReflection;
  uploadedFiles: UploadedFile[];
  onDocumentsChange: (documents: DocumentItem[]) => void;
  onReflectionChange: (reflection: ParentReflection) => void;
  onUploadedFilesChange: (files: UploadedFile[]) => void;
}

const PreMeetingPrep = ({
  documents,
  reflection,
  uploadedFiles,
  onDocumentsChange,
  onReflectionChange,
  onUploadedFilesChange,
}: PreMeetingPrepProps) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const toggleDocument = (id: string) => {
    onDocumentsChange(
      documents.map((doc) =>
        doc.id === id ? { ...doc, checked: !doc.checked } : doc
      )
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file) => {
      if (isValidFile(file)) {
        newFiles.push({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        });
      }
    });
    
    if (newFiles.length > 0) {
      onUploadedFilesChange([...uploadedFiles, ...newFiles]);
    }
  }, [uploadedFiles, onUploadedFilesChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    onUploadedFilesChange(uploadedFiles.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <Image className="w-5 h-5 text-primary" />;
    }
    return <FileText className="w-5 h-5 text-primary" />;
  };

  return (
    <div className="space-y-6">
      {/* Documents to Gather */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("documentsTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t("documentsDesc")}
        </p>

        <div className="space-y-2">
          {documents.map((doc) => (
            <label key={doc.id} className="iep-checkbox-label">
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                  doc.checked
                    ? "bg-accent border-accent"
                    : "border-border bg-white"
                }`}
                onClick={() => toggleDocument(doc.id)}
              >
                {doc.checked && <Check className="w-3 h-3 text-accent-foreground" />}
              </div>
              <span className={doc.checked ? "line-through text-muted-foreground" : ""}>
                {doc.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Upload Documents */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("uploadDocuments")}</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t("uploadDesc")}
        </p>

        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="mb-2"
          >
            {t("selectFiles")}
          </Button>
          <p className="text-sm text-muted-foreground">{t("dragDrop")}</p>
          <p className="text-xs text-muted-foreground mt-2">{t("supportedFormats")}</p>
        </div>

        {/* Uploaded Files List */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">{t("uploadedFiles")}</h3>
          {uploadedFiles.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{t("noFilesUploaded")}</p>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">{t("removeFile")}</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Parent Reflection */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("reflectionTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("reflectionDesc")}
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              {t("topConcerns")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder="1.&#10;2.&#10;3."
              value={reflection.topConcerns}
              onChange={(e) =>
                onReflectionChange({ ...reflection, topConcerns: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("strengths")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder=""
              value={reflection.strengths}
              onChange={(e) =>
                onReflectionChange({ ...reflection, strengths: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("challenges")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder=""
              value={reflection.challenges}
              onChange={(e) =>
                onReflectionChange({ ...reflection, challenges: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              {t("homeSupports")}
            </label>
            <textarea
              className="iep-textarea"
              placeholder=""
              value={reflection.homeSupports}
              onChange={(e) =>
                onReflectionChange({ ...reflection, homeSupports: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreMeetingPrep;
