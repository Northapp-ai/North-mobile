import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SliderItemProps } from "./types";

export const PURPLE_IMAGES = [
  require("@/assets/images/slide-images/purple-0.png"),
  require("@/assets/images/slide-images/purple-1.png"),
  require("@/assets/images/slide-images/purple-2.png"),
  require("@/assets/images/slide-images/purple-3.png"),
  require("@/assets/images/slide-images/purple-4.png"),
  require("@/assets/images/slide-images/purple-5.png"),
];

export const SlideItem: React.FC<SliderItemProps> = (props) => {
  const {
    style,
    item,
    index = 0,
    rounded = false,
    testID,
    ...animatedViewProps
  } = props;

  return (
    <Animated.View
      testID={testID}
      {...animatedViewProps}
      style={styles.container}
    >
      <Animated.Image
        source={item.url ? { uri: item.url } : item.source}
        resizeMode="cover"
        style={[style, styles.image, { borderRadius: 10 }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center", // Centers children
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
