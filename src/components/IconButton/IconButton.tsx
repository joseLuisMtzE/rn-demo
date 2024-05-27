import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: any;
  size?: any;
  color?: any;
  onPress: () => void;
}

export default function IconButton({
  iconName,
  color,
  size,
  onPress,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={styles.newNoteFAB}
      activeOpacity={0.7}
      onPress={() => onPress()}
    >
      <Feather
        name={iconName}
        size={size ? size : 24}
        color={color ? color : "white"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  newNoteFAB: {
    width: 32,
    height: 32,
    backgroundColor: "black",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
