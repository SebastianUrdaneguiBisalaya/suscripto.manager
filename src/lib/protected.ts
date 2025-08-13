import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function protectedPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    return data?.user;
}