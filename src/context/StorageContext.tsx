import { getCurrentUser } from "aws-amplify/auth";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { uploadData, list } from "aws-amplify/storage";

interface StorageContextType {
  uploadDataTest: () => Promise<void>;
  listFiles: () => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const StorageProvider = ({ children }: { children: ReactNode }) => {
  const getUserId = async () => {
    const { userId } = await getCurrentUser();
    return userId;
  };

  // const test = async () => {
  //   try {
  //     const result = await getProperties({
  //       // `identityId` will provide the ID of the currently authenticated user
  //       path: ({ identityId }) => `private/`,
  //       // path: ({ identityId }) => `private/${identityId}/album/2024/1.jpg`,
  //     });
  //     console.log("File Properties ", result);
  //   } catch (error) {
  //     console.log("Error ", error);
  //   }
  // };

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
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const listFiles = async () => {
    try {
      const result = await list({
        path: ({ identityId }) => `private/${identityId}/`,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StorageContext.Provider value={{ uploadDataTest, listFiles }}>
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
