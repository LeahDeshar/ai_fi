import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type MoreItem = {
  title: string;
  icon: string;
  onPress?: () => void;
};

const More = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();

  const MoreItems: MoreItem[] = [
    {
      title: "Meals",
      icon: "fast-food-outline",
      onPress: () => navigation.navigate("MoreMeals"),
    },
    {
      title: "Personal Coach",
      icon: "chatbubble-ellipses-outline",
      onPress: () => navigation.navigate("MorePersonalCoach"),
    },
    {
      title: "Tips & Articles",
      icon: "document-text-outline",
      onPress: () => navigation.navigate("MoreTipsAndTricks"),
    },
    {
      title: "Help",
      icon: "help-circle-outline",
      onPress: () => navigation.navigate("MoreHelp"),
    },
  ];
  const renderItem = ({ item }: { item: MoreItem }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={item.onPress}>
      <View style={styles.item}>
        <Ionicons
          name={item?.icon}
          size={24}
          style={{
            color: colors.text,
          }}
        />
        <Text
          style={[
            styles.itemText,
            {
              color: colors.text,
            },
          ]}
        >
          {item.title}
        </Text>
        <MaterialIcons
          style={{
            color: colors.text,
          }}
          name="chevron-right"
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView>
        <TouchableOpacity
          onPress={() => navigation.push("MyProfile")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/avatar/female1.png")}
              style={{ width: 80, height: 80, borderRadius: 75 }}
            />
            <View
              style={{
                marginLeft: 25,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                }}
              >
                Leah
              </Text>

              <Text
                style={{
                  color: colors.text,
                }}
              >
                My Profile
              </Text>
            </View>
          </View>
          <MaterialIcons
            style={{
              color: colors.text,
            }}
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
          <Text
            style={{
              color: colors.text,
              // marginHorizontal: 26,
            }}
          >
            Statistics
          </Text>
          <MaterialIcons
            name="chevron-right"
            style={{
              color: colors.text,
            }}
            size={24}
          />
        </View>
        <View>
          <Text
            style={{
              color: colors.text,
              marginLeft: 26,
            }}
          >
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
              <Text
                style={{
                  color: colors.text,
                }}
              >
                VIEW
              </Text>
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
      <FlatList
        data={MoreItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default More;

const ThemeButton = () => {
  const { dark, setScheme, colors } = useTheme();
  console.log(dark);

  return (
    <TouchableOpacity
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
    marginBottom: 16,
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
