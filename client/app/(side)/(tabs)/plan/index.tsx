import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { StatusBar } from "react-native";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
  useGetUserActivityQuery,
} from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import { Rect, Svg } from "react-native-svg";

const planScreen = () => {
  const navigation = useNavigation();

  const { colors, dark } = useTheme();

  const itemSet = [
    {
      title: "Log Calories",
      image:
        "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanLogCalories",
      valueKey: "calorieIntake",
      unit: " kcal",
      maxValue: 8000,
    },
    {
      title: "Do Your Workout",
      image:
        "https://images.pexels.com/photos/4482936/pexels-photo-4482936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanWorkout",
    },
    {
      title: "Weight-in",
      image:
        "https://images.pexels.com/photos/6975464/pexels-photo-6975464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanWeight",
    },
    {
      title: "Drink Water",
      image:
        "https://images.pexels.com/photos/3737800/pexels-photo-3737800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanDrinkWater",
      valueKey: "waterIntake",
      unit: " ml",
      maxValue: 2000,
    },
    {
      title: "Reach Step Goal",
      image:
        "https://images.pexels.com/photos/13580544/pexels-photo-13580544.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      path: "PlanSteps",
      valueKey: "dailySteps",
      unit: " steps",
      maxValue: 10000,
    },
    {
      title: "Sleep Tracker",
      image:
        "https://www.nia.nih.gov/sites/default/files/inline-images/sleep-older-adults-inline.jpg",
      path: "PlanSleep",
    },
  ];

  const handleNavigate = (path) => () => {
    navigation.navigate(path);
  };

  const { data: userProfile } = useGetallUsersProfileQuery();
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const { data: userActivity, refetch: refetchActivity } =
    useGetUserActivityQuery();

  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <StatusBar barStyle={"default"} />
      <ScrollView
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <View>
            {itemSet?.map((item, index) => {
              const activityValue = item.valueKey
                ? userActivity?.activity[item.valueKey]
                : 0;
              const progress = Math.min(
                (activityValue / item?.maxValue) * 100,
                100
              );

              return (
                <TouchableOpacity
                  onPress={handleNavigate(item.path)}
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: colors.opacity,
                    borderRadius: 16,
                    margin: 8,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 85,
                        height: 85,
                        borderRadius: 50,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 18,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        {item.title}
                      </Text>

                      <Svg height="3" width="100%">
                        <Rect
                          x="0"
                          y="0"
                          width="100%"
                          height="3"
                          fill={colors.background}
                          rx="1.5"
                        />
                        <Rect
                          x="0"
                          y="0"
                          width={`${progress}%`}
                          height="3"
                          fill={"#007f00"}
                          rx="1.5"
                        />
                      </Svg>
                    </View>
                  </View>
                  <AntDesign name="right" size={20} color={colors.icon} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default planScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 50,
  },
  reactLogo: {
    height: 308,
    width: 390,
    // bottom: 0,
    // left: 0,
    // position: "absolute",
  },
});
