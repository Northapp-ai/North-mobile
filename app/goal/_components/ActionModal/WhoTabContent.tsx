import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

type Person = {
  id: string;
  name: string;
  uri: string;
};

type Props = {
  people: Person[];
  selectedPersonId: string | null;
  onPersonSelect: (personId: string) => void;
};

export function WhoTabContent({
  people,
  selectedPersonId,
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
            onPress={() => onPersonSelect(person.id)}
          >
            <Image
              source={{ uri: person.uri }}
              style={[
                styles.personImage,
                selectedPersonId === person.id && styles.selectedPerson,
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
