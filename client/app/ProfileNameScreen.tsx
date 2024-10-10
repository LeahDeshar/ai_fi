import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import Button from "@/components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";

const ProfileNameScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Text style={[styles.title, { color: colors.text, marginTop: 130 }]}>
        What's Your Name?
      </Text>

      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.text, color: colors.text },
          ]}
          autoFocus={true}
          placeholder="Enter your name"
          placeholderTextColor={colors.tabIconDefault}
        />
      </View>
      <View
        style={[styles.buttonContainer, { backgroundColor: colors.background }]}
      >
        <Button
          title="SAVE"
          handlePress={() => navigation.push("ProfileGender")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 18,
    padding: 10,
    paddingLeft: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginTop: 50,
  },
  buttonContainer: {
    // paddingBottom: 50,
    top: 9,
  },
});
