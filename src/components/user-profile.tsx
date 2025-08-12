"use client";

import Image from "next/image";
import { useState } from "react";

export default function UserProfile() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className="relative"
        >
            <button
                onClick={toggleOpen}
                className="flex flex-row items-center justify-between gap-2 rounded-lg w-fit border border-gray-600 p-2 cursor-pointer"
            >
                <Image
                    src="/user-unknown.jpg"
                    alt="User profile picture"
                    className="rounded-full"
                    width={40}
                    height={40}
                />
                <div
                    className="flex flex-col items-start gap-0.5"
                >
                    <span className="font-sora font-semibold text-sm text-white-cream">
                        Sebastian Urdanegui
                    </span>
                    <span className="font-geist font-normal text-xs text-white-cream">
                        @sebastianurdanegui
                    </span>
                </div>
            </button>
            {
                isOpen && (
                    <div className="absolute bg-black top-16 right-0 z-10 w-fit rounded-tl-lg rounded-bl-lg rounded-br-lg border border-gray-600 p-2">
                        <button
                            className="flex flex-row items-center gap-2 justify-between w-fit cursor-pointer"
                        >
                            <span className="w-fit h-fit flex flex-row items-center justify-center rounded-full border border-gray-600 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
                            </span>
                            <span className="font-sora font-semibold text-sm text-white-cream">
                                Cerrar sesión
                            </span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}