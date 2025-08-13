const firstLetterToUpperCase = (value: string) => {
    if (!value) return "";
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
};

const formatAmout = (value: number) => {
    if (isNaN(value)) return "";
    return Number(value).toFixed(2);
};

const cutFullName = (fullName: string) => {
    const name = fullName.split(" ").slice(0, 2).join(" ");
    return name;
};

export {
    firstLetterToUpperCase,
    formatAmout,
    cutFullName
}