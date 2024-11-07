import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { Image } from "react-native";

const ViewProfile = () => {
  const { user } = useLocalSearchParams();
  const { colors } = useTheme();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(JSON.parse(user));
    }
  }, [user]);

  console.log(profile);
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
        contentContainerStyle={{
          paddingTop: 90,
        }}
      >
        <Image
          source={{ uri: profile?.profilePic?.url }}
          style={{ width: "100%", height: 180, resizeMode: "cover" }}
        />
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 5,
            }}
          >
            {profile?.name}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({});
