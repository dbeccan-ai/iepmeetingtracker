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
import { useRef, useEffect } from "react";

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

const IEPTabs = ({ activeTab, onTabChange }: IEPTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
  
  // Calculate slider position based on current tab (0 to 100)
  const sliderPosition = (currentIndex / (tabs.length - 1)) * 100;

  const navigateTab = (direction: "left" | "right") => {
    let newIndex: number;

    if (direction === "left") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : tabs.length - 1;
    }

    onTabChange(tabs[newIndex].id);
  };

  // Scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeButton = scrollRef.current.querySelector('[data-active="true"]');
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation - Scrollable */}
        <nav 
          ref={scrollRef}
          className="flex items-center overflow-x-auto scrollbar-hide border-b border-white/20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`iep-tab flex-shrink-0 ${
                activeTab === tab.id ? "iep-tab-active" : "iep-tab-inactive"
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Slider Navigation Bar */}
        <div className="flex items-center gap-0 px-2 py-3">
          <button 
            onClick={() => navigateTab("left")}
            className="p-2 text-white hover:text-white/80 transition-colors"
            title="Previous tab"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Slider Track */}
          <div className="flex-1 h-3 bg-[#1a3a5c] rounded-full relative">
            {/* Slider Thumb/Handle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-pointer transition-all duration-300 hover:scale-110"
              style={{ 
                left: `calc(${sliderPosition}% - 8px)`,
              }}
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
