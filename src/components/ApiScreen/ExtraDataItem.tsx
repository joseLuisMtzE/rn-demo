import { View, Text } from "react-native";
import React from "react";
import { Avatar, useTheme } from "react-native-paper";

interface ExtraDataItemProps {
  data: number | string;
  icon: string;
  name: string;
}

export default function ExtraDataItem(item: ExtraDataItemProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 150,
        height: 100,
        paddingHorizontal: 8,
        gap: 4,
        minWidth: 50,
      }}
    >
      <Avatar.Icon
        size={32}
        icon={item.icon}
        style={{ backgroundColor: "white" }}
        color={theme.colors.onPrimaryContainer}
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: "RobotoBold",
        }}
      >
        {item.data}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontFamily: "RobotoLight",
        }}
      >
        {item.name}
      </Text>
    </View>
  );
}
