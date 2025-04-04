import { StyleSheet, Text, View } from "react-native";
import { SliderData } from "./types";
import { useMemo } from "react";

export type SliderProps = {
  data: SliderData[];
  currentIndexItem: number;
};
export default function SliderItemDescription({
  data,
  currentIndexItem,
}: SliderProps) {
  const currentItem = useMemo(() => {
    return data.find((_, index) => index === currentIndexItem);
  }, [currentIndexItem]);
  const { description } = currentItem ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{description?.title}</Text>
      <Text>{description?.info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 150,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    marginVertical: 15,
  },
  description: {
    fontFamily: "Inter_500Medium",
    height: "100%",
    width: "100%",
  },
});
