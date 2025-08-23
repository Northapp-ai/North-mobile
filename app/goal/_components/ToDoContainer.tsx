import { Pressable, StyleSheet, Text, View } from "react-native";
import ToDoItem from "./ToDoItem";
import { AntDesign } from "@expo/vector-icons";
import { ToDoItemType } from "./Item.types";
import { useState } from "react";
import { ActionModal } from "./ActionModal/index.ts";

type Props = {
  title: string;
  items: ToDoItemType[];
};

export default function ToDoContainer({ title, items }: Props) {
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  return (
    <View style={styles.container}>
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
      {items.map((item, index) => {
        return <ToDoItem title={item.title} hour={item.hour} key={index} />;
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
