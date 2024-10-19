import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const workoutLayout = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          // options={{
          //   ...StackScreenWithSearchBar,
          //   headerTitle: "Workout",
          //   headerLargeStyle: {
          //     backgroundColor: colors.opacity,
          //   },

          //   headerLargeTitleStyle: {
          //     color: colors.text,
          //   },

          //   headerTintColor: colors.text,
          // }}
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
                  Workout
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default workoutLayout;

const styles = StyleSheet.create({});
