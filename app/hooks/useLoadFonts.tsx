import {
  Inter_900Black,
  Inter_600SemiBold,
  Inter_500Medium,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function useLoadFonts() {
  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    Inter_900Black,
    Inter_600SemiBold,
    Inter_500Medium,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}
