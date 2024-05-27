import { View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants/Constants";

interface ColorPickerProps {
  value: string;
  onChangeText: (id: string, newValue: string) => void;
  id: string;
}

export default function ColorPicker({
  value,
  id,
  onChangeText,
}: ColorPickerProps) {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {COLORS.map((color) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={color}
          style={{
            width: 24,
            height: 24,
            backgroundColor: color,
            borderRadius: 50,
            borderColor: "white",
            borderWidth: 1,
            ...(value === color && {
              borderWidth: 4,
            }),
          }}
          onPress={() => onChangeText(id, color)}
        />
      ))}
    </View>
  );
}
