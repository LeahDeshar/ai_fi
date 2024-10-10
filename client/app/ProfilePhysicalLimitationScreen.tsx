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

const ProfilePhysicalLimitationScreen = () => {
  const { colors } = useTheme();
  const [selectedActivity, setSelectedActivity] = useState(null); // Only one activity
  const navigation = useRouter();

  const activities = [
    {
      name: "No Thanks",
      icon: "🚫",
    },
    {
      name: "Sensitive Back",
      icon: "🏃‍♂️",
    },
    {
      name: "Sensitive Knees",
      icon: "🚴‍♂️",
    },
    {
      name: "Limited Mobility",
      icon: "🏊‍♂️",
    },
    {
      name: "Limb Loss",
      icon: "🧘‍♂️",
    },
    {
      name: "Prenatal",
      icon: "🏋️‍♂️",
    },
    {
      name: "Postnatal",
      icon: "🧘‍♂️",
    },
  ];

  const toggleActivitySelection = (activityName) => {
    if (selectedActivity === activityName) {
      setSelectedActivity(null); // Deselect if clicked again
    } else {
      setSelectedActivity(activityName); // Select the new activity
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
        Do you want to include special programs?
      </Text>
      <ScrollView>
        {activities.map((activity) => (
          <View
            key={activity.name}
            style={[
              styles.activityContainer,
              {
                backgroundColor:
                  selectedActivity === activity.name
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
              {activity.icon} {activity.name}
            </Text>
            <TouchableOpacity
              onPress={() => toggleActivitySelection(activity.name)}
            >
              {selectedActivity === activity.name ? (
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
            navigation.push("ProfileDailyStepsScreen");
          }}
        />
      </View>
    </View>
  );
};

export default ProfilePhysicalLimitationScreen;

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
});
