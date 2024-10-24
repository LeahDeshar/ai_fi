import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Calendar } from "react-native-calendars";
import { Circle, G, Rect, Svg } from "react-native-svg";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";

const meals = [
  {
    title: "Breakfast",
    images: require("@/assets/calorie/1.png"),
    color: "#93de8d",
  },
  {
    title: "Lunch",
    images: require("@/assets/calorie/2.png"),
    color: "#ded78d",
  },
  {
    title: "Dinner",
    images: require("@/assets/calorie/3.png"),
    color: "#de8da8",
  },
  {
    title: "Snacks",
    images: require("@/assets/calorie/4.png"),
    color: "#8dc2de",
  },
];
const PlanLogCalories = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetEditRef = useRef<BottomSheetModal>(null);
  const openEditBottomSheet = () => {
    bottomSheetEditRef.current?.present();
  };
  const progress = 1;
  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  const carbs = 5;
  const fat = 40;
  const protein = 70;

  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  // useEffect(() => {
  //   if (profile && profile.profileOfUsers) {
  //     setSelectedImage(profile?.profileOfUsers?.profilePic?.url);
  //     refetch();
  //   }
  // }, [profile]);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <View
            style={{
              backgroundColor: colors.background,

              paddingBottom: 10,
            }}
          >
            <TrackerHeader
              navigation={navigation}
              colors={colors}
              bottomSheetRef={bottomSheetRef}
            />

            <ScrollView
              style={{
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <View
                style={{
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 25,
                  backgroundColor: colors.background,
                  paddingVertical: 25,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
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
                        stroke="#66BB6A"
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
                      0
                    </Text>
                    <Text style={{}}>
                      of{" "}
                      {
                        profile?.calculations.weightLossDuration.calories
                          .targetCalories
                      }{" "}
                      kcal
                    </Text>
                    <TouchableOpacity onPress={openEditBottomSheet}>
                      <Text style={{}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 25,
                  }}
                >
                  <NutrientProgressBars
                    carbs={carbs}
                    fat={fat}
                    protein={protein}
                  />
                </View>
              </View>
              <View
                style={{
                  // borderTopLeftRadius: 25,
                  // borderTopRightRadius: 25,
                  // backgroundColor: "#f5f5f5",
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginHorizontal: 15,
                    marginBottom: 10,
                    marginTop: 20,
                    marginLeft: 18,
                  }}
                >
                  Daily meals
                </Text>
                {meals?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: colors.background,
                      marginVertical: 5,
                      marginHorizontal: 15,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 35,
                          height: 35,
                          borderRadius: 25,
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 20,
                        }}
                      >
                        <Image
                          source={item.images}
                          style={{
                            width: 32,
                            height: 32,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 500,
                          marginLeft: 10,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: "#66bb6ac6",
                        borderRadius: 25,
                        padding: 8,
                      }}
                    >
                      <Ionicons name="add" color={"#66BB6A"} size={25} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
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
          <BottomSheetModal
            snapPoints={["50%", "80%"]}
            ref={bottomSheetEditRef}
            index={1}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={() => <View />}
          >
            <View
              style={{
                marginTop: 15,
              }}
            >
              <View
                style={{
                  paddingVertical: 15,
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                <Text
                  style={{
                    color: colors.tabIconDefault,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Your Recommended Daily Calorie is{" "}
                  {
                    profile?.calculations.weightLossDuration.calories
                      .startCalories
                  }
                  .
                </Text>
                <Text
                  style={{
                    color: colors.tabIconDefault,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Your Healthy Weight Loss Calorie is{" "}
                  {
                    profile?.calculations.weightLossDuration.calories
                      .targetCalories
                  }{" "}
                  to reduce your weight by 5.0 kgs (11.0 lbs) within{" "}
                  {profile?.calculations.weightLossDuration.months.minMonths} to{" "}
                  {profile?.calculations.weightLossDuration.months.maxMonths}{" "}
                  months
                </Text>
              </View>
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

const TrackerHeader = ({ navigation, colors, bottomSheetRef }) => {
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  return (
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
        Calorie Tracker
      </Text>
      <TouchableOpacity onPress={openBottomSheet}>
        <AntDesign name="calendar" size={20} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
};
const SvgProgressBar = ({ label, percentage, color }) => {
  const barWidth = 90; // Total width of the progress bar
  const barHeight = 3; // Height of the progress bar

  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 15,
        width: "32%",
      }}
    >
      <Text
        style={{
          width: 60,
          fontSize: 14,
          fontWeight: 600,
          marginRight: 10,
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {label}
      </Text>
      <Svg width={barWidth} height={barHeight} style={styles.svg}>
        <Rect
          x="0"
          y="0"
          width={barWidth}
          height={barHeight}
          fill="#E0E0E0"
          rx={5}
          ry={5}
        />
        <Rect
          x="0"
          y="0"
          width={(percentage / 100) * barWidth}
          height={barHeight}
          fill={color}
          rx={5}
          ry={5}
        />
      </Svg>
      <Text style={styles.percentageText}>{percentage} g</Text>
    </View>
  );
};
const NutrientProgressBars = ({ carbs, fat, protein }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <SvgProgressBar label="Carbs" percentage={carbs} color="#66BB6A" />
      <SvgProgressBar label="Fat" percentage={fat} color="#66BB6A" />
      <SvgProgressBar label="Protein" percentage={protein} color="#66BB6A" />
    </View>
  );
};
export default PlanLogCalories;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {},
  label: {},
  svg: {
    marginRight: 10,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 3,
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
});
