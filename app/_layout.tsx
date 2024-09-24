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
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileActivitiesScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
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
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileDOBScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileUnitsScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileNameScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileHeightScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileTargetWeightScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfileStartWeightScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="ProfilePhysicalLimitationScreen"
        options={{
          ...StackScreenWithSearchBar,

          headerTitle: "Profile",
        }}
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
