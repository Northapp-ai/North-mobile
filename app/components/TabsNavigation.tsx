import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type Props = {
  items: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
  counts?: number[];
};

export default function TabsNavigation({
  items,
  activeTab,
  onTabPress,
  counts,
}: Props) {
  return (
    <View style={styles.statsContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.statItem}
          onPress={() => onTabPress(item)}
        >
          <Text
            style={[
              styles.statNumber,
              activeTab === item && styles.activeStatNumber,
            ]}
          >
            {counts?.[index] ?? 0}
          </Text>
          <Text
            style={[
              styles.statLabel,
              activeTab === item && styles.activeStatLabel,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginLeft: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    paddingBottom: 2,
    letterSpacing: 0.48,
    color: "#999",
  },
  activeStatNumber: {
    color: "#000",
  },
  statLabel: {
    color: "#999",
    fontSize: 9,
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: 0.45,
  },
  activeStatLabel: {
    color: "#000",
  },
});
