import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContex";
import { useStorage } from "../../context/StorageContext";

export default function HomeScreen() {
  const { onSignOut } = useAuth();
  const { uploadDataTest, listFiles } = useStorage();

  useEffect(() => {
    uploadDataTest();
    listFiles();
  }, []);

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <Button title="Salir" onPress={() => onSignOut()} />

      <View className="w-full justify-start">
        <Text className=" font-bold tracking-widest text-2xl  ">
          YOUR M E M O R I E S
        </Text>
      </View>
    </SafeAreaView>
  );
}
