import { 
  FileText, 
  Users, 
  ClipboardCheck, 
  MessageSquare, 
  CheckCircle, 
  Calendar, 
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useRef } from "react";

export type TabId = 
  | "snapshot" 
  | "attendees" 
  | "prep" 
  | "questions" 
  | "decisions" 
  | "followup" 
  | "family";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "snapshot", label: "Meeting Snapshot", icon: <FileText className="w-4 h-4" /> },
  { id: "attendees", label: "Attendee List", icon: <Users className="w-4 h-4" /> },
  { id: "prep", label: "Pre-Meeting Prep", icon: <ClipboardCheck className="w-4 h-4" /> },
  { id: "questions", label: "Question Bank", icon: <MessageSquare className="w-4 h-4" /> },
  { id: "decisions", label: "Decision Tracker", icon: <CheckCircle className="w-4 h-4" /> },
  { id: "followup", label: "Follow-Up Tracker", icon: <Calendar className="w-4 h-4" /> },
  { id: "family", label: "Family Discussions", icon: <MessageCircle className="w-4 h-4" /> },
];

interface IEPTabsProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  progress: number;
}

const IEPTabs = ({ activeTab, onTabChange, progress }: IEPTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <nav className="flex items-center border-b border-foreground/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`iep-tab ${
                activeTab === tab.id ? "iep-tab-active" : "iep-tab-inactive"
              }`}
            >
              {tab.icon}
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 px-4 py-3">
          <button 
            onClick={() => scrollTabs("left")}
            className="p-1 hover:bg-foreground/20 rounded transition-colors text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 iep-progress-bar">
            <div 
              className="iep-progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <button 
            onClick={() => scrollTabs("right")}
            className="p-1 hover:bg-foreground/20 rounded transition-colors text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IEPTabs;
