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
import { LinearGradient } from "expo-linear-gradient";

const challengeData = [
  {
    image:
      "https://cdn.pixabay.com/photo/2020/11/03/13/04/yoga-5709767_640.png",
    title: "30-Day Pilates Challenge",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/019/617/125/small/healthy-heart-cartoon-png.png",
    title: "21-Day Sugar Free",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://images.vexels.com/content/258271/preview/body-parts-belly-edb849.png",
    title: "28-Day Flatter Belly",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://www.wholesomefood.org/images/xbridge.png.pagespeed.ic.Zx7oyDyyY2.png",
    title: "21-Day Defined Butt",
    participants: "39.7k",
    price: "11.99",
  },
  {
    image:
      "https://png.pngtree.com/png-clipart/20220419/original/pngtree-man-doing-walking-exercise-png-image_7538567.png",
    title: "30-Day Walking Challenge",
    participants: "39.7k",
    price: "11.99",
  },
];

const ChallengeItem = ({ data, navigation, colors }) => (
  <TouchableOpacity
    style={{
      marginBottom: 30,
      borderRadius: 25,
      overflow: "hidden",
      marginHorizontal: 16,
      height: 350,
    }}
    onPress={() => navigation.navigate("ChallengeDetails")}
  >
    <View
      style={{
        backgroundColor: "red",
        borderRadius: 25,
      }}
    >
      <LinearGradient
        colors={["rgba(209, 192, 221, 0.6)", "rgba(218, 198, 250,0.9)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: 25,
        }}
      />
      <Image source={{ uri: data.image }} style={styles.challengeImage} />
    </View>
    <View
      style={{
        marginLeft: 5,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: 600,
          color: colors.text,
          marginVertical: 10,
        }}
      >
        {data.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#777",
          }}
        >
          {data.participants} Participants
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#777",
            marginLeft: 10,
          }}
        >
          US$ {data.price}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          // marginHorizontal: 20,
          marginTop: 20,
          padding: 15,
          borderRadius: 25,
          backgroundColor: "#c7c7c7",
          width: "100%",
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          JOIN NOW!
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
const challengeScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  return (
    <View
      style={[
        defaultStyles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        // style={{
        //   paddingHorizontal: screenPadding.horizontal,
        // }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={styles.discoverText}>DISCOVER</Text>
        {challengeData?.map((item, index) => (
          <View key={index}>
            <ChallengeItem
              data={item}
              navigation={navigation}
              colors={colors}
            />
          </View>
        ))}
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
  challengeItem: {},
  challengeImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  challengeInfo: {
    padding: 16,
  },
  challengeTitle: {},
  challengeParticipants: {},
  challengePrice: {},
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
