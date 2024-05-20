import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import StorageScreen from "./src/screens/StorageScreen/StorageScreen";
import SensorsScreen from "./src/screens/SensorsScreen/SensorScreen";
import ApiScreen from "./src/screens/ApiScreen/ApiScreen";
import AnimationScreen from "./src/screens/AnimationScreen/AnimationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen name="Storage" component={StorageScreen} />
        <Stack.Screen name="Sensors" component={SensorsScreen} />
        <Stack.Screen name="Api" component={ApiScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
