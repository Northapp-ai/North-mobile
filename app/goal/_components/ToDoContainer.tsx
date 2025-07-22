import { StyleSheet, Text, View } from "react-native";
import ToDoItem from "./ToDoItem";
import { AntDesign } from "@expo/vector-icons";
import { ToDoItemType } from "./Item.types";

type Props = {
  title: string;
  items: ToDoItemType[];
};

export default function ToDoContainer({ title, items }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="plus"
          size={24}
          color="black"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      {items.map((item, index) => {
        return <ToDoItem title={item.title} hour={item.hour} key={index} />;
      })}
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
