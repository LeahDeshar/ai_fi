import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

const ProfileGender = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [selectedGender, setSelectedGender] = useState("Male");

  const genders = [
    {
      name: "Male",
      icon: "male",
    },
    {
      name: "Female",
      icon: "female",
    },
  ];

  const selectGender = (genderName) => {
    setSelectedGender(genderName);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingTop: 80,
        // justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 35,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
          marginBottom: 100,
        }}
      >
        What's Your Gender?
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 200,
        }}
      >
        {genders.map((gender) => (
          <View
            key={gender.name}
            style={[
              styles.genderContainer,
              {
                borderRadius: 30,
                backgroundColor:
                  selectedGender === gender.name
                    ? colors.opacity
                    : colors.background,
              },
            ]}
          >
            <View style={styles.genderInfo}>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: colors.tabIconSelected,
                  padding: 10,
                }}
              >
                <Ionicons name={gender.icon} size={15} color={colors.text} />
              </View>

              <Text
                style={{ color: colors.text, fontSize: 20, marginLeft: 10 }}
              >
                {gender.name}
              </Text>
            </View>

            <TouchableOpacity onPress={() => selectGender(gender.name)}>
              {selectedGender === gender.name ? (
                <AntDesign name="checkcircle" size={24} color={colors.text} />
              ) : (
                <Feather name="circle" size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("ProfileDOBScreen")}
        >
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileGender;

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  genderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "90%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fd6060f8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 3,
  },
});
