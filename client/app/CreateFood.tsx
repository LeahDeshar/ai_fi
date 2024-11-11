import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const CreateFood = () => {
  const [foodName, setFoodName] = useState("");
  const [isAddCalorieOpen, setIsAddCalorieOpen] = useState(false);
  const handleAddCalories = () => {};

  return (
    <GestureHandlerRootView>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingBottom: 30,
          }}
        >
          <TouchableOpacity onPress={() => setIsAddCalorieOpen(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Food Item</Text>
          <TouchableOpacity onPress={handleAddCalories}>
            <Text style={styles.modalButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            borderBottomWidth: 1,
            borderBottomColor: "#e6e6e66d",
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Name
          </Text>

          <TextInput
            style={styles.foodInput}
            placeholder="Food Name"
            placeholderTextColor={"#a4a3a3"}
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#e6e6e66d",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Enter Barcode
            </Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Food Name"
              placeholderTextColor={"#a4a3a3"}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Scan Barcode
            </Text>
            <Ionicons name="barcode-outline" size={24} color="black" />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Calories (kcal)
            </Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Food Name"
              placeholderTextColor={"#a4a3a3"}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Carbs (g)
            </Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Food Name"
              placeholderTextColor={"#a4a3a3"}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Fats (g)
            </Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Food Name"
              placeholderTextColor={"#a4a3a3"}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "#e6e6e66d",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Protien (g)
            </Text>

            <TextInput
              style={styles.foodInput}
              placeholder="Food Name"
              placeholderTextColor={"#a4a3a3"}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CreateFood;

const styles = StyleSheet.create({
  foodInput: {
    flex: 1,
    textAlign: "right",
    paddingRight: 10,
    fontSize: 16,
  },
});
