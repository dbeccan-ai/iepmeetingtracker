import { Plus, Trash2, Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export interface Decision {
  id: string;
  topic: string;
  discussed: string;
  agreedOn: string;
  responsible: string;
  byWhen: string;
}

interface DecisionTrackerProps {
  decisions: Decision[];
  onDecisionsChange: (decisions: Decision[]) => void;
}

const DecisionTracker = ({ decisions, onDecisionsChange }: DecisionTrackerProps) => {
  const { t } = useLanguage();

  const defaultTopics = [
    t("readingSupport"),
    t("mathSupport"),
    t("behaviorPlan"),
    t("accommodations"),
    t("progressUpdates"),
    t("otherConcerns"),
  ];

  const addDecision = () => {
    const newDecision: Decision = {
      id: crypto.randomUUID(),
      topic: "",
      discussed: "",
      agreedOn: "",
      responsible: "",
      byWhen: "",
    };
    onDecisionsChange([...decisions, newDecision]);
  };

  const updateDecision = (id: string, field: keyof Decision, value: string) => {
    onDecisionsChange(
      decisions.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const removeDecision = (id: string) => {
    onDecisionsChange(decisions.filter((d) => d.id !== id));
  };

  return (
    <div className="iep-card">
      <div className="mb-6">
        <h2 className="iep-section-title">{t("decisionTrackerTitle")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("decisionTrackerDesc")}
        </p>
      </div>

      <button onClick={addDecision} className="iep-button-primary mb-6">
        <Plus className="w-4 h-4" />
        {t("addDecision")}
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-semibold text-card-foreground min-w-[150px]">
                {t("topicIssue")}
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-card-foreground min-w-[180px]">
                {t("whatTeamSaid")}
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-card-foreground min-w-[180px]">
                {t("servicesAgreed")}
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-card-foreground min-w-[140px]">
                {t("whoResponsible")}
              </th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-card-foreground min-w-[130px]">
                {t("byWhen")}
              </th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((decision) => (
              <tr key={decision.id} className="border-b border-gray-100">
                {/* Topic/Issue */}
                <td className="py-3 px-2 align-top">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={t("topicPlaceholder")}
                    value={decision.topic}
                    onChange={(e) => updateDecision(decision.id, "topic", e.target.value)}
                    list={`topics-list-${decision.id}`}
                  />
                  <datalist id={`topics-list-${decision.id}`}>
                    {defaultTopics.map((topic) => (
                      <option key={topic} value={topic} />
                    ))}
                  </datalist>
                </td>
                
                {/* What the Team Said / Decided */}
                <td className="py-3 px-2 align-top">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-y"
                    placeholder={t("discussedPlaceholder")}
                    value={decision.discussed}
                    onChange={(e) => updateDecision(decision.id, "discussed", e.target.value)}
                  />
                </td>
                
                {/* Services/Changes Agreed On */}
                <td className="py-3 px-2 align-top">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-y"
                    placeholder={t("agreedPlaceholder")}
                    value={decision.agreedOn}
                    onChange={(e) => updateDecision(decision.id, "agreedOn", e.target.value)}
                  />
                </td>
                
                {/* Who is Responsible */}
                <td className="py-3 px-2 align-top">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={t("responsiblePlaceholder")}
                    value={decision.responsible}
                    onChange={(e) => updateDecision(decision.id, "responsible", e.target.value)}
                  />
                </td>
                
                {/* By When */}
                <td className="py-3 px-2 align-top">
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
                      value={decision.byWhen}
                      onChange={(e) => updateDecision(decision.id, "byWhen", e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </td>
                
                {/* Delete Button */}
                <td className="py-3 px-2 align-top text-center">
                  <button
                    onClick={() => removeDecision(decision.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    aria-label="Remove decision"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {decisions.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          {t("noDecisions")}
        </p>
      )}
    </div>
  );
};

export default DecisionTracker;
