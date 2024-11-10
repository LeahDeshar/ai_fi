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

// import React, { useState, useEffect, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import {
//   BottomSheetModalProvider,
//   BottomSheetModal,
// } from "@gorhom/bottom-sheet";
// import { Accelerometer } from "expo-sensors";
// import Svg, { G, Circle } from "react-native-svg";
// import { AntDesign } from "@expo/vector-icons";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useTheme } from "@/constants/ThemeProvider";

// const PlanSleep = () => {
//   const { colors } = useTheme();
//   const navigation = useNavigation();
//   const bottomSheetRef = useRef(null);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const [data, setData] = useState({});
//   const [isTracking, setIsTracking] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [sleepGoal, setSleepGoal] = useState(8);
//   const [sleepDuration, setSleepDuration] = useState(0);

//   const size = 185;
//   const strokeWidth = 8;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset =
//     circumference - (circumference * (sleepDuration / sleepGoal)) / 100;

//   useEffect(() => {
//     if (isTracking) {
//       Accelerometer.addListener((accelerometerData) => {
//         setData(accelerometerData);
//       });
//     } else {
//       Accelerometer.removeAllListeners();
//     }
//     return () => Accelerometer.removeAllListeners();
//   }, [isTracking]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();

//       if (
//         startTime &&
//         now >= startTime &&
//         now <= new Date(startTime.getTime() + sleepGoal * 60 * 60 * 1000)
//       ) {
//         if (isInactive()) {
//           setSleepDuration((prevDuration) => prevDuration + 1 / 60);
//         }
//       } else {
//         setIsTracking(false);
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [startTime, sleepGoal, isTracking]);

//   const isInactive = () => {
//     const { x, y, z } = data;
//     return Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(z) < 0.02;
//   };

//   const startSleepTracking = () => {
//     setStartTime(new Date());
//     setIsTracking(true);
//   };

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };

//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//           <View>
//             <View style={styles.header}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <AntDesign name="arrowleft" size={20} color={colors.icon} />
//               </TouchableOpacity>
//               <Text style={[styles.title, { color: colors.text }]}>
//                 Sleep Tracker
//               </Text>
//               <TouchableOpacity onPress={openBottomSheet}>
//                 <AntDesign name="calendar" size={20} color={colors.icon} />
//               </TouchableOpacity>
//             </View>

//             <View
//               style={[
//                 styles.trackerContainer,
//                 { backgroundColor: colors.background },
//               ]}
//             >
//               <View style={styles.circleContainer}>
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
//                 <View style={styles.sleepTextContainer}>
//                   <Text style={[styles.sleepText, { color: colors.text }]}>
//                     {sleepDuration.toFixed(2)} hours
//                   </Text>
//                   <Text style={{ color: colors.text }}>of</Text>
//                   <TouchableOpacity onPress={openBottomSheet}>
//                     <Text style={{ color: colors.text }}>Edit Goal</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <Button
//                 title="Start Sleep Tracking"
//                 onPress={startSleepTracking}
//               />
//             </View>
//           </View>
//         </SafeAreaView>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// export default PlanSleep;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     borderBottomColor: "#acacac47",
//     paddingBottom: 3,
//     borderBottomWidth: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "semibold",
//     textAlign: "center",
//     marginVertical: 16,
//   },
//   trackerContainer: {
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     paddingVertical: 25,
//   },
//   circleContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sleepTextContainer: {
//     position: "absolute",
//     alignItems: "center",
//   },
//   sleepText: {
//     fontSize: 44,
//     fontWeight: "500",
//   },
// });

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Svg, { Circle, G } from "react-native-svg";
import { Accelerometer } from "expo-sensors";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import { useTheme } from "@/constants/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlanSleep = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({});
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleepHistory, setSleepHistory] = useState([]);

  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * (sleepDuration / sleepGoal)) / 100;

  useEffect(() => {
    if (isTracking) {
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      });
    } else {
      Accelerometer.removeAllListeners();
    }
    return () => Accelerometer.removeAllListeners();
  }, [isTracking]);
  //   useEffect(() => {
  //     console.log("Current Accelerometer Data:", data);
  //   }, [data]);

  useEffect(() => {
    console.log("Sleep Duration:", sleepDuration);
  }, [sleepDuration]);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (
        startTime &&
        now >= startTime &&
        now <= new Date(startTime.getTime() + sleepGoal * 60 * 60 * 1000)
      ) {
        if (isInactive()) {
          setSleepDuration((prevDuration) => prevDuration + 1 / 60);
        }
      } else {
        setIsTracking(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [startTime, sleepGoal, isTracking]);

  // Check for inactivity (low accelerometer values)
  const isInactive = () => {
    const { x, y, z } = data;
    console.log("Accelerometer Values:", { x, y, z });
    return Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(z) < 0.02;
  };

  // Start sleep tracking
  const startSleepTracking = () => {
    setStartTime(new Date());
    setIsTracking(true);
    setSleepDuration(0);
  };

  // Stop sleep tracking and save the session
  const stopSleepTracking = () => {
    setIsTracking(false);
    if (sleepDuration > 0) {
      const session = {
        date: new Date().toLocaleDateString(),
        duration: sleepDuration.toFixed(2),
      };
      setSleepHistory((prevHistory) => [session, ...prevHistory]);
    }
  };

  // Open bottom sheet for editing goal or history
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View>
            {/* Header with back button, title, and calendar icon */}
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
                  <Text style={{ color: colors.text }}>
                    of {sleepGoal} hrs goal
                  </Text>
                  <TouchableOpacity onPress={openBottomSheet}>
                    <Text style={{ color: colors.text }}>Edit Goal</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Control Buttons */}
              <View style={styles.buttonContainer}>
                <Button title="Start Tracking" onPress={startSleepTracking} />
                <Button title="Stop Tracking" onPress={stopSleepTracking} />
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={[styles.historyTitle, { color: colors.text }]}>
                Sleep History
              </Text>
              <FlatList
                data={sleepHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <Text style={{ color: colors.text }}>{item.date}</Text>
                    <Text style={{ color: colors.text }}>
                      {item.duration} hrs
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

// Styles object
const styles = {
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
    fontWeight: "bold",
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
    fontSize: 30,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  historyContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
};

export default PlanSleep;
