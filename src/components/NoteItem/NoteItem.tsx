import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import IconButton from "../IconButton/IconButton";

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  color: string;
  onPress: () => void;
  onDelete: (id: string) => void;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NoteItem({
  id,
  title,
  content,
  color,
  onPress,
  onDelete,
}: NoteItemProps) {
  const [deleteItem, setDeleteItem] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onLongPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setDeleteItem((prev) => !prev);
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <View
        style={[
          styles.noteContainer,
          {
            backgroundColor: color || "#e9e9e9",
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content} numberOfLines={4} ellipsizeMode="tail">
          {content}
        </Text>
      </View>
      {deleteItem && (
        <View>
          <IconButton
            iconName={"trash-2"}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              onDelete(id);
              setDeleteItem((prev) => !prev);
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    overflow: "hidden",
    borderRadius: 8,
    flex: 1,
  },
  title: {
    color: "#626262",
    fontFamily: "RobotoBold",
    fontSize: 16,
  },
  content: {
    color: "#626262",
    fontFamily: "RobotoRegular",
    fontSize: 14,
    textAlign: "justify",
  },
});
