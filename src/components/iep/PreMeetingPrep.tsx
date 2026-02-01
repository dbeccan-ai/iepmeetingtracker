import { Check } from "lucide-react";

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

interface PreMeetingPrepProps {
  documents: DocumentItem[];
  reflection: ParentReflection;
  onDocumentsChange: (documents: DocumentItem[]) => void;
  onReflectionChange: (reflection: ParentReflection) => void;
}

const PreMeetingPrep = ({
  documents,
  reflection,
  onDocumentsChange,
  onReflectionChange,
}: PreMeetingPrepProps) => {
  const toggleDocument = (id: string) => {
    onDocumentsChange(
      documents.map((doc) =>
        doc.id === id ? { ...doc, checked: !doc.checked } : doc
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Documents to Gather */}
      <div className="iep-card">
        <h2 className="iep-section-title">Documents to Gather</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Check off as you collect each document
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

      {/* Parent Reflection */}
      <div className="iep-card">
        <h2 className="iep-section-title">Parent Reflection</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Take time to reflect on your child's needs and strengths
        </p>

        <div className="space-y-6">
          <div>
            <label className="iep-label font-semibold">
              My top 3 concerns for my child right now are:
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
              My child's strengths (academic, social, personality):
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What does your child do well? What do they enjoy?"
              value={reflection.strengths}
              onChange={(e) =>
                onReflectionChange({ ...reflection, strengths: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              What seems hardest for my child at school:
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What challenges does your child face? What causes frustration or stress?"
              value={reflection.challenges}
              onChange={(e) =>
                onReflectionChange({ ...reflection, challenges: e.target.value })
              }
            />
          </div>

          <div>
            <label className="iep-label font-semibold">
              Supports that seem to help at home:
            </label>
            <textarea
              className="iep-textarea"
              placeholder="What strategies, tools, or approaches work well for your child?"
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
