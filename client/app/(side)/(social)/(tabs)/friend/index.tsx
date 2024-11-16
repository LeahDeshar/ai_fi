import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import { io } from "socket.io-client";
import axios from "axios";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import Button from "@/components/Button";
import { Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const SOCKET_SERVER_URL = "http://192.168.1.9:8080";
const socket = io(SOCKET_SERVER_URL);

const FriendScreen = () => {
  const { colors } = useTheme();
  const [newRequests, setNewRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [availUsers, setAvailUsers] = useState([]);
  const navigation = useNavigation();

  const { data: userProfile } = useGetallUsersProfileQuery();
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const currentUserRole = profile?.profileOfUsers?.role;

  const userId = user._id;

  const fetchRequests = async () => {
    try {
      const newReq = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/social/requests/new`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pendingReq = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/social/requests/pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const accepted = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/social/requests/accepted`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewRequests(newReq.data.requests);
      setPendingRequests(pendingReq.data.requests);
      setAcceptedFriends(accepted.data.requests);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    handleFetchList();
    socket.on("friendRequestUpdate", (notification) => {
      fetchRequests();
    });
    socket.on("friendRequestAccepted", (friendship) => {
      Alert.alert("Success", "Your friend request has been accepted!");
    });

    socket.on("friendRequestRejected", (friendship) => {
      Alert.alert("Rejected", "Your friend request has been rejected.");
    });

    return () => {
      socket.disconnect();
      socket.off("friendRequestUpdate");
    };
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.patch(
        `${SOCKET_SERVER_URL}/api/v1/social/request/accept`,
        {
          requestId,
          userId: user._id,
        }
      );

      if (response.data.message === "Friend request accepted") {
        Alert.alert("Success", "Friend request accepted");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "Something went wrong while accepting the request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await axios.patch(
        `${SOCKET_SERVER_URL}/api/v1/social/request/reject`,
        {
          requestId,
          userId: user._id,
        }
      );

      if (response.data.message === "Friend request rejected") {
        Alert.alert("Success", "Friend request rejected");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      Alert.alert("Error", "Something went wrong while rejecting the request");
    }
  };

  const handleFetchList = async () => {
    try {
      const response = await axios.get(
        `${SOCKET_SERVER_URL}/api/v1/social/request/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setAvailUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      Alert.alert("Error", "Something went wrong while rejecting the request");
    }
  };

  const handleFriendRequest = async ({ requesterId, recipientId }) => {
    try {
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/social/request`,
        {
          requester: requesterId,
          recipient: recipientId,
        }
      );

      console.log("Friend request sent:", response.data);
    } catch (error) {
      console.error("Error sending friend request:", error);
      Alert.alert("Error", "Failed to send friend request");
    }
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "newRequests", title: "New Requests" },
    { key: "pendingRequests", title: "Pending Requests" },
    { key: "friends", title: "Friends" },
  ]);

  const renderScene = SceneMap({
    newRequests: () => (
      <NewRequests
        newRequests={newRequests}
        handleAcceptRequest={handleAcceptRequest}
        handleRejectRequest={handleRejectRequest}
        colors={colors}
      />
    ),
    pendingRequests: () => (
      <PendingRequests pendingRequests={pendingRequests} colors={colors} />
    ),
    friends: () => (
      <Friends acceptedFriends={acceptedFriends} colors={colors} />
    ),
  });
  const filteredUsers = availUsers.filter(
    (pep) => pep?.profile && pep?.profile.role === "user"
  );
  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,
          paddingTop: 90,
        }}
      >
        <ScrollView
          horizontal
          style={{
            paddingVertical: 10,
          }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((pep, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 25,
                  backgroundColor: colors.opacity,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: pep.profile.profilePic.url }}
                  style={{ width: "100%", height: 120, borderRadius: 25 }}
                />
                <Text
                  style={{
                    marginVertical: 5,
                    marginTop: 10,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  {pep?.profile.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleFriendRequest({
                        requesterId: user._id,
                        recipientId: pep._id,
                      })
                    }
                    style={{
                      backgroundColor: colors.primary,
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      borderRadius: 25,
                    }}
                  >
                    <Text style={{ color: colors.text, fontWeight: "500" }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      navigation.navigate("ViewProfile", {
                        user: JSON.stringify(pep.profile),
                      });
                    }}
                  >
                    <Text style={{ color: colors.text, fontWeight: "500" }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                padding: 10,
                marginHorizontal: 10,
                borderRadius: 25,
                backgroundColor: colors.opacity,
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 150,
              }}
            >
              <Text
                style={{
                  marginVertical: 5,
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.text,
                }}
              >
                No users available
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: colors.background,
            }}
            indicatorStyle={{
              backgroundColor: colors.primary,
            }}
          />
        )}
        style={{
          backgroundColor: colors.background,
          paddingTop: 90,
        }}
        pagerStyle={{
          backgroundColor: colors.background,
        }}
      />
    </>
  );
};

export default FriendScreen;
const NewRequests = ({
  newRequests,
  handleAcceptRequest,
  handleRejectRequest,
  colors,
}) => (
  <ScrollView style={{ backgroundColor: colors.background, paddingTop: 20 }}>
    {newRequests?.length > 0 ? (
      newRequests.map((request, index) => (
        <View key={index} style={{ flexDirection: "row", padding: 15 }}>
          <Image
            source={{ uri: request?.requester?.profile.profilePic.url }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: colors.text }}
            >
              {request?.requester?.profile.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#4CAF50",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 25,
                }}
                onPress={() => handleAcceptRequest(request._id)}
              >
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#F44336",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 25,
                }}
                onPress={() => handleRejectRequest(request._id)}
              >
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))
    ) : (
      <Text
        style={{
          color: colors.text,
          textAlign: "center",
          paddingTop: 80,
        }}
      >
        No new requests
      </Text>
    )}
  </ScrollView>
);

const PendingRequests = ({ pendingRequests, colors }) => (
  <ScrollView style={{ backgroundColor: colors.background, paddingTop: 20 }}>
    {pendingRequests?.length > 0 ? (
      pendingRequests.map((request, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            padding: 15,

            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            source={{ uri: request?.recipient?.profile.profilePic.url }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />

          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
            {request?.recipient?.profile.name}
          </Text>
        </View>
      ))
    ) : (
      <Text
        style={{
          color: colors.text,
          textAlign: "center",
          paddingTop: 80,
        }}
      >
        No pending requests
      </Text>
    )}
  </ScrollView>
);

const Friends = ({ acceptedFriends, colors }) => (
  <ScrollView style={{ backgroundColor: colors.background, paddingTop: 20 }}>
    {acceptedFriends?.length > 0 ? (
      acceptedFriends.map((friend, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            padding: 15,
            alignItems: "center",
            gap: 20,
          }}
        >
          <Image
            source={{
              uri: friend.recipient?.profile?.profilePic.url,
            }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: colors.text }}
            >
              {friend.recipient?.profile?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                gap: 50,
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  Unfriend
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: colors.text, fontWeight: "500" }}>
                  Block
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))
    ) : (
      <Text
        style={{
          color: colors.text,
          textAlign: "center",
          paddingTop: 80,
        }}
      >
        No friends yet
      </Text>
    )}
  </ScrollView>
);
