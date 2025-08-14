import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

const recurrenceOptions = {
    "Diaria": "FREQ=DAILY",
    "Semanal": "FREQ=WEEKLY",
    "Mensual": "FREQ=MONTHLY",
    "Bimestral": "FREQ=MONTHLY:INTERVAL=2",
    "Trimestral": "FREQ=MONTHLY:INTERVAL=3",
    "Semestral": "FREQ=MONTHLY:INTERVAL=6",
    "Anual": "FREQ=YEARLY",
} as const;

type RecurrenceType = keyof typeof recurrenceOptions;

export async function POST(req: Request) {
    const data = await req.json();
    const { subscription_id, calendar_id, summary, description, date, recurrence }: { 
        subscription_id: string;
        calendar_id: string; 
        summary: string; 
        description: string; 
        date: string; 
        recurrence: RecurrenceType; 
    } = data;
    if (!calendar_id) {
        return NextResponse.json({
            error: "Faltan datos obligatorios.",
            status: 400,
            isError: true,
        });
    }
    const supabase = await createClient();
    const { data: userData, error: useError } = await supabase.auth.getUser();
    if (useError || !userData?.user) {
        return NextResponse.json({
            error: "No hay una sesión de usuario válida.",
            status: 401,
            isError: true,
        });
    }
    const { data: sessionData, error: sesionError } = await supabase.auth.getSession();
    if (sesionError || !sessionData?.session) {
        return NextResponse.json({
            error: "No se pudo obtener la información de la sesión.",
            status: 401,
            isError: true,
        });
    }
    const googleProviderToken = sessionData.session.provider_token;
    if (!googleProviderToken) {
        return NextResponse.json({
            error: "No se pudo obtener el token de Google.",
            status: 401,
            isError: true,
        });
    }
    try {
        const res = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events`, {
            "summary": summary,
            "description": description,
            "start": {
                "dateTime": `${date}T00:00:00-05:00`,
                "timeZone": "America/Lima",
            },
            "end": {
                "dateTime": `${date}T01:00:00-05:00`,
                "timeZone": "America/Lima",
            },
            "recurrence": [
                `RRULE:FREQ=${recurrenceOptions[recurrence]};COUNT=1`
            ]
        }, {
            headers: {
                Authorization: `Bearer ${googleProviderToken}`,
            },
        })
        const { error: SubscriptionError } = await supabase.from("subscriptions").update({
            google_event_id: res.data.id,
        }).eq("id", subscription_id);
        if (SubscriptionError) {
            return NextResponse.json({
                error: "Error al actualizar la suscripción.",
                status: 500,
                isError: true,
            });
        }
        return NextResponse.json({
            data: "Registro creado correctamente.",
            status: 201,
            isError: false,
        });
    } catch (error: unknown) {
        const errorMessage = (axios.isAxiosError(error) && error.response)
            ? error.response.data.error.message
            : (error as Error).message;
        return NextResponse.json({
            error: `Error al crear el calendario: ${errorMessage}`,
            status: 500,
            isError: true,
        });
    }
}