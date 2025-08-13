import { useNotifications } from "@/apis/hooks";
import CardNotification from "@/components/card-notification";
import { useUserStore } from "@/store/useUserStore";

export default function NotificationsPage() {
    const { user } = useUserStore();
    const { data } = useNotifications({
        user_id: user?.user_id ?? "",
    });
    return (
        <div
            className="flex flex-col gap-8 w-full h-full"
        >
            <div
                className="flex flex-col gap-4 w-full"
            >
                <h1 className="font-sora text-2xl font-bold text-left text-white-cream">Notificaciones</h1>
                <p
                    className="font-geist text-gray-400"
                >
                    Visualiza los recordatorios de las suscripciones activas próximas a su fecha de facturación.
                </p>
            </div>
            <div
                className="flex flex-col gap-3 w-full"
            >
                {
                    data?.map((item, index) => (
                        <CardNotification
                            key={index}
                            platform_name={item.platform_name}
                            amount={item.amount}
                            currency={item.currency}
                            next_date={item.next_date}
                        />
                    ))
                }
            </div>
        </div>
    )
}