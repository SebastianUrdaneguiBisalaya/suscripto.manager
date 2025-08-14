import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

export async function POST(req: Request) {
    const data = await req.json();
    const { user_id } = data;
    if (!user_id) {
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
        console.log("Hola")
        const response = await axios.post("https://www.googleapis.com/calendar/v3/calendars", {
            "summary": "Suscripciones",
            "description": "Calendario para gestionar los eventos de suscripciones del usuario.",
            "timeZone": "America/Lima",
        }, {
            headers: {
                Authorization: `Bearer ${googleProviderToken}`,
            },
        });
        console.log(response.data);
        const { error } = await supabase.from("users").update({
            google_calendar_id: response.data.id,
        })
        console.log("error update", error);
        if (error) {
            return NextResponse.json({
                error: (error as Error).message || "Error al actualizar la información del usuario.",
                status: 500,
                isError: true,
            });
        }
        return NextResponse.json({
            data: response.data.id,
            status: 200,
            isError: false,
        });

    } catch (error: unknown) {
        console.log(error);
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