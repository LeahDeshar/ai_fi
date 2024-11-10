import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
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
import PostDate from "@/utils/PostDate";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { TextInput } from "react-native";

const { width } = Dimensions.get("window");
import { io } from "socket.io-client";
import axios from "axios";

const SOCKET_SERVER_URL = "http://192.168.1.11:8080";
const socket = io(SOCKET_SERVER_URL);
const ViewProfile = () => {
  const { user } = useLocalSearchParams();
  const { colors, dark } = useTheme();
  const [profile, setProfile] = useState(null);
  const { user: me, token, isLoggedIn } = useSelector((state) => state.auth);
  const flatListRef = useRef(null);

  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  // console.log(comments.map((item) => item.replies));

  comments.forEach((comment) => {
    // Log the comment itself
    console.log("Comment:", comment);

    // Access replies if they exist
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach((reply) => {
        console.log("Reply Content:", reply.content);

        // Access the user profile for the reply
        if (reply.user && reply.user.profile) {
          console.log("Reply User:", reply.user.profile.name);
        } else {
          console.log("Reply User data is missing");
        }
      });
    } else {
      console.log("No replies found for this comment");
    }
  });

  // [{"__v": 0, "_id": "673071ee0827492d5cdb2a88", "content": "Hi", "createdAt": "2024-11-10T08:42:22.824Z", "parentComment": null, "post": "672e2248b4340a33e39b9452", "reactions": {"dislikes": [Array], "likes": [Array]}, "updatedAt": "2024-11-10T08:42:22.824Z", "user": {"_id": "67189a704f4eed52a1cfb7ae"}}]

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

  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const openComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://192.168.1.11:8080/api/v1/comment/get`,
        {
          params: {
            postId: postId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setSelectedPostId(postId);
    setIsCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalVisible(false);
    setSelectedPostId(null);
  };
  const handleAddReply = async () => {
    try {
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/comment/reply`,
        {
          postId: selectedPostId,
          content: newComment,
          parentCommentId: replyingTo?._id, // Replying to this comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update comments state with the new reply
      const updatedComments = comments?.map((comment) => {
        if (comment._id === replyingTo?._id) {
          return { ...comment, replies: [...comment.replies, response.data] };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/comment/add`,
        {
          post: selectedPostId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    setNewComment("");
    setReplyingTo(null);
    Keyboard.dismiss();
  };

  // const renderReply = ({ reply }) => (
  //   <View
  //     key={reply._id}
  //     style={{
  //       marginLeft: 40,
  //       marginTop: 5,
  //       paddingVertical: 5,
  //       borderBottomWidth: 1,
  //       borderColor: "#e0e0e0",
  //     }}
  //   >
  //     <Text style={{ fontWeight: "bold", color: "black" }}>{reply._id}</Text>
  //     <Text style={{ fontWeight: "bold", color: "black" }}>{reply._id}</Text>
  //     <Text>{reply.content}</Text>
  //   </View>
  // );

  const renderReply = ({ reply }) => (
    <View
      key={reply._id}
      style={{
        marginLeft: 40,
        marginTop: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      {/* Reply Content */}
      <Text style={{ fontWeight: "bold", color: "black" }}>
        {reply.content}
      </Text>

      {/* User Profile */}
      {reply.user && reply.user.profile ? (
        <Text style={{ color: "gray", fontStyle: "italic" }}>
          Replied by: {reply.user.profile.name}
        </Text>
      ) : (
        <Text style={{ color: "red", fontStyle: "italic" }}>
          User data missing
        </Text>
      )}
    </View>
  );
  const renderComment = ({ item }) => (
    <View
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 5,
        }}
      >
        <Image
          source={{ uri: item?.user?.profile.profilePic.url }}
          style={{ width: 30, height: 30, borderRadius: 50 }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                @{item?.user?.profile.name}
              </Text>
              <PostDate colors={colors} createdAt={item.createdAt} />
            </View>
            <TouchableOpacity>
              <SimpleLineIcons
                name="options-vertical"
                size={13}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 5,
            }}
          >
            {item?.content}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              width: "35%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AntDesign name="like2" size={20} color="black" />
              <Text>{item?.reactions?.likes.length || ""}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AntDesign name="dislike2" size={20} color="black" />
              <Text>{item?.reactions?.dislikes.length || ""}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReplyingTo(item)}>
              <Text style={{ color: "blue" }}>
                {item?.replies.length} Reply
              </Text>
            </TouchableOpacity>
          </View>
          {item?.replies?.length > 0 && (
            <View style={{ marginLeft: 20 }}>
              {item.replies.map((reply) => renderReply({ reply }))}
            </View>
          )}
        </View>
      </View>
    </View>
  );

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
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <View
            style={[
              {
                marginBottom: 16,
                overflow: "hidden",
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
                borderBottomColor: "#cccccc2a",
                borderTopColor: "#cccccc2a",

                paddingVertical: 10,
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
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Entypo name="thumbs-up" size={20} color={colors.text} />
                <Text style={[{ color: colors.text }, styles.actionText]}>
                  Like
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openComments(item._id)}
              >
                <EvilIcons name="comment" size={25} color={colors.text} />
                <Text style={[{ color: colors.text }, styles.actionText]}>
                  Comment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Fontisto name="share-a" size={20} color={colors.text} />
                <Text style={[{ color: colors.text }, styles.actionText]}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={isCommentModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={closeCommentModal}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
                <Pressable
                  style={{
                    flex: 1,
                  }}
                  onPress={closeCommentModal}
                />
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingTop: 20,
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 15,
                      borderBottomColor: "#c1c1c194",
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Comments
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <TouchableOpacity>
                        <Ionicons name="options" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={closeCommentModal}>
                        <AntDesign name="close" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <FlatList
                    ref={flatListRef}
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ flex: 1 }}
                  />

                  <View style={{ marginBottom: 15 }}>
                    {replyingTo && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ color: "gray" }}>
                          Replying to {replyingTo?.user?.profile.name}
                        </Text>
                        <Text
                          style={{ color: "red", marginLeft: 5 }}
                          onPress={() => setReplyingTo(null)}
                        >
                          (Cancel)
                        </Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderTopWidth: 1,
                      borderColor: "#e0e0e0",
                      paddingTop: 10,
                      backgroundColor: "white",
                      paddingBottom: 10,
                      gap: 5,
                      bottom: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Image
                      source={{ uri: profile?.profilePic?.url }}
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <TextInput
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "#e0e0e0",
                        borderRadius: 20,
                        padding: 10,
                        marginRight: 10,
                      }}
                      placeholderTextColor={"grey"}
                      placeholder={
                        replyingTo ? "Replying..." : "Add a comment..."
                      }
                      value={newComment}
                      onChangeText={setNewComment}
                    />
                    {/* <TouchableOpacity onPress={handleAddComment}>
                      <Text style={{ color: "blue" }}>
                        {replyingTo ? "Reply" : "Post"}
                      </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                      onPress={replyingTo ? handleAddReply : handleAddComment}
                    >
                      <Text style={{ color: "blue" }}>
                        {replyingTo ? "Post Reply" : "Post Comment"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
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
                    {friends?.requests?.length || 0}
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

              {me?.profile == profile?._id ? (
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionText: {},
});
