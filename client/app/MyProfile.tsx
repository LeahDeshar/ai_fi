import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemeProvider, useTheme } from "@/constants/ThemeProvider";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useNavigation, useRouter } from "expo-router";

const MyProfile = () => {
  const { colors, dark } = useTheme();
  const navigation = useRouter();

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
            <View
              style={{
                backgroundColor: colors.opacity,
                width: 95,
                height: 95,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 75,
              }}
            >
              <Image
                source={require("@/assets/images/avatar/female1.png")}
                style={{ width: 80, height: 80, borderRadius: 75 }}
              />
              <Ionicons
                name="camera-outline"
                size={24}
                style={{
                  color: colors.text,
                  position: "absolute",
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 24,
                marginTop: 10,
                fontWeight: "bold",
                color: colors.text,
              }}
            >
              Leah
            </Text>
            <Button
              title="Login"
              handlePress={() => navigation.push("LoginScreen")}
            />
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
          </View>
        </ThemedView>
        <ProfileScreen />
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
          value="Leah"
          onPress={() => navigation.navigate("ProfileNameScreen")}
        />
        <ProfileItem
          title="Date of Birth"
          value="6 Jul 1999"
          onPress={() => navigation.navigate("ProfileDOBScreen")}
        />
        <ProfileItem
          title="Height"
          value="167 cm"
          onPress={() => navigation.navigate("ProfileHeightScreen")}
        />
        <ProfileItem
          title="Starting Weight"
          value="57 kg"
          onPress={() => navigation.navigate("ProfileStartWeightScreen")}
        />
        <ProfileItem
          title="Target Weight"
          value="53 kg"
          onPress={() => navigation.navigate("ProfileTargetWeightScreen")}
        />
        <ProfileItem
          title="Fitness Level"
          value="Medium"
          onPress={() => navigation.navigate("ProfileFitness")}
        />
        <ProfileItem
          title="Classes"
          value="Dancing, HIIT, Running"
          onPress={() => navigation.navigate("ProfileActivitiesScreen")}
        />
        <ProfileItem
          title="Special Programs"
          value="None"
          onPress={() => navigation.navigate("ProfilePhysicalLimitationScreen")}
        />
        <ProfileItem
          title="Daily Step Goal"
          value="8,500 steps"
          onPress={() => navigation.navigate("ProfileDailyStepsScreen")}
        />
        <ProfileItem
          title="Units"
          value="Meters and Grams"
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
