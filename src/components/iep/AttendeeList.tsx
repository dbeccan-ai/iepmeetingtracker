import { Plus, Trash2 } from "lucide-react";

export interface Attendee {
  id: string;
  role: string;
  name: string;
  attending: string;
  contactInfo: string;
}

interface AttendeeListProps {
  attendees: Attendee[];
  onAttendeesChange: (attendees: Attendee[]) => void;
}

const defaultRoles = [
  "Parent/Guardian",
  "Student (if appropriate)",
  "Special Education Teacher/Case Manager",
  "General Education Teacher",
  "School Psychologist",
  "Related Service Providers (OT, PT, Speech)",
  "Administrator (AP, Principal, SpEd Coordinator)",
  "District Representative",
  "Interpreter (if needed)",
  "Advocate (if parent invited one)",
  "Others (Tutor, Behavior Specialist, etc.)",
];

const AttendeeList = ({ attendees, onAttendeesChange }: AttendeeListProps) => {
  const addPerson = () => {
    const newAttendee: Attendee = {
      id: crypto.randomUUID(),
      role: "",
      name: "",
      attending: "",
      contactInfo: "",
    };
    onAttendeesChange([...attendees, newAttendee]);
  };

  const updateAttendee = (id: string, field: keyof Attendee, value: string) => {
    onAttendeesChange(
      attendees.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const removeAttendee = (id: string) => {
    onAttendeesChange(attendees.filter((a) => a.id !== id));
  };

  return (
    <div className="iep-card">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="iep-section-title mb-1">Who Should Be at the IEP Meeting?</h2>
          <p className="text-sm text-muted-foreground">
            Use this as a checklist and contact tracker
          </p>
        </div>
        <button onClick={addPerson} className="iep-button-primary">
          <Plus className="w-4 h-4" />
          Add Person
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 mb-3 px-2">
        <div className="col-span-3 text-sm font-semibold text-card-foreground">Role</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">Name</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">Attending?</div>
        <div className="col-span-4 text-sm font-semibold text-card-foreground">Contact Info / Notes</div>
        <div className="col-span-1"></div>
      </div>

      {/* Attendee Rows */}
      <div className="space-y-3">
        {attendees.map((attendee) => (
          <div
            key={attendee.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-muted/30 rounded-lg items-center"
          >
            <div className="md:col-span-3">
              <label className="md:hidden iep-label">Role</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Role"
                value={attendee.role}
                onChange={(e) => updateAttendee(attendee.id, "role", e.target.value)}
                list="roles-list"
              />
              <datalist id="roles-list">
                {defaultRoles.map((role) => (
                  <option key={role} value={role} />
                ))}
              </datalist>
            </div>
            <div className="md:col-span-2">
              <label className="md:hidden iep-label">Name</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Name"
                value={attendee.name}
                onChange={(e) => updateAttendee(attendee.id, "name", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="md:hidden iep-label">Attending?</label>
              <select
                className="iep-select"
                value={attendee.attending}
                onChange={(e) => updateAttendee(attendee.id, "attending", e.target.value)}
              >
                <option value="">-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
                <option value="virtual">Virtual</option>
              </select>
            </div>
            <div className="md:col-span-4">
              <label className="md:hidden iep-label">Contact Info / Notes</label>
              <input
                type="text"
                className="iep-input"
                placeholder="Phone, email, or notes"
                value={attendee.contactInfo}
                onChange={(e) => updateAttendee(attendee.id, "contactInfo", e.target.value)}
              />
            </div>
            <div className="md:col-span-1 flex justify-end">
              <button
                onClick={() => removeAttendee(attendee.id)}
                className="iep-button-delete"
                aria-label="Remove attendee"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {attendees.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No attendees added yet. Click "Add Person" to start building your list.
        </p>
      )}
    </div>
  );
};

export default AttendeeList;
