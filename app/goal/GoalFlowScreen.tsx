import React, { useState } from 'react'
import type * as MediaLibrary from "expo-media-library";
import { useAppStore } from '../store';
import {  View } from 'react-native';
import CustomGalleryModal from '@/components/customGaleryModal';
import GoalName from './GoalName';

type Props = {
  showModal: boolean;
}
const GoalFlowScreen = ({ showModal }:Props) => {

  const step = useAppStore((state) => state.currentStep);
  const addCurrentGoal = useAppStore((state) => state.addCurrentGoal);
  const updateCurrentStep = useAppStore((state) => state.updateCurrentStep);
  const [visibleModal, setVisibleModal] = useState(showModal)

  const handledImage = (image: MediaLibrary.AssetInfo) => {
    const dataCurrentGoal = {
      id: Date.now().toString(),
      name: '',
      uri: image.localUri,
      date: new Date(),
    }
  // setVisibleModal(false);
    addCurrentGoal(dataCurrentGoal);
    updateCurrentStep('name');
  }

  return (
    <View>
      <CustomGalleryModal
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onNext={handledImage} />
      {step === 'name' && <GoalName />}
    </View>
  );
}

export default GoalFlowScreen
