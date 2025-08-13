import { useInfiniteQuery } from "@tanstack/react-query";
import requester from "@/lib/requester";

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

type ItemsResponseAPI = {
    data: Item[];
}

type ItemsResponse = {
    items: Item[];
    hasMore: boolean;
}

const PAGE_SIZE = 15;

export const useItemsTable = (
    user_id: string,
) => {
    return useInfiniteQuery<ItemsResponse, Error>({
        queryKey: ["transactions", user_id],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0}) => {
            if (!user_id) return { items: [], hasMore: false };
            const from = (pageParam as number) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;
            const url = `/transactions/${user_id}?offset=${from}&limit=${to}`;
            const response = await requester.get<ItemsResponseAPI>(url);
            const hasMore = response.data.data.length === PAGE_SIZE;
            return {
                items: response.data.data,
                hasMore,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length : undefined;
        },
        refetchOnWindowFocus: false,
    })
}