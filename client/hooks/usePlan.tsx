import { useLayoutEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { defaultStyles } from "@/styles";
import React from "react";

const usePlan = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // Set the options for the Native Stack screen
    navigation.setOptions({
      title: "My Plan",
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TouchableOpacity onPress={() => console.log("Bolt pressed")}>
            <FontAwesome name="bolt" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Message pressed")}>
            <AntDesign name="message1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f0f0f0", // Header background color
        shadowColor: "transparent", // No shadow under header
      },
      headerTitleStyle: {
        fontSize: 20, // Title font size
        fontWeight: "bold", // Title font weight
        color: "#333", // Title font color
      },
      headerTransparent: true, // Make header background transparent
      headerBlurEffect: "light", // Light blur effect
    } as NativeStackNavigationOptions);
  }, [navigation]);

  return <View style={defaultStyles.container} />;
};

export default usePlan;
