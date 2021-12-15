/* eslint-disable camelcase */

import type { Ref } from 'vue'
import type {
  StrapiAuthenticationData,
  StrapiAuthenticationResponse,
  StrapiAuthProvider,
  StrapiEmailConfirmationData,
  StrapiForgotPasswordData,
  StrapiRegistrationData,
  StrapiResetPasswordData,
  StrapiUser
} from '../types'
import { useStrapiToken } from '../composables/useStrapiToken'
import { useStrapiUser } from '../composables/useStrapiUser'
import { useStrapiClient } from '../composables/useStrapiClient'
import { useStrapiUrl } from '../composables/useStrapiUrl'

export const useStrapiAuth = () => {
  const url = useStrapiUrl()
  const token = useStrapiToken()
  const user = useStrapiUser()
  const client = useStrapiClient()

  const setToken = (value: string | null) => {
    token.value = value
  }
  const setUser = (value: StrapiUser) => {
    user.value = value
  }

  const fetchUser = async (): Promise<Ref<StrapiUser>> => {
    if (token.value && !user.value) {
      try {
        user.value = await client('/users/me')
      } catch (e) {
        setToken(null)
      }
    }

    return user
  }

  /**
   * Authenticate user & retrieve his JWT
   *
   * @param  {StrapiAuthenticationData} data - User authentication form: `identifier`, `password`
   * @param  {string} data.identifier - The email or username of the user
   * @param  {string} data.password - The password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const login = async (data: StrapiAuthenticationData): Promise<StrapiAuthenticationResponse> => {
    setToken(null)

    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local', { method: 'POST', body: data })

    await setToken(jwt)

    const user = await fetchUser()

    return {
      user,
      jwt
    }
  }

  /**
   * Logout by removing authentication token
   *
   * @returns void
   */
  const logout = (): void => {
    setToken(null)
    setUser(null)
  }

  /**
   * Register a new user & retrieve JWT
   *
   * @param  {StrapiRegistrationData} data - New user registration form: `username`, `email`, `password`
   * @param  {string} data.username - Username of the new user
   * @param  {string} data.email - Email of the new user
   * @param  {string} data.password - Password of the new user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const register = async (data: StrapiRegistrationData): Promise<StrapiAuthenticationResponse> => {
    setToken(null)

    const { jwt }: StrapiAuthenticationResponse = await client('/auth/local/register', { method: 'POST', body: data })

    await setToken(jwt)

    const user = await fetchUser()

    return {
      user,
      jwt
    }
  }

  /**
   * Send an email to a user in order to reset his password
   *
   * @param  {StrapiForgotPasswordData} data - Forgot password form: `email`
   * @param  {string} data.email - Email of the user who forgot his password
   * @returns Promise<void>
   */
  const forgotPassword = async (data: StrapiForgotPasswordData): Promise<void> => {
    setToken(null)

    await client('/auth/forgot-password', { method: 'POST', body: data })
  }

  /**
   * Reset the user password
   *
   * @param  {StrapiResetPasswordData} data - Reset password form: `code`, `password`, `passwordConfirmation`
   * @param  {string} data.code - Code received by email after calling the `forgotPassword` method
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const resetPassword = async (data: StrapiResetPasswordData): Promise<StrapiAuthenticationResponse> => {
    setToken(null)

    const { jwt }: StrapiAuthenticationResponse = await client('/auth/reset-password', { method: 'POST', body: data })

    await setToken(jwt)

    const user = await fetchUser()

    return {
      user,
      jwt
    }
  }

  /**
   * Send programmatically an email to a user in order to confirm his account
   *
   * @param  {StrapiEmailConfirmationData} data - Email confirmation form: `email`
   * @param  {string} data.email - Email of the user who want to be confirmed
   * @returns Promise<void>
   */
  const sendEmailConfirmation = async (data: StrapiEmailConfirmationData): Promise<void> => {
    await client('/auth/send-email-confirmation', { method: 'POST', body: data })
  }

  /**
   * Get the correct URL to authenticate with provider
   *
   * @param  {StrapiAuthProvider} provider - Provider name
   * @returns string
   */
  const getProviderAuthenticationUrl = (provider: StrapiAuthProvider): string => {
    return new URL(`/connect/${provider}`, url).href
  }

  /**
   * Authenticate user with the access_token
   *
   * @param  {StrapiAuthProvider} provider - Provider name
   * @param  {string} access_token - Access token returned by Strapi
   * @returns Promise<StrapiAuthenticationResponse>
   */
  const authenticateProvider = async (provider: StrapiAuthProvider, access_token: string): Promise<StrapiAuthenticationResponse> => {
    setToken(null)

    const { jwt }: StrapiAuthenticationResponse = await client(`/auth/${provider}/callback`, { method: 'GET', params: { access_token } })

    await setToken(jwt)

    const user = await fetchUser()

    return {
      user,
      jwt
    }
  }

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
  }
}
