import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Feather } from "@expo/vector-icons";

const ProfileActivitiesScreen = () => {
  const { colors } = useTheme();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const activities = [
    {
      name: "Running",
      icon: "🏃‍♂️",
    },
    {
      name: "Cycling",
      icon: "🚴‍♂️",
    },
    {
      name: "Swimming",
      icon: "🏊‍♂️",
    },
    {
      name: "Yoga",
      icon: "🧘‍♂️",
    },
    {
      name: "Weightlifting",
      icon: "🏋️‍♂️",
    },
    {
      name: "Pilates",
      icon: "🧘‍♂️",
    },
    {
      name: "Dance",
      icon: "💃",
    },
    {
      name: "Meditation",
      icon: "🧘‍♂️",
    },
    {
      name: "Boxing",
      icon: "🥊",
    },
    {
      name: "HIIT",
      icon: "🏋️‍♂️",
    },
    {
      name: "Crossfit",
      icon: "🏋️‍♂️",
    },
    {
      name: "Walking",
      icon: "🚶‍♂️",
    },
  ];

  const toggleActivitySelection = (activityName) => {
    if (selectedActivities.includes(activityName)) {
      setSelectedActivities(
        selectedActivities.filter((name) => name !== activityName)
      );
    } else if (selectedActivities.length < 3) {
      setSelectedActivities([...selectedActivities, activityName]);
    }
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Text
        style={{
          color: colors.text,
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Choose up to 3 activities you're interested in
      </Text>
      <View>
        {activities.map((activity) => (
          <View
            key={activity.name}
            style={[
              styles.activityContainer,
              {
                backgroundColor: selectedActivities.includes(activity.name)
                  ? colors.primary
                  : colors.background,
                borderBottomColor: colors.text,
              },
            ]}
          >
            <Text style={{ color: colors.text, fontSize: 20 }}>
              {activity.icon} {activity.name}
            </Text>
            <TouchableOpacity
              onPress={() => toggleActivitySelection(activity.name)}
              disabled={
                selectedActivities.length >= 3 &&
                !selectedActivities.includes(activity.name)
              }
            >
              {selectedActivities.includes(activity.name) ? (
                <AntDesign name="checkcircle" size={24} color={colors.text} />
              ) : (
                <Feather name="circle" size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileActivitiesScreen;

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
});
