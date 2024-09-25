import React, { useState } from "react";
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

const ProfileReminder = () => {
  const { colors, dark } = useTheme();
  const [allowReminders, setAllowReminders] = useState(true);
  const [exerciseReminder, setExerciseReminder] = useState(false);
  const [fastingReminder, setFastingReminder] = useState(false);
  const [mealReminders, setMealReminders] = useState({
    breakfast: { enabled: false, time: new Date(2023, 7, 15, 10, 0) },
    lunch: { enabled: false, time: new Date(2023, 7, 15, 15, 0) },
    dinner: { enabled: false, time: new Date(2023, 7, 15, 19, 0) },
  });
  const [showTimePicker, setShowTimePicker] = useState({
    show: false,
    meal: "",
  });

  const handleToggleSwitch = (name, value) => {
    if (name === "allowReminders") setAllowReminders(value);
    else if (name === "exerciseReminder") setExerciseReminder(value);
    else if (name === "fastingReminder") setFastingReminder(value);
    else
      setMealReminders({
        ...mealReminders,
        [name]: { ...mealReminders[name], enabled: value },
      });
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || mealReminders[showTimePicker.meal].time;
    setShowTimePicker({ show: false, meal: "" });
    setMealReminders({
      ...mealReminders,
      [showTimePicker.meal]: {
        ...mealReminders[showTimePicker.meal],
        time: currentDate,
      },
    });
  };

  const showTimePickerModal = (meal) => {
    setShowTimePicker({ show: true, meal });
  };

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
                        onPress={() => showTimePickerModal(meal)}
                      />
                    </View>
                    {showTimePicker.show && (
                      <DateTimePicker
                        value={mealReminders[showTimePicker.meal].time}
                        mode="time"
                        is24Hour={false}
                        // themeVariant={"light"}
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
    backgroundColor: "#F5F5F5",
    marginTop: 80,
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
