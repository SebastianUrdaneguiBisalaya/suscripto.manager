import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET({
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

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            status: 500,
            isError: true,
        });   
    }
}