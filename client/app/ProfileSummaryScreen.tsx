import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { useDispatch } from "react-redux";
import { registrationComplete } from "@/redux/slices/userSlice";

const ProfileSummaryScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const dispatch = useDispatch();
  const minBmi = 10;
  const maxBmi = 40;

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  const [bmi, setBmi] = useState(29.5);
  const screenWidth = Dimensions.get("window").width;

  const scaleBmiToSlider = (bmi) => {
    return ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
  };

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      setBmi(profile.calculations.bmi);
    }
  }, [profile]);

  const sliderValue = scaleBmiToSlider(bmi);

  const bmiCategories = {
    underweight: { max: 18.5, label: "Underweight", color: "#9bd0e5" },
    normal: { min: 18.5, max: 24.9, label: "Normal", color: "#7de77d" },
    overweight: { min: 25, max: 29.9, label: "Overweight", color: "#d1a960" },
    obese: { min: 30, label: "Obese", color: "#f3855d" },
  };

  const getBmiCategory = (bmi) => {
    if (bmi < bmiCategories.underweight.max) return bmiCategories.underweight;
    if (bmi >= bmiCategories.normal.min && bmi <= bmiCategories.normal.max)
      return bmiCategories.normal;
    if (
      bmi >= bmiCategories.overweight.min &&
      bmi <= bmiCategories.overweight.max
    )
      return bmiCategories.overweight;
    if (bmi >= bmiCategories.obese.min) return bmiCategories.obese;
  };

  const currentCategory = getBmiCategory(bmi);

  const calculateBubblePosition = () => {
    const trackWidth = screenWidth * 0.9; // Assuming the slider is 90% width of the screen
    const thumbPosition = (sliderValue / 100) * trackWidth;
    return thumbPosition - 40;
  };
  const slideAnim = useRef(new Animated.Value(-50)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: calculateBubblePosition() - 105,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  // registrationComplete
  const handleSave = () => {
    dispatch(registrationComplete());

    navigation.push("plan");
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{
          paddingTop: 90,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[styles.title, { color: colors.text, marginHorizontal: 20 }]}
        >
          Summary of your fitness level
        </Text>
        <View style={styles.bmiValueContainer}>
          <Text style={[styles.bmiCategory, { color: currentCategory.color }]}>
            {currentCategory.label}
          </Text>
        </View>

        {/* Message bubble positioned above the slider thumb */}
        <View style={[styles.scaleBarContainer]}>
          <LinearGradient
            colors={[
              bmiCategories.underweight.color,
              bmiCategories.normal.color,
              bmiCategories.overweight.color,
              bmiCategories.obese.color,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientScaleBar}
          />

          <Animated.View
            style={[
              styles.messageBubbleContainer,
              // { left: calculateBubblePosition() - 30 },
              { left: slideAnim },
            ]}
          >
            <MessageBubble message={bmi} color={currentCategory.color} />
          </Animated.View>
          <View
            style={{
              top: -23,
              width: "100%",
            }}
          >
            <Slider
              style={{ width: "100%", height: 10 }}
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              minimumTrackTintColor={"transparent"}
              maximumTrackTintColor={"transparent"}
              thumbTintColor={currentCategory.color}
              disabled={true}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            bottom: 15,
          }}
        >
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 12,
            }}
          >
            Underweight
          </Text>
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 12,
            }}
          >
            Normal
          </Text>
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 12,
            }}
          >
            Overweight
          </Text>
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 12,
            }}
          >
            Obese
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#99ea9992",
            flexDirection: "row",
            width: "100%",
            paddingVertical: 13,
            paddingHorizontal: 10,
            borderRadius: 15,
            marginTop: 50,
          }}
        >
          <View
            style={{
              backgroundColor: "#99ea99ac",
              borderRadius: 50,
              padding: 5,
            }}
          >
            <AntDesign name="check" size={24} />
          </View>
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Healthy BMI:
            </Text>
            <Text
              style={{
                fontSize: 13,
              }}
            >
              Good starting BMI to tone and get your dream body
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#3838388e",
            borderRadius: 15,
            padding: 5,
            paddingVertical: 20,
            paddingHorizontal: 20,
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              gap: 15,
              marginVertical: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: "#d17474",
                  borderRadius: 25,
                  padding: 5,
                  paddingHorizontal: 10,
                }}
              >
                <FontAwesome6 name="bottle-water" size={24} color="#000000" />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.value}>Water Intake:</Text>
              <Text style={styles.value}>
                {profile?.calculations.waterIntake} liters
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              gap: 15,
              marginVertical: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#74d1c0",
                borderRadius: 25,
                padding: 7,
                // paddingHorizontal: 7,
              }}
            >
              <MaterialCommunityIcons
                name="shoe-sneaker"
                size={24}
                color="black"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={styles.value}>Step Recommendation:</Text>
              <Text style={styles.value}>
                {profile?.calculations?.dailyStepRecommendation}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginVertical: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#d1ce74",
                borderRadius: 25,
                padding: 7,
                // paddingHorizontal: 7,
              }}
            >
              <FontAwesome6 name="weight-scale" size={22} color="black" />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={styles.value}>To maintain weight take:</Text>
              <Text style={styles.value}>
                {
                  profile?.calculations.weightLossDuration.calories
                    .startCalories
                }{" "}
                kcal
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginVertical: 12,
            }}
          >
            <View
              style={{
                backgroundColor: "#81c39d",
                borderRadius: 25,
                padding: 7,
                // paddingHorizontal: 7,
              }}
            >
              <FontAwesome5 name="weight" size={24} color="black" />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={styles.value}>To lose weight take:</Text>
              <Text style={styles.value}>
                {
                  profile?.calculations.weightLossDuration.calories
                    .targetCalories
                }{" "}
                kcal
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#d5d5d5a8",
                marginTop: 15,
              }}
            >
              If you make a calorie deficit of{" "}
              {Math.floor(
                profile?.calculations.weightLossDuration.calories
                  .startCalories -
                  profile?.calculations.weightLossDuration.calories
                    .targetCalories
              )}
              . It will take{" "}
              {profile?.calculations.weightLossDuration.months.minMonths}
              {" - "}
              {profile?.calculations.weightLossDuration.months.maxMonths} months
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            width: "100%",
          }}
        >
          <Button title="Save" handlePress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSummaryScreen;

const MessageBubble = ({ message, color }) => {
  return (
    <View
      style={[
        styles.messageBubble,
        styles.ownMessage,
        { backgroundColor: color },
      ]}
    >
      <Text style={styles.messageText}>Your BMI: {message.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
  },
  bmiValueContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: "bold",
  },
  bmiCategory: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
  },
  scaleBarContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  gradientScaleBar: {
    height: 6,
    borderRadius: 10,
    width: "90%",
  },
  messageBubbleContainer: {
    position: "absolute",
    top: -55, // Position the bubble above the slider
  },
  sliderContainer: {
    width: "90%",
  },
  messageBubble: {
    maxWidth: 80, // Adjusted width for message bubble
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: "center",
    // backgroundColor: "#DCF8C6",
  },
  ownMessage: {
    borderBottomRightRadius: 0,
  },
  messageText: {
    fontSize: 12,
    color: "#000",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#d5d5d5",
  },
});
