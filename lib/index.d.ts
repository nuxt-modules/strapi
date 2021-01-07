import Vue from 'vue';
import { Context } from '@nuxt/types';
import { NuxtHTTPInstance } from '@nuxt/http';
import { NuxtCookies } from 'cookie-universal-nuxt';

type NuxtStrapiQueryParams<T> = T | { [key: string]: any };

interface NuxtStrapiGraphQLParams {
  query: string;
}

interface NuxtStrapiRegistrationData {
  username: string;
  email: string;
  password: string;
}

interface NuxtStrapiLoginData {
  /**
   * Can be either the email or the username set by the user.
   * */
  identifier: string;
  password: string;
}

interface NuxtStrapiEmailData {
  email: string;
}

interface NuxtStrapiResetPasswordData {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface NuxtStrapi {
  /**
   * Use this object to access details about the
   * authenticated user or to directly set a user prop.
   * */
  user: { [key: string]: any };

  /**
   * Get entries.
   * Returns entries matching the query filters.
   * You can read more about parameters
   * [here](https://strapi.io/documentation/developer-docs/latest/content-api/parameters.html).
   * */
  find<T = any, Entities = string>(entity: Entities, params?: NuxtStrapiQueryParams<T> ): Promise<T>;

  /**
   * Count entries.
   * Returns the count of entries matching the query filters.
   * You can read more about parameters
   * [here](https://strapi.io/documentation/developer-docs/latest/content-api/parameters.html).
   * */
  count<T = any, Entities = string>(entity: Entities, params?: NuxtStrapiQueryParams<T>): Promise<number>;

  /**
   * Get an entry by id and returns its value.
   * */
  findOne<T = any, Entities = string>(entity: Entities, id?: string): Promise<T>;

  /**
   * Creates an entry and returns its value.
   * */
  create<T = any, Entities = string>(entity: Entities, data?: NuxtStrapiQueryParams<T>): Promise<T>;

  /**
   * Partially updates an entry by id and returns its value.
   * Fields that aren't sent in the query are not changed in the db.
   * Send a null value if you want to clear them.
   * */
  update<T = any, Entities = string>(entity: Entities, id: string, data?: NuxtStrapiQueryParams<T>): Promise<T>;

  /**
   * Deletes an entry by id and returns its value.
   * */
  delete<T = any, Entities = string>(entity: Entities, id: string): Promise<T>;

  /**
   * Performs an HTTP request to GraphQL API and returns the requested data.
   * */
  graphql<T = any>(data: NuxtStrapiGraphQLParams): Promise<T>;

  /**
   * Register using local strategy. Sets the User and Token.
   * */
  register(data: NuxtStrapiRegistrationData): Promise<void>;

  /**
   * Login using local strategy. Sets the User and Token.
   * */
  login(data: NuxtStrapiLoginData): Promise<void>;

  /**
   * Send a request to the forgot-password endpoint of the server.
   * */
  forgotPassword(data: NuxtStrapiEmailData): Promise<void>;

  /**
   * Send a request to the reset-password endpoint of the server.
   * */
  resetPassword(data: NuxtStrapiResetPasswordData): Promise<void>;

  /**
   * Send an email confirmation for the login.
   * */
  sendEmailConfirmation(data: NuxtStrapiEmailData): Promise<void>;

  /**
   * Clears the user and jwt in cookies.
   * */
  logout(): void;

  /**
   * Fetch me user from /users/me route if a jwt is present in the cookies.
   * Sets the jwt inside $http. Sets the User.
   * */
  fetchUser<T = any>(): Promise<T>;

  /**
   * This method fully overrides the user object, avoid using it.
   * You can use the $strapi.user property to mutate single
   * object properties instead of overriding it completely.
   * */
  setUser<T = any>(user: T): void;

  /**
   * Returns jwt from cookies.
   * */
  getToken(): string;

  /**
   * Sets token inside $http as a jwt Bearer.
   * Store jwt in cookies.
   * */
  setToken(token: string): void;

  /**
   * Remove jwt from $http and $cookies.
   * */
  clearToken(): void;

  $http: NuxtHTTPInstance;

  $cookies: NuxtCookies;
}

declare module 'vue/types/vue' {
  interface Vue {
    $strapi: NuxtStrapi;
  }
}

declare module '@nuxt/types' {
  interface Context {
    $strapi: NuxtStrapi;
  }
}
