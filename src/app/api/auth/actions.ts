"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { config } from "@/config/config";

export async function SignInWithGoogle() {
  const supabase = await createClient();
  const auth_callback_url = `${config.SITE_URL}/api/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
      queryParams: {
        prompt: "consent",
        access_type: "offline",
      },
    },
  });

  if (error) {
    console.error(error);
    return redirect("/login");
  }

  if (data && data.url) {
    return redirect(data.url);
  }
}

export async function SignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}