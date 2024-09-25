// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import "react-native-reanimated";

// import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   const { colors } = useTheme();

//   return (
//     <ThemeProvider>
//       <Stack
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: colors.primary,
//           },
//           // remove the text from header left
//           headerLeft: () => null,
//         }}
//       >
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="(side)" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="MyProfile"
//           options={{
//             headerTitle: "My Profile",
//           }}
//         />

//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <InnerStack />
    </ThemeProvider>
  );
}

const InnerStack = () => {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        // remove the text from header left
        headerLeft: () => null,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          ...StackScreenWithSearchBar,
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="(side)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "My Profile",
        }}
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
          headerLeft: () => (
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
          headerLeft: () => (
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
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Reminder",
        }}
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
        name="ProfileNameScreen"
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          headerLeft: () => (
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
          ...StackScreenWithSearchBar,

          headerTitle: "Your Perfect Meal Plan",
        }}
      />
      <Stack.Screen
        name="MorePersonalCoach"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Pick Coach",
        }}
      />
      <Stack.Screen
        name="MoreTipsAndTricks"
        options={{
          headerTitle: "Tips and Articles",
        }}
      />
      <Stack.Screen
        name="MoreHelp"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Help",
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
        name="PlanLogCalories"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChallengeDetails"
        options={{
          headerTitle: "Challenge",
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
          headerTitle: "Consult with coach",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
