import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

type CustomGalleryModalProps = {
  visible: boolean;
  onClose?: () => void;
  onNext: (selected: MediaLibrary.Asset) => void;
};

const CustomGalleryModal = ({
  visible,
  onClose,
  onNext,
}: CustomGalleryModalProps) => {
  const [photos, setPhotos] = useState<MediaLibrary.AssetInfo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaLibrary.AssetInfo | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    requestMediaPermissions()
  }, []);

  // useEffect(() => {
  //   initializeData();
  // }, [visible]);

  // const initializeData = async () => {
  //   if (visible) {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== "granted") return;

  //     setSelectedPhoto(null);
  //     setPhotos([]);
  //     setEndCursor(undefined);
  //     setHasNextPage(true);
  //     fetchPhotos();
  //   }
  // }

  const loadMorePhotos = () => {
    if (hasNextPage && !loadingMore) {
      setLoadingMore(true);
      fetchPhotos(endCursor).finally(() => setLoadingMore(false));
    }
  };

  const requestMediaPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await fetchPhotos();
      return
    }
    Alert.alert(
      "Permiso requerido",
      "Necesitamos acceso a tus fotos para que puedas seleccionar una imagen.",
      [{ text: "OK" }]
    );
  };



  const fetchPhotos = async (after?: string) => {
    try {
      let assetsList: MediaLibrary.Asset[] | MediaLibrary.AssetInfo[] = [];
      const pageSize = 40;
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        first: pageSize,
        after,
        sortBy: [["creationTime", false]],
      });

      if (Platform.OS === "ios") {
        assetsList = await Promise.all(
          assets.assets.map((asset) => MediaLibrary.getAssetInfoAsync(asset.id))
        );
        setPhotos((prev) => (after ? [...prev, ...assetsList] : assetsList));
      } else {
        assetsList = assets.assets;
        setPhotos((prev) => (after ? [...prev, ...assetsList] : assetsList));
      }

      if (!after) setSelectedPhoto(assetsList[0] || null);
      setHasNextPage(assets.hasNextPage);
      setEndCursor(assets.endCursor);
    } catch (error) {
      console.error("Error loading photos", error);
    }
  };

  return (
    <Modal visible={visible} animationType="none">
      <SafeAreaView style={styles.modalContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectedPhoto && onNext(selectedPhoto)}>
            <Text style={styles.actionText}>Next</Text>
          </TouchableOpacity>
        </View>

        {selectedPhoto && (
          <View style={styles.contentPreview}>
            <Image
              source={{ uri: selectedPhoto.localUri || selectedPhoto.uri }}
              style={styles.previewImage}
            />
          </View>
        )}

        {photos.length > 0 && (
          <FlatList
            data={photos}
            numColumns={4}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedPhoto(item)}>
                <Image
                  source={{ uri: item.localUri || item.uri }}
                  style={[
                    styles.thumbnail,
                    selectedPhoto?.id === item.id && styles.selectedThumbnail,
                  ]}
                />
              </TouchableOpacity>
            )}
            onEndReached={loadMorePhotos}
            onEndReachedThreshold={0.7}
          // ListFooterComponent={loadingMore ? <ActivityIndicator size="small" /> : null}
          />
        )}

      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentPreview: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "85%",
    height: 380,
    borderRadius: 20,
    marginVertical: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 1,
    aspectRatio: 1,
  },
  selectedThumbnail: {
    opacity: 0.7,
  },
});

export default CustomGalleryModal;
