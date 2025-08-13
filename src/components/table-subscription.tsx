"use client";

import { useState } from "react";
import { firstLetterToUpperCase } from "@/lib/fn";
import icons from "@/constants/icons";
import CancelSubscription from "@/components/cancel-subscription";

interface ItemProps {
    id: string;
    platforms: {
        platform_name: string;
    };
    amount: number;
    currency: string;
    recurrence: string;
}

interface ItemsProps {
    data: ItemProps[];
    title: string;
    subtitle: string;
}

interface CancelSubscriptionProps {
    subscription_id: string;
    platform_name: string;
}

export default function TableSubscription({
    data,
    title,
    subtitle,
}: ItemsProps) {
    const [isShownModal, setIsShownModal] = useState<boolean>(false);
    const [dataToCancel, setDataToCancel] = useState<CancelSubscriptionProps>({
        subscription_id: "",
        platform_name: "",
    });
    const headers = ["Plataforma", "Moneda", "Monto", "Frecuencia"];
    const renderData = data.map((item) => {
        return {
            id: item.id,
            icon: icons.find((icon) => icon.name === item.platforms.platform_name)?.icon,
            company: item?.platforms.platform_name,
            currency: item.currency,
            amount: item.amount,
            recurrence: item.recurrence,
        }
    });

    const toggleOpen = () => {
        setIsShownModal((prev) => !prev);
    }

    const handleDeleteSubscription = (company: string) => {
        const findSubscriptionId = data.find((item) => item.platforms.platform_name === company)?.id;
        console.log(findSubscriptionId);
        setDataToCancel({
            subscription_id: findSubscriptionId ?? "",
            platform_name: company,
        });
        toggleOpen();
    }
    return (
        <div
            className="w-full flex flex-col p-4 gap-4"
        >
            <div className="flex flex-row items-center gap-2 pb-2 border-b border-gray-500">
				<span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 21q-.425 0-.712-.288T2 20t.288-.712T3 19h18q.425 0 .713.288T22 20t-.288.713T21 21zm1.5-3q-.625 0-1.062-.437T3 16.5v-4q0-.625.438-1.062T4.5 11t1.063.438T6 12.5v4q0 .625-.437 1.063T4.5 18m5 0q-.625 0-1.062-.437T8 16.5v-9q0-.625.438-1.062T9.5 6t1.063.438T11 7.5v9q0 .625-.437 1.063T9.5 18m5 0q-.625 0-1.062-.437T13 16.5v-6q0-.625.438-1.062T14.5 9t1.063.438T16 10.5v6q0 .625-.437 1.063T14.5 18m5 0q-.625 0-1.062-.437T18 16.5v-12q0-.625.438-1.062T19.5 3t1.063.438T21 4.5v12q0 .625-.437 1.063T19.5 18"/></svg>
				</span>
                <h2
                    className="font-sora text-2xl text-white-cream text-left font-semibold"
                >
                    {title}
                </h2>
			</div>
            <p className="font-geist text-sm text-gray-300 font-normal text-left w-full">
                {subtitle}
            </p>
            <div
                className="w-full overflow-x-auto hide-scrollbar"
            >
                <table className="table-auto w-full">
                    <thead>
                        <tr
                            key="header"
                            className="border-b border-gray-500">
                            {
                                headers.map((header, index) => {
                                    return (
                                        <th
                                            key={index}
                                            className="text-white-cream text-center font-bold text-sm px-4 py-2 whitespace-nowrap"
                                        >
                                            {firstLetterToUpperCase(header)}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                renderData.map((item) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-[rgba(255,255,255,0.05)] cursor-pointer border-b border-gray-600/30"
                                            onClick={() => handleDeleteSubscription(item.company)}
                                        >
                                            <td
                                                className="px-4 py-2"
                                            >
                                                <div
                                                    className="flex flex-row items-center gap-4 justify-center w-fit"
                                                >
                                                    {item.icon ? (
                                                        <span
                                                            className="opacity-50 shrink-0 h-auto w-8 flex items-center justify-center"
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        ) : (
                                                            <span
                                                                className="opacity-50 shrink-0 h-auto w-8 flex items-center justify-center"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#ffffff"><path d="M7 15a3 3 0 1 0 0 6a3 3 0 0 0 0-6m10 0a3 3 0 1 0 0 6a3 3 0 0 0 0-6m-3 2h-4m12-4c-2.457-1.227-6.027-2-10-2s-7.543.773-10 2"/><path d="m19 11.5l-1.058-6.788c-.215-1.384-1.719-2.134-2.933-1.463l-.615.34a4.94 4.94 0 0 1-4.788 0l-.615-.34c-1.214-.67-2.718.08-2.933 1.463L5 11.5"/></g></svg>
                                                            </span>
                                                        )
                                                    }
                                                    <span
                                                        className="font-geist text-white-cream text-right text-sm whitespace-nowrap"
                                                    >
                                                        {firstLetterToUpperCase(String(item.company))}
                                                    </span>
                                                </div>
                                            </td>

                                            <td
                                                className="font-geist text-white-cream text-center text-sm px-4 py-2 whitespace-nowrap"
                                            >
                                                {firstLetterToUpperCase(String(item.currency))}
                                            </td>

                                            <td
                                                className="font-geist text-white-cream text-center text-sm px-4 py-2 whitespace-nowrap"
                                            >
                                                {firstLetterToUpperCase(String(item.amount))}
                                            </td>

                                            <td
                                                className="font-geist text-white-cream text-center text-sm px-4 py-2 whitespace-nowrap"
                                            >
                                                {firstLetterToUpperCase(String(item.recurrence))}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
            </div>
            {
                isShownModal && (
                    <CancelSubscription
                        subscription_id={dataToCancel.subscription_id}
                        platform_name={dataToCancel.platform_name}
                        isShown={isShownModal}
                        toggle={toggleOpen}
                    />
                )
            }
        </div>
    )
}