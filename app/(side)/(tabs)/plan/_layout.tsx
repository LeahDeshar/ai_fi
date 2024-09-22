import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "@/constants/token";
const CustomHeaderTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="home" size={24} color="white" style={styles.icon} />

      <Ionicons name="settings" size={24} color="white" style={styles.icon} />
    </View>
  );
};
const planLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // headerTitle: "My Plan",
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",

    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
});
export default planLayout;
