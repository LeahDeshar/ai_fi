import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import YoutubeIframe from "react-native-youtube-iframe";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const VideoView = () => {
  const { videoData, datare } = useLocalSearchParams();
  const [select, setSelected] = useState(null);

  const data = JSON.parse(videoData);
  const re = JSON.parse(datare);
  const getYouTubeThumbnail = (video_id) => {
    return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
  };

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <View>
      <YoutubeIframe
        videoId={select || data?.video_id}
        height={240}
        play={true}
        onChangeState={(state) => console.log(state)}
      />

      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 300,
        }}
      >
        {re?.map((re, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(re.video_id)}
            style={styles.card}
          >
            <Image
              source={{ uri: getYouTubeThumbnail(re?.video_id) }}
              style={styles.thumbnail}
              alt="Video Thumbnail"
            />

            <View style={styles.cardContent}>
              <Text style={styles.title}>{re?.title}</Text>
              <Text style={styles.channelTitle}>
                Channel: {re?.channelTitle}
              </Text>

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Ionicons name="eye" size={16} color="#555" />
                  <Text style={styles.metaText}>{re?.viewCount}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="thumb-up" size={16} color="#555" />
                  <Text style={styles.metaText}>{re?.likeCount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoView;

const styles = StyleSheet.create({
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
  metaInfo: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 50,
  },
  card: {
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    gap: 10,
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
});
