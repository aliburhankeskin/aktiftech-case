import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Aktiftech Case",
  description: "Aktiftech Case Description",
  slug: "aktiftech-case",
  scheme: "com.aktiftech.case",
  version: "1.0.0",
  sdkVersion: "53.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["./src/assets/images/*"],
  locales: {
    tr: "./src/assets/languages/turkish.json",
    en: "./src/assets/languages/english.json",
  },
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.aktiftech.case",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.aktiftech.case",
    versionCode: 1,
  },
  updates: {
    enabled: true,
    url: "https://u.expo.dev/2c738c6a-84ae-46bd-99dc-00b41b3bc9c8",
  },
  extra: {
    eas: {
      projectId: "2c738c6a-84ae-46bd-99dc-00b41b3bc9c8",
    },
  },
  plugins: ["expo-font", "expo-localization"],
});
