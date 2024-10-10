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

const ProfileActivitiesScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
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
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={
          {
            // paddingTop: 130,
          }
        }
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 150,
            paddingBottom: 30,
          }}
        >
          Choose up to 3 activities you're interested in
        </Text>

        <ScrollView>
          {activities.map((activity) => (
            <View
              key={activity.name}
              style={[
                styles.activityContainer,
                {
                  backgroundColor: selectedActivities.includes(activity.name)
                    ? "rgba(128, 128, 128,0.2)"
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
        </ScrollView>

        <View
          style={{
            marginBottom: 50,
          }}
        >
          <Button
            title="Save"
            handlePress={() => {
              navigation.push("ProfilePhysicalLimitationScreen");
            }}
          />
        </View>
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
    paddingVertical: 19,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 20,
  },
});
