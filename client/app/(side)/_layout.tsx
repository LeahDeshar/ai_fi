import "react-native-gesture-handler";
import * as React from "react";
import { Drawer } from "expo-router/drawer";
import { useTheme } from "@/constants/ThemeProvider";

export default function DrawerLayout() {
  const { colors, dark } = useTheme();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: dark ? colors.opacity : "white",
        },
        drawerItemStyle: {
          backgroundColor: "#5f5f5f9c",
        },
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Plan",
          title: "",
        }}
      />
      <Drawer.Screen
        name="(social)/(tabs)"
        options={{
          drawerLabel: "Network",
          title: "",
        }}
      />
    </Drawer>
  );
}
