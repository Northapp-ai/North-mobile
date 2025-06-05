import { config } from "dotenv";
import path from "path";

const ENV = process.env.EXPO_PUBLIC_ENVIRONMENT || "development";
config({ path: path.resolve(__dirname, `.env.${ENV}`) });

export default {
  expo: {
    name: "north-mobile",
    owner: "northappmobile",
    slug: "north",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.northappmobile.northmobile",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.northappmobile.northmobile",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-font",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        //EAS remote
          projectId: "b178d6ae-d233-47cf-ab33-00bd3416ee31",
      },
      awsIdentityPoolId: process.env.EXPO_PUBLIC_AWS_IDENTITY_POOL_ID,
      awsUserPoolsId: process.env.EXPO_PUBLIC_AWS_USER_POOLS_ID,
      awsUserPoolsWebClientId:
        process.env.EXPO_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
      awsRegion: process.env.EXPO_PUBLIC_AWS_REGION,
      environment: ENV,
    },
    runtimeVersion: "1.0.0"
  },
};
