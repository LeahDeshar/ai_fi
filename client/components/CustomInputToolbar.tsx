import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/constants/ThemeProvider";

const CustomInputToolbar = (props: any) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.inputToolbar, { backgroundColor: colors.background }]}>
      <TextInput
        style={[styles.textInput, { color: colors.text }]}
        value={props.text}
        onChangeText={props.onTextChanged}
        placeholder="Type a message..."
        placeholderTextColor={colors.opacity}
      />
      <TouchableOpacity
        onPress={() => props.onSend({ text: props.text }, true)}
      >
        <Ionicons name="send" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
  },
});

export default CustomInputToolbar;
