interface CardNotificationProps {
    platform_name: string;
    amount: number;
    currency: string;
    next_date: string;
}

export default function CardNotification({ platform_name, amount, currency, next_date }: CardNotificationProps) {
    return (
        <div
            className="border-t border-b border-gray-600 p-3 flex flex-row items-center gap-6 hover:bg-[rgba(255,255,255,0.03)] rounded-lg"
        >
            <span
                className="flex justify-center items-center rounded-full border border-gray-500 p-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 22a2.02 2.02 0 0 1-2.01-2h4a2.02 2.02 0 0 1-.15.78a2.042 2.042 0 0 1-1.44 1.18h-.047A1.922 1.922 0 0 1 12 22Zm8-3H4v-2l2-1v-5.5a8.065 8.065 0 0 1 .924-4.06A4.654 4.654 0 0 1 10 4.18V2h4v2.18c2.579.614 4 2.858 4 6.32V16l2 1v2Z"/></svg>
            </span>
            <div className="flex flex-col gap-1 grow">
                <p
                    className="font-geist font-bold text-base text-white-cream"
                >
                    {platform_name}
                </p>
                <span className="font-geist text-sm text-gray-400">
                    {currency} - {amount}
                </span>
            </div>
            <div className="flex flex-row items-center gap-2">
                <span className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#ffffff" d="M14.5 16h-13C.67 16 0 15.33 0 14.5v-12C0 1.67.67 1 1.5 1h13c.83 0 1.5.67 1.5 1.5v12c0 .83-.67 1.5-1.5 1.5M1.5 2c-.28 0-.5.22-.5.5v12c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5z"/><path fill="#ffffff" d="M4.5 4c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m7 0c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5m4 2H.5C.22 6 0 5.78 0 5.5S.22 5 .5 5h15c.28 0 .5.22.5.5s-.22.5-.5.5"/></svg>
                </span>
                <span className="font-geist text-white-cream text-sm">
                    {next_date}
                </span>
            </div>
            <div className="flex justify-center items-center">
                <span
                    className="font-geist text-sm text-white-cream bg-[rgba(0,102,255,0.7)] px-2 py-1 rounded-xl"
                >
                    Por vencer
                </span>
            </div>
            {/* <div className="relative flex justify-center items-center gap-3">
                <span className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><path fill="#FFF" d="M195.368 60.632H60.632v134.736h134.736z"/><path fill="#EA4335" d="M195.368 256L256 195.368l-30.316-5.172l-30.316 5.172l-5.533 27.73z"/><path fill="#188038" d="M0 195.368v40.421C0 246.956 9.044 256 20.21 256h40.422l6.225-30.316l-6.225-30.316l-33.033-5.172z"/><path fill="#1967D2" d="M256 60.632V20.21C256 9.044 246.956 0 235.79 0h-40.422q-5.532 22.554-5.533 33.196q0 10.641 5.533 27.436q20.115 5.76 30.316 5.76T256 60.631"/><path fill="#FBBC04" d="M256 60.632h-60.632v134.736H256z"/><path fill="#34A853" d="M195.368 195.368H60.632V256h134.736z"/><path fill="#4285F4" d="M195.368 0H20.211C9.044 0 0 9.044 0 20.21v175.158h60.632V60.632h134.736z"/><path fill="#4285F4" d="M88.27 165.154c-5.036-3.402-8.523-8.37-10.426-14.94l11.689-4.816q1.59 6.063 5.558 9.398c2.627 2.223 5.827 3.318 9.566 3.318q5.734 0 9.852-3.487c2.746-2.324 4.127-5.288 4.127-8.875q0-5.508-4.345-8.994c-2.897-2.324-6.535-3.486-10.88-3.486h-6.754v-11.57h6.063q5.608 0 9.448-3.033c2.56-2.02 3.84-4.783 3.84-8.303c0-3.132-1.145-5.625-3.435-7.494c-2.29-1.87-5.188-2.813-8.708-2.813c-3.436 0-6.164.91-8.185 2.745a16.1 16.1 0 0 0-4.413 6.754l-11.57-4.817c1.532-4.345 4.345-8.185 8.471-11.503s9.398-4.985 15.798-4.985c4.733 0 8.994.91 12.767 2.745c3.772 1.836 6.736 4.379 8.875 7.613c2.14 3.25 3.2 6.888 3.2 10.93c0 4.126-.993 7.613-2.98 10.476s-4.43 5.052-7.327 6.585v.69a22.25 22.25 0 0 1 9.398 7.327c2.442 3.284 3.672 7.208 3.672 11.79c0 4.58-1.163 8.673-3.487 12.26c-2.324 3.588-5.54 6.417-9.617 8.472c-4.092 2.055-8.69 3.1-13.793 3.1c-5.912.016-11.369-1.685-16.405-5.087m71.797-58.005l-12.833 9.28l-6.417-9.734l23.023-16.607h8.825v78.333h-12.598z"/></svg>
                </span>
                <div
                    className="relative group flex justify-center items-center cursor-pointer"
                >
                    <span
                        className="flex justify-center items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="#999999" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M10 8.484C10.5 7.494 11 7 12 7c1.246 0 2 .989 2 1.978s-.5 1.483-2 2.473V13m0 3.5v.5"/></g></svg>
                    </span>

                    <div className="absolute bottom-full mb-2 px-2 py-1 bg-black font-geist text-white-cream text-xs rounded-lg shadow-lg
                        opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transtion-all duration-200 ease-out">
                            La suscripción se encuentra sincronizada con Google Calendar.
                    </div>
                </div>
            </div> */}
        </div>
    )
}