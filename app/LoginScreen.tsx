import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#e0eafc", "#cfdef3"]} style={styles.container}>
      <View style={styles.glassContainer}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#ffffff"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glassContainer: {
    width: width * 0.9,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#4c669f",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoginScreen;
