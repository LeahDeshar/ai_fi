import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useTheme } from "@/constants/ThemeProvider";
import { RouteProp, useRoute } from "@react-navigation/native";
import CustomInputToolbar from "@/components/CustomInputToolbar";

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

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi, I'm Stefan, certified Personal Coach with over 10 years of experience in health & fitness💪 I'm here to support you during your weight loss journey and especially during the hardest times, because I know how hard this journey can be as I've been through one myself. 👋🏻 I feel the happiest when I help people achieve their goals and dreams so I will be pushing you to the limit because in the end it will be worth it! If you're ready, then let's work together on your dream physique and make it a reality. 🔥",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: trainer?.name,
          avatar: trainer?.image,
        },
      },
      {
        _id: 2,
        text: "Please provide me with as many details as possible, so I can make a fully custom approach for you to help you out with everything and make things clear 🙌",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: trainer.name,
          avatar: trainer?.image,
        },
      },
    ]);
  }, [trainer]);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        onInputTextChanged={(text) => setText(text)}
        renderInputToolbar={(props) => (
          <CustomInputToolbar {...props} text={text} onTextChanged={setText} />
        )}
      />
    </SafeAreaView>
  );
};

export default MorePersonalCoachChat;

const styles = StyleSheet.create({});
