import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { checkPersistence } from "@/redux/api/checkPersistence";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/redux/api/apiClient";
import { loginSuccess } from "@/redux/slices/userSlice";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    // if (!email || !password || !confirmPassword) {
    //   Alert.alert("Error", "Please enter all fields");
    //   return;
    // }

    // try {
    // const response = await register({
    //   email,
    //   password,
    //   confirmPassword,
    // }).unwrap();

    // if (response.success) {
    //   dispatch(loginSuccess(response));
    //   Alert.alert("Success", "Registration successfully");
    navigation.navigate("PersonalizeScreen");
    //   } else {
    //     Alert.alert("Error", response.message || "Registration failed");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   Alert.alert(
    //     "Error",
    //     error.message || "An error occurred. Please try again."
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/bg2.png")}
        style={{
          width: width,
          height: height,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 150,
          left: 20,
          right: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
              style={{ marginVertical: 5, fontWeight: "bold", fontSize: 30 }}
            >
              Join AiFi
            </Text>
            <Text style={{ fontWeight: "semibold", color: "#424242" }}>
              Begin Your Fitness Journey Today!
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: "#5d5d5d",
            }}
          >
            Sign up to personalize your fitness experience.
          </Text>
        </View>
      </View>

      <View style={styles.overlay}>
        <BlurView
          style={[styles.glassContainer, { overflow: "hidden" }]}
          tint="light"
          intensity={250}
        >
          <Text style={styles.title}>REGISTER</Text>

          {/* <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#7e7e7e"
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#7e7e7e"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7e7e7e"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#7e7e7e"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <Text
            style={{
              marginVertical: 15,
              color: "#7e7e7e",
              fontSize: 16,
            }}
          >
            or
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
              paddingVertical: 12,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#fd6060f8",
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text
              style={{
                letterSpacing: 3,
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },

  backgroundImage: {
    position: "absolute",
    bottom: 60,
    right: 0,
    width: "100%",
    height: height * 0.36,
  },
  imageStyle: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  overlay: {
    top: 90,
    padding: 20,
    justifyContent: "center",
    position: "absolute",
    height: height * 0.9,
    width: width,
  },
  glassContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass-like effect
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    letterSpacing: 6,
    marginBottom: 20,
    color: "#959595de",
  },
  input: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparent white
    marginBottom: 15,
    paddingHorizontal: 15,
    // color: "#fff",
  },
  button: {
    width: "100%",
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

export default RegisterScreen;
