import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Image, StyleSheet, Text, TextInput, View, Pressable, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import useLoadFonts from '../hooks/useLoadFonts';
import { useAppStore } from '../store';
import { Goal } from '../auth/models/types';

const GoalScreen = () => {

  const [footerText, setFooterText] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { loaded, error } = useLoadFonts();
  // if (!loaded && !error) return null;

  // const { uriImage } = useLocalSearchParams<{ uriImage: string }>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const localImage = require('@/assets/images/walkthrough.jpeg');
  // const urlImage = uriImage ? { uri: uriImage } : localImage;
  const updateGoal = useAppStore((state) => state.updateGoal);
  const listGoal = useAppStore((state) => state.goals);
  const currentGoal = listGoal.find((goal: Goal) => goal.id === id) as Goal;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });


  const handleConfirm = (selectedDate: Date) => {
    setEndDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleCancel = () => {
    setShowDatePicker(false);
  };

  const handleSaveGoal = () => {

    const dataGoal = {
      ...currentGoal,
      title: footerText || currentGoal.title,
      date: endDate,
    };

    updateGoal(dataGoal);
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentGoal.uri }} style={styles.image} resizeMode="cover" />
          <View style={styles.footerOverlay}>
            <Text
              style={styles.footerText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {footerText}
            </Text>
          </View>
        </View>

        <View style={styles.containerForm}>
          <TextInput
            style={styles.textArea}
            placeholder="Título"
            value={footerText}
            onChangeText={setFooterText}
            textAlignVertical="top"
            multiline
            numberOfLines={2}
            placeholderTextColor="#999"
          />

          <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
            <Text style={styles.dateText}>
              {endDate ? formatDate(endDate) : 'Selecciona fecha de finalización'}
            </Text>
          </Pressable>

          <DateTimePickerModal
            isVisible={showDatePicker}

            mode="date"
            date={endDate || new Date()}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            locale="es_ES"
            display="spinner"
            themeVariant="light"
            isDarkModeEnabled={false}
          />

          <Pressable style={styles.saveButton} onPress={handleSaveGoal}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </Pressable>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 300,
    height: 250,
    marginTop: 20,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
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
  footerText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
  containerForm: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    marginTop: 24,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  textArea: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    height: 80,
  },
  dateInput: {
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  datePlaceholder: {
    color: '#999',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#1e1e1e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});


export default GoalScreen;
