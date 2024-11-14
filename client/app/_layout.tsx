import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import queryClient from "@/redux/queryClient";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
SplashScreen.preventAutoHideAsync();
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permission for notifications
const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("You need to enable notifications for this app!");
  }
};

// Register for push notifications and get the push token
const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Failed to get push token for push notifications!");
      return;
    }
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};
export default function RootLayout() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    requestNotificationPermissions();
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <InnerStack />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const InnerStack = () => {
  const { colors, dark } = useTheme();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Stack
      screenOptions={{
        headerLeft: () => null,
      }}
    >
      <Stack.Screen
        name="(side)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        options={({ navigation }) => ({
          headerTitle: "My Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 5 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProfileFitness"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileActivitiesScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileReminder"
        options={({ navigation }) => ({
          headerTitle: "Reminder",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 5 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="ViewProfile"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 5 }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PersonalizeScreen"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProfileGender"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileDOBScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileTimeToSleep"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />

      <Stack.Screen
        name="ProfileSleepGoal"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileUnitsScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileAvatar"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn &&
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileDietType"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileSummaryScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () => <View />,
        })}
      />
      <Stack.Screen
        name="ProfileNameScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          gestureEnabled: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileDailyStepsScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileHeightScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileTargetWeightScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfileStartWeightScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ProfilePhysicalLimitationScreen"
        options={({ navigation }) => ({
          headerTitle: "Profile",
          headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "prominent",
          headerShadowVisible: false,
          headerLargeStyle: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          // Customize the left side of the header
          headerLeft: () =>
            isLoggedIn && (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 5 }} // Adjust the position
              >
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="MoreMeals"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AiChallengeDetails"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chatbot"
        options={{
          // ...StackScreenWithSearchBar,

          // headerTitle: "Fitness Chatbot",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MorePersonalCoach"
        options={{
          // headerShown: false,

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
                Consult with coach
              </Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="ActivityInsight"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MoreTipsAndTricks"
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
                Forum
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MoreHelp"
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
                Help
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="WorkoutSubworkout"
        options={{
          ...StackScreenWithSearchBar,

          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WorkoutDetails"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PlanDrinkWater"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlanWorkout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalorieFoodTracker"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="CreateFood"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="PlanWeight"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlanSteps"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlanSleep"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PlanLogCalories"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChallengeDetails"
        options={{
          // headerTintColor: colors.text,
          headerTransparent: true,
          headerBlurEffect: "light",
          headerShadowVisible: false,

          headerTitle: "",
          // headerShown: false,

          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="FastingReadDetails"
        options={{
          // ...StackScreenWithSearchBar,

          headerTitle: "Read",
        }}
      />

      <Stack.Screen
        name="MorePersonalCoachChat"
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
                Chat
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
