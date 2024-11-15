// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   Alert,
//   KeyboardAvoidingView,
// } from "react-native";
// import React, { useState } from "react";
// import { useGetAllPlaylistQuery } from "@/redux/api/apiClient";
// import { useTheme } from "@/constants/ThemeProvider";

// const Playlist = () => {
//   const { colors, dark } = useTheme();
//   const { data, error, isLoading } = useGetAllPlaylistQuery();
//   const [workoutTimes, setWorkoutTimes] = useState({});
//   const [totalCalories, setTotalCalories] = useState(0);
//   const [totalTime, setTotalTime] = useState(0); // total time in seconds
//   const [restTime, setRestTime] = useState(0); // rest time in seconds
//   const [sessionTime, setSessionTime] = useState(0); // session time in seconds

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   const handleTimeChange = (
//     exerciseId,
//     timeInSeconds,
//     estimatedCaloriesBurned
//   ) => {
//     // Update the workout time for a specific exercise
//     const updatedTimes = { ...workoutTimes, [exerciseId]: timeInSeconds };
//     setWorkoutTimes(updatedTimes);

//     // Calculate total time and calories burned (excluding rest time)
//     let updatedTotalTime = 0;
//     let updatedTotalCalories = 0;

//     Object.keys(updatedTimes).forEach((id) => {
//       const time = updatedTimes[id];
//       const exercise = data.find((item) => item._id === id); // Find the exercise by its ID
//       if (exercise) {
//         const caloriesBurnedPerSecond =
//           exercise.exercises[0].estimatedCaloriesBurned / 60; // calories per second
//         updatedTotalTime += time; // total time in seconds
//         updatedTotalCalories += caloriesBurnedPerSecond * time;
//       }
//     });

//     setTotalTime(updatedTotalTime);
//     setTotalCalories(updatedTotalCalories);
//   };

//   const handleStart = () => {
//     if (sessionTime === 0 || restTime === 0 || totalTime === 0) {
//       Alert.alert(
//         "Invalid Input",
//         "Please set session time, rest time, and workout details."
//       );
//       return;
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.background,
//         paddingTop: 130,
//         paddingHorizontal: 20,
//       }}
//     >
//       <KeyboardAvoidingView
//         behavior="padding"
//         style={{
//           flex: 1,
//           backgroundColor: colors.background,
//         }}
//       >
//         {data?.map((item, index) => (
//           <View key={index} style={{ marginBottom: 20 }}>
//             <Text
//               style={{
//                 color: colors.text,
//                 fontSize: 18,
//                 fontWeight: "bold",
//               }}
//             >
//               {item?.exercises[0].name}
//             </Text>
//             <Text
//               style={{
//                 color: colors.text,
//               }}
//             >
//               Body Part: {item?.exercises[0].bodyPart}
//             </Text>
//             <Text
//               style={{
//                 color: colors.text,
//               }}
//             >
//               Equipment: {item?.exercises[0].equipment}
//             </Text>
//             <Text
//               style={{
//                 color: colors.text,
//               }}
//             >
//               Calories Burned per Minute:{" "}
//               {item?.exercises[0].estimatedCaloriesBurned}
//             </Text>

//             <TextInput
//               style={{
//                 borderWidth: 1,
//                 padding: 10,
//                 marginVertical: 10,
//                 backgroundColor: colors.opacity,
//                 color: colors.text,
//                 borderRadius: 8,
//               }}
//               placeholder="Enter time in seconds"
//               keyboardType="numeric"
//               onChangeText={(text) =>
//                 handleTimeChange(
//                   item._id,
//                   parseFloat(text),
//                   item?.exercises[0].estimatedCaloriesBurned
//                 )
//               }
//             />

//             <Text
//               style={{
//                 color: colors.text,
//               }}
//             >
//               Total Calories Burned for this exercise:{" "}
//               {(
//                 (workoutTimes[item._id] || 0) *
//                 (item?.exercises[0].estimatedCaloriesBurned / 60)
//               ).toFixed(2)}
//             </Text>
//           </View>
//         ))}

//         <View style={{ marginVertical: 16 }}>
//           <Text style={{ color: colors.text, marginBottom: 8 }}>
//             Session Time (seconds):
//           </Text>
//           <TextInput
//             style={{
//               borderWidth: 1,
//               borderColor: colors.text,
//               color: colors.text,
//               padding: 4,
//               borderRadius: 4,
//               width: 100,
//               textAlign: "center",
//             }}
//             keyboardType="numeric"
//             value={sessionTime.toString()}
//             onChangeText={(text) => setSessionTime(parseInt(text, 10) || 0)}
//           />
//         </View>
//         <View>
//           <Text style={{ color: colors.text, marginBottom: 8 }}>
//             Rest Time (seconds):
//           </Text>
//           <TextInput
//             style={{
//               borderWidth: 1,
//               borderColor: colors.text,
//               color: colors.text,
//               padding: 4,
//               borderRadius: 4,
//               width: 100,
//               textAlign: "center",
//             }}
//             keyboardType="numeric"
//             value={restTime.toString()}
//             onChangeText={(text) => setRestTime(parseInt(text, 10) || 0)}
//           />
//         </View>

//         <View
//           style={{
//             marginTop: 20,
//             padding: 15,
//             backgroundColor: colors.opacity,
//             borderRadius: 10,
//           }}
//         >
//           <Text
//             style={{
//               color: colors.text,
//               fontSize: 18,
//               fontWeight: "bold",
//             }}
//           >
//             Total Workout Time: {Math.floor(totalTime / 60)} minutes{" "}
//             {totalTime % 60} seconds
//           </Text>
//           <Text
//             style={{
//               color: colors.text,
//               fontSize: 18,
//               fontWeight: "bold",
//             }}
//           >
//             Total Calories Burned (excluding rest time):{" "}
//             {totalCalories.toFixed(2)}
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             backgroundColor: colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             marginTop: 16,
//             alignItems: "center",
//           }}
//           onPress={handleStart}
//         >
//           <Text style={{ color: colors.text, fontWeight: "bold" }}>
//             Start Workout
//           </Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default Playlist;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGetAllPlaylistQuery } from "@/redux/api/apiClient";
import { useTheme } from "@/constants/ThemeProvider";

const Playlist = () => {
  const { colors, dark } = useTheme();
  const { data, error, isLoading } = useGetAllPlaylistQuery();
  const [workoutTimes, setWorkoutTimes] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0); // total time in seconds
  const [restTime, setRestTime] = useState(0); // rest time in seconds
  const [sessionTime, setSessionTime] = useState(0); // session time in seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState([]);

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

  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [setTimeRemaining, setSetTimeRemaining] = useState(30); // in seconds
  const [restTimeRemaining, setRestTimeRemaining] = useState(15); // in seconds
  const [isResting, setIsResting] = useState(false);

  const startWorkout = () => {
    setWorkoutStarted(true);
  };
  const nextExercise = () => {
    if (currentExerciseIndex + 1 < workoutPlan[currentSetIndex].length) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      if (isResting) {
        setRestTimeRemaining(15);
        setIsResting(false);
        setSetTimeRemaining(30);
      } else {
        setSetTimeRemaining(30);
      }
    } else if (currentSetIndex + 1 < workoutPlan.length) {
      setCurrentSetIndex(currentSetIndex + 1);
      setCurrentExerciseIndex(0);
      setIsResting(false);
      setSetTimeRemaining(30);
      setRestTimeRemaining(15);
    } else {
      setWorkoutStarted(false);
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 130,
        paddingHorizontal: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
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
              borderColor: colors.text,
              color: colors.text,
              padding: 4,
              borderRadius: 4,
              width: 100,
              textAlign: "center",
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
              borderColor: colors.text,
              color: colors.text,
              padding: 4,
              borderRadius: 4,
              width: 100,
              textAlign: "center",
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
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Your Workout Plan
          </Text>
          {/* {workoutPlan.length > 0 ? (
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
          )} */}

          {!workoutStarted ? (
            <>
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

              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 16,
                  alignItems: "center",
                }}
                onPress={startWorkout}
              >
                <Text style={{ color: colors.text, fontWeight: "bold" }}>
                  Start Workout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            // Display the workout progress
            <View>
              <Text style={{ color: colors.text, fontSize: 18 }}>
                {workoutPlan[currentSetIndex][currentExerciseIndex]}
              </Text>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                {isResting
                  ? `Rest Time Remaining: ${restTimeRemaining}s`
                  : `Exercise Time Remaining: ${setTimeRemaining}s`}
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 16,
                  alignItems: "center",
                }}
                onPress={nextExercise}
              >
                <Text style={{ color: colors.text, fontWeight: "bold" }}>
                  Next Exercise
                </Text>
              </TouchableOpacity>
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
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              Start Workout
            </Text>
          </TouchableOpacity> */}
        </View>
      </Modal>
    </View>
  );
};

export default Playlist;

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Modal,
//   Alert,
//   TextInput,
//   KeyboardAvoidingView,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useGetAllPlaylistQuery } from "@/redux/api/apiClient";
// import { useTheme } from "@/constants/ThemeProvider";

// const Playlist = () => {
//   const { colors, dark } = useTheme();
//   const { data, error, isLoading } = useGetAllPlaylistQuery();
//   const [workoutTimes, setWorkoutTimes] = useState({});
//   const [totalCalories, setTotalCalories] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [restTime, setRestTime] = useState(0);
//   const [sessionTime, setSessionTime] = useState(0);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentSet, setCurrentSet] = useState(0);
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
//   const [timeRemaining, setTimeRemaining] = useState(0);
//   const [isRestTime, setIsRestTime] = useState(false);
//   const [timerActive, setTimerActive] = useState(false);
//   const [plan, setPlan] = useState([]);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   const handleTimeChange = (
//     exerciseId,
//     timeInSeconds,
//     estimatedCaloriesBurned
//   ) => {
//     // Update the workout time for a specific exercise
//     const updatedTimes = { ...workoutTimes, [exerciseId]: timeInSeconds };
//     setWorkoutTimes(updatedTimes);

//     // Calculate total time and calories burned
//     let updatedTotalTime = 0;
//     let updatedTotalCalories = 0;

//     Object.keys(updatedTimes).forEach((id) => {
//       const time = updatedTimes[id];
//       const exercise = data.find((item) => item._id === id);
//       if (exercise) {
//         const caloriesBurned = exercise.exercises[0].estimatedCaloriesBurned;
//         updatedTotalTime += time;
//         updatedTotalCalories += (caloriesBurned / 60) * time; // Calories per minute * time in minutes
//       }
//     });

//     setTotalTime(updatedTotalTime);
//     setTotalCalories(updatedTotalCalories);
//   };

//   const handleStart = () => {
//     if (sessionTime === 0 || restTime === 0 || totalTime === 0) {
//       Alert.alert(
//         "Invalid Input",
//         "Please set session time, rest time, and workout details."
//       );
//       return;
//     }

//     // Generate the workout plan when the user clicks "Start"
//     generatePlan();
//     setModalVisible(true);
//   };

//   const generatePlan = () => {
//     let workoutPlan = [];
//     const totalWorkoutTime = totalTime + restTime * data.length; // Total workout + rest time for each exercise
//     const totalSets = Math.ceil(totalWorkoutTime / (sessionTime + restTime)); // Number of sets

//     for (let setIndex = 0; setIndex < totalSets; setIndex++) {
//       const set = [];
//       data.forEach((item) => {
//         set.push(`${sessionTime} sec: ${item?.exercises[0].name}`);
//         set.push(`Rest: ${restTime} sec`);
//       });
//       workoutPlan.push(set);
//     }

//     setPlan(workoutPlan);
//     startTimer();
//   };

//   const startTimer = () => {
//     setTimerActive(true);
//     let timeLeft = sessionTime; // Start with session time

//     const timer = setInterval(() => {
//       if (timeLeft <= 0) {
//         // Move to the next exercise or rest period
//         if (isRestTime) {
//           setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
//           setIsRestTime(false);
//           timeLeft = sessionTime; // Reset to session time
//         } else {
//           setIsRestTime(true);
//           timeLeft = restTime; // Set to rest time
//         }
//       } else {
//         setTimeRemaining(timeLeft);
//         timeLeft--;
//       }

//       if (currentExerciseIndex >= plan.length) {
//         clearInterval(timer);
//         Alert.alert("Workout Complete", "You have completed your workout.");
//         setTimerActive(false);
//       }
//     }, 1000);
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: colors.background,
//         paddingTop: 130,
//         paddingHorizontal: 20,
//       }}
//     >
//       <KeyboardAvoidingView
//         behavior="padding"
//         style={{
//           flex: 1,
//           backgroundColor: colors.background,
//         }}
//       >
//         {data?.map((item, index) => (
//           <View key={index} style={{ marginBottom: 20 }}>
//             <Text
//               style={{
//                 color: colors.text,
//                 fontSize: 18,
//                 fontWeight: "bold",
//               }}
//             >
//               {item?.exercises[0].name}
//             </Text>
//             <Text style={{ color: colors.text }}>
//               Body Part: {item?.exercises[0].bodyPart}
//             </Text>
//             <Text style={{ color: colors.text }}>
//               Equipment: {item?.exercises[0].equipment}
//             </Text>
//             <Text style={{ color: colors.text }}>
//               Calories Burned per Minute:{" "}
//               {item?.exercises[0].estimatedCaloriesBurned}
//             </Text>

//             <TextInput
//               style={{
//                 borderWidth: 1,
//                 padding: 10,
//                 marginVertical: 10,
//                 backgroundColor: colors.opacity,
//                 color: colors.text,
//                 borderRadius: 8,
//               }}
//               placeholder="Enter time in seconds"
//               keyboardType="numeric"
//               onChangeText={(text) =>
//                 handleTimeChange(
//                   item._id,
//                   parseInt(text) || 0,
//                   item?.exercises[0].estimatedCaloriesBurned
//                 )
//               }
//             />
//           </View>
//         ))}

//         <View style={{ marginVertical: 16 }}>
//           <Text style={{ color: colors.text, marginBottom: 8 }}>
//             Session Time (sec):
//           </Text>
//           <TextInput
//             style={{
//               borderWidth: 1,
//               borderColor: colors.text,
//               color: colors.text,
//               padding: 4,
//               borderRadius: 4,
//               width: 100,
//               textAlign: "center",
//             }}
//             keyboardType="numeric"
//             value={sessionTime.toString()}
//             onChangeText={(text) => setSessionTime(parseInt(text, 10) || 0)}
//           />
//         </View>

//         <View>
//           <Text style={{ color: colors.text, marginBottom: 8 }}>
//             Rest Time (sec):
//           </Text>
//           <TextInput
//             style={{
//               borderWidth: 1,
//               borderColor: colors.text,
//               color: colors.text,
//               padding: 4,
//               borderRadius: 4,
//               width: 100,
//               textAlign: "center",
//             }}
//             keyboardType="numeric"
//             value={restTime.toString()}
//             onChangeText={(text) => setRestTime(parseInt(text, 10) || 0)}
//           />
//         </View>

//         <TouchableOpacity
//           style={{
//             backgroundColor: colors.primary,
//             padding: 12,
//             borderRadius: 8,
//             marginTop: 16,
//             alignItems: "center",
//           }}
//           onPress={handleStart}
//         >
//           <Text style={{ color: colors.text, fontWeight: "bold" }}>
//             Start Workout
//           </Text>
//         </TouchableOpacity>

//         <Modal visible={modalVisible} animationType="slide">
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: colors.background,
//               paddingHorizontal: 20,
//             }}
//           >
//             <Text style={{ color: colors.text, fontSize: 18 }}>
//               Current Set: {currentSet + 1}
//             </Text>
//             <Text style={{ color: colors.text, fontSize: 18 }}>
//               Time Remaining: {timeRemaining}s
//             </Text>
//             <Text style={{ color: colors.text, fontSize: 18 }}>
//               {isRestTime ? "Rest Time" : "Session Time"}
//             </Text>

//             <TouchableOpacity
//               style={{
//                 backgroundColor: colors.primary,
//                 padding: 12,
//                 borderRadius: 8,
//                 marginTop: 16,
//                 alignItems: "center",
//               }}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={{ color: colors.text, fontWeight: "bold" }}>
//                 Close
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default Playlist;
