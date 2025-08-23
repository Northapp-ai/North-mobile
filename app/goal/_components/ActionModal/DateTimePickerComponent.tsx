import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  selectedDate: Date;
  onDateChange: (event: any, date?: Date) => void;
};

export function DateTimePickerComponent({ selectedDate, onDateChange }: Props) {
  return (
    <View style={styles.datePickerContainer}>
      <DateTimePicker
        value={selectedDate}
        mode="datetime"
        display="spinner"
        onChange={onDateChange}
        style={styles.datePicker}
        themeVariant="light"
        textColor="#000000"
        locale="en-US"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  datePicker: {
    height: 200,
    width: "100%",
  },
});
