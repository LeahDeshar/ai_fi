import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { useTheme } from "@/constants/ThemeProvider";

const FriendLayout = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <StatusBar
        backgroundColor={colors.opacity}
        barStyle={dark ? "light-content" : "dark-content"}
      />
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
                  Find Friend
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default FriendLayout;

const styles = StyleSheet.create({});
