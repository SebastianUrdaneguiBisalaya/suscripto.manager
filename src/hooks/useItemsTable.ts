import { useInfiniteQuery } from "@tanstack/react-query";
import requester from "@/lib/requester";
import { dataTable } from "@/constants/data";

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

type ItemsResponse = {
    items: Item[];
    hasMore: boolean;
}

const PAGE_SIZE = 15;

export const useItemsTable = (
    user_id: string,
) => {
    // return useInfiniteQuery<ItemsResponse, Error>({
    //     queryKey: ["payments", user_id],
    //     initialPageParam: 0,
    //     queryFn: async ({ pageParam = 0}) => {
    //         const from = (pageParam as number) * PAGE_SIZE;
    //         const to = from + PAGE_SIZE - 1;
    //         const url = `/api/payments/${user_id}?from=${from}&to=${to}`;
    //         const response = await requester.get<ItemsResponse>(url);
    //         const hasMore = response.data.items.length === PAGE_SIZE;
    //         return {
    //             items: response.data.items,
    //             hasMore,
    //         };
    //     },
    //     getNextPageParam: (lastPage, allPages) => {
    //         return lastPage.hasMore ? allPages.length : undefined;
    //     },
    //     refetchOnWindowFocus: false,
    // })
    return dataTable;
}