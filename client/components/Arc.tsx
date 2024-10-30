import { useTheme } from "@/constants/ThemeProvider";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import Button from "./Button";

const Arc = ({ progress = 50, size = 250, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // const strokeDashoffset = circumference - (circumference * progress) / 100;
  const { colors, dark } = useTheme();

  const [startTime, setStartTime] = useState(null);
  const [goalTime, setGoalTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(16 * 60 * 60 * 1000); // 16 hours in milliseconds
  const [isFasting, setIsFasting] = useState(false);
  const startFasting = () => {
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 16 * 60 * 60 * 1000); // 16 hours later

    setStartTime(currentTime);
    setGoalTime(endTime);
    setIsFasting(true);

    // Start countdown
    setRemainingTime(16 * 60 * 60 * 1000);
  };
  // const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  const totalTime = 16 * 60 * 60 * 1000;
  const strokeDashoffset = circumference * (remainingTime / totalTime);
  // console.log(strokeDashoffset + 100);
  useEffect(() => {
    let timer;
    if (isFasting && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1000);
      }, 1000);
      // timer = setInterval(() => {
      //   setRemainingTime((prev) => {
      //     const newRemainingTime = prev - 1000;

      //     // Update progress based on the remaining time
      //     const progress = newRemainingTime / (16 * 60 * 60 * 1000);
      //     setStrokeDashoffset(circumference * (1 - progress));
      //     console.log(circumference * (1 - progress) + 1000);

      //     return newRemainingTime;
      //   });
      // }, 1000);
    } else if (remainingTime <= 0) {
      clearInterval(timer);
      Alert.alert("Congratulations!", "You've completed your fast!");
      setIsFasting(false);
    }

    return () => clearInterval(timer);
  }, [isFasting, remainingTime]);

  const formatTime = (date) => {
    if (!date || !(date instanceof Date)) return "--:--"; // Ensure date is a valid Date object
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatRemTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const stopFasting = () => {
    console.log(isFasting);
    if (isFasting) {
      setIsFasting(false);
      setRemainingTime(16 * 60 * 60 * 1000);
      // Do not reset remainingTime here to keep it as is when stopping
    }
    // setIsFasting(false);
  };
  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Svg width={size} height={size}>
          <G rotation="-230" origin={`${size / 2}, ${size / 2}`}>
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
              strokeDasharray={circumference}
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

        <View style={{ position: "absolute", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "#6e6e6e" }}>Upcoming fast</Text>
          <Text
            style={{ fontSize: 28, fontWeight: "bold", color: colors.text }}
          >
            {/* 16 hours */}
            {formatRemTime(remainingTime)}
          </Text>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          width: "58%",
          height: 250,
          left: 90,
          top: -12,
        }}
      >
        <View style={{}}>
          <View
            style={{
              top: 205,
              left: 23,
              backgroundColor: "#dcdcdc",
              padding: 2,
              position: "absolute",
              borderRadius: 25,
            }}
          >
            <MaterialIcons name="bloodtype" size={33} color="#b50101" />
          </View>
          <View
            style={{
              top: 90,
              right: 215,
              backgroundColor: "#dcdcdc",
              paddingVertical: 5,
              paddingHorizontal: 10,
              position: "absolute",
              borderRadius: 55,
            }}
          >
            <Fontisto name="blood-drop" size={28} color="#b50101" />
          </View>
          <View
            style={{
              left: 100,
              // bottom: ,
              backgroundColor: "#dcdcdc",
              paddingVertical: 5,
              paddingHorizontal: 10,
              position: "absolute",
              borderRadius: 25,
            }}
          >
            <FontAwesome5 name="fire" size={28} color="#b50101" />
          </View>
          <View
            style={{
              right: 0,
              top: 165,
              backgroundColor: "#dcdcdc",
              paddingVertical: 5,
              paddingHorizontal: 12,
              position: "absolute",
              borderRadius: 25,
            }}
          >
            <FontAwesome name="flash" size={25} color="#b50101" />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          borderWidth: 1,
          borderTopColor: "#e1e1e168",
          borderBottomColor: "#e1e1e168",
          paddingVertical: 12,
          borderColor: "transparent",
          marginTop: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: 10,
              borderRadius: 25,
              backgroundColor: "#e4e3e387",
              padding: 12,
            }}
          >
            <Ionicons name="pencil" size={15} color={colors.text} />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                marginBottom: 2,
                color: colors.text,
              }}
            >
              {formatTime(startTime)}
              {/* 11:10 PM */}
            </Text>
            <Text
              style={{
                color: colors.text,
              }}
            >
              Start
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: colors.text,
              marginBottom: 2,
            }}
          >
            {formatTime(goalTime)}
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: colors.text,
            }}
          >
            Goal
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={startFasting}
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            padding: 15,
            borderRadius: 25,
            backgroundColor: "#b50101",
            width: "85%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {isFasting ? "Fasting in Progress" : "Start Fasting"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 25,
            backgroundColor: "#b50101",
            marginTop: 20,
          }}
          onPress={stopFasting}
        >
          <Ionicons name="pause" color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {},
  titleText: {
    fontSize: 18,
    color: "#6e6e6e",
  },
  progressText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Arc;
