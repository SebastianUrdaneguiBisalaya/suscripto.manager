import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getStatistics,
    getSubscriptions,
    getTotalByMonth,
    getNotifications,
    postRegisterForm,
    postCancelSubscription,
    getPlatforms,
    getPaymentMethods,
} from "@/apis/endpoints";
import { AxiosError } from "axios";

export const useDashboardData = ({ user_id }: { user_id: string }) => {
    return useQueries({
        queries: [
            {
                queryKey: ["statistics", user_id],
                queryFn: async () => (
                    await getStatistics({
                        data: {
                            user_id,
                        },
                    })
                ),
                refetchOnWindowFocus: false,
                enabled: !!user_id,
            },
            {
                queryKey: ["subscriptions", user_id],
                queryFn: async () => (
                    await getSubscriptions({
                        data: {
                            user_id,
                        },
                    })
                ),
                refetchOnWindowFocus: false,
                enabled: !!user_id,
            },
            {
                queryKey: ["total-by-month", user_id],
                queryFn: async () => (
                    await getTotalByMonth({
                        data: {
                            user_id,
                        },
                    })
                ),
                refetchOnWindowFocus: false,
                enabled: !!user_id,
            },
        ]
    })
}

export const useNotifications = ({ user_id }: { user_id: string }) => {
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
            payment_method_id: string | null;
            card_number: string | null;
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
        // onSuccess: (_data, variables) => {
        //     queryClient.invalidateQueries({
        //         queryKey: ["statistics", variables.user_id],
        //     });
        //     queryClient.invalidateQueries({
        //         queryKey: ["subscriptions", variables.user_id],
        //     });
        //     queryClient.invalidateQueries({
        //         queryKey: ["total-by-month", variables.user_id],
        //     });
        // },
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

export const useGetPlatforms = () => {
    return useQuery({
        queryKey: ["platforms"],
        queryFn: async () => {
            const response = await getPlatforms();
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true,
        staleTime: 60 * 60 * 1000,
    });
}

export const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: ["payment-methods"],
        queryFn: async () => {
            const response = await getPaymentMethods();
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: true,
        staleTime: 60 * 60 * 1000,
    });
}

