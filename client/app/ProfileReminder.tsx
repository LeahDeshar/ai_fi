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
import * as Notifications from "expo-notifications";

// Schedule a notification
const scheduleNotification = async (title, body, time) => {
  console.log("called 3");
  const trigger = new Date(time);
  console.log(title, body, time);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: new Date(Date.now() + 60 * 1000),
  });
  console.log(new Date(Date.now() + 60 * 1000));
  alert(`Notification scheduled for ${trigger.toLocaleTimeString()}`);
};
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
  // fetchReminder();
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

  const handleGlobalToggleSwitch = async (value) => {
    setAllowReminders(value);
    console.log(value);
    let updatedMealReminders = { ...mealReminders };
    if (!value) {
      setExerciseReminder(false);
      setFastingReminder(false);
      updatedMealReminders = Object.keys(updatedMealReminders).reduce(
        (acc, meal) => ({
          ...acc,
          [meal]: { ...updatedMealReminders[meal], enabled: false },
        }),
        {}
      );
    }

    await updateReminder({
      updates: {
        allowReminders: value,
      },
    }).unwrap();

    fetchReminder();
  };

  const handleExeToggleSwitch = async (value) => {
    setExerciseReminder(value);
    console.log(value, exerciseReminder, exerciseReminderTime);

    await updateReminder({
      updates: {
        exerciseReminder: {
          enabled: value,
          time: exerciseReminderTime,
        },
      },
    }).unwrap();

    fetchReminder();
  };

  const handleFastingToggleSwitch = async (value) => {
    setFastingReminder(value);

    await updateReminder({
      updates: {
        fastingReminder: {
          enabled: value,
          time: fastingReminderTime,
        },
      },
    }).unwrap();

    fetchReminder();
  };
  const handleToggleSwitch = async (name, value, globalValue) => {
    console.log(name, value, globalValue);
    // Create a copy of the meal reminders to update
    let updatedMealReminders = { ...mealReminders };

    if (name === "allowReminders") {
      // Update the global "allowReminders" state
      setAllowReminders(globalValue);
      if (!value) {
        // If "allowReminders" is turned off, reset all other reminders to false
        setExerciseReminder(false);
        setFastingReminder(false);
        updatedMealReminders = Object.keys(updatedMealReminders).reduce(
          (acc, meal) => ({
            ...acc,
            [meal]: { ...updatedMealReminders[meal], enabled: false },
          }),
          {}
        );
      }
    } else if (name === "exerciseReminder") {
      setExerciseReminder(value);
    } else if (name === "fastingReminder") {
      setFastingReminder(value);
      console.log("yeah", value);
    } else {
      updatedMealReminders = {
        ...updatedMealReminders,
        [name]: { ...updatedMealReminders[name], enabled: value },
      };
    }
    console.log(name, value, globalValue);

    await updateReminder({
      updates: {
        allowReminders: globalValue,
        exerciseReminder: {
          enabled: exerciseReminder,
          time: exerciseReminderTime,
        },
        fastingReminder: {
          enabled: fastingReminder,
          time: fastingReminderTime,
        },
        mealReminders: updatedMealReminders,
      },
    }).unwrap();

    fetchReminder();

    console.log({
      updates: {
        allowReminders: globalValue,
        exerciseReminder: {
          enabled: exerciseReminder,
          time: exerciseReminderTime,
        },
        fastingReminder: {
          enabled: fastingReminder,
          time: fastingReminderTime,
        },
        mealReminders: updatedMealReminders,
      },
    });
  };

  const handleTimeChange = async (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowTimePicker({ show: false, type: "", meal: "" });

    let updatedMealReminders = { ...mealReminders };

    if (showTimePicker.type === "meal") {
      updatedMealReminders = {
        ...mealReminders,
        [showTimePicker.meal]: {
          ...mealReminders[showTimePicker.meal],
          time: currentDate,
        },
      };

      const meal = showTimePicker.meal;
      setMealReminders((prev) => ({
        ...prev,
        [meal]: { ...prev[meal], time: currentDate },
      }));
      await scheduleNotification(
        `Time for ${meal}`,
        `It's time to have your ${meal}.`,
        currentDate
      );
      setMealReminders(updatedMealReminders);
    } else if (showTimePicker.type === "exercise") {
      console.log("exercise", currentDate);
      setExerciseReminderTime(currentDate);
      await scheduleNotification(
        "Exercise Reminder",
        "Time to exercise! Let's stay fit!",
        currentDate
      );
    } else if (showTimePicker.type === "fasting") {
      setFastingReminderTime(currentDate);
      await scheduleNotification(
        "Fasting Reminder",
        "It's time to start fasting!",
        currentDate
      );
    }

    await updateReminder({
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
        mealReminders: updatedMealReminders,
      },
    }).unwrap();

    fetchReminder();
  };

  // const handleTimeChange = (event, selectedDate) => {
  //   console.log("called");
  //   if (event.type === "dismissed") {
  //     // User dismissed the picker
  //     setShowTimePicker({ show: false, type: "", meal: "" });
  //     return;
  //   }

  //   const currentDate = selectedDate || new Date();
  //   setShowTimePicker({ show: false, type: "", meal: "" });

  //   let updatedMealReminders = { ...mealReminders };

  //   if (showTimePicker.type === "meal") {
  //     const meal = showTimePicker.meal;
  //     updatedMealReminders[meal] = {
  //       ...mealReminders[meal],
  //       time: currentDate,
  //     };
  //     setMealReminders(updatedMealReminders);

  //     scheduleNotification(
  //       `Time for ${meal}`,
  //       `It's time to have your ${meal}.`,
  //       currentDate
  //     );
  //   } else if (showTimePicker.type === "exercise") {
  //     console.log("exercise", currentDate);
  //     setExerciseReminderTime(currentDate);

  //     scheduleNotification(
  //       "Exercise Reminder",
  //       "Time to exercise! Let's stay fit!",
  //       currentDate
  //     );
  //   } else if (showTimePicker.type === "fasting") {
  //     console.log("called 2", currentDate);
  //     setFastingReminderTime(currentDate);

  //     scheduleNotification(
  //       "Fasting Reminder",
  //       "It's time to start fasting!",
  //       currentDate
  //     );
  //   }

  //   updateReminder({
  //     updates: {
  //       allowReminders,
  //       exerciseReminder: {
  //         enabled: exerciseReminder,
  //         time:
  //           showTimePicker.type === "exercise"
  //             ? currentDate
  //             : exerciseReminderTime,
  //       },
  //       fastingReminder: {
  //         enabled: fastingReminder,
  //         time:
  //           showTimePicker.type === "fasting"
  //             ? currentDate
  //             : fastingReminderTime,
  //       },
  //       mealReminders: updatedMealReminders,
  //     },
  //   }).unwrap();

  //   fetchReminder();
  // };

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
          onValueChange={(value) => handleGlobalToggleSwitch(value)}
        />
      </View>
      <ScrollView>
        {allowReminders && (
          <View>
            {/* WORKOUTS SECTION */}
            <View
              style={{
                marginVertical: 20,
              }}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                WORKOUTS
              </Text>
              <View style={styles.row}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Remind me to exercise
                </Text>
                <Switch
                  value={exerciseReminder}
                  onValueChange={(value) => handleExeToggleSwitch(value)}
                />
              </View>
            </View>
            {exerciseReminder && (
              <View style={styles.row}>
                <Text style={[styles.label, { color: colors.opacity }]}>
                  Remind time
                </Text>
                <Button
                  title={exerciseReminderTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  onPress={() => showTimePickerModal("exercise")}
                />
              </View>
            )}
            {showTimePicker.show && showTimePicker.type === "exercise" && (
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
                onValueChange={(value) => handleFastingToggleSwitch(value)}
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

            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, marginTop: 15 },
              ]}
            >
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
    padding: 16,
    paddingTop: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
  },
  mealRow: {
    // marginVertical: 10,
  },
});

export default ProfileReminder;
