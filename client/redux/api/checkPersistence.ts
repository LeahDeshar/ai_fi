import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkPersistence = async () => {
  try {
    const persistedState = await AsyncStorage.getItem("persist:root"); // Check for root state
    console.log("Persisted State:", JSON.parse(persistedState));
  } catch (error) {
    console.error("Error retrieving data from AsyncStorage", error);
  }
};
