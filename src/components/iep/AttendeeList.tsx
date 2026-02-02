import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

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

const AttendeeList = ({ attendees, onAttendeesChange }: AttendeeListProps) => {
  const { t } = useLanguage();

  const defaultRoles = [
    t("roleParent"),
    t("roleStudent"),
    t("roleSpecialEd"),
    t("roleGenEd"),
    t("rolePsychologist"),
    t("roleRelated"),
    t("roleAdmin"),
    t("roleDistrict"),
    t("roleInterpreter"),
    t("roleAdvocate"),
    t("roleOther"),
  ];

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
          <h2 className="iep-section-title mb-1">{t("attendeeListTitle")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("attendeeListDesc")}
          </p>
        </div>
        <button onClick={addPerson} className="iep-button-primary">
          <Plus className="w-4 h-4" />
          {t("addPerson")}
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 mb-3 px-2">
        <div className="col-span-3 text-sm font-semibold text-card-foreground">{t("role")}</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">{t("name")}</div>
        <div className="col-span-2 text-sm font-semibold text-card-foreground">{t("attending")}</div>
        <div className="col-span-4 text-sm font-semibold text-card-foreground">{t("contactInfo")}</div>
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
              <label className="md:hidden iep-label">{t("role")}</label>
              <input
                type="text"
                className="iep-input"
                placeholder={t("rolePlaceholder")}
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
              <label className="md:hidden iep-label">{t("name")}</label>
              <input
                type="text"
                className="iep-input"
                placeholder={t("namePlaceholder")}
                value={attendee.name}
                onChange={(e) => updateAttendee(attendee.id, "name", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="md:hidden iep-label">{t("attending")}</label>
              <select
                className="iep-select"
                value={attendee.attending}
                onChange={(e) => updateAttendee(attendee.id, "attending", e.target.value)}
              >
                <option value="">-</option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
                <option value="maybe">{t("maybe")}</option>
                <option value="virtual">{t("virtual")}</option>
              </select>
            </div>
            <div className="md:col-span-4">
              <label className="md:hidden iep-label">{t("contactInfo")}</label>
              <input
                type="text"
                className="iep-input"
                placeholder={t("contactPlaceholder")}
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
          {t("noAttendees")}
        </p>
      )}
    </div>
  );
};

export default AttendeeList;
