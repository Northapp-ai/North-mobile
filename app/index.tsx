import awsConfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import useLoadFonts from "./hooks/useLoadFonts";

Amplify.configure(awsConfig);

export default function Index() {
  const { loaded, error } = useLoadFonts();
  if (!loaded && !error) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} style={styles.homeContainer}>
      <View>
        <Image
          source={require("../assets/images/image.jpeg")}
          style={styles.image}
        />
      </View>
      <Text style={styles.mainText}>
        Welcome to North - the space to design and build your life{" "}
        <Text style={{ fontWeight: "bold", color: "#000" }}>purpose</Text> in
        the age of distraction.
      </Text>

        <Pressable
          style={({ pressed }) => styles.buttonContainer}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 41,
    paddingRight: 41,
    marginTop: 30,
    gap: 30,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 15,
    justifyContent: "center",
  },
  mainText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 23,
    color: "#A6A69F",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  buttonContainer: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 292,
  },
});
