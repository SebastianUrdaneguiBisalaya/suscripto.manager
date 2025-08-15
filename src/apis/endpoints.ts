import requester from "@/lib/requester";

type APIRequest<T> = {
    data: T;
}

type APIResponse<T> = {
    data: T | null;
    error: string | null;
}

type RequestStatistics = APIRequest<{
    user_id: string;
}>;

type ResponseStatistics = APIResponse<{
    total_pen: number;
    total_usd: number;
    accounts: number;
    platforms: number;
}[]>;

type RequestSubscriptions = APIRequest<{
    user_id: string;
}>;

type ResponseSubscriptions = APIResponse<{
    id: string;
    platforms: {
        platform_name: string;
    };
    currency: string;
    amount: number;
    recurrence: string;
}[]>;

type RequestTotalByMonth = APIRequest<{
    user_id: string;
}>;

type ResponseTotalByMonth = APIResponse<{
    month: string;
    currency: string;
    value: number;
}[]>;

type RequestNotifications = APIRequest<{
    user_id: string;
}>;

type ResponseNotifications = APIResponse<{
    platform_name: string;
    amount: number;
    currency: string;
    next_date: string;
}[]>;

type RequestCreateSubscription = APIRequest<{
    user_id: string;
    company_id: string;
    recurrence: string;
    amount: number;
    currency: string;
    date_start: string;
    payment_method_id: string | null | undefined;
    card_number: string | null | undefined;
}>;

type ResponseRegisterForm = APIResponse<{
    subscription_id: string;
}>;

type RequestCancelSubscription = APIRequest<{
    subscription_id: string;
    user_id: string;
}>;

type ResponsePlatforms = APIResponse<{
    platform_id: string;
    platform_name: string;
}[]>;

type ResposePaymentMethods = APIResponse<{
    payment_method_id: string;
    payment_method: string;
}[]>;

export const getStatistics = async ({
    data,
}: RequestStatistics): Promise<ResponseStatistics> => {
    const response = await requester.get<ResponseStatistics>(`/statistics/${data.user_id}`);
    return response.data;
}

export const getSubscriptions = async ({
    data,
}: RequestSubscriptions): Promise<ResponseSubscriptions> => {
    const response = await requester.get<ResponseSubscriptions>(`/subscriptions/${data.user_id}`);
    return response.data;
}

export const getTotalByMonth = async ({
    data,
}: RequestTotalByMonth): Promise<ResponseTotalByMonth> => {
    const response = await requester.get<ResponseTotalByMonth>(`/total-by-month/${data.user_id}`);
    return response.data;
}

export const getNotifications = async ({
    data,
}: RequestNotifications): Promise<ResponseNotifications> => {
    const response = await requester.get<ResponseNotifications>(`/notifications/${data.user_id}`);
    return response.data;
}

export const postRegisterForm = async ({
    data,
}: RequestCreateSubscription): Promise<ResponseRegisterForm> => {
    const response = await requester.post<ResponseRegisterForm>(`/register`, data);
    return response.data;
}

export const postCancelSubscription = async ({
    data,
}: RequestCancelSubscription): Promise<void> => {
    await requester.patch<void>(`/cancel/${data.user_id}`, data);
}

export const getPlatforms = async (): Promise<ResponsePlatforms> => {
    const response = await requester.get<ResponsePlatforms>(`/platforms`);
    return response.data;
}

export const getPaymentMethods = async (): Promise<ResposePaymentMethods> => {
    const response = await requester.get<ResposePaymentMethods>(`/payment_methods`);
    return response.data;
}