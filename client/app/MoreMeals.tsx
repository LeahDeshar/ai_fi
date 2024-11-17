import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Button from "@/components/Button";
import { API_KEYS } from "@/config/config";

import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  clearSavedMealPlan,
  setSavedMealPlan,
} from "@/redux/slices/profileSlice";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
const MoreMeals = () => {
  const { colors, dark } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAiMeal = useRef<BottomSheetModal>(null);

  const [mealPlan, setMealPlan] = useState([]);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const API_KEY = API_KEYS.secret;
  const dispatch = useDispatch();
  let mealPlanDatas = [];

  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  // Automatically generate challenges when profile data is available
  const { savedMealsPlan } = useSelector((state) => state.profile);

  // useEffect(() => {
  //   if (profile && profile.profileOfUsers && savedMealsPlan?.length === 0) {
  //     const generateFitnessMealPlan = async () => {
  //       const modelPrompt = `
  //         Based on the following user profile, generate 10 personalized meals in json format {title,description,calorie,Ingredients List,Estimated Cooking Time,Preparation Instructions,Micronutrient Information} and don't add any other text:
  //         Birthday: ${profile?.profileOfUsers?.birthday || "not provided"},
  //         Gender: ${profile?.profileOfUsers?.gender || "not provided"},
  //         Height: ${
  //           profile?.profileOfUsers?.currentHeight?.centimeters ||
  //           "not provided"
  //         } cm,
  //         Weight: ${
  //           profile?.profileOfUsers?.currentWeight?.kilograms || "not provided"
  //         } kg,
  //         Activity Level: ${
  //           profile?.profileOfUsers?.activityLevel || "not provided"
  //         },
  //         Preferred Diet Type: ${
  //           profile?.profileOfUsers?.preferredDietType || "not provided"
  //         },
  //         Activities Liked: ${
  //           profile?.profileOfUsers?.activitiesLiked?.join(", ") ||
  //           "none provided"
  //         }.
  //       `;

  //       const initialChat = [
  //         {
  //           role: "user",
  //           parts: [{ text: "" }],
  //         },
  //       ];

  //       setChat(initialChat);
  //       setLoading(true);

  //       try {
  //         const response = await axios.post(
  //           `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
  //           {
  //             contents: [
  //               ...chat,
  //               {
  //                 role: "user",
  //                 parts: [{ text: modelPrompt }],
  //               },
  //             ],
  //           }
  //         );

  //         const modelResponse =
  //           response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  //           "Could not generate challenges based on the provided details.";

  //         const formattedMealPlan = await modelResponse
  //           .split(/\n+/)
  //           .filter((mealPlan) => mealPlan.trim())
  //           .map((mealPlan, index) => ({
  //             role: "model",
  //             parts: [
  //               {
  //                 text: `${mealPlan
  //                   .trim()
  //                   .replace(/```json|\`\`\`/g, "")
  //                   .trim()}`,
  //               },
  //             ],
  //           }));

  //         const matches = await modelResponse.match(/\{[^}]*\}/g);

  //         matches.forEach((match) => {
  //           // calorie,Ingredients List,Estimated Cooking Time,Preparation Instructions,Micronutrient Information
  //           const titleMatch = match.match(/"title":\s*"([^"]+)"/);
  //           const descMatch = match.match(/"description":\s*"([^"]+)"/);
  //           const calorieMatch = match.match(/"calorie":\s*"([^"]+)"/);
  //           const in_listMatch = match.match(/"ingredients":\s*"([^"]+)"/);
  //           const macro = match.match(/"micronutrient":\s*"([^"]+)"/);

  //           const data = {
  //             title: titleMatch ? titleMatch[1] : "Title not found",
  //             description: descMatch ? descMatch[1] : "Description not found",
  //             calorieMatch: calorieMatch
  //               ? calorieMatch[1]
  //               : "calorieMatch not found",
  //             in_listMatch: in_listMatch
  //               ? in_listMatch[1]
  //               : "in_listMatch not found",
  //             macro: macro ? macro[1] : "macro not found",
  //           };

  //           setMealPlan((prevMealPlan) => [...prevMealPlan, data]);
  //           mealPlanDatas.push(data);
  //         });

  //         dispatch(setSavedMealPlan(mealPlanDatas));

  //         setChat([...initialChat, ...formattedMealPlan]);
  //       } catch (errors) {
  //         console.error("Error fetching mealPlan:", errors);
  //         setError(
  //           "An error occurred while generating fitness mealPlan. Please try again."
  //         );
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     generateFitnessMealPlan();
  //   }
  // }, [profile]);

  const generateFitnessMealPlan = async () => {
    const modelPrompt = `
      Based on the following user profile, generate 10 personalized meals in json format {title,description,calorie,Ingredients List,Estimated Cooking Time,Preparation Instructions,Micronutrient Information} and don't add any other text,these are my information
      Birthday: ${profile?.profileOfUsers?.birthday || "not provided"},
      Gender: ${profile?.profileOfUsers?.gender || "not provided"},
      Height: ${
        profile?.profileOfUsers?.currentHeight?.centimeters || "not provided"
      } cm,
      Weight: ${
        profile?.profileOfUsers?.currentWeight?.kilograms || "not provided"
      } kg,
      Activity Level: ${
        profile?.profileOfUsers?.activityLevel || "not provided"
      },
      Preferred Diet Type: ${
        profile?.profileOfUsers?.preferredDietType || "not provided"
      },
      Activities Liked: ${
        profile?.profileOfUsers?.activitiesLiked?.join(", ") || "none provided"
      }.
    `;

    const initialChat = [
      {
        role: "user",
        parts: [{ text: "" }],
      },
    ];

    setChat(initialChat);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: [
            ...chat,
            {
              role: "user",
              parts: [{ text: modelPrompt }],
            },
          ],
        }
      );

      const modelResponse =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Could not generate challenges based on the provided details.";

      const formattedMealPlan = await modelResponse
        .split(/\n+/)
        .filter((mealPlan) => mealPlan.trim())
        .map((mealPlan, index) => ({
          role: "model",
          parts: [
            {
              text: `${mealPlan
                .trim()
                .replace(/```json|\`\`\`/g, "")
                .trim()}`,
            },
          ],
        }));

      const matches = await modelResponse.match(/\{[^}]*\}/g);

      matches.forEach((match) => {
        // calorie,Ingredients List,Estimated Cooking Time,Preparation Instructions,Micronutrient Information
        const titleMatch = match.match(/"title":\s*"([^"]+)"/);
        const descMatch = match.match(/"description":\s*"([^"]+)"/);
        const calorieMatch = match.match(/"calorie":\s*(\d+)/);
        const in_listMatch = match.match(/"Ingredients List":\s*\[([^\]]+)\]/);
        const macroMatch = match.match(
          /"Micronutrient Information":\s*\{([^\}]+)\}/
        );
        const time = match.match(/"Estimated Cooking Time":\s*"([^"]+)"/);

        const micronutrients = macroMatch
          ? macroMatch[1].split(",").reduce((acc, nutrient) => {
              const [key, value] = nutrient
                .split(":")
                .map((item) => item.trim().replace(/"/g, ""));
              acc[key] = value;
              return acc;
            }, {})
          : {};

        const in_list = in_listMatch
          ? in_listMatch[1]
              .split(",")
              .map((item) => item.trim().replace(/"/g, ""))
          : [];
        const data = {
          title: titleMatch ? titleMatch[1] : "Title not found",
          description: descMatch ? descMatch[1] : "Description not found",
          calorie: calorieMatch ? calorieMatch[1] : "calorie Match not found",
          in_list,
          macro: micronutrients,
          time: time ? time[1] : "time not found",
        };

        setMealPlan((prevMealPlan) => [...prevMealPlan, data]);
        mealPlanDatas.push(data);
        console.log(data);
      });

      // persist
      dispatch(setSavedMealPlan(mealPlan));

      setChat([...initialChat, ...formattedMealPlan]);
    } catch (errors) {
      console.error("Error fetching mealPlan:", errors);
      setError(
        "An error occurred while generating fitness mealPlan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const mealsList = [
    {
      title: "Traditional",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Vegan",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Pescatarian",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Lactose-Free",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Gluten-Free",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Keto",
      image: require("../assets/meal/soup.png"),
    },
    {
      title: "Paleo",
      image: require("../assets/meal/soup.png"),
    },
  ];

  // const resetMeal = () => {
  //   dispatch(clearSavedMealPlan());
  // };

  const openAiBottomSheet = (item) => {
    setSelectedMeal(item);
    bottomSheetAiMeal.current?.present();
  };
  const [selectedMeal, setSelectedMeal] = useState(null);
  console.log(selectedMeal);
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 1,
          }}
          intensity={50}
          tint={dark ? "prominent" : "extraLight"}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
              // marginBottom: 20,
              color: colors.text,
              marginTop: 45,
              paddingLeft: 15,
            }}
          >
            Meals
          </Text>
        </BlurView>
        <ScrollView
          style={{ backgroundColor: colors.background }}
          contentContainerStyle={{
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: colors.text,
              marginTop: 85,
              paddingLeft: 20,
            }}
          >
            AI Meal Plans
          </Text>

          <ScrollView
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
            horizontal
          >
            {savedMealsPlan
              ?.map((item, index) => (
                <TouchableOpacity
                  style={{
                    marginBottom: 10,
                    borderRadius: 25,
                    overflow: "hidden",
                    marginHorizontal: 8,
                    height: 150,
                    width: 220,
                  }}
                  onPress={() => openAiBottomSheet(item)}
                  key={index}
                >
                  <View
                    style={{
                      backgroundColor: colors.opacity,
                      borderRadius: 25,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                      paddingTop: 15,
                    }}
                  >
                    <FontAwesome6
                      name="bowl-food"
                      size={24}
                      color={colors.primary}
                    />

                    <View
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 18,
                          fontWeight: 600,
                          paddingVertical: 5,
                        }}
                      >
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.text,
                            fontWeight: 500,
                          }}
                        >
                          {item.calorie} kcal
                        </Text>
                        <Text
                          style={{
                            color: colors.text,
                            fontWeight: 500,
                          }}
                        >
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
              // just get last 10
              .slice(-10)}
          </ScrollView>
          {/* <Button
            title="GENERATE MEAL PLAN"
            handlePress={generateFitnessMealPlan}
            style={{ marginVertical: 20 }}
          /> */}

          <TouchableOpacity
            onPress={openBottomSheet}
            style={{
              backgroundColor: colors.opacity,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 15,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                marginVertical: 10,
                width: "50%",
                textAlign: "center",
              }}
            >
              Your Recommended Vegetarian
            </Text>
            <Image
              source={require("../assets/meal/soup.png")}
              style={{
                width: 280,
                height: 300,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                color: colors.text,
                marginVertical: 10,
              }}
            >
              28/15,00 kcal
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              marginVertical: 10,
            }}
          >
            OTHER RECOMMENDED
          </Text>

          {mealsList?.map((item, index) => (
            <TouchableOpacity onPress={openBottomSheet}>
              <View
                style={{
                  backgroundColor: "#daf4da",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 15,
                  borderRadius: 15,
                  marginTop: 15,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  marginVertical: 10,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "white",
                }}
              >
                28/15,00 kcal
              </Text>
            </TouchableOpacity>
          ))}

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={["20%", "95%"]}
            backdropComponent={BottomSheetBackdrop}
            style={{
              backgroundColor: colors.background,
            }}
            handleComponent={() => (
              <View
                style={{
                  backgroundColor: colors.background,
                }}
              />
            )}
          >
            <ParallaxScrollView
              headerImage={
                <Image
                  source={require("../assets/meal/soup.png")}
                  style={{
                    width: 300,
                    height: 350,
                    resizeMode: "center",
                  }}
                />
              }
              headerBackgroundColor={{ dark: "#bcbaba", light: "white" }}
            >
              <View>
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  Vegetarian
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  Daily Calories
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  1500 kcal
                </Text>

                <Button
                  title="GET MEAL PLAN"
                  handlePress={() => {}}
                  style={{ marginTop: 20 }}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: colors.text,
                  }}
                >
                  Meals
                </Text>
                <Text
                  style={{
                    color: colors.text,
                  }}
                >
                  Day 1
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    backgroundColor: colors.opacity,
                    borderRadius: 15,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                  }}
                >
                  <Image
                    source={require("../assets/meal/soup.png")}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: colors.text,
                        textAlign: "center",
                      }}
                    >
                      Vegan Scramble with Tomato
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                        }}
                      >
                        418 kcal
                      </Text>
                      <Text
                        style={{
                          color: colors.text,
                        }}
                      >
                        25 min
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ParallaxScrollView>
          </BottomSheetModal>

          <BottomSheetModal
            ref={bottomSheetAiMeal}
            index={1}
            snapPoints={["20%", "75%"]}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={() => <View />}
            style={{
              backgroundColor: colors.background,
            }}
          >
            <View
              style={{
                paddingHorizontal: 26,
                backgroundColor: colors.opacity,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 26,
                  fontWeight: 500,
                  marginTop: 25,
                  marginBottom: 10,
                }}
              >
                {selectedMeal?.title}
              </Text>

              <Text
                style={{
                  color: colors.text,
                  marginVertical: 10,
                }}
              >
                {selectedMeal?.description}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                  backgroundColor: "#89dc8983",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 9,
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  Calorie: {selectedMeal?.calorie}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 500,
                  }}
                >
                  Estimated Cook Time: {selectedMeal?.time}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 500,
                    marginTop: 15,
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                >
                  Ingredient
                </Text>
                {selectedMeal?.in_list.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 3,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        height: 9,
                        width: 9,
                        borderRadius: 2,
                        marginRight: 10,
                      }}
                    />
                    <Text
                      key={index}
                      style={{
                        color: colors.text,
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
              </View>

              <Text
                style={{
                  color: colors.text,
                  fontWeight: 500,
                  marginTop: 15,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Macros
              </Text>
              <View
                style={{
                  backgroundColor: "#e4e4e4",
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
              >
                <CircularMacroChart macros={selectedMeal?.macro} />
              </View>
            </View>
          </BottomSheetModal>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MoreMeals;
const CircularMacroChart = ({ macros }) => {
  const totalMacros = Object.values(macros).reduce(
    (sum, value) => sum + parseInt(value),
    0
  );

  const radius = 70; // Radius of the circle
  const strokeWidth = 10; // Width of each segment
  const circumference = 2 * Math.PI * radius;

  // Calculate the start angle for each macro segment
  const getSegmentAngle = (value) => (parseInt(value) / totalMacros) * 360;

  const segments = [
    { label: "Carbohydrates", value: macros.Carbohydrates, color: "#f84701f8" },
    { label: "Fat", value: macros.Fat, color: "#fd8454" },
    { label: "Fiber", value: macros.Fiber, color: "#fabea6" },
    { label: "Protein", value: macros.Protein, color: "#a73504" },
  ];

  let startAngle = 0;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
      <Svg height={140} width={140}>
        <G rotation={-90} originX="70" originY="70">
          {segments.map((segment) => {
            const segmentAngle = getSegmentAngle(segment.value);
            const endAngle = startAngle + segmentAngle;
            const largeArcFlag = segmentAngle > 180 ? 1 : 0;
            const x1 = 70 + radius * Math.cos((Math.PI * startAngle) / 180);
            const y1 = 70 + radius * Math.sin((Math.PI * startAngle) / 180);
            const x2 = 70 + radius * Math.cos((Math.PI * endAngle) / 180);
            const y2 = 70 + radius * Math.sin((Math.PI * endAngle) / 180);

            const pathData = `M 70 70 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            startAngle += segmentAngle;

            return (
              <Path key={segment.label} d={pathData} fill={segment.color} />
            );
          })}
        </G>
      </Svg>

      <View style={{ marginTop: 50, marginLeft: 50 }}>
        {segments.map((segment, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 2,
            }}
          >
            <View
              style={{
                backgroundColor: segment.color,
                height: 9,
                width: 9,
                borderRadius: 2,
                marginRight: 10,
              }}
            />
            <Text key={segment.label} style={{ color: "#000", fontSize: 12 }}>
              {segment.label}: {segment.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  handleComponent: {
    // width: 40,
  },
});
