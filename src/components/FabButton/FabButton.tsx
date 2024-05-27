import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR } from "../../constants/Constants";

interface FabButtonProps {
  iconName: string | any;
  size?: number;
  color?: string;
  bgColor?: string;
  onPress: () => void;
}
export default function FabButton({
  iconName,
  color,
  size,
  onPress,
  bgColor,
}: FabButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.newNoteFAB, { backgroundColor: bgColor || PRIMARY_COLOR }]}
      activeOpacity={0.7}
      onPress={onPress}
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
    width: 48,
    height: 48,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
