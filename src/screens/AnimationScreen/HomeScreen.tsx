import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContex";
import { useStorage } from "../../context/StorageContext";
import * as ImagePicker from "expo-image-picker";
import { Image, Alert } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  FAB,
  IconButton,
  useTheme,
} from "react-native-paper";
import ItemList from "./ItemList";

export default function HomeScreen() {
  const theme = useTheme();
  const { onSignOut } = useAuth();
  const { listFiles, uploadFile, files, loadingFiles } = useStorage();

  useEffect(() => {
    listFiles();
  }, []);

  useEffect(() => {
    requestPermissions();
  }, []);

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to make this work!");
    }
  };

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadFile(result.assets[0]);
      setTimeout(async () => {
        await listFiles();
      }, 1000);
    }
  };

  const takeAPhoto = async () => {
    let result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadFile(result.assets[0]);
      setTimeout(async () => {
        await listFiles();
      }, 1000);
    }
  };

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <ItemList item={item} />;
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="w-full  flex-row justify-between items-center ">
        <Text
          className=" font-bold tracking-widest text-2xl  ml-2"
          style={{ color: theme.colors.primary }}
        >
          YOUR MEMORIES
        </Text>
        <IconButton
          icon="logout"
          onPress={() => onSignOut()}
          iconColor={theme.colors.error}
        />
      </View>
      <View className="flex-1 w-full h-full">
        <FlatList
          style={{ flex: 1 }}
          data={files}
          renderItem={renderItem}
          numColumns={3}
          refreshing={loadingFiles}
          onRefresh={listFiles}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View className="w-full h-full justify-center ">
              {files ? (
                <ActivityIndicator />
              ) : (
                <View className="justify-center items-center">
                  <Text style={{ opacity: 0.2 }}>No hay memorias por ver</Text>
                </View>
              )}
            </View>
          }
        />
      </View>

      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "camera",
            label: "Camara",
            onPress: () => takeAPhoto(),
          },
          {
            icon: "cloud-upload",
            label: "Subir",
            onPress: () => pickImage(),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </SafeAreaView>
  );
}
