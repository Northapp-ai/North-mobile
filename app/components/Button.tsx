import { Href, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  redirecTo?: Href;
  text: string;
};

export default function Button({ redirecTo, text }: ButtonProps) {
  return (
    <View style={styles.mainButtonContainer}>
      <Pressable
        style={({ pressed }) => styles.buttonContainer}
        onPress={() => redirecTo && router.push(redirecTo)}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
