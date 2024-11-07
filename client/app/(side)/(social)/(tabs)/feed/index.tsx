import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { useNavigation } from "expo-router";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import { useSelector } from "react-redux";

const FindFriend = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text>FindFriend</Text>
    </View>
  );
};

export default FindFriend;

const styles = StyleSheet.create({});
