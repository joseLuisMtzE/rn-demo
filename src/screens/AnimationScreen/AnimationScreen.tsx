import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import React from "react";
import { AuthProvider, useAuth } from "../../context/AuthContex";
import ScreensNav from "./ScreensNav";

Amplify.configure(config);

interface Props {
  navigation: any;
  route: any;
}
export default function AnimationScreen({ navigation, route }: Props) {
  return (
    <Authenticator.Provider>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </Authenticator.Provider>
  );
}
