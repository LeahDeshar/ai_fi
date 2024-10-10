import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const PersonalizeScreen = () => {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 90,
          }}
        >
          <Image
            style={styles.logoImage}
            source={require("@/assets/logo.png")}
          />

          <View
            style={{
              marginLeft: 20,
            }}
          >
            <Text
              style={{ marginVertical: 2, fontWeight: "bold", fontSize: 30 }}
            >
              AiFi
            </Text>
            <Text style={{ marginVertical: 2, fontSize: 20 }}>Fitness App</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 40,
            marginHorizontal: 50,
            marginBottom: 60,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "semibold",
              letterSpacing: 1,
            }}
          >
            Let's personalize your fitness plan.
          </Text>
        </View>
        <Image
          source={require("@/assets/personalize.png")}
          style={{
            width: 420,
            height: 300,
            resizeMode: "cover",
          }}
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push("ProfileNameScreen")}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 100,
  },
  logoImage: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },

  button: {
    width: "90%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fd6060f8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 3,
  },
});

export default PersonalizeScreen;
