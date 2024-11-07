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
import { useTheme } from "@/constants/ThemeProvider";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import Button from "@/components/Button";

const FriendScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { data: userProfile } = useGetallUsersProfileQuery();
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const currentUserRole = profile?.profileOfUsers?.role;

  const filteredUsers = userProfile?.data?.filter((trainer) =>
    currentUserRole === "coach"
      ? trainer.role === "coach"
      : trainer.role === "user"
  );
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
          paddingTop: 110,
        }}
      >
        {filteredUsers.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 25,
              borderRadius: 30,
              paddingLeft: 20,
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: item.profilePic.url }}
              style={{ width: 70, height: 70, borderRadius: 10 }}
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
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  //   marginVertical: 16,
                  gap: 20,
                }}
              >
                <Button
                  title="Add Friend"
                  handlePress={() =>
                    navigation.navigate("ViewProfile", {
                      user: JSON.stringify(item),
                    })
                  }
                />
                <Button
                  title="View Profile"
                  handlePress={() => {
                    console.log("Profile");
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
