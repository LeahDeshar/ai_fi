import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Vibration,
  Button,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";

const CreateFood = () => {
  const [foodName, setFoodName] = useState("");
  const [isAddCalorieOpen, setIsAddCalorieOpen] = useState(false);
  const handleAddCalories = () => {};
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [barCode, setBarCode] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [protein, setProtein] = useState("");
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    Vibration.vibrate(500);
    setScanned(true);
    setBarCode(data);
    setScannedData(data);
    setIsScannerOpen(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}
    >
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => setIsAddCalorieOpen(false)}>
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Add Food Item</Text>
        <TouchableOpacity onPress={handleAddCalories}>
          <Text style={styles.modalButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Food Details</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter food name"
            placeholderTextColor="#a4a3a3"
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Barcode</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Enter Barcode</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter code"
            placeholderTextColor="#a4a3a3"
            value={barCode}
            onChangeText={setBarCode}
          />
        </View>
        <View style={[styles.inputRow, { justifyContent: "space-between" }]}>
          <Text style={styles.inputLabel}>Scan Barcode</Text>
          <TouchableOpacity
            onPress={() => setIsScannerOpen(true)}
            style={{ padding: 10, borderRadius: 5, backgroundColor: "#f5f5f5" }}
          >
            <Ionicons name="barcode-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        {/* {["Calories (kcal)", "Carbs (g)", "Fats (g)", "Protein (g)"].map(
          (label) => (
            <View style={styles.inputRow} key={label}>
              <Text style={styles.inputLabel}>{label}</Text>
              <TextInput
                style={styles.foodInput}
                placeholder={`Enter ${label.toLowerCase()}`}
                placeholderTextColor="#a4a3a3"
                value={foodName}
                onChangeText={setFoodName}
              />
            </View>
          )
        )} */}

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Calories (kcal)</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter calories"
            placeholderTextColor="#a4a3a3"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
        </View>

        {/* Carbs Input */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Carbs (g)</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter carbs"
            placeholderTextColor="#a4a3a3"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />
        </View>

        {/* Fats Input */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Fats (g)</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter fats"
            placeholderTextColor="#a4a3a3"
            value={fats}
            onChangeText={setFats}
            keyboardType="numeric"
          />
        </View>

        {/* Protein Input */}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Protein (g)</Text>
          <TextInput
            style={styles.foodInput}
            placeholder="Enter protein"
            placeholderTextColor="#a4a3a3"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />
        </View>
      </View>

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
    </GestureHandlerRootView>
  );
};

export default CreateFood;

const styles = StyleSheet.create({
  scannerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc6c",
    paddingBottom: 10,
  },
  modalButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#c4c2c2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    paddingVertical: 12,
  },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  foodInput: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    color: "#333",
  },
});
