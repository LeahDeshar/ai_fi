import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useTheme } from "@/constants/ThemeProvider";
import { RouteProp, useRoute } from "@react-navigation/native";
import CustomInputToolbar from "@/components/CustomInputToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import EmojiKeyboard from "rn-emoji-keyboard";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { Button } from "react-native";
import { BlurView } from "expo-blur";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const SOCKET_SERVER_URL = "http://192.168.1.8:8082";
const socket = io(SOCKET_SERVER_URL);
type RootStackParamList = {
  MorePersonalCoachChat: { trainer: Trainer };
};

type Trainer = {
  name: string;
  image: any;
  rating: number;
  experience: number;
  specialities: string[];
  isBestMatch: boolean;
};

type MorePersonalCoachChatRouteProp = RouteProp<
  RootStackParamList,
  "MorePersonalCoachChat"
>;

const MorePersonalCoachChat: React.FC = () => {
  const route = useRoute<MorePersonalCoachChatRouteProp>();
  const trainer = route.params.trainer;
  const { colors } = useTheme();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const scrollViewRef = useRef();
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const userId = user._id;
  const otherId = trainer.user;

  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    socket.emit("join", userId, otherId);

    socket.on("conversationId", (id) => {
      setConversationId(id);
      socket.emit("allMessageOfUser", { conversationId: id });
    });

    socket.on("receiveMessages", ({ conversationId, messages }) => {
      console.log("receiveMessages", messages, conversationId);

      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    return () => {
      socket.off("receiveMessages");
      socket.off("conversationId");
    };
  }, [userId, otherId]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const sendMessage = (isLike = false) => {
    const messageText = isLike ? "👍" : text.trim();
    if (messageText) {
      const newMessage = {
        senderId: { _id: userId, username: user.name },
        text: messageText,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("sendMessage", {
        conversationId,
        senderId: userId,
        text: messageText,
      });

      if (!isLike) setText("");
    }
  };
  const addEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
  };
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const handleLongPress = (message) => {
    setSelectedMessage(message);
    setEditModalVisible(true);
    setIsEditing(false); // Reset edit state
  };

  const handleEditMessage = () => {
    if (selectedMessage) {
      selectedMessage.text = editedText; // Update locally for demo
      setEditModalVisible(false);
      setSelectedMessage(null);
      setEditedText("");
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      // Perform delete action, e.g., call API to delete message
      setEditModalVisible(false);
      setSelectedMessage(null);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedText(selectedMessage.text);
  };

  const handleReaction = (emoji) => {
    console.log(`User reacted with: ${emoji}`);
    // Add logic to save or send the reaction
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={styles.messagesContainer}
        >
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId._id === userId;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.messageBubble,
                  isCurrentUser
                    ? styles.currentUserBubble
                    : styles.otherUserBubble,
                ]}
                onLongPress={() => handleLongPress(message)}
              >
                <Text style={styles.senderName}>
                  {isCurrentUser ? profile.profileOfUsers.name : trainer.name}
                </Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          {showEmojiKeyboard && (
            <EmojiKeyboard
              onEmojiSelected={addEmoji}
              open={showEmojiKeyboard}
              enableRecentlyUsed
              enableSearchBar
              enableCategoryChangeGesture
              onClose={() => setShowEmojiKeyboard(false)}
              theme={{
                backdrop: "transparent",
              }}
              categoryOrder={[
                "recently_used",
                "smileys_emotion",
                "people_body",
                "animals_nature",
                "food_drink",
                "travel_places",
                "activities",
                "objects",
                "symbols",
                "flags",
                "search",
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowEmojiKeyboard(!showEmojiKeyboard)}
          >
            <AntDesign name="smileo" size={28} color="#4CAF50" />
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type your message"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => sendMessage(text ? false : true)}>
            {text ? (
              <FontAwesome name="send" size={28} color="#4CAF50" />
            ) : (
              <AntDesign name="like1" size={28} color="#4CAF50" />
            )}
          </TouchableOpacity>
        </View>

        <Modal
          visible={isEditModalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={() => setEditModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
            <BlurView
              intensity={40}
              tint="extraLight"
              style={styles.modalContainer}
            >
              <View
                style={[
                  styles.modalContent,
                  selectedMessage?.senderId._id === userId
                    ? styles.currentUserContent
                    : styles.otherUserContent,
                ]}
              >
                {!isEditing ? (
                  <View
                    style={
                      {
                        // padding: 20,
                      }
                    }
                  >
                    <View style={styles.reactionContainer}>
                      <View
                        style={[
                          selectedMessage?.senderId._id === userId
                            ? {
                                right: 50,
                              }
                            : {
                                left: 40,
                              },
                          {
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingHorizontal: 40,
                            borderRadius: 25,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            shadowColor: "#000000ae",
                            shadowOffset: { width: 2, height: 5 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                          },
                        ]}
                      >
                        {["👍", "❤️", "😂", "😮", "😢", "😡"].map(
                          (emoji, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleReaction(emoji)}
                              style={styles.emojiButton}
                            >
                              <Text style={styles.emoji}>{emoji}</Text>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        styles.modalContent,
                        {
                          borderRadius: 20,
                          backgroundColor: colors.primary,
                          marginBottom: 30,
                          top: 20,
                          padding: 9,

                          shadowColor: "#0000006c",
                          shadowOffset: { width: 2, height: 5 },
                          shadowOpacity: 0.5,
                          shadowRadius: 8,
                          elevation: 10,
                        },
                        selectedMessage?.senderId._id === userId
                          ? styles.currentUserContent
                          : styles.otherUserContent,
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#FFF",
                          textAlign: "center",
                        }}
                      >
                        {selectedMessage?.text}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 15,
                        shadowColor: "#0000005b",
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 10,
                        marginRight: 30,
                        marginTop: 10,

                        width: 180,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: "#cecece56",
                        }}
                        onPress={() => console.log("copied")}
                      >
                        <Text>Copy</Text>
                      </TouchableOpacity>
                      {selectedMessage?.senderId._id === userId && (
                        <TouchableOpacity
                          style={{
                            padding: 12,

                            borderBottomWidth: 1,
                            borderBottomColor: "#cecece56",
                          }}
                          onPress={startEditing}
                        >
                          <Text>Edit</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{
                          padding: 12,

                          borderBottomWidth: 1,
                          borderBottomColor: "#cecece56",
                        }}
                        onPress={handleDeleteMessage}
                      >
                        <Text>Delete</Text>
                      </TouchableOpacity>

                      <Button
                        title="Cancel"
                        onPress={() => setEditModalVisible(false)}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: 350,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    {/* <TextInput
                    style={styles.inputs}
                    value={editedText}
                    onChangeText={(text) => setEditedText(text)}
                  /> */}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        borderRadius: 30,

                        backgroundColor: "white",

                        shadowColor: "#0000005b",
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                        elevation: 10,
                      }}
                    >
                      <TextInput
                        value={editedText}
                        onChangeText={(text) => setEditedText(text)}
                        placeholder="Type your message"
                        style={styles.input}
                      />
                      <TouchableOpacity onPress={handleEditMessage}>
                        <FontAwesome name="send" size={25} color="#4CAF50" />
                      </TouchableOpacity>
                    </View>
                    {/* <Button
                    title="Cancel"
                    onPress={() => setEditModalVisible(false)}
                  /> */}
                  </View>
                )}
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MorePersonalCoachChat;

const styles = StyleSheet.create({
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: -40, // Position above the message bubble
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  emojiButton: {
    marginHorizontal: 5,
    borderRadius: 15,
    padding: 5,
  },
  emoji: {
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    // padding: 20,
    // maxWidth: "80%",
  },
  currentUserContent: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  otherUserContent: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  inputs: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    marginTop: 90,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  currentUserBubble: {
    backgroundColor: "#daf8e3",
    alignSelf: "flex-end",
  },
  otherUserBubble: {
    backgroundColor: "#e3e3e3",
    alignSelf: "flex-start",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#d3d3d3",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0db",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
  },
  emojiKeyboard: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});
