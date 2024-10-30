import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
  useGlobalSearchParams,
} from "expo-router";
import { API_KEYS } from "@/config";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-native";
import {
  setSavedDetailChallenges,
  updateSavedChallenges,
} from "@/redux/slices/profileSlice";
import { ProgressBar } from "react-native-paper";
import { Rect, Svg } from "react-native-svg";
// const SvgProgressBar = ({ label = "30", percentage = 10, color = "red" }) => {
//   const barWidth = 90; // Total width of the progress bar
//   const barHeight = 3; // Height of the progress bar

//   return (

//   );
// };
const AiChallengeDetails = () => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const { items } = useLocalSearchParams();
  const [challenges, setChallenges] = useState([]);

  const challengeData = typeof items === "string" ? JSON.parse(items) : items;
  let data = {};

  const API_KEY = API_KEYS.secret;
  const dispatch = useDispatch();
  let detailDatas = [];

  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  const { savedDetailChallenges, savedChallenges } = useSelector(
    (state) => state.profile
  );
  const res = savedChallenges.find(
    (challenge) => challenge.title === challengeData.title
  );

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (profile && profile.profileOfUsers && !res.schedule) {
      const generateFitnessChallenges = async () => {
        let modelPrompt = `we have ${challengeData.title} of ${
          challengeData.days
        } using ${challengeData.equipment} equipment and it should be ${
          challengeData.type
        } type.
                    Based on profile information, generate ${
                      challengeData.days
                    } days challenges routine
                    in json format {day,exercise,sets,reps,rest,notes}, and don't add any other text:
                    my birthday: ${
                      profile?.profileOfUsers?.birthday || "not provided"
                    },
                    my gender: ${
                      profile?.profileOfUsers?.gender || "not provided"
                    },
                    Height: ${
                      profile?.profileOfUsers?.currentHeight?.centimeters ||
                      "not provided"
                    } cm,
                    Weight: ${
                      profile?.profileOfUsers?.currentWeight?.kilograms ||
                      "not provided"
                    } kg,
                    Activity Level: ${
                      profile?.profileOfUsers?.activityLevel || "not provided"
                    },
                    Preferred Diet Type: ${
                      profile?.profileOfUsers?.preferredDietType ||
                      "not provided"
                    },
                    Activities Liked: ${
                      profile?.profileOfUsers?.activitiesLiked?.join(", ") ||
                      "none provided"
                    }.`;

        const initialChat = [
          {
            role: "user",
            parts: [{ text: "" }],
          },
        ];
        setChat(initialChat);
        setFetching(true);
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
            const exerciseMatch = match.match(/"exercise":\s*"([^"]+)"/);
            const setsMatch = match.match(/"sets":\s*(\d+)/);
            const repsMatch = match.match(/"reps":\s*(\d+)/);
            const dayMatch = match.match(/"day":\s*(\d+)/);
            const restMatch = match.match(/"rest":\s*(\d+)/);
            const notesMatch = match.match(/"notes":\s*"([^"]+)"/);

            const data = {
              exercise: exerciseMatch ? exerciseMatch[1] : "exercise not found",
              sets: setsMatch ? setsMatch[1] : "sets not found",
              reps: repsMatch ? repsMatch[1] : "reps not found",
              day: dayMatch ? dayMatch[1] : "day not found",
              rest: restMatch ? restMatch[1] : "rest not found",
              notesMatch: notesMatch ? notesMatch[1] : "notesMatch not found",
            };
            setChallenges((prevChallenges) => [...prevChallenges, data]);
            detailDatas.push(data);
          });
          dispatch(
            updateSavedChallenges({
              title: challengeData.title,
              data: detailDatas,
            })
          );
          setChat([...initialChat, ...formattedChallenges]);
        } catch (errors) {
          console.error("Error fetching challenges:", errors);
          setError(
            "An error occurred while generating fitness challenges. Please try again."
          );
        } finally {
          setFetching(false);
        }
      };

      generateFitnessChallenges();
    }
  }, [profile]);

  // console.log("challenges", Array.isArray(savedDetailChallenges));

  console.log(res.schedule);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const handlePress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };
  const [completedDays, setCompletedDays] = useState(0);

  const handleCompleteDay = () => {
    setCompletedDays((prev) => prev + 1);
    setModalVisible(false);
  };
  const length = res?.schedule?.length;
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 70,
        }}
      >
        {/* <Button title={"click"} onPress={() => generateFitnessChallenges()} /> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {challengeData?.title}
        </Text>

        {fetching && (
          <View>
            <ActivityIndicator size="large" color={"red"} />

            <Text>
              Preparing {challengeData?.days} day's Schedule for you...
            </Text>
          </View>
        )}
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
            gap: 15,
            flexDirection: "row",
          }}
        >
          <Svg width={300} height={5} style={{}}>
            <Rect
              x="0"
              y="0"
              width={300}
              height={3}
              fill="#d2d2d2ab"
              rx={5}
              ry={5}
            />
            <Rect
              x="0"
              y="0"
              width={(completedDays + 1 / length) * 300}
              height={3}
              fill={"#16c516"}
              rx={5}
              ry={5}
            />
          </Svg>
          <Text>
            {completedDays}/{res?.schedule?.length}
          </Text>
        </View>

        {/* <Text>
          {completedDays}/{res?.schedule?.length}
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            marginHorizontal: 15,
          }}
        >
          {res.schedule?.map((sche, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(sche)}
              style={{
                backgroundColor: "#cbcbcb",
                width: "48%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginVertical: 6,
                paddingVertical: 15,
                paddingHorizontal: 3,
                // shadow
                shadowColor: "#767676c6",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.35,
                shadowRadius: 5.84,
              }}
            >
              {/* {"day": "28", "exercise": "High Plank with Bear Crawl", "notesMatch": "notesMatch not found", "reps": "20", "rest": "60", "sets": "3"} */}
              <Text
                style={{
                  fontWeight: 600,
                  paddingBottom: 5,
                }}
              >
                DAY-{sche.day}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {sche.exercise}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "90%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              DAY-{selectedExercise?.day}
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Excercise: {selectedExercise?.exercise}
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Set: {selectedExercise?.sets}
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Reps: {selectedExercise?.reps}
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Rest: {selectedExercise?.rest}
            </Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              Note: {selectedExercise?.notesMatch}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <Button title="Done" onPress={handleCompleteDay} />
              <Button
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AiChallengeDetails;

const styles = StyleSheet.create({});
