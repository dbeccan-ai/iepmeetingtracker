import { Calendar } from "lucide-react";

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
  const meetingTypes = [
    "Initial IEP",
    "Annual Review",
    "Triennial Review",
    "Amendment",
    "Manifestation Determination",
    "Transition Planning",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div className="iep-card">
        <h2 className="iep-section-title">IEP Meeting Snapshot</h2>

        {/* Student Information */}
        <div className="mb-8">
          <h3 className="iep-subsection-title">Student Information</h3>

          <div className="space-y-4">
            <div>
              <label className="iep-label">Student Name</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Enter student's full name"
                value={studentInfo.name}
                onChange={(e) =>
                  onStudentInfoChange({ ...studentInfo, name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="iep-label">Grade</label>
                <input
                  type="text"
                  className="iep-input"
                  placeholder="e.g., 3rd, 7th, 11th"
                  value={studentInfo.grade}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, grade: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="iep-label">School</label>
                <input
                  type="text"
                  className="iep-input"
                  placeholder="School name"
                  value={studentInfo.school}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, school: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="iep-label">Date of IEP Meeting</label>
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
                <label className="iep-label">Type of Meeting</label>
                <select
                  className="iep-select"
                  value={studentInfo.meetingType}
                  onChange={(e) =>
                    onStudentInfoChange({ ...studentInfo, meetingType: e.target.value })
                  }
                >
                  <option value="">Select type...</option>
                  {meetingTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="iep-label">Primary Concern(s)</label>
              <textarea
                className="iep-textarea"
                placeholder="What are your main concerns going into this meeting?"
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
          <h3 className="iep-subsection-title">Main Contact at School</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Case Manager / Special Ed Teacher
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="iep-label">Name</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Contact name"
                value={contactInfo.name}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="iep-label">Phone</label>
              <input
                type="tel"
                className="iep-input"
                placeholder="(123) 456-7890"
                value={contactInfo.phone}
                onChange={(e) =>
                  onContactInfoChange({ ...contactInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="iep-label">Email</label>
              <input
                type="email"
                className="iep-input"
                placeholder="email@school.edu"
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
