"use client";

import { useEffect, useState } from "react";
import Input from "@/components/input";
import Select from "@/components/select";
import { useUserStore } from "@/store/useUserStore";
import { useRegisterForm, useGetPlatforms, useGetPaymentMethods } from "@/apis/hooks";
import { dataRecurrences, dataCurrencies } from "@/constants/data";
import { formatDate } from "@/lib/fn";

interface RegisterFormProps {
    isOpen: boolean;
    toggleRegisterForm: () => void;
}

interface DataProps {
    company: string;
    recurrence: string;
    currency: string;
    amount: string;
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

    const date = formatDate(new Date());

    const [data, setData] = useState<DataProps>({
        company: "",
        recurrence: dataRecurrences[0].value,
        currency: dataCurrencies[0].value,
        amount: "",
        date_start: date,
        payment_method: "",
        card_number: null,
    });

    const handleRegisterForm = async () => {
        if (!user?.user_id || !data.company || !data.recurrence || !data.amount || !data.currency || !data.date_start) {
            console.log(user?.user_id, data.company, data.recurrence, data.amount, data.currency, data.date_start);
            return;
        }
        try {
            await registerForm({
                user_id: user?.user_id ?? "",
                company_id: data.company,
                recurrence: data.recurrence,
                amount: Number(data.amount),
                currency: data.currency,
                date_start: data.date_start,
                payment_method_id: data.payment_method,
                card_number: data.card_number,
            });
            setData({
                company: platforms?.[0]?.platform_id ?? "",
                recurrence: dataRecurrences[0].value,
                currency: dataCurrencies[0].value,
                amount: "",
                date_start: date,
                payment_method: payment_methods?.[0]?.payment_method_id?? "",
                card_number: null,
            });
            toggleRegisterForm();
        } catch (error: unknown) {
            console.error(`Ocurrió un error al registrar la suscripción: ${error}`);
        }
    }

    useEffect(() => {
        if (platforms && payment_methods) {
            setData((prevData) => ({
                ...prevData,
                company: platforms?.[0]?.platform_id ?? "",
                payment_method: payment_methods?.[0]?.payment_method_id ?? "",
            }))
        }
    }, [platforms, payment_methods]);

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
                {
                    user?.google_calendar_id ? (
                        <div className="w-full">
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
                                    field="company"
                                    value={data.company}
                                    setValue={setData}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                                    <Select
                                        label="Recurrencia *"
                                        options={dataRecurrences}
                                        field="recurrence"
                                        value={data.recurrence}
                                        setValue={setData}
                                    />
                                    <Select
                                        label="Moneda *"
                                        options={dataCurrencies}
                                        field="currency"
                                        value={data.currency}
                                        setValue={setData}
                                    />
                                </div>
                                <Input
                                    label="Monto *"
                                    placeholder="0"
                                    type="number"
                                    value={data.amount}
                                    setValue={(value) => setData((prev) => ({ ...prev, amount: value }))}
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
                                        field="payment_method"
                                        value={data.payment_method ?? ""}
                                        setValue={setData}
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
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-6">
                            <span className="w-fit h-fit flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256"><path fill="#FFF" d="M195.368 60.632H60.632v134.736h134.736z"/><path fill="#EA4335" d="M195.368 256L256 195.368l-30.316-5.172l-30.316 5.172l-5.533 27.73z"/><path fill="#188038" d="M0 195.368v40.421C0 246.956 9.044 256 20.21 256h40.422l6.225-30.316l-6.225-30.316l-33.033-5.172z"/><path fill="#1967D2" d="M256 60.632V20.21C256 9.044 246.956 0 235.79 0h-40.422q-5.532 22.554-5.533 33.196q0 10.641 5.533 27.436q20.115 5.76 30.316 5.76T256 60.631"/><path fill="#FBBC04" d="M256 60.632h-60.632v134.736H256z"/><path fill="#34A853" d="M195.368 195.368H60.632V256h134.736z"/><path fill="#4285F4" d="M195.368 0H20.211C9.044 0 0 9.044 0 20.21v175.158h60.632V60.632h134.736z"/><path fill="#4285F4" d="M88.27 165.154c-5.036-3.402-8.523-8.37-10.426-14.94l11.689-4.816q1.59 6.063 5.558 9.398c2.627 2.223 5.827 3.318 9.566 3.318q5.734 0 9.852-3.487c2.746-2.324 4.127-5.288 4.127-8.875q0-5.508-4.345-8.994c-2.897-2.324-6.535-3.486-10.88-3.486h-6.754v-11.57h6.063q5.608 0 9.448-3.033c2.56-2.02 3.84-4.783 3.84-8.303c0-3.132-1.145-5.625-3.435-7.494c-2.29-1.87-5.188-2.813-8.708-2.813c-3.436 0-6.164.91-8.185 2.745a16.1 16.1 0 0 0-4.413 6.754l-11.57-4.817c1.532-4.345 4.345-8.185 8.471-11.503s9.398-4.985 15.798-4.985c4.733 0 8.994.91 12.767 2.745c3.772 1.836 6.736 4.379 8.875 7.613c2.14 3.25 3.2 6.888 3.2 10.93c0 4.126-.993 7.613-2.98 10.476s-4.43 5.052-7.327 6.585v.69a22.25 22.25 0 0 1 9.398 7.327c2.442 3.284 3.672 7.208 3.672 11.79c0 4.58-1.163 8.673-3.487 12.26c-2.324 3.588-5.54 6.417-9.617 8.472c-4.092 2.055-8.69 3.1-13.793 3.1c-5.912.016-11.369-1.685-16.405-5.087m71.797-58.005l-12.833 9.28l-6.417-9.734l23.023-16.607h8.825v78.333h-12.598z"/></svg>
                            </span>
                            <h1 className="font-sora text-lg sm:text-2xl font-bold text-white-cream text-center">Conectando con Google Calendar</h1>
                            <span className="font-geist text-sm text-gray-400 text-center">Esta operación tardará unos segundos.</span>
                            <span className="w-fit h-fit flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path strokeDasharray="64" strokeDashoffset="64" strokeOpacity=".3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}