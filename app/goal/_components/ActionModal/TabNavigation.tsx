import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { TabType } from "./types";
import { TabPreviewContent } from "./TabPreviewContent";
import { TABS } from "./constants";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  goalImageUri?: string;
  selectedDate: Date;
  getDateDisplayText: () => string;
  people: any[];
}

export function TabNavigation({
  activeTab,
  onTabChange,
  goalImageUri,
  selectedDate,
  getDateDisplayText,
  people,
}: TabNavigationProps) {
  return (
    <View style={styles.tabRow}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => onTabChange(tab)}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab && styles.activeTabLabel,
            ]}
          >
            {tab}
          </Text>
          <View style={styles.tabContentPreview}>
            <TabPreviewContent
              tab={tab}
              goalImageUri={goalImageUri}
              selectedDate={selectedDate}
              getDateDisplayText={getDateDisplayText}
              people={people}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginHorizontal: 4,
  },
  tabLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  activeTabLabel: {
    color: "#000",
  },
  tabContentPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
});
