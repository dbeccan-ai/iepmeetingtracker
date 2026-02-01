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

  const navigateTab = (direction: "left" | "right") => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let newIndex: number;

    if (direction === "left") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }

    onTabChange(tabs[newIndex].id);
  };

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <nav className="flex items-center border-b border-white/20">
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

        {/* Progress Bar with Navigation Arrows */}
        <div className="flex items-center gap-0 px-2 py-3">
          <button 
            onClick={() => navigateTab("left")}
            className="p-2 text-white hover:text-white/80 transition-colors"
            title="Previous tab"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 h-3 bg-[#1a3a5c] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#2d5a7b] rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <button 
            onClick={() => navigateTab("right")}
            className="p-2 text-white hover:text-white/80 transition-colors"
            title="Next tab"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IEPTabs;
