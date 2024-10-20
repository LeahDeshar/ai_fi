import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Calendar } from "react-native-calendars";
import { Circle, G, Rect, Svg } from "react-native-svg";

const PlanLogCalories = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const progress = 1;
  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  const carbs = 5;
  const fat = 40;
  const protein = 70;
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
              paddingTop: 20,

              paddingBottom: 10,
            }}
          >
            <TrackerHeader
              navigation={navigation}
              colors={colors}
              bottomSheetRef={bottomSheetRef}
            />

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
                <Text style={{}}>0</Text>
                <Text style={{}}>of 1,569 kcal</Text>
                <TouchableOpacity>
                  <Text style={{}}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <NutrientProgressBars carbs={carbs} fat={fat} protein={protein} />
            </View>

            <View
              style={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                backgroundColor: "#f5f5f5",
                paddingTop: 20,
              }}
            >
              <Text>Daily meals</Text>
            </View>
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
