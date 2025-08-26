import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
  goalImageUri?: string;
};

export function WhyTabContent({ goalImageUri }: Props) {
  return (
    <View style={styles.whyContent}>
      {goalImageUri && (
        <Image source={{ uri: goalImageUri }} style={styles.imageWhy} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  whyContent: {
    alignItems: "center",
  },
  imageWhy: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  contentDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
