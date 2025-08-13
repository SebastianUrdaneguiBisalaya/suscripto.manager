import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest, {
    params
}: {
    params: Promise<{ user_id: string }>;
}) {
    const { user_id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") ?? 15;
    const offset = searchParams.get("offset") ?? 0;
    if (!user_id) {
        return NextResponse.json({
            error: "Faltan datos obligatorios.",
            status: 400,
            isError: true,
        });
    }
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.rpc(
            "get_transactions",
            {
                p_user_id: user_id,
                p_limit: Number(limit),
                p_offset: Number(offset),
            }
        );

        if (error) {
            return NextResponse.json({
                error: (error as Error).message,
                status: 500,
                isError: true,
            });
        }
        return NextResponse.json({
            data,
        });

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            status: 500,
            isError: true,
        });   
    }
}