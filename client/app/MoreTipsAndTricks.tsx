import { useTheme } from "@/constants/ThemeProvider";
import { useGetYtQuery } from "@/redux/api/apiClient";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { Video } from "expo-av";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MoreTipsAndTricks = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: 50,
        },
      ]}
    >
      <VideoRecommendations colors={colors} />
    </View>
  );
};
const VideoRecommendations = ({ colors }) => {
  const [videoId, setVideoId] = useState("wJhYFxMmB5E");
  const [recommendations, setRecommendations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const { data: ytData, error, isLoading } = useGetYtQuery();
  const [ydata, setYdata] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectVideo, setSelectVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const nav = useNavigation();
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (ytData) {
      let randomizedRecommendations = shuffleArray(ytData.slice(0, 50));
      setYdata(randomizedRecommendations);
    }
  }, [ytData]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.18:8080/api/v1/fitness/get-channel",
          {
            video_id: videoId,
          }
        );
        setRecommendations(response.data.video);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [videoId]);

  const openBottomSheet = (item) => {
    nav.push("VideoView", {
      videoData: JSON.stringify(item),
      datare: JSON.stringify(recommendations),
    });
    setSelectVideo(item);
    openVideoModal(
      `https://www.youtube.com/watch?v=${item.video_id}`,
      item.video_id
    );
  };

  const getYouTubeThumbnail = (video_id) => {
    return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  };

  const openVideoModal = (videoUrl, video_id) => {
    setSelectedVideoUrl(videoUrl);
    setVideoId(video_id);
    setModalVisible(true);
  };

  const fetchMoreData = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    const nextPageData = ytData.slice(page * 50, (page + 1) * 50);
    const randomizedRecommendations = shuffleArray(nextPageData);

    setYdata((prevData) => [...prevData, ...randomizedRecommendations]);
    setPage((prevPage) => prevPage + 1);
    setIsLoadingMore(false);
  };

  const filteredRecommendations = ydata?.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channelTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 2,
          }}
        >
          <Feather name="tv" size={18} color={colors.text} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
            }}
          >
            {/* <Text
              style={[
                styles.header,
                {
                  color: colors.text,
                  left: 18,
                },
              ]}
            >
              fi
            </Text> */}
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 25,
              backgroundColor: colors.opacity,
              marginRight: 10,
              color: colors.text,
              paddingLeft: 20,
              paddingRight: 50,
            }}
            placeholder="Search videos..."
            value={searchQuery}
            placeholderTextColor={colors.text}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 30,
              }}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={24} color="#555" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={searchQuery ? filteredRecommendations : ydata}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openBottomSheet(item)}
          >
            <Image
              source={{ uri: getYouTubeThumbnail(item.video_id) }}
              style={styles.thumbnail}
              alt="Video Thumbnail"
            />

            <View style={styles.cardContent}>
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {item.title}
              </Text>
              <Text style={[styles.channelTitle]}>{item.channelTitle}</Text>

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Ionicons name="eye" size={16} color="#555" />
                  <Text style={styles.metaText}>{item.viewCount}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="thumb-up" size={16} color="#555" />
                  <Text style={styles.metaText}>{item.likeCount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? <Text>Loading more...</Text> : null
        }
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  articleContainer: {
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchInput: {},
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
    color: "#FF6347",
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

  card: {
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  channelTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  metaInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    fontSize: 12,
    color: "#007bff",
    marginRight: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  webviewContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
    borderRadius: 10,
  },
});

export default MoreTipsAndTricks;

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
