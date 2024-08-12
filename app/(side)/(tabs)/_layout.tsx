import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors, dark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarLabelStyle: {
          color: colors.tint,
        },
        tabBarStyle: { backgroundColor: colors.primary }, // Tab bar background color
        headerStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          headerShown: false,
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
        name="Workouts"
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
        name="Fasting"
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
        name="Challenges"
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
        name="More"
        options={{
          title: "More",
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
