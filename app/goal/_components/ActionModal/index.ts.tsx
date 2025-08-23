import { useAppStore } from "@/app/store";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { WhyTabContent } from "./WhyTabContent";
import { WhenTabContent } from "./WhenTabContent";
import { WhoTabContent } from "./WhoTabContent";
import { DateTimePickerComponent } from "./DateTimePickerComponent";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ActionModal({ visible, onClose }: Props) {
  const currentGoal = useAppStore((state) => state.currentGoal);
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<"WHY" | "WHEN" | "WHO">("WHY");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>("1");

  // Mock data for people carousel
  const people = [
    {
      id: "1",
      name: "John",
      uri: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Sarah",
      uri: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "3",
      name: "Mike",
      uri: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "4",
      name: "Emma",
      uri: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "5",
      name: "Alex",
      uri: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  const handleDateConfirm = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleDateCancel = () => {
    setActiveTab("WHY");
  };

  const resetModalState = () => {
    setInputText("");
    setActiveTab("WHY");
    setSelectedDate(new Date());
    setSelectedPersonId("1");
  };

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  const getDateDisplayText = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const selectedDateString = selectedDate.toDateString();
    const todayString = today.toDateString();
    const tomorrowString = tomorrow.toDateString();

    if (selectedDateString === todayString) {
      return "TODAY";
    } else if (selectedDateString === tomorrowString) {
      return "TOMORROW";
    } else {
      return selectedDate
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
    }
  };

  const selectedValues = {
    WHY: <WhyTabContent goalImageUri={currentGoal.uri} />,
    WHEN: (
      <WhenTabContent
        selectedDate={selectedDate}
        getDateDisplayText={getDateDisplayText}
      />
    ),
    WHO: (
      <TouchableOpacity style={[styles.personContainer]}>
        <Image source={{ uri: people[0].uri }} style={[styles.personImage]} />
        <Text style={styles.personName}>{people[0].name}</Text>
      </TouchableOpacity>
    ),
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.modalContent}>
            {/* Tab Row */}
            <View style={styles.tabRow}>
              {["WHY", "WHEN", "WHO"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab]}
                  onPress={() => {
                    setActiveTab(tab as "WHY" | "WHEN" | "WHO");
                  }}
                >
                  <Text
                    style={[
                      styles.tabLabel,
                      activeTab === tab && styles.activeTabLabel,
                    ]}
                  >
                    {tab}
                  </Text>
                  <View style={styles.tabContentPreview}>
                    {selectedValues[tab as "WHY" | "WHEN" | "WHO"]}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Tab Content */}
            <View style={styles.tabContent}>
              {activeTab === "WHY" && (
                <Text style={styles.contentDescription}>
                  Your motivation for this goal
                </Text>
              )}

              {activeTab === "WHEN" && (
                <Text style={styles.contentDescription}>
                  Select your goal date below
                </Text>
              )}

              {activeTab === "WHO" && (
                <WhoTabContent
                  people={people}
                  selectedPersonId={selectedPersonId}
                  onPersonSelect={setSelectedPersonId}
                />
              )}
            </View>

            {/* Input Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="What"
                value={inputText}
                onChangeText={setInputText}
                placeholderTextColor={"gray"}
              />
              <TouchableOpacity style={styles.sendButton}>
                <AntDesign name="arrowup" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Fixed DateTimePicker - shown when WHEN tab is active */}
            {activeTab === "WHEN" && (
              <DateTimePickerComponent
                selectedDate={selectedDate}
                onDateChange={handleDateConfirm}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // black with opacity
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  // Tab styles
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginHorizontal: 4,
  },
  tabLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  activeTabLabel: {
    color: "#000",
  },
  tabContentPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  sendButton: {
    backgroundColor: "black",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  imageWhy: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  personContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
  },
  personImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  personName: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  contentDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
