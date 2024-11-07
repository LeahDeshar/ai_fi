import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";
import { BlurView } from "expo-blur";
import { fontSize } from "@/constants/token";
import { StyleSheet } from "react-native";
import { StackScreenWithSearchBar } from "@/constants/layout";

export default function SocialTabLayout() {
  const colorScheme = useColorScheme();
  const { colors, dark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconDefault,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: "500",
        },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={dark ? 95 : 120}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",

          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="Ionicons"
              name="home"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconDefault
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="friend"
        options={{
          title: "Network",

          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="FontAwesome"
              name="feed"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconDefault
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
