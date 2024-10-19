import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";

const ChallengeDetails = () => {
  const { colors } = useTheme();
  const prizeText = [
    "Join the challenge and follow everyday tasks",
    "Share your transformation insights with us",
    "Get the prize for the best story",
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ParallaxScrollView
        headerImage={
          <Image
            source={{
              uri: "https://res.cloudinary.com/hydrow/image/upload/f_auto/w_1000/q_100/v1693335737/Blog/workout-alone.jpg",
            }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        }
        headerBackgroundColor={{
          dark: colors.background,
          light: colors.background,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            30-Day Pilates Challenge
          </Text>
          {/* <Button
            handlePress={() => {}}
            title="Join Challenge"
            style={{
              marginHorizontal: 16,
              marginTop: 20,
              backgroundColor: colors.primary,
            }}
          /> */}
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              padding: 15,
              borderRadius: 25,
              backgroundColor: "#b50101",
              width: "90%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              JOIN CHALLENGE
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                marginVertical: 15,
              }}
            >
              WHAT YOU'LL GET
            </Text>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../assets/cha1.jpg")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 9,
                  resizeMode: "cover",
                }}
              />
              <View>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "semibold",
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  Greater productivity
                </Text>
                <Text
                  style={{
                    color: "#808080",
                    fontSize: 16,
                    marginLeft: 10,
                    marginTop: 6,
                  }}
                >
                  lower stress levels
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Image
                source={require("../assets/cha1.jpg")}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 9,
                  resizeMode: "cover",
                }}
              />
              <View>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "semibold",
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                >
                  Greater productivity
                </Text>
                <Text
                  style={{
                    color: "#808080",
                    fontSize: 16,
                    marginLeft: 10,
                    marginTop: 6,
                  }}
                >
                  lower stress levels
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 30,
              }}
            >
              <Image
                source={require("../assets/gift.jpg")}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 9,
                  resizeMode: "center",
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 70,
                  left: 40,
                  fontSize: 30,
                  width: "50%",
                  fontWeight: "semibold",
                }}
              >
                Get Special Prizes
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              {prizeText?.map((prize, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginVertical: 6,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                    }}
                  >
                    {index + 1}.
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    {prize}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  marginVertical: 15,
                }}
              >
                WHAT USERS SAY
              </Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                <WhatUserSays />
                <WhatUserSays />
                <WhatUserSays />
                <WhatUserSays />
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                marginVertical: 15,
              }}
            >
              ABOUT CHALLENGE
            </Text>
            <Text
              style={{
                color: "#808080",
                fontSize: 16,
                lineHeight: 24,
                marginBottom: 20,
                textAlign: "justify",
              }}
            >
              These days more and more women experience bladder leaks, feeling
              like you can’t fully empty your bladder when going to the toilet,
              a constant urge to urinate, feelings of discomfort, burning
              sensation in the crotch area, excessive discharge, frequently
              passing gas, and persistent lower abdominal pain. All of this
              takes a toll on your quality of life. This 28-day challenge offers
              you a holistic approach to improving your female health by
              strengthening your pelvic floor muscles. You can forget about your
              struggles with an overactive bladder or unintentional leaks when
              coughing, sneezing, or laughing. Say goodbye to the bloated baby
              belly, puffy face, and swelling in various parts of the body. The
              exercises you will discover during this challenge will also
              increase your sexual pleasure so that you can enjoy your sex life
              to the max – this means stronger orgasms and increased production
              of natural lubrication during sex. So, let’s get started with
              developing healthy habits to keep us in shape, improve our
              well-being, and keep us young and beautiful for many years to
              come!
            </Text>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export default ChallengeDetails;

const styles = StyleSheet.create({});

function WhatUserSays() {
  return (
    <View
      style={{
        backgroundColor: "#a2a2a2",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: 350,
        marginRight: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          John Doe
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <Ionicons name="star" color={"orange"} />
          <Ionicons name="star" color={"orange"} />
          <Ionicons name="star" color={"orange"} />
          <Ionicons name="star" color={"orange"} />
          <Ionicons name="star" color={"orange"} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 16,
          marginVertical: 10,
          color: "#494949",
        }}
      >
        The challenge was amazing. I feel more energetic and healthier than
        ever. I would recommend it to everyone.
      </Text>
    </View>
  );
}
