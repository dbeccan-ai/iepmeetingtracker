import { Save, Download, Printer, LogOut, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

interface IEPHeaderProps {
  onSave: () => void;
  onExport: () => void;
  onPrint: () => void;
}

const IEPHeader = ({ onSave, onExport, onPrint }: IEPHeaderProps) => {
  const { t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };
  
  return (
    <header className="bg-background px-6 py-4 no-print">
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
          {isAdmin && (
            <button onClick={() => navigate("/admin")} className="iep-button-secondary" title="Admin Dashboard">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
          <button onClick={onPrint} className="iep-button-secondary" title={t("printFormDesc")}>
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{t("printForm")}</span>
          </button>
          <button onClick={onSave} className="iep-button-primary">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">{t("saveProgress")}</span>
          </button>
          <button onClick={onExport} className="iep-button-primary">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{t("export")}</span>
          </button>
          {user && (
            <button onClick={handleSignOut} className="iep-button-delete px-3 py-2" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default IEPHeader;
