import { Pressable, StyleSheet, Text, View } from "react-native";
import ToDoItem from "./ToDoItem";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { ActionModal } from "./ActionModal/ActionModal";
import { GoalAction } from "@/app/auth/models/types";

type Props = {
  title?: string;
  items: GoalAction[];
};

export default function ToDoContainer({ title, items }: Props) {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {title ? (
        <View style={styles.headerContainer}>
          <Pressable
            onPress={() => {
              setIsActionModalVisible(true);
            }}
          >
            <AntDesign name="plus" size={24} color="black" />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : null}
      {items.map((item, index) => {
        return <ToDoItem key={item.id || index} {...item} />;
      })}
      <ActionModal
        visible={isActionModalVisible}
        onClose={() => setIsActionModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    minHeight: 100,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
});
