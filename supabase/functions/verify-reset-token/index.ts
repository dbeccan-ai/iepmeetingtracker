import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return new Response(JSON.stringify({ error: "Token and new password are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (newPassword.length < 6) {
      return new Response(JSON.stringify({ error: "Password must be at least 6 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the token
    const { data: resetToken, error: findError } = await supabase
      .from("password_reset_tokens")
      .select("*")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (findError || !resetToken) {
      return new Response(JSON.stringify({ error: "Invalid or expired reset link" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check expiry
    if (new Date(resetToken.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "This reset link has expired. Please request a new one." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update the user's password
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      resetToken.user_id,
      { password: newPassword }
    );

    if (updateError) throw updateError;

    // Mark token as used
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("id", resetToken.id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error resetting password:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
