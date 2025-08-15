interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    value: string | number | null | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function Input({
    label,
    placeholder,
    type,
    value,
    onChange,
    error,
}: InputProps) {
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-gray-500 text-sm font-geist" htmlFor={label}>{label}</label>
            <input
                id={label}
                className={`border rounded-lg p-2 text-base font-geist text-white-cream focus:outline-none ${error ? "border-red-500" : "border-gray-500"}`}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value ?? ""}
            />
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