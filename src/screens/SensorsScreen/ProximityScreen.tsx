import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ProximityScreen() {
  return (
    <View style={styles.container}>
      <Text>ProximityScreen :C</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
