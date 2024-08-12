import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileUnitsScreen = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: colors.opacity,
          borderRadius: 15,
          padding: 20,
          marginTop: 20,
        }}
      >
        <ProfileItem
          title="Metres & Kilograms"
          onPress={() => console.log("Units")}
        />
        <ProfileItem
          title="Pounds,feet and inches"
          onPress={() => console.log("Units")}
        />
      </View>
    </View>
  );
};
interface ProfileItemProps {
  title: string;
  value?: string;
  colors?: any;
  haveBorderBottom?: boolean;
  onPress?: () => void;
}

const ProfileItem = ({
  title,
  value,
  haveBorderBottom = true,
  onPress,
}: ProfileItemProps) => {
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomWidth: haveBorderBottom ? 1 : 0,
          borderBottomColor: colors.borders,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.itemTitle, { color: dark ? "#a4a4a4" : "#000" }]}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {value && (
          <Text style={[styles.itemValue, { color: colors.text }]}>
            {value}
          </Text>
        )}
        <MaterialIcons name="chevron-right" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};
export default ProfileUnitsScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 10,
    borderBottomColor: "#dddddd25",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: "#888",
  },
});
