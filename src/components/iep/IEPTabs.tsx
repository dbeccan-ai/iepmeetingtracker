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
import { useRef, useEffect, useState, useCallback } from "react";

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
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

  // Handle drag to change tab
  const handleDrag = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Convert percentage to tab index
    const tabIndex = Math.round((percentage / 100) * (tabs.length - 1));
    const clampedIndex = Math.max(0, Math.min(tabs.length - 1, tabIndex));
    
    if (tabs[clampedIndex].id !== activeTab) {
      onTabChange(tabs[clampedIndex].id);
    }
  }, [activeTab, onTabChange]);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleDrag(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleDrag(e.clientX);
    }
  }, [isDragging, handleDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleDrag(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      handleDrag(e.touches[0].clientX);
    }
  }, [isDragging, handleDrag]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeButton = scrollRef.current.querySelector('[data-active="true"]');
      if (activeButton) {
        activeButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  // Handle click on track
  const handleTrackClick = (e: React.MouseEvent) => {
    handleDrag(e.clientX);
  };

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
          <div 
            ref={trackRef}
            className="flex-1 h-3 bg-[#1a3a5c] rounded-full relative cursor-pointer"
            onClick={handleTrackClick}
          >
            {/* Slider Thumb/Handle */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md cursor-grab transition-transform duration-100 hover:scale-110 ${isDragging ? 'cursor-grabbing scale-110' : ''}`}
              style={{ 
                left: `calc(${sliderPosition}% - 10px)`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
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
