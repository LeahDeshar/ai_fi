import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { useNavigation } from "expo-router";
import {
  useGetDailyConmpQuery,
  useGetMealOfDayQuery,
  useGetProfileQuery,
  useGetUserActivityQuery,
  useGetUserActivityWeekQuery,
  useGetUserInsightQuery,
} from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Svg, Rect, Line, Text as SvgText } from "react-native-svg";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const ActivityInsight = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  const {
    data: insights,
    error: inError,
    isLoading: inIsLoading,
  } = useGetUserInsightQuery();

  const { data: userActivity, refetch: refetchActivity } =
    useGetUserActivityQuery();

  const { data: userWeekActivity, refetch: refetchWeekActivity } =
    useGetUserActivityWeekQuery();

  const {
    data: mealOfDay,
    error: mealError,
    isLoading: isMealError,
  } = useGetMealOfDayQuery();
  const {
    data: daily,
    error: dailyError,
    isLoading: isDailyError,
    refetch: refetchDaily,
  } = useGetDailyConmpQuery();
  console.log(daily, mealOfDay);

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
                Activity Insights
              </Text>
              <TouchableOpacity onPress={openBottomSheet}>
                <AntDesign name="calendar" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <SingleDayActivity
                dark={dark}
                colors={colors}
                activity={userActivity?.activity || {}}
              />
              <NutritionalBreakdown colors={colors} data={daily || {}} />
              <WeeklyActivity
                dark={dark}
                colors={colors}
                activities={userWeekActivity?.activities || []}
              />
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
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
const NutritionalBreakdown = ({ data, colors, dark }) => {
  const screenWidth = Dimensions.get("window").width;

  // Data for the PieChart
  const chartData = [
    {
      name: "Calories",
      value: data.totalCalories,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Carbs",
      value: data.totalCarbs,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Fat",
      value: data.totalFat,
      color: "#FFCE56",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Protein",
      value: data.totalProtein,
      color: "#4BC0C0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: colors.opacity,
        marginHorizontal: 20,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, color: colors.text }}>
        Nutritional Breakdown
      </Text>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"value"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
        absolute
      />
    </View>
  );
};
const SingleDayActivity = ({ activity, colors, dark }) => {
  // Define chart configuration
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: colors.opacity,
    backgroundGradientTo: colors.opacity,
    color: (opacity = 1) =>
      dark ? `rgba(255, 192, 203, 1)` : `rgb(248, 0, 41)`,
    labelColor: (opacity = 1) => colors.text,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  // Data for the bar chart
  const data = {
    labels: ["Steps", "Water", "Calories", "Sleep"],
    datasets: [
      {
        data: [
          activity.dailySteps,
          activity.waterIntake,
          activity.calorieIntake,
          activity.sleepDuration,
        ],
      },
    ],
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          color: colors.text,
        }}
      >
        Today
      </Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={230}
        yAxisSuffix=""
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

const WeeklyActivity = ({ activities, colors, dark }) => {
  const screenWidth = Dimensions.get("window").width;

  const labels = activities.map((activity) => {
    const date = new Date(activity.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const stepsData = activities.map((activity) => activity.dailySteps);
  const waterData = activities.map((activity) => activity.waterIntake);
  const calorieData = activities.map((activity) => activity.calorieIntake);
  const sleepData = activities.map((activity) => activity.sleepDuration);

  const chartConfig = {
    backgroundGradientFrom: colors.opacity,
    backgroundGradientTo: colors.opacity,
    color: (opacity = 1) => (dark ? `rgba(189, 189, 255, 0.399)` : `#3a3a65`),
    labelColor: (opacity = 1) => colors.text,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10, color: colors.text }}>
        Daily Steps
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: stepsData,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Steps"],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16, marginBottom: 25 }}
      />

      {/* Water Intake Chart */}
      <Text style={{ fontSize: 18, marginBottom: 10, color: colors.text }}>
        Water Intake (ml)
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: waterData,
              color: (opacity = 1) => `rgba(66, 194, 244, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Water Intake"],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Calorie Intake Chart */}
      <Text style={{ fontSize: 18, marginBottom: 10, color: colors.text }}>
        Calorie Intake
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: calorieData,
              color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Calories"],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      {/* Sleep Duration Chart */}
      <Text style={{ fontSize: 18, marginBottom: 10, color: colors.text }}>
        Sleep Duration (hours)
      </Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: sleepData,
              color: (opacity = 1) => `rgba(56, 142, 60, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Sleep Duration"],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};
export default ActivityInsight;

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
const styles = StyleSheet.create({});
