import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const planLayout = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: colors.text,
            headerTransparent: true,
            headerBlurEffect: dark ? "prominent" : "light",
            headerShadowVisible: false,

            headerTitle: "", // Set to an empty string to use custom headerLeft instead
            headerLeft: () => (
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.text,
                  }}
                >
                  My Plan
                </Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  marginRight: 10,
                }}
              >
                <TouchableOpacity>
                  <FontAwesome name="bolt" size={20} color={colors.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  <AntDesign name="message1" size={20} color={colors.icon} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default planLayout;
