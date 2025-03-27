import { Stack,  } from "expo-router";
import { useEffect } from "react";
import { configureAmplify } from "@/src/amplifySetup";

export default function RootLayout() {

  useEffect(() => {
    configureAmplify();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen name="auth/login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="auth/signup" options={{ headerTitle: "Signup" }} />
    </Stack>
  );
}
