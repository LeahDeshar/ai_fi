import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const moreLayout = () => {
  const { colors } = useTheme();
  return (
    <View style={[defaultStyles.container]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Profile",
            headerLargeStyle: {
              backgroundColor: colors.opacity,
            },

            headerLargeTitleStyle: {
              color: colors.text,
            },

            headerTintColor: colors.text,
          }}
        />
      </Stack>
    </View>
  );
};

export default moreLayout;
