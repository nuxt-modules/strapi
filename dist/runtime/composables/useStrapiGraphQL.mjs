import { useRuntimeConfig } from "#app";
import { print } from "graphql";
import { useStrapiClient } from "./useStrapiClient.mjs";
export const useStrapiGraphQL = () => {
  const client = useStrapiClient();
  const config = useRuntimeConfig();
  return (query, variables) => {
    const queryAsString = typeof query === "string" ? query : print(query);
    return client("/graphql", {
      method: "POST",
      body: {
        query: queryAsString,
        variables
      },
      headers: {
        accept: "application/json"
      },
      baseURL: config.strapi.url
    });
  };
};
