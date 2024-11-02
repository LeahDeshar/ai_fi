import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { useDispatch } from "react-redux";

type MoreItem = {
  title: string;
  icon: string;
  path: string;
};

const MoreItems: MoreItem[] = [
  {
    title: "Meals",
    icon: "fast-food-outline",
    path: "MoreMeals",
  },
  {
    title: "Personal Coach",
    icon: "chatbubble-ellipses-outline",
    path: "MorePersonalCoach",
  },
  {
    title: "Tips & Articles",
    icon: "document-text-outline",
    path: "MoreTipsAndTricks",
  },
  {
    title: "Help",
    icon: "help-circle-outline",
    path: "MoreHelp",
  },
];

const renderItem = (item: MoreItem) => {
  const navigation = useRouter();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      key={item.title}
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.path)}
    >
      <View style={styles.item}>
        <Ionicons
          name={item.icon}
          size={24}
          style={{ color: colors.text, marginLeft: 10 }}
        />
        <Text style={[styles.itemText, { color: colors.text, marginLeft: 10 }]}>
          {item.title}
        </Text>
        <MaterialIcons
          style={{ color: colors.text }}
          name="chevron-right"
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

const MoreScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();

  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();

  console.log("Test", profile);

  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <ThemedView>
          <TouchableOpacity
            onPress={() => navigation.push("MyProfile")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              borderBottomWidth: 0.5,
              borderBottomColor: "#4a4a4a5f",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri:
                    profile?.profileOfUsers?.profilePic?.url ||
                    "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg",
                }}
                style={{ width: 80, height: 80, borderRadius: 75 }}
              />
              <View style={{ marginLeft: 25 }}>
                <Text style={{ color: colors.text }}>
                  {profile?.profileOfUsers?.name || "Guest"}
                </Text>
                <Text style={{ color: colors.text }}>My Profile</Text>
              </View>
            </View>
            <MaterialIcons
              style={{ color: colors.text }}
              name="chevron-right"
              size={24}
            />
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: colors.opacity,
            borderRadius: 25,
            marginTop: 25,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 26,
              marginTop: 20,
            }}
          >
            <Text style={{ color: colors.text }}>Statistics</Text>
            <MaterialIcons
              name="chevron-right"
              style={{ color: colors.text }}
              size={24}
            />
          </View>
          <View>
            <Text style={{ color: colors.text, marginLeft: 26 }}>
              Check your weekly progress
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 26,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.secondary,
                  padding: 5,
                  paddingHorizontal: 8,
                  borderRadius: 25,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: colors.text }}>VIEW</Text>
              </View>
              <Image
                source={require("@/assets/images/stat.png")}
                style={{
                  width: 130,
                  height: 130,
                  right: -30,
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <ThemeButton />

        {/* Render the MoreItems manually */}
        {MoreItems.map((item) => renderItem(item))}
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const ThemeButton = () => {
  const { dark, setScheme, colors } = useTheme();
  console.log(dark);

  return (
    <TouchableOpacity
      style={{
        marginVertical: 20,
      }}
      onPress={() => {
        setScheme(dark ? "light" : "dark");
      }}
    >
      <Text
        style={{
          color: colors.text,
        }}
      >{`Switch to ${dark ? "Light" : "Dark"} Theme`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#18171741",
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  themeButton: {
    marginTop: 16,
  },
  themeButtonText: {
    fontSize: 18,
    textAlign: "center",
  },
});
