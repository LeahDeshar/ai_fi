import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import Button from "@/components/Button";
import { io } from "socket.io-client";
import axios from "axios";
const SOCKET_SERVER_URL = "http://192.168.1.11:8080";
const socket = io(SOCKET_SERVER_URL);

const FriendScreen = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();

  const { data: userProfile } = useGetallUsersProfileQuery();
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const currentUserRole = profile?.profileOfUsers?.role;

  const userId = user._id;

  // const filteredUsers = userProfile?.data?.filter((trainer) =>
  //   currentUserRole === "coach"
  //     ? trainer.role === "coach"
  //     : trainer.role === "user"
  // );
  const [friendStatuses, setFriendStatuses] = useState({}); // Track friend request statuses

  const filteredUsers = userProfile?.data?.filter((trainer) =>
    currentUserRole === "coach"
      ? trainer.role === "coach"
      : trainer.role === "user"
  );

  useEffect(() => {
    // Listen for incoming friend request updates
    socket.on("friendRequestUpdate", (notification) => {
      const { recipient, status } = notification;
      setFriendStatuses((prevStatuses) => ({
        ...prevStatuses,
        [recipient]: status,
      }));
    });

    return () => {
      socket.off("friendRequestUpdate");
    };
  }, []);

  const handleFriendRequest = async ({ requesterId, recipientId }) => {
    try {
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/social/request`,
        {
          requester: requesterId,
          recipient: recipientId,
        }
      );
      // Update local status to "pending" after sending the request
      setFriendStatuses((prevStatuses) => ({
        ...prevStatuses,
        [recipientId]: "pending",
      }));
      console.log("Friend request sent:", response.data);
    } catch (error) {
      console.error("Error sending friend request:", error);
      Alert.alert("Error", "Failed to send friend request");
    }
  };
  // useEffect(() => {
  //   socket.on("friendRequest", (notification) => {
  //     Alert.alert("Notification", notification.message);
  //   });

  //   return () => {
  //     socket.off("friendRequest");
  //   };
  // }, [userId]);

  // const handleFriendRequest = async ({ requesterId, recipientId }) => {
  //   try {
  //     const response = await axios.post(
  //       `${SOCKET_SERVER_URL}/api/v1/social/request`,
  //       {
  //         requester: requesterId,
  //         recipient: recipientId,
  //       }
  //     );
  //     console.log("Friend request sent:", response.data);
  //   } catch (error) {
  //     console.error("Error sending friend request:", error);
  //     throw error;
  //   }
  // };

  return (
    // <View
    //   style={[
    //     defaultStyles.container,
    //     {
    //       backgroundColor: colors.background,
    //     },
    //   ]}
    // >
    //   <ScrollView
    //     contentContainerStyle={{
    //       paddingTop: 110,
    //     }}
    //   >
    //     {filteredUsers.map((item, index) => (
    //       <TouchableOpacity
    //         key={index}
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           marginHorizontal: 25,
    //           borderRadius: 30,
    //           paddingLeft: 20,
    //           paddingVertical: 10,
    //         }}
    //       >
    //         <Image
    //           source={{ uri: item.profilePic.url }}
    //           style={{ width: 70, height: 70, borderRadius: 10 }}
    //         />
    //         <View
    //           style={{
    //             marginLeft: 20,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               color: colors.text,
    //               fontSize: 20,
    //               fontWeight: "bold",
    //               marginVertical: 5,
    //             }}
    //           >
    //             {item.name}
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-around",
    //               //   marginVertical: 16,
    //               gap: 20,
    //             }}
    //           >
    //             <Button
    //               title="Add Friend"
    //               handlePress={() =>
    //                 handleFriendRequest({
    //                   requesterId: user._id,
    //                   recipientId: item.user,
    //                 })
    //               }
    //             />
    //             <Button
    //               title="View Profile"
    //               handlePress={() => {
    //                 navigation.navigate("ViewProfile", {
    //                   user: JSON.stringify(item),
    //                 });
    //               }}
    //             />
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //     ))}
    //   </ScrollView>
    // </View>

    <View
      style={[defaultStyles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={{ paddingTop: 110 }}>
        {filteredUsers.map((item, index) => {
          const friendStatus = friendStatuses[item.user];

          return (
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
              <View style={{ marginLeft: 20 }}>
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
                    gap: 20,
                  }}
                >
                  {/* Conditionally render button based on friendship status */}
                  {friendStatus === "accepted" ? (
                    <Button title="Friends" disabled={true} />
                  ) : friendStatus === "pending" ? (
                    <Button title="Pending" disabled={true} />
                  ) : (
                    <Button
                      title="Add Friend"
                      handlePress={() =>
                        handleFriendRequest({
                          requesterId: user._id,
                          recipientId: item.user,
                        })
                      }
                    />
                  )}
                  <Button
                    title="View Profile"
                    handlePress={() => {
                      navigation.navigate("ViewProfile", {
                        user: JSON.stringify(item),
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
