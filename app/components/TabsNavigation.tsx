import { StyleSheet, Text, View } from "react-native";

type Props = {
  items: string[];
};

export default function TabsNavigation({ items }: Props) {
  return (
    <View style={styles.statsContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>{item}</Text>
        </View>
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
  },
  statLabel: {
    color: "#00000",
    fontSize: 9,
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: 0.45,
  },
});
