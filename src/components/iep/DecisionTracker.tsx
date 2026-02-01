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
          Fill this out during the meeting so you don't walk out thinking, "Wait, what did we even decide?"
        </p>
      </div>

      <button onClick={addDecision} className="iep-button-primary mb-6">
        <Plus className="w-4 h-4" />
        Add Decision
      </button>

      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-[180px_1fr_1fr_160px_140px_50px] gap-4 mb-4 px-2">
        <div className="text-sm font-semibold text-card-foreground">Topic / Issue</div>
        <div className="text-sm font-semibold text-card-foreground">What the Team Said / Decided</div>
        <div className="text-sm font-semibold text-card-foreground">Services/Changes Agreed On</div>
        <div className="text-sm font-semibold text-card-foreground">Who is Responsible</div>
        <div className="text-sm font-semibold text-card-foreground">By When</div>
        <div></div>
      </div>

      {/* Decision Rows */}
      <div className="space-y-4">
        {decisions.map((decision) => (
          <div
            key={decision.id}
            className="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr_160px_140px_50px] gap-4 items-start"
          >
            {/* Topic/Issue */}
            <div>
              <label className="lg:hidden iep-label">Topic / Issue</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Reading Support"
                value={decision.topic}
                onChange={(e) => updateDecision(decision.id, "topic", e.target.value)}
                list={`topics-list-${decision.id}`}
              />
              <datalist id={`topics-list-${decision.id}`}>
                {defaultTopics.map((topic) => (
                  <option key={topic} value={topic} />
                ))}
              </datalist>
            </div>
            
            {/* What the Team Said / Decided */}
            <div>
              <label className="lg:hidden iep-label">What the Team Said / Decided</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-y"
                placeholder="What was discussed..."
                value={decision.discussed}
                onChange={(e) => updateDecision(decision.id, "discussed", e.target.value)}
              />
            </div>
            
            {/* Services/Changes Agreed On */}
            <div>
              <label className="lg:hidden iep-label">Services/Changes Agreed On</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[60px] resize-y"
                placeholder="What was agreed upon..."
                value={decision.agreedOn}
                onChange={(e) => updateDecision(decision.id, "agreedOn", e.target.value)}
              />
            </div>
            
            {/* Who is Responsible */}
            <div>
              <label className="lg:hidden iep-label">Who is Responsible</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Name or role"
                value={decision.responsible}
                onChange={(e) => updateDecision(decision.id, "responsible", e.target.value)}
              />
            </div>
            
            {/* By When */}
            <div>
              <label className="lg:hidden iep-label">By When</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 pr-10"
                  value={decision.byWhen}
                  onChange={(e) => updateDecision(decision.id, "byWhen", e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            {/* Delete Button */}
            <div className="flex justify-center items-start pt-2">
              <button
                onClick={() => removeDecision(decision.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Remove decision"
              >
                <Trash2 className="w-5 h-5" />
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
