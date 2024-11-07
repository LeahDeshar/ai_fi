import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { Image } from "react-native";
import Button from "@/components/Button";

const ViewProfile = () => {
  const { user } = useLocalSearchParams();
  const { colors, dark } = useTheme();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(JSON.parse(user));
    }
  }, [user]);

  console.log(profile);
  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: dark ? "#242424" : "#f5f5f5",
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 90,
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            paddingTop: 40,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}
        >
          <View>
            <Image
              source={{ uri: profile?.profilePic?.url }}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />

            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "semibold",
                marginVertical: 5,
                textAlign: "center",
              }}
            >
              {profile?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 16,
              alignItems: "center",
              gap: 80,
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                12
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                Friends
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 5,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                Posts
              </Text>
            </View>
          </View>

          <Button
            title="Add Friend"
            handlePress={() => {
              console.log("Add Friend");
            }}
          />
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "semibold",
              letterSpacing: 2,
              marginVertical: 10,
              marginHorizontal: 20,
              textAlign: "center",
            }}
          >
            ABOUT
          </Text>

          <View
            style={{
              marginVertical: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginVertical: 9,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Steps
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                {profile?.dailySteps}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginVertical: 9,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Gender
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                {profile?.gender}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginVertical: 9,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Diet Type
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                {profile?.preferredDietType}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                alignItems: "center",

                marginVertical: 9,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                }}
              >
                Activities
              </Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {/* {profile?.activitiesLiked &&
                  JSON.parse(profile?.activitiesLiked).map(
                    (activity, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          borderRadius: 20,
                          backgroundColor: colors.background,
                          marginLeft: 5,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.text,
                            fontSize: 16,

                            padding: 8,
                          }}
                        >
                          {activity}
                        </Text>
                      </View>
                    )
                  )} */}
                {/* {profile?.activitiesLiked &&
                  (typeof profile.activitiesLiked === "string"
                    ? JSON.parse(profile.activitiesLiked)
                    : profile.activitiesLiked
                  ).map((activity, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        borderRadius: 20,
                        backgroundColor: colors.background,
                        marginLeft: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 13,
                          padding: 8,
                        }}
                      >
                        {activity}
                      </Text>
                    </View>
                  ))} */}

                {profile?.activitiesLiked &&
                  (typeof profile.activitiesLiked === "string"
                    ? JSON.parse(profile.activitiesLiked)
                    : Array.isArray(profile.activitiesLiked) &&
                      typeof profile.activitiesLiked[0] === "string" &&
                      profile.activitiesLiked[0].startsWith("[")
                    ? JSON.parse(profile.activitiesLiked[0])
                    : profile.activitiesLiked
                  ).map((activity, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        borderRadius: 20,
                        backgroundColor: colors.background,
                        marginLeft: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 13,
                          padding: 8,
                        }}
                      >
                        {activity}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "semibold",
              letterSpacing: 2,
              marginVertical: 10,
              marginHorizontal: 20,
              textAlign: "center",
            }}
          >
            {profile?.name}'s Post
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({});
