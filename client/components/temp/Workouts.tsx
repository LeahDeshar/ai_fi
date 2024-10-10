import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import workouts from "@/components/data/workout";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Workouts = () => {
  const { colors, dark } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        {workouts.map((workout, index) => (
          <View key={index} style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <WorkoutList workout={workout} index={index} colors={colors} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

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
export default Workouts;

const styles = StyleSheet.create({});
