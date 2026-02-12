import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Lock, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const res = await supabase.functions.invoke("verify-reset-token", {
      body: { token, newPassword: password },
    });

    if (res.error || res.data?.error) {
      toast.error(res.data?.error || "Failed to reset password. Please try again.");
    } else {
      toast.success("Password updated! You can now sign in.");
      setTimeout(() => navigate("/auth"), 1500);
    }
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">IEP Meeting Prep</h1>
          <div className="iep-card">
            <p className="text-muted-foreground">
              Invalid or missing reset link. Please request a new one from the{" "}
              <button onClick={() => navigate("/auth")} className="text-secondary hover:underline">
                sign in page
              </button>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">IEP Meeting Prep</h1>
          <p className="text-foreground/80 mt-2">Enter your new password</p>
        </div>

        <div className="iep-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="iep-label">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  className="iep-input pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="iep-label">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  className="iep-input pl-10"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="iep-button-primary w-full justify-center"
            >
              {loading ? "Updating..." : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
