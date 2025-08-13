interface SelectProps {
    label: string;
    options: Record<string, string>[];
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
        const selectedValue = event.target.value;
        const selectedOption = options.find((option) => Object.values(option)[0] === selectedValue);
        if (selectedOption) {
            const key = Object.keys(selectedOption)[0];
            setValue(key);
        }
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
                    options.map((option) => {
                        const key = Object.keys(option)[0];
                        const optionValue = Object.values(option)[0];
                        return (
                            <option
                                key={key}
                                value={optionValue}
                            >
                                {optionValue}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}