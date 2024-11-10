import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const ProfileSleepGoal = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
  const [sleepGoalHours, setSleepGoalHours] = useState(7);
  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleSleepGoalChange = (itemValue) => {
    setSleepGoalHours(itemValue);
  };

  const handleSave = async () => {
    const profileData = {
      sleepGoal: sleepGoalHours,
    };

    try {
      await updateProfile(profileData).unwrap();

      await refetch();
      navigation.push("MyProfile");
    } catch (error) {
      console.error("Error saving birthday:", error);
    }
    alert(`Your sleep goal is set to ${sleepGoalHours} hours.`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.header,
          {
            color: colors.text,
          },
        ]}
      >
        Set Your Sleep Goal
      </Text>
      <Text
        style={[
          styles.instructions,
          {
            color: colors.text,
            textAlign: "center",
          },
        ]}
      >
        How many hours of sleep do you aim for each night?
      </Text>

      <Picker
        selectedValue={sleepGoalHours}
        style={{
          width: 200,
          height: 50,
          marginBottom: 20,
          color: colors.text,
        }}
        onValueChange={handleSleepGoalChange}
      >
        <Picker.Item color={colors.text} label="6 hours" value={6} />
        <Picker.Item color={colors.text} label="7 hours" value={7} />
        <Picker.Item color={colors.text} label="8 hours" value={8} />
        <Picker.Item color={colors.text} label="9 hours" value={9} />
        <Picker.Item color={colors.text} label="10 hours" value={10} />
      </Picker>

      <View
        style={{
          top: 150,
        }}
      >
        <Button title="Save Sleep Goal" handlePress={handleSave} />
      </View>
    </View>
  );
};

export default ProfileSleepGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
});
