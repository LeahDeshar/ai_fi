import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import { setGoalWeight } from "@/redux/slices/profileSlice";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/apiClient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const ProfileTargetWeightScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  // const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { user, token, isLoggedIn, isRegProcess } = useSelector(
    (state) => state.auth
  );
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();

  useEffect(() => {
    if (profile && profile.profileOfUsers) {
      const preferredUnits = profile.profileOfUsers.preferredUnits;

      if (preferredUnits === "metric") {
        setUnit("kg");
        setWeight(profile.profileOfUsers.goalWeight.kilograms.toString());
      } else if (preferredUnits === "imperial") {
        setUnit("lbs");
        setWeight(profile.profileOfUsers.goalWeight.pounds.toString());

        // setWeight(heightParts[0]);
        // setInches(heightParts[1] || "");
      }
    }
  }, [profile]);

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleNext = async () => {
    if (isLoggedIn) {
      if (profile.profileOfUsers.preferredUnits == "metric") {
        const profileData = {
          goalWeight: {
            kilograms: weight,
          },
        };

        try {
          await updateProfile(profileData).unwrap();
          await refetch();
          navigation.navigate("MyProfile");
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      }
    } else if (isRegProcess) {
      if (unit == "kg") {
        dispatch(
          setGoalWeight({
            goalWeight: {
              kilograms: weight,
            },
          })
        );
      } else if (unit == "lbs") {
        dispatch(
          setGoalWeight({
            goalWeight: {
              pounds: weight,
            },
          })
        );
      }
      // dispatch(setGoalWeight(weight));
      navigation.push("ProfileFitness");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 80 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Your Goal Weight
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

        {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 16,
            backgroundColor: colors.primary,
            top: 135,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleNext}
        >
          <Text style={styles.saveButtonText}>
            {" "}
            {isLoggedIn ? "SAVE" : "CONTINUE"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileTargetWeightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 16,
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
    color: "white",
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
    backgroundColor: "#DF4041",
    top: 135,
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
