import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Svg, { G, Rect } from "react-native-svg";
import { IconButton } from "react-native-paper";
const WeeklyStatsComponent = ({
  stats = [50, 70, 30, 80, 60, 90, 100],
  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}) => {
  const barWidth = 10;
  const barSpacing = 43;

  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Weekly stats</Text>
        <TouchableOpacity onPress={() => alert("View history")}>
          <Text>View history</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.dateRange}>
          <IconButton icon="chevron-left" size={20} />
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>21 - 27 Jul 2024</Text>
            <Text style={styles.averageText}>Average 35h 41m</Text>
          </View>
          <IconButton icon="chevron-right" size={20} />
        </View>
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
                  fill={"#c7c7c78a"}
                  rx={6}
                  ry={6}
                />
                <Rect
                  x={index * (barWidth + barSpacing) + 15}
                  // y={value === 0 ? 10 : 150 - value}
                  y={value === 0 ? 10 : 100 - value}
                  width={barWidth}
                  height={value === 0 ? 100 : value}
                  fill={value === 0 ? "#c7c7c78a" : "#3D5AFE"}
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
                styles.dayLabel,
                { width: barWidth + barSpacing, textAlign: "center" },
              ]}
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#3D5AFE" }]}
            />
            <Text>Goal reached</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#E0E0E0" }]}
            />
            <Text>Goal not reached</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeeklyStatsComponent;
const styles = StyleSheet.create({
  dayLabel: {
    fontSize: 13,
    color: "#919191",
  },
  container: {
    // padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 15,
    // marginBottom: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  historyButton: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  dateRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
    marginVertical: 20,
  },
  dateTextContainer: {
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  averageText: {
    fontSize: 12,
    color: "#777",
  },
  chartContainer: {},
  daysContainer: {},

  legendContainer: {
    borderTopColor: "white",
    borderWidth: 3,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 5,
  },
});
