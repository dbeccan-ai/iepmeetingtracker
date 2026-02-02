import { Check, Plus, Trash2, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  hasDate?: boolean;
  date?: string;
}

interface MonthlyLog {
  id: string;
  month: string;
  notes: string;
}

interface FollowUpTrackerProps {
  immediateItems: ChecklistItem[];
  weekItems: ChecklistItem[];
  monthlyLogs: MonthlyLog[];
  onImmediateChange: (items: ChecklistItem[]) => void;
  onWeekChange: (items: ChecklistItem[]) => void;
  onMonthlyLogsChange: (logs: MonthlyLog[]) => void;
}

const FollowUpTracker = ({
  immediateItems,
  weekItems,
  monthlyLogs,
  onImmediateChange,
  onWeekChange,
  onMonthlyLogsChange,
}: FollowUpTrackerProps) => {
  const { t } = useLanguage();

  const toggleItem = (
    items: ChecklistItem[],
    onChange: (items: ChecklistItem[]) => void,
    id: string
  ) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItemDate = (
    items: ChecklistItem[],
    onChange: (items: ChecklistItem[]) => void,
    id: string,
    date: string
  ) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, date } : item))
    );
  };

  const addMonth = () => {
    const newLog: MonthlyLog = {
      id: crypto.randomUUID(),
      month: "",
      notes: "",
    };
    onMonthlyLogsChange([...monthlyLogs, newLog]);
  };

  const updateLog = (id: string, field: keyof MonthlyLog, value: string) => {
    onMonthlyLogsChange(
      monthlyLogs.map((log) => (log.id === id ? { ...log, [field]: value } : log))
    );
  };

  const removeLog = (id: string) => {
    onMonthlyLogsChange(monthlyLogs.filter((log) => log.id !== id));
  };

  const ChecklistSection = ({
    items,
    onChange,
  }: {
    items: ChecklistItem[];
    onChange: (items: ChecklistItem[]) => void;
  }) => (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="space-y-2">
          <label className="iep-checkbox-label">
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors cursor-pointer ${
                item.checked ? "bg-accent border-accent" : "border-border bg-white"
              }`}
              onClick={() => toggleItem(items, onChange, item.id)}
            >
              {item.checked && <Check className="w-3 h-3 text-accent-foreground" />}
            </div>
            <span className={item.checked ? "line-through text-muted-foreground" : ""}>
              {item.label}
            </span>
          </label>
          {item.hasDate && (
            <div className="ml-8">
              <div className="relative max-w-xs">
                <input
                  type="date"
                  className="iep-input pr-10"
                  value={item.date || ""}
                  onChange={(e) => updateItemDate(items, onChange, item.id, e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* After the IEP Card */}
      <div className="iep-card">
        <h2 className="iep-section-title">{t("followUpTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t("followUpDesc")}
        </p>

        {/* Immediately After Meeting */}
        <div className="mb-8">
          <h3 className="iep-subsection-title">
            {t("immediatelyAfter")}
          </h3>
          <ChecklistSection items={immediateItems} onChange={onImmediateChange} />
        </div>
      </div>

      {/* Within 1-2 Weeks */}
      <div className="iep-card">
        <h3 className="iep-subsection-title">{t("within1to2Weeks")}</h3>
        <ChecklistSection items={weekItems} onChange={onWeekChange} />
      </div>

      {/* Ongoing Monitoring */}
      <div className="iep-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="iep-subsection-title">{t("ongoingMonitoring")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("ongoingMonitoringDesc")}
            </p>
          </div>
          <button onClick={addMonth} className="iep-button-primary">
            <Plus className="w-4 h-4" />
            {t("addMonth")}
          </button>
        </div>

        {monthlyLogs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {t("noMonthlyLogs")}
          </p>
        ) : (
          <div className="space-y-4">
            {monthlyLogs.map((log) => (
              <div key={log.id} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <input
                      type="month"
                      className="iep-input max-w-xs"
                      value={log.month}
                      onChange={(e) => updateLog(log.id, "month", e.target.value)}
                    />
                    <textarea
                      className="iep-textarea"
                      placeholder={t("monthlyNotesPlaceholder")}
                      value={log.notes}
                      onChange={(e) => updateLog(log.id, "notes", e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => removeLog(log.id)}
                    className="iep-button-delete"
                    aria-label="Remove month"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUpTracker;
