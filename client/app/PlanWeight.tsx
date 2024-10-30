import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { TextInput } from "react-native";

const PlanWeight = () => {
  const { colors, dark } = useTheme();

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [error, setError] = useState("");
  const navigation = useRouter();
  const handleSave = () => {
    console.log("saved");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 40 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View
        style={{
          borderBottomColor: "#acacac47",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 20,

            paddingBottom: 3,
            width: "65%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.back();
            }}
          >
            <AntDesign name="arrowleft" size={20} color={colors.icon} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "semibold",
              textAlign: "center",
              marginVertical: 16,
            }}
          >
            Weight-in
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        <Text
          style={[
            {
              color: colors.text,
              fontSize: 30,
              fontWeight: 500,
              textAlign: "center",
              marginTop: 50,
            },
          ]}
        >
          How much do you weigh today?
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                unit === "lbs"
                  ? { fontSize: 16, fontWeight: "bold", color: "#000" }
                  : { fontSize: 16 },
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
                unit === "kg"
                  ? { fontSize: 16, fontWeight: "bold", color: colors.text }
                  : { fontSize: 16 },
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
            style={{
              width: "30%",
              height: 40,
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              padding: 8,
              marginBottom: 24,
              textAlign: "center",
              color: dark ? "white" : "black",
            }}
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

        {error ? (
          <Text
            style={{
              color: "#f00",
              marginBottom: 24,
            }}
          >
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 16,
            backgroundColor: colors.primary,
            top: 108,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={handleSave}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PlanWeight;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
});
