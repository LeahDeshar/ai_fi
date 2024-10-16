import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import WeeklyStatsComponent from "@/components/WeeklyStatsComponent";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";
import { Button, IconButton } from "react-native-paper";
import Arc from "@/components/Arc";
import BottomSheet from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
const FastingScreen = () => {
  const { colors, dark } = useTheme();
  const bottomSheetRef = useRef(null);
  const [selectedReading, setSelectedReading] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const snapPoints = useMemo(() => ["92%"], []);
  const [selectedReadingIndex, setSelectedReadingIndex] = useState(0);
  const fastingDetails = [
    {
      title: "Welcome To Fasting",
      description:
        "Fasting is your key to effective weight loss without the hassle of counting every calorie.Let us guide you step-by-step through all the fundamentals",
      image: "",
    },
    {
      title: "Intermediate Fasting",
      description: "Details about intermediate fasting techniques.",
    },
    {
      title: "Advanced Fasting",
      description: "Strategies for advanced fasting routines.",
    },
  ];
  const handleNextPress = () => {
    // Move to the next item in the list, or loop back to the first item
    console.log(selectedReadingIndex);
    setSelectedReadingIndex((prevIndex) =>
      prevIndex + 1 < fastingDetails.length ? prevIndex + 1 : 0
    );
  };

  const handlePresentBottomSheet = useCallback((reading) => {
    setSelectedReading(reading);

    setIsBottomSheetOpen(true);
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, 50);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    }
  }, []);

  const renderBackdrop = (props) => (
    <View
      style={[
        { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
        { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Customize your backdrop color and opacity here
      ]}
    />
  );
  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginVertical: 50,
          }}
        >
          {/* max = 77 */}
          <Arc progress={1} />
        </View>

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

          {[
            "Welcome to fasting",
            "Intermediate fasting",
            "Advanced fasting",
          ].map((title, index) => (
            <FastingReading
              key={index}
              title={title}
              colors={colors}
              dark={dark}
              onPress={() => handlePresentBottomSheet(title)}
            />
          ))}
        </View>
      </ScrollView>
      {isBottomSheetOpen && (
        <BlurView style={StyleSheet.absoluteFill} intensity={dark ? 95 : 60} />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "transparent" }}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        animateOnMount={selectedReading ? true : false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {fastingDetails.map((_, index) => (
            <View
              key={index}
              style={{
                height: 2,
                width: selectedReadingIndex == index ? 18 : 8,
                backgroundColor:
                  selectedReadingIndex == index ? "white" : "#ffffffab",
                marginHorizontal: 4,
                borderRadius: 5,
              }}
            />
          ))}
        </View>

        <View style={styles.bottomSheetContent}>
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
            {fastingDetails[selectedReadingIndex]?.title || "Fasting Details"}
          </Text>
          <Text style={{ color: colors.text, marginTop: 10 }}>
            {fastingDetails[selectedReadingIndex]?.description ||
              "Detailed information about fasting goes here."}
          </Text>
          <TouchableOpacity onPress={handleNextPress}>
            <Text
              style={{
                color: colors.text,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              {selectedReadingIndex === 0 ? " Getting Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

function FastingReading({ colors, dark, title, onPress }) {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.opacity,
          padding: 10,
          borderRadius: 15,
          marginTop: 15,
          flexDirection: "row",
          alignItems: "center",
          // position: "absolute",
        }}
      >
        <Image
          source={require("@/assets/fasting/f1.jpg")}
          style={{ width: 70, height: 70, borderRadius: 15 }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
            >
              {title}
            </Text>
            <Text style={styles.subText}>3 min read</Text>
          </View>
          <AntDesign
            name="right"
            color={dark ? "#a5a5a5" : "black"}
            size={18}
          />
        </View>
      </TouchableOpacity>

      {/* Bottom Sheet Component */}
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Keeps the sheet hidden initially
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
      >
        <View style={styles.bottomSheetContent}>
          <Text
            style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
          >
            Fasting Details
          </Text>
          <Text style={{ color: colors.text, marginTop: 10 }}>
            Detailed information about fasting goes here.
          </Text>
        </View>
      </BottomSheet> */}
    </>
  );
}
const FastingTimer = () => {
  const fastingStart = moment("18:00", "HH:mm");
  const fastingEnd = fastingStart.clone().add(16, "hours");
  const fastingDuration = 16 * 60 * 60 * 1000;

  const [progress, setProgress] = useState(30);
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

export default FastingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 15,
  },
  subText: {
    color: "#b6b4b4",
    fontSize: 14,
    marginTop: 5,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

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
// function FastingReading({ colors, dark }) {
//   const navigation = useRouter();
//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate("FastingReadDetails");
//       }}
//       style={{
//         backgroundColor: colors.opacity,
//         padding: 10,
//         borderRadius: 15,
//         marginTop: 15,
//         flexDirection: "row",
//         alignItems: "center",
//       }}
//     >
//       <Image
//         source={require("@/assets/fasting/f1.jpg")}
//         style={{ width: 70, height: 70, borderRadius: 15 }}
//       />
//       <View
//         style={{
//           flex: 1,
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             marginLeft: 15,
//           }}
//         >
//           <Text
//             style={{
//               color: colors.text,
//               fontSize: 16,
//               fontWeight: "bold",
//             }}
//           >
//             Welcome to fasting
//           </Text>
//           <Text
//             style={{
//               color: "#b6b4b4",
//               fontSize: 14,
//               marginTop: 5,
//             }}
//           >
//             3 min read
//           </Text>
//         </View>
//         <View>
//           <AntDesign
//             name="right"
//             color={dark ? "#a5a5a5" : "black"}
//             size={18}
//           />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }
