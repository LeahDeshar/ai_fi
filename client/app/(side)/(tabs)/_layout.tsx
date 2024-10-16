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

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors, dark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
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
            intensity={dark ? 95 : 60}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}

      // screenOptions={{
      //   tabBarActiveTintColor: colors.tabIconSelected,
      //   tabBarLabelStyle: {
      //     color: colors.tint,
      //   },
      //   tabBarStyle: { backgroundColor: colors.primary }, // Tab bar background color
      //   headerStyle: { backgroundColor: colors.primary },
      // }}
    >
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",

          // headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="Ionicons"
              name="home"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconSelected
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="MaterialCommunityIcons"
              name="dumbbell"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconSelected
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fasting"
        options={{
          title: "Fasting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="MaterialCommunityIcons"
              name="timer"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconSelected
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="MaterialCommunityIcons"
              name="whistle"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconSelected
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              iconSet="MaterialCommunityIcons"
              name="menu"
              color={
                focused
                  ? Colors[colorScheme ?? "light"].tabIconSelected
                  : Colors[colorScheme ?? "light"].text
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
