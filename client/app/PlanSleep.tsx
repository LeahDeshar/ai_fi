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
//   const [sleepHistory, setSleepHistory] = useState([]);

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
//     console.log("Sleep Duration:", sleepDuration);
//   }, [sleepDuration]);
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
//     console.log("Accelerometer Values:", { x, y, z });
//     return Math.abs(x) < 0.02 && Math.abs(y) < 0.02 && Math.abs(z) < 0.02;
//   };

//   // Start sleep tracking
//   const startSleepTracking = () => {
//     setStartTime(new Date());
//     setIsTracking(true);
//     setSleepDuration(0);
//   };

//   // Stop sleep tracking and save the session
//   const stopSleepTracking = () => {
//     setIsTracking(false);
//     if (sleepDuration > 0) {
//       const session = {
//         date: new Date().toLocaleDateString(),
//         duration: sleepDuration.toFixed(2),
//       };
//       setSleepHistory((prevHistory) => [session, ...prevHistory]);
//     }
//   };

//   // Open bottom sheet for editing goal or history
//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };

//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//           <View>
//             {/* Header with back button, title, and calendar icon */}
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
//                   <Text style={{ color: colors.text }}>
//                     of {sleepGoal} hrs goal
//                   </Text>
//                   <TouchableOpacity onPress={openBottomSheet}>
//                     <Text style={{ color: colors.text }}>Edit Goal</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Control Buttons */}
//               <View style={styles.buttonContainer}>
//                 <Button title="Start Tracking" onPress={startSleepTracking} />
//                 <Button title="Stop Tracking" onPress={stopSleepTracking} />
//               </View>
//             </View>

//             <View style={styles.historyContainer}>
//               <Text style={[styles.historyTitle, { color: colors.text }]}>
//                 Sleep History
//               </Text>
//               <FlatList
//                 data={sleepHistory}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <View style={styles.historyItem}>
//                     <Text style={{ color: colors.text }}>{item.date}</Text>
//                     <Text style={{ color: colors.text }}>
//                       {item.duration} hrs
//                     </Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </View>
//         </SafeAreaView>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// // Styles object

const PlanSleep = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleepStage, setSleepStage] = useState("Light Sleep");
  const [sleepHistory, setSleepHistory] = useState([
    { date: "11/10/2024", duration: 6 },
    { date: "11/09/2024", duration: 7.5 },
    { date: "11/08/2024", duration: 8 },
  ]);

  const inactivityThreshold = 1.1; // Movement threshold
  const inactivityTimeLimit = 5 * 60 * 1000; // 5 minutes of inactivity
  let lastMovementTime = Date.now();
  const [isInactive, setIsInactive] = useState(false);

  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - circumference * (sleepDuration / sleepGoal);

  // useEffect(() => {
  //   if (isTracking) {
  //     setStartTime(new Date());
  //     const interval = setInterval(() => {
  //       setSleepDuration((prev) => prev + 1 / 60); // Mock increment per minute
  //     }, 60000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isTracking]);

  // Mock accelerometer data for inactivity checking

  useEffect(() => {
    if (isTracking) {
      Accelerometer.setUpdateInterval(1000); // 1 second interval

      const subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);

        // Inactivity detection: if movement is below threshold for a period
        if (totalMovement < inactivityThreshold) {
          if (Date.now() - lastMovementTime > inactivityTimeLimit) {
            setIsInactive(true);
          }
        } else {
          lastMovementTime = Date.now();
          setIsInactive(false);
        }

        // Estimate sleep stage based on movement
        if (totalMovement < inactivityThreshold) {
          setSleepStage("Deep Sleep");
        } else if (totalMovement < inactivityThreshold * 2) {
          setSleepStage("Light Sleep");
        } else {
          setSleepStage("Awake");
        }
      });

      return () => subscription.remove();
    }
  }, [isTracking]);

  // Start or stop sleep tracking
  const toggleTracking = () => {
    if (isTracking) {
      // Stop tracking
      setIsTracking(false);
      if (sleepDuration > 0) {
        const session = {
          date: new Date().toLocaleDateString(),
          duration: sleepDuration.toFixed(2),
          stage: sleepStage,
        };
        setSleepHistory((prevHistory) => [session, ...prevHistory]);
      }
    } else {
      // Start tracking
      setSleepStart(new Date());
      setSleepDuration(0);
      setIsTracking(true);
    }
  };

  // Save session data (sleep history)
  const saveSleepSession = () => {
    if (sleepStart) {
      const endTime = new Date();
      const duration = (endTime - sleepStart) / 1000 / 60 / 60; // Duration in hours
      setSleepDuration(duration);
      const session = {
        date: new Date().toLocaleDateString(),
        duration: duration.toFixed(2),
        stage: sleepStage,
      };
      setSleepHistory((prevHistory) => [session, ...prevHistory]);
    }
  };

  const stopTracking = () => {
    if (isTracking) {
      saveSleepSession();
      setIsTracking(false);
    }
  };

  // const toggleTracking = () => {
  //   if (isTracking) {
  //     setIsTracking(false);
  //     if (sleepDuration > 0) {
  //       const session = {
  //         date: new Date().toLocaleDateString(),
  //         duration: sleepDuration.toFixed(2),
  //       };
  //       setSleepHistory((prevHistory) => [session, ...prevHistory]);
  //     }
  //   } else {
  //     setSleepDuration(0);
  //     setIsTracking(true);
  //   }
  // };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View>
            {/* Header */}
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

            {/* Sleep Tracker Circle */}
            <View style={styles.trackerContainer}>
              <View style={styles.circleContainer}>
                <Svg width={size} height={size}>
                  <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#eaeaeb"
                      strokeWidth={strokeWidth}
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
                    {sleepDuration.toFixed(2)} hrs
                  </Text>
                  <Text style={{ color: colors.text }}>
                    of {sleepGoal} hrs goal
                  </Text>
                  <TouchableOpacity onPress={openBottomSheet}>
                    <Text style={{ color: colors.text }}>Edit Goal</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Toggle Tracking Button */}
              <View style={styles.buttonContainer}>
                <Button
                  title={isTracking ? "Stop Tracking" : "Start Tracking"}
                  onPress={toggleTracking}
                  color={isTracking ? "red" : "green"}
                />
              </View>
            </View>

            {/* Sleep History List */}
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

// const PlanSleep = () => {
//   const { colors } = useTheme();
//   const navigation = useNavigation();
//   const bottomSheetRef = useRef(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [sleepStart, setSleepStart] = useState(null);
//   const [sleepDuration, setSleepDuration] = useState(0);
//   const [sleepGoal, setSleepGoal] = useState(8);
//   const [sleepHistory, setSleepHistory] = useState([
//     { date: "11/10/2024", duration: 6, stage: "Light Sleep" },
//     { date: "11/09/2024", duration: 7.5, stage: "Deep Sleep" },
//     { date: "11/08/2024", duration: 8, stage: "Light Sleep" },
//   ]);
//   const [sleepStage, setSleepStage] = useState("Light Sleep");

//   const inactivityThreshold = 1.1; // Movement threshold
//   const inactivityTimeLimit = 5 * 60 * 1000; // 5 minutes of inactivity
//   let lastMovementTime = Date.now();
//   const [isInactive, setIsInactive] = useState(false);

//   const size = 185;
//   const strokeWidth = 8;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset =
//     circumference - circumference * (sleepDuration / sleepGoal);

//   // Handle accelerometer data
//   useEffect(() => {
//     if (isTracking) {
//       Accelerometer.setUpdateInterval(1000); // 1 second interval

//       const subscription = Accelerometer.addListener((accelerometerData) => {
//         const { x, y, z } = accelerometerData;
//         const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);

//         // Inactivity detection: if movement is below threshold for a period
//         if (totalMovement < inactivityThreshold) {
//           if (Date.now() - lastMovementTime > inactivityTimeLimit) {
//             setIsInactive(true);
//           }
//         } else {
//           lastMovementTime = Date.now();
//           setIsInactive(false);
//         }

//         // Estimate sleep stage based on movement
//         if (totalMovement < inactivityThreshold) {
//           setSleepStage("Deep Sleep");
//         } else if (totalMovement < inactivityThreshold * 2) {
//           setSleepStage("Light Sleep");
//         } else {
//           setSleepStage("Awake");
//         }
//       });

//       return () => subscription.remove();
//     }
//   }, [isTracking]);
//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };

//   // Start or stop sleep tracking
//   const toggleTracking = () => {
//     if (isTracking) {
//       // Stop tracking
//       setIsTracking(false);
//       if (sleepDuration > 0) {
//         const session = {
//           date: new Date().toLocaleDateString(),
//           duration: sleepDuration.toFixed(2),
//           stage: sleepStage,
//         };
//         setSleepHistory((prevHistory) => [session, ...prevHistory]);
//       }
//     } else {
//       // Start tracking
//       setSleepStart(new Date());
//       setSleepDuration(0);
//       setIsTracking(true);
//     }
//   };

//   // Save session data (sleep history)
//   const saveSleepSession = () => {
//     if (sleepStart) {
//       const endTime = new Date();
//       const duration = (endTime - sleepStart) / 1000 / 60 / 60; // Duration in hours
//       setSleepDuration(duration);
//       const session = {
//         date: new Date().toLocaleDateString(),
//         duration: duration.toFixed(2),
//         stage: sleepStage,
//       };
//       setSleepHistory((prevHistory) => [session, ...prevHistory]);
//     }
//   };

//   const stopTracking = () => {
//     if (isTracking) {
//       saveSleepSession();
//       setIsTracking(false);
//     }
//   };

//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <AntDesign name="arrowleft" size={20} color={colors.icon} />
//             </TouchableOpacity>
//             <Text style={[styles.title, { color: colors.text }]}>
//               Sleep Tracker
//             </Text>
//             <TouchableOpacity onPress={openBottomSheet}>
//               <AntDesign name="calendar" size={20} color={colors.icon} />
//             </TouchableOpacity>
//           </View>

//           <View
//             style={[
//               styles.trackerContainer,
//               { backgroundColor: colors.background },
//             ]}
//           >
//             <View
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: 50,
//               }}
//             >
//               <Svg width={size} height={size}>
//                 <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
//                   <Circle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke="#eaeaeb"
//                     strokeWidth={strokeWidth}
//                     fill="none"
//                   />
//                   <Circle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke="#b50101"
//                     strokeWidth={strokeWidth}
//                     strokeLinecap="round"
//                     strokeDasharray={circumference}
//                     strokeDashoffset={strokeDashoffset}
//                     fill="none"
//                   />
//                 </G>
//               </Svg>
//               <Text style={{ color: colors.text, fontSize: 18 }}>
//                 {sleepDuration.toFixed(2)} hrs
//               </Text>
//               <Text style={{ color: colors.text }}>
//                 of {sleepGoal} hrs goal
//               </Text>
//             </View>

//             <View
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginVertical: 10,
//               }}
//             >
//               <Text style={{ color: colors.text, fontSize: 16 }}>
//                 Sleep Stage: {sleepStage}
//               </Text>
//             </View>

//             <View style={{ marginTop: 20 }}>
//               <Button
//                 title={isTracking ? "Stop Tracking" : "Start Tracking"}
//                 onPress={toggleTracking}
//                 color={isTracking ? "red" : "green"}
//               />
//             </View>

//             <View style={{ marginTop: 30 }}>
//               <Text style={{ color: colors.text, fontSize: 18 }}>
//                 Sleep History
//               </Text>
//               <FlatList
//                 data={sleepHistory}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       padding: 10,
//                     }}
//                   >
//                     <Text style={{ color: colors.text }}>{item.date}</Text>
//                     <Text style={{ color: colors.text }}>
//                       {item.duration} hrs - {item.stage}
//                     </Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </View>
//         </SafeAreaView>

//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

export default PlanSleep;
// const styles = {
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
//     fontWeight: "bold",
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
//     fontSize: 30,
//     fontWeight: "500",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 20,
//   },
//   historyContainer: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   historyItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 8,
//   },
// };
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
