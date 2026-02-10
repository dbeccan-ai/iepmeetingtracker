import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, ArrowLeft, Users, FileText, Search } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface Submission {
  id: string;
  user_id: string;
  student_name: string | null;
  student_info: Json;
  contact_info: Json;
  attendees: Json;
  pre_meeting_prep: Json;
  question_notes: Json;
  decisions: Json;
  follow_up: Json;
  family_discussions: Json;
  created_at: string;
  updated_at: string;
  profile_email?: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchSubmissions();
  }, [isAdmin]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data: subs } = await supabase
      .from("iep_submissions")
      .select("*")
      .order("updated_at", { ascending: false });

    if (subs) {
      // Fetch profile emails for each submission
      const userIds = [...new Set(subs.map((s) => s.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, email")
        .in("user_id", userIds);

      const emailMap = new Map(profiles?.map((p) => [p.user_id, p.email]) || []);
      
      setSubmissions(
        subs.map((s) => ({
          ...s,
          profile_email: emailMap.get(s.user_id) || "Unknown",
        }))
      );
    }
    setLoading(false);
  };

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (s.student_name || "").toLowerCase().includes(q) ||
      (s.profile_email || "").toLowerCase().includes(q)
    );
  });

  const renderJsonField = (label: string, data: Json) => {
    if (!data || (typeof data === "object" && Object.keys(data as object).length === 0)) return null;
    if (Array.isArray(data) && data.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-card-foreground mb-2">{label}</h4>
        <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto text-card-foreground whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (selectedSubmission) {
    const s = selectedSubmission;
    const si = (s.student_info as Record<string, string>) || {};

    return (
      <div className="min-h-screen bg-background">
        <header className="bg-secondary px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button onClick={() => setSelectedSubmission(null)} className="iep-button-primary">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-xl font-bold text-secondary-foreground">
              Submission: {s.student_name || "Unnamed"}
            </h1>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
          <div className="iep-card">
            <h3 className="iep-section-title">Submission Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><span className="font-semibold">Parent Email:</span> {s.profile_email}</div>
              <div><span className="font-semibold">Student:</span> {s.student_name || "N/A"}</div>
              <div><span className="font-semibold">Submitted:</span> {new Date(s.created_at).toLocaleString()}</div>
              <div><span className="font-semibold">Last Updated:</span> {new Date(s.updated_at).toLocaleString()}</div>
            </div>
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Student Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="font-semibold">Name:</span> {si.name || "N/A"}</div>
              <div><span className="font-semibold">Grade:</span> {si.grade || "N/A"}</div>
              <div><span className="font-semibold">School:</span> {si.school || "N/A"}</div>
              <div><span className="font-semibold">Meeting Date:</span> {si.meetingDate || "N/A"}</div>
              <div><span className="font-semibold">Meeting Type:</span> {si.meetingType || "N/A"}</div>
              <div className="col-span-2"><span className="font-semibold">Primary Concerns:</span> {si.primaryConcerns || "N/A"}</div>
            </div>
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Contact Information</h3>
            {renderJsonField("", s.contact_info)}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Attendees</h3>
            {Array.isArray(s.attendees) && (s.attendees as any[]).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-2 font-semibold">Role</th>
                      <th className="text-left p-2 font-semibold">Name</th>
                      <th className="text-left p-2 font-semibold">Attending</th>
                      <th className="text-left p-2 font-semibold">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(s.attendees as any[]).map((a: any, i: number) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-2">{a.role || "-"}</td>
                        <td className="p-2">{a.name || "-"}</td>
                        <td className="p-2">{a.attending || "-"}</td>
                        <td className="p-2">{a.contactInfo || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No attendees recorded.</p>
            )}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Pre-Meeting Prep</h3>
            {renderJsonField("", s.pre_meeting_prep)}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Question Notes</h3>
            {renderJsonField("", s.question_notes)}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Decisions</h3>
            {Array.isArray(s.decisions) && (s.decisions as any[]).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-2 font-semibold">Topic</th>
                      <th className="text-left p-2 font-semibold">Discussed</th>
                      <th className="text-left p-2 font-semibold">Agreed On</th>
                      <th className="text-left p-2 font-semibold">Responsible</th>
                      <th className="text-left p-2 font-semibold">By When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(s.decisions as any[]).map((d: any, i: number) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-2">{d.topic || "-"}</td>
                        <td className="p-2">{d.discussed || "-"}</td>
                        <td className="p-2">{d.agreedOn || "-"}</td>
                        <td className="p-2">{d.responsible || "-"}</td>
                        <td className="p-2">{d.byWhen || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No decisions recorded.</p>
            )}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Follow-Up</h3>
            {renderJsonField("", s.follow_up)}
          </div>

          <div className="iep-card">
            <h3 className="iep-section-title">Family Discussions</h3>
            {renderJsonField("", s.family_discussions)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-secondary-foreground" />
            <h1 className="text-2xl font-bold text-secondary-foreground">Admin Dashboard</h1>
          </div>
          <button onClick={() => navigate("/")} className="iep-button-primary">
            <ArrowLeft className="w-4 h-4" /> Back to Form
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="iep-card flex items-center gap-4">
            <div className="bg-accent p-3 rounded-lg">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{submissions.length}</p>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
            </div>
          </div>
          <div className="iep-card flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg">
              <Users className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {new Set(submissions.map((s) => s.user_id)).size}
              </p>
              <p className="text-sm text-muted-foreground">Unique Parents</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            className="iep-input pl-10"
            placeholder="Search by student name or parent email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Submissions Table */}
        <div className="iep-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold text-card-foreground">Student Name</th>
                <th className="text-left p-3 font-semibold text-card-foreground">Parent Email</th>
                <th className="text-left p-3 font-semibold text-card-foreground">Submitted</th>
                <th className="text-left p-3 font-semibold text-card-foreground">Last Updated</th>
                <th className="text-left p-3 font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                  <td className="p-3 text-card-foreground">{s.student_name || "Unnamed"}</td>
                  <td className="p-3 text-muted-foreground">{s.profile_email}</td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(s.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedSubmission(s)}
                      className="iep-button-secondary text-xs px-3 py-1.5"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
