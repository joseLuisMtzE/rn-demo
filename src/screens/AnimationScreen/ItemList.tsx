import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Avatar, IconButton, useTheme } from "react-native-paper";
import { useStorage } from "../../context/StorageContext";

export default function ItemList({ item }: any) {
  const theme = useTheme();
  const { deleteFile, listFiles } = useStorage();
  const { properties, uri } = item;
  const fileName: string = properties.path.split("/")[2];

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
  };

  const deleteItem = async () => {
    await deleteFile(properties.path);
    setTimeout(() => {
      listFiles();
    }, 1000);
  };
  return (
    <>
      {!isPressed ? (
        <TouchableOpacity
          activeOpacity={0.3}
          onLongPress={handlePress}
          className="rounded-xl flex-1 m-1 justify-center items-center content-center   bg-[#FFD9DE]"
        >
          <Image source={{ uri: uri }} className="w-full h-32 rounded-t-xl" />
          <View className="flex flex-row w-full items-center p-2  overflow-hidden ">
            <Avatar.Icon icon={"image"} size={32} />
            <Text className="w-full ml-1 flex-1" numberOfLines={1}>
              {fileName}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Pressable
          className="rounded-xl flex-1 m-1 justify-center items-center content-center h-44   bg-[#FFD9DE]"
          onPress={() => setIsPressed(!isPressed)}
        >
          <IconButton
            icon={"delete"}
            onPress={deleteItem}
            size={34}
            iconColor={theme.colors.primary}
          />
        </Pressable>
      )}
    </>
  );
}
