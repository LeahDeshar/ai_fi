import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import { StackScreenWithSearchBar } from "@/constants/layout";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles";
import { useTheme } from "@/constants/ThemeProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const fastingType = [
  {
    title: "Beginner",
    types: [
      {
        hour: "12",
        minute: "12",
        desc: "Start your day with a healthy breakfast.",
        howToPrep: [
          "Prepare a bowl of oatmeal with fresh fruits.",
          "Make a smoothie with spinach, banana, and almond milk.",
          "Boil two eggs and serve with whole grain toast.",
        ],
      },
      {
        hour: "13",
        minute: "11",
        desc: "Fuel your body with a balanced lunch.",
        howToPrep: [
          "Grill a chicken breast and serve with a side of quinoa and mixed vegetables.",
          "Prepare a mixed greens salad with avocado, cherry tomatoes, and a light vinaigrette.",
          "Make a lentil soup with carrots, celery, and a touch of cumin.",
        ],
      },
      {
        hour: "14",
        minute: "10",
        desc: "Keep your energy levels steady with a mid-afternoon snack.",
        howToPrep: [
          "Enjoy a handful of almonds or walnuts for a quick protein boost.",
          "Slice an apple and pair it with a spoonful of almond butter.",
          "Mix Greek yogurt with a drizzle of honey and a sprinkle of granola.",
        ],
      },
      {
        hour: "15",
        minute: "9",
        desc: "Finish your day with a light dinner to support restful sleep.",
        howToPrep: [
          "Bake a salmon fillet with a side of steamed asparagus and brown rice.",
          "Prepare a vegetable stir-fry with tofu and serve over cauliflower rice.",
          "Make a hearty vegetable soup with zucchini, tomatoes, and kale.",
        ],
      },
    ],
  },
  {
    title: "Experienced Faster",
    types: [
      {
        hour: "16",
        minute: "8",
        desc: "Skip breakfast and start your day with a balanced lunch.",
        howToPrep: [
          "Grill a chicken breast and serve with a side of quinoa and mixed vegetables.",
          "Prepare a mixed greens salad with avocado, cherry tomatoes, and a light vinaigrette.",
          "Make a lentil soup with carrots, celery, and a touch of cumin.",
        ],
      },
      {
        hour: "17",
        minute: "7",
        desc: "Refuel with a healthy evening snack to keep your metabolism active.",
        howToPrep: [
          "Slice up some cucumber and carrot sticks and enjoy with hummus.",
          "Blend a protein shake with almond milk, a banana, and a scoop of protein powder.",
          "Have a small bowl of mixed nuts and dried fruits for a quick energy boost.",
        ],
      },
      {
        hour: "18",
        minute: "6",
        desc: "Time for a light dinner that is easy on your digestive system.",
        howToPrep: [
          "Prepare a grilled chicken or tofu salad with leafy greens, cherry tomatoes, and a light dressing.",
          "Cook a quinoa bowl topped with roasted vegetables like bell peppers, zucchini, and spinach.",
          "Make a vegetable stir-fry with broccoli, snap peas, and mushrooms, served with a small portion of brown rice.",
        ],
      },
      {
        hour: "19",
        minute: "5",
        desc: "Wind down with a nutritious end-of-day meal to help your body recover.",
        howToPrep: [
          "Bake a piece of fish like salmon or cod and serve it with a side of steamed broccoli and sweet potatoes.",
          "Prepare a warm bowl of lentil soup with carrots, onions, and spices to support a restful evening.",
          "Make a simple whole grain pasta with a light tomato sauce and a sprinkle of fresh basil.",
        ],
      },
    ],
  },
  {
    title: "Pro Fasters",
    types: [
      {
        hour: "20",
        minute: "4",
        desc: "Time for a nutrient-rich dinner to keep your energy levels up as you transition into the fasting period.",
        howToPrep: [
          "Enjoy a lean protein such as grilled chicken or tofu with a side of sautéed spinach.",
          "Prepare a bowl of vegetable quinoa salad with cherry tomatoes, cucumbers, and a light vinaigrette.",
          "Serve a piece of baked salmon with steamed asparagus and brown rice.",
        ],
      },
      {
        hour: "21",
        minute: "3",
        desc: "Have a light evening snack that provides essential nutrients without being too heavy.",
        howToPrep: [
          "Snack on a handful of almonds or walnuts for a quick source of healthy fats and protein.",
          "Blend a green smoothie with kale, cucumber, apple, and a splash of lemon juice.",
          "Have a small bowl of Greek yogurt topped with fresh berries and a drizzle of honey.",
        ],
      },
      {
        hour: "22",
        minute: "2",
        desc: "Focus on hydration and light foods to prepare your body for fasting overnight.",
        howToPrep: [
          "Sip on a herbal tea like chamomile or peppermint to help relax before bed.",
          "Drink a glass of warm water with a slice of lemon to stay hydrated and aid digestion.",
          "If you're feeling a bit hungry, have a few slices of cucumber or a small apple.",
        ],
      },
      {
        hour: "23",
        minute: "1",
        desc: "Final pre-fast preparation to ensure you're ready for the overnight fast period.",
        howToPrep: [
          "Drink a glass of water to stay hydrated through the night.",
          "Avoid heavy foods at this hour; stick to light snacks if necessary, like a few nuts or a small fruit.",
          "Consider a magnesium supplement or a cup of magnesium-rich tea to promote better sleep.",
        ],
      },
    ],
  },
];
const FastingScreenLayout = () => {
  const { colors, dark } = useTheme();
  const bottomSheetRef = useRef(null); // Create a reference for the Bottom Sheet

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand(); // Open the bottom sheet when this function is called
  };
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: colors.text,
            headerTransparent: true,
            headerBlurEffect: dark ? "prominent" : "light",
            headerShadowVisible: false,

            headerTitle: "", // Set to an empty string to use custom headerLeft instead
            headerLeft: () => (
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.text,
                  }}
                >
                  Fasting
                </Text>
              </View>
            ),
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 10,
                    borderRadius: 25,
                    borderWidth: 0.7,
                    borderColor: "#b1b1b18d",
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                  }}
                  onPress={handleOpenBottomSheet}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      marginHorizontal: 3,
                      fontWeight: "bold",
                    }}
                  >
                    16:8
                  </Text>
                  <Ionicons name="pencil" size={12} color={colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    borderWidth: 0.7,
                    borderColor: "#b1b1b18d",
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}
                  onPress={() => alert("Icon 2 Pressed")}
                >
                  <AntDesign name="infocirlceo" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>

      <BottomSheet
        ref={bottomSheetRef} // Attach the reference to the Bottom Sheet
        index={-1} // Initial state closed
        snapPoints={["90%"]} // Adjust the snap points as needed
        backgroundStyle={{ backgroundColor: "#eaeaea" }}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
      >
        <View style={{ padding: 20 }}>
          <GroupedFastingData data={fastingType} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default FastingScreenLayout;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  howToPrepTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  step: {
    marginTop: 2,
    fontSize: 14,
    color: "#333",
  },
});
const GroupedFastingData = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <FlatList
            data={group.types}
            horizontal
            keyExtractor={(item, index) => `${groupIndex}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.time}>
                  {item.hour}:{item.minute}
                </Text>
              </View>
            )}
          />
        </View>
      ))}
    </View>
  );
};
