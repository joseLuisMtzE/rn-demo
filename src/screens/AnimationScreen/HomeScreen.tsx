import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContex";

export default function HomeScreen() {
  const { onSignOut } = useAuth();

  return (
    <SafeAreaView>
      <Text>AUTH</Text>
      <Button title="Salir" onPress={() => onSignOut()}></Button>
    </SafeAreaView>
  );
}
