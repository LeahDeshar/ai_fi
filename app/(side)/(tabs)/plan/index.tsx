import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const planScreen = () => {
  const { colors, dark } = useTheme();

  const itemSet = [
    {
      title: "Log Calories",
      image:
        "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanLogCalories",
    },
    {
      title: "Do Your Workout",
      image:
        "https://images.pexels.com/photos/4482936/pexels-photo-4482936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanWorkout",
    },
    {
      title: "Weight-in",
      image:
        "https://images.pexels.com/photos/6975464/pexels-photo-6975464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanWeight",
    },
    {
      title: "Drink Water",
      image:
        "https://images.pexels.com/photos/3737800/pexels-photo-3737800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      path: "PlanDrinkWater",
    },
    {
      title: "Reach Step Goal",
      image:
        "https://images.pexels.com/photos/13580544/pexels-photo-13580544.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      path: "PlanSteps",
    },
  ];

  const navigation = useNavigation();
  const handleNavigate = (path) => () => {
    navigation.navigate(path);
  };
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginVertical: 16,
              }}
            >
              My Plan
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <TouchableOpacity>
                <FontAwesome name="bolt" size={20} color={colors.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="message1" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {itemSet.map((item, index) => (
              <TouchableOpacity
                onPress={handleNavigate(item.path)}
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: colors.opacity,
                  borderRadius: 16,
                  margin: 8,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 85,
                    height: 85,
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
                <AntDesign name="right" size={20} color={colors.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default planScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 50,
  },
  reactLogo: {
    height: 308,
    width: 390,
    // bottom: 0,
    // left: 0,
    // position: "absolute",
  },
});
