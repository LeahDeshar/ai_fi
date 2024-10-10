import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import workouts from "@/components/data/workout";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const workoutScreen = () => {
  const { colors, dark } = useTheme();
  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        {workouts.map((workout, index) => (
          <View key={index} style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <WorkoutList workout={workout} colors={colors} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default workoutScreen;
const WorkoutList = ({ workout, colors }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("WorkoutSubworkout", { workout });
      }}
      style={{
        flexDirection: "row",
        backgroundColor: colors.opacity,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
      }}
    >
      <Image
        source={{ uri: workout?.image }}
        style={{
          width: 85,
          height: 85,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderBottomColor: "white",
            paddingBottom: 10,
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 5,
            }}
          >
            {workout?.title}
          </Text>

          <Text style={{ color: colors.text }}>
            {workout?.subWorkout.length} workouts
          </Text>
        </View>
        <View
          style={{
            marginRight: 10,
          }}
        >
          <AntDesign name="right" color={colors.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});
