import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Slider from "@react-native-community/slider";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { setActivityLevel } from "@/redux/slices/profileSlice";

const ProfileFitness = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [sliderValue, setSliderValue] = useState(0);

  const dispatch = useDispatch();

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setSliderValue(profile.profileOfUsers.activityLevel);
    }
  }, [profile]);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const getComment = (value) => {
    if (value < 20) return "I need to catch my breath";
    if (value < 40) return "I'm getting there";
    if (value < 60) return "I'm feeling good";
    if (value < 80) return "I'm almost there";
    return "I'm at my peak performance!";
  };

  const getThumbImage = (value) => {
    if (value <= 20) return require("@/assets/sadd.png"); // Sad
    if (value <= 40) return require("@/assets/happy.png"); // Disappointed
    if (value <= 60) return require("@/assets/cool.png"); // Neutral
    if (value <= 80) return require("@/assets/smirk.png"); // Slightly Happy
    return require("@/assets/smirk.png"); // Very Happy
  };

  const handleNext = async () => {
    if (isLoggedIn) {
      const profileData = {
        activityLevel: sliderValue,
      };

      try {
        await updateProfile(profileData).unwrap();
        await refetch();
        navigation.navigate("MyProfile");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else if (isRegProcess) {
      dispatch(setActivityLevel(sliderValue));
      navigation.push("ProfileActivitiesScreen");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        paddingTop: 130,
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 35,
          textAlign: "center",
          color: colors.text,
          marginTop: 30,
          fontWeight: "bold",
          marginHorizontal: 15,
        }}
      >
        What's your current activity level?
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          marginTop: 150,
        }}
      >
        <Text style={[styles.emoji, { color: colors.tabIconDefault }]}>
          {getComment(sliderValue)}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbTintColor="transparent"
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#4D0101"
          maximumTrackTintColor="#d3d3d3"
          thumbImage={getThumbImage(sliderValue)}
        />
        <View style={styles.valueContainer}>
          <Text style={[styles.valueText, { color: colors.text }]}>
            {Math.round(sliderValue)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
            bottom: 30,
          }}
        >
          <Text
            style={{
              color: colors.text,
              marginTop: 20,
              fontSize: 10,
              marginLeft: 10,
            }}
          >
            NEWBIE
          </Text>
          <Text
            style={{
              color: colors.text,
              marginTop: 20,
              fontSize: 10,
              marginRight: 10,
            }}
          >
            PRO
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
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

const styles = StyleSheet.create({
  slider: {
    width: 300,
  },
  valueContainer: {
    marginTop: 20,
  },
  valueText: {
    fontSize: 16,
  },
  emoji: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ProfileFitness;
