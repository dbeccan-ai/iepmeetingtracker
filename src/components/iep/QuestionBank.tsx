import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface QuestionCategory {
  id: string;
  title: string;
  description: string;
  questions: string[];
  notes: string;
}

interface QuestionBankProps {
  categories: QuestionCategory[];
  onNotesChange: (categoryId: string, notes: string) => void;
}

const QuestionBank = ({ categories, onNotesChange }: QuestionBankProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0]?.id || null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="iep-info-box">
        <h3 className="font-semibold text-blue-800 mb-2">How to Use This Question Bank</h3>
        <p className="text-sm text-blue-700">
          You won't ask everything in one meeting. Use this as a reference to find questions relevant to your situation. 
          Take notes in the text areas to capture answers and important information during the meeting.
        </p>
      </div>

      {/* Question Categories */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="iep-card p-0 overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 bg-accent hover:bg-iep-gold-dark transition-colors"
            >
              <div className="text-left">
                <h3 className="font-semibold text-accent-foreground">{category.title}</h3>
                <p className="text-sm text-accent-foreground/70">{category.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm bg-white/80 px-2 py-1 rounded text-accent-foreground">
                  {category.questions.length} questions
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-accent-foreground transition-transform ${
                    openCategory === category.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {openCategory === category.id && (
              <div className="p-4 border-t border-accent/20">
                <div className="iep-info-box mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Questions to Consider:</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    {category.questions.map((question, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="iep-label font-semibold">Notes & Answers:</label>
                  <textarea
                    className="iep-textarea"
                    placeholder="Take notes here during or after the meeting..."
                    value={category.notes}
                    onChange={(e) => onNotesChange(category.id, e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionBank;
