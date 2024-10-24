import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { setDailySteps } from "@/redux/slices/profileSlice";

const ProfileDailyStepsScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [dailyGoal, setDailyGoal] = useState(3000);
  const dispatch = useDispatch();

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setDailyGoal(profile.profileOfUsers.dailySteps);
      refetch();
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleNext = async () => {
    if (isLoggedIn) {
      const profileData = {
        dailySteps: dailyGoal,
      };

      try {
        await updateProfile(profileData).unwrap();
        await refetch();
        navigation.navigate("MyProfile");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else if (isRegProcess) {
      dispatch(setDailySteps(dailyGoal));

      navigation.push("ProfileDietType");
    }
  };

  const generateStepOptions = () => {
    let options = [];
    for (let i = 3000; i <= 20000; i += 1000) {
      options.push(i);
    }
    return options;
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
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
        Select Your Daily Steps:
      </Text>
      {isLoggedIn && (
        <View
          style={{
            paddingVertical: 15,
            borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Your Recommended Daily Steps is{" "}
            {profile?.calculations.dailyStepRecommendation}
          </Text>
        </View>
      )}

      <View style={styles.pickerContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 20,
              textAlign: "center",
              marginRight: 30,
            }}
          >
            {dailyGoal}
          </Text>
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 25,
              textAlign: "center",
            }}
          >
            Steps
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            width: "20%",
            right: 45,
            borderBottomColor: colors.tabIconDefault,
          }}
        />
        <Picker
          selectedValue={dailyGoal}
          style={[styles.picker]}
          itemStyle={{
            color: colors.text,
          }}
          onValueChange={(itemValue) => setDailyGoal(itemValue)}
        >
          {generateStepOptions().map((step) => (
            <Picker.Item
              style={{
                backgroundColor: colors.primary,
              }}
              key={step}
              label={`${step} steps`}
              value={step}
            />
          ))}
        </Picker>
      </View>
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Button
          title={isLoggedIn ? "SAVE" : "CONTINUE"}
          handlePress={handleNext}
        />
      </View>
    </View>
  );
};

export default ProfileDailyStepsScreen;

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: "80%",
    // marginTop: 150,
  },
  picker: {
    height: 50,
    width: "100%",
    marginTop: 50,
  },
  selectedGoal: {
    marginTop: 20,
    fontSize: 18,
  },
});
