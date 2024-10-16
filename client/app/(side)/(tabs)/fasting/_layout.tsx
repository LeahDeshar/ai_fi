import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const FastingScreenLayout = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: colors.text,
            headerTransparent: true,
            headerBlurEffect: dark ? "prominent" : "systemChromeMaterialLight",
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
                  Fasting
                </Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 10,
                    borderRadius: 25,
                    borderWidth: 0.7,
                    borderColor: "#b1b1b18d",
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                  }}
                  onPress={() => alert("Icon 1 Pressed")}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      marginHorizontal: 3,
                      fontWeight: "bold",
                    }}
                  >
                    16:8
                  </Text>
                  <Ionicons name="pencil" size={12} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    borderWidth: 0.7,
                    borderColor: "#b1b1b18d",
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}
                  onPress={() => alert("Icon 2 Pressed")}
                >
                  <AntDesign name="infocirlceo" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default FastingScreenLayout;

const styles = StyleSheet.create({});
