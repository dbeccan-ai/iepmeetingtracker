import { Save, Download } from "lucide-react";

interface IEPHeaderProps {
  onSave: () => void;
  onExport: () => void;
}

const IEPHeader = ({ onSave, onExport }: IEPHeaderProps) => {
  return (
    <header className="bg-background px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            IEP Meeting Preparation Tool
          </h1>
          <p className="text-foreground/80 text-sm mt-1">
            Organize your thoughts and questions before your child's IEP meeting
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onSave} className="iep-button-primary">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Progress</span>
          </button>
          <button onClick={onExport} className="iep-button-primary">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default IEPHeader;
