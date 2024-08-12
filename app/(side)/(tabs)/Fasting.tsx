import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { format } from "date-fns";
import { Button, IconButton } from "react-native-paper";
import moment from "moment";
import WeeklyStatsComponent from "@/components/WeeklyStatsComponent";

const Fasting = () => {
  const { colors, dark } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <FastingTimer />
        <WeeklyStatsComponent />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 5,
            }}
          >
            Read about fasting
          </Text>
          <FastingReading colors={colors} dark={dark} />
          <FastingReading colors={colors} dark={dark} />
          <FastingReading colors={colors} dark={dark} />
          <FastingReading colors={colors} dark={dark} />
          <FastingReading colors={colors} dark={dark} />
          <FastingReading colors={colors} dark={dark} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fasting;

function FastingReading({ colors, dark }) {
  const navigation = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FastingReadDetails");
      }}
      style={{
        backgroundColor: colors.opacity,
        padding: 10,
        borderRadius: 15,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/fasting/f1.jpg")}
        style={{ width: 70, height: 70, borderRadius: 15 }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginLeft: 15,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Welcome to fasting
          </Text>
          <Text
            style={{
              color: "#b6b4b4",
              fontSize: 14,
              marginTop: 5,
            }}
          >
            3 min read
          </Text>
        </View>
        <View>
          <AntDesign
            name="right"
            color={dark ? "#a5a5a5" : "black"}
            size={18}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#3b5998",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressCircle: {
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timeContainer: {
    position: "absolute",
    top: "45%",
    left: "25%",
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 16,
    color: "#777",
  },
  timeValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  timeSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  timeBlock: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 16,
    color: "#777",
  },
  startButton: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

// const FastingTimer = () => {
//   const [timeLeft, setTimeLeft] = useState(15780000); // 4 hours 23 mins in ms
//   const [startTime] = useState(new Date());
//   const [goalTime] = useState(new Date(startTime.getTime() + timeLeft));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => (prev > 1000 ? prev - 1000 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (time: number) => {
//     const hours = Math.floor(time / 3600000);
//     const minutes = Math.floor((time % 3600000) / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handleEndFasting = () => {
//     Alert.alert("Fasting Ended", "Your fasting session has ended.");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressCircleContainer}>
//         <AnimatedCircularProgress
//           size={200}
//           width={8}
//           fill={(timeLeft / (4 * 60 * 60 * 1000)) * 100}
//           tintColor="#00e0ff"
//           backgroundColor="#3d5875"
//         >
//           {(fill) => (
//             <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
//           )}
//         </AnimatedCircularProgress>
//       </View>
//       <View style={styles.timeContainer}>
//         <View style={styles.timeBox}>
//           <Text>{format(startTime, "h:mm a")}</Text>
//           <Text>Start, today</Text>
//         </View>
//         <View style={styles.timeBox}>
//           <Text>{format(goalTime, "h:mm a")}</Text>
//           <Text>Goal, tomorrow</Text>
//         </View>
//       </View>
//       <Button title="End Fasting" onPress={handleEndFasting} />
//     </View>
//   );
// };

// const FastingTimer = () => {
//   const fastingStart = moment("18:00", "HH:mm");
//   const fastingEnd = fastingStart.clone().add(16, "hours");
//   const fastingDuration = 16 * 60 * 60 * 1000;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Fasting</Text>
//       <View style={styles.circleContainer}>
//         <AnimatedCircularProgress
//           size={200}
//           width={10}
//           rotation={180}
//           fill={1}
//           tintColor="#ff6347"
//           backgroundColor="#d3d3d3"
//         />
//         <View style={styles.timeContainer}>
//           <Text style={styles.timeLabel}>Fasting starts at:</Text>
//           <Text style={styles.timeValue}>{fastingStart.format("h:mm A")}</Text>
//         </View>
//       </View>
//       <View style={styles.timeSection}>
//         <View style={styles.timeBlock}>
//           <IconButton icon="pencil" size={20} />
//           <Text style={styles.timeText}>{fastingStart.format("h:mm A")}</Text>
//           <Text style={styles.labelText}>Start</Text>
//         </View>
//         <View style={styles.timeBlock}>
//           <Text style={styles.timeText}>{fastingEnd.format("h:mm A")}</Text>
//           <Text style={styles.labelText}>Goal</Text>
//         </View>
//       </View>
//       <Button mode="contained" style={styles.startButton}>
//         Start Fasting
//       </Button>
//     </View>
//   );
// };
const FastingTimer = () => {
  const fastingStart = moment("18:00", "HH:mm");
  const fastingEnd = fastingStart.clone().add(16, "hours");
  const fastingDuration = 16 * 60 * 60 * 1000;

  const [progress, setProgress] = useState(0);
  const [isFasting, setIsFasting] = useState(false);

  useEffect(() => {
    let interval;
    if (isFasting) {
      interval = setInterval(() => {
        const now = moment();
        const elapsed = now.diff(fastingStart);
        const progress = Math.min((elapsed / fastingDuration) * 100, 100);
        setProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFasting]);

  const startFasting = () => {
    setIsFasting(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fasting</Text>
      <View style={styles.circleContainer}>
        <AnimatedCircularProgress
          size={200}
          width={10}
          rotation={180}
          fill={progress}
          tintColor="#ff6347"
          backgroundColor="#d3d3d3"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Fasting starts at:</Text>
          <Text style={styles.timeValue}>{fastingStart.format("h:mm A")}</Text>
        </View>
      </View>
      <View style={styles.timeSection}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{fastingStart.format("h:mm A")}</Text>
          <Text style={styles.labelText}>Start</Text>
        </View>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{fastingEnd.format("h:mm A")}</Text>
          <Text style={styles.labelText}>Goal</Text>
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.startButton}
        onPress={startFasting}
      >
        Start Fasting
      </Button>
    </View>
  );
};
