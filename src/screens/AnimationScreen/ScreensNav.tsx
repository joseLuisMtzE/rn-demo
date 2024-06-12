import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import { useAuth } from "../../context/AuthContex";
import SignUpScreen from "./SignUpScreen";

export default function ScreensNav() {
  const AuthStack = createNativeStackNavigator();
  const NoAuthStack = createNativeStackNavigator();

  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <AuthStack.Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="home" component={HomeScreen} />
        </AuthStack.Navigator>
      ) : (
        <NoAuthStack.Navigator
          initialRouteName="loginScreen"
          screenOptions={{ headerShown: false }}
        >
          <NoAuthStack.Screen name="loginScreen" component={LoginScreen} />
          <NoAuthStack.Screen name="signUpScreen" component={SignUpScreen} />
        </NoAuthStack.Navigator>
      )}
    </>
  );
}
