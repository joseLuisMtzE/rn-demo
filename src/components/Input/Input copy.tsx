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

interface TextInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

export default function Input({
  label,
  value,
  placeholder,
  keyboardType = "default",
  onChangeText,
  multiline,
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          multiline && styles.inputMultiline,
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#e9e9e9",
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 8,
  },
  inputFocused: {
    borderColor: "#FF8B29",
  },
  inputMultiline: {
    height: "auto",
    minHeight: 80,
    textAlignVertical: "top",
    paddingTop: 8,
  },
  label: {
    fontWeight: "500",
    marginBottom: 4,
  },
});
