import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useTheme } from "@/constants/ThemeProvider";
import { RouteProp, useRoute } from "@react-navigation/native";
import CustomInputToolbar from "@/components/CustomInputToolbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import EmojiKeyboard from "rn-emoji-keyboard";
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
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hi, I'm Stefan, certified Personal Coach with over 10 years of experience in health & fitness💪 I'm here to support you during your weight loss journey and especially during the hardest times, because I know how hard this journey can be as I've been through one myself. 👋🏻 I feel the happiest when I help people achieve their goals and dreams so I will be pushing you to the limit because in the end it will be worth it! If you're ready, then let's work together on your dream physique and make it a reality. 🔥",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: trainer?.name,
  //         avatar: trainer?.image,
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Please provide me with as many details as possible, so I can make a fully custom approach for you to help you out with everything and make things clear 🙌",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: trainer.name,
  //         avatar: trainer?.image,
  //       },
  //     },
  //   ]);
  // }, [trainer]);

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
      // setUnreadCounts((prevCounts) => ({
      //   ...prevCounts,
      //   [otherId]: (prevCounts[otherId] || 0) + 1,
      // }));
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
  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: colors.background,
    //   }}
    // >
    //   <GiftedChat
    //     messages={messages}
    //     onSend={() => sendMessage(text ? false : true)}
    //     user={{
    //       _id: 1,
    //     }}
    //     onInputTextChanged={(text) => setText(text)}
    //     renderInputToolbar={(props) => (
    //       <CustomInputToolbar {...props} text={text} onTextChanged={setText} />
    //     )}
    //   />
    // </SafeAreaView>

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.chatContainer}>
        <Text style={styles.chatHeader}>
          Im {user?.name} Chatting with {trainer.name}
        </Text>

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
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  isCurrentUser
                    ? styles.currentUserBubble
                    : styles.otherUserBubble,
                ]}
              >
                <Text style={styles.senderName}>
                  {isCurrentUser ? user.name : trainer.name}
                </Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default MorePersonalCoachChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
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
    borderColor: "#d3d3d3",
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
