import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/token";
import { useTheme } from "@/constants/ThemeProvider";
import { useRouter } from "expo-router";
const ChallengeItem = ({
  image,
  title,
  participants,
  price,
  navigation,
}: {
  image: any;
  title: string;
  participants: string;
  price: string;
  navigation: any;
}) => (
  <TouchableOpacity
    style={styles.challengeItem}
    onPress={() => navigation.navigate("ChallengeDetails")}
  >
    <Image source={image} style={styles.challengeImage} />
    <View style={styles.challengeInfo}>
      <Text style={styles.challengeTitle}>{title}</Text>
      <Text style={styles.challengeParticipants}>{participants}</Text>
      <Text style={styles.challengePrice}>{price}</Text>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>JOIN NOW!</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
const challengeScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.discoverText}>DISCOVER</Text>
        <ChallengeItem
          image={{ uri: "https://path-to-your-image/pilates.jpg" }} // replace with actual image path
          title="30-Day Pilates Challenge"
          participants="37.2K Participants"
          price="US$11.99"
          navigation={navigation}
        />
        <ChallengeItem
          image={{ uri: "https://path-to-your-image/sugar-free.jpg" }} // replace with actual image path
          title="21-Day Sugar Free"
          participants="24.3K Participants"
          price="US$8.99"
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

export default challengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  discoverText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 16,
  },
  challengeItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  challengeImage: {
    width: "100%",
    height: 200,
  },
  challengeInfo: {
    padding: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  challengeParticipants: {
    fontSize: 14,
    color: "#777",
  },
  challengePrice: {
    fontSize: 14,
    color: "#777",
  },
  joinButton: {
    marginTop: 16,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
