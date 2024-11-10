import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { birthday } from "@/utils/birthday";
import { useDispatch } from "react-redux";
import { setBirthday } from "@/redux/slices/profileSlice";

const ProfileDOBScreen = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile?.profileOfUsers && profile.profileOfUsers.birthday) {
      setDate(new Date(profile.profileOfUsers.birthday));
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

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

  const handleSave = async () => {
    if (isLoggedIn) {
      const profileData = {
        birthday: birthday(date),
      };

      try {
        await updateProfile(profileData).unwrap();
        // Optionally, you can refetch the profile data if needed
        await refetch();
        navigation.push("MyProfile");
      } catch (error) {
        console.error("Error saving birthday:", error);
      }
    } else if (isRegProcess) {
      dispatch(setBirthday(date));
      navigation.push("ProfileHeightScreen");
    }
  };

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
          {birthday(date)}
        </Text>
      </View>
      <View
        style={[styles.buttonContainer, { backgroundColor: colors.background }]}
      >
        <Button
          title={isLoggedIn ? "SAVE" : "CONTINUE"}
          handlePress={handleSave}
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
