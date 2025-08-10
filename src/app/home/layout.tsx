import Link from "next/link";
import UserProfile from "@/components/user-profile";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-6xl w-full h-full flex flex-col gap-8 justify-start p-8">
            <header
                className="flex flex-row justify-between items-start"
            >
                <Link 
                    href="/"
                    className="font-sora text-lg sm:text-2xl font-semibold text-white-cream"
                >
                    suscripto
                </Link>
                <div className="flex flex-row gap-4">
                    <Link
                        className="
                            relative border border-gray-500 p-3 rounded-lg cursor-pointer flex justify-center items-center gap-2
                            overflow-hidden
                            [&::after]:content-['']
                            [&::after]:absolute [&::after]:inset-0
                            [&::after]:bg-blue-600
                            [&::after]:scale-x-0
                            [&::after]:origin-left
                            [&::after]:transition-transform [&::after]:duration-300 [&::after]:ease-in-out
                            hover:[&::after]:scale-x-100 hover:[&::after]:origin-right
                            hover:shadow-[3px_3px_0px_rgba(0,102,255,0.4)]
                            "
                        href="/home/dashboard"
                    >
                        <span className="relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"/></svg>
                        </span>
                        <span className="font-sora text-sm z-10 text-white text-center">
                            Dashboard
                        </span>
                    </Link>
                    <Link
                        className="
                            relative border border-gray-500 p-3 rounded-lg cursor-pointer flex justify-center items-center gap-2
                            overflow-hidden
                            [&::after]:content-['']
                            [&::after]:absolute [&::after]:inset-0
                            [&::after]:bg-blue-600
                            [&::after]:scale-x-0
                            [&::after]:origin-left
                            [&::after]:transition-transform [&::after]:duration-300 [&::after]:ease-in-out
                            hover:[&::after]:scale-x-100 hover:[&::after]:origin-right
                            hover:shadow-[3px_3px_0px_rgba(0,102,255,0.4)]
                            "
                        href="/home/subscriptions"
                    >
                        <span className="relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 16H3v3q0 .825.588 1.413T5 21h6zm2 0v5h6q.825 0 1.413-.587T21 19v-3zm-2-2V9H3v5zm2 0h8V9h-8zM3 7h18V5q0-.825-.587-1.412T19 3H5q-.825 0-1.412.588T3 5z"/></svg>
                        </span>
                        <span className="relative font-sora text-sm z-10 text-white text-center">
                            Suscripciones
                        </span>
                    </Link>
                    <Link
                        className="
                            relative border border-gray-500 p-3 rounded-lg cursor-pointer flex justify-center items-center gap-2
                            overflow-hidden
                            [&::after]:content-['']
                            [&::after]:absolute [&::after]:inset-0
                            [&::after]:bg-blue-600
                            [&::after]:scale-x-0
                            [&::after]:origin-left
                            [&::after]:transition-transform [&::after]:duration-300 [&::after]:ease-in-out
                            hover:[&::after]:scale-x-100 hover:[&::after]:origin-right
                            hover:shadow-[3px_3px_0px_rgba(0,102,255,0.4)]
                            "
                        href="/home/notifications"
                    >
                        <span className="relative z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 16H3v3q0 .825.588 1.413T5 21h6zm2 0v5h6q.825 0 1.413-.587T21 19v-3zm-2-2V9H3v5zm2 0h8V9h-8zM3 7h18V5q0-.825-.587-1.412T19 3H5q-.825 0-1.412.588T3 5z"/></svg>
                        </span>
                        <span className="relative font-sora text-sm z-10 text-white text-center">
                            Notificaciones
                        </span>
                    </Link>
                </div>
                <UserProfile />
            </header>
            {children}
        </div>
    )
}