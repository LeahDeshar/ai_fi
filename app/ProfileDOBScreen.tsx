import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const ProfileDOBScreen = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          When is your birthday?
        </Text>
        <Text style={[styles.dateText, { color: colors.text }]}>
          {date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <View
        style={[styles.buttonContainer, { backgroundColor: colors.background }]}
      >
        <Button
          title="SAVE"
          handlePress={() => navigation.push("ProfileHeightScreen")}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={onChange}
          themeVariant={dark ? "dark" : "light"}
          maximumDate={eighteenYearsAgo}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileDOBScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 20,
    marginTop: 50,
  },
  buttonContainer: {
    top: 20,
  },
  datePickerContainer: {
    justifyContent: "flex-end",
    marginBottom: 40,
    // flex: 1,
  },
});
