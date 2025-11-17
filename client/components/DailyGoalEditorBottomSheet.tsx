import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useUpadateUserActivityMutation } from "@/redux/api/apiClient"; // Assuming this is for updating user profile too

interface DailyGoalEditorBottomSheetProps {
  currentDailyStepGoal: number;
  onClose: () => void;
  onGoalUpdated: (newGoal: number) => void;
}

const DailyGoalEditorBottomSheet: React.FC<DailyGoalEditorBottomSheetProps> = ({
  currentDailyStepGoal,
  onClose,
  onGoalUpdated,
}) => {
  const { colors } = useTheme();
  const [newGoal, setNewGoal] = useState(String(currentDailyStepGoal));
  const [updateUserActivityGoal] = useUpadateUserActivityMutation(); // Use this mutation for updating goals

  const handleSaveGoal = useCallback(async () => {
    const parsedGoal = parseInt(newGoal, 10);
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      Alert.alert(
        "Invalid Goal",
        "Please enter a valid step goal (a positive number)."
      );
      return;
    }

    try {
      // Assuming your updateActivity mutation can handle updating the daily step goal in profile
      // If it's a separate profile update mutation, adjust here.
      await updateUserActivityGoal({ dailyStepsGoal: parsedGoal }).unwrap();
      onGoalUpdated(parsedGoal); // Notify parent component of the update
      onClose(); // Close the bottom sheet
      Alert.alert("Success", `Daily step goal updated to ${parsedGoal} steps.`);
    } catch (error) {
      console.error("Failed to update daily step goal:", error);
      Alert.alert("Error", "Failed to update goal. Please try again.");
    }
  }, [newGoal, onClose, onGoalUpdated, updateUserActivityGoal]);

  const snapPoints = useMemo(() => ["25%", "40%"], []);

  return (
    <BottomSheetView
      style={[styles.contentContainer, { backgroundColor: "#242424" }]}
    >
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Edit Daily Step Goal
        </Text>
        <TouchableOpacity onPress={handleSaveGoal}>
          <Text style={[styles.saveButtonText, { color: colors.primary }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.currentGoalLabel, { color: "white" }]}>
          Current Goal: {currentDailyStepGoal} steps
        </Text>
        <TextInput
          style={[
            styles.goalInput,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          keyboardType="numeric"
          placeholder="Enter new step goal"
          placeholderTextColor={"white"}
          value={newGoal}
          onChangeText={setNewGoal}
          returnKeyType="done"
          onSubmitEditing={handleSaveGoal}
        />
        <Text style={[styles.recommendationText, { color: "white" }]}>
          (Recommended: 7000-10000 steps/day)
        </Text>
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  currentGoalLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  goalInput: {
    width: "80%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    textAlign: "center",
  },
  recommendationText: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default DailyGoalEditorBottomSheet;
