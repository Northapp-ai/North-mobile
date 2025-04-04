import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import LogoutButton from "@/components/logoutButton";
import { signOut } from "../auth/services/authServices";
import { router, useLocalSearchParams } from "expo-router";

const ProfileScreen = () => {
  const [images, setImages] = useState(Array(6).fill(null));
  const { fullName } = useLocalSearchParams();
  const pickImage = async (index:number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ['images'],
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/auth/login')
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo cerrar sesión');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.headerContainer}>
        {/* <Ionicons name="menu" size={24} /> */}
        <LogoutButton onLogout={handleLogout} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-outline" size={30} />
        </View>
        <Text style={styles.profileName}>{fullName}</Text>
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
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, index % 3 === 0 ? styles.largeCard : styles.smallCard]}
            onPress={() => pickImage(index)}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons name="add" size={24} color="#888" />
            )}
          </TouchableOpacity>
        ))}
      </View>
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
});

export default ProfileScreen;
