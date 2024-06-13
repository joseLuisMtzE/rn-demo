import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import React from "react";
import { AuthProvider } from "../../context/AuthContex";
import ScreensNav from "./ScreensNav";
import { StorageProvider } from "../../context/StorageContext";

Amplify.configure(config);

interface Props {
  navigation: any;
  route: any;
}

export default function AnimationScreen({ navigation, route }: Props) {
  return (
    <Authenticator.Provider>
      <AuthProvider>
        <StorageProvider>
          <ScreensNav />
        </StorageProvider>
      </AuthProvider>
    </Authenticator.Provider>
  );
}
