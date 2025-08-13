"use client";

import { useEffect, useState } from "react";
import Input from "@/components/input";
import Select from "@/components/select";
import { useUserStore } from "@/store/useUserStore";
import { useRegisterForm, useGetPlatforms, useGetPaymentMethods } from "@/apis/hooks";
import { dataRecurrences, dataCurrencies } from "@/constants/data";

interface RegisterFormProps {
    isOpen: boolean;
    toggleRegisterForm: () => void;
}

interface DataProps {
    company: string;
    recurrence: string;
    currency: string;
    amount: number;
    date_start: string;
    payment_method: string | null;
    card_number: string | null;
}

export default function RegisterForm({
    isOpen,
    toggleRegisterForm,
}: RegisterFormProps) {
    const { user } = useUserStore();
    const { data: platforms, isPending: isLoadingPlatforms } = useGetPlatforms();
    const { data: payment_methods, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();
    const { mutateAsync: registerForm, isPending: isLoadingRegisterForm } = useRegisterForm();

    const [data, setData] = useState<DataProps>({
        company: "",
        recurrence: "",
        currency: "",
        amount: 0,
        date_start: "",
        payment_method: null,
        card_number: null,
    });

    const handleRegisterForm = async () => {
        try {
            await registerForm({
                user_id: user?.user_id ?? "",
                company_id: data.company,
                recurrence: data.recurrence,
                amount: data.amount,
                currency: data.currency,
                date_start: data.date_start,
                payment_method_id: data.payment_method,
                card_number: data.card_number,
            });
            toggleRegisterForm();
        } catch (error: unknown) {
            console.error(`Ocurrió un error al registrar la suscripción: ${error}`);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "unset";
        }

        return () => {
            document.body.style.overflowY = "unset";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-full h-full backdrop-blur-lg z-50 flex items-center justify-center px-2">
            <div className="flex flex-col w-full max-w-lg bg-black border border-gray-600 rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh] hidde-scrollbar">
                <div className="flex flex-row items-center justify-between border-b border-gray-600 pb-4">
                    <h1 className="font-sora text-lg sm:text-2xl font-bold text-white-cream">Añadir Suscripción</h1>
                    <button
                        className="flex items-center justify-center bg-white-cream rounded-full p-1 cursor-pointer"
                        type="button"
                        onClick={toggleRegisterForm}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="#000000" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"/></svg>
                    </button>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                    <Select
                        label="Nombre de la plataforma *"
                        options={platforms ?? []}
                        value={data.company}
                        setValue={(value) => setData((prev) => ({ ...prev, company: value }))}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <Select
                            label="Recurrencia *"
                            options={dataRecurrences}
                            value={data.recurrence}
                            setValue={(value) => setData((prev) => ({ ...prev, recurrence: value }))}
                        />
                        <Select
                            label="Moneda *"
                            options={dataCurrencies}
                            value={data.currency}
                            setValue={(value) => setData((prev) => ({ ...prev, currency: value }))}
                        />
                    </div>
                    <Input
                        label="Monto *"
                        placeholder="0"
                        type="number"
                        value={data.amount}
                        setValue={(value) => setData((prev) => ({ ...prev, amount: Number(value) }))}
                    />
                    <Input
                        label="Fecha inicio *"
                        placeholder="dd/mm/aaaa"
                        type="date"
                        value={data.date_start}
                        setValue={(value) => setData((prev) => ({ ...prev, date_start: value }))}
                    />
                    <div className="flex flex-row items-center w-full gap-4">
                        <div className="h-[0.05rem] w-full bg-gray-500" />
                        <span className="font-geist text-sm text-gray-400">OPCIONAL</span>
                        <div className="h-[0.05rem] w-full bg-gray-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <Select
                            label="Método de pago"
                            options={payment_methods ?? []}
                            value={data.payment_method ?? ""}
                            setValue={(value) => setData((prev) => ({ ...prev, payment_method: value }))}
                        />
                        <Input
                            label="Últimos 3 dígitos"
                            placeholder="123"
                            type="text"
                            value={data.card_number ?? ""}
                            setValue={(value) => setData((prev) => ({ ...prev, card_number: value }))}
                        />
                    </div>
                    {
                        !isLoadingPaymentMethods && !isLoadingPlatforms && (
                            <button
                                className={`bg-blue-600 cursor-pointer text-white font-geist text-sm sm:text-base px-4 py-3 rounded-lg ${isLoadingRegisterForm ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handleRegisterForm}
                                disabled={isLoadingRegisterForm}
                                type="button"
                            >
                                {isLoadingRegisterForm ? "Guardando..." : "Guardar suscripción"}
                            </button>
                        ) 
                    }
                </div>
            </div>
        </div>
    )
}