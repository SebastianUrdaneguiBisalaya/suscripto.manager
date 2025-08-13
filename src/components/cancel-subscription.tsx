"use client";

import { useEffect } from "react";
import { useCancelSubscription } from "@/apis/hooks";

interface CancelSubscriptionProps {
    subscription_id: string;
    platform_name: string;
    isShown: boolean;
    toggle: () => void;
}

export default function CancelSubscription({
    subscription_id,
    platform_name,
    isShown,
    toggle,
}: CancelSubscriptionProps) {
    const { mutateAsync: cancelSubscription } = useCancelSubscription();

    const handleCancelSubscription = async () => {
        try {
            await cancelSubscription({
                subscription_id,
            });
            toggle();
        } catch (error: unknown) {
            console.error(`Ocurrió un error al cancelar la suscripción: ${error}`);
        }
    }
    
    useEffect(() => {
        if (isShown) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "unset";
        }

        return () => {
            document.body.style.overflowY = "unset";
        }
    }, [isShown]);

    return (
        <div className="fixed inset-0 w-full h-full backdrop-blur-lg z-50 flex items-center justify-center px-2">
            <div className="flex flex-col gap-6 w-full max-w-md bg-black border border-gray-600 rounded-xl p-8 shadow-xl overflow-y-auto max-h-[90vh] hidde-scrollbar">
                <h1 className="font-sora text-lg sm:text-2xl font-bold text-white-cream">¿Estás seguro de que deseas cancelar la subscripción?</h1>
                <p className="text-gray-400 text-xs font-geist text-left">Luego de la confirmación, se procederá a desactivar el servicio de tracking para la plataforma <span className="font-sora font-bold underline text-white-cream">{platform_name}</span>.</p>
                <div className="flex flex-row items-center justify-between gap-4">
                    <button
                        className="bg-white-cream w-full cursor-pointer text-black font-geist text-sm sm:text-base px-4 py-3 rounded-lg"
                        type="button"
                        onClick={toggle}
                    >
                        Regresar
                    </button>
                    <button
                        className="bg-red-600 cursor-pointer w-full text-white font-geist text-sm sm:text-base px-4 py-3 rounded-lg"
                        type="button"
                        onClick={handleCancelSubscription}
                    >
                        Sí, estoy seguro
                    </button>
                </div>
            </div>
        </div>
    )
}