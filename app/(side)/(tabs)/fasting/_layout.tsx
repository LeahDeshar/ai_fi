import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";

const FastingScreenLayout = () => {
  const { colors } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Fasting",
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

export default FastingScreenLayout;

const styles = StyleSheet.create({});
