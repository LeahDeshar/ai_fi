import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/constants/ThemeProvider";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const ProfileTimeToSleep = () => {
  const { colors, dark } = useTheme();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [sleepGoalTime, setSleepGoalTime] = useState(new Date());
  const navigation = useRouter();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || sleepGoalTime;
    setSleepGoalTime(currentDate);
  };
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour = hours % 12 || 12;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minute} ${ampm}`;
  };
  const [timeToSleep, setSleepTime] = useState(new Date());
  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      const parsedTimeToSleep = new Date(profile.profileOfUsers.timeToSleep);
      // const parsedSleepGoalTime = new Date(profile.profileOfUsers.sleepTime);

      setSleepTime(parsedTimeToSleep);

      refetch();
    }
  }, [profile]);

  console.log(timeToSleep);

  const handleSave = async () => {
    const profileData = {
      timeToSleep: sleepGoalTime,
    };

    try {
      await updateProfile(profileData).unwrap();

      await refetch();
      navigation.back();
    } catch (error) {
      console.error("Error saving birthday:", error);
    }
    alert(`Your time to sleep is set to ${sleepGoalTime} hours.`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={{
          ...styles.header,
          color: colors.text,
        }}
      >
        Set Sleep Goal Time
      </Text>
      <Text
        style={{
          ...styles.header,
          color: colors.text,
        }}
      >
        Sleep goal time: {formatTime(timeToSleep)}
      </Text>

      <DateTimePicker
        value={timeToSleep}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={onChange}
      />

      <Button title="Pick Sleep Goal Time" handlePress={handleSave} />
    </View>
  );
};

export default ProfileTimeToSleep;

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
  selectedTime: {
    fontSize: 18,
    marginBottom: 20,
  },
});
