import { View, Text, ViewProps, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../constants/ThemeProvider";

export type ButtonProps = ViewProps & {
  title?: string;
  handlePress?: () => void;
};
const Button = ({ title, handlePress }: ButtonProps) => {
  // const colorScheme = useColorScheme();
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        style={{
          backgroundColor: colors.primary,
          // backgroundColor: colors.primary,
          color: "white",
          padding: 10,
          textAlign: "center",
          paddingVertical: 12,
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
