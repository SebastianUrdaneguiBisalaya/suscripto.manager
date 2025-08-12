import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { 
        user_id,
        company_id,
        recurrence,
        amount,
        currency,
        date_start,
        payment_method_id,
        card_number,
    } = data;

    if (!user_id || !company_id || !recurrence || !amount || !currency || !date_start) {
        return NextResponse.json({
            error: "Faltan datos obligatorios.",
            status: 400,
            isError: true,
        });
    }
    try {
        const supabase = await createClient();
        const { error } = await supabase.rpc(
            "post_register_form",
            { 
                p_user_id: user_id,
                p_company_id: company_id,
                p_recurrence: recurrence,
                p_amount: amount,
                p_currency: currency,
                p_date_start: date_start,
                p_payment_method_id: payment_method_id,
                p_card_number: card_number,
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
            data: "ok",
            status: 200,
        });

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message,
            status: 500,
            isError: true,
        });   
    }
}