import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TabsNavigation from "../components/TabsNavigation";
import ToDoContainer from "./_components/ToDoContainer";
import { useSelectedGoal } from "../store/hooks/useGoalSelectors";
import useGroupActions from "./_hooks/useGroupActions";

export default function GoalDetails() {
  const currentGoal = useSelectedGoal();
  const { todayActions, tomorrowActions, upcomingActions } = useGroupActions();

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentGoal?.uri }} style={styles.image} />
          <View style={styles.footerOverlay}>
            <Text
              style={styles.footerText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentGoal?.name}
            </Text>
          </View>
        </View>
      </View>
      <TabsNavigation items={["TO DO", "DONE", "PARTNER"]} />
      <ToDoContainer title="TODAY" items={todayActions} />
      <ToDoContainer title="TOMORROW" items={tomorrowActions} />
      <ToDoContainer title="UPCOMING" items={upcomingActions} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    position: "relative",
    borderRadius: 16,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  footerOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  footerText: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
  },
});
