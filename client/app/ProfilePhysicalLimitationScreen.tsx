import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSpecialPrograms } from "@/redux/slices/profileSlice";

const ProfilePhysicalLimitationScreen = () => {
  const { colors } = useTheme();
  const [selectedActivity, setSelectedActivity] = useState(null); // Only one activity
  const navigation = useRouter();
  const dispatch = useDispatch();

  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  console.log(selectedActivity);

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setSelectedActivity(profile.profileOfUsers.specialPrograms[0]);
      // refetch();
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleNext = async () => {
    if (isLoggedIn) {
      const profileData = {
        specialPrograms: selectedActivity,
      };

      try {
        await updateProfile(profileData).unwrap();
        await refetch();
        navigation.navigate("MyProfile");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else if (!isLoggedIn) {
      dispatch(setSpecialPrograms(selectedActivity));

      navigation.push("ProfileDailyStepsScreen");
    }
  };

  const activities = [
    {
      name: "No Thanks",
    },
    {
      name: "Sensitive Back",
    },
    {
      name: "Sensitive Knees",
    },
    {
      name: "Limited Mobility",
    },
    {
      name: "Limb Loss",
    },
    {
      name: "Prenatal",
    },
    {
      name: "Postnatal",
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
        {activities.map((activity, index) => {
          console.log(
            selectedActivity,
            activity.name,
            selectedActivity === activity.name
          );
          return (
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
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {index == 0 ? (
                  <MaterialIcons
                    name="do-not-disturb"
                    size={24}
                    color="white"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="human-wheelchair"
                    size={24}
                    color="white"
                  />
                )}
                <Text style={{ color: colors.text, fontSize: 20 }}>
                  {activity.name}
                </Text>
              </View>

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
          );
        })}
      </ScrollView>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Button title="Save" handlePress={handleNext} />
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
