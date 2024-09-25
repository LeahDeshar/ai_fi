// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { useTheme } from "@/constants/ThemeProvider";
// import { useRouter } from "expo-router";
// import Slider from "@react-native-community/slider";
// import { LinearGradient } from "expo-linear-gradient";

// const ProfileSummaryScreen = () => {
//   const { colors } = useTheme();
//   const navigation = useRouter();
//   const minBmi = 10;
//   const maxBmi = 40;

//   // Example user BMI
//   const [bmi, setBmi] = useState(23.5);

//   const scaleBmiToSlider = (bmi) => {
//     return ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
//   };

//   const sliderValue = scaleBmiToSlider(bmi);

//   const bmiCategories = {
//     underweight: { max: 18.5, label: "Underweight", color: "#9bd0e5" },
//     normal: { min: 18.5, max: 24.9, label: "Normal", color: "#7de77d" },
//     overweight: { min: 25, max: 29.9, label: "Overweight", color: "#d1a960" },
//     obese: { min: 30, label: "Obese", color: "#f3855d" },
//   };

//   const getBmiCategory = (bmi) => {
//     if (bmi < bmiCategories.underweight.max) return bmiCategories.underweight;
//     if (bmi >= bmiCategories.normal.min && bmi <= bmiCategories.normal.max)
//       return bmiCategories.normal;
//     if (
//       bmi >= bmiCategories.overweight.min &&
//       bmi <= bmiCategories.overweight.max
//     )
//       return bmiCategories.overweight;
//     if (bmi >= bmiCategories.obese.min) return bmiCategories.obese;
//   };

//   const currentCategory = getBmiCategory(bmi);

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.title, { color: colors.text }]}>
//         Summary of your fitness level
//       </Text>

//       <View style={styles.bmiValueContainer}>
//         <Text style={[styles.bmiValue, { color: colors.text }]}>
//           Your BMI: {bmi.toFixed(1)}
//         </Text>
//         <Text style={[styles.bmiCategory, { color: currentCategory.color }]}>
//           {currentCategory.label}
//         </Text>
//       </View>

//       <MessageBubble message={bmi} isOwnMessage={true} />
//       <View style={styles.scaleBarContainer}>
//         <LinearGradient
//           colors={[
//             bmiCategories.underweight.color,
//             bmiCategories.normal.color,
//             bmiCategories.overweight.color,
//             bmiCategories.obese.color,
//           ]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={styles.gradientScaleBar}
//         />

//         <View
//           style={[
//             styles.sliderContainer,
//             {
//               position: "absolute",
//               top: -15,
//             },
//           ]}
//         >
//           <Slider
//             style={{ width: "100%", height: 10 }}
//             minimumValue={0}
//             maximumValue={100}
//             value={sliderValue}
//             minimumTrackTintColor={"transparent"}
//             maximumTrackTintColor={"transparent"}
//             thumbTintColor={currentCategory.color}
//             disabled={true}
//           />
//         </View>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           width: "90%",
//         }}
//       >
//         <Text
//           style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
//         >
//           Underweight
//         </Text>
//         <Text
//           style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
//         >
//           Normal
//         </Text>
//         <Text
//           style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
//         >
//           Overweight
//         </Text>
//         <Text
//           style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
//         >
//           Obese
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default ProfileSummaryScreen;
// const MessageBubble = ({ message, isOwnMessage }) => {
//   return (
//     <View style={[styles.messageBubble, styles.ownMessage]}>
//       <Text style={styles.messageText}>Your BMI: {message}</Text>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 30,
//   },
//   bmiValueContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   bmiValue: {
//     fontSize: 40,
//     fontWeight: "bold",
//   },
//   bmiCategory: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginTop: 10,
//   },
//   scaleBarContainer: {
//     width: "100%",
//     alignItems: "center",
//   },
//   gradientScaleBar: {
//     height: 6,
//     borderRadius: 10,
//     width: "90%",
//   },
//   sliderContainer: {
//     width: "90%",
//   },
//   messageBubble: {
//     maxWidth: "80%",
//     padding: 10,
//     borderRadius: 15,
//     marginVertical: 5,
//     alignSelf: "flex-start",
//   },
//   ownMessage: {
//     backgroundColor: "#DCF8C6",
//     alignSelf: "center",
//     borderBottomRightRadius: 0,
//   },
//   messageText: {
//     fontSize: 12,
//     color: "#000",
//   },
// });

import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";

const ProfileSummaryScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const minBmi = 10;
  const maxBmi = 40;

  // Example user BMI
  const [bmi, setBmi] = useState(30.5);
  const screenWidth = Dimensions.get("window").width;

  const scaleBmiToSlider = (bmi) => {
    return ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
  };

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
    return thumbPosition - 40; // Subtract half the width of the bubble to center it
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Summary of your fitness level
      </Text>

      <View style={styles.bmiValueContainer}>
        <Text style={[styles.bmiValue, { color: colors.text }]}>
          Your BMI: {bmi.toFixed(1)}
        </Text>
        <Text style={[styles.bmiCategory, { color: currentCategory.color }]}>
          {currentCategory.label}
        </Text>
      </View>

      {/* Message bubble positioned above the slider thumb */}
      <View style={styles.scaleBarContainer}>
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

        <View
          style={[
            styles.messageBubbleContainer,
            { left: calculateBubblePosition() - 30 },
          ]}
        >
          <MessageBubble message={bmi} color={currentCategory.color} />
        </View>
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
        }}
      >
        <Text
          style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
        >
          Underweight
        </Text>
        <Text
          style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
        >
          Normal
        </Text>
        <Text
          style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
        >
          Overweight
        </Text>
        <Text
          style={{ color: colors.tabIconDefault, marginTop: 20, fontSize: 12 }}
        >
          Obese
        </Text>
      </View>
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
      <Text style={styles.messageText}>Your BMI: {message}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  bmiValueContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  bmiValue: {
    fontSize: 40,
    fontWeight: "bold",
  },
  bmiCategory: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  },
  scaleBarContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
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
});
