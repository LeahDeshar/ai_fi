import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useNavigation, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import { useGetProfileQuery } from "@/redux/api/apiClient";
import { birthday } from "@/utils/birthday";
import { LinearGradient } from "expo-linear-gradient";

const MyProfile = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();
  const dispatch = useDispatch();

  const { user, token, isLoggedIn } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery();

  const handleLoginPress = () => {
    navigation.push("LoginScreen");
  };

  // console.log(token);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView>
        <ThemedView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.push("ProfileAvatar")}
              style={{
                backgroundColor: colors.opacity,
                width: 95,
                height: 95,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 75,
              }}
            >
              <LinearGradient
                colors={["#9f4c76", "#983b3b", "#192f6a"]}
                style={{
                  width: 95,
                  height: 95,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                }}
              />
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.background,
                }}
              >
                <Image
                  source={{ uri: profile?.profileOfUsers?.profilePic?.url }}
                  style={{ width: 80, height: 80, borderRadius: 75 }}
                />
              </View>

              <Ionicons
                name="camera-outline"
                size={24}
                style={{
                  color: colors.text,
                  position: "absolute",
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 24,
                marginTop: 10,
                fontWeight: "bold",
                color: colors.text,
              }}
            >
              {profile?.profileOfUsers?.name}
            </Text>
            {!isLoggedIn ? (
              <>
                <Button title={"Login"} handlePress={handleLoginPress} />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                    }}
                  >
                    Don't have an account?
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      marginLeft: 5,
                    }}
                  >
                    Sign Up
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontSize: 15,
                    marginTop: 3,
                  }}
                >
                  {user?.email}
                </Text>
              </View>
            )}
          </View>
        </ThemedView>
        <ProfileScreen />
        {isLoggedIn && (
          <Button title={"Logout"} handlePress={handleLoginPress} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

interface ProfileItemProps {
  title: string;
  value?: string;
  colors?: any;
  haveBorderBottom?: boolean;
  onPress?: () => void;
}

const ProfileItem = ({
  title,
  value,
  haveBorderBottom = true,
  onPress,
}: ProfileItemProps) => {
  const { colors, dark } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomWidth: haveBorderBottom ? 1 : 0,
          borderBottomColor: colors.borders,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.itemTitle, { color: dark ? "#a4a4a4" : "#000" }]}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {value && (
          <Text style={[styles.itemValue, { color: colors.text }]}>
            {value}
          </Text>
        )}
        <MaterialIcons name="chevron-right" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useRouter();
  const { data: profile, error, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching profile: {error.message}</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: colors.opacity,
          marginHorizontal: 15,
          paddingHorizontal: 10,
          borderRadius: 15,
        }}
      >
        <Text style={styles.sectionTitle}>GENERAL</Text>
        <ProfileItem title="Language" />
        <ProfileItem
          title="Reminders"
          haveBorderBottom={false}
          onPress={() => navigation.navigate("ProfileReminder")}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.opacity,
          marginHorizontal: 15,
          paddingHorizontal: 10,
          borderRadius: 15,
          marginTop: 25,
        }}
      >
        <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>
        <ProfileItem
          title="Name"
          value={profile?.profileOfUsers?.name}
          onPress={() => navigation.navigate("ProfileNameScreen")}
        />
        <ProfileItem
          title="Date of Birth"
          value={birthday(profile?.profileOfUsers?.birthday)}
          onPress={() => navigation.navigate("ProfileDOBScreen")}
        />
        <ProfileItem
          title="Height"
          value={
            profile?.profileOfUsers?.preferredUnits === "metric"
              ? `${profile?.profileOfUsers?.currentHeight.centimeters} cm`
              : `${profile?.profileOfUsers?.currentHeight.feet} ft ${profile?.profileOfUsers?.currentHeight.inches} in `
          }
          onPress={() => navigation.navigate("ProfileHeightScreen")}
        />
        <ProfileItem
          title="Starting Weight"
          value={
            profile?.profileOfUsers?.preferredUnits === "metric"
              ? `${profile?.profileOfUsers?.currentWeight.kilograms} kg`
              : `${profile?.profileOfUsers?.currentWeight.pounds} lbs `
          }
          onPress={() => navigation.navigate("ProfileStartWeightScreen")}
        />
        <ProfileItem
          title="Target Weight"
          value={
            profile?.profileOfUsers?.preferredUnits === "metric"
              ? `${profile?.profileOfUsers?.goalWeight.kilograms} kg`
              : `${profile?.profileOfUsers?.goalWeight.pounds} lbs`
          }
          onPress={() => navigation.navigate("ProfileTargetWeightScreen")}
        />
        <ProfileItem
          title="Fitness Level"
          value={
            profile.profileOfUsers?.activityLevel <= 30
              ? "Newbie"
              : profile.profileOfUsers?.activityLevel <= 70
              ? "Medium"
              : "Advanced"
          }
          onPress={() => navigation.navigate("ProfileFitness")}
        />
        <ProfileItem
          title="Classes"
          value={profile?.profileOfUsers?.activitiesLiked?.join(", ")}
          onPress={() => navigation.navigate("ProfileActivitiesScreen")}
        />
        <ProfileItem
          title="Special Programs"
          // specialPrograms
          value={profile?.profileOfUsers?.specialPrograms?.join(", ")}
          onPress={() => navigation.navigate("ProfilePhysicalLimitationScreen")}
        />
        <ProfileItem
          title="Daily Step Goal"
          // dailySteps
          value={`${profile?.profileOfUsers?.dailySteps} steps`}
          onPress={() => navigation.navigate("ProfileDailyStepsScreen")}
        />
        <ProfileItem
          title="Units"
          value={`${
            profile?.profileOfUsers?.preferredUnits === "metric"
              ? "Meters and Grams"
              : "Pounds and feet"
          }`}
          haveBorderBottom={false}
          onPress={() => navigation.navigate("ProfileUnitsScreen")}
        />
      </View>

      <View
        style={{
          backgroundColor: colors.opacity,
          marginHorizontal: 15,
          paddingHorizontal: 10,
          borderRadius: 15,
          marginTop: 25,
        }}
      >
        <Text style={styles.sectionTitle}>Legal & Privacy</Text>
        <ProfileItem title="Privacy policy" />
        <ProfileItem title="Terms of Use" haveBorderBottom={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    marginVertical: 8,
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginBottom: 10,
    borderBottomColor: "#dddddd25",
  },
  itemTitle: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 16,
    color: "#888",
  },
});
