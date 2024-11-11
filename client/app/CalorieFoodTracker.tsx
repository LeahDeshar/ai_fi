import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Vibration,
  LogBox,
  FlatList,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
// import { foodList } from "@/assets/data/food";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "@/constants/ThemeProvider";
import {
  useCreateMealMutation,
  useGetAllFoodQuery,
  useGetFoodByBarcodeQuery,
  useGetMealByTypeQuery,
} from "@/redux/api/apiClient";
LogBox.ignoreLogs([
  "BarCodeScanner has been deprecated and will be removed in a future SDK version. Please use `expo-camera` instead. See https://expo.fyi/barcode-scanner-to-expo-camera for more details on how to migrate",
]);

const getLevenshteinDistance = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(null));

  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // Deletion
          dp[i][j - 1] + 1, // Insertion
          dp[i - 1][j - 1] + cost // Substitution
        );
      }
    }
  }
  return dp[len1][len2];
};

const fuzzySearch = (query, list, threshold = 3) => {
  return list.filter((item) => {
    const distance = getLevenshteinDistance(
      query.toLowerCase(),
      item.name.toLowerCase()
    );
    return distance <= threshold;
  });
};

const CalorieFoodTracker = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const { title } = useLocalSearchParams();

  const [isAddCalorieOpen, setIsAddCalorieOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [calorieValue, setCalorieValue] = useState("");

  const { data: allFood, error, isLoading } = useGetAllFoodQuery();
  const { data: mealTypeFood, refetch } = useGetMealByTypeQuery(title);

  const route = useRouter();
  const handleAddCalories = () => {
    if (foodName && calorieValue) {
      const newFoodItem = {
        name: foodName,
        calories: parseInt(calorieValue),
        carbs: 0, // Example, set default values for other fields
        fats: 0,
        protein: 0,
      };
      setFoodName("");
      setCalorieValue("");
      setIsAddCalorieOpen(false);
    } else {
      alert("Please enter both name and calorie value");
    }
  };

  const filteredFoodList = useMemo(() => {
    if (!searchQuery) return [];
    return fuzzySearch(searchQuery, allFood);
  }, [searchQuery]);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);
  const [createMeal] = useCreateMealMutation();

  const handleAddMeal = async (id) => {
    console.log(id, title);
    const mealData = { foodId: id, mealType: title };
    await createMeal(mealData).unwrap();
    refetch();
  };

  const [scanneds, setScanneds] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const {
    data: food,
    error: foodError,
    isLoading: foodIsLoading,
  } = useGetFoodByBarcodeQuery(barcode, {
    skip: !scanneds || !barcode,
  });

  const handleBarcodeScanned = ({ data }) => {
    Vibration.vibrate(500);
    setScanneds(true);
    setBarcode(data);
    setIsScannerOpen(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredFoodList}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{title}</Text>
              <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.headerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchBox}
              placeholder="Search for food items..."
              value={searchQuery}
              placeholderTextColor={"#c4c4c4"}
              onChangeText={(text) => setSearchQuery(text)}
            />

            <TouchableOpacity
              style={styles.collapsibleHeader}
              onPress={() => setIsCollapsed(!isCollapsed)}
            >
              <Text style={styles.collapsibleHeaderText}>Logging Options</Text>
              <AntDesign name="down" size={16} color="#818181b6" />
            </TouchableOpacity>
            {!isCollapsed && (
              <View style={styles.loggingOptions}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    padding: 10,
                  }}
                  onPress={() => setIsScannerOpen(true)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <AntDesign name="scan1" size={24} color="black" />
                    <Text style={styles.loggingOptionText}>Scan Barcode</Text>
                  </View>
                  <AntDesign name="right" size={16} color="#818181b6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                  onPress={() => setIsAddCalorieOpen(true)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <FontAwesome5 name="burn" size={24} color="black" />
                    <Text style={styles.loggingOptionText}>
                      Quick-add Calories
                    </Text>
                  </View>
                  <AntDesign name="right" size={16} color="#818181b6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                  onPress={() => route.navigate("CreateFood")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Entypo name="bowl" size={24} color="black" />
                    <Text style={styles.loggingOptionText}>Create Food</Text>
                  </View>
                  <AntDesign name="right" size={16} color="#818181b6" />
                </TouchableOpacity>
              </View>
            )}

            {mealTypeFood && (
              <>
                <Text style={styles.resultsTitle}>Your {title}</Text>
                {mealTypeFood?.map((meal, index) => (
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      marginVertical: 3,
                      gap: 10,
                    }}
                    key={meal._id}
                  >
                    {meal.foods?.map((food, foodIndex) => (
                      <TouchableOpacity
                        style={{
                          padding: 5,
                          paddingHorizontal: 8,

                          flexDirection: "row",
                          alignItems: "center",
                          marginVertical: 3,
                          borderWidth: 1,
                          borderColor: "#bbb9b9",
                          borderRadius: 25,
                        }}
                        key={foodIndex}
                      >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          {food?.name}
                        </Text>

                        <Ionicons name="close" size={24} color={"black"} />
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </>
            )}
            {searchQuery && (
              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>Search Results</Text>
                {scannedData ? <Text>Scanned Data: {scannedData}</Text> : null}
              </View>
            )}

            {food && (
              <>
                <Text style={[styles.resultsTitle, { marginTop: 20 }]}>
                  Scanned Results
                </Text>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#d4d4d49e",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 3,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {food?.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 20,
                        marginTop: 5,
                      }}
                    >
                      <Text>{food?.calories}kcal</Text>
                      <Text>C: {food?.carbs} g</Text>
                      <Text>F: {food?.fats} g</Text>
                      <Text>P: {food?.protein} g</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      borderRadius: 50,
                      borderWidth: 2,
                      padding: 2,
                      borderColor: colors.primary,
                    }}
                  >
                    <Ionicons name="add" color={colors.primary} size={25} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#d4d4d49e",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 3,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  marginTop: 5,
                }}
              >
                <Text>{item.calories}kcal</Text>
                <Text>C: {item.carbs} g</Text>
                <Text>F: {item.fats} g</Text>
                <Text>P: {item.protein} g</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleAddMeal(item?._id)}
              style={{
                borderRadius: 50,
                borderWidth: 2,
                padding: 2,
                borderColor: colors.primary,
              }}
            >
              <Ionicons name="add" color={colors.primary} size={25} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() =>
          searchQuery ? (
            <Text style={styles.noResultsText}>No results found</Text>
          ) : null
        }
      />

      <Modal
        visible={isScannerOpen}
        animationType="slide"
        onRequestClose={() => setIsScannerOpen(false)}
      >
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <Button title="Scan Again" onPress={() => setScanned(false)} />
          )}

          <Button
            title="Close Scanner"
            onPress={() => setIsScannerOpen(false)}
          />
        </View>
      </Modal>

      <Modal
        visible={isAddCalorieOpen}
        animationType="fade"
        onRequestClose={() => setIsAddCalorieOpen(false)}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000037",
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: "white",
              width: "80%",
              borderRadius: 25,
              paddingHorizontal: 20,
            }}
          >
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
                Calories
              </Text>
              <TextInput
                style={styles.foodInput}
                placeholder="Calories"
                value={calorieValue}
                placeholderTextColor={"#a4a3a3"}
                keyboardType="numeric"
                onChangeText={setCalorieValue}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonText: {
    fontSize: 15,
    color: "#007bff",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  addCalorieContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  foodInput: {
    flex: 1,
    textAlign: "right",
    paddingRight: 10,
    fontSize: 16,
  },
  calorieInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerButton: { padding: 10 },
  headerButtonText: { color: "#007bff" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  searchBox: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
  },
  collapsibleHeader: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  collapsibleHeaderText: { fontSize: 16, fontWeight: "bold" },
  loggingOptions: { marginTop: 5 },
  scanButton: { backgroundColor: "#007bff", padding: 10, marginBottom: 10 },
  scanButtonText: { color: "white" },
  loggingOptionText: { fontSize: 16, fontWeight: "semibold" },
  resultsSection: { marginTop: 20 },
  resultsTitle: { fontSize: 16, fontWeight: "bold", padding: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  noResultsText: { textAlign: "center", fontSize: 16, color: "#999" },
  scannerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CalorieFoodTracker;
