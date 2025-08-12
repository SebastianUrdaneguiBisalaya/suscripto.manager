interface SelectProps {
    label: string;
    options: string[];
    value: string;
    setValue: (value: string) => void;
}

export default function Input({
    label,
    options,
    value,
    setValue,
}: SelectProps) {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
    };
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-gray-500 text-sm font-geist" htmlFor={label}>{label}</label>
            <select
                id={label}
                className="border border-gray-500 rounded-lg p-2 text-base font-geist focus:outline-none text-white-cream"
                onChange={onChange}
                value={value}
            >
                {
                    options.map((option, index) => (
                        <option
                            key={index}
                            value={option}
                        >
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}