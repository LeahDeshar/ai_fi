import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Button,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@/constants/ThemeProvider";
import {
  useCreateReminderMutation,
  useGetReminderQuery,
} from "@/redux/api/apiClient";

// const ProfileReminder = () => {
//   const { colors, dark } = useTheme();
//   const [allowReminders, setAllowReminders] = useState(true);
//   const [exerciseReminder, setExerciseReminder] = useState(false);
//   const [exerciseReminderTime, setExerciseReminderTime] = useState(new Date());
//   const [fastingReminder, setFastingReminder] = useState(false);
//   const [fastingReminderTime, setFastingReminderTime] = useState(new Date());
//   const [mealReminders, setMealReminders] = useState({
//     breakfast: { enabled: false, time: new Date(2023, 7, 15, 10, 0) },
//     lunch: { enabled: false, time: new Date(2023, 7, 15, 15, 0) },
//     dinner: { enabled: false, time: new Date(2023, 7, 15, 19, 0) },
//   });
//   const [showTimePicker, setShowTimePicker] = useState({
//     show: false,
//     type: "",
//     meal: "",
//   });

//   const {
//     data: reminderData,
//     error: reminError,
//     isLoading: reminIsLoading,
//     refetch: fetchReminder,
//   } = useGetReminderQuery();
//   const [updateReminder] = useCreateReminderMutation();

//   useEffect(() => {
//     if (reminderData) {
//       setAllowReminders(reminderData.allowReminders);
//       setExerciseReminder(reminderData.exerciseReminder.enabled);

//       setExerciseReminderTime(new Date(reminderData.exerciseReminder.time));
//       setFastingReminder(reminderData.fastingReminder.enabled);
//       setFastingReminderTime(new Date(reminderData.fastingReminder.time));

//       setMealReminders({
//         breakfast: {
//           enabled: reminderData.mealReminders.breakfast.enabled,
//           time: new Date(
//             reminderData.mealReminders.breakfast.time || Date.now()
//           ),
//         },
//         lunch: {
//           enabled: reminderData.mealReminders.lunch.enabled,
//           time: new Date(reminderData.mealReminders.lunch.time || Date.now()),
//         },
//         dinner: {
//           enabled: reminderData.mealReminders.dinner.enabled,
//           time: new Date(reminderData.mealReminders.dinner.time || Date.now()),
//         },
//       });
//     }
//   }, [reminderData]);

//   const handleToggleSwitch = (name, value) => {
//     if (name === "allowReminders") {
//       setAllowReminders(value);
//       if (!value) {
//         setExerciseReminder(false);
//         setFastingReminder(false);
//         setMealReminders((prev) =>
//           Object.keys(prev).reduce(
//             (acc, meal) => ({
//               ...acc,
//               [meal]: { ...prev[meal], enabled: false },
//             }),
//             {}
//           )
//         );
//       }
//     } else if (name === "exerciseReminder") {
//       setExerciseReminder(value);
//     } else if (name === "fastingReminder") {
//       setFastingReminder(value);
//     } else {
//       setMealReminders((prev) => ({
//         ...prev,
//         [name]: { ...prev[name], enabled: value },
//       }));
//     }
//   };

//   const handleTimeChange = (event, selectedDate) => {
//     const currentDate = selectedDate || new Date();
//     setShowTimePicker({ show: false, type: "", meal: "" });

//     if (showTimePicker.type === "meal") {
//       setMealReminders((prev) => ({
//         ...prev,
//         [showTimePicker.meal]: {
//           ...prev[showTimePicker.meal],
//           time: currentDate,
//         },
//       }));
//     } else if (showTimePicker.type === "exercise") {
//       setExerciseReminderTime(currentDate);
//     } else if (showTimePicker.type === "fasting") {
//       setFastingReminderTime(currentDate);
//     }
//   };

//   const showTimePickerModal = (type, meal = "") => {
//     setShowTimePicker({ show: true, type, meal });
//   };

//   if (reminIsLoading) {
//     return <Text>Loading reminders...</Text>;
//   }

//   if (reminError) {
//     return <Text>Error loading reminders: {reminError.message}</Text>;
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.sectionTitle, { color: colors.text }]}>GLOBAL</Text>
//       <View style={styles.row}>
//         <Text style={[styles.label, { color: colors.text }]}>
//           Allow reminders
//         </Text>
//         <Switch
//           value={allowReminders}
//           onValueChange={(value) => handleToggleSwitch("allowReminders", value)}
//         />
//       </View>
//       <ScrollView>
//         {allowReminders && (
//           <View>
//             {/* WORKOUTS SECTION */}
//             <Text style={[styles.sectionTitle, { color: colors.text }]}>
//               WORKOUTS
//             </Text>
//             <View style={styles.row}>
//               <Text style={[styles.label, { color: colors.text }]}>
//                 Remind me to exercise
//               </Text>
//               <Switch
//                 value={exerciseReminder}
//                 onValueChange={(value) =>
//                   handleToggleSwitch("exerciseReminder", value)
//                 }
//               />
//             </View>

//             {exerciseReminder && (
//               <Button
//                 title={exerciseReminderTime.toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   // hour12: false,
//                 })}
//                 onPress={() => showTimePickerModal("exercise")}
//               />
//             )}
//             {showTimePicker.show && (
//               <DateTimePicker
//                 value={exerciseReminderTime}
//                 mode="time"
//                 is24Hour={false}
//                 display="spinner"
//                 onChange={handleTimeChange}
//               />
//             )}
//             <Text style={[styles.sectionTitle, { color: colors.text }]}>
//               FASTING
//             </Text>
//             <View style={styles.row}>
//               <Text style={[styles.label, { color: colors.text }]}>
//                 Remind me to fast
//               </Text>
//               <Switch
//                 value={fastingReminder}
//                 onValueChange={(value) =>
//                   handleToggleSwitch("fastingReminder", value)
//                 }
//               />
//             </View>

//             {fastingReminder && (
//               <>
//                 <View style={styles.row}>
//                   <Text style={[styles.label, { color: colors.text }]}>
//                     Remind time
//                   </Text>
//                   <Button
//                     title={fastingReminderTime.toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                     onPress={() => showTimePickerModal("fasting")}
//                   />
//                 </View>
//                 {showTimePicker.show && showTimePicker.type === "fasting" && (
//                   <DateTimePicker
//                     value={fastingReminderTime}
//                     mode="time"
//                     is24Hour={false}
//                     display="spinner"
//                     onChange={handleTimeChange}
//                   />
//                 )}
//               </>
//             )}

//             <Text style={[styles.sectionTitle, { color: colors.text }]}>
//               MEALS
//             </Text>
//             {Object.keys(mealReminders).map((meal) => (
//               <View key={meal} style={styles.mealRow}>
//                 <View style={styles.row}>
//                   <Text style={[styles.label, { color: colors.text }]}>
//                     {meal.charAt(0).toUpperCase() + meal.slice(1)}
//                   </Text>
//                   <Switch
//                     value={mealReminders[meal].enabled}
//                     onValueChange={(value) => handleToggleSwitch(meal, value)}
//                   />
//                 </View>

//                 {mealReminders[meal].enabled && (
//                   <>
//                     <View style={styles.row}>
//                       <Text style={[styles.label, { color: colors.text }]}>
//                         Remind time
//                       </Text>
//                       <Button
//                         title={mealReminders[meal].time.toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                         onPress={() => showTimePickerModal("meal", meal)}
//                       />
//                     </View>
//                     {showTimePicker.show &&
//                       showTimePicker.type === "meal" &&
//                       showTimePicker.meal === meal && (
//                         <DateTimePicker
//                           value={mealReminders[meal].time}
//                           mode="time"
//                           is24Hour={false}
//                           display="spinner"
//                           onChange={handleTimeChange}
//                         />
//                       )}
//                   </>
//                 )}
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

const ProfileReminder = () => {
  const { colors } = useTheme();
  const [allowReminders, setAllowReminders] = useState(true);
  const [exerciseReminder, setExerciseReminder] = useState(false);
  const [exerciseReminderTime, setExerciseReminderTime] = useState(new Date());
  const [fastingReminder, setFastingReminder] = useState(false);
  const [fastingReminderTime, setFastingReminderTime] = useState(new Date());
  const [mealReminders, setMealReminders] = useState({
    breakfast: { enabled: false, time: new Date(2023, 7, 15, 10, 0) },
    lunch: { enabled: false, time: new Date(2023, 7, 15, 15, 0) },
    dinner: { enabled: false, time: new Date(2023, 7, 15, 19, 0) },
  });
  const [showTimePicker, setShowTimePicker] = useState({
    show: false,
    type: "",
    meal: "",
  });

  const {
    data: reminderData,
    error: reminError,
    isLoading: reminIsLoading,
    refetch: fetchReminder,
  } = useGetReminderQuery();

  const [updateReminder] = useCreateReminderMutation();

  useEffect(() => {
    if (reminderData) {
      setAllowReminders(reminderData.allowReminders);
      setExerciseReminder(reminderData.exerciseReminder.enabled);
      setExerciseReminderTime(new Date(reminderData.exerciseReminder.time));
      setFastingReminder(reminderData.fastingReminder.enabled);
      setFastingReminderTime(new Date(reminderData.fastingReminder.time));
      setMealReminders({
        breakfast: {
          enabled: reminderData.mealReminders.breakfast.enabled,
          time: new Date(
            reminderData.mealReminders.breakfast.time || Date.now()
          ),
        },
        lunch: {
          enabled: reminderData.mealReminders.lunch.enabled,
          time: new Date(reminderData.mealReminders.lunch.time || Date.now()),
        },
        dinner: {
          enabled: reminderData.mealReminders.dinner.enabled,
          time: new Date(reminderData.mealReminders.dinner.time || Date.now()),
        },
      });
    }
  }, [reminderData]);

  const handleToggleSwitch = (name, value) => {
    if (name === "allowReminders") {
      setAllowReminders(value);
      if (!value) {
        setExerciseReminder(false);
        setFastingReminder(false);
        setMealReminders((prev) =>
          Object.keys(prev).reduce(
            (acc, meal) => ({
              ...acc,
              [meal]: { ...prev[meal], enabled: false },
            }),
            {}
          )
        );
      }
    } else if (name === "exerciseReminder") {
      setExerciseReminder(value);
    } else if (name === "fastingReminder") {
      setFastingReminder(value);
    } else {
      setMealReminders((prev) => ({
        ...prev,
        [name]: { ...prev[name], enabled: value },
      }));
    }

    // After state change, trigger update reminder API call
    // updateReminder({
    //   allowReminders,
    //   exerciseReminder: {
    //     enabled: exerciseReminder,
    //     time: exerciseReminderTime,
    //   },
    //   fastingReminder: {
    //     enabled: fastingReminder,
    //     time: fastingReminderTime,
    //   },
    //   mealReminders,
    // });
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowTimePicker({ show: false, type: "", meal: "" });

    if (showTimePicker.type === "meal") {
      setMealReminders((prev) => ({
        ...prev,
        [showTimePicker.meal]: {
          ...prev[showTimePicker.meal],
          time: currentDate,
        },
      }));
    } else if (showTimePicker.type === "exercise") {
      setExerciseReminderTime(currentDate);
    } else if (showTimePicker.type === "fasting") {
      setFastingReminderTime(currentDate);
    }

    // After state change, trigger update reminder API call
    // updateReminder({
    //   allowReminders,
    //   exerciseReminder: {
    //     enabled: exerciseReminder,
    //     time: exerciseReminderTime,
    //   },
    //   fastingReminder: {
    //     enabled: fastingReminder,
    //     time: fastingReminderTime,
    //   },
    //   mealReminders,
    // });

    console.log("time set");

    updateReminder({
      updates: {
        allowReminders: allowReminders,
        exerciseReminder: {
          enabled: exerciseReminder,
          time: exerciseReminderTime,
        },
        fastingReminder: {
          enabled: fastingReminder,
          time: fastingReminderTime,
        },
        mealReminders,
      },
    }).unwrap();
    fetchReminder();
  };

  const showTimePickerModal = (type, meal = "") => {
    setShowTimePicker({ show: true, type, meal });
  };

  if (reminIsLoading) {
    return <Text>Loading reminders...</Text>;
  }

  if (reminError) {
    return <Text>Error loading reminders: {reminError.message}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>GLOBAL</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          Allow reminders
        </Text>
        <Switch
          value={allowReminders}
          onValueChange={(value) => handleToggleSwitch("allowReminders", value)}
        />
      </View>
      <ScrollView>
        {allowReminders && (
          <View>
            {/* WORKOUTS SECTION */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              WORKOUTS
            </Text>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.text }]}>
                Remind me to exercise
              </Text>
              <Switch
                value={exerciseReminder}
                onValueChange={(value) =>
                  handleToggleSwitch("exerciseReminder", value)
                }
              />
            </View>

            {exerciseReminder && (
              <Button
                title={exerciseReminderTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  // hour12: false,
                })}
                onPress={() => showTimePickerModal("exercise")}
              />
            )}
            {showTimePicker.show && (
              <DateTimePicker
                value={exerciseReminderTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={handleTimeChange}
              />
            )}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              FASTING
            </Text>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.text }]}>
                Remind me to fast
              </Text>
              <Switch
                value={fastingReminder}
                onValueChange={(value) =>
                  handleToggleSwitch("fastingReminder", value)
                }
              />
            </View>

            {fastingReminder && (
              <>
                <View style={styles.row}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    Remind time
                  </Text>
                  <Button
                    title={fastingReminderTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    onPress={() => showTimePickerModal("fasting")}
                  />
                </View>
                {showTimePicker.show && showTimePicker.type === "fasting" && (
                  <DateTimePicker
                    value={fastingReminderTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeChange}
                  />
                )}
              </>
            )}

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              MEALS
            </Text>
            {Object.keys(mealReminders).map((meal) => (
              <View key={meal} style={styles.mealRow}>
                <View style={styles.row}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </Text>
                  <Switch
                    value={mealReminders[meal].enabled}
                    onValueChange={(value) => handleToggleSwitch(meal, value)}
                  />
                </View>

                {mealReminders[meal].enabled && (
                  <>
                    <View style={styles.row}>
                      <Text style={[styles.label, { color: colors.text }]}>
                        Remind time
                      </Text>
                      <Button
                        title={mealReminders[meal].time.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        onPress={() => showTimePickerModal("meal", meal)}
                      />
                    </View>

                    {showTimePicker.show && showTimePicker.type === "meal" && (
                      <DateTimePicker
                        value={mealReminders[meal].time}
                        mode="time"
                        is24Hour={false}
                        display="spinner"
                        onChange={handleTimeChange}
                      />
                    )}
                  </>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // marginTop: 80,
    paddingTop: 110,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  mealRow: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default ProfileReminder;
