import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";

import { useNavigation, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  useCreateProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/Button";
import { setProfilePic } from "@/redux/slices/profileSlice";

const ProfileAvatar = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
  const dispatch = useDispatch();

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const {
    name,
    gender,
    birthday,
    currentHeight,
    currentWeight,
    goalWeight,
    activityLevel,
    activitiesLiked,
    specialPrograms,
    dailySteps,
    preferredDietType,
    preferredUnits,
    profilePic,
  } = useSelector((state) => state.profile);

  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  console.log("preferredUnits", preferredUnits);
  const [selectedImage, setSelectedImage] = useState(null);
  const [createProfile, { isLoadings }] = useCreateProfileMutation();
  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setSelectedImage(profile?.profileOfUsers?.profilePic?.url);
      refetch();
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleNext = async () => {
    if (isLoggedIn) {
      const profileData = {
        profilePic: { url: selectedImage },
      };

      try {
        await updateProfile(profileData).unwrap();
        await refetch();
        navigation.navigate("MyProfile");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else if (isRegProcess) {
      try {
        dispatch(setProfilePic({ url: selectedImage }));
        await createProfile({
          name,
          gender,
          birthday,
          currentHeight,
          currentWeight,
          goalWeight,
          activityLevel,
          activitiesLiked,
          specialPrograms,
          dailySteps,
          preferredDietType,
          preferredUnits,
          profilePic,
        }).unwrap();
        navigation.push("ProfileSummaryScreen");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  console.log(profilePic);
  const handleSelectImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const firstAsset = pickerResult.assets[0];
        setSelectedImage(firstAsset.uri);
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text
        style={{
          color: colors.text,
          fontSize: 35,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 150,
          paddingBottom: 20,
        }}
      >
        {name}, Choose your profile picture
      </Text> */}
      <TouchableOpacity
        onPress={handleSelectImage}
        style={{
          backgroundColor: colors.opacity,
          width: 210,
          height: 210,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        <LinearGradient
          colors={["#9f4c76", "#983b3b", "#192f6a"]}
          style={{
            width: 210,
            height: 210,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        />
        <View
          style={{
            width: 202,
            height: 202,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 190, height: 190, borderRadius: 100 }}
          />
        </View>
        <Ionicons
          name="camera-outline"
          size={24}
          style={{
            color: colors.text,
            position: "absolute",
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: 35,
          width: "80%",
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

export default ProfileAvatar;

const styles = StyleSheet.create({});
