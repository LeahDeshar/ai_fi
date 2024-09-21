import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";

const challengeLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Challenges",
          }}
        />
      </Stack>
    </View>
  );
};

export default challengeLayout;

const styles = StyleSheet.create({});
