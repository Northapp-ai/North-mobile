import { config } from 'dotenv';
import path from 'path';

const ENV = process.env.EXPO_PUBLIC_ENVIRONMENT || 'development';
config({ path: path.resolve(__dirname, `.env.${ENV}`) });

export default {
  expo: {
    name: "north-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.northappmobile.northmobile",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.northappmobile.northmobile"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
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
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "eca76976-a644-44e2-bbe3-1863077a4c64"
      },
      awsIdentityPoolId: process.env.EXPO_PUBLIC_AWS_IDENTITY_POOL_ID,
      awsUserPoolsId: process.env.EXPO_PUBLIC_AWS_USER_POOLS_ID,
      awsUserPoolsWebClientId: process.env.EXPO_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
      awsRegion: process.env.EXPO_PUBLIC_AWS_REGION,
      environment: ENV
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    updates: {
      url: "https://u.expo.dev/eca76976-a644-44e2-bbe3-1863077a4c64"
    }
  }
};