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
} from "react-native";
import axios from "axios";
import { API_KEYS } from "@/config";
import { useTheme } from "@/constants/ThemeProvider";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { colors } = useTheme();

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
      <View style={styles.chatBubble(item.role)}>
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: colors.text,
          }}
        >
          Fitness ChatBot
        </Text>

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
            <ActivityIndicator size="large" color="#0084ff" />
            <Text style={styles.loadingText}>typing...</Text>
          </View>
        )}

        {/* <ScrollView
          contentContainerStyle={{
            // marginBottom: 50,
            // marginTop: 50,
            backgroundColor: "red",
            // height: 250,
          }}
          horizontal
        >
          {predefinedQuestions.map((question, index) => (
            <Button
              key={index}
              title={question}
              onPress={() => handlePredefinedQuestion(question)}
              color="#0084ff" // Change color as needed
            />
          ))}
        </ScrollView> */}

        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userInput}
            onChangeText={setUserInput}
            placeholder={"Ask me about fitness..."}
          />
          <Button onPress={() => handleUserInput(userInput)} title={"Send"} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  chatBubble: (role) => ({
    padding: 10,
    backgroundColor: role === "user" ? "#0084ff" : "#f1f0f0",
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
    paddingBottom: 400,
    backgroundColor: "blue",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  predefinedContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#0084ff",
  },
});

export default Chatbot;
