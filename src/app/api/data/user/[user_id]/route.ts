import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request, {
    params
}: {
    params: Promise<{ user_id: string }>;
}) {
    const { user_id } = await params;
    if (!user_id) {
        return NextResponse.json({
            error: "Faltan datos obligatorios.",
            status: 400,
            isError: true,
        });
    }
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.
        from("users")
        .select("google_calendar_id")
        .eq("user_id", user_id);

        if (error) {
            return NextResponse.json({
                error: (error as Error).message,
                status: 500,
                isError: true,
            });
        }
        return NextResponse.json({
            data: data?.[0]?.google_calendar_id ?? null,
            status: 200,
            isError: false,
        });

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            status: 500,
            isError: true,
        });   
    }
}