"use client";

import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    }
    return (
        <button
            type="button"
            className="cursor-pointer flex items-center justify-center lg:hidden"
            onClick={toggleSidebar}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"/></svg>
        </button>
    )
}