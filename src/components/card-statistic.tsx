interface CardStatisticProps {
    title: string;
    subtitle: string;
    value: number;
}

export default function CardStatistic({
    title,
    subtitle,
    value,
}: CardStatisticProps) {
    return (
        <div
            className="h-36 w-full flex flex-col gap-3 p-4"
        >
            <p
                className="text-white-cream font-sora font-bold text-4xl text-center"
            >
                {value}
            </p>
            <div
                className="flex flex-col items-center gap-1"
            >
                <span
                    className="text-white-cream font-geist font-medium text-sm text-center"
                >
                    {title}
                </span>
                <span
                    className="text-gray-400 font-geist font-normal text-xs text-center"
                >
                    {subtitle}
                </span>
            </div>
        </div>
    )
}