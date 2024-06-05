import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function ProximityScreen() {
  return (
    <View style={styles.container}>
      <Text>ProximityScreen ss</Text>
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
