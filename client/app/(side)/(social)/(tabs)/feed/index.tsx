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
import Carousel from "react-native-reanimated-carousel";

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

  const renderCarousel = (media) => {
    return (
      <Carousel
        data={media}
        renderItem={({ item }) => renderMedia(item)}
        width={width}
        height={500} // Set height according to aspect ratio
        scrollAnimationDuration={300}
        loop={false}
        mode="parallax"
        parallaxOffset={50}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>User Feed</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={[
              {
                marginBottom: 16,
                borderRadius: 10,
                overflow: "hidden",
                marginHorizontal: 15,

                padding: 10,
              },
              { backgroundColor: colors.opacity },
            ]}
          >
            {/* Render Media Carousel (Images and Videos) */}
            {item.media && item.media.length > 1
              ? renderCarousel(item.media)
              : item.media &&
                item.media.map((mediaItem) => renderMedia(mediaItem))}

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
        )}
      />
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
    height: 450,
    right: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  postVideo: {
    width: "100%",
    height: 450,
    right: 30,

    borderRadius: 10,
    marginBottom: 10,
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
