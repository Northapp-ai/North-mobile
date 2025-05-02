import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
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
import { LinearGradient } from "expo-linear-gradient";
import ProfilePhoto from "./_components/ProfilePhoto";

const ProfileScreen = () => {
  const maxCards = 5

  const [visibleModal, setVisibleModal] = useState(false);
  const [dataGoals, setDataGoals] = useState<Goal[]>(
    Array(maxCards).fill(null)
  );
  const goalsList = useAppStore((state) => state.goals);
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
      setVisibleModal(true);
    }
  };

  const handledAddImage = (
    image: MediaLibrary.AssetInfo | MediaLibrary.Asset
  ) => {
    const dataCurrentGoal: Goal = {
      id: Date.now().toString(),
      name: '',
      uri: image.localUri || image.uri,
      dueDate: new Date(),
    };

    addCurrentGoal({ ...dataCurrentGoal });
    setVisibleModal(false);
    router.push({ pathname: "/goal/GoalName" });
  };

  const leftColumn = dataGoals.filter((_, i) => i % 2 === 0);
  const rightColumn = dataGoals.filter((_, i) => i % 2 !== 0);

  const renderCard = (data: Goal | null, index: number, isLargeCard: boolean = false) => (
    <TouchableOpacity
      key={index}
      style={[styles.card, isLargeCard ? styles.largeCard : styles.smallCard]}
      onPress={() => handleSelectImage(data?.uri)}
    >
      {data ? (
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: data.uri }}
            style={styles.image}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
              style={styles.gradient}
              start={{ x: 0.5, y: 0.3 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.footerOverlay}>
              <Text style={styles.footerText}>
                {data.name}
              </Text>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <Ionicons name="add" size={36} color="#fff" />
      )}
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.headerContainer}>
        <ProfilePhoto />
        <View>
          <LogoutButton onLogout={handleLogout} />
        </View>
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

      <Text style={styles.yearText}>2025</Text>
      <View style={styles.columnsWrapper}>
        <View style={styles.column}>
          {leftColumn.map((goal, index) => renderCard(goal, index * 2))}
        </View>
        <View style={styles.column}>
          {rightColumn.map((goal, index) => renderCard(goal, index * 2 + 1, true))}
        </View>
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
    padding: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
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
    marginTop: 20,
    marginLeft: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    paddingBottom: 2,
    letterSpacing: 0.48
  },
  statLabel: {
    color: "#00000",
    fontSize: 9,
    fontFamily: "Ubuntu_400Regular",
    letterSpacing: 0.45,
  },
  yearText: {
    fontSize: 18,
    textAlign: "right",
    marginVertical: 10,
    fontFamily: "Inter_500Medium",
    marginHorizontal: 25,
    marginTop: 35,
    marginBottom: 22,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  columnsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },

  card: {
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: 'hidden',
  },
  smallCard: {
    height: 180,
  },
  largeCard: {
    height: 277,
  },

  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: 'hidden',
  },
  footerOverlay: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    paddingVertical: 19,
    paddingHorizontal: 18,
  },
  footerText: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.96,
  },
});

export default ProfileScreen;
