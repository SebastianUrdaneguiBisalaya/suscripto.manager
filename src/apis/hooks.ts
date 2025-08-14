import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUser,
    getStatistics,
    getSubscriptions,
    getTotalByMonth,
    getNotifications,
    postRegisterForm,
    postCancelSubscription,
    getPlatforms,
    getPaymentMethods,
    postCreateCalendar,
    postCreateCalendarEvent,
    postDeleteCalendarEvent,
} from "@/apis/endpoints";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/useUserStore";

export const useUserData = ({ user_id }: { user_id: string }) => {
    return useQuery({
        queryKey: ["user", user_id],
        queryFn: async () => {
            const response = await getUser({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!user_id,
    });
}

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
            const res = await postRegisterForm({
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
            return res.data;
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
            user_id,
        }: {
            subscription_id: string;
            user_id: string;
        }) => {
            await postCancelSubscription({
                data: {
                    subscription_id,
                    user_id,
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

export const useCreateCalendar = () => {
    const { user, setUser } = useUserStore();
    return useMutation({
        mutationFn: async ({
            user_id,
        }: {
            user_id: string;
        }) => {
            const response = await postCreateCalendar({
                data: {
                    user_id,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            if (user && data?.id) {
                setUser({
                    ...user,
                    google_calendar_id: data.id,
                })
            }
        },
        onError: (error: AxiosError) => {
            console.error(error);
        },
    });
}

export const useCreateCalendarEvent = () => {
    return useMutation({
        mutationFn: async ({
            calendar_id,
            body,
        }: {
            calendar_id: string;
            body: {
                subscription_id: string;
                summary: string;
                description: string;
                date: string;
                recurrence: string;
            };
        }) => {
            await postCreateCalendarEvent({
                data: {
                    calendar_id,
                    body,
                },
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
        },
    });
}

export const useDeleteCalendarEvent = () => {
    return useMutation({
        mutationFn: async ({
            calendar_id,
            body,
        }: {
            calendar_id: string;
            body: {
                event_id: string;
            };
        }) => {
            await postDeleteCalendarEvent({
                data: {
                    calendar_id,
                    body,
                },
            });
        },
        onError: (error: AxiosError) => {
            console.error(error);
        },
    });
}