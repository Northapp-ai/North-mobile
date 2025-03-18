import awsConfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import useLoadFonts from "./hooks/useLoadFonts";

Amplify.configure(awsConfig);

export default function Index() {
  const { loaded, error } = useLoadFonts();
  if (!loaded && !error) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 41,
          marginTop: 30,
          gap: 30,
        }}
      >
        <Image
          source={require("../assets/images/image.jpeg")}
          style={{
            width: 300,
            height: 400,
            borderRadius: 15,
          }}
        />
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 23,
            color: "#A6A69F",
            textAlign: "center",
          }}
        >
          Welcome to North - the space to design and build your life{" "}
          <Text style={{ fontWeight: "bold", color: "#000" }}>purpose</Text> in
          the age of distraction.
        </Text>

        <Pressable
          style={{
            backgroundColor: "#D9D9D9",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            width: 292,
            marginBottom: 30,
          }}
          onPress={() => router.push("/auth/login")}
        >
          <Text
            style={{
              color: "black",
              fontSize: 14,
              fontFamily: "Inter_500Medium",
            }}
          >
            Get started
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
