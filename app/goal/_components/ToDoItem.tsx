import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ToDoItemType } from "./Item.types";
import { useAppStore } from "@/app/store";
import { useEffect, useState } from "react";
import { useSelectedGoal } from "@/app/store/hooks/useGoalSelectors";
import { GoalAction } from "@/app/auth/models/types";

export default function ToDoItem({
  id,
  goalId,
  description,
  date,
  completed,
}: GoalAction) {
  const currentGoal = useSelectedGoal();
  const [isCompleted, setIsCompleted] = useState(completed);
  const toggleActionCompletion = useAppStore(
    (state) => state.toggleActionCompletion
  );

  const handleToggleComplete = () => {
    toggleActionCompletion(goalId, id);
  };

  useEffect(() => {
    setIsCompleted(completed);
  }, [completed]);

  return (
    <View style={styles.container}>
      {/* Image container with TouchableOpacity overlay */}
      <TouchableOpacity
        style={[
          styles.imageContainer,
          isCompleted && styles.completedContainer,
        ]}
        onPress={handleToggleComplete}
        activeOpacity={0.7}
      >
        {/* Checkbox overlay */}
        <View style={styles.checkboxOverlay}>
          <View
            style={[
              styles.checkbox,
              isCompleted ? styles.checkedBox : styles.uncheckedBox,
            ]}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
      </TouchableOpacity>

      {/* Content container for text */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.hour}>
          {date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    maxWidth: "100%",
    alignItems: "center",
  },
  completedContainer: {
    opacity: 0.95,
  },
  imageContainer: {
    position: "relative",
    width: "20%",
    marginRight: 10,
    height: 56,
  },
  image: {
    backgroundColor: "gray",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    width: "100%",
    height: "100%",
  },
  completedImage: {
    opacity: 0.85, // Only slightly dim the image when completed
  },
  checkboxOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  checkbox: {
    width: 50,
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  checkedBox: {
    width: 50,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#000", // Green checkmark
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  uncheckedBox: {
    width: 50,
    height: 55,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1.5,
    borderColor: "#CCC",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 8,
  },
  title: {
    fontFamily: "Ubuntu_400Regular",
    fontSize: 16,
    flexWrap: "wrap",
    marginBottom: 2,
  },
  hour: {
    fontFamily: "SourceSans3_400Regular",
    color: "#A6A69F",
    fontSize: 14,
  },
});
