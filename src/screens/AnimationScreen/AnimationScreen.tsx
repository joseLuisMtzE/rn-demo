import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import React from "react";
import LoginScreen from "./LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

Amplify.configure(config);

const AuthStack = createNativeStackNavigator();
const NoAuthStack = createNativeStackNavigator();

interface Props {
  navigation: any;
  route: any;
}
export default function AnimationScreen({ navigation, route }: Props) {
  const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   // Aquí podrías hacer una llamada a una API o revisar el estado de autenticación
  //   // Para este ejemplo, asumiremos que el usuario no está autenticado al principio
  //   const checkAuthStatus = () => {
  //     // Simulación: después de 2 segundos, consideramos que el usuario está autenticado
  //     setTimeout(() => {
  //       setIsAuth(true);
  //     }, 5000);
  //   };

  //   checkAuthStatus();
  // }, []);

  const Xd = () => (
    <SafeAreaView>
      <Text>AUTH</Text>
    </SafeAreaView>
  );
  return (
    <Authenticator.Provider>
      {/* <SafeAreaView style={styles.container}> */}
      {/* <LoginScreen navigation={navigation} /> */}
      {/* </SafeAreaView> */}
      {isAuth ? (
        <AuthStack.Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="home" component={Xd} />
        </AuthStack.Navigator>
      ) : (
        <NoAuthStack.Navigator
          initialRouteName="loginScreen"
          screenOptions={{ headerShown: false }}
        >
          <NoAuthStack.Screen name="loginScreen" component={LoginScreen} />
        </NoAuthStack.Navigator>
      )}
    </Authenticator.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
