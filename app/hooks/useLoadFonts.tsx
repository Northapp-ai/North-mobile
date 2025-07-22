import {
  Inter_900Black,
  Inter_600SemiBold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";

import { SourceSans3_400Regular } from "@expo-google-fonts/source-sans-3";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function useLoadFonts() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded, fontsError] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_500Medium,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    SourceSans3_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  return { fontsLoaded, fontsError };
}
