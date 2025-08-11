import { 
    dataTrackingCard,
    dataNotificationsCard,
    dataStatisticsCard,
    barPlotStatisticsCard,
    dataSimulationCard,
} from "@/constants/data";

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-auto">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-3 items-start justify-start h-[45%] w-full rounded-xl border border-gray-600 p-4">
                    <h3 className="font-sora font-semibold text-white-cream text-lg sm:text-xl">Tracking</h3>
                    <p className="font-geist font-normal text-gray-400 text-sm sm:text-base">Registra y monitorea todas tus suscripciones en una sola plataforma. Identifica gastos innecesarios y optimiza tu presupuesto mensual.</p>
                    <TrackingCard
                        data={dataTrackingCard}
                    />
                </div>
                <div className="flex flex-col gap-3 items-startjustify-center flex-1 w-full rounded-xl border border-gray-600 p-4">
                    <h3 className="font-sora font-semibold text-white-cream text-lg sm:text-xl">Notificaciones</h3>
                    <p className="font-geist font-normal text-gray-400 text-sm sm:text-base">Recibe alertas automáticas sobre próximos cobros y suscripciones que podrías estar olvidando cancelar.</p>
                    <NotificationsCard
                        data={dataNotificationsCard}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-3 items-start justify-start h-[55%] w-full rounded-xl border border-gray-600 p-4">
                    <h3 className="font-sora font-semibold text-white-cream text-lg sm:text-xl">Estadísticas</h3>
                    <p className="font-geist font-normal text-gray-400 text-sm sm:text-base">Visualiza tus gastos con gráficos detallados y estadísticas de los últimos 12 meses para tomar mejores decisiones.</p>
                    <StatisticsCard
                        data={dataStatisticsCard}
                    />
                </div>
                <div className="flex flex-col gap-3 items-start justify-start flex-1 w-full rounded-xl border border-gray-600 p-4">
                    <h3 className="font-sora font-semibold text-white-cream text-lg sm:text-xl">Simulación</h3>
                    <p className="font-geist font-normal text-gray-400 text-sm sm:text-base">Sistema automatizado que simula los débitos reales de tu tarjeta basado en la recurrencia y fechas de cada suscripción.</p>
                    <SimulationCard
                        data={dataSimulationCard}
                    />
                </div>
            </div>
        </div>
    )
}

interface TrackingCardProps {
    data: {
        company: string;
        icon: React.ReactNode;
        pricing: string;
        status: string;
    }[];
}

interface NotificationsCardProps {
    data: {
        company: string;
        icon: React.ReactNode;
        text: string;
        pricing: string;
    }[];
}

interface StatisticsCardProps {
    data: {
        amount: string;
        text: string;
    }[];
}

interface SimulationCardProps {
    data: {
        card_icon: React.ReactNode;
        card_type: string;
        card_number: string;
        company: string;
        pricing: string;
    }[];
}

function TrackingCard({ data }: TrackingCardProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-4 w-full items-center px-4 py-2 rounded-lg border border-gray-600 overflow-hidden">
                        <span className="opacity-50 shrink-0 h-auto w-7 flex justify-center items-center">
                            {item.icon}
                        </span>
                        <div className="flex flex-col gap-0.5 items-start justify-center grow">
                            <span className="font-geist text-xs sm:text-sm text-white-cream font-medium">
                                {item.company}
                            </span>
                            <span className="font-geist text-xs text-gray-400">
                                {item.pricing}
                            </span>
                        </div>
                        <span className={`font-geist text-xs text-right font-bold ${item.status === "Activo" ? "bg-green-400/50 text-green-500" : "bg-red-400/50 text-red-500"} px-2 py-1 rounded-xl`}>
                            {item.status}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

function NotificationsCard({ data }: NotificationsCardProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                data.map((item, index) => (
                    <div key={index} className="flex flex-row gap-4 w-full items-center px-4 py-2 rounded-lg border border-gray-600">
                        <span className="opacity-50 shrink-0 h-auto w-7 flex justify-center items-center">
                            {item.icon}
                        </span>
                        <div className="flex flex-col gap-0.5 items-start justify-center grow">
                            <span className="font-geist text-xs sm:text-sm text-white-cream font-medium">
                                {item.text}
                            </span>
                            <span className="font-geist text-xs text-gray-400">
                                {item.company} - {item.pricing}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function StatisticsCard({ data }: StatisticsCardProps) {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="w-full grid grid-cols-2 gap-4">
                {
                    data.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2 border border-gray-500 rounded-lg p-4 justify-center items-center max-w-lg w-full bg-[rgba(255,255,255,0.05)] shadow-[3px_3px_0px_rgba(255,255,255,0.2)]">
                            <span className="font-sora font-bold text-white-cream text-base sm:text-xl text-center">
                                {item.amount}
                            </span>
                            <span className="font-geist text-xs text-gray-400 text-center">
                                {item.text}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex flex-row gap-2 items-end grow">
                {
                    barPlotStatisticsCard.map((item, index) => (
                        <div key={index} className="w-full bg-white-cream opacity-70 rounded-tr-md rounded-tl-md" style={{ height: `${item/18}rem` }} />
                    ))
                }
            </div>
        </div>
    )
}

function SimulationCard({ data }: SimulationCardProps) {
    return (
        <div className="w-full h-full flex flex-col gap-4 border border-gray-600 rounded-lg p-4 shadow-[3px_3px_0px_rgba(255,255,255,0.6)]">
            {
                data.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 w-full items-center border-t border-b border-gray-600">
                        <div className="flex flex-row gap-4 items-center w-full">
                            <span className="opacity-50 shrink-0 h-auto w-7 flex justify-center items-center">
                                {item.card_icon}
                            </span>
                            <span className="font-geist text-xs text-gray-400 text-left">
                                {item.card_type} - {item.card_number}
                            </span>
                        </div>
                        <div className="flex flex-row gap-4 items-center w-full">
                            <span className="font-geist text-xs font-medium text-white-cream w-full">
                                {item.company}
                            </span>
                            <span className="font-geist text-xs text-gray-400 grow">
                                {item.pricing}
                            </span>
                            <span className="shrink-0 h-auto w-7 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="#fb2c36" d="m18.707 12.707l-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293l-1.414 1.414L12 19.414z"/></svg>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}