import type { Strapi3RequestParams } from '../types/v3';
/**
 * @deprecated use `useStrapi` for correct types
 */
export declare const useStrapi3: () => {
    count: (contentType: string, params?: Strapi3RequestParams) => Promise<number>;
    find: <T>(contentType: string, params?: Strapi3RequestParams) => Promise<T>;
    findOne: <T_1>(contentType: string, id: string | number, params?: Strapi3RequestParams) => Promise<T_1>;
    create: <T_2>(contentType: string, data: Partial<T_2>) => Promise<T_2>;
    update: <T_3>(contentType: string, id: string | number | Partial<T_3>, data?: Partial<T_3>) => Promise<T_3>;
    delete: <T_4>(contentType: string, id?: string | number) => Promise<T_4>;
};
