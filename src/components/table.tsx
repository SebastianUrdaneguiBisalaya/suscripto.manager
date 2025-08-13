"use client";

import { useRef, useMemo, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper
} from "@tanstack/react-table";
import { useItemsTable } from "@/hooks/useItemsTable";
import { formatAmout } from "@/lib/fn";
import icons from "@/constants/icons";

interface Item {
    id: string;
    company: string;
    transaction_date: string;
    start_date: string;
    next_date: string;
    recurrence: string;
    amount: number;
    currency: string;
    card_type?: string;
    card_number?: string;
}

const columnHelper = createColumnHelper<Item>();

const columns = [
    columnHelper.accessor("transaction_date", {
        header: "Fecha",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("company", {
        header: "Plataforma",
        cell: (info) => {
            const companyName = String(info.getValue()) ?? "";
            const foundIcon = icons.find((icon) => icon.name === companyName);
            return (
                <div
                    className="flex flex-row items-center gap-4 justify-center w-fit"
                >
                    {
                        foundIcon ? (
                            <span
                                className="opacity-50 shrink-0 h-auto w-8 flex items-center justify-center"
                            >
                                {foundIcon.icon}
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
                        className=""
                    >
                        {companyName}
                    </span>
                </div>
            )
        },
    }),
    columnHelper.accessor("start_date", {
        header: "Inicio de la suscripción",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("recurrence", {
        header: "Recurrencia",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("currency", {
        header: "Moneda",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
        header: "Monto",
        cell: (info) => formatAmout(info.getValue()),
    }),
    columnHelper.accessor("next_date", {
        header: "Fecha del próximo pago",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("card_type", {
        header: "Tarjeta",
        cell: (info) => info.getValue() ?? "",
    }),
    columnHelper.accessor("card_number", {
        header: "Número de tarjeta",
        cell: (info) => {
            const value = String(info.getValue()) ?? "";
            return value ? `*** ${value}` : "";
        },
    }),
];

interface TableProps {
    user_id: string;
};

export default function Table({
    user_id,
}: TableProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useItemsTable(user_id);

    const items = useMemo(() => data?.pages.flatMap(page => page.items) ?? [],
    [data]);

    const table = useReactTable({
        data: items,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.5,
            }
        );
        const currentTarget = observerRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return (
            <div
                className="w-full flex flex-row items-center justify-center gap-4 p-4"
            >
                <span
                    className="flex justify-center items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#ffffff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                </span>
                <p className="font-geist text-white-cream text-sm text-center">Cargando datos...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div
                className="w-full p-4"
            >
                <p className="font-geist text-white-cream text-sm text-center">Error al cargar los datos</p>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col p-4 gap-4 w-full"
        >
            <div className="flex flex-col w-full overflow-x-auto hide-scrollbar">
                <table
                    className="min-w-full table-auto"
                >
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr
                                    key={headerGroup.id}
                                    className="border-t border-b border-gray-500"
                                >
                                    {
                                        headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="text-white-cream font-bold font-geist text-sm px-4 py-2 whitespace-nowrap"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => (
                                <tr
                                    key={row.id}
                                    className="transition hover:bg-[rgba(255,255,255,0.05)] border-b border-gray-600/30"
                                >
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className="text-white-cream text-center font-geist px-4 py-2 font-normal text-base whitespace-nowrap"
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div
                className="w-full h-1 my-2"
                ref={observerRef}
            />
            {
                isFetchingNextPage && (
                    <div
                        className="w-full flex flex-row items-center justify-center gap-4 px-4"
                    >
                        <span
                            className="flex justify-center items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="#ffffff" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path></svg>
                        </span>
                        <p className="font-geist text-white-cream text-sm text-center">Cargando datos...</p>
                    </div>
                )
            }
            {
                !hasNextPage && items.length > 0 && (
                    <div
                        className="w-full px-4"
                    >
                        <p className="font-geist text-white-cream text-sm text-center">No hay más datos</p>
                    </div>
                )
            }
            {
                items.length === 0 && (
                    <div
                        className="w-full px-4"
                    >
                        <p className="font-geist text-white-cream text-sm text-center">No hay datos</p>
                    </div>
                )
            }
        </div>
    )
}