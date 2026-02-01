import { Save, Download } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface IEPHeaderProps {
  onSave: () => void;
  onExport: () => void;
}

const IEPHeader = ({ onSave, onExport }: IEPHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-background px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("appTitle")}
          </h1>
          <p className="text-foreground/80 text-sm mt-1">
            {t("appSubtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <LanguageSwitcher />
          <button onClick={onSave} className="iep-button-primary">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">{t("saveProgress")}</span>
          </button>
          <button onClick={onExport} className="iep-button-primary">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("export")}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default IEPHeader;
