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

const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="Api" component={ApiScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
