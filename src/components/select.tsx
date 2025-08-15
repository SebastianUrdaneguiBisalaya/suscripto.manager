interface SelectProps<T> {
    label: string;
    options: T[];
    value: string | null | undefined;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    valueKey: keyof T;
    labelKey: keyof T;
    error?: string;
}

export default function Select<T extends Record<string, any>>({
    label,
    options,
    value,
    onChange,
    valueKey,
    labelKey,
    error,
}: SelectProps<T>) {
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
                        const optionValue = String(option[valueKey]);
                        const optionLabel = String(option[labelKey]);
                        return (
                            <option
                                key={String(optionValue)}
                                value={String(optionValue)}
                            >
                                {optionLabel}
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