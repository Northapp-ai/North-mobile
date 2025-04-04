import { StyleSheet, SafeAreaView, View } from "react-native";
import Slider from "./component/Slider";

export default function WalkthroughSteps() {
  const sliderData = [
    {
      source: require("@/assets/images/walkthrough.jpeg"),
      description: {
        title: "Unleash your purpose",
        info: "Without purpose you’re powerless. Bring it to life to awaken your joy for life, guide your decisions and drive your actions. Meaning is the ultimate framework. ",
      },
    },
    {
      source: require("@/assets/images/walkthrough.jpeg"),
      description: {
        title: "Make it visually captivating",
        info: "Outline your purpose on our visionboard. Life goals on images moves you deep inside.  ",
      },
    },
    {
      source: require("@/assets/images/walkthrough.jpeg"),
      description: {
        title: "Act on it",
        info: "Happiness is acting & progressing towards your life goals. List actions per goal, put them in your calendar and get them done.",
      },
    },
    {
      source: require("@/assets/images/walkthrough.jpeg"),
      description: {
        title: "Team up",
        info: "Share life goals with those you trust the most to embark on a goal together or keep you accountable on what matters the most. Having partners will take you far.",
      },
    },
    {
      source: require("@/assets/images/walkthrough.jpeg"),
      description: {
        title: "Break free",
        info: "Acting towards your purpose in the age of distraction is a transcendent & rebellious act. Be the hero your soul needs. Go North.",
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider data={sliderData} loop={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
    backgroundColor: "white",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  sliderContainer: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
  },
});
