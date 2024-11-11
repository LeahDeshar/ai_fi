import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Button,
  Vibration,
  LogBox,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// log box to remove warning
LogBox.ignoreLogs([
  "BarCodeScanner has been deprecated and will be removed in a future SDK version. Please use `expo-camera` instead. See https://expo.fyi/barcode-scanner-to-expo-camera for more details on how to migrate",
]);

const CalorieFoodTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedData, setScannedData] = useState(null);

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
    <ScrollView style={styles.container}>
      {/* Header with Cancel, Breakfast, and Done buttons */}
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

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => setIsScannerOpen(true)}
      >
        <Text style={styles.scanButtonText}>Scan Barcode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.collapsibleHeader}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
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

      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>Search Results</Text>
        {scannedData ? (
          <Text>Scanned Data: {scannedData}</Text>
        ) : (
          <Text>No results found</Text>
        )}
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
  scanButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
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

  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scannerFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#cfe9cf83",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerText: {
    color: "#ffffffb3",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});

export default CalorieFoodTracker;
