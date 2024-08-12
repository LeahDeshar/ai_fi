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

const ProfileNameScreen = () => {
  const { colors } = useTheme();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Text style={[styles.title, { color: colors.text }]}>
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
          placeholderTextColor={colors.text}
        />
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginTop: 50,
  },
  buttonContainer: {
    paddingBottom: 80,
  },
});
