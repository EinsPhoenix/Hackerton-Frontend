/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  IOS_CLIENT_ID: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  WEB_CLIENT_ID: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
}
