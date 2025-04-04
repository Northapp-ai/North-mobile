import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import { AnimatedProps } from "react-native-reanimated";

export interface SliderItemProps extends AnimatedProps<ViewProps> {
  style?: any;
  index?: number;
  item: SliderData;
  rounded?: boolean;
}

export type SliderData = {
  url?: string;
  source?: ImageSourcePropType;
  description?: {
    title: string;
    info: string;
  };
};

export type SliderProps = {
  data: SliderData[];
  loop?: boolean;
};

export interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}
