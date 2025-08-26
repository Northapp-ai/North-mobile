import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onSend?: () => void;
}

export function InputSection({
  inputText,
  onInputChange,
  onSend,
}: InputSectionProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="What"
        value={inputText}
        onChangeText={onInputChange}
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <AntDesign name="arrowup" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
