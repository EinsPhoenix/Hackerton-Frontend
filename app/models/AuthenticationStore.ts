import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import {
  appServices,
  type LoginParams,
  Preference,
  type PreferencesParams,
  type SignupParams,
} from 'app/services'
import { decodeJwt, deviceType, JwtClaims, logger, showErrorToast } from 'app/utils'

/**
 * The AuthenticationStoreModel represents the state of the authentication process,
 * including user credentials and preferences.
 */
export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    claims: types.maybe(types.frozen<JwtClaims>()),
    loading: types.optional(types.boolean, false),
    selectedPreferences: types.maybe(types.frozen<Preference[]>()),
    token: types.maybe(types.string),
  })
  .views(store => ({
    /**
     * Checks if any user preferences are selected.
     * @returns {boolean} True if preferences are selected; otherwise false.
     */
    get arePreferencesSelected(): boolean {
      return !!store.selectedPreferences?.length
    },
    /**
     * Gets the current authentication token.
     * @returns {string | undefined} The authentication token.
     */
    get authToken(): string | undefined {
      return store.token
    },
    /**
     * Checks if the user is authenticated.
     * @returns {boolean} True if authenticated; otherwise false.
     */
    get isAuthenticated(): boolean {
      return !!store.token
    },
    /**
     * Checks if the authentication process is loading.
     * @returns {boolean} True if loading; otherwise false.
     */
    get isLoading(): boolean {
      return store.loading
    },
    /**
     * Gets the JWT claims.
     * @returns {JwtClaims | undefined} The JWT claims.
     */
    get jwtClaims(): JwtClaims | undefined {
      return store.claims
    },
    /**
     * Gets the selected user preferences.
     * @returns {Preference[]} An array of user preferences.
     */
    get preferences(): Preference[] {
      return store.selectedPreferences || []
    },
  }))
  .actions(store => ({
    /**
     * Logs in a user using Google authentication.
     * @param {string} token - The Google authentication token.
     */
    async googleLogin(token: string) {
      try {
        this.setLoading(true)
        const response = await appServices.googleLogin({
          devicetype: deviceType(),
          token,
        })
        this.setAuthData(response.token, response.preferences)
      } catch (error: any) {
        showErrorToast('error.login', error)
      } finally {
        this.setLoading(false)
      }
    },
    /**
     * Logs in a user with provided login parameters.
     * @param {LoginParams} loginParams - The login parameters.
     */
    async login(loginParams: LoginParams) {
      try {
        this.setLoading(true)
        const response = await appServices.loginUser(loginParams)
        this.setAuthData(response.token, response.preferences)
      } catch (error: any) {
        showErrorToast('error.login', error)
      } finally {
        this.setLoading(false)
      }
    },
    /**
     * Logs out the current user and clears the authentication data.
     */
    async logout() {
      store.token = undefined
      store.selectedPreferences = undefined
      store.claims = undefined
      store.loading = false
    },
    /**
     * Posts user preferences to the server.
     * @param {PreferencesParams} preferencesParams - The user preferences to post.
     */
    async postPreferences(preferencesParams: PreferencesParams) {
      try {
        this.setLoading(true)
        await appServices.postPreferences(preferencesParams)
        logger.log(preferencesParams.prefs)
        this.setPreferences(preferencesParams.prefs)
      } catch (error: any) {
        logger.log(error)
        showErrorToast('error.preferences', error)
      } finally {
        this.setLoading(false)
      }
    },
    /**
     * Sets the authentication data, including the token and preferences.
     * @param {string} token - The authentication token.
     * @param {Preference[]} preferences - The user preferences.
     */
    setAuthData(token: string, preferences: Preference[]) {
      logger.log(token, preferences)
      store.claims = decodeJwt(token)
      store.token = token
      this.setPreferences(preferences)
    },
    setLoading(value: boolean) {
      store.loading = value
    },
    setPreferences(preferences: Preference[]) {
      store.selectedPreferences = preferences
    },
    /**
     * Signs up a new user with the provided signup parameters.
     * @param {SignupParams} signupParams - The signup parameters.
     */
    async signup(signupParams: SignupParams) {
      try {
        this.setLoading(true)
        const response = await appServices.signupUser(signupParams)
        this.setAuthData(response.token, response.preferences)
      } catch (error: any) {
        showErrorToast('error.signup', error)
      } finally {
        this.setLoading(false)
      }
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
