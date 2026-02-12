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
    const { email, redirectUrl } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user exists
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;

    const user = users.users.find((u: any) => u.email === email);
    if (!user) {
      // Don't reveal if user exists - return success anyway
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate a secure token
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();

    // Store the token
    const { error: tokenError } = await supabase
      .from("password_reset_tokens")
      .insert({
        user_id: user.id,
        token,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      });

    if (tokenError) throw tokenError;

    // Build reset link
    const resetLink = `${redirectUrl}?token=${token}`;

    // Send email via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "IEP Meeting Prep <onboarding@resend.dev>",
        to: [email],
        subject: "Reset Your Password - IEP Meeting Prep",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>You requested a password reset for your IEP Meeting Prep account.</p>
            <p>Click the button below to set a new password. This link expires in 1 hour.</p>
            <a href="${resetLink}" style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 16px 0;">
              Reset Password
            </a>
            <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      throw new Error(`Resend API error [${resendRes.status}]: ${JSON.stringify(resendData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending reset email:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
