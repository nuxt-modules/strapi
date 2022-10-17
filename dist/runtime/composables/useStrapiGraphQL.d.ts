import type { DocumentNode } from 'graphql';
import type { StrapiGraphqlVariables } from '../types';
export declare const useStrapiGraphQL: () => <T>(query: string | DocumentNode, variables?: StrapiGraphqlVariables) => Promise<T>;
