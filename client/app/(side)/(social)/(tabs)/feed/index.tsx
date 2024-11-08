import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useGetAllUserPostQuery } from "@/redux/api/apiClient";
import { useTheme } from "@/constants/ThemeProvider";
import { Video } from "expo-av";
const { width } = Dimensions.get("window");
const FeedScreen = () => {
  const { colors } = useTheme();
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
          resizeMode="contain"
          isLooping
        />
      );
    }
    return null;
  };
  const renderPost = ({ item }) => (
    <View style={[styles.postCard, { backgroundColor: colors.card }]}>
      {/* Render Multiple Media */}
      <View style={styles.mediaContainer}>
        {item.media.map((mediaItem) => renderMedia(mediaItem))}
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={[styles.postTitle, { color: colors.text }]}>
          Post {item._id}
        </Text>
        <Text style={[styles.postBody, { color: colors.text }]}>
          Created at: {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>

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
  );
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>User Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  postCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    elevation: 5, // Shadow effect for Android
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginHorizontal: 10,
  },
  mediaContainer: {
    flexDirection: "row", // Display media horizontally
    flexWrap: "wrap", // Allow media to wrap to the next row
    marginBottom: 10,
  },
  postImage: {
    width: width / 2 - 20, // 2 images per row
    height: width / 2 - 20, // Maintain square aspect ratio
    margin: 5,
    borderRadius: 10,
  },
  postVideo: {
    width: width - 20, // Full width for videos
    height: width * (9 / 16), // 16:9 aspect ratio
    margin: 10,
    borderRadius: 10,
  },
  postContent: {
    marginVertical: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postBody: {
    fontSize: 14,
    marginVertical: 5,
  },
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

export default FeedScreen;
