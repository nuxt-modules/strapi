import { useRuntimeConfig } from "#app";
export const useStrapiVersion = () => {
  const config = useRuntimeConfig();
  return config.strapi.version;
};
