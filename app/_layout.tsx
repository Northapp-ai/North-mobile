import { configureAmplify } from "@/config/amplifySetup";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    configureAmplify();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen name="auth/login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="auth/signup" options={{ headerTitle: "Signup" }} />
      <Stack.Screen name="profile/profile" options={{ headerTitle: "Profile", animation: 'slide_from_right' }} />
      <Stack.Screen name="goal/GoalName" options={{ headerTitle: "Goal Name", presentation: "containedModal", headerShown: false, animation: 'fade' }} />
      <Stack.Screen
        name="walkthrough/enter"
        options={{ headerTitle: "Welcome North" }}
      />
      <Stack.Screen
        name="walkthrough/walkthrough-steps"
        options={{ headerTitle: "Welcome North" }}
      />
    </Stack>
  );
}
