// import Ionicons from "@expo/vector-icons/Ionicons";
// import { type IconProps } from "@expo/vector-icons/build/createIconSet";
// import { type ComponentProps } from "react";

// export function TabBarIcon({
//   style,
//   ...rest
// }: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
//   return <Ionicons size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
// }

import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleProp, TextStyle } from "react-native";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";

const iconSets = {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
  FontAwesome,
};

type IconNames =
  | ComponentProps<typeof Ionicons>["name"]
  | ComponentProps<typeof MaterialCommunityIcons>["name"];
type IconSetNames = keyof typeof iconSets;

interface TabBarIconProps {
  iconSet: IconSetNames;
  name: IconNames;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function TabBarIcon({ iconSet, style, ...rest }: TabBarIconProps) {
  const IconComponent = iconSets[iconSet];
  return (
    <IconComponent size={20} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
