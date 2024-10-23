import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { useRouter } from "expo-router";
import { setPreferredUnits } from "@/redux/slices/profileSlice";
import Button from "@/components/Button";

const ProfileUnitsScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [units, setUnits] = useState("metric");

  const dispatch = useDispatch();

  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setUnits(profile.profileOfUsers.preferredUnits);
      refetch();
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleNext = async () => {
    if (isLoggedIn) {
      if (profile.profileOfUsers.preferredUnits !== units) {
        const profileData = {
          preferredUnits: units,
        };

        try {
          await updateProfile(profileData).unwrap();
          await refetch();
          navigation.navigate("MyProfile");
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      }
    } else if (!isLoggedIn) {
      dispatch(setPreferredUnits(units));

      navigation.push("ProfileGender");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 90,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: colors.opacity,
          borderRadius: 15,
          padding: 20,
          marginTop: 20,
        }}
      >
        <ProfileItem
          title="Metres & Kilograms"
          onPress={() => setUnits("metric")}
          isSelected={units === "metric"}
        />
        <ProfileItem
          title="Pounds,feet and inches"
          onPress={() => setUnits("imperial")}
          haveBorderBottom={false}
          isSelected={units === "imperial"}
        />
      </View>
      <Button title="Save" handlePress={handleNext} />
    </View>
  );
};
interface ProfileItemProps {
  title: string;
  value?: string;
  colors?: any;
  haveBorderBottom?: boolean;
  onPress?: () => void;
  isSelected: boolean;
}

const ProfileItem = ({
  title,
  value,
  haveBorderBottom = true,
  onPress,
  isSelected,
}: ProfileItemProps) => {
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomWidth: haveBorderBottom ? 1 : 0,
          borderBottomColor: colors.borders,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.itemTitle, { color: dark ? "#a4a4a4" : "#000" }]}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {value && (
          <Text style={[styles.itemValue, { color: colors.text }]}>
            {value}
          </Text>
        )}
        {isSelected ? (
          <Ionicons name="checkmark-outline" size={24} color="#22d60d" />
        ) : (
          ""
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ProfileUnitsScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 10,
    borderBottomColor: "#dddddd25",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: "#888",
  },
});
