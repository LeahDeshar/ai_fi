import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  ListRenderItemInfo,
  ViewStyle,
  FlatList,
  Alert,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Calendar } from "react-native-calendars";
import { ProgressChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";
import { Circle, G, Rect, Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  useGetProfileQuery,
  useGetUserActivityQuery,
  useGetUserActivityWeekQuery,
  useUpadateUserActivityMutation,
} from "@/redux/api/apiClient";

const PlanDrinkWater = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const progress = 1;
  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [updateActivity] = useUpadateUserActivityMutation();

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const {
    data: profile,
    error,
    isLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery();

  const { data: userActivity, refetch } = useGetUserActivityQuery();

  const { data: userActivityWeek, refetch: refetchWeek } =
    useGetUserActivityWeekQuery();
  console.log("userActivityWeek", userActivityWeek.activities);

  const waterIntakeInMl = profile?.calculations.waterIntake * 1000 || 0;

  const [selectedValue, setSelectedValue] = useState(null);
  const [currentIntake, setCurrentIntake] = useState(0);

  useEffect(() => {
    setCurrentIntake(userActivity?.activity?.waterIntake || 0);
  }, []);

  const strokeDashoffset =
    circumference - (currentIntake / waterIntakeInMl) * circumference + 1;

  const handleAddIntake = async () => {
    if (selectedValue) {
      const mlToAdd = parseInt(selectedValue);
      setCurrentIntake((prev) => Math.min(prev + mlToAdd, waterIntakeInMl));
      await updateActivity({
        waterIntake: userActivity?.activity?.waterIntake + mlToAdd,
      }).unwrap();
      refetch();
      refetchWeek();
    } else {
      Alert.alert("Please select a volume to add.");
    }
    if (currentIntake === waterIntakeInMl) {
      Alert.alert("Goal Completed");
    }
  };

  const handleClearWater = async () => {
    setCurrentIntake(0);
    await updateActivity({
      waterIntake: 0,
    }).unwrap();
    refetch();
    refetchWeek();
  };

  const [selectedDate, setSelectedDate] = useState(null);
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
            <TrackerHeader
              navigation={navigation}
              colors={colors}
              bottomSheetRef={bottomSheetRef}
            />
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
                    stroke="#3D5AFE"
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
                    color: colors.text,
                  }}
                >
                  {currentIntake}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                  }}
                >
                  of {waterIntakeInMl} ml
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.text,
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <HorizontalPicker
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              dark={dark}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#3D5AFE",
                borderRadius: 50,
                padding: 15,
              }}
              onPress={handleAddIntake}
            >
              <Ionicons name="add" size={35} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClearWater}
              style={{
                backgroundColor: "#babbbf",
                borderRadius: 50,
                width: 45,
                height: 45,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="reload1" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <WeeklyStatsComponent
            activities={userActivityWeek?.activities || []}
            waterIntakeInMl={waterIntakeInMl}
            colors={colors}
            dark={dark}
          />

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
const HorizontalPicker = ({ selectedValue, setSelectedValue, dark }) => {
  // const [selectedValue, setSelectedValue] = useState(null);

  const options = ["150ml", "250ml", "350ml", "500ml", "750ml", "1000ml"];

  const handleSelect = (value) => {
    setSelectedValue(value);
    // Alert.alert(value);
  };

  return (
    <View
      style={{
        height: 100,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
      }}
    >
      <FlatList
        data={options}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selectedValue === item;
          return (
            <TouchableOpacity
              style={[styles.item, isSelected ? styles.selectedItem : null]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                  {
                    color: isSelected ? "white" : dark ? "white" : "black",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const WeeklyStatsComponent = ({
  activities = [],
  waterIntakeInMl = 2000,
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  colors,
  dark,
}) => {
  const barWidth = 10;
  const barSpacing = 43;

  // Convert activities into daily water intake percentages
  const stats = days.map((day) => {
    const activity = activities.find((act) => {
      const activityDate = new Date(act.date);
      const activityDay = activityDate.toLocaleString("en", {
        weekday: "short",
      });
      return activityDay === day;
    });

    return activity
      ? Math.min((activity.waterIntake / waterIntakeInMl) * 100, 100) // Cap at 100%
      : 0;
  });

  // Calculate the average water intake percentage
  const averageWaterIntake = stats.reduce((a, b) => a + b, 0) / days.length;

  return (
    <View style={{ paddingBottom: 20, marginTop: 20 }}>
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
            color: colors.text,
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
              color: colors.text,
            }}
          >
            Average
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "gray",
            }}
          >
            {((averageWaterIntake * waterIntakeInMl) / 1000).toFixed(1)} L
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: dark ? "#2c2c2c" : "#e7e7e7",
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
                  y={value === 0 ? 10 : 100 - value}
                  width={barWidth}
                  height={value === 0 ? 100 : value}
                  fill={value === 0 ? "#afafafed" : "#3D5AFE"}
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
                { fontSize: 13, color: dark ? "#b4b4b4" : "#5b5b5bec" },
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

const CircularProgressBar = () => {
  const [progress, setProgress] = useState<number[]>([0]);

  const fillProgress = () => {
    setProgress([1]);
  };
  const [selectedValue, setSelectedValue] = useState<string>("150ml");

  const items = [
    { label: "150ml", value: "150ml" },
    { label: "250ml", value: "250ml" },
    { label: "350ml", value: "350ml" },
    { label: "750ml", value: "750ml" },
    { label: "1000ml", value: "1000ml" },
  ];

  return (
    <View style={styles.container}>
      <ProgressChart
        data={{ data: progress }}
        width={screenWidth - 40}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
      />
      <Button title="Fill Progress" onPress={fillProgress} />

      <Text style={styles.label}>Select Volume:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={items}
        value={selectedValue}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
      />
      <Text style={styles.selectedValue}>Selected: {selectedValue}</Text>
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
        Water Tracker
      </Text>
      <TouchableOpacity onPress={openBottomSheet}>
        <AntDesign name="calendar" size={20} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
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

export default PlanDrinkWater;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "#ffffff",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  selectedItem: {
    backgroundColor: "#007AFF",
    borderWidth: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
});
