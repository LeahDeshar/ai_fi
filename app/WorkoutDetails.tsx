import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@/constants/ThemeProvider";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BlurView } from "expo-blur";
import Button from "@/components/Button";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Video } from "expo-av";

const WorkoutDetails = () => {
  const route = useRoute();
  const { work } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  //   const openBottomSheet = () => {
  //     bottomSheetModalRef.current?.present();
  //   };
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  console.log("selectedWorkout", selectedWorkout);
  const openBottomSheet = (workout) => {
    setSelectedWorkout(workout);
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
          <View style={{ flex: 1, position: "relative" }}>
            <ParallaxScrollView
              headerImage={
                <Image
                  source={{
                    uri: work?.image,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              }
              headerBackgroundColor={{ dark: "#bcbaba", light: "white" }}
            >
              <WorkoutHeader work={work} colors={colors} />

              {/* warm ups */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    WARM UP
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.warmUp.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.warmUp.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>

              {/* Set One */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    SET ONE
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.setOne.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.setOne.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>

              {/* Set Two */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    SET TWO
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.setTwo.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.setTwo.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>

              {/* Set Three */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    SET THREE
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.setThree.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.setThree.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>

              {/* Set Four */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    SET FOUR
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.setFour.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.setFour.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>
              {/* Cool down */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 30,
                    }}
                  >
                    COOL DOWN
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 15,
                      marginLeft: 10,
                      fontWeight: "semibold",
                      marginTop: 33,
                    }}
                  >
                    {work?.coolDown.length} Exercises
                  </Text>
                </View>
                <View>
                  {work?.coolDown.map((warmUp, index) => (
                    <SetListing
                      warmUp={warmUp}
                      index={warmUp}
                      openBottomSheet={openBottomSheet}
                    />
                  ))}
                </View>
              </View>
            </ParallaxScrollView>
            {/* <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={["95%"]}
              backdropComponent={BottomSheetBackdrop}
              handleComponent={() => <View />}
            >
              <Text>Hello</Text>
            </BottomSheetModal> */}
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={["25%", "95%"]}
              backdropComponent={BottomSheetBackdrop}
              handleComponent={() => <View />}
              backgroundComponent={({ style }) => (
                <View
                  style={[
                    style,
                    { backgroundColor: colors.opacity, borderRadius: 20 },
                  ]}
                />
              )}
            >
              {selectedWorkout && (
                <View
                  style={{
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={{ uri: selectedWorkout?.video }}
                      style={{ width: "100%", height: 300 }}
                    />
                  </View>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 20,
                      fontWeight: "semibold",
                      marginTop: 20,
                    }}
                  >
                    {selectedWorkout?.title}
                  </Text>

                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "semibold",
                      marginTop: 20,
                    }}
                  >
                    {selectedWorkout?.desc}
                  </Text>

                  <View>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 18,
                        fontWeight: "semibold",
                        marginTop: 20,
                      }}
                    >
                      HOW TO PERFORM
                    </Text>
                    {selectedWorkout?.howTo.map((how, index) => (
                      <Text
                        key={index}
                        style={{
                          color: colors.text,
                          marginTop: 10,
                        }}
                      >
                        {index + 1}. {how}
                      </Text>
                    ))}
                  </View>

                  <View>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 18,
                        fontWeight: "semibold",
                        marginTop: 20,
                      }}
                    >
                      TIPS
                    </Text>
                    {selectedWorkout?.tips.map((how, index) => (
                      <Text
                        key={index}
                        style={{
                          color: colors.text,
                          marginTop: 10,
                        }}
                      >
                        {index + 1}. {how}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </BottomSheetModal>

            <View
              style={{
                position: "absolute",
                top: 50,
                left: 10,
                right: 10,
                zIndex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BlurView
                  intensity={50}
                  tint="light"
                  style={{
                    borderRadius: 25,
                    padding: 8,
                    overflow: "hidden",
                  }}
                >
                  <AntDesign name="arrowleft" color={colors.text} size={20} />
                </BlurView>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginRight: 30,
                  }}
                >
                  <BlurView
                    intensity={50}
                    tint="light"
                    style={{
                      borderRadius: 25,
                      padding: 8,
                      overflow: "hidden",
                    }}
                  >
                    <AntDesign name="hearto" color={colors.text} size={20} />
                  </BlurView>
                </TouchableOpacity>
                <TouchableOpacity>
                  <BlurView
                    intensity={50}
                    tint="light"
                    style={{
                      borderRadius: 25,
                      padding: 8,
                      overflow: "hidden",
                    }}
                  >
                    <AntDesign name="download" color={colors.text} size={20} />
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default WorkoutDetails;

const WorkoutHeader = ({ colors, work }) => {
  return (
    <>
      <Text
        style={{
          color: colors.text,
          fontSize: 30,
          textAlign: "center",
          fontWeight: "semibold",
        }}
      >
        {work.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.opacity,
          borderRadius: 30,
          paddingHorizontal: 25,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            borderRadius: 25,
            paddingVertical: 18,
            paddingHorizontal: 19,
            marginRight: 20,
          }}
        >
          <SimpleLineIcons
            name="music-tone-alt"
            color={colors.icon}
            size={18}
          />
        </TouchableOpacity>
        <Button
          title="Start Workout"

          // onPress={() => navigation.navigate("WorkoutSubworkout", { work })}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.opacity,
            borderRadius: 30,
            paddingHorizontal: 25,
            paddingVertical: 5,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            🔥{work?.calorieBurn} Calories
          </Text>
          <Text
            style={{
              color: colors.text,
            }}
          >
            ⌛{work?.duration} Minutes
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.opacity,
            borderRadius: 30,
            paddingHorizontal: 25,
            paddingVertical: 5,
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: colors.text,
            }}
          >
            Focus Zone
          </Text>
          <Text
            style={{
              color: colors.text,
            }}
          >
            {work?.focusZones}
          </Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            marginLeft: 10,
            fontWeight: "semibold",
            marginTop: 30,
          }}
        >
          EQUIPMENT
        </Text>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.opacity,
            borderRadius: 25,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {work?.equipment.map((item, index) => (
            <>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: 25,
                }}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: "semibold",
                  marginVertical: 5,
                  marginLeft: 20,
                }}
              >
                {item.name}
              </Text>
              <TouchableOpacity
                style={{
                  marginRight: 30,
                  marginLeft: 110,
                }}
              >
                <BlurView
                  intensity={50}
                  tint="light"
                  style={{
                    borderRadius: 25,
                    padding: 8,
                    overflow: "hidden",
                  }}
                >
                  <MaterialCommunityIcons
                    name="dumbbell"
                    color={colors.text}
                    size={20}
                  />
                </BlurView>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </View>
    </>
  );
};

const SetListing = ({ warmUp, index, openBottomSheet }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => openBottomSheet(warmUp)}
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.opacity,
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      <Image
        source={{
          uri: warmUp?.image,
        }}
        style={{
          width: 85,
          height: 85,
          borderRadius: 20,
        }}
      />
      <View
        style={{
          marginLeft: 15,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "semibold",
          }}
        >
          {warmUp.title}
        </Text>
        <Text
          style={{
            color: colors.text,
          }}
        >
          0:{warmUp.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
