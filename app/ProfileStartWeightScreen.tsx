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
import Button from "@/components/Button";

const ProfileStartWeightScreen = () => {
  const { colors } = useTheme();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
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

  console.log(unit);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Your Starting weight
      </Text>
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
              unit === "lbs" && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setUnit("lbs")}
          >
            <Text
              style={[
                unit === "lbs" ? styles.activeUnitText : styles.unitText,
                {
                  color: colors.text,
                },
              ]}
            >
              lbs
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
              unit === "kg" && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setUnit("kg")}
          >
            <Text
              style={[
                unit === "kg" ? styles.activeUnitText : styles.unitText,
                {
                  color: colors.text,
                },
              ]}
            >
              Kg
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
            {unit === "kg" ? "kg" : "lbs"}
          </Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      {/* 
      <View
        style={
          {
            // width: 200,
            // justifyContent: "center",
          }
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: colors.opacity,
            borderRadius: 75,
          }}
        >
          <TouchableOpacity
            style={{
              paddingRight: 20,
              backgroundColor: colors.primary,
              // flex: 1
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 30,
              }}
            >
              lbs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: colors.text,
                fontSize: 30,
              }}
            >
              kg
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            fontSize: 18,
            borderBottomColor: colors.text,
            color: colors.text,
            width: 100,
          }}
          autoFocus={true}
          placeholderTextColor={colors.text}
        />
        <Text
          style={{
            color: colors.text,
          }}
        >
          kg
        </Text>
      </View>
      <View
        style={[styles.buttonContainer, { backgroundColor: colors.background }]}
      >
        <Button
          title="SAVE"
          style={{
            backgroundColor: colors.primary,
          }}
        />
      </View> */}
    </KeyboardAvoidingView>
    // </View>
  );
};

export default ProfileStartWeightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
