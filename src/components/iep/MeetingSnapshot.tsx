import { Calendar } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface StudentInfo {
  name: string;
  grade: string;
  school: string;
  meetingDate: string;
  meetingType: string;
  primaryConcerns: string;
}

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
}

interface MeetingSnapshotProps {
  studentInfo: StudentInfo;
  contactInfo: ContactInfo;
  onStudentInfoChange: (info: StudentInfo) => void;
  onContactInfoChange: (info: ContactInfo) => void;
}

const MeetingSnapshot = ({
  studentInfo,
  contactInfo,
  onStudentInfoChange,
  onContactInfoChange,
}: MeetingSnapshotProps) => {
  const { t } = useLanguage();

  const meetingTypes = [
    { value: "Initial IEP", label: t("initialIep") },
    { value: "Annual Review", label: t("annualReview") },
    { value: "Triennial Review", label: t("triennialReview") },
    { value: "Amendment", label: t("amendment") },
    { value: "Manifestation Determination", label: t("manifestation") },
    { value: "Transition Planning", label: t("transitionPlanning") },
    { value: "Other", label: t("other") },
  ];

  return (
    <div className="space-y-6">
      <div className="iep-card">
        <h2 className="iep-section-title">{t("meetingSnapshotTitle")}</h2>

        {/* Student Information */}
        <div className="mb-8">
          <h3 className="iep-subsection-title">{t("studentInfo")}</h3>

          <div className="space-y-4">
            <div>
              <label className="iep-label">{t("studentName")}</label>
              <input
                type="text"
                className="iep-input"
                placeholder={t("studentNamePlaceholder")}
                value={studentInfo.name}
                onChange={(e) =>
                  onStudentInfoChange({ ...studentInfo, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="iep-label">{t("grade")}</label>
                <input
                  type="text"
                  className="iep-input"
                  placeholder={t("gradePlaceholder")}
                  value={studentInfo.grade}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, grade: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="iep-label">{t("school")}</label>
                <input
                  type="text"
                  className="iep-input"
                  placeholder={t("schoolPlaceholder")}
                  value={studentInfo.school}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, school: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="iep-label">{t("meetingDate")}</label>
                <div className="relative">
                  <input
                    type="date"
                    className="iep-input pr-10"
                    value={studentInfo.meetingDate}
                    onChange={(e) =>
                      onStudentInfoChange({ ...studentInfo, meetingDate: e.target.value })
                    }
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="iep-label">{t("meetingType")}</label>
                <select
                  className="iep-select"
                  value={studentInfo.meetingType}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, meetingType: e.target.value })
                  }
                >
                  <option value="">{t("selectType")}</option>
                  {meetingTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="iep-label">{t("primaryConcerns")}</label>
              <textarea
                className="iep-textarea"
                placeholder={t("primaryConcernsPlaceholder")}
                value={studentInfo.primaryConcerns}
                onChange={(e) =>
                  onStudentInfoChange({ ...studentInfo, primaryConcerns: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Main Contact at School */}
        <div>
          <h3 className="iep-subsection-title">{t("mainContact")}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t("caseManager")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="iep-label">{t("contactName")}</label>
              <input
                type="text"
                className="iep-input"
                placeholder={t("contactNamePlaceholder")}
                value={contactInfo.name}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="iep-label">{t("phone")}</label>
              <input
                type="tel"
                className="iep-input"
                placeholder={t("phonePlaceholder")}
                value={contactInfo.phone}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="iep-label">{t("email")}</label>
              <input
                type="email"
                className="iep-input"
                placeholder={t("emailPlaceholder")}
                value={contactInfo.email}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, email: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSnapshot;
