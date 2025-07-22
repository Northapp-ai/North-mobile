import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { ToDoItemType } from "./Item.types";
import { useAppStore } from "@/app/store";

export default function ToDoItem({ title, hour }: ToDoItemType) {
  const currentGoal = useAppStore((state) => state.currentGoal);
  return (
    <View style={styles.container}>
      <Image source={{ uri: currentGoal.uri }} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.hour}>{hour}</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-outline" size={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    maxWidth: "100%",
  },
  info: {
    width: "85%",
  },
  title: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    flexWrap: "wrap",
  },
  hour: {
    fontFamily: "SourceSans3_400Regular",
    color: "#A6A69F",
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    backgroundColor: "gray",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    width: "20%",
    marginRight: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "85%",
  },
});
