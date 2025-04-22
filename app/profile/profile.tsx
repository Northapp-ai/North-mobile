import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import LogoutButton from "@/components/logoutButton";
import { signOut } from "../auth/services/authServices";
import { useAppStore } from "../store";
import { Goal } from "../auth/models/types";
import CustomGalleryModal from "@/components/customGaleryModal";
import type * as MediaLibrary from "expo-media-library";
import GoalName from "../goal/GoalName";
import GoalFlowScreen from "../goal/GoalFlowScreen";

const ProfileScreen = () => {
  const maxCards = 6

  const [visibleModal, setVisibleModal] = useState(false);
  const [dataGoals, setDataGoals] = useState<Goal[]>(Array(maxCards).fill(null));
  const goalsList = useAppStore((state) => state.goals);
  const user = useAppStore((state) => state.user);
  const addCurrentGoal = useAppStore((state) => state.addCurrentGoal);

  useEffect(() => {
    const cardAvoid = maxCards - goalsList.length;

    if (goalsList.length > 0) {
      const fillerImages = Array.from({ length: cardAvoid }, () => null);
      const completedImages = [...goalsList, ...fillerImages];
      setDataGoals(completedImages);
    }
  }, [goalsList]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/auth/login");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo cerrar sesión");
    }
  };

  const handleSelectImage = async (uri: string) => {
    if (!uri) {
      setVisibleModal(true)
    }
  }

  const handledAddImage = (image: MediaLibrary.AssetInfo | MediaLibrary.Asset) => {

    const dataCurrentGoal: Goal = {
      id: Date.now().toString(),
      name: '',
      uri:  image.localUri || image.uri,
      dueDate: new Date(),
    }

    addCurrentGoal({ ...dataCurrentGoal });
    setVisibleModal(false)
    router.push({ pathname: "/goal/GoalName" })
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.headerContainer}>
        <LogoutButton onLogout={handleLogout} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-outline" size={30} />
        </View>
        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profileDescription}>Description</Text>
      </View>

      {/* TODO: Crear tabs para ver las estadisticas de los usuarios */}
      <View style={styles.statsContainer}>
        {["GOALS", "ACHIEVED", "HABITS", "PARTNERS"].map((item, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.yearText}>2024</Text>
      <View style={styles.cardsContainer}>
        {dataGoals.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              index % 3 === 0 ? styles.largeCard : styles.smallCard,
            ]}
            onPress={() => { handleSelectImage(data?.uri) }}
          >
            {data ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: data.uri }} style={styles.image} />
                <View style={styles.footerOverlay}>
                  <Text
                    style={styles.footerText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {data.name}
                  </Text>
                </View>
              </View>
            ) : (
              <Ionicons name="add" size={24} color="#888" />
            )}
          </TouchableOpacity>
        ))}
      </View>

    <CustomGalleryModal
      visible={visibleModal}
      onClose={() => setVisibleModal(false)}
      onNext={handledAddImage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileContainer: {
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
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileDescription: {
    color: "#888",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
  },
  yearText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginVertical: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#eee",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  smallCard: {
    width: "48%",
    height: 120,
  },
  largeCard: {
    width: "100%",
    height: 150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 16,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  footerText: {
    color: '#fff',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
