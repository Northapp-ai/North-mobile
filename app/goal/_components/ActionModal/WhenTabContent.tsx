import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  selectedDate: Date;
  getDateDisplayText: () => string;
};

export function WhenTabContent({ selectedDate, getDateDisplayText }: Props) {
  return (
    <View style={styles.whenContent}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{getDateDisplayText()}</Text>
        <Text style={styles.dateSubtext}>
          {selectedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}{" "}
          at{" "}
          {selectedDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whenContent: {
    alignItems: "center",
  },
  dateContainer: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
  },
  dateSubtext: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  contentDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
