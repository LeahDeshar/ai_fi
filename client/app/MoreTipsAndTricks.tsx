import { useTheme } from "@/constants/ThemeProvider";
import { useGetYtQuery } from "@/redux/api/apiClient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Video } from "expo-av";
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
import YouTubeIframe from "react-native-youtube-iframe";

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
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: 100,
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
      <VideoRecommendations colors={colors} />
      {/* <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleItem colors={colors} article={item} />
        )}
        keyExtractor={(item) => item.id}
      /> */}
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
  const [page, setPage] = useState(1); // Current page
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5); // Create a copy of the array first
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

  const getYouTubeThumbnail = (video_id) => {
    return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  };

  const openVideoModal = (videoUrl, video_id) => {
    setSelectedVideoUrl(videoUrl);
    setVideoId(video_id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideoUrl("");
  };
  const fetchMoreData = async () => {
    if (isLoadingMore) return; // Prevent multiple requests at the same time
    setIsLoadingMore(true);

    // Load next page of data
    const nextPageData = ytData.slice(page * 50, (page + 1) * 50); // Load next 50 items
    const randomizedRecommendations = shuffleArray(nextPageData);

    // Update state with new data
    setYdata((prevData) => [...prevData, ...randomizedRecommendations]);
    setPage((prevPage) => prevPage + 1); // Increment page
    setIsLoadingMore(false);
  };
  return (
    <View
      style={{
        backgroundColor: colors.opacity,
      }}
    >
      <FlatList
        data={ydata}
        keyExtractor={(item, index) => index.toString()}
        // ListHeaderComponent={
        //   <View>
        //     {recommendations?.map((re, index) => (
        //       <View style={styles.card}>
        //         <YouTubeIframe
        //           videoId={re?.video_id}
        //           height={300}
        //           play={false}
        //           onChangeState={(state) => console.log(state)}
        //         />

        //         <Image
        //           source={{ uri: getYouTubeThumbnail(re?.video_id) }}
        //           style={styles.thumbnail}
        //           alt="Video Thumbnail"
        //         />

        //         <View style={styles.cardContent}>
        //           <Text style={styles.title}>{re?.title}</Text>
        //           <Text style={styles.channelTitle}>
        //             Channel: {re?.channelTitle}
        //           </Text>

        //           <View style={styles.metaInfo}>
        //             <View style={styles.metaItem}>
        //               <Ionicons name="eye" size={16} color="#555" />
        //               <Text style={styles.metaText}>{re?.viewCount}</Text>
        //             </View>
        //             <View style={styles.metaItem}>
        //               <MaterialIcons name="thumb-up" size={16} color="#555" />
        //               <Text style={styles.metaText}>{re?.likeCount}</Text>
        //             </View>
        //           </View>

        //           <Text style={styles.date}>
        //             Published on: {re?.Publish_date} at {re?.Publish_time}
        //           </Text>

        //           <View style={styles.tagsContainer}>
        //             {re?.tags.split(",").map((tag, index) => (
        //               <Text key={index} style={styles.tag}>
        //                 #{tag.trim()}
        //               </Text>
        //             ))}
        //           </View>

        //           <TouchableOpacity
        //             style={styles.button}
        //             onPress={() =>
        //               openVideoModal(
        //                 `https://www.youtube.com/watch?v=${re?.video_id}`,
        //                 re?.video_id
        //               )
        //             }
        //           >
        //             <Text style={styles.buttonText}>Watch Now</Text>
        //           </TouchableOpacity>
        //         </View>
        //       </View>
        //     ))}
        //   </View>
        // }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openVideoModal(
                `https://www.youtube.com/watch?v=${item.video_id}`,
                item?.video_id
              )
            }
          >
            <Image
              source={{ uri: getYouTubeThumbnail(item.video_id) }}
              style={styles.thumbnail}
              alt="Video Thumbnail"
            />

            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.channelTitle}>
                Channel: {item.channelTitle}
              </Text>

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

              <Text style={styles.date}>
                Published on: {item.Publish_date} at {item.Publish_time}
              </Text>

              {/* <View style={styles.tagsContainer}>
                {item.tags.split(",").map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    #{tag.trim()}
                  </Text>
                ))}
              </View> */}
            </View>
          </TouchableOpacity>
        )}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? <Text>Loading more...</Text> : null
        }
      />

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

  card: {
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  webviewContainer: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  webview: {
    flex: 1,
    borderRadius: 10,
  },
});

export default MoreTipsAndTricks;
