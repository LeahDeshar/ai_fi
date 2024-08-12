import React, { useRef } from "react";
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

const MoreMeals = () => {
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null); // Explicitly specify BottomSheetModal type

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
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
          <TouchableOpacity
            onPress={openBottomSheet}
            style={{
              backgroundColor: "#daf4da",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 15,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                color: "black",
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
                width: 300,
                height: 300,
                resizeMode: "center",
              }}
            />
            <Text>28/15,00 kcal</Text>
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
            handleComponent={() => <View style={styles.handleComponent} />}
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
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default MoreMeals;

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
