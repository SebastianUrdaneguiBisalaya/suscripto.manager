import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getStatistics,
    getSubscriptions,
    getTotalByMonth,
    getTransactions,
    getNotifications,
    postRegisterForm,
    postCancelSubscription,
} from "@/apis/endpoints";
import { AxiosError } from "axios";

export const useStatistics = (user_id: string) => {
    return useQuery({
        queryKey: ["statistics", user_id],
        queryFn: async () => {
            const response = await getStatistics({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true && !!user_id,
    });
}

export const useSubscriptions = (user_id: string) => {
    return useQuery({
        queryKey: ["subscriptions", user_id],
        queryFn: async () => {
            const response = await getSubscriptions({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true && !!user_id,
    });
}

export const useTotalByMonth = (user_id: string) => {
    return useQuery({
        queryKey: ["total-by-month", user_id],
        queryFn: async () => {
            const response = await getTotalByMonth({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true && !!user_id,
    });
}

export const useTransactions = (user_id: string, limit: number, offset: number) => {
    return useQuery({
        queryKey: ["transactions", user_id, limit, offset],
        queryFn: async () => {
            const response = await getTransactions({
                data: {
                    user_id,
                    limit,
                    offset,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true && !!user_id && !!limit && !!offset,
    });
}

export const useNotifications = (user_id: string) => {
    return useQuery({
        queryKey: ["notifications", user_id],
        queryFn: async () => {
            const response = await getNotifications({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true && !!user_id,
    });
}

export const useRegisterForm = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            user_id,
            company_id,
            recurrence,
            amount,
            currency,
            date_start,
            payment_method_id,
            card_number,
        }: {
            user_id: string;
            company_id: string;
            recurrence: string;
            amount: number;
            currency: string;
            date_start: string;
            payment_method_id: string;
            card_number: string;
        }) => {
            await postRegisterForm({
                data: {
                    user_id,
                    company_id,
                    recurrence,
                    amount,
                    currency,
                    date_start,
                    payment_method_id,
                    card_number,
                },
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["statistics", variables.user_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["subscriptions", variables.user_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["total-by-month", variables.user_id],
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
        },
    });
}

export const useCancelSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            subscription_id,
        }: {
            subscription_id: string;
        }) => {
            await postCancelSubscription({
                data: {
                    subscription_id,
                },
            });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["statistics", variables.subscription_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["subscriptions", variables.subscription_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["total-by-month", variables.subscription_id],
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
        },
    });
}