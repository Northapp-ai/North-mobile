import { User } from "@/app/auth/models/types";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

type Props = {
  people: User[];
  selectedPersonEmail: string | null;
  onPersonSelect: (personEmail: string) => void;
};

export function WhoTabContent({
  people,
  selectedPersonEmail,
  onPersonSelect,
}: Props) {
  return (
    <View style={styles.whoContent}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.peopleCarousel}
        contentContainerStyle={styles.carouselContent}
      >
        {people.map((person) => (
          <TouchableOpacity
            key={person.id}
            style={[styles.personContainer]}
            onPress={() => onPersonSelect(person.email)}
          >
            <Image
              source={{ uri: person.profilePhoto }}
              style={[
                styles.personImage,
                selectedPersonEmail === person.email && styles.selectedPerson,
              ]}
            />
            <Text style={styles.personName}>{person.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.contentDescription}>
        Choose who will help with this goal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  whoContent: {
    alignItems: "center",
  },
  peopleCarousel: {
    maxHeight: 100,
  },
  carouselContent: {
    paddingHorizontal: 10,
  },
  personContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
  },
  personImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  selectedPerson: {
    borderWidth: 2,
    borderColor: "#000",
  },
  personName: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  contentDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
