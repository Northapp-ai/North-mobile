import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { ActionModalProps } from "./types";
import { MOCK_PEOPLE } from "./constants";
import { useActionModalState } from "../../_hooks/useActionModalState";
import { TabNavigation } from "./TabNavigation";
import { TabContentSection } from "./TabContentSection";
import { InputSection } from "./InputSection";
import { DateTimePickerComponent } from "./DateTimePickerComponent";
import { useSelectedGoal } from "@/app/store/hooks/useGoalSelectors";

export function ActionModal({ visible, onClose }: ActionModalProps) {
  const currentGoal = useSelectedGoal();
  const {
    inputText,
    activeTab,
    selectedDate,
    selectedPersonId,
    setInputText,
    setActiveTab,
    setSelectedPersonId,
    resetModalState,
    handleDateConfirm,
    getDateDisplayText,
  } = useActionModalState();

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  const handleSend = () => {
    // TODO: Implement send functionality
    console.log("Send:", inputText);
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
            {/* Tab Navigation */}
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              goalImageUri={currentGoal?.uri}
              selectedDate={selectedDate}
              getDateDisplayText={getDateDisplayText}
              people={MOCK_PEOPLE}
            />

            {/* Tab Content */}
            <View style={styles.tabContent}>
              <TabContentSection
                activeTab={activeTab}
                people={MOCK_PEOPLE}
                selectedPersonId={selectedPersonId}
                onPersonSelect={setSelectedPersonId}
              />
            </View>

            {/* Input Section */}
            <InputSection
              inputText={inputText}
              onInputChange={setInputText}
              onSend={handleSend}
            />

            {/* DateTimePicker - shown when WHEN tab is active */}
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
  tabContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
