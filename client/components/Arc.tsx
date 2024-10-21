import { useTheme } from "@/constants/ThemeProvider";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import Button from "./Button";

const Arc = ({ progress = 50, size = 250, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;
  const { colors, dark } = useTheme();
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
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#000" }}>
            16 hours
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
          marginTop: 10,
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
            <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 2 }}>
              11:10 PM
            </Text>
            <Text>Start</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 2 }}>
            3:10 PM
          </Text>
          <Text
            style={{
              textAlign: "right",
            }}
          >
            Goal
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          padding: 15,
          borderRadius: 25,
          backgroundColor: "#b50101",
          width: "90%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Start Fasting
        </Text>
      </TouchableOpacity>
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
