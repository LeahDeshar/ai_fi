// import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
// import React from "react";
// import { useTheme } from "@/constants/ThemeProvider";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// type Trainer = {
//   name: string;
//   image: any;
//   rating: number;
//   experience: number;
//   specialities: string[];
//   isBestMatch: boolean;
// };

// const MorePersonalCoach: React.FC = () => {
//   const { colors } = useTheme();
//   const navigation = useRouter();

//   const trainers: Trainer[] = [
//     {
//       name: "Stefan P.",
//       image: require("@/assets/trainer/t1.jpg"),
//       rating: 4.6,
//       experience: 10,
//       specialities: ["HIIT & CONDITIONNING", "NUTRITION"],
//       isBestMatch: true,
//     },
//     {
//       name: "Omar E.",
//       image: require("@/assets/trainer/t2.jpg"),
//       rating: 4.4,
//       experience: 6,
//       specialities: ["STRENGTH", "MUSCLE BUILDING"],
//       isBestMatch: false,
//     },
//     {
//       name: "Ana S.",
//       image: require("@/assets/trainer/t3.jpg"),
//       rating: 4.4,
//       experience: 3,
//       specialities: ["NUTRITION", "YOGA"],
//       isBestMatch: false,
//     },
//     {
//       name: "Michaela G.",
//       image: require("@/assets/trainer/t4.jpg"),
//       rating: 4.5,
//       experience: 2,
//       specialities: ["HIIT", "WEIGHT LIFTING"],
//       isBestMatch: false,
//     },
//   ];

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.background,
//       }}
//     >
//       {trainers?.map((trainer, index) => (
//         <TouchableOpacity
//           style={{
//             flexDirection: "row",
//             marginVertical: 5,
//           }}
//           key={index}
//           onPress={
//             () =>
//               navigation.push({
//                 pathname: "/MorePersonalCoachChat",
//                 params: { trainer: JSON.stringify(trainer) },
//               })
//             // navigation.navigate("MorePersonalCoachChat", { trainer })
//           }
//         >
//           <Image
//             source={trainer.image}
//             style={{
//               width: 80,
//               height: 80,
//               borderRadius: 8,
//             }}
//           />

//           <View
//             style={{
//               marginLeft: 25,
//             }}
//           >
//             <Text
//               style={{
//                 color: colors.text,
//               }}
//             >
//               {trainer.name}
//             </Text>
//             <View
//               style={{
//                 flexDirection: "row",
//                 marginVertical: 10,
//               }}
//             >
//               <Ionicons name="star" size={15} color={"orange"} />
//               <Text
//                 style={{
//                   color: colors.text,
//                 }}
//               >
//                 {trainer.rating}
//               </Text>
//               <Text
//                 style={{
//                   color: colors.text,
//                 }}
//               >
//                 Experience: {trainer.experience} years
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//             >
//               {trainer.specialities.map((spec, specIndex) => (
//                 <TouchableOpacity
//                   key={specIndex}
//                   style={{
//                     backgroundColor: colors.opacity,
//                     marginRight: 10,
//                     paddingHorizontal: 7,
//                     paddingVertical: 2,
//                     borderRadius: 10,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: colors.text,
//                     }}
//                   >
//                     {spec}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default MorePersonalCoach;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Trainer = {
  name: string;
  image: any;
  rating: number;
  experience: number;
  specialities: string[];
  isBestMatch: boolean;
};

const MorePersonalCoach: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const trainers: Trainer[] = [
    {
      name: "Stefan P.",
      image: require("@/assets/trainer/t1.jpg"),
      rating: 4.6,
      experience: 10,
      specialities: ["HIIT & CONDITIONING", "NUTRITION"],
      isBestMatch: true,
    },
    {
      name: "Omar E.",
      image: require("@/assets/trainer/t2.jpg"),
      rating: 4.4,
      experience: 6,
      specialities: ["STRENGTH", "MUSCLE BUILDING"],
      isBestMatch: false,
    },
    {
      name: "Ana S.",
      image: require("@/assets/trainer/t3.jpg"),
      rating: 4.4,
      experience: 3,
      specialities: ["NUTRITION", "YOGA"],
      isBestMatch: false,
    },
    {
      name: "Michaela G.",
      image: require("@/assets/trainer/t4.jpg"),
      rating: 4.5,
      experience: 2,
      specialities: ["HIIT", "WEIGHT LIFTING"],
      isBestMatch: false,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {trainers?.map((trainer, index) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: 5,
          }}
          key={index}
          onPress={() =>
            navigation.navigate("MorePersonalCoachChat", { trainer })
          }
        >
          <Image
            source={trainer.image}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
            }}
          />

          <View
            style={{
              marginLeft: 25,
            }}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              {trainer.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <Ionicons name="star" size={15} color={"orange"} />
              <Text
                style={{
                  color: colors.text,
                  marginLeft: 5,
                }}
              >
                {trainer.rating}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  marginLeft: 15,
                }}
              >
                Experience: {trainer.experience} years
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {trainer.specialities.map((spec, specIndex) => (
                <TouchableOpacity
                  key={specIndex}
                  style={{
                    backgroundColor: colors.opacity,
                    marginRight: 10,
                    paddingHorizontal: 7,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                    }}
                  >
                    {spec}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MorePersonalCoach;

const styles = StyleSheet.create({});
