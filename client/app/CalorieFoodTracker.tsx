import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Button } from "react-native";
const CalorieFoodTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breakfast</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBox}
        placeholder="Search for food items..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity style={styles.collapsibleHeader}>
        <Text style={styles.collapsibleHeaderText}>Logging Options</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.loggingOptions}>
          <Text style={styles.loggingOptionText}>Log Breakfast Calories</Text>
          <Text style={styles.loggingOptionText}>Log Snacks</Text>
          <Text style={styles.loggingOptionText}>Log Lunch</Text>
          <Text style={styles.loggingOptionText}>Log Dinner</Text>
        </View>
      </View>

      {/* Search Results Section */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>Search Results</Text>
        {/* Render search results here */}
        <Text>No results found</Text>
      </View>

      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBox: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  collapsibleHeader: {
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 8,
  },
  collapsibleHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  loggingOptions: {
    padding: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    marginBottom: 16,
  },
  loggingOptionText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  resultsSection: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default CalorieFoodTracker;
