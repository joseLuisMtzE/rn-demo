import { View, Text } from "react-native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

interface BackButtonProps {
  navigation: any;
  style?: Object;
}

export default function BackButton({ navigation, style }: BackButtonProps) {
  const theme = useTheme();
  return (
    <IconButton
      style={[
        {
          position: "absolute",
          zIndex: 1,
          left: 4,
        },
        style,
      ]}
      icon={"chevron-left"}
      mode="contained"
      containerColor={theme.colors.primaryContainer}
      iconColor={theme.colors.shadow}
      size={28}
      onPress={() => navigation.goBack()}
    />
  );
}
