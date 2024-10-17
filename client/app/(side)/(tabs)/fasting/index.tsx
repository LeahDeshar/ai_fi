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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import WeeklyStatsComponent from "@/components/WeeklyStatsComponent";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import moment from "moment";
import { Button, IconButton } from "react-native-paper";
import Arc from "@/components/Arc";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const FastingScreen = () => {
  const { colors, dark } = useTheme();
  const bottomSheetRef = useRef(null);
  const [selectedReading, setSelectedReading] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const snapPoints = useMemo(() => ["85%"], []);
  const [selectedReadingIndex, setSelectedReadingIndex] = useState(0);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const fastingDetails = [
    {
      title: "Welcome to fasting",
      image:
        "https://www.raowellness.com/wp-content/uploads/Intermittent-Fasting.jpg",
      readTime: "3",
      pages: [
        {
          title: "Welcome To Fasting",
          description:
            "Fasting is your key to effective weight loss without the hassle of counting every calorie.Let us guide you step-by-step through all the fundamentals",
          image:
            "https://opt.toiimg.com/recuperator/img/toi/m-63299283/63299283.jpg&width=500&resizemode=4",
        },
        {
          title: "How it works",
          description:
            "Learn the basics of intermittent fasting and how it can help you lose weight and improve your health.",

          image:
            "https://static.oprah.com/2018/08/201808-orig-intermittent-fasting-949x534.jpg",
        },
        {
          title: "Building a fasting habit",
          description:
            "Learn how to build a fasting habit that works for you and fits your lifestyle.",
          image:
            "https://cdn.prod.website-files.com/5f64a4eb5a48d21969aa774a/5fa6a3022f679e25a91d4702_image7.png",
        },
        {
          title: "What to eat before fasting?",
          description:
            "Your pre-fast meal choices can make or break whole fasting experience",
          image:
            "https://www.foodpoisoningnews.com/wp-content/uploads/2024/09/useful-cut-vegetables-on-a-plate-in-the-form-of-heart-on-wooden-table-top-view-stockpack-deposit-photos-1536x1024.jpg",
        },
        {
          title: "Is it ok to work out while fasting?",
          description:
            "Sure! Combine fasting with your favorite workouts to burn fat more efficiently.",

          image:
            "https://static01.nyt.com/images/2022/12/27/well/15SCAM-STRETCHING/15SCAM-STRETCHING-superJumbo.jpg",
        },
      ],
    },
    {
      title: "Master Your First Fast",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-intermittent-fasting-illustration_52683-141818.jpg",
      readTime: "3",
      pages: [
        {
          title: "Welcome To Fasting",
          description:
            "Fasting is your key to effective weight loss without the hassle of counting every calorie.Let us guide you step-by-step through all the fundamentals",
          image:
            "https://opt.toiimg.com/recuperator/img/toi/m-63299283/63299283.jpg&width=500&resizemode=4",
        },
        {
          title: "How it works",
          description:
            "Learn the basics of intermittent fasting and how it can help you lose weight and improve your health.",

          image:
            "https://static.oprah.com/2018/08/201808-orig-intermittent-fasting-949x534.jpg",
        },
        {
          title: "Building a fasting habit",
          description:
            "Learn how to build a fasting habit that works for you and fits your lifestyle.",
          image:
            "https://cdn.prod.website-files.com/5f64a4eb5a48d21969aa774a/5fa6a3022f679e25a91d4702_image7.png",
        },
        {
          title: "What to eat before fasting?",
          description:
            "Your pre-fast meal choices can make or break whole fasting experience",
          image:
            "https://www.foodpoisoningnews.com/wp-content/uploads/2024/09/useful-cut-vegetables-on-a-plate-in-the-form-of-heart-on-wooden-table-top-view-stockpack-deposit-photos-1536x1024.jpg",
        },
        {
          title: "Is it ok to work out while fasting?",
          description:
            "Sure! Combine fasting with your favorite workouts to burn fat more efficiently.",

          image:
            "https://static01.nyt.com/images/2022/12/27/well/15SCAM-STRETCHING/15SCAM-STRETCHING-superJumbo.jpg",
        },
      ],
    },
    {
      title: "What is intermittent fasting?",
      image:
        "https://media.istockphoto.com/id/1335324665/vector/woman-eating-salad-after-fasting-intermittent-fasting.jpg?s=612x612&w=0&k=20&c=L3AiK13kZd3j1W5h68lpE4w72uiOr_RXcQ8pqS-Zx7w=",
      readTime: "3",
      pages: [
        {
          title: "Welcome To Fasting",
          description:
            "Fasting is your key to effective weight loss without the hassle of counting every calorie.Let us guide you step-by-step through all the fundamentals",
          image:
            "https://opt.toiimg.com/recuperator/img/toi/m-63299283/63299283.jpg&width=500&resizemode=4",
        },
        {
          title: "How it works",
          description:
            "Learn the basics of intermittent fasting and how it can help you lose weight and improve your health.",

          image:
            "https://static.oprah.com/2018/08/201808-orig-intermittent-fasting-949x534.jpg",
        },
        {
          title: "Building a fasting habit",
          description:
            "Learn how to build a fasting habit that works for you and fits your lifestyle.",
          image:
            "https://cdn.prod.website-files.com/5f64a4eb5a48d21969aa774a/5fa6a3022f679e25a91d4702_image7.png",
        },
        {
          title: "What to eat before fasting?",
          description:
            "Your pre-fast meal choices can make or break whole fasting experience",
          image:
            "https://www.foodpoisoningnews.com/wp-content/uploads/2024/09/useful-cut-vegetables-on-a-plate-in-the-form-of-heart-on-wooden-table-top-view-stockpack-deposit-photos-1536x1024.jpg",
        },
        {
          title: "Is it ok to work out while fasting?",
          description:
            "Sure! Combine fasting with your favorite workouts to burn fat more efficiently.",

          image:
            "https://static01.nyt.com/images/2022/12/27/well/15SCAM-STRETCHING/15SCAM-STRETCHING-superJumbo.jpg",
        },
      ],
    },
    {
      title: "Intermittent fasting vs calorie restriction",
      image:
        "https://thumbs.dreamstime.com/b/dietary-trends-flat-vector-illustration-intermittent-fasting-concept-person-incorporating-time-restricted-eating-focus-316626989.jpg",
      readTime: "3",
      pages: [
        {
          title: "Welcome To Fasting",
          description:
            "Fasting is your key to effective weight loss without the hassle of counting every calorie.Let us guide you step-by-step through all the fundamentals",
          image:
            "https://opt.toiimg.com/recuperator/img/toi/m-63299283/63299283.jpg&width=500&resizemode=4",
        },
        {
          title: "How it works",
          description:
            "Learn the basics of intermittent fasting and how it can help you lose weight and improve your health.",

          image:
            "https://static.oprah.com/2018/08/201808-orig-intermittent-fasting-949x534.jpg",
        },
        {
          title: "Building a fasting habit",
          description:
            "Learn how to build a fasting habit that works for you and fits your lifestyle.",
          image:
            "https://cdn.prod.website-files.com/5f64a4eb5a48d21969aa774a/5fa6a3022f679e25a91d4702_image7.png",
        },
        {
          title: "What to eat before fasting?",
          description:
            "Your pre-fast meal choices can make or break whole fasting experience",
          image:
            "https://www.foodpoisoningnews.com/wp-content/uploads/2024/09/useful-cut-vegetables-on-a-plate-in-the-form-of-heart-on-wooden-table-top-view-stockpack-deposit-photos-1536x1024.jpg",
        },
        {
          title: "Is it ok to work out while fasting?",
          description:
            "Sure! Combine fasting with your favorite workouts to burn fat more efficiently.",

          image:
            "https://static01.nyt.com/images/2022/12/27/well/15SCAM-STRETCHING/15SCAM-STRETCHING-superJumbo.jpg",
        },
      ],
    },
  ];
  // const handleNextPress = () => {
  //   if (selectedReadingIndex + 1 < fastingDetails.length) {
  //     setSelectedReadingIndex((prevIndex) => prevIndex + 1);
  //   } else {
  //     bottomSheetRef.current?.close();
  //     setSelectedReadingIndex(0);
  //   }
  // };
  const handleNextPress = () => {
    if (
      selectedPageIndex + 1 <
      fastingDetails[selectedReadingIndex]?.pages.length
    ) {
      setSelectedPageIndex(selectedPageIndex + 1);
    } else if (selectedReadingIndex + 1 < fastingDetails.length) {
      setSelectedReadingIndex(selectedReadingIndex + 1);
      setSelectedPageIndex(0); // Reset to the first page of the next fasting detail
    } else {
      bottomSheetRef.current?.close(); // Close the BottomSheet if at the last page
    }
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
  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close();
    setSelectedReadingIndex(0);
  };

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
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          {/* max = 77 */}
          <Arc progress={1} />
        </View>
        <WeeklyStatsComponent />
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: "#f5f5f5",
            paddingVertical: 10,
            paddingBottom: 80,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 20,
              marginLeft: 5,
              marginBottom: 5,
            }}
          >
            Read about fasting
          </Text>

          {fastingDetails.map((detail, index) => (
            <FastingReading
              key={index}
              detail={detail}
              colors={colors}
              dark={dark}
              onPress={() => handlePresentBottomSheet(detail)}
            />
          ))}
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: "#eaeaea" }}
        handleIndicatorStyle={{
          display: "none",
        }}
        handleStyle={{
          display: "none",
        }}
      >
        <View style={{}}>
          <Image
            source={{
              uri: fastingDetails[selectedReadingIndex]?.pages[
                selectedReadingIndex
              ]?.image,
            }}
            style={{
              width: "100%",
              height: 300,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,

              marginBottom: 10,
            }}
          />

          <View
            style={{
              position: "absolute",
              width: "100%",
            }}
          >
            <LinearGradient
              colors={["#0000007c", "transparent"]}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                height: 80,
                width: "100%",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              {/* {fastingDetails.map((details, index) =>
                details?.pages.map((page, index) => (
                  <View
                    key={index}
                    style={{
                      height: selectedReadingIndex == index ? 3 : 2,
                      width: selectedReadingIndex == index ? 18 : 8,
                      backgroundColor:
                        selectedReadingIndex == index ? "white" : "#ffffffab",
                      marginHorizontal: 4,
                      borderRadius: 5,
                    }}
                  />
                ))
              )} */}
              {fastingDetails[selectedReadingIndex]?.pages.map((_, index) => (
                <View
                  key={index}
                  style={{
                    height: selectedPageIndex === index ? 3 : 2,
                    width: selectedPageIndex === index ? 18 : 8,
                    backgroundColor:
                      selectedPageIndex === index ? "white" : "#ffffffab",
                    marginHorizontal: 4,
                    borderRadius: 5,
                    transition:
                      "width 0.3s ease-in-out, height 0.3s ease-in-out", // for smoother transition
                  }}
                />
              ))}
            </View>
            <TouchableOpacity
              onPress={handleBottomSheetClose}
              style={{
                position: "absolute",
                top: 8,
                right: 10,
              }}
            >
              <Ionicons name="close" color={"white"} size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {fastingDetails[selectedReadingIndex]?.title}
            </Text>
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 16,
                color: "#454545",
                width: "90%",
                lineHeight: 22,
              }}
            >
              {fastingDetails[selectedReadingIndex]?.description ||
                "Detailed information about fasting goes here."}
            </Text>
            <TouchableOpacity
              onPress={handleNextPress}
              style={{
                backgroundColor: "#da0d0d",
                padding: 10,
                borderRadius: 15,
                marginTop: 30,

                width: "80%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {selectedReadingIndex === 0 ? " Getting Started" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

function FastingReading({ colors, dark, detail, onPress }) {
  console.log(detail.title);
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 15,
          marginTop: 15,
          flexDirection: "row",
          alignItems: "center",
          // position: "absolute",
        }}
      >
        <Image
          source={{ uri: detail?.image }}
          style={{ width: 70, height: 70, borderRadius: 15 }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "bold" }}
            >
              {detail.title}
            </Text>
            <Text style={styles.subText}>3 min read</Text>
          </View>
          <AntDesign
            name="right"
            color={dark ? "#a5a5a5" : "#838383"}
            size={18}
          />
        </View>
      </TouchableOpacity>
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
    color: "#838383",
    fontSize: 14,
    marginTop: 5,
  },
  bottomSheetContent: {
    // flex: 1,
    // alignItems: "center",
    // padding: 20,
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
