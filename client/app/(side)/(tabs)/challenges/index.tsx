import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { API_KEYS } from "@/config";
import {
  useGetProfileQuery,
  useGetUserProfileQuery,
} from "@/redux/api/apiClient";
import axios from "axios";
import { setSavedChallenges } from "@/redux/slices/profileSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const challengeData = [
  {
    image:
      "https://cdn.pixabay.com/photo/2020/11/03/13/04/yoga-5709767_640.png",
    title: "30-Day Pilates Challenge",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/019/617/125/small/healthy-heart-cartoon-png.png",
    title: "21-Day Sugar Free",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://images.vexels.com/content/258271/preview/body-parts-belly-edb849.png",
    title: "28-Day Flatter Belly",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://www.wholesomefood.org/images/xbridge.png.pagespeed.ic.Zx7oyDyyY2.png",
    title: "21-Day Defined Butt",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://png.pngtree.com/png-clipart/20220419/original/pngtree-man-doing-walking-exercise-png-image_7538567.png",
    title: "30-Day Walking Challenge",
    participants: "39.7k",
    price: "11.99",
  },
];

const ChallengeItem = ({ data, navigation, colors }) => (
  <TouchableOpacity
    style={{
      marginBottom: 30,
      borderRadius: 25,
      overflow: "hidden",
      marginHorizontal: 16,
      height: 350,
    }}
    onPress={() => navigation.navigate("ChallengeDetails")}
  >
    <View
      style={{
        backgroundColor: "red",
        borderRadius: 25,
      }}
    >
      <LinearGradient
        colors={["rgba(209, 192, 221, 0.6)", "rgba(218, 198, 250,0.9)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: 25,
        }}
      />
      <Image source={{ uri: data.image }} style={styles.challengeImage} />
    </View>
    <View
      style={{
        marginLeft: 5,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 600,
          color: colors.text,
          marginVertical: 10,
        }}
      >
        {data.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#777",
          }}
        >
          {data.participants} Participants
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#777",
            marginLeft: 10,
          }}
        >
          US$ {data.price}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          // marginHorizontal: 20,
          marginTop: 20,
          padding: 15,
          borderRadius: 25,
          backgroundColor: "#c7c7c7",
          width: "100%",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          JOIN NOW!
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
const challengeScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const [challenges, setChallenges] = useState([]);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const API_KEY = API_KEYS.secret;
  const dispatch = useDispatch();
  let challengeDatas = [];

  const { data: profile, error, isLoading, refetch } = useGetUserProfileQuery();
  // Automatically generate challenges when profile data is available
  const { savedChallenges } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile && profile.profileOfUsers && savedChallenges.length === 0) {
      const generateFitnessChallenges = async () => {
        const modelPrompt = `
          Based on the following user profile, generate 10 personalized fitness challenges in json format {title,description,type,equipment,days (how many days of challenge))} and don't add any other text:
          Birthday: ${profile?.profileOfUsers?.birthday || "not provided"},
          Gender: ${profile?.profileOfUsers?.gender || "not provided"},
          Height: ${
            profile?.profileOfUsers?.currentHeight?.centimeters ||
            "not provided"
          } cm,
          Weight: ${
            profile?.profileOfUsers?.currentWeight?.kilograms || "not provided"
          } kg,
          Activity Level: ${
            profile?.profileOfUsers?.activityLevel || "not provided"
          },
          Preferred Diet Type: ${
            profile?.profileOfUsers?.preferredDietType || "not provided"
          },
          Activities Liked: ${
            profile?.profileOfUsers?.activitiesLiked?.join(", ") ||
            "none provided"
          }.
        `;

        const initialChat = [
          {
            role: "user",
            parts: [{ text: "" }],
          },
        ];

        setChat(initialChat);
        setLoading(true);

        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
            {
              contents: [
                ...chat,
                {
                  role: "user",
                  parts: [{ text: modelPrompt }],
                },
              ],
            }
          );

          const modelResponse =
            response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Could not generate challenges based on the provided details.";

          const formattedChallenges = await modelResponse
            .split(/\n+/)
            .filter((challenge) => challenge.trim())
            .map((challenge, index) => ({
              role: "model",
              parts: [
                {
                  text: `${challenge
                    .trim()
                    .replace(/```json|\`\`\`/g, "")
                    .trim()}`,
                },
              ],
            }));

          const matches = await modelResponse.match(/\{[^}]*\}/g);

          matches.forEach((match) => {
            // Use regex to find the challenge value
            const titleMatch = match.match(/"title":\s*"([^"]+)"/);
            const descMatch = match.match(/"description":\s*"([^"]+)"/);
            const typeMatch = match.match(/"type":\s*"([^"]+)"/);
            const equipmentMatch = match.match(/"equipment":\s*"([^"]+)"/);
            const daysMatch = match.match(/"days":\s*(\d+)/);

            const data = {
              title: titleMatch ? titleMatch[1] : "Title not found",
              description: descMatch ? descMatch[1] : "Description not found",
              type: typeMatch ? typeMatch[1] : "Type not found",
              equipment: equipmentMatch
                ? equipmentMatch[1]
                : "Equipment not found",
              days: daysMatch ? daysMatch[1] : "Days not found",
            };

            setChallenges((prevChallenges) => [...prevChallenges, data]);
            challengeDatas.push(data);
          });

          console.log(challengeDatas);
          dispatch(setSavedChallenges(challengeDatas));

          setChat([...initialChat, ...formattedChallenges]);
        } catch (errors) {
          console.error("Error fetching challenges:", errors);
          setError(
            "An error occurred while generating fitness challenges. Please try again."
          );
        } finally {
          setLoading(false);
        }
      };
      generateFitnessChallenges();
    }
  }, [profile]);

  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: colors.text,
            marginTop: 25,
            paddingLeft: 20,
          }}
        >
          AI Challenges
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 10,
          }}
        >
          {savedChallenges?.map((item, index) => (
            <TouchableOpacity
              style={{
                marginBottom: 10,
                borderRadius: 25,
                overflow: "hidden",
                marginHorizontal: 16,
                backgroundColor: "red",
                height: 140,
                width: 300,
              }}
              key={index}
            >
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 25,
                  height: 140,
                }}
              >
                <LinearGradient
                  colors={[
                    "rgba(209, 192, 221, 0.6)",
                    "rgba(218, 198, 250,0.9)",
                  ]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 25,
                  }}
                />
                <View
                  style={{
                    padding: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: 500,
                      fontSize: 20,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      marginVertical: 8,
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text style={{}}>{item.days} days challenge</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "#353535" }}>
                      Equipment: {item.equipment}
                    </Text>
                    <Text style={{ color: "#353535" }}>Type: {item.type}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: colors.text,
            marginTop: 10,
            paddingLeft: 20,
            marginBottom: 10,
          }}
        >
          Discover
        </Text>

        {/* <ChallengeBot
          chat={chat}
          loading={loading}
          errors={errors}
          profile={profile}
        /> */}
        {challengeData?.map((item, index) => (
          <View key={index}>
            <ChallengeItem
              data={item}
              navigation={navigation}
              colors={colors}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default challengeScreen;

const ChallengeBot = ({ profile, loading, errors, chat }) => {
  return (
    <View>
      {loading && (
        <Text
          style={{
            color: "green",
          }}
        >
          Loading fitness challenges...
        </Text>
      )}
      {errors && (
        <Text
          style={{
            color: "red",
          }}
        >
          {errors}
        </Text>
      )}
      <View>
        {chat.map((message, index) => (
          <Text
            key={index}
            style={{
              color: "white",
            }}
          >
            {message.parts[0].text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  discoverText: {},
  challengeItem: {},
  challengeImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  challengeInfo: {
    padding: 16,
  },
  challengeTitle: {},
  challengeParticipants: {},
  challengePrice: {},
  joinButton: {
    marginTop: 16,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
