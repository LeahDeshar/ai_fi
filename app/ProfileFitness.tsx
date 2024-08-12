// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import { useTheme } from "@/constants/ThemeProvider";
// import Slider from "@react-native-community/slider";
// const ProfileFitness = () => {
//   const { colors } = useTheme();
//   const [sliderValue, setSliderValue] = useState(0);
//   const sliderWidth = 300;

//   const getComment = (value: number) => {};
//   const getThumbImage = (value) => {
//     if (value <= 20) return require("@/assets/sadd.png"); // Sad
//     if (value <= 40) return require("@/assets/happy.png"); // Disappointed
//     if (value <= 60) return require("@/assets/cool.png"); // Neutral
//     if (value <= 100) return require("@/assets/smirk.png"); // Slightly Happy
//     return require("@/assets/sadd.png"); // Very Happy
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: colors.background,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 30,
//           textAlign: "center",
//           color: colors.text,
//           marginTop: 30,
//           fontWeight: "bold",
//         }}
//       >
//         What's your current activity level?
//       </Text>
//       <View
//         style={{
//           justifyContent: "center",
//           alignItems: "center",
//           height: 200,
//         }}
//       >
//         <Text style={styles.emoji}>{getComment(sliderValue)}</Text>

//         <Slider
//           style={styles.slider}
//           minimumValue={0}
//           maximumValue={100}
//           step={1}
//           thumbTintColor="transparent"
//           value={sliderValue}
//           onValueChange={(value) => setSliderValue(value)}
//           minimumTrackTintColor="#1fb28a"
//           maximumTrackTintColor="#d3d3d3"
//           thumbImage={getThumbImage(sliderValue)}
//         />
//         <View style={styles.valueContainer}>
//           <Text style={styles.valueText}>{Math.round(sliderValue)}</Text>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: 300,
//             bottom: 30,
//           }}
//         >
//           <Text
//             style={{
//               color: colors.text,
//             }}
//           >
//             NEWBIE
//           </Text>
//           <Text
//             style={{
//               color: colors.text,
//             }}
//           >
//             PRO
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emoji: {
//     // position: "absolute",
//     bottom: 45,
//   },
//   slider: {
//     width: 300,
//     // height: 100,
//     // height: 40,
//   },
//   valueContainer: {
//     marginTop: 20,
//   },

//   sliderTrack: {
//     width: 300,
//     height: 40,
//     backgroundColor: "#d3d3d3",
//     borderRadius: 20,
//     justifyContent: "center",
//   },
//   thumb: {
//     position: "absolute",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   valueText: {
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

// export default ProfileFitness;

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Slider from "@react-native-community/slider";
import Button from "@/components/Button";

const ProfileFitness = () => {
  const { colors } = useTheme();
  const [sliderValue, setSliderValue] = useState(0);

  const getComment = (value) => {
    if (value < 20) return "I need to catch my breath";
    if (value < 40) return "I'm getting there";
    if (value < 60) return "I'm feeling good";
    if (value < 80) return "I'm almost there";
    return "I'm at my peak performance!";
  };

  const getThumbImage = (value) => {
    if (value <= 20) return require("@/assets/sadd.png"); // Sad
    if (value <= 40) return require("@/assets/happy.png"); // Disappointed
    if (value <= 60) return require("@/assets/cool.png"); // Neutral
    if (value <= 80) return require("@/assets/smirk.png"); // Slightly Happy
    return require("@/assets/smirk.png"); // Very Happy
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          color: colors.text,
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        What's your current activity level?
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <Text style={[styles.emoji, { color: colors.text }]}>
          {getComment(sliderValue)}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          thumbTintColor="transparent"
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbImage={getThumbImage(sliderValue)}
        />
        <View style={styles.valueContainer}>
          <Text style={[styles.valueText, { color: colors.text }]}>
            {Math.round(sliderValue)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 300,
            bottom: 30,
          }}
        >
          <Text style={{ color: colors.text }}>NEWBIE</Text>
          <Text style={{ color: colors.text }}>PRO</Text>
        </View>
        <View>
          <Button
            title="Save"
            handlePress={() => {
              console.log("Next");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 300,
  },
  valueContainer: {
    marginTop: 20,
  },
  valueText: {
    fontSize: 16,
  },
  emoji: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileFitness;
