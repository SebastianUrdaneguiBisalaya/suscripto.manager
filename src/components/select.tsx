interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    options: Record<string, string>[];
    value: string | null | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
}

export default function Select({
    label,
    options,
    value,
    onChange,
    error,
}: SelectProps) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-gray-500 text-sm font-geist" htmlFor={label}>{label}</label>
            <select
                id={label}
                className={`border rounded-lg p-2 text-base font-geist focus:outline-none text-white-cream ${error ? "border-red-500" : "border-gray-500"}`}
                onChange={onChange}
                value={value ?? ""}
            >
                {
                    options.map((option) => {
                        return (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        )
                    })
                }
            </select>
            {
                error && (
                    <p className="text-red-500 text-xs font-sora mt-1 text-left">
                        {error}
                    </p>
                )
            }
        </div>
    )
}