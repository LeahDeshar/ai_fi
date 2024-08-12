// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { useRoute } from "@react-navigation/native";
// import { useTheme } from "@/constants/ThemeProvider";
// import { AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";

// const getUniqueCategories = (workouts) => {
//   const categories = workouts.flatMap((workout) =>
//     workout.subWorkout.map((sub) => sub.category)
//   );
//   return [...new Set(categories)];
// };

// const WorkoutSubworkout = () => {
//   const route = useRoute();
//   const { workout } = route.params;
//   const { colors } = useTheme();
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const uniqueCategories = getUniqueCategories([workout]);

//   const filteredWorkouts = selectedCategory
//     ? workout.subWorkout.filter((sub) => sub.category === selectedCategory)
//     : workout.subWorkout;
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
//       <View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginHorizontal: 10,
//             marginVertical: 10,
//           }}
//         >
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <AntDesign name="arrowleft" color={colors.icon} size={20} />
//           </TouchableOpacity>
//           <Text
//             style={{
//               color: colors.text,
//               fontSize: 30,
//               fontWeight: "bold",
//               marginVertical: 10,
//               marginLeft: 30,
//             }}
//           >
//             {workout?.title}
//           </Text>
//         </View>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={{
//             padding: 10,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => setSelectedCategory(null)}
//             style={{
//               backgroundColor: colors.opacity,
//               paddingHorizontal: 15,
//               paddingVertical: 10,
//               borderRadius: 20,
//               marginRight: 10,
//             }}
//           >
//             <Text style={{ color: colors.text }}>All</Text>
//           </TouchableOpacity>
//           {uniqueCategories.map((category, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setSelectedCategory(category)}
//               style={{
//                 backgroundColor: colors.opacity,
//                 paddingHorizontal: 15,
//                 borderRadius: 20,
//                 marginRight: 10,
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ color: colors.text, paddingVertical: 9 }}>
//                 {category}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <ScrollView>
//           {filteredWorkouts.map((work, index) => (
//             <TouchableOpacity
//               key={index}
//               style={{
//                 flexDirection: "row",
//                 backgroundColor: colors.opacity,
//                 alignItems: "center",
//                 paddingHorizontal: 10,
//                 paddingVertical: 8,
//                 borderRadius: 20,
//                 margin: 10,
//               }}
//             >
//               <Image
//                 source={{ uri: work.image }}
//                 style={{
//                   width: 85,
//                   height: 85,
//                   borderRadius: 20,
//                 }}
//               />
//               <View
//                 style={{
//                   marginLeft: 10,
//                   flexBasis: "62%",
//                 }}
//               >
//                 <Text
//                   key={index}
//                   style={{
//                     color: colors.text,
//                     fontSize: 20,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {work.name}
//                 </Text>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     marginTop: 10,
//                   }}
//                 >
//                   <Text
//                     key={index}
//                     style={{
//                       color: colors.borders,
//                       marginRight: 12,
//                     }}
//                   >
//                     {work.duration} min
//                   </Text>
//                   <Text
//                     key={index}
//                     style={{
//                       color: colors.borders,
//                     }}
//                   >
//                     {work.category}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                 }}
//               >
//                 <AntDesign
//                   name="hearto"
//                   color={colors.icon}
//                   size={18}
//                   style={{
//                     marginRight: 10,
//                   }}
//                 />
//                 <AntDesign
//                   name="right"
//                   color={colors.icon}
//                   size={18}
//                   style={{
//                     marginRight: 10,
//                   }}
//                 />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default WorkoutSubworkout;

// const styles = StyleSheet.create({});
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const getUniqueCategories = (workouts) => {
  const categories = workouts.flatMap((workout) =>
    workout.subWorkout.map((sub) => sub.category)
  );
  return [...new Set(categories)];
};

const WorkoutSubworkout = () => {
  const route = useRoute();
  const { workout } = route.params;
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  const uniqueCategories = getUniqueCategories([workout]);

  const filteredWorkouts = selectedCategory
    ? workout.subWorkout.filter((sub) => sub.category === selectedCategory)
    : workout.subWorkout;

  const handleCategorySelect = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null); // Deselect if the same category is clicked
    } else {
      setSelectedCategory(category);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color={colors.icon} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
              fontWeight: "bold",
              marginVertical: 10,
              marginLeft: 30,
            }}
          >
            {workout?.title}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={handleReset}
            style={{
              backgroundColor:
                selectedCategory === null ? colors.primary : colors.opacity,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Text style={{ color: colors.text }}>All</Text>
          </TouchableOpacity>
          {uniqueCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategorySelect(category)}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? colors.primary
                    : colors.opacity,
                paddingHorizontal: 15,
                borderRadius: 20,
                marginRight: 10,
                alignItems: "center",
                opacity:
                  selectedCategory && selectedCategory !== category ? 0.5 : 1,
              }}
              disabled={selectedCategory && selectedCategory !== category}
            >
              <Text style={{ color: colors.text, paddingVertical: 9 }}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView>
          {filteredWorkouts.map((work, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("WorkoutDetails", { work })}
              key={index}
              style={{
                flexDirection: "row",
                backgroundColor: colors.opacity,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Image
                source={{ uri: work.image }}
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  marginLeft: 10,
                  flexBasis: "62%",
                }}
              >
                <Text
                  key={index}
                  style={{
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {work.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    key={index}
                    style={{
                      color: colors.borders,
                      marginRight: 12,
                    }}
                  >
                    {work.duration} min
                  </Text>
                  <Text
                    key={index}
                    style={{
                      color: colors.borders,
                    }}
                  >
                    {work.category}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <AntDesign
                  name="hearto"
                  color={colors.icon}
                  size={18}
                  style={{
                    marginRight: 10,
                  }}
                />
                <AntDesign
                  name="right"
                  color={colors.icon}
                  size={18}
                  style={{
                    marginRight: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutSubworkout;

const styles = StyleSheet.create({});
