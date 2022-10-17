import { stringify } from "qs";
import { useNuxtApp } from "#app";
import { useStrapiUrl } from "./useStrapiUrl.mjs";
import { useStrapiVersion } from "./useStrapiVersion.mjs";
import { useStrapiToken } from "./useStrapiToken.mjs";
const defaultErrors = (err) => ({
  v4: {
    error: {
      status: 500,
      name: "UnknownError",
      message: err.message,
      details: err
    }
  },
  v3: {
    error: "UnknownError",
    message: err.message,
    statusCode: 500
  }
});
export const useStrapiClient = () => {
  const nuxt = useNuxtApp();
  const baseURL = useStrapiUrl();
  const version = useStrapiVersion();
  const token = useStrapiToken();
  return async (url, fetchOptions = {}) => {
    const headers = {};
    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }
    if (version === "v4" && fetchOptions.params) {
      const params = stringify(fetchOptions.params, { encodeValuesOnly: true });
      if (params) {
        url = `${url}?${params}`;
      }
      delete fetchOptions.params;
    }
    try {
      return await $fetch(url, {
        retry: 0,
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (err) {
      const e = err.data || defaultErrors(err)[version];
      nuxt.hooks.callHook("strapi:error", e);
      throw e;
    }
  };
};
