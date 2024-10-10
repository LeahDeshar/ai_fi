import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState } from "react";

import PagerView from "react-native-pager-view";

const PAGES = 3;

const FastingReadDetails = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageSelected = (e: any) => {
    setPageIndex(e.nativeEvent.position);
  };

  const progress = (pageIndex + 1) / PAGES;
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, { width: `${progress * 100}%` }]}
        />
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="1" style={styles.page}>
          <Text style={styles.text}>First page</Text>
        </View>
        <View key="2" style={styles.page}>
          <Text style={styles.text}>Second page</Text>
        </View>
        <View key="3" style={styles.page}>
          <Text style={styles.text}>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default FastingReadDetails;

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#3b5998",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  container: {
    flex: 1,
  },
  progressCircleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressCircle: {
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
    position: "absolute",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  timeBox: {
    alignItems: "center",
  },
});
