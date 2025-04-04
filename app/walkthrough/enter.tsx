import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import Button from "../components/Button";

export default function Enter() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeContainer}>
        <View>
          <Image
            source={require("../../assets/images/enterVideo.jpeg")}
            style={styles.image}
          />
        </View>
        <Button redirecTo="/walkthrough/walkthrough-steps" text="Enter North" />
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
    marginTop: 30,
    width: "100%",
    gap: 30,
  },
  image: {
    width: width - 60,
    height: 500,
    borderRadius: 15,
    justifyContent: "center",
  },
});
