// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   Button,
//   FlatList,
// } from "react-native";
// import {
//   BottomSheetModal,
//   BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import Svg, { Circle, G } from "react-native-svg";
// import { Accelerometer } from "expo-sensors";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { useNavigation } from "expo-router";
// import { useTheme } from "@/constants/ThemeProvider";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const PlanSleep = () => {
//   const { colors } = useTheme();
//   const navigation = useNavigation();
//   const bottomSheetRef = useRef(null);

//   const [isTracking, setIsTracking] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [sleepGoal, setSleepGoal] = useState(8);
//   const [sleepDuration, setSleepDuration] = useState(0);
//   const [sleepStage, setSleepStage] = useState("Light Sleep");
//   const [sleepHistory, setSleepHistory] = useState([
//     { date: "11/10/2024", duration: 6 },
//     { date: "11/09/2024", duration: 7.5 },
//     { date: "11/08/2024", duration: 8 },
//   ]);

//   const size = 185;
//   const strokeWidth = 8;
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset =
//     circumference - circumference * (sleepDuration / sleepGoal);

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.present();
//   };

//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//           <View>
//             {/* Header */}
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

//             {/* Sleep Tracker Circle */}
//             <View style={styles.trackerContainer}>
//               <View style={styles.circleContainer}>
//                 <Svg width={size} height={size}>
//                   <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
//                     <Circle
//                       cx={size / 2}
//                       cy={size / 2}
//                       r={radius}
//                       stroke="#eaeaeb"
//                       strokeWidth={strokeWidth}
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
//                     {sleepDuration.toFixed(2)} hrs
//                   </Text>
//                   <Text style={{ color: colors.text }}>
//                     of {sleepGoal} hrs goal
//                   </Text>
//                   <TouchableOpacity onPress={openBottomSheet}>
//                     <Text style={{ color: colors.text }}>Edit Goal</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* Toggle Tracking Button */}
//               <View style={styles.buttonContainer}>
//                 <Button
//                   title={isTracking ? "Stop Tracking" : "Start Tracking"}
//                   color={isTracking ? "red" : "green"}
//                 />
//               </View>
//             </View>

//             {/* Sleep History List */}
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

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Vibration,
  SafeAreaView,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import Svg, { G, Circle } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";

const PlanSleep = () => {
  const { colors } = useTheme();
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleepHistory, setSleepHistory] = useState([
    { date: "11/10/2024", duration: 6 },
    { date: "11/09/2024", duration: 7.5 },
    { date: "11/08/2024", duration: 8 },
  ]);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const handleToggleTracking = () => {
    if (isTracking) {
      // Stop tracking
      const endTime = new Date();
      const duration = (endTime - startTime) / 3600000; // Convert ms to hours
      setSleepDuration(duration);
      setSleepHistory((prev) => [
        ...prev,
        { date: new Date().toLocaleDateString(), duration },
      ]);
      Accelerometer.removeAllListeners();
    } else {
      // Start tracking
      setStartTime(new Date());
      Accelerometer.setUpdateInterval(1000);
      Accelerometer.addListener((data) => setAccelerometerData(data));
    }
    setIsTracking(!isTracking);
  };

  useEffect(() => {
    if (isTracking) {
      const { x, y, z } = accelerometerData;
      const movement = Math.sqrt(x * x + y * y + z * z);

      if (movement < 1.02) {
        console.log("User is likely sleeping");
      } else {
        console.log("User is active");
      }
    }
  }, [accelerometerData]);

  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * sleepDuration) / 8;

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 16,
              }}
            >
              <TouchableOpacity>
                <AntDesign name="arrowleft" size={20} color={colors.icon} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, color: colors.text }}>
                Sleep Tracker
              </Text>
              <TouchableOpacity>
                <AntDesign name="calendar" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginVertical: 20 }}>
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
              <View
                style={{ position: "absolute", alignItems: "center", top: 80 }}
              >
                <Text style={{ fontSize: 24, color: colors.text }}>
                  {sleepDuration.toFixed(2)}
                </Text>
                <Text style={{ color: colors.text }}>of 8 hrs goal</Text>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                title={isTracking ? "Stop Tracking" : "Start Tracking"}
                color={isTracking ? "red" : "green"}
                onPress={handleToggleTracking}
              />
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: colors.text }}>
                Sleep History
              </Text>
              <FlatList
                data={sleepHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 8,
                    }}
                  >
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

export default PlanSleep;
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
