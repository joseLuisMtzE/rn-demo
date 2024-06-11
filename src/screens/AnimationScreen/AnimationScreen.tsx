import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { translations } from "@aws-amplify/ui";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports";
import { I18n } from "aws-amplify/utils";
import { fetchAuthSession, getCurrentUser, signIn } from "aws-amplify/auth";
import Storage, { list, remove, uploadData } from "aws-amplify/storage";

Amplify.configure(config);

I18n.putVocabularies(translations);
I18n.setLanguage("es");

I18n.putVocabularies({
  es: {
    "Account recovery requires verified contact information":
      "La recuperación de la cuenta requiere información de contacto verificada",
    "Back to Sign In": "Volver a inicio de sesión",
    "Change Password": "Cambiar contraseña",
    Changing: "Cambiando",
    Code: "Código",
    "Confirm Password": "Confirmar contraseña",
    "Confirm Sign Up": "Confirmar registro",
    "Confirm SMS Code": "Confirmar el código de SMS",
    "Confirm TOTP Code": "Confirmar código TOTP",
    Confirm: "Confirmar",
    "Confirmation Code": "Código de confirmación",
    Confirming: "Confirmando",
    "Create a new account": "Crear una cuenta nueva",
    "Create Account": "Crear cuenta",
    "Creating Account": "Creando cuenta",
    "Dismiss alert": "Descartar alerta",
    Email: "Email",
    "Enter your code": "Ingrese el código",
    "Enter your Email": "Escriba su Email",
    "Enter your Password": "Escriba su Contraseña",
    "Enter your phone number": "Ingrese el número de teléfono",
    "Enter your username": "Ingrese el nombre de usuario",
    "Forgot your password?": "¿Olvidó su contraseña?",
    "Hide password": "Ocultar contraseña",
    "It may take a minute to arrive":
      "Es posible que tarde un minuto en llegar",
    Loading: "Cargando",
    "New password": "Nueva contraseña",
    or: "o",
    Password: "Contraseña",
    "Phone Number": "Número de teléfono",
    "Resend Code": "Reenviar código",
    "Reset your password": "Restablecer su contraseña",
    "Reset Password": "Restablecer su Contraseña",
    "Send code": "Enviar código",
    "Send Code": "Enviar código",
    Sending: "Enviando",
    "Setup TOTP": "Configurar TOTP",
    "Show password": "Mostrar contraseña",
    "Sign in to your account": "Iniciar sesión en tu cuenta",
    "Sign In with Amazon": "Iniciar Sesión con Amazon",
    "Sign In with Apple": "Iniciar Sesión con Apple",
    "Sign In with Facebook": "Iniciar Sesión con Facebook",
    "Sign In with Google": "Iniciar Sesión con Google",
    "Sign in": "Iniciar sesión",
    "Sign In": "Iniciar Sesión",
    "Signing in": "Iniciando sesión",
    Skip: "Omitir",
    Submit: "Enviar",
    Submitting: "Enviando",
    Username: "Nombre de usuario",
    "Verify Contact": "Verificar contacto",
    Verify: "Verificar",
    "We Emailed You": "Le hemos enviado un correo electrónico",
    "We Sent A Code": "Hemos enviado un código",
    "We Texted You": "Le hemos enviado un mensaje de texto",
    "Your code is on the way. To log in, enter the code we emailed to":
      "El código está en camino. Para iniciar sesión, escriba el código que hemos enviado por correo electrónico a",
    "Your code is on the way. To log in, enter the code we sent you":
      "El código está en camino. Para iniciar sesión, escriba el código que le hemos enviado",
    "Your code is on the way. To log in, enter the code we texted to":
      "El código está en camino. Para iniciar sesión, escriba el código que hemos enviado por mensaje de texto a",

    // Additional translations provided by customers
    "An account with the given email already exists.":
      "Ya existe una cuenta con el correo ingresado.",
    "Confirm a Code": "Confirmar un código",
    "Confirm Sign In": "Confirmar inicio de sesión",
    "Forgot Password?": "Olvidé mi contraseña",
    "Incorrect username or password.":
      "Nombre de usuario o contraseña incorrecta",
    "Invalid password format": "Formato de contraseña inválido",
    "Invalid phone number format": "Formato de número de teléfono inválido",
    "Loading...": "Cargando...",
    "New Password": "Nueva contraseña",
    "Resend a Code": "Reenviar un código",
    "Sign Out": "Cerrar sesión",
    "Sign Up with Amazon": "Crear cuenta con Amazon",
    "Sign Up with Apple": "Crear cuenta con Apple",
    "Sign Up with Facebook": "Crear cuenta con Facebook",
    "Sign Up with Google": "Crear cuenta con Google",
    "Sign Up": "Crear cuenta",
    "User already exists": "El usuario ya existe",
    "User does not exist": "El usuario no existe",
    "Username cannot be empty": "El nombre de usuario no puede estar vacío",
    "Your passwords must match": "Las contraseñas deben coincidir",
  },
});

interface Props {
  navigation: any;
  route: any;
}
export default function AnimationScreen({ navigation, route }: Props) {
  const [isAuth, setIsAuth] = useState(false);

  const [items, setItems] = useState<any>(null);
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  function SignOutButton() {
    const { signOut, error } = useAuthenticator();
    console.log(error);

    return <Button title="Sign Out" onPress={signOut} />;
  }

  const listBucket = async () => {
    try {
      const result = await list({
        path: "public/",
        // Alternatively, path: ({identityId}) => `protected/${identityId}/photos/`
      });
      console.log(result);
      console.log(result.items.length);
      setItems(result?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (path: string) => {
    try {
      const res = await remove({
        path: path,
        // Alternatively, path: ({identityId}) => `protected/${identityId}/album/2024/1.jpg`
      });
      console.log(res);
      listBucket();
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const onSingIn = async () => {
    try {
      await signIn({
        username: "joseluis.martinez@microsip.com",
        password: "1234567!",
        options: { authFlowType: "USER_PASSWORD_AUTH" },
      }).then((res) => console.log(res));
      setIsAuth(true);
      console.log("auth success");
    } catch (error) {
      setIsAuth(false);
      console.log("ERROR", error);
    }
  };

  const uploadFile = async () => {
    try {
      const result = await uploadData({
        key: "dummy-text-file2.txt",
        data: new Blob(["This is some dummy text content."], {
          type: "text/plain",
        }),
      }).result;
      console.log("Succeeded: ", result);
      listBucket();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <Authenticator.Provider>
      <SafeAreaView style={styles.container}>
        {/* <Button title="Sign in" onPress={onSingIn} />
        <SignOutButton /> */}
        {/* <FlatList
          data={[{}, {}, {}, {}]}
          renderItem={(item) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>A</Text>
            </View>
          )}
          style={{ backgroundColor: "#c9c9", width: "100%" }}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
        /> */}
        <Text>{isAuth ? "Autenticado!" : "Por favor inicia sesion"}</Text>
        <Button title="Sign in" onPress={onSingIn} />
        <SignOutButton />
        <Button title="Subir archivo" onPress={uploadFile} />
        <Button title="Ver contenido de bucket" onPress={listBucket} />
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View>
              <Text>{item.path}</Text>
              <Button title="X" onPress={() => deleteItem(item.path)} />
            </View>
          )}
        />
      </SafeAreaView>
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
