import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Pedometer } from "expo-sensors";
import { Calendar } from "react-native-calendars";
import { Accelerometer } from "expo-sensors";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Button } from "react-native";
import { Circle, G, Rect, Svg } from "react-native-svg";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { useDispatch } from "react-redux";
import { setSavedSteps } from "@/redux/slices/profileSlice";
const PlanSteps = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  const [selectedDate, setSelectedDate] = useState(null);
  // const progress = 1;
  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // const strokeDashoffset = circumference - (circumference * progress) / 100;

  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimeStamp, setLastTimeStamp] = useState(0);

  const { savedSteps } = useSelector((state) => state.profile);
  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  const [selectedDailyStep, setSelectedSteps] = useState(0);
  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setSelectedSteps(profile.profileOfUsers.dailySteps);
    }
  }, [profile]);

  const progress = (steps / selectedDailyStep) * 100;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  const dispatch = useDispatch();
  useEffect(() => {
    let subscription;

    const startAccelerometer = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      if (!isAvailable) {
        alert("Accelerometer is not available on this device");
        return;
      }

      subscription = Accelerometer.addListener((accelerometer) => {
        const { y } = accelerometer;
        const threshold = 0.1;
        const timeStamp = Date.now();

        if (
          Math.abs(y - lastY) > threshold &&
          !isCounting &&
          timeStamp - lastTimeStamp > 800
        ) {
          setIsCounting(true);
          setLastY(y);
          setLastTimeStamp(timeStamp);
          setSteps((prev) => prev + 1 + savedSteps);

          dispatch(setSavedSteps(steps));

          setTimeout(() => setIsCounting(false), 3200);
        }
      });
    };

    startAccelerometer();

    return () => subscription && subscription.remove();
  }, [lastY, lastTimeStamp, isCounting]);

  const resetSteps = () => setSteps(0);

  const birthDate = new Date(profile?.profileOfUsers.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  const height = profile?.profileOfUsers.currentWeight.kilograms;
  const weight = profile.profileOfUsers.currentHeight.centimeters;
  const gender = profile.profileOfUsers.gender;

  const MET_WALKING = 3.5;

  const strideLength =
    gender === "Male" ? (height * 0.415) / 100 : (height * 0.413) / 100;

  const distance = (steps * strideLength) / 1000;

  const walkingSpeed = 5; // km/h
  const time = distance / walkingSpeed;

  const caloriesBurned = MET_WALKING * weight * time;

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                borderBottomColor: "#acacac47",
                paddingBottom: 3,
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="arrowleft" size={20} color={colors.icon} />
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20,
                  fontWeight: "semibold",
                  textAlign: "center",
                  marginVertical: 16,
                }}
              >
                Step Tracker
              </Text>
              <TouchableOpacity onPress={openBottomSheet}>
                <AntDesign name="calendar" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: colors.background,
                paddingVertical: 25,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                      // strokeDasharray={circumference}
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
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 44,
                      fontWeight: 500,
                    }}
                  >
                    {steps}
                  </Text>
                  <Text style={{}}>of {selectedDailyStep} steps</Text>
                  <TouchableOpacity>
                    <Text style={{}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginHorizontal: 15,
                gap: 10,
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#dcdcdc93",
                paddingBottom: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#c0c0c095",
                  borderRadius: 15,
                  flex: 1,
                  padding: 20,
                }}
              >
                <FontAwesome5 name="fire" size={20} color="black" />
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 9,
                    fontWeight: "bold",
                  }}
                >
                  {caloriesBurned.toFixed(2)} kcal
                </Text>
                <Text>Calories</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 20,

                  backgroundColor: "#c0c0c095",

                  borderRadius: 15,
                }}
              >
                <FontAwesome6 name="person-running" size={20} color="black" />
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 9,
                    fontWeight: "bold",
                  }}
                >
                  {distance.toFixed(2)} km
                </Text>
                <Text>Distance</Text>
              </View>
            </View>

            <WeeklyStatsComponent selectedDailyStep={selectedDailyStep} />
          </View>

          <BottomSheetModal
            snapPoints={["20%", "50%"]}
            ref={bottomSheetRef}
            index={1}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={() => <View />}
          >
            <View
              style={{
                marginTop: 15,
              }}
            >
              <CalendarPicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </View>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  const renderCustomArrow = (direction) => {
    return <Text style={styles.arrow}>{direction === "left" ? "<" : ">"}</Text>;
  };
  const { colors } = useTheme();

  const today = new Date().toISOString().split("T")[0];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        current={today}
        minDate={"2020-01-01"}
        maxDate={today}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelectedDate(day.dateString);
        }}
        monthFormat={"MMMM yyyy"}
        hideExtraDays={true}
        disableMonthChange={true}
        hideArrows={false}
        renderArrow={renderCustomArrow}
        enableSwipeMonths={true}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        markedDates={{
          [today]: {
            selected: true,
            selectedColor: colors.secondary,
          },
          ...(selectedDate && {
            [selectedDate]: {
              marked: true,
            },
          }),
        }}
        renderHeader={(date) => {
          const header = date.toString("MMMM yyyy");
          return (
            <View style={styles.header}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
          );
        }}
        style={{
          height: 350,
          width: 380,
        }}
        theme={{
          arrowColor: "black",
          textSectionTitleColor: "black",
          selectedDayBackgroundColor: "green",
          selectedDayTextColor: "white",
          todayTextColor: "red",
          dayTextColor: "black",
          textDisabledColor: "gray",
          dotColor: "green",
          selectedDotColor: "red",
          monthTextColor: "black",
          indicatorColor: "black",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

const WeeklyStatsComponent = ({
  stats = [50, 70, 30, 80, 60, 90, 100],
  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  selectedDailyStep,
}) => {
  const barWidth = 10;
  const barSpacing = 43;

  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  return (
    <View
      style={{
        paddingBottom: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          WEEK
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Goal
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "gray",
            }}
          >
            {selectedDailyStep} steps
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#e7e7e7",
          borderRadius: 12,
          marginHorizontal: 20,
          marginTop: 15,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          <Svg height="110" width={`${(barWidth + barSpacing) * days.length}`}>
            {stats.map((value, index) => (
              <G key={index}>
                <Rect
                  x={index * (barWidth + barSpacing) + 15}
                  y={0}
                  width={barWidth}
                  height={100}
                  fill={"#afafafed"}
                  rx={6}
                  ry={6}
                />
                <Rect
                  x={index * (barWidth + barSpacing) + 15}
                  // y={value === 0 ? 10 : 150 - value}
                  y={value === 0 ? 10 : 100 - value}
                  width={barWidth}
                  height={value === 0 ? 100 : value}
                  fill={value === 0 ? "#afafafed" : "#b50101"}
                  rx={6}
                  ry={6}
                />
              </G>
            ))}
          </Svg>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          {days.map((day, index) => (
            <Text
              key={index}
              style={[
                { fontSize: 13, color: "#5b5b5bec" },
                { width: barWidth + barSpacing, textAlign: "center" },
              ]}
            >
              {day}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
export default PlanSteps;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 32,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "gray",
  },
});
