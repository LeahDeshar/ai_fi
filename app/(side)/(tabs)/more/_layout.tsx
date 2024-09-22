import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";

const moreLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerTitle: "Profile",
          }}
        />
      </Stack>
    </View>
  );
};

export default moreLayout;
