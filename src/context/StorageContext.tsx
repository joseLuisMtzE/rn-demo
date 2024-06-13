import { getCurrentUser } from "aws-amplify/auth";
import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  uploadData,
  list,
  getProperties,
  getUrl,
  remove,
} from "aws-amplify/storage";
import { ImagePickerAsset } from "expo-image-picker";
import { Alert, Platform, ToastAndroid } from "react-native";

interface StorageContextType {
  uploadDataTest: () => Promise<void>;
  listFiles: () => Promise<any>;
  deleteFile: (path: any) => Promise<any>;
  uploadFile: (imageAsset: ImagePickerAsset) => Promise<any>;
  files: string[] | null;
  loadingFiles: boolean;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<any[] | null>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const uploadDataTest = async () => {
    try {
      // path: 'public/album/2024/1.jpg',
      const result = await uploadData({
        path: ({ identityId }) => `private/${identityId}/xd1.txt`,
        data: new Blob(["contenido de tu archivo"], { type: "text/plain" }),
        // options: {
        //   onProgress: (progress) =>
        //     console.log(`Progreso: ${JSON.stringify(progress)}`),
        // },
      });
      Toast("Subida exitosa!");
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const listFiles = async () => {
    setLoadingFiles(true);
    try {
      const result = await list({
        path: ({ identityId }) => `private/${identityId}/`,
      });

      const uris = await Promise.all(
        result.items.map(async (item) => {
          const imgProps = await getProperties({ path: item.path });
          const signedUrl = await getUrl({ path: item.path });

          return { properties: imgProps, uri: signedUrl.url.toString() };
        })
      );
      setLoadingFiles(false);
      uris.length === 0 ? setFiles(null) : setFiles(uris);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (imageAsset: ImagePickerAsset) => {
    const response = await fetch(imageAsset.uri);
    const blob = await response.blob();
    const fileName = imageAsset.fileName || `${Date.now()}.jpg`;

    try {
      const { result, resume } = await uploadData({
        path: ({ identityId }) => `private/${identityId}/${fileName}`,
        data: blob,
      });
      Toast("Subida exitosa!");
      return result;
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const deleteFile = async (path: any) => {
    try {
      await remove({
        path: path,
      });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const Toast = (msg: string) => {
    Platform.OS === "ios"
      ? Alert.alert(msg)
      : ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  return (
    <StorageContext.Provider
      value={{
        uploadDataTest,
        listFiles,
        uploadFile,
        files,
        loadingFiles,
        deleteFile,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error("useStorage must be used within an Storagerovider");
  }
  return context;
};

export { StorageProvider, useStorage };
