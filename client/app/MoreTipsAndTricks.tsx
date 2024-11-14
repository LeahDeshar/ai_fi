import { useTheme } from "@/constants/ThemeProvider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";

const articles = [
  {
    id: "1",
    category: "NUTRITION",
    title: "Healthy Ways to Sweeten Coffee",
    time: "6 MIN READ",
    image: "https://example.com/healthy-coffee.jpg", // Replace with your image URL
    likes: 738,
  },
  {
    id: "2",
    category: "FITNESS",
    title: "Does Stretching Build Muscle? Studies Explained",
    time: "4 MIN READ",
    image: "https://example.com/stretching-muscle.jpg", // Replace with your image URL
    likes: 564,
  },
];

const ArticleItem = ({ article, colors }) => (
  <TouchableOpacity style={styles.articleContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={require("../assets/tipsarticle/t1.jpg")}
        style={styles.image}
      />
      <View style={styles.likesContainer}>
        <Ionicons name="heart-outline" size={24} color="#fff" />
        <Text style={[styles.likesText]}>{article.likes}</Text>
      </View>
    </View>
    <Text
      style={[
        styles.categoryText,
        {
          color: colors.text,
        },
      ]}
    >
      {article.category}
    </Text>
    <Text
      style={[
        styles.titleText,
        {
          color: colors.text,
        },
      ]}
    >
      {article.title}
    </Text>
    <Text
      style={[
        styles.timeText,
        {
          color: colors.text,
        },
      ]}
    >
      {article.time}
    </Text>
  </TouchableOpacity>
);

const MoreTipsAndTricks = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.header,
          {
            color: colors.text,
          },
        ]}
      >
        Topics for You
      </Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleItem colors={colors} article={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const VideoRecommendations = () => {
  const [videoId, setVideoId] = useState("some_video_id"); // Replace with the actual video ID
  const [recommendations, setRecommendations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/recommend", {
          video_id: videoId,
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [videoId]);

  const openVideoModal = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideoUrl("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={styles.thumbnail}
            />

            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.channelTitle}>
                Channel: {item.channelTitle}
              </Text>

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Ionicons name="md-eye" size={16} color="#555" />
                  <Text style={styles.metaText}>{item.viewCount}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="thumb-up" size={16} color="#555" />
                  <Text style={styles.metaText}>{item.likeCount}</Text>
                </View>
              </View>

              <Text style={styles.date}>
                Published on: {item.Publish_date} at {item.Publish_time}
              </Text>
              <Text style={styles.description}>
                {item.description.length > 100
                  ? item.description.slice(0, 100) + "..."
                  : item.description}
              </Text>

              <View style={styles.tagsContainer}>
                {item.tags.split(",").map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    #{tag.trim()}
                  </Text>
                ))}
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  openVideoModal(
                    `https://www.youtube.com/watch?v=${item.videoId}`
                  )
                }
              >
                <Text style={styles.buttonText}>Watch Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal to play YouTube Video */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.webviewContainer}>
            <WebView
              source={{ uri: selectedVideoUrl }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  articleContainer: {
    marginBottom: 16,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  likesContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    borderRadius: 5,
  },
  likesText: {
    color: "#fff",
    marginLeft: 5,
  },
  categoryText: {
    color: "#FF6347", // Example color, change as needed
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
});

export default MoreTipsAndTricks;
