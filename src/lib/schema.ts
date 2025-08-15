import { z } from "zod";

export const registerFormSchema = z.object({
    company_id: z.string().min(1, "Debe ingresar un nombre de la plataforma."),
    recurrence: z.string().min(1, "Debe seleccionar una recurrencia."),
    currency: z.string().min(1, "Debe seleccionar una moneda."),
    amount: z.number().positive("El monto no puede ser negativo."),
    date_start: z.string(),
    payment_method_id: z.string().optional().nullable(),
    card_number: z.string().optional().nullable(),
});

export const registerFormSchemaBackend = z.object({
    user_id: z.uuidv4(),
    company_id: z.uuidv4(),
    recurrence: z.string(),
    amount: z.number().positive(),
    currency: z.string().length(3),
    date_start: z.string().length(10),
    payment_method_id: z.uuidv4().optional().nullable(),
    card_number: z.string().length(3).optional().nullable(),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;