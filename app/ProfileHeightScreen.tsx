import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { Picker } from "@react-native-picker/picker";
import Button from "@/components/Button";
const ProfileHeightScreen = () => {
  const { colors } = useTheme();

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("ft");
  const [error, setError] = useState("");
  const handleSave = () => {
    if (!weight || isNaN(weight)) {
      setError("Enter a valid weight");
    } else {
      setError("");
      // Handle save action here
      console.log(`Weight: ${weight} ${unit}`);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Text style={[styles.title, { color: colors.text }]}>Your Height</Text>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 25,
          }}
        >
          <TouchableOpacity
            style={[
              {
                flex: 1,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
              },
              unit === "ft" && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setUnit("ft")}
          >
            <Text
              style={[
                unit === "ft" ? styles.activeUnitText : styles.unitText,
                {
                  color: colors.text,
                },
              ]}
            >
              ft
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
              },
              unit === "cm" && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setUnit("cm")}
          >
            <Text
              style={[
                unit === "cm" ? styles.activeUnitText : styles.unitText,
                {
                  color: colors.text,
                },
              ]}
            >
              cm
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            autoFocus={true}
            onChangeText={setWeight}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: 30,
            }}
          >
            {unit === "ft" ? "ft" : "cm"}
          </Text>

          {unit === "ft" ? (
            <>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: 30,
                }}
              >
                in
              </Text>
            </>
          ) : (
            <Text></Text>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    width: "60%",
  },
  picker: {
    height: 200,
    width: "100%",
  },
  unitPickerContainer: {
    width: "40%",
    borderRadius: 8,
  },

  activeUnitButton: {},
  unitText: {
    fontSize: 16,
  },
  activeUnitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    width: "30%",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 24,
    textAlign: "center",
  },
  errorText: {
    color: "#f00",
    marginBottom: 24,
  },
  saveButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },

  buttonContainer: {
    paddingBottom: 80,
  },
});

export default ProfileHeightScreen;
