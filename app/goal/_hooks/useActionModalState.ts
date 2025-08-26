import { useState, useCallback } from "react";
import { TabType, ActionModalState } from "../_components/ActionModal/types";
import {
  DEFAULT_TAB,
  DEFAULT_PERSON_EMAIL,
} from "../_components/ActionModal/constants";

export function useActionModalState() {
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>(DEFAULT_TAB);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPersonEmail, setSelectedPersonEmail] = useState<string | null>(
    DEFAULT_PERSON_EMAIL
  );

  const resetModalState = useCallback(() => {
    setInputText("");
    setActiveTab(DEFAULT_TAB);
    setSelectedDate(new Date());
    setSelectedPersonEmail(DEFAULT_PERSON_EMAIL);
  }, []);

  const handleDateConfirm = useCallback((event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleDateCancel = useCallback(() => {
    setActiveTab(DEFAULT_TAB);
  }, []);

  const getDateDisplayText = useCallback(() => {
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
  }, [selectedDate]);

  return {
    // State
    inputText,
    activeTab,
    selectedDate,
    selectedPersonEmail,
    // Setters
    setInputText,
    setActiveTab,
    setSelectedPersonEmail,
    // Handlers
    resetModalState,
    handleDateConfirm,
    handleDateCancel,
    getDateDisplayText,
  };
}
