"use client";

import { useRef, useMemo, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper
} from "@tanstack/react-table";
import { useItemsTable } from "@/hooks/useItemsTable";

interface Item {
    id: string;
    company: string;
    current_date: string;
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
    columnHelper.accessor("current_date", {
        header: "Fecha actual",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("company", {
        header: "Plataforma",
        cell: (info) => info.getValue(),
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
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("next_date", {
        header: "Fecha del próximo pago",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("card_type", {
        header: "Tarjeta",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("card_number", {
        header: "Número de tarjeta",
        cell: (info) => info.getValue(),
    }),
];

interface TableProps {
    user_id: string;
    setTableData: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function Table({
    user_id,
    setTableData,
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

    useEffect(() => {
        if (items.length > 0) {
            setTableData(items);
        }
    }, [items, setTableData]);

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
            className="flex flex-col p-4 w-full overflow-x-auto"
        >
            <table
                className="min-w-full table-auto"
            >
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr
                                key={headerGroup.id}
                                className="border-t border-t-gray-500"
                            >
                                {
                                    headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="text-white-cream font-medium text-sm px-4 py-2 whitespace-nowrap"
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
                                className="transition hover:bg-[rgba(255,255,255,0.03)]"
                            >
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="text-white-cream text-center px-4 py-2 font-normal text-base whitespace-nowrap"
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
            <div
                className="w-full h-4 my-2"
                ref={observerRef}
            />
            {
                isFetchingNextPage && (
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
            {
                !hasNextPage && items.length > 0 && (
                    <div
                        className="w-full p-4"
                    >
                        <p className="font-geist text-white-cream text-sm text-center">No hay más datos</p>
                    </div>
                )
            }
            {
                items.length === 0 && (
                    <div
                        className="w-full p-4"
                    >
                        <p className="font-geist text-white-cream text-sm text-center">No hay datos</p>
                    </div>
                )
            }
        </div>
    )
}