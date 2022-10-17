import type { FetchOptions } from 'ohmyfetch';
export declare const useStrapiClient: () => <T>(url: string, fetchOptions?: FetchOptions) => Promise<T>;
