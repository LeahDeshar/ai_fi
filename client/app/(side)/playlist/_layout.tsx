import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const PlaylistLayout = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
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

            headerTitle: "",
            headerLeft: () => (
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.text,
                  }}
                >
                  Playlist
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
                  onPress={() => navigation.push("Chatbot")}
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

export default PlaylistLayout;