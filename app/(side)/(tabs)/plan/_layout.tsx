import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";

const planLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Favorites",
          }}
        />
      </Stack>
    </View>
  );
};

export default planLayout;

const styles = StyleSheet.create({});
