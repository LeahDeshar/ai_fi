import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
  useGlobalSearchParams,
} from "expo-router";
import { API_KEYS } from "@/config";
import { useDispatch } from "react-redux";
import { useGetUserProfileQuery } from "@/redux/api/apiClient";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-native";
import { setSavedDetailChallenges } from "@/redux/slices/profileSlice";

const AiChallengeDetails = () => {
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState("");
  const { items } = useLocalSearchParams();
  const [challenges, setChallenges] = useState([]);

  console.log("parse", JSON.parse(items));
  const challengeData = typeof items === "string" ? JSON.parse(items) : items;
  let data = {};

  const API_KEY = API_KEYS.secret;
  const dispatch = useDispatch();
  let detailDatas = [];

  const { data: profile, error, isLoading, refetch } = useGetUserProfileQuery();
  const { savedDetailChallenges } = useSelector((state) => state.profile);

  useEffect(() => {
    if (
      profile &&
      profile.profileOfUsers &&
      savedDetailChallenges.length === 0
    ) {
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
          dispatch(setSavedDetailChallenges(detailDatas));
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

  console.log("challenges", Array.isArray(savedDetailChallenges));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title={"click"} onPress={() => generateFitnessChallenges()} />
      <Text>{challengeData.title}</Text>
      {savedDetailChallenges?.map((challenge, index) => (
        <Text key={index}>{challenge.exercise}</Text>
      ))}
    </View>
  );
};

export default AiChallengeDetails;

const styles = StyleSheet.create({});
