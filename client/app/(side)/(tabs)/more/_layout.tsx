import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const moreLayout = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={[defaultStyles.container]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: colors.text,
            headerTransparent: true,
            headerBlurEffect: dark ? "prominent" : "light",
            headerShadowVisible: false,

            headerTitle: "",

            headerLeft: () => (
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.text,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default moreLayout;
