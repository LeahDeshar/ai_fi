import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useGetAllPlaylistQuery,
  useGetUserActivityQuery,
  useUpadateUserActivityMutation,
} from "@/redux/api/apiClient";
import { useTheme } from "@/constants/ThemeProvider";
import { Circle, Svg } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Playlist = () => {
  const { colors, dark } = useTheme();
  const {
    data,
    error,
    isLoading,
    refetch: playRefetch,
  } = useGetAllPlaylistQuery();

  const [workoutTimes, setWorkoutTimes] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [setTimeRemaining, setSetTimeRemaining] = useState(30);
  const [restTimeRemaining, setRestTimeRemaining] = useState(15);
  const [isResting, setIsResting] = useState(false);
  const { data: userActivity, refetch } = useGetUserActivityQuery();
  const [updateActivity] = useUpadateUserActivityMutation();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const handleTimeChange = (
    exerciseId,
    timeInSeconds,
    estimatedCaloriesBurned
  ) => {
    // Update the workout time for a specific exercise
    const updatedTimes = { ...workoutTimes, [exerciseId]: timeInSeconds };
    setWorkoutTimes(updatedTimes);

    // Calculate total time and calories burned (excluding rest time)
    let updatedTotalTime = 0;
    let updatedTotalCalories = 0;

    Object.keys(updatedTimes).forEach((id) => {
      const time = updatedTimes[id];
      const exercise = data.find((item) => item._id === id); // Find the exercise by its ID
      if (exercise) {
        const caloriesBurnedPerSecond =
          exercise.exercises[0].estimatedCaloriesBurned / 60; // calories per second
        updatedTotalTime += time; // total time in seconds
        updatedTotalCalories += caloriesBurnedPerSecond * time;
      }
    });

    setTotalTime(updatedTotalTime);
    setTotalCalories(updatedTotalCalories);
  };

  const handleStart = () => {
    if (sessionTime === 0 || restTime === 0 || totalTime === 0) {
      Alert.alert(
        "Invalid Input",
        "Please set session time, rest time, and workout details."
      );
      return;
    }

    generateWorkoutPlan();
    setModalVisible(true);
  };

  const generateWorkoutPlan = () => {
    const sets = [];
    const totalWorkoutTime = Object.values(workoutTimes).reduce(
      (acc, time) => acc + time,
      0
    );
    const numSets = Math.ceil(totalWorkoutTime / sessionTime);
    for (let setIndex = 1; setIndex <= numSets; setIndex++) {
      let set = [];
      let remainingTime = totalWorkoutTime;

      data.forEach((item) => {
        if (remainingTime <= 0) return;

        const exerciseTime = workoutTimes[item._id] || 0;
        const sessionDuration = Math.min(sessionTime, exerciseTime);
        set.push(
          `Set ${setIndex}: ${sessionDuration} sec of ${item.exercises[0].name}`
        );

        remainingTime -= sessionDuration;

        // Add rest time if there’s more time left in the set
        if (remainingTime > 0) {
          set.push(`Rest: ${restTime} sec`);
          remainingTime -= restTime;
        }
      });

      sets.push(set);
    }

    setWorkoutPlan(sets);
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
  };
  const nextExercise = async () => {
    if (currentExerciseIndex + 1 < workoutPlan[currentSetIndex].length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      if (isResting) {
        setRestTimeRemaining(10);
        setIsResting(false);
        setSetTimeRemaining(40);
      } else {
        setSetTimeRemaining(40);
      }
    } else if (currentSetIndex + 1 < workoutPlan.length) {
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentExerciseIndex(0);
      setIsResting(false);
      setSetTimeRemaining(40);
      setRestTimeRemaining(10);
    } else {
      setWorkoutStarted(false);
      console.log("workout completed");
      await updateActivity({
        calorieIntake: userActivity?.activity?.calorieIntake + totalCalories,
      }).unwrap();
      refetch();
    }
  };

  useEffect(() => {
    let interval;

    if (workoutStarted) {
      if (setTimeRemaining > 0 && !isResting) {
        interval = setInterval(() => {
          setSetTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
      } else if (setTimeRemaining === 0 && !isResting) {
        setIsResting(true);
        nextExercise();
      } else if (restTimeRemaining > 0 && isResting) {
        interval = setInterval(() => {
          setRestTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
      } else if (restTimeRemaining === 0 && isResting) {
        setIsResting(false);
        nextExercise();
      }
    }

    return () => clearInterval(interval);
  }, [setTimeRemaining, restTimeRemaining, workoutStarted, isResting]);

  const renderCircularProgress = (timeRemaining, maxTime) => {
    const strokeWidth = 5;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (timeRemaining / maxTime) * circumference;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Svg width={180} height={180}>
          <Circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#d3d3d3"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="90"
            cy="90"
            r={radius}
            stroke={isResting ? "#FF6347" : "#4CAF50"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            rotation="360"
            origin="90, 90"
          />
        </Svg>
        <Text
          style={{
            position: "absolute",
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {timeRemaining}s
        </Text>
      </View>
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setWorkoutStarted(false);
    setCurrentSetIndex(0);
    setCurrentExerciseIndex(0);
    setSetTimeRemaining(30);
    setRestTimeRemaining(15);
    setIsResting(false);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 130,
        paddingHorizontal: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {data?.map((item, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item?.exercises[0].name}
            </Text>
            <Text
              style={{
                color: colors.text,
              }}
            >
              Body Part: {item?.exercises[0].bodyPart}
            </Text>
            <Text
              style={{
                color: colors.text,
              }}
            >
              Equipment: {item?.exercises[0].equipment}
            </Text>
            <Text
              style={{
                color: colors.text,
              }}
            >
              Calories Burned per Minute:{" "}
              {item?.exercises[0].estimatedCaloriesBurned}
            </Text>

            <TextInput
              style={{
                borderWidth: 1,
                padding: 10,
                marginVertical: 10,
                backgroundColor: colors.opacity,
                color: colors.text,
                borderRadius: 8,
              }}
              placeholder="Enter time in seconds"
              keyboardType="numeric"
              onChangeText={(text) =>
                handleTimeChange(
                  item._id,
                  parseFloat(text),
                  item?.exercises[0].estimatedCaloriesBurned
                )
              }
            />
          </View>
        ))}

        <View style={{ marginVertical: 16 }}>
          <Text style={{ color: colors.text, marginBottom: 8 }}>
            Session Time (seconds):
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
              backgroundColor: colors.opacity,
              color: colors.text,
              borderRadius: 8,
            }}
            keyboardType="numeric"
            value={sessionTime.toString()}
            onChangeText={(text) => setSessionTime(parseInt(text, 10) || 0)}
          />
        </View>
        <View>
          <Text style={{ color: colors.text, marginBottom: 8 }}>
            Rest Time (seconds):
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
              backgroundColor: colors.opacity,
              color: colors.text,
              borderRadius: 8,
            }}
            keyboardType="numeric"
            value={restTime.toString()}
            onChangeText={(text) => setRestTime(parseInt(text, 10) || 0)}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            padding: 15,
            backgroundColor: colors.opacity,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Total Workout Time: {Math.floor(totalTime / 60)} minutes{" "}
            {totalTime % 60} seconds
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Total Calories Burned (excluding rest time):{" "}
            {totalCalories.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 12,
            borderRadius: 8,
            marginTop: 16,
            alignItems: "center",
          }}
          onPress={handleStart}
        >
          <Text style={{ color: colors.text, fontWeight: "bold" }}>
            Prepare Workout
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: 20,
            justifyContent: "center",
          }}
        >
          {!workoutStarted ? (
            <>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Your Workout Plan
              </Text>
              {workoutPlan.length > 0 ? (
                workoutPlan.map((set, setIndex) => (
                  <View key={setIndex} style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Set {setIndex + 1}
                    </Text>
                    {set.map((exercise, exerciseIndex) => (
                      <Text key={exerciseIndex} style={{ color: colors.text }}>
                        {exercise}
                      </Text>
                    ))}
                  </View>
                ))
              ) : (
                <Text style={{ color: colors.text }}>Generating plan...</Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 28,
                    marginTop: 16,
                    alignItems: "center",
                  }}
                  onPress={handleCloseModal}
                >
                  <Text style={{ color: colors.text, fontWeight: "bold" }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 28,
                    marginTop: 16,
                    alignItems: "center",
                  }}
                  onPress={startWorkout}
                >
                  <Text style={{ color: colors.text, fontWeight: "bold" }}>
                    Start Workout
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            // Display the workout progress
            // <View>
            //   <Text style={{ color: colors.text, fontSize: 18 }}>
            //     {workoutPlan[currentSetIndex][currentExerciseIndex]}
            //   </Text>
            //   <Text style={{ color: colors.text, fontSize: 16 }}>
            //     {isResting
            //       ? `Rest Time Remaining: ${restTimeRemaining}s`
            //       : `Exercise Time Remaining: ${setTimeRemaining}s`}
            //   </Text>

            //   <TouchableOpacity
            //     style={{
            //       backgroundColor: colors.primary,
            //       padding: 12,
            //       borderRadius: 8,
            //       marginTop: 16,
            //       alignItems: "center",
            //     }}
            //     onPress={nextExercise}
            //   >
            //     <Text style={{ color: colors.text, fontWeight: "bold" }}>
            //       Next Exercise
            //     </Text>
            //   </TouchableOpacity>
            // </View>

            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 25,
                  marginVertical: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Workout Session
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Current: {workoutPlan[currentSetIndex][currentExerciseIndex]}
              </Text>

              {renderCircularProgress(
                isResting ? restTimeRemaining : setTimeRemaining,
                isResting ? 15 : 30
              )}
              <View
                style={{
                  alignItems: "flex-end",
                  marginTop: 20,
                }}
              >
                {currentExerciseIndex + 1 <
                  workoutPlan[currentSetIndex].length && (
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      marginTop: 10,
                    }}
                  >
                    Next:{" "}
                    {workoutPlan[currentSetIndex][currentExerciseIndex + 1]}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 28,
                    marginTop: 16,
                    alignItems: "center",
                  }}
                  onPress={handleCloseModal}
                >
                  <Text style={{ color: colors.text, fontWeight: "bold" }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 28,
                    marginTop: 16,
                    alignItems: "center",
                  }}
                  onPress={nextExercise}
                >
                  <AntDesign name="arrowright" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
              alignItems: "center",
            }}
            onPress={handleCloseModal}
          >
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              Close
            </Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Playlist;
