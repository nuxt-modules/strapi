import { useRuntimeConfig } from "#app";
import { useStrapiToken } from "./useStrapiToken.mjs";
import { useStrapiUser } from "./useStrapiUser.mjs";
import { useStrapiClient } from "./useStrapiClient.mjs";
import { useStrapiUrl } from "./useStrapiUrl.mjs";
export const useStrapiAuth = () => {
  const url = useStrapiUrl();
  const token = useStrapiToken();
  const user = useStrapiUser();
  const client = useStrapiClient();
  const config = useRuntimeConfig();
  const setToken = (value) => {
    token.value = value;
  };
  const setUser = (value) => {
    user.value = value;
  };
  const fetchUser = async () => {
    if (token.value && !user.value) {
      try {
        user.value = await client("/users/me", { params: config.strapi.auth });
      } catch (e) {
        setToken(null);
      }
    }
    return user;
  };
  const login = async (data) => {
    setToken(null);
    const { jwt } = await client("/auth/local", { method: "POST", body: data });
    setToken(jwt);
    const user2 = await fetchUser();
    return {
      user: user2,
      jwt
    };
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };
  const register = async (data) => {
    setToken(null);
    const { jwt } = await client("/auth/local/register", { method: "POST", body: data });
    setToken(jwt);
    const user2 = await fetchUser();
    return {
      user: user2,
      jwt
    };
  };
  const forgotPassword = async (data) => {
    setToken(null);
    await client("/auth/forgot-password", { method: "POST", body: data });
  };
  const resetPassword = async (data) => {
    setToken(null);
    const { jwt } = await client("/auth/reset-password", { method: "POST", body: data });
    setToken(jwt);
    const user2 = await fetchUser();
    return {
      user: user2,
      jwt
    };
  };
  const sendEmailConfirmation = async (data) => {
    await client("/auth/send-email-confirmation", { method: "POST", body: data });
  };
  const getProviderAuthenticationUrl = (provider) => {
    return `${url}/connect/${provider}`;
  };
  const authenticateProvider = async (provider, access_token) => {
    setToken(null);
    const { jwt } = await client(`/auth/${provider}/callback`, { method: "GET", params: { access_token } });
    setToken(jwt);
    const user2 = await fetchUser();
    return {
      user: user2,
      jwt
    };
  };
  return {
    setToken,
    setUser,
    fetchUser,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    sendEmailConfirmation,
    getProviderAuthenticationUrl,
    authenticateProvider
  };
};
