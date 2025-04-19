import { useAppStore } from '@/app/store';
import { router } from 'expo-router';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  View,
  TextInput,
  Text,
  Keyboard,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Goal } from '../auth/models/types';

const MAX_GOAL_NAME_LENGTH = 35;

const GoalName = () => {
  const [nameGoal, setNameGoal] = useState('');
  const currentGoal = useAppStore((state) => state.currentGoal);
  const setCurrentGoal = useAppStore((state) => state.setCurrentGoal);
  const updateCurrentStep = useAppStore((state) => state.updateCurrentStep);
  const updateCurrentGoal = useAppStore((state) => state.updateCurrentGoal);
  const addGoal = useAppStore((state) => state.addGoal);

  const [dueDate, setDueDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onClose = () => {
    router.back()
    updateCurrentStep('photo');
  }

  const handleChangeText = (text: string) => {
    const lines = text.split('\n').slice(0, 2);
    const trimmed = lines.join('\n');
    if (trimmed.length <= MAX_GOAL_NAME_LENGTH) {
      setNameGoal(trimmed);
    }
  };

  const handleConfirmDueDate = (selectedDate: Date) => {
    const newDataGoal: Goal = {
      ...currentGoal,
      name: nameGoal,
      dueDate: selectedDate,
    }
    setDueDate(selectedDate);
    setShowDatePicker(false);
    updateCurrentGoal(newDataGoal);
    addGoal({ ...newDataGoal });
    updateCurrentStep('photo');
    setCurrentGoal();
    router.back();
  };

  const handleCancel = () => { setShowDatePicker(false); };

  const onNext = () => {
    if (!nameGoal) {
      Alert.alert('Please enter a goal name');
      return;
    }
    if (!dueDate) {
      setShowDatePicker(true)
      return
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.actionText}>{!dueDate && !showDatePicker ? 'Goal name' : 'Goal date'}</Text>
        <TouchableOpacity onPress={onNext}>
          <Text style={{ ...styles.actionText, color: '#7489DF' }}> {!dueDate && !showDatePicker ? 'Next' : 'Done'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: currentGoal.uri }} style={styles.image} resizeMode="cover" />

        {!showDatePicker && (
          <View style={styles.footerOverlay}>
            <TextInput
              style={styles.footerInput}
              placeholder="Goal Name"
              placeholderTextColor="#FFFFFF33"
              autoFocus
              value={nameGoal}
              onChangeText={handleChangeText}
              maxLength={MAX_GOAL_NAME_LENGTH}
              multiline
              numberOfLines={2}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
            <Text style={styles.counter}>
              {nameGoal.length}/{MAX_GOAL_NAME_LENGTH}
            </Text>
          </View>
        )}
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={dueDate || new Date()}
          onConfirm={handleConfirmDueDate}
          onCancel={handleCancel}
          locale="es_ES"
          display="spinner"
          themeVariant="light"
          isDarkModeEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 340,
    height: 380,
    marginTop: 20,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  footerInput: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 'bold',
    fontSize: 32,
    padding: 0,
    maxHeight: 80,
  },
  counter: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 2,
  },
});

export default GoalName;
