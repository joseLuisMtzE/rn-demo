import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type KeyboardType =
  | "default"
  | "number-pad"
  | "decimal-pad"
  | "numeric"
  | "email-address"
  | "phone-pad"
  | "url";

type FontType =
  | "RobotoRegular"
  | "RobotoMedium"
  | "RobotoBold"
  | "RobotoBlack"
  | "RobotoLight";

interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  onChangeText: (id: string, newValue: string) => void;
  multiline?: boolean;
  fontSize: number;
  fontFamily?: FontType;
  textColor?: string;
  id: string;
}

export default function Input({
  label,
  value,
  placeholder,
  keyboardType = "default",
  onChangeText,
  multiline,
  fontSize,
  fontFamily,
  textColor,
  id,
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          {
            fontSize: fontSize,
            fontFamily: fontFamily || "RobotoRegular",
            color: textColor || "#000",
          },
        ]}
        onChangeText={(text) => onChangeText(id, text)}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        cursorColor={"white"}
        id={id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    margin: 0,
    // paddingLeft: 8,
  },
  inputMultiline: {
    height: "auto",
    // minHeight: 80,
    textAlignVertical: "top",
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
});
