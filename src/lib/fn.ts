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

const formatDate = (date: Date) => {
    const dateTime = new Date(date);
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear();
    return `${year}-${month}-${day}`;
}

export {
    firstLetterToUpperCase,
    formatAmout,
    cutFullName,
    formatDate,
}