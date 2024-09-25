import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

const ProfileDailyStepsScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
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
      <Text
        style={{
          color: colors.text,
          fontSize: 35,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 150,
          paddingBottom: 20,
        }}
      >
        Select Your Daily Steps:
      </Text>
      <View
        style={{
          paddingVertical: 15,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <Text
          style={{
            color: colors.tabIconDefault,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Your Recommended Daily Steps is 10000
        </Text>
      </View>

      <View style={styles.pickerContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 20,
              textAlign: "center",
              marginRight: 30,
            }}
          >
            {dailyGoal}
          </Text>
          <Text
            style={{
              color: colors.tabIconDefault,
              fontSize: 25,
              textAlign: "center",
            }}
          >
            Steps
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            width: "20%",
            right: 45,
            borderBottomColor: colors.tabIconDefault,
          }}
        />
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
      <View
        style={{
          marginBottom: 50,
        }}
      >
        <Button
          title="Save"
          handlePress={() => {
            navigation.push("ProfileDietType");
          }}
        />
      </View>
    </View>
  );
};

export default ProfileDailyStepsScreen;

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: "80%",
    // marginTop: 150,
  },
  picker: {
    height: 50,
    width: "100%",
    marginTop: 50,
  },
  selectedGoal: {
    marginTop: 20,
    fontSize: 18,
  },
});
