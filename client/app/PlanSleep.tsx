// import React, { useState, useRef, useEffect } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   View,
// } from "react-native";
// import { useTheme } from "@/constants/ThemeProvider";
// import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";
// import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import { Calendar } from "react-native-calendars";
// import { Accelerometer } from "expo-sensors";
// import { useSelector } from "react-redux";
// import { useGetProfileQuery } from "@/redux/api/apiClient";
// import { Circle, G, Svg } from "react-native-svg";

// const PlanSleep = () => {
//   const { colors, dark } = useTheme();
//   const navigation = useNavigation();
//   const bottomSheetRef = useRef<BottomSheetModal>(null);

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };
//   const [selectedDate, setSelectedDate] = useState(null);

//   useSelector((state) => state.auth);
//   const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

//   const [data, setData] = useState({});
//   const [isTracking, setIsTracking] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [sleepDuration, setSleepDuration] = useState(0);

//   const size = 185;
//   const strokeWidth = 8;
//   const progress = 1;

//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (circumference * progress) / 100;

//   useEffect(() => {
//     if (isTracking) {
//       // Start tracking the accelerometer data when tracking is enabled
//       Accelerometer.addListener((accelerometerData) => {
//         setData(accelerometerData);
//       });
//     } else {
//       // Stop tracking when the tracking is disabled
//       Accelerometer.removeAllListeners();
//     }

//     return () => Accelerometer.removeAllListeners();
//   }, [isTracking]);

//   // Function to start tracking sleep
//   const startSleepTracking = () => {
//     setStartTime(new Date());
//     setIsTracking(true);
//   };

//   // Function to stop tracking sleep
//   const stopSleepTracking = () => {
//     setIsTracking(false);

//     if (startTime) {
//       const endTime = new Date();
//       const sleepHours = (endTime - startTime) / (1000 * 60 * 60);
//       setSleepDuration(sleepHours);
//     }
//   };

//   // Helper to detect low movement (e.g., user is inactive or sleeping)
//   const isInactive = () => {
//     const { x, y, z } = data;
//     return Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(z) < 0.02;
//   };

//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <SafeAreaView
//           style={{
//             flex: 1,
//             backgroundColor: colors.background,
//           }}
//         >
//           <View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 paddingHorizontal: 20,
//                 borderBottomColor: "#acacac47",
//                 paddingBottom: 3,
//                 borderBottomWidth: 1,
//               }}
//             >
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               >
//                 <AntDesign name="arrowleft" size={20} color={colors.icon} />
//               </TouchableOpacity>
//               <Text
//                 style={{
//                   color: colors.text,
//                   fontSize: 20,
//                   fontWeight: "semibold",
//                   textAlign: "center",
//                   marginVertical: 16,
//                 }}
//               >
//                 Step Tracker
//               </Text>
//               <TouchableOpacity onPress={openBottomSheet}>
//                 <AntDesign name="calendar" size={20} color={colors.icon} />
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 borderBottomLeftRadius: 25,
//                 borderBottomRightRadius: 25,
//                 backgroundColor: colors.background,
//                 paddingVertical: 25,
//               }}
//             >
//               <View style={{ justifyContent: "center", alignItems: "center" }}>
//                 <Svg width={size} height={size}>
//                   <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
//                     <Circle
//                       cx={size / 2}
//                       cy={size / 2}
//                       r={radius}
//                       stroke="#ffffff"
//                       strokeWidth={strokeWidth}
//                       fill="none"
//                     />
//                     <Circle
//                       cx={size / 2}
//                       cy={size / 2}
//                       r={radius}
//                       stroke="#eaeaeb"
//                       strokeWidth={strokeWidth}
//                       strokeLinecap="round"
//                       // strokeDasharray={circumference}
//                       strokeDashoffset={170}
//                       fill="none"
//                     />
//                     <Circle
//                       cx={size / 2}
//                       cy={size / 2}
//                       r={radius}
//                       stroke="#b50101"
//                       strokeWidth={strokeWidth}
//                       strokeLinecap="round"
//                       strokeDasharray={circumference}
//                       strokeDashoffset={strokeDashoffset}
//                       fill="none"
//                     />
//                   </G>
//                 </Svg>
//                 <View
//                   style={{
//                     position: "absolute",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 44,
//                       fontWeight: 500,
//                       color: colors.text,
//                     }}
//                   >
//                     8 hours
//                   </Text>
//                   <Text
//                     style={{
//                       color: colors.text,
//                     }}
//                   >
//                     of
//                   </Text>
//                   <TouchableOpacity>
//                     <Text
//                       style={{
//                         color: colors.text,
//                       }}
//                     >
//                       Edit
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </SafeAreaView>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default PlanSleep;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Accelerometer } from "expo-sensors";
import Svg, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlanSleep = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [data, setData] = useState({});
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [sleepGoal, setSleepGoal] = useState(8); // Set a default sleep goal, in hours
  const [sleepDuration, setSleepDuration] = useState(0); // Duration of tracked sleep hours

  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * (sleepDuration / sleepGoal)) / 100;

  useEffect(() => {
    if (isTracking) {
      // Start tracking accelerometer data when tracking is enabled
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      });
    } else {
      Accelerometer.removeAllListeners();
    }
    return () => Accelerometer.removeAllListeners();
  }, [isTracking]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Check if the current time is within the sleep period
      if (
        startTime &&
        now >= startTime &&
        now <= new Date(startTime.getTime() + sleepGoal * 60 * 60 * 1000)
      ) {
        if (isInactive()) {
          // Increment sleep duration only if the user is inactive
          setSleepDuration((prevDuration) => prevDuration + 1 / 60); // Track in hours (increment by 1 minute every tick)
        }
      } else {
        // Stop tracking after the sleep period ends
        setIsTracking(false);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [startTime, sleepGoal, isTracking]);

  // Helper function to detect low movement (e.g., user is inactive or asleep)
  const isInactive = () => {
    const { x, y, z } = data;
    return Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(z) < 0.02;
  };

  const startSleepTracking = () => {
    setStartTime(new Date()); // Sets the current time as the start of sleep
    setIsTracking(true);
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={20} color={colors.icon} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: colors.text }]}>
                Sleep Tracker
              </Text>
              <TouchableOpacity onPress={openBottomSheet}>
                <AntDesign name="calendar" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.trackerContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <View style={styles.circleContainer}>
                <Svg width={size} height={size}>
                  <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#ffffff"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#eaeaeb"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDashoffset={170}
                      fill="none"
                    />
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#b50101"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      fill="none"
                    />
                  </G>
                </Svg>
                <View style={styles.sleepTextContainer}>
                  <Text style={[styles.sleepText, { color: colors.text }]}>
                    {sleepDuration.toFixed(2)} hours
                  </Text>
                  <Text style={{ color: colors.text }}>of</Text>
                  <TouchableOpacity onPress={openBottomSheet}>
                    <Text style={{ color: colors.text }}>Edit Goal</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                title="Start Sleep Tracking"
                onPress={startSleepTracking}
              />
            </View>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default PlanSleep;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#acacac47",
    paddingBottom: 3,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    marginVertical: 16,
  },
  trackerContainer: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 25,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sleepTextContainer: {
    position: "absolute",
    alignItems: "center",
  },
  sleepText: {
    fontSize: 44,
    fontWeight: "500",
  },
});
