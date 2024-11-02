import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useTheme } from "@/constants/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useGetallUsersProfileQuery,
  useGetProfileQuery,
} from "@/redux/api/apiClient";
import { useSelector } from "react-redux";

type Trainer = {
  name: string;
  image: any;
  rating: number;
  experience: number;
  specialities: string[];
  isBestMatch: boolean;
};

const MorePersonalCoach: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { data: userProfile } = useGetallUsersProfileQuery();
  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();
  // console.log(// profile.profileOfUsers.role);
  const currentUserRole = profile.profileOfUsers.role;
  const filteredUsers = userProfile?.data?.filter((trainer) =>
    currentUserRole === "coach"
      ? trainer.role === "user"
      : trainer.role === "coach"
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 110,
        }}
      >
        {filteredUsers?.map((trainer, index) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              marginVertical: 10,
              marginLeft: 20,
            }}
            key={index}
            onPress={() =>
              navigation.navigate("MorePersonalCoachChat", { trainer })
            }
          >
            <Image
              source={{ uri: trainer?.profilePic?.url }}
              style={{
                width: trainer.role == "coach" ? 80 : 50,
                height: trainer.role == "coach" ? 80 : 50,
                borderRadius: 8,
              }}
            />

            <View
              style={{
                marginLeft: 25,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {trainer.name}
              </Text>
              {trainer.role == "coach" ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <Ionicons name="star" size={15} color={"orange"} />
                    <Text
                      style={{
                        color: colors.text,
                        marginLeft: 5,
                      }}
                    >
                      {trainer.rating}
                    </Text>

                    <Text
                      style={{
                        color: colors.text,
                        marginLeft: 15,
                      }}
                    >
                      Experience: {trainer.experience} years
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {trainer.category.map((spec, specIndex) => (
                      <TouchableOpacity
                        key={specIndex}
                        style={{
                          backgroundColor: colors.opacity,
                          marginRight: 10,
                          paddingHorizontal: 7,
                          paddingVertical: 2,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.text,
                          }}
                        >
                          {spec}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MorePersonalCoach;

const styles = StyleSheet.create({});
