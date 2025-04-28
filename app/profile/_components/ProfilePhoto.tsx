import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppStore } from "@/app/store";
import CustomGalleryModal from "@/components/customGaleryModal";
import * as MediaLibrary from "expo-media-library";

export default function ProfilePhoto() {
  const [visibleGalleryModal, setVisibleGalleryModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const setUserProfilePhoto = useAppStore((state) => state.setUserProfilePhoto);
  const setUserBio = useAppStore((state) => state.setUserBio);
  const {
    profilePhoto,
    fullName,
    bio = "",
  } = useAppStore((state) => state.user);

  const handleAddProfilePhoto = (imageSelected: MediaLibrary.Asset) => {
    setUserProfilePhoto(imageSelected.localUri || imageSelected.uri);
    setVisibleGalleryModal(false);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setVisibleGalleryModal(true)}>
          <View style={styles.avatarContainer}>
            {!profilePhoto ? (
              <Ionicons name="person-outline" size={30} />
            ) : (
              <Image source={{ uri: profilePhoto }} style={styles.thumbnail} />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.profileName}>{fullName}</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.profileDescription}>
              {bio || "Add yor bio her.."}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            value={bio}
            onChangeText={setUserBio}
            autoFocus
            onBlur={handleBlur}
          />
        )}
      </View>

      <CustomGalleryModal
        visible={visibleGalleryModal}
        onClose={() => setVisibleGalleryModal(false)}
        onNext={handleAddProfilePhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 50,
    aspectRatio: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileDescription: {
    color: "#888",
  },
});
