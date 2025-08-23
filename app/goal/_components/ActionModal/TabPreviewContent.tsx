import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { WhyTabContent } from "./WhyTabContent";
import { WhenTabContent } from "./WhenTabContent";
import { TabType, Person } from "./types";

interface TabPreviewContentProps {
  tab: TabType;
  goalImageUri?: string;
  selectedDate: Date;
  getDateDisplayText: () => string;
  people: Person[];
}

export function TabPreviewContent({
  tab,
  goalImageUri,
  selectedDate,
  getDateDisplayText,
  people,
}: TabPreviewContentProps) {
  switch (tab) {
    case "WHY":
      return <WhyTabContent goalImageUri={goalImageUri} />;

    case "WHEN":
      return (
        <WhenTabContent
          selectedDate={selectedDate}
          getDateDisplayText={getDateDisplayText}
        />
      );

    case "WHO":
      return (
        <TouchableOpacity style={styles.personContainer}>
          <Image source={{ uri: people[0].uri }} style={styles.personImage} />
          <Text style={styles.personName}>{people[0].name}</Text>
        </TouchableOpacity>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  personContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
  },
  personImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  personName: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
