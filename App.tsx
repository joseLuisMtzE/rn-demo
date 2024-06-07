import React from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

// Screens
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import StorageScreen from "./src/screens/StorageScreen/StorageScreen";
import SensorsScreen from "./src/screens/SensorsScreen/SensorScreen";
import ApiScreen from "./src/screens/ApiScreen/ApiScreen";
import AnimationScreen from "./src/screens/AnimationScreen/AnimationScreen";

//Storage example
import NoteFormModal from "./src/screens/StorageScreen/NoteFormModal";

// Sensors
import AccelerometerScreen from "./src/screens/SensorsScreen/AccelerometerScreen";
import GyroscopeScreen from "./src/screens/SensorsScreen/GyroscopeScreen";
import MagnetometerScreen from "./src/screens/SensorsScreen/MagnetometerScreen";
import LightSensorScreen from "./src/screens/SensorsScreen/LightSensorScreen";
import ProximityScreen from "./src/screens/SensorsScreen/ProximityScreen";
import BarometerScreen from "./src/screens/SensorsScreen/BarometerScreen";
import PedometerScreen from "./src/screens/SensorsScreen/PodometerScreen";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import RecipeDetailScreen from "./src/screens/ApiScreen/RecipeDetailScreen";

const Stack = createNativeStackNavigator();

const recipesAppLightTheme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(113, 92, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 225, 122)",
    onPrimaryContainer: "rgb(35, 27, 0)",
    secondary: "rgb(183, 34, 0)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 211)",
    onSecondaryContainer: "rgb(62, 5, 0)",
    tertiary: "rgb(2, 109, 55)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(156, 246, 178)",
    onTertiaryContainer: "rgb(0, 33, 12)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(29, 27, 22)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(29, 27, 22)",
    surfaceVariant: "rgb(234, 226, 207)",
    onSurfaceVariant: "rgb(75, 70, 57)",
    outline: "rgb(125, 119, 103)",
    outlineVariant: "rgb(206, 198, 180)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(51, 48, 42)",
    inverseOnSurface: "rgb(246, 240, 231)",
    inversePrimary: "rgb(235, 195, 8)",
    elevation: {
      level0: "transparent",
      level1: "rgb(248, 243, 242)",
      level2: "rgb(244, 238, 235)",
      level3: "rgb(239, 234, 227)",
      level4: "rgb(238, 232, 224)",
      level5: "rgb(235, 229, 219)",
    },
    surfaceDisabled: "rgba(29, 27, 22, 0.12)",
    onSurfaceDisabled: "rgba(29, 27, 22, 0.38)",
    backdrop: "rgba(52, 48, 36, 0.4)",
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  return (
    <PaperProvider theme={recipesAppLightTheme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Group screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "React Native Demo",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#FF8B29" },
                headerTitleStyle: { fontWeight: "700", color: "white" },
              }}
            />
            <Stack.Screen
              name="Storage"
              component={StorageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Sensors" component={SensorsScreen} />
            <Stack.Screen
              name="Api"
              component={ApiScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="Animation" component={AnimationScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "fullScreenModal",
            }}
          >
            <Stack.Screen
              name="NoteForm"
              component={NoteFormModal}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name="acelerometer"
              options={{
                title: "Acelerómetro",
              }}
              component={AccelerometerScreen}
            />
            <Stack.Screen
              name="gyroscope"
              options={{
                title: "Giroscopio",
              }}
              component={GyroscopeScreen}
            />
            <Stack.Screen
              name="magnetometer"
              options={{
                title: "Magnetometro",
              }}
              component={MagnetometerScreen}
            />
            <Stack.Screen
              name="lightSensor"
              options={{
                title: "Sensor de luz",
              }}
              component={LightSensorScreen}
            />
            <Stack.Screen
              name="proximity"
              options={{
                title: "Sensor de proximidad",
              }}
              component={ProximityScreen}
            />
            <Stack.Screen
              name="barometer"
              options={{
                title: "Barómetro",
              }}
              component={BarometerScreen}
            />
            <Stack.Screen
              name="pedometer"
              options={{
                title: "Pedómetro",
              }}
              component={PedometerScreen}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              options={{ presentation: "modal" }}
              name="recipeDetailScreen"
              component={RecipeDetailScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
