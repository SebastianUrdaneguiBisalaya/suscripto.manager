import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

export async function DELETE(req: Request) {
    const data = await req.json();
    const { calendar_id, event_id } = data;
    if (!calendar_id || !event_id) {
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
        await axios.delete(`https://www.googleapis.com/calendar/v3/calendars/${calendar_id}/events/${event_id}`, {
            headers: {
                Authorization: `Bearer ${googleProviderToken}`,
            },
        })
        return NextResponse.json({
            data: "Evento eliminado correctamente.",
            status: 204,
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