import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useLoadFonts from "./hooks/useLoadFonts";
import Button from "./components/Button";

export default function Index() {
  const { fontsLoaded, fontsError } = useLoadFonts();
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeContainer}>
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

        <Button redirecTo="/auth/login" text="Get started" />
      </View>
    </ScrollView>
  );
}

const width = Dimensions.get("window").width;

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
    width: width - 60,
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
});
