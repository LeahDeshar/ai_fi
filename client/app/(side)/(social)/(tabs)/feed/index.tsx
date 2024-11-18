import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Share,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import {
  SOCKET_SERVER_URL,
  useGetAccessiblePostQuery,
  useGetAllUserPostQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import { useTheme } from "@/constants/ThemeProvider";
import { Video } from "expo-av";
const { width } = Dimensions.get("window");
import Carousel from "react-native-reanimated-carousel";
import PostDate from "@/utils/PostDate";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { PostLikeComponent, renderReply } from "@/app/ViewProfile";
import { useSelector } from "react-redux";
import axios from "axios";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
const FeedScreen = () => {
  const { colors } = useTheme();
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useGetAccessiblePostQuery();
  const navigation = useNavigation();

  const { user: me, token, isLoggedIn } = useSelector((state) => state.auth);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const flatListRef = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const {
    data: profile,
    error: profileError,
    isLoading: profileIsLoading,
    refetch: fetchProfile,
  } = useGetProfileQuery();

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
  const openBottomSheet = (postId) => {
    console.log(" called");
    bottomSheetRef.current?.present();
    setSelectedPostId(postId);

    const getData = async () => {
      try {
        const response = await axios.get(
          `${SOCKET_SERVER_URL}/api/v1/comment/get`,
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
    };

    getData();
  };
  const [visibleReplies, setVisibleReplies] = useState({});
  const handleReplyShow = (commentId) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [commentId]: !prevVisibleReplies[commentId],
    }));
  };
  const handleShare = async ({ post }) => {
    const postContent = post.content || "Check out this post!";
    const postMediaUrl = post.media?.[0]?.url || "";

    try {
      const result = await Share.share({
        message: `${postContent}\n${postMediaUrl}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Post shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to share this post."
      );
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
      refetch();

      const responseCom = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/comment/get`,
        {
          params: {
            postId: selectedPostId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(responseCom.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    setNewComment("");
    setReplyingTo(null);
    Keyboard.dismiss();
  };
  const renderComment = ({ item, colors }) => (
    <View
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        marginHorizontal: 10,
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
              marginTop: 10,
              width: "75%",
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
              <AntDesign name="like2" size={20} color="#757575ea" />
              <Text>{item?.reactions?.likes.length || ""}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <AntDesign name="dislike2" size={20} color="#757575ea" />
              <Text>{item?.reactions?.dislikes.length || ""}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReplyingTo(item)}>
              <Text style={{ color: "blue" }}>
                {item?.replies.length} Reply
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              onPress={() => handleReplyShow(item._id)}
            >
              <AntDesign name="caretdown" size={15} color="#757575ea" />
              <Text
                style={{
                  color: "#757575ea",
                  fontSize: 13,
                }}
              >
                {visibleReplies[item._id] ? "Hide Replies" : "Show Replies"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {visibleReplies[item._id] && item?.replies?.length > 0 && (
              <View
                style={{
                  marginLeft: 0,
                  borderColor: "#afaaaa3d",
                  borderRadius: 25,
                  paddingVertical: 10,
                  borderWidth: 1,
                  marginTop: 8,
                }}
              >
                {item.replies.map((reply) => renderReply({ reply }))}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
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
        height={500} // Set height according to aspect ratio
        loop={false}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              top: 10,
              paddingTop: 10,
              // backgroundColor: "white",
              paddingBottom: 10,
              gap: 5,
              paddingHorizontal: 10,
              marginBottom: 30,
            }}
            onPress={() => navigation.navigate("CreatePost")}
          >
            <Image
              source={{ uri: profile?.profileOfUsers?.profilePic?.url }}
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: 20,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                }}
              >
                What's on your mind?
              </Text>
            </View>
          </TouchableOpacity>

          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View
                style={[
                  {
                    marginBottom: 16,
                    paddingBottom: 15,
                    // top: 50,
                    // overflow: "hidden",

                    // padding: 10,
                  },
                  { backgroundColor: colors.opacity },
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
                    source={{ uri: item?.user?.profile?.profilePic?.url }}
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
                      {item?.user?.profile?.name}
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
                {/* Render Media Carousel (Images and Videos) */}
                {item.media && item.media.length > 1
                  ? renderCarousel(item.media)
                  : item.media &&
                    item.media.map((mediaItem) => renderMedia(mediaItem))}

                {/* Post Content */}
                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                      gap: 5,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#00a2ff",
                          borderRadius: 25,
                          padding: 3,
                        }}
                      >
                        <Entypo
                          name="thumbs-up"
                          size={15}
                          color={colors.text}
                        />
                      </View>
                      <Text style={[{ color: colors.text }, styles.actionText]}>
                        {item?.likes.length || 0}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={[{ color: colors.text }, styles.actionText]}>
                        {item?.comments.length || 0} comments
                      </Text>
                    </View>
                  </View>
                  <View style={styles.postActions}>
                    <PostLikeComponent
                      post={item}
                      token={token}
                      colors={colors}
                      refetch={refetch}
                      me={me}
                    />

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => openBottomSheet(item._id)}
                      // onPress={() => openComments(item._id)}
                    >
                      <EvilIcons name="comment" size={25} color={colors.text} />
                      <Text style={[{ color: colors.text }, styles.actionText]}>
                        Comment
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleShare({ post: item })}
                      style={styles.actionButton}
                    >
                      <Fontisto name="share-a" size={20} color={colors.text} />
                      <Text style={[{ color: colors.text }, styles.actionText]}>
                        Share
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <BottomSheetModal
                  snapPoints={["20%", "80%"]}
                  ref={bottomSheetRef}
                  index={1}
                  backdropComponent={BottomSheetBackdrop}
                  handleComponent={() => <View />}
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
                      top: 15,
                      marginHorizontal: 10,
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
                      <TouchableOpacity>
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

                  <View style={{ marginBottom: 15, bottom: 80 }}>
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
                      bottom: 95,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Image
                      source={{ uri: profile?.profileOfUsers?.profilePic?.url }}
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
                        {replyingTo ? "Reply" : "Comment"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BottomSheetModal>
              </View>
            )}
          />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
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
    marginTop: 15,
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
export default FeedScreen;
