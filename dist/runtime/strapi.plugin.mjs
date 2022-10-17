import { defineNuxtPlugin } from "#app";
import { useStrapiAuth } from "./composables/useStrapiAuth.mjs";
export default defineNuxtPlugin(async () => {
  const { fetchUser } = useStrapiAuth();
  await fetchUser();
});
