"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "@/components/user-profile";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "unset";
        }
        return () => {
            document.body.style.overflowY = "unset";
        }
    }, [isOpen]);
    return (
        <>
            <button
                type="button"
                className="cursor-pointer flex items-center justify-center lg:hidden"
                onClick={toggleSidebar}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"/></svg>
            </button>
            {
                isOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-lg z-[80] px-2 overflow-hidden"
                        onClick={toggleSidebar}
                    >
                        <div 
                            className="absolute top-0 right-0 w-full max-w-64 bg-black border-l border-gray-600 p-4 overflow-y-auto h-dvh hidde-scrollbar flex flex-col items-end gap-8 overflow-x-hidden z-[100]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="flex items-center justify-center bg-white-cream rounded-full p-1 cursor-pointer w-fit h-fit"
                                type="button"
                                onClick={toggleSidebar}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="#000000" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"/></svg>
                            </button>
                            <UserProfile />
                            <div className="flex flex-col gap-6 w-full pl-2">
                                <Link
                                    href="/home/dashboard"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg>
                                    </span>
                                    <span className="font-sora text-sm text-white text-center">
                                        Dashboard
                                    </span>
                                </Link>
                                <Link
                                    href="/home/subscriptions"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 16H3v3q0 .825.588 1.413T5 21h6zm2 0v5h6q.825 0 1.413-.587T21 19v-3zm-2-2V9H3v5zm2 0h8V9h-8zM3 7h18V5q0-.825-.587-1.412T19 3H5q-.825 0-1.412.588T3 5z"/></svg>
                                    </span>
                                    <span className="relative font-sora text-sm text-white text-center">
                                        Suscripciones
                                    </span>
                                </Link>
                                <Link
                                    href="/home/notifications"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2"/><circle cx="12" cy="3" r="1"/></g></svg>
                                    </span>
                                    <span className="relative font-sora text-sm text-white text-center">
                                        Notificaciones
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}