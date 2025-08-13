import Table from "@/components/table";
import { useUserStore } from "@/store/useUserStore";

export default function SubscriptionsPage() {
    const { user } = useUserStore();
    return (
        <div
            className="flex flex-col gap-8 w-full h-full"
        >
            <div
                className="flex flex-col gap-4 w-full"
            >
                <h1 className="font-sora text-2xl font-bold text-left text-white-cream">Suscripciones</h1>
                <p
                    className="font-geist text-gray-400"
                >
                    Visualiza el historial de pago de las suscripciones a lo largo del tiempo.
                </p>
            </div>
            <div
                className="flex flex-col gap-3 w-full"
            >
                <Table
                    user_id={user?.user_id ?? ""}
                />
            </div>
        </div>
    )
}