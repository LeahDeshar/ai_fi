// WeeklyStatsComponent.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import Svg, { Rect } from "react-native-svg";

const WeeklyStatsComponent = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const stats = [0, 0, 0, 0, 0, 0, 100]; // example data for demo

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly stats</Text>
        <Button style={styles.historyButton}>View History</Button>
      </View>
      <View style={styles.dateRange}>
        <IconButton icon="chevron-left" size={20} />
        <View style={styles.dateTextContainer}>
          <Text style={styles.dateText}>21 - 27 Jul 2024</Text>
          <Text style={styles.averageText}>Average 35h 41m</Text>
        </View>
        <IconButton icon="chevron-right" size={20} />
      </View>
      <View style={styles.chartContainer}>
        <Svg height="150" width="100%">
          {stats.map((value, index) => (
            <Rect
              key={index}
              x={index * 30 + 20}
              y={value === 0 ? 10 : 150 - value}
              width="10"
              height={value === 0 ? 140 : value}
              fill={value === 0 ? "#E0E0E0" : "#3D5AFE"}
            />
          ))}
        </Svg>
      </View>
      <View style={styles.daysContainer}>
        {days.map((day, index) => (
          <Text key={index} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#3D5AFE" }]} />
          <Text>Goal reached</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#E0E0E0" }]} />
          <Text>Goal not reached</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
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
  chartContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 14,
    color: "#777",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});

export default WeeklyStatsComponent;
