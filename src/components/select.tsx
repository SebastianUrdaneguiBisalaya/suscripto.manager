interface DataProps {
    company: string;
    recurrence: string;
    currency: string;
    amount: string;
    date_start: string;
    payment_method: string | null;
    card_number: string | null;
}

interface SelectProps {
    label: string;
    options: Record<string, string>[];
    field: keyof DataProps;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<DataProps>>;
}

export default function Select({
    label,
    options,
    field,
    value,
    setValue,
}: SelectProps) {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find((option) => Object.values(option)[0] === selectedValue);
        if (selectedOption) {
            const key = Object.values(selectedOption)[0];
            setValue((prev) => ({ ...prev, [field]: key }));
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
                        const key = Object.values(option)[0];
                        const optionValue = Object.values(option)[1];
                        return (
                            <option
                                key={key}
                                value={key}
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