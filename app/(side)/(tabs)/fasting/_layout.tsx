import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";

const FastingScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Fasting",
          }}
        />
      </Stack>
    </View>
  );
};

export default FastingScreenLayout;

const styles = StyleSheet.create({});
