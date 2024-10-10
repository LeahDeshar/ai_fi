import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const workoutLayout = () => {
  const { colors } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Workout",
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

export default workoutLayout;

const styles = StyleSheet.create({});
