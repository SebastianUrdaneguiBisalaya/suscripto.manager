import { z } from "zod";

export const registerFormSchema = z.object({
    company_id: z.string().min(1, "Debe ingresar un nombre de la plataforma."),
    recurrence: z.string().min(1, "Debe seleccionar una recurrencia."),
    currency: z.string().min(1, "Debe seleccionar una moneda."),
    amount: z.number({
        error: () => "Debe ingresar un monto válido.",
    }).positive("El monto debe ser mayor que cero."),
    payment_method_id: z.string().optional().or(z.literal("")),
    card_number: z.string().optional().or(z.literal("")).refine(
        (val) => !val || val.length === 3,
        "Debe ingresar los últimos 3 dígitos de la tarjeta."
    ),
});

export const registerFormSchemaBackend = z.object({
    user_id: z.string(),
    company_id: z.string(),
    recurrence: z.string(),
    amount: z.number().positive(),
    currency: z.string().length(3),
    date_start: z.string().length(10),
    payment_method_id: z.string().optional().nullable(),
    card_number: z.string().length(3).optional().nullable(),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;