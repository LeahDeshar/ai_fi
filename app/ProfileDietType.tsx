import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Feather } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const ProfileDietType = () => {
  const { colors } = useTheme();
  const [selectedDiet, setSelectedDiet] = useState(null); // Only one diet type can be selected
  const navigation = useRouter();

  const dietTypes = [
    {
      name: "Traditional",
      icon: "🍽️",
    },
    {
      name: "Vegan",
      icon: "🥗",
    },
    {
      name: "Vegetarian",
      icon: "🥕",
    },
    {
      name: "Keto",
      icon: "🥩",
    },
    {
      name: "Paleo",
      icon: "🍖",
    },
    {
      name: "Low Carb",
      icon: "🍳",
    },
    {
      name: "Mediterranean",
      icon: "🍇",
    },
  ];

  const toggleDietSelection = (dietName) => {
    if (selectedDiet === dietName) {
      setSelectedDiet(null); // Deselect if clicked again
    } else {
      setSelectedDiet(dietName); // Select the new diet type
    }
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 35,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 150,
          paddingBottom: 20,
        }}
      >
        Choose your preferred diet type
      </Text>
      <ScrollView>
        {dietTypes.map((diet) => (
          <View
            key={diet.name}
            style={[
              styles.dietContainer,
              {
                backgroundColor:
                  selectedDiet === diet.name
                    ? "rgba(128, 128, 128,0.2)"
                    : colors.background,
                borderBottomColor: colors.text,
                marginHorizontal: 15,
                borderRadius: 20,
                paddingVertical: 20,
                marginVertical: 2,
              },
            ]}
          >
            <Text style={{ color: colors.text, fontSize: 20 }}>
              {diet.icon} {diet.name}
            </Text>
            <TouchableOpacity onPress={() => toggleDietSelection(diet.name)}>
              {selectedDiet === diet.name ? (
                <AntDesign name="checkcircle" size={24} color={colors.text} />
              ) : (
                <Feather name="circle" size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Button
          title="Save"
          handlePress={() => {
            navigation.push("ProfileSummaryScreen");
          }}
        />
      </View>
    </View>
  );
};

export default ProfileDietType;

const styles = StyleSheet.create({
  dietContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
