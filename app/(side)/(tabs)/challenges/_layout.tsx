import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const challengeLayout = () => {
  const { colors } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Challenges",
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

export default challengeLayout;

const styles = StyleSheet.create({});
