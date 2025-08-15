"use client";

import { useEffect } from "react";
import Input from "@/components/input";
import Select from "@/components/select";
import { useUserStore } from "@/store/useUserStore";
import { useRegisterForm, useGetPlatforms, useGetPaymentMethods } from "@/apis/hooks";
import { dataRecurrences, dataCurrencies } from "@/constants/data";
import { formatDate } from "@/lib/fn";
import { useForm, Controller } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";

interface RegisterFormProps {
    isOpen: boolean;
    toggleRegisterForm: () => void;
}

export default function RegisterForm({
    isOpen,
    toggleRegisterForm,
}: RegisterFormProps) {
    const { user } = useUserStore();
    const { data: platforms, isPending: isLoadingPlatforms } = useGetPlatforms();
    const { data: payment_methods, isPending: isLoadingPaymentMethods } = useGetPaymentMethods();
    const { mutateAsync: registerForm, isPending: isLoadingRegisterForm } = useRegisterForm();
    const { 
        handleSubmit,
        control,
        reset,
        formState: { errors },
     } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            company_id: "",
            recurrence: dataRecurrences[0].value,
            currency: dataCurrencies[0].value,
            amount: undefined,
            payment_method_id: "",
            card_number: "",
        },
        mode: "onChange",
    });


    const onSubmit = async (data: RegisterFormSchema) => {
        if (!user?.user_id) return;
        try {
            const res = await registerForm({
                user_id: user?.user_id ?? "",
                company_id: data.company_id,
                recurrence: data.recurrence,
                amount: data.amount,
                currency: data.currency,
                date_start: formatDate(new Date()),
                payment_method_id: data.payment_method_id,
                card_number: data.card_number,
            });
            if (res?.subscription_id) {
                reset({
                    company_id: platforms?.[0]?.platform_id ?? "",
                    recurrence: dataRecurrences[0].value ?? "",
                    currency: dataCurrencies[0].value ?? "",
                    amount: undefined,
                    payment_method_id: payment_methods?.[0]?.payment_method_id ?? "",
                    card_number: "",
                });
                toggleRegisterForm();   
            }
        } catch (error: unknown) {
            console.error(`Ocurrió un error al registrar la suscripción: ${error}`);
        }
    }

    const handleFormSubmit = (data: RegisterFormSchema) => {
        console.log(data);
        onSubmit(data);
    }

    useEffect(() => {
        if (platforms && payment_methods) {
            reset({
                company_id: platforms?.[0]?.platform_id ?? "",
                payment_method_id: payment_methods?.[0]?.payment_method_id ?? "",
            })
        }
    }, [platforms, payment_methods, reset]);

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
        <motion.div 
            className="fixed inset-0 w-full h-full backdrop-blur-lg z-50 flex items-center justify-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="flex flex-col w-full max-w-lg bg-black border border-gray-600 rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh] hidde-scrollbar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
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
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="flex flex-col gap-4 pt-4"
                    >
                        <Controller
                            name="company_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Nombre de la plataforma *"
                                    options={platforms ?? []}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    error={errors.company_id?.message}
                                    valueKey="platform_id"
                                    labelKey="platform_name"
                                />
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                            <Controller
                                name="recurrence"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Recurrencia *"
                                        options={dataRecurrences}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={errors.recurrence?.message}
                                        valueKey="id"
                                        labelKey="value"
                                    />
                                )}
                            />
                            <Controller
                                name="currency"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Moneda *"
                                        options={dataCurrencies}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={errors.currency?.message}
                                        valueKey="id"
                                        labelKey="value"
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="amount"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Monto *"
                                    placeholder="0"
                                    type="number"
                                    value={field.value === 0 || field.value === undefined ? "" : field.value}
                                    onChange={(e) =>  {
                                        const value = e.target.value;
                                        if (value === "" || value === null) {
                                            field.onChange(undefined);
                                        } else {
                                            const numericValue = parseFloat(value);
                                            field.onChange(isNaN(numericValue) ? undefined : numericValue);
                                        }
                                    }}
                                    error={errors.amount?.message}
                                />
                            )}
                        />
                        <div className="flex flex-row items-center w-full gap-4">
                            <div className="h-[0.05rem] w-full bg-gray-500" />
                            <span className="font-geist text-sm text-gray-400">OPCIONAL</span>
                            <div className="h-[0.05rem] w-full bg-gray-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                            <Controller
                                name="payment_method_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        label="Método de pago"
                                        options={payment_methods ?? []}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={errors.payment_method_id?.message}
                                        valueKey="payment_method_id"
                                        labelKey="payment_method"
                                    />
                                )}
                            />
                            <Controller
                                name="card_number"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Últimos 3 dígitos"
                                        placeholder="123"
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        error={errors.card_number?.message}
                                    />
                                )}
                            />
                        </div>
                        {
                            !isLoadingPaymentMethods && !isLoadingPlatforms && (
                                <button
                                    className={`bg-blue-600 cursor-pointer text-white font-geist text-sm sm:text-base px-4 py-3 rounded-lg ${isLoadingRegisterForm ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={isLoadingRegisterForm}
                                    type="submit"
                                >
                                    {isLoadingRegisterForm ? "Guardando..." : "Guardar suscripción"}
                                </button>
                            ) 
                        }
                    </form>
                </div>
            </motion.div>
        </motion.div>
    )
}