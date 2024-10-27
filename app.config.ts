import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "YourAppName",
  slug: "your-app-slug",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    "**/*",
  ],
  android: {
    package: "com.yourapp.package",
  },
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-splash-screen"
  ],
});
