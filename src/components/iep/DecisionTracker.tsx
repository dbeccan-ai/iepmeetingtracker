import { Plus, Trash2, Calendar } from "lucide-react";

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

const defaultTopics = [
  "Reading Support",
  "Math Support",
  "Behavior Plan",
  "Accommodations",
  "Progress Updates",
  "Other Parent Concerns",
];

const DecisionTracker = ({ decisions, onDecisionsChange }: DecisionTrackerProps) => {
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
        <h2 className="iep-section-title">During-Meeting Decision Tracker</h2>
        <p className="text-sm text-muted-foreground">
          Fill out during the meeting so you don't walk out thinking "Wait, what did we even decide?"
        </p>
      </div>

      <button onClick={addDecision} className="iep-button-primary mb-6">
        <Plus className="w-4 h-4" />
        Add Decision
      </button>

      {/* Table Header - Desktop */}
      <div className="hidden lg:grid grid-cols-12 gap-3 mb-3 px-2">
        <div className="col-span-2 text-sm font-semibold text-card-foreground">Topic / Issue</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">What the Team Said / Decided</div>
        <div className="col-span-3 text-sm font-semibold text-card-foreground">Services/Changes Agreed On</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">Who is Responsible</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">By When</div>
        <div className="col-span-1"></div>
      </div>

      {/* Decision Rows */}
      <div className="space-y-3">
        {decisions.map((decision) => (
          <div
            key={decision.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 bg-muted/30 rounded-lg items-start"
          >
            <div className="lg:col-span-2">
              <label className="lg:hidden iep-label">Topic / Issue</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Topic"
                value={decision.topic}
                onChange={(e) => updateDecision(decision.id, "topic", e.target.value)}
                list="topics-list"
              />
              <datalist id="topics-list">
                {defaultTopics.map((topic) => (
                  <option key={topic} value={topic} />
                ))}
              </datalist>
            </div>
            <div className="lg:col-span-2">
              <label className="lg:hidden iep-label">What the Team Said / Decided</label>
              <input
                type="text"
                className="iep-input"
                placeholder="What was discussed..."
                value={decision.discussed}
                onChange={(e) => updateDecision(decision.id, "discussed", e.target.value)}
              />
            </div>
            <div className="lg:col-span-3">
              <label className="lg:hidden iep-label">Services/Changes Agreed On</label>
              <input
                type="text"
                className="iep-input"
                placeholder="What was agreed upon..."
                value={decision.agreedOn}
                onChange={(e) => updateDecision(decision.id, "agreedOn", e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <label className="lg:hidden iep-label">Who is Responsible</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Name or role"
                value={decision.responsible}
                onChange={(e) => updateDecision(decision.id, "responsible", e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <label className="lg:hidden iep-label">By When</label>
              <div className="relative">
                <input
                  type="date"
                  className="iep-input pr-10"
                  value={decision.byWhen}
                  onChange={(e) => updateDecision(decision.id, "byWhen", e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-1 flex justify-end">
              <button
                onClick={() => removeDecision(decision.id)}
                className="iep-button-delete"
                aria-label="Remove decision"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {decisions.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No decisions tracked yet. Click "Add Decision" during your meeting.
        </p>
      )}
    </div>
  );
};

export default DecisionTracker;
