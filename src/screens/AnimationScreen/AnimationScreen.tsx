import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import React from "react";
import { AuthProvider } from "../../context/AuthContex";
import ScreensNav from "./ScreensNav";
import { StorageProvider } from "../../context/StorageContext";
import { PaperProvider } from "react-native-paper";

Amplify.configure(config);

interface Props {
  navigation: any;
  route: any;
}

const theme = {
  colors: {
    primary: "rgb(181, 28, 80)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 217, 222)",
    onPrimaryContainer: "rgb(63, 0, 21)",
    secondary: "rgb(151, 27, 193)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(250, 215, 255)",
    onSecondaryContainer: "rgb(51, 0, 69)",
    tertiary: "rgb(0, 100, 146)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(201, 230, 255)",
    onTertiaryContainer: "rgb(0, 30, 47)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 27)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 27)",
    surfaceVariant: "rgb(243, 221, 223)",
    onSurfaceVariant: "rgb(82, 67, 69)",
    outline: "rgb(132, 115, 117)",
    outlineVariant: "rgb(214, 194, 196)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 47)",
    inverseOnSurface: "rgb(251, 238, 238)",
    inversePrimary: "rgb(255, 178, 191)",
    elevation: {
      level0: "transparent",
      level1: "rgb(251, 240, 246)",
      level2: "rgb(249, 233, 241)",
      level3: "rgb(247, 227, 236)",
      level4: "rgb(246, 224, 234)",
      level5: "rgb(245, 220, 231)",
    },
    surfaceDisabled: "rgba(32, 26, 27, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 27, 0.38)",
    backdrop: "rgba(58, 45, 47, 0.4)",
  },
};

export default function AnimationScreen({ navigation, route }: Props) {
  return (
    <PaperProvider theme={theme}>
      <Authenticator.Provider>
        <AuthProvider>
          <StorageProvider>
            <ScreensNav />
          </StorageProvider>
        </AuthProvider>
      </Authenticator.Provider>
    </PaperProvider>
  );
}
