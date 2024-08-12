import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/constants/ThemeProvider";

const ProfileDailyStepsScreen = () => {
  const { colors } = useTheme();
  const [dailyGoal, setDailyGoal] = useState(3000);

  const generateStepOptions = () => {
    let options = [];
    for (let i = 3000; i <= 20000; i += 1000) {
      options.push(i);
    }
    return options;
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dailyGoal}
          style={[styles.picker]}
          itemStyle={{
            color: colors.text,
          }}
          onValueChange={(itemValue) => setDailyGoal(itemValue)}
        >
          {generateStepOptions().map((step) => (
            <Picker.Item
              style={{
                backgroundColor: colors.primary,
              }}
              key={step}
              label={`${step} steps`}
              value={step}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default ProfileDailyStepsScreen;

const styles = StyleSheet.create({
  pickerContainer: {
    width: "80%",
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selectedGoal: {
    marginTop: 20,
    fontSize: 18,
  },
});
