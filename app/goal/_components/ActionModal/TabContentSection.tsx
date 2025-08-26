import React from "react";
import { Text, StyleSheet } from "react-native";
import { WhoTabContent } from "./WhoTabContent";
import { TabType } from "./types";
import { User } from "@/app/auth/models/types";

interface TabContentSectionProps {
  activeTab: TabType;
  people: User[];
  selectedPersonEmail: string | null;
  onPersonSelect: (personEmail: string) => void;
}

export function TabContentSection({
  activeTab,
  people,
  selectedPersonEmail,
  onPersonSelect,
}: TabContentSectionProps) {
  switch (activeTab) {
    case "WHY":
      return (
        <Text style={styles.contentDescription}>
          Your motivation for this goal
        </Text>
      );

    case "WHEN":
      return (
        <Text style={styles.contentDescription}>
          Select your goal date below
        </Text>
      );

    case "WHO":
      return (
        <WhoTabContent
          people={people}
          selectedPersonEmail={selectedPersonEmail}
          onPersonSelect={onPersonSelect}
        />
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  contentDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
