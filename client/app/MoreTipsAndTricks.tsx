import { useTheme } from "@/constants/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import FastImage from "react-native-fast-image";

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
