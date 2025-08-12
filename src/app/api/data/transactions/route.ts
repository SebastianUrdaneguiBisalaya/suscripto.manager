import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET({
    params
}: {
    params: Promise<{ user_id: string, limit: number, offset: number }>;
}) {
    const { user_id, limit, offset } = await params;
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
                p_limit: limit,
                p_offset: offset,
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