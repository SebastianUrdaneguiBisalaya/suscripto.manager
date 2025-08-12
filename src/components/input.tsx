interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    value: string | number;
    setValue: (value: string) => void;
}

export default function Input({
    label,
    placeholder,
    type,
    value,
    setValue,
}: InputProps) {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-gray-500 text-sm font-geist" htmlFor={label}>{label}</label>
            <input
                id={label}
                className="border border-gray-500 rounded-lg p-2 text-base font-geist text-white-cream focus:outline-none"
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}