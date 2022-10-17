import type { Ref } from 'vue';
export declare const useStrapiUser: <T = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}>() => Ref<T>;
