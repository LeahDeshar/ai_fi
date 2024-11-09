import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { Image } from "react-native";
import Button from "@/components/Button";
import { useRoute } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";
import { Video } from "expo-av";
import {
  useGetAllUserPostQuery,
  useGetMyFriendsQuery,
} from "@/redux/api/apiClient";
import { BlurView } from "expo-blur";
import PostDate from "@/utils/PostDate";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");

const ViewProfile = () => {
  const { user } = useLocalSearchParams();
  const { colors, dark } = useTheme();
  const [profile, setProfile] = useState(null);
  const { user: me, token, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setProfile(JSON.parse(user));
    }
  }, [user]);

  const {
    data: friends,
    error: friendError,
    isLoading: friendIsLoading,
  } = useGetMyFriendsQuery();

  const { data: posts, error, isLoading } = useGetAllUserPostQuery();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading posts...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Failed to load posts.
        </Text>
      </View>
    );
  }

  const renderMedia = (media) => {
    if (media.type === "image") {
      return <Image source={{ uri: media.url }} style={styles.postImage} />;
    }
    if (media.type === "video") {
      return (
        <Video
          source={{ uri: media.url }}
          style={styles.postVideo}
          useNativeControls
          isLooping
          resizeMode="cover"
        />
      );
    }
    return null;
  };

  const renderCarousel = (media) => {
    return (
      <Carousel
        data={media}
        renderItem={({ item }) => renderMedia(item)}
        width={width}
        height={500}
        loop={false}
      />
    );
  };
  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: dark ? "#242424" : "#f5f5f5",
          paddingTop: 80,
        },
      ]}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            // tint="light"
            style={{
              marginBottom: 25,

              overflow: "hidden",
            }}
          >
            <View
              style={[
                {
                  marginBottom: 16,
                  borderRadius: 10,
                  overflow: "hidden",
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 8,
                  marginVertical: 10,
                }}
              >
                <Image
                  source={{ uri: profile?.profilePic?.url }}
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
                <View
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontWeight: "semibold",
                    }}
                  >
                    {profile?.name}
                  </Text>
                  <PostDate colors={colors} createdAt={item.createdAt} />
                </View>
              </View>
              {item.content && (
                <View
                  style={{
                    marginVertical: 15,
                    marginHorizontal: 8,
                  }}
                >
                  <Text style={{ color: colors.text, fontSize: 15 }}>
                    {item.content}
                  </Text>
                </View>
              )}

              {item.media && item.media.length > 1
                ? renderCarousel(item.media)
                : item.media &&
                  item.media.map((mediaItem) => renderMedia(mediaItem))}

              {/* Action Buttons */}
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{}}>
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
                    {friends.requests.length || 0}
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
                    {posts?.length}
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

              {me?.profile == profile._id ? (
                <Button
                  title="Edit Profile"
                  handlePress={() => {
                    console.log("Add Friend");
                  }}
                />
              ) : (
                <Button
                  title="Add Friend"
                  handlePress={() => {
                    console.log("Add Friend");
                  }}
                />
              )}
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
                  marginBottom: 30,
                }}
              >
                {profile?.name}'s Post
              </Text>
            </View>

            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingVertical: 10,
              }}
            >
              {["workout", "nutrition", "motivation", "general"].map(
                (category, index) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 20,
                      marginHorizontal: 10,
                    }}
                    key={index}
                    onPress={() => console.log("")}
                  >
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: "semibold",
                        marginHorizontal: 8,
                        marginVertical: 5,
                      }}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
  postCard: {},
  postImage: {
    width: "100%",
    height: 500,
    resizeMode: "cover",

    marginBottom: 10,
  },
  postVideo: {
    width: "100%",
    height: 500,
    // right: 30,

    marginBottom: 10,
  },
  postContent: {},
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postBody: {},
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  actionButtonText: {
    fontSize: 14,
    color: "#333",
  },
});
