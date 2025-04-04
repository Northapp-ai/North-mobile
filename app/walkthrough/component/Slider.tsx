import * as React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { SlideItem } from "./SliderItem";
import { Options, SliderProps } from "./types";
import SliderItemDescription from "./SliderItemDescription";
import { router } from "expo-router";
import Button from "@/app/compoenents/Button";

export const renderItem =
  (options: Options = {}): CarouselRenderItem<any> =>
  ({ item, index }) => {
    return (
      <SlideItem
        key={index}
        index={index}
        item={item}
        rounded={options.rounded}
        style={options.style}
      />
    );
  };

const width = Dimensions.get("window").width;

export default function Slider({ data, loop }: SliderProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const scrollOffsetValue = useSharedValue<number>(0);
  const progress = useSharedValue<number>(0);

  const [currenIndex, setCurrentIndex] = React.useState(
    ref.current?.getCurrentIndex() ?? 0
  );

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const isLastSlide = currenIndex === data.length - 1;

  return (
    <View id="carousel-component">
      <Carousel
        ref={ref}
        testID={"carousel-container"}
        loop={loop}
        width={width - 60}
        height={400}
        snapEnabled={true}
        pagingEnabled={true}
        data={data}
        defaultScrollOffsetValue={scrollOffsetValue}
        onScrollStart={() => {
          console.log("Scroll start");
        }}
        onScrollEnd={() => {
          console.log("Scroll end");
        }}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          "worklet";
          g.enabled(false);
        }}
        onSnapToItem={(index: number) => setCurrentIndex(index)}
        onProgressChange={progress}
        renderItem={renderItem({ rounded: true })}
      />
      <SliderItemDescription data={data} currentIndexItem={currenIndex} />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
      {isLastSlide && <Button redirecTo="/walkthrough/enter" text="Continue" />}
    </View>
  );
}
