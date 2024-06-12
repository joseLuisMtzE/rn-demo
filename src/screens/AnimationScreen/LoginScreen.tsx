import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  FadeIn,
  ZoomInEasyDown,
  FadeInDown,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import { SignInInput } from "aws-amplify/auth";
import { useAuth } from "../../context/AuthContex";

export default function LoginScreen({ navigation, route }: any) {
  const { onSignIn, currentAuthenticatedUser } = useAuth();

  const { username } = route?.params || {};

  const passwordRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInInput) => onSignIn(data);

  useEffect(() => {
    currentAuthenticatedUser();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 20 : 200}
      enableAutomaticScroll={Platform.OS === "ios"}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
    >
      {username && setValue("username", username)}
      <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="w-full absolute"
          source={require("../../../assets/bg-fade.png")}
        />

        <View className="bg-slate-600/20 h-full justify-between">
          <View className="flex-col flex-wrap p-8 w-full ">
            <View className="flex-row justify-around">
              <Animated.Image
                entering={ZoomInEasyDown.delay(200).duration(500).springify()}
                className="w-[60] h-[60] mt-8 "
                source={require("../../../assets/heart.png")}
              />
              <Animated.Image
                entering={ZoomInEasyDown.delay(500).duration(500).springify()}
                className="w-[60] h-[60] mt-4"
                source={require("../../../assets/music.png")}
              />

              <Animated.Image
                entering={ZoomInEasyDown.delay(700).duration(500).springify()}
                className="w-[60] h-[60] mt-8"
                source={require("../../../assets/folder.png")}
              />
            </View>
            <Animated.View
              entering={FadeIn.delay(1000).duration(500)}
              className="  w-full my-3"
            >
              <Text className="text-white font-bold tracking-widest text-4xl self-center">
                M E M O R I E S
              </Text>
            </Animated.View>
            <View className="flex-row justify-around">
              <Animated.Image
                entering={ZoomInEasyDown.delay(400).duration(500).springify()}
                className="w-[60] h-[60] "
                source={require("../../../assets/camera.png")}
              />
              <Animated.Image
                entering={ZoomInEasyDown.delay(900).duration(500).springify()}
                className="w-[60] h-[60] mt-4"
                source={require("../../../assets/picture.png")}
              />
              <Animated.Image
                entering={ZoomInEasyDown.delay(300).duration(500).springify()}
                className="w-[60] h-[60]"
                source={require("../../../assets/file-text.png")}
              />
            </View>
          </View>

          <Animated.View
            entering={FadeInDown.delay(1500).duration(500)}
            className="h-full w-full flex-1 justify-center my-8"
          >
            <View className="flex items-center   mx-4 space-y-4">
              <Text className="text-3xl font-bold text-[#AB165A]">
                Inicia sesión
              </Text>

              <View className="bg-black/5 p-5 rounded-2xl w-full">
                {errors.username && (
                  <Text className="text-[#AB165A]">
                    {errors.username.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                    required: "Campo requerido",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor={"gray"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onSubmitEditing={() => passwordRef?.current?.focus()}
                        returnKeyType="next"
                      />
                    </>
                  )}
                  name="username"
                />
              </View>
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                {errors.password && (
                  <Text className="text-[#AB165A]">
                    {errors.password.message}
                  </Text>
                )}
                <Controller
                  control={control}
                  rules={{
                    maxLength: 100,
                    required: "Campo requerido",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Contraseña"
                      placeholderTextColor={"gray"}
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      ref={passwordRef}
                    />
                  )}
                  name="password"
                />
              </View>
              <View className="w-full">
                <TouchableOpacity
                  className="w-full bg-[#AB165A] p-3 rounded-2xl  "
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-center">Entrar</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center gap-1 m-4">
                <Text>¿Aún no tienes una cuenta?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("signUpScreen")}
                >
                  <Text className="text-[#AB165A]">Registrate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
