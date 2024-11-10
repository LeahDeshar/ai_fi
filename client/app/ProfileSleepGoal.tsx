import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/constants/ThemeProvider";

const ProfileSleepGoal = () => {
  const { colors, dark } = useTheme();

  const [sleepGoalTime, setSleepGoalTime] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || sleepGoalTime;
    setSleepGoalTime(currentDate);
  };

  // Format the selected time to 12-hour AM/PM format
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour = hours % 12 || 12;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minute} ${ampm}`;
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
        Sleep goal time: {formatTime(sleepGoalTime)}
      </Text>
      <Button
        title="Pick Sleep Goal Time"
        onPress={() => console.log("picked")}
      />

      <DateTimePicker
        value={sleepGoalTime}
        mode="time"
        is24Hour={false}
        display="spinner"
        onChange={onChange}
      />
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
  selectedTime: {
    fontSize: 18,
    marginBottom: 20,
  },
});
