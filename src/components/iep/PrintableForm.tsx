import { useLanguage } from "@/i18n/LanguageContext";
import { Attendee } from "./AttendeeList";
import { Decision } from "./DecisionTracker";

interface PrintableFormProps {
  studentInfo: {
    name: string;
    grade: string;
    school: string;
    meetingDate: string;
    meetingType: string;
    primaryConcerns: string;
  };
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  attendees: Attendee[];
  documents: { id: string; label: string; checked: boolean }[];
  reflection: {
    topConcerns: string;
    strengths: string;
    challenges: string;
    homeSupports: string;
  };
  questionCategories: {
    id: string;
    title: string;
    description: string;
    questions: string[];
    notes: string;
  }[];
  decisions: Decision[];
  immediateItems: { id: string; label: string; checked: boolean; hasDate?: boolean; date?: string }[];
  weekItems: { id: string; label: string; checked: boolean; hasDate?: boolean; date?: string }[];
  beforeMeeting: {
    feelings: string;
    easyHard: string;
    teachersToKnow: string;
    gettingHelp: string;
  };
  afterMeeting: {
    whatTalkedAbout: string;
    schoolHelp: string;
    homeStrategies: string;
    childFeelings: string;
  };
}

const PrintableForm = ({
  studentInfo,
  contactInfo,
  attendees,
  documents,
  reflection,
  questionCategories,
  decisions,
  immediateItems,
  weekItems,
  beforeMeeting,
  afterMeeting,
}: PrintableFormProps) => {
  const { t } = useLanguage();

  return (
    <div className="print-only hidden print:block bg-card text-card-foreground p-8">
      {/* Print Header */}
      <div className="text-center mb-8 pb-4 border-b-2 print-border-blue">
        <h1 className="text-2xl font-bold print-text-blue mb-2">{t("appTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("appSubtitle")}</p>
      </div>

      {/* Section 1: Meeting Snapshot */}
      <div className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          1. {t("tabSnapshot")}
        </h2>
        
        <div className="mb-4">
          <h3 className="font-semibold print-text-gold mb-2">{t("studentInfo")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("studentName")}:</span>
              <div className="min-h-[24px]">{studentInfo.name || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("grade")}:</span>
              <div className="min-h-[24px]">{studentInfo.grade || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("school")}:</span>
              <div className="min-h-[24px]">{studentInfo.school || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("meetingDate")}:</span>
              <div className="min-h-[24px]">{studentInfo.meetingDate || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2 col-span-2">
              <span className="text-sm font-medium text-muted-foreground">{t("meetingType")}:</span>
              <div className="min-h-[24px]">{studentInfo.meetingType || "_________________"}</div>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-muted-foreground">{t("primaryConcerns")}:</span>
            <div className="min-h-[60px] border border-border rounded p-2 mt-1">
              {studentInfo.primaryConcerns || " "}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold print-text-gold mb-2">{t("mainContact")}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("name")}:</span>
              <div className="min-h-[24px]">{contactInfo.name || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("phone")}:</span>
              <div className="min-h-[24px]">{contactInfo.phone || "_________________"}</div>
            </div>
            <div className="border-b border-border pb-2">
              <span className="text-sm font-medium text-muted-foreground">{t("email")}:</span>
              <div className="min-h-[24px]">{contactInfo.email || "_________________"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Attendees */}
      <div className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          2. {t("tabAttendees")}
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="print-bg-light">
              <th className="border border-border p-2 text-left">{t("role")}</th>
              <th className="border border-border p-2 text-left">{t("name")}</th>
              <th className="border border-border p-2 text-left">{t("attending")}</th>
              <th className="border border-border p-2 text-left">{t("contactInfo")}</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td className="border border-border p-2">{attendee.role}</td>
                <td className="border border-border p-2 min-w-[100px]">{attendee.name || " "}</td>
                <td className="border border-border p-2">{attendee.attending || " "}</td>
                <td className="border border-border p-2">{attendee.contactInfo || " "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Pre-Meeting Prep */}
      <div className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          3. {t("tabPrep")}
        </h2>
        
        <h3 className="font-semibold print-text-gold mb-2">{t("documentsTitle")}</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-border rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                {doc.checked && <span className="text-xs">✓</span>}
              </div>
              <span className="text-sm">{doc.label}</span>
            </div>
          ))}
        </div>

        <h3 className="font-semibold print-text-gold mb-2 mt-6">{t("reflectionTitle")}</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("topConcerns")}</span>
            <div className="min-h-[60px] border border-border rounded p-2 mt-1">
              {reflection.topConcerns || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("strengths")}</span>
            <div className="min-h-[60px] border border-border rounded p-2 mt-1">
              {reflection.strengths || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("challenges")}</span>
            <div className="min-h-[60px] border border-border rounded p-2 mt-1">
              {reflection.challenges || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("homeSupports")}</span>
            <div className="min-h-[60px] border border-border rounded p-2 mt-1">
              {reflection.homeSupports || " "}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Question Bank */}
      <div className="mb-8">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          4. {t("tabQuestions")}
        </h2>
        {questionCategories.map((category) => (
          <div key={category.id} className="mb-6 page-break-inside-avoid">
            <h3 className="font-semibold print-text-gold mb-2">{category.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
            <ul className="text-sm space-y-1 mb-3">
              {category.questions.map((q, idx) => (
                <li key={idx} className="flex gap-2">
                  <span>•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <div>
              <span className="text-sm font-medium text-muted-foreground">{t("notesAndAnswers")}</span>
              <div className="min-h-[80px] border border-border rounded p-2 mt-1">
                {category.notes || " "}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 5: Decision Tracker */}
      <div className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          5. {t("tabDecisions")}
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="print-bg-light">
              <th className="border border-border p-2 text-left">{t("topicIssue")}</th>
              <th className="border border-border p-2 text-left">{t("whatTeamSaid")}</th>
              <th className="border border-border p-2 text-left">{t("servicesAgreed")}</th>
              <th className="border border-border p-2 text-left">{t("whoResponsible")}</th>
              <th className="border border-border p-2 text-left">{t("byWhen")}</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((decision) => (
              <tr key={decision.id}>
                <td className="border border-border p-2">{decision.topic}</td>
                <td className="border border-border p-2 min-h-[40px]">{decision.discussed || " "}</td>
                <td className="border border-border p-2">{decision.agreedOn || " "}</td>
                <td className="border border-border p-2">{decision.responsible || " "}</td>
                <td className="border border-border p-2">{decision.byWhen || " "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 6: Follow-Up Tracker */}
      <div className="mb-8 page-break-inside-avoid">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          6. {t("tabFollowUp")}
        </h2>
        
        <h3 className="font-semibold print-text-gold mb-2">{t("immediatelyAfter")}</h3>
        <div className="space-y-2 mb-4">
          {immediateItems.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-border rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                {item.checked && <span className="text-xs">✓</span>}
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        <h3 className="font-semibold print-text-gold mb-2">{t("within1to2Weeks")}</h3>
        <div className="space-y-2">
          {weekItems.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-border rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                {item.checked && <span className="text-xs">✓</span>}
              </div>
              <span className="text-sm">{item.label}</span>
              {item.hasDate && (
                <span className="border-b border-border min-w-[100px] inline-block">
                  {item.date || " "}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 7: Family Discussions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold print-text-blue border-b-2 print-border-gold pb-2 mb-4">
          7. {t("tabFamily")}
        </h2>
        
        <h3 className="font-semibold print-text-gold mb-2">{t("beforeMeeting")}</h3>
        <div className="space-y-4 mb-6">
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("howFeelAboutSchool")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {beforeMeeting.feelings || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("whatFeelsEasyHard")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {beforeMeeting.easyHard || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("whatTeachersKnow")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {beforeMeeting.teachersToKnow || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("getHelpNeeded")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {beforeMeeting.gettingHelp || " "}
            </div>
          </div>
        </div>

        <h3 className="font-semibold print-text-gold mb-2">{t("afterMeeting")}</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("whatWeTalkedAbout")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {afterMeeting.whatTalkedAbout || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("howSchoolHelps")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {afterMeeting.schoolHelp || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("whatWeTryAtHome")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {afterMeeting.homeStrategies || " "}
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">{t("howFeelAboutChanges")}</span>
            <div className="min-h-[50px] border border-border rounded p-2 mt-1">
              {afterMeeting.childFeelings || " "}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border mt-8">
        <p>{t("appTitle")} - Printed on {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PrintableForm;
