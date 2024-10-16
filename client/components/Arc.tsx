// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Svg, { Path, Circle, G, Text as SvgText } from "react-native-svg";

// const Arc = ({ radius, strokeWidth, arcColor, text, subText }) => {
//   const startAngle = 180; // starting from the left
//   const endAngle = 360; // ending to the right

//   const start = polarToCartesian(radius, startAngle);
//   const end = polarToCartesian(radius, endAngle);

//   const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

//   const arcPath = `
//     M ${start.x} ${start.y}
//     A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
//   `;

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           height: 300,
//         },
//       ]}
//     >
//       <Svg
//         width={radius * 2}
//         height={radius + 150}
//         viewBox={`0 0 ${radius * 2} ${radius}`}
//       >
//         <Path
//           d={arcPath}
//           stroke={arcColor}
//           strokeWidth={strokeWidth}
//           fill="none"
//         />

//         {/* Icons around the arc */}
//         <G>
//           <Circle cx={radius * 0.2} cy={radius * 0.9} r={20} fill="#f0f0f0" />
//           <Circle cx={radius * 1.8} cy={radius * 0.9} r={20} fill="#f0f0f0" />
//           <Circle cx={radius} cy={radius * 0.1} r={20} fill="#f0f0f0" />
//         </G>
//       </Svg>

//       {/* Central text */}
//       {/* <View style={styles.textContainer}>
//         <Text style={styles.subText}>{subText}</Text>
//         <Text style={styles.text}>{text}</Text>
//       </View> */}
//     </View>
//   );
// };

// const polarToCartesian = (radius, angleInDegrees) => {
//   const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

//   return {
//     x: radius + radius * Math.cos(angleInRadians),
//     y: radius + radius * Math.sin(angleInRadians),
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textContainer: {
//     position: "absolute",
//     alignItems: "center",
//   },
//   subText: {
//     color: "#888",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

// export default Arc;

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const Arc = ({ progress = 50, size = 250, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-230" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
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
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Upcoming fast</Text>
        <Text style={styles.progressText}>16 hours</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
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
