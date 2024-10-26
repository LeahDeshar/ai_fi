import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import axios from "axios";
import { API_KEYS } from "@/config";
import { useTheme } from "@/constants/ThemeProvider";
import { TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { colors, dark } = useTheme();

  const API_KEY = API_KEYS.secret;

  const flatListRef = useRef();

  const handleUserInput = async (input) => {
    const updateChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: input }],
      },
    ];

    setChat(updateChat);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents: updateChat,
        }
      );

      const modelResponse =
        response?.data?.candidates[0]?.content?.parts[0]?.text ||
        "I didn't understand that.";

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updateChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      setError(
        "An error occurred while fetching the response. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderChatItem = ({ item }) => {
    const responseText = item.parts[0].text;
    return (
      <View style={styles.chatBubble(item.role, colors)}>
        <Text style={styles.chatText(item.role)}>
          {formatResponse(responseText)}
        </Text>
      </View>
    );
  };

  const formatResponse = (response) => {
    return response
      .split(/(\*\*.*?\*\*|\*.*?\*|\\n|[*•]\s)/g)
      .map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={index} style={styles.boldText}>
              {part.replace(/\*\*/g, "")}
            </Text>
          );
        } else if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <Text key={index} style={styles.italicText}>
              {part.replace(/\*/g, "")}
            </Text>
          );
        } else if (part === "\\n") {
          return <Text key={index}>\n</Text>;
        } else if (part === "* " || part === "• ") {
          return (
            <Text key={index} style={styles.bulletPoint}>
              {"• "}
            </Text>
          );
        }
        return part;
      });
  };

  const predefinedQuestions = [
    "What exercises can I do for weight loss?",
    "How can I improve my diet?",
    "What are some effective workouts for building muscle?",
    "How many calories should I consume daily?",
    "Can you suggest a healthy meal plan?",
  ];

  const handlePredefinedQuestion = (question) => {
    handleUserInput(question);
  };

  useEffect(() => {
    if (chat.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chat]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          padding: 10,
        }}
      >
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 1,
          }}
          intensity={50}
          tint={dark ? "prominent" : "extraLight"}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
              // marginBottom: 20,
              color: colors.text,
              marginTop: 45,
              paddingLeft: 15,
            }}
          >
            Fitness ChatBot
          </Text>
        </BlurView>

        <View
          style={{
            padding: 20,
            flex: 1,
          }}
        >
          {error && <Text style={styles.errorText}>{error}</Text>}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={chat}
            renderItem={renderChatItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatContainer}
            ref={flatListRef} // Ref to FlatList to allow scrolling
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({ animated: true })
            }
          />

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  color: colors.primary,
                }}
              >
                typing...
              </Text>
            </View>
          )}
          <BlurView
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 140,
              zIndex: 1,
              paddingBottom: 20,
            }}
            tint={dark ? "prominent" : "extraLight"}
            intensity={50}
          >
            <ScrollView
              horizontal
              contentContainerStyle={{
                padding: 20,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {predefinedQuestions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: colors.primary,
                    marginHorizontal: 10,
                    borderRadius: 25,
                    height: 40,
                    marginBottom: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => handlePredefinedQuestion(question)}
                >
                  <Text
                    style={{
                      color: "white",
                      paddingHorizontal: 15,
                    }}
                  >
                    {question}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 9,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderColor: "#b3b3b364",
                  borderWidth: 1,
                  borderRadius: 25,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  marginRight: 10,
                }}
                placeholderTextColor={"#5b5b5b9e"}
                value={userInput}
                onChangeText={setUserInput}
                placeholder={"Ask me about fitness..."}
              />
              <TouchableOpacity onPress={() => handleUserInput(userInput)}>
                <FontAwesome name="send" size={24} color={colors.primary} />
              </TouchableOpacity>
              {/* <Button
               
                title={"Send"}
              /> */}
            </View>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginTop: 70,
    paddingBottom: 180,
  },
  chatBubble: (role, colors) => ({
    padding: 10,
    backgroundColor: role === "user" ? colors.primary : "#f1f0f0",
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    borderRadius: 20,
    marginBottom: 10,
  }),
  chatText: (role) => ({
    color: role === "user" ? "#fff" : "#000",
  }),
  boldText: {
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  bulletPoint: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "blue",
  },
  input: {},
  predefinedContainer: {
    // marginTop: 10,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 120,
  },
  loadingText: {},
});

export default Chatbot;
