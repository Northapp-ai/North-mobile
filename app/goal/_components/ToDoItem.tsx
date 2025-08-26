import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useAppStore } from "@/app/store";
import { useEffect, useState } from "react";
import { GoalAction } from "@/app/auth/models/types";

export default function ToDoItem({
  id,
  goalId,
  description,
  date,
  completed,
  user,
}: GoalAction) {
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
      {/* Checkbox container */}
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          isCompleted && styles.completedContainer,
        ]}
        onPress={handleToggleComplete}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            isCompleted ? styles.checkedBox : styles.uncheckedBox,
          ]}
        >
          {isCompleted && <Text style={styles.checkmark}>✓</Text>}
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

      {/* User profile photo on the right */}
      <View style={styles.userPhotoContainer}>
        <Image
          source={{
            uri:
              user.profilePhoto ||
              "https://via.placeholder.com/56x56?text=User",
          }}
          style={[styles.userPhoto, isCompleted && styles.completedImage]}
        />
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
    paddingHorizontal: 15,
    maxWidth: "100%",
    alignItems: "center",
  },
  completedContainer: {
    opacity: 0.95,
  },
  checkboxContainer: {
    marginRight: 10,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  userPhotoContainer: {
    marginLeft: 10,
    height: 56,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  userPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  completedImage: {
    opacity: 0.85, // Only slightly dim the image when completed
  },
  checkbox: {
    width: 50,
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  uncheckedBox: {
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
