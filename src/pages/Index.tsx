import { useState, useCallback } from "react";
import { toast } from "sonner";
import IEPHeader from "@/components/iep/IEPHeader";
import IEPTabs, { TabId } from "@/components/iep/IEPTabs";
import MeetingSnapshot from "@/components/iep/MeetingSnapshot";
import AttendeeList, { Attendee } from "@/components/iep/AttendeeList";
import PreMeetingPrep from "@/components/iep/PreMeetingPrep";
import QuestionBank from "@/components/iep/QuestionBank";
import DecisionTracker, { Decision } from "@/components/iep/DecisionTracker";
import FollowUpTracker from "@/components/iep/FollowUpTracker";
import FamilyDiscussions from "@/components/iep/FamilyDiscussions";

// Initial data
const initialDocuments = [
  { id: "1", label: "Last IEP and any amendments", checked: false },
  { id: "2", label: "Latest evaluation report(s) (psychological, academic, speech, OT, etc.)", checked: false },
  { id: "3", label: "Report cards / progress reports", checked: false },
  { id: "4", label: "State test results (if available)", checked: false },
  { id: "5", label: "Work samples (tests, writing, math sheets, reading logs)", checked: false },
  { id: "6", label: "Behavior incident reports or notes (if behavior is a concern)", checked: false },
  { id: "7", label: "Notes from doctors / therapists (if relevant)", checked: false },
  { id: "8", label: "Any 504 plans or outside evaluations", checked: false },
];

const initialQuestionCategories = [
  {
    id: "levels",
    title: "Present Levels & Evaluation",
    description: "Understanding where your child is now",
    questions: [
      "What do the current test scores and data actually mean in plain language?",
      "Where is my child performing compared to grade-level expectations?",
      "What are my child's biggest strengths in school right now?",
      "What are the main areas of need (reading, writing, math, behavior, social, communication, etc.)?",
      "Have there been any changes in my child's performance this year compared to last year?",
      "Is there any concern about attention, memory, or processing speed?",
      "Does my child qualify under a specific disability category? Which one and why?",
    ],
    notes: "",
  },
  {
    id: "goals",
    title: "Goals",
    description: "Understanding IEP goals and progress measurement",
    questions: [
      "What are the specific IEP goals for this year?",
      "How were these goals chosen? What data supports them?",
      "Are the goals realistic but still challenging?",
      "How will progress toward each goal be measured?",
      "How often will I receive progress reports on these goals?",
      "What would \"success\" look like by the end of the year for each goal?",
    ],
    notes: "",
  },
  {
    id: "services",
    title: "Services & Supports",
    description: "Understanding what help your child will receive",
    questions: [
      "What special education services will my child receive (resource room, push-in support, etc.)?",
      "How many minutes per week for each service? (Reading, math, speech, OT, counseling, etc.)",
      "Where will my child receive services (general ed classroom, separate room, group, individual)?",
      "What accommodations will my child receive in the classroom? (examples: extra time, quiet setting, read-aloud tests)",
      "Are there any modifications to the curriculum? (different assignments, reduced workload, alternate materials)",
      "How will the general education teacher be supported to help my child?",
      "Is my child getting enough time and intensity in services to realistically meet these goals?",
    ],
    notes: "",
  },
  {
    id: "placement",
    title: "Classroom Placement & Least Restrictive Environment (LRE)",
    description: "Understanding where services are provided",
    questions: [
      "Where will my child spend most of their day? (general education, inclusion, special class)",
      "What is the least restrictive environment my child can be in and still succeed?",
      "What supports would help my child stay in or move toward a more inclusive setting?",
      "Will my child be pulled out during core subjects? If so, which ones?",
    ],
    notes: "",
  },
  {
    id: "behavior",
    title: "Behavior & Social-Emotional",
    description: "Questions about behavior support and social skills",
    questions: [
      "Are there any behavior concerns at school? What patterns do you see?",
      "Has a Functional Behavioral Assessment (FBA) been done? If not, should we request one?",
      "Is there a Behavior Intervention Plan (BIP)? Can we review it together?",
      "What positive behavior supports are in place?",
      "How will the school respond when my child has a hard moment or meltdown?",
      "How will those incidents be communicated to me?",
    ],
    notes: "",
  },
  {
    id: "testing",
    title: "Testing & Accommodations (State/Local)",
    description: "Understanding testing supports and requirements",
    questions: [
      "What testing accommodations will my child receive on quizzes, tests, and state exams?",
      "Will my child take the same state assessments as peers or an alternate assessment?",
      "How will testing accommodations be communicated to all teachers?",
    ],
    notes: "",
  },
  {
    id: "transition",
    title: "Transition & Long-Term Planning",
    description: "Looking ahead (especially important for older students)",
    questions: [
      "For middle/high school: What is the transition plan for after high school?",
      "What are we doing now to build independent skills (organization, self-advocacy, life skills)?",
      "Does my child understand their IEP and how to speak up for their needs?",
    ],
    notes: "",
  },
  {
    id: "communication",
    title: "Communication & Follow-Up",
    description: "Staying informed and connected",
    questions: [
      "Who is my main point of contact if I have questions after this meeting?",
      "How often will we communicate (weekly email, monthly check-in, portal)?",
      "What's the best way to reach you (email/phone/portal)?",
      "When will I receive a final copy of the IEP?",
      "Can we schedule a follow-up meeting or check-in date now?",
    ],
    notes: "",
  },
  {
    id: "other",
    title: "Other Important Questions",
    description: "Additional topics to consider",
    questions: [
      "What assistive technology might help my child? (text-to-speech, calculator, organizational apps)",
      "Are there extended school year (ESY) services available for summer?",
      "How does the transportation plan support my child's needs?",
      "What happens if I disagree with part of the IEP?",
      "Can I request an Independent Educational Evaluation (IEE)?",
      "What are my rights as a parent in this process?",
      "Is there a parent training or support group I can join?",
    ],
    notes: "",
  },
];

const initialAttendees: Attendee[] = [
  { id: "1", role: "Parent/Guardian", name: "", attending: "", contactInfo: "" },
  { id: "2", role: "Student (if appropriate)", name: "", attending: "", contactInfo: "" },
  { id: "3", role: "Special Education Teacher/Case Manager", name: "", attending: "", contactInfo: "" },
  { id: "4", role: "General Education Teacher", name: "", attending: "", contactInfo: "" },
  { id: "5", role: "School Psychologist", name: "", attending: "", contactInfo: "" },
  { id: "6", role: "Related Service Providers (OT, PT, Speech)", name: "", attending: "", contactInfo: "" },
  { id: "7", role: "Administrator (AP, Principal, SpEd Coordinator)", name: "", attending: "", contactInfo: "" },
  { id: "8", role: "District Representative", name: "", attending: "", contactInfo: "" },
  { id: "9", role: "Interpreter (if needed)", name: "", attending: "", contactInfo: "" },
  { id: "10", role: "Advocate (if parent invited one)", name: "", attending: "", contactInfo: "" },
  { id: "11", role: "Others (Tutor, Behavior Specialist, etc.)", name: "", attending: "", contactInfo: "" },
];

const initialDecisions: Decision[] = [
  { id: "1", topic: "Reading Support", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
  { id: "2", topic: "Math Support", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
  { id: "3", topic: "Behavior Plan", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
  { id: "4", topic: "Accommodations", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
  { id: "5", topic: "Progress Updates", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
  { id: "6", topic: "Other Parent Concerns", discussed: "", agreedOn: "", responsible: "", byWhen: "" },
];

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  hasDate?: boolean;
  date?: string;
}

const initialImmediateItems: ChecklistItem[] = [
  { id: "1", label: "I received a draft or final copy of the IEP", checked: false },
  { id: "2", label: "I reviewed the IEP to see if it matches what was discussed", checked: false },
  { id: "3", label: "I wrote down any questions I still have", checked: false },
];

const initialWeekItems: ChecklistItem[] = [
  { id: "1", label: "I confirmed when services start (date):", checked: false, hasDate: true, date: "" },
  { id: "2", label: "I confirmed how often I will receive progress reports", checked: false },
  { id: "3", label: "I added important dates to my calendar (progress report dates, next IEP, follow-up meeting)", checked: false },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("snapshot");

  // Meeting Snapshot state
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    grade: "",
    school: "",
    meetingDate: "",
    meetingType: "",
    primaryConcerns: "",
  });

  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Attendee List state
  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees);

  // Pre-Meeting Prep state
  const [documents, setDocuments] = useState(initialDocuments);
  const [reflection, setReflection] = useState({
    topConcerns: "",
    strengths: "",
    challenges: "",
    homeSupports: "",
  });

  // Question Bank state
  const [questionCategories, setQuestionCategories] = useState(initialQuestionCategories);

  // Decision Tracker state
  const [decisions, setDecisions] = useState<Decision[]>(initialDecisions);

  // Follow-Up Tracker state
  const [immediateItems, setImmediateItems] = useState(initialImmediateItems);
  const [weekItems, setWeekItems] = useState(initialWeekItems);
  const [monthlyLogs, setMonthlyLogs] = useState<{ id: string; month: string; notes: string }[]>([]);

  // Family Discussions state
  const [beforeMeeting, setBeforeMeeting] = useState({
    feelings: "",
    easyHard: "",
    teachersToKnow: "",
    gettingHelp: "",
  });

  const [afterMeeting, setAfterMeeting] = useState({
    whatTalkedAbout: "",
    schoolHelp: "",
    homeStrategies: "",
    childFeelings: "",
  });

  // Calculate progress
  const calculateProgress = useCallback(() => {
    let filled = 0;
    let total = 0;

    // Student info
    Object.values(studentInfo).forEach((v) => {
      total++;
      if (v) filled++;
    });

    // Contact info
    Object.values(contactInfo).forEach((v) => {
      total++;
      if (v) filled++;
    });

    // Documents
    total += documents.length;
    filled += documents.filter((d) => d.checked).length;

    // Reflection
    Object.values(reflection).forEach((v) => {
      total++;
      if (v) filled++;
    });

    return Math.round((filled / total) * 100);
  }, [studentInfo, contactInfo, documents, reflection]);

  const handleNotesChange = (categoryId: string, notes: string) => {
    setQuestionCategories(
      questionCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, notes } : cat
      )
    );
  };

  const handleSave = () => {
    const data = {
      studentInfo,
      contactInfo,
      attendees,
      documents,
      reflection,
      questionCategories,
      decisions,
      immediateItems,
      weekItems,
      monthlyLogs,
      beforeMeeting,
      afterMeeting,
    };
    localStorage.setItem("iep-tracker-data", JSON.stringify(data));
    toast.success("Progress saved successfully!");
  };

  const handleExport = () => {
    const data = {
      studentInfo,
      contactInfo,
      attendees,
      documents,
      reflection,
      questionCategories,
      decisions,
      immediateItems,
      weekItems,
      monthlyLogs,
      beforeMeeting,
      afterMeeting,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iep-tracker-${studentInfo.name || "export"}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "snapshot":
        return (
          <MeetingSnapshot
            studentInfo={studentInfo}
            contactInfo={contactInfo}
            onStudentInfoChange={setStudentInfo}
            onContactInfoChange={setContactInfo}
          />
        );
      case "attendees":
        return (
          <AttendeeList
            attendees={attendees}
            onAttendeesChange={setAttendees}
          />
        );
      case "prep":
        return (
          <PreMeetingPrep
            documents={documents}
            reflection={reflection}
            onDocumentsChange={setDocuments}
            onReflectionChange={setReflection}
          />
        );
      case "questions":
        return (
          <QuestionBank
            categories={questionCategories}
            onNotesChange={handleNotesChange}
          />
        );
      case "decisions":
        return (
          <DecisionTracker
            decisions={decisions}
            onDecisionsChange={setDecisions}
          />
        );
      case "followup":
        return (
          <FollowUpTracker
            immediateItems={immediateItems}
            weekItems={weekItems}
            monthlyLogs={monthlyLogs}
            onImmediateChange={setImmediateItems}
            onWeekChange={setWeekItems}
            onMonthlyLogsChange={setMonthlyLogs}
          />
        );
      case "family":
        return (
          <FamilyDiscussions
            beforeMeeting={beforeMeeting}
            afterMeeting={afterMeeting}
            onBeforeChange={setBeforeMeeting}
            onAfterChange={setAfterMeeting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <IEPHeader onSave={handleSave} onExport={handleExport} />
      <IEPTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        progress={calculateProgress()}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;
