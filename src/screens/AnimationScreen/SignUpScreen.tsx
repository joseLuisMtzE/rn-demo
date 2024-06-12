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
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../context/AuthContex";
import { Controller, useForm } from "react-hook-form";
import { SignUpInput } from "aws-amplify/auth";

export default function SignUpScreen({ navigation, route }: any) {
  const {
    onSignUp,
    handleSignUpConfirmation,
    signUpFlow,
    handleResendCode,
    cleanSignUpFlow,
  } = useAuth();

  const passwordRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      verificationCode: "",
    },
  });

  useEffect(() => {
    if (signUpFlow !== undefined && signUpFlow.isSignUpComplete) {
      const { username } = getValues();
      navigation.navigate("loginScreen", { username });
      cleanSignUpFlow();
    }
  }, [signUpFlow]);

  const onSubmit = async (data: SignUpInput) => onSignUp(data);
  const onSubmitCode = async () => {
    const { username, verificationCode } = getValues();
    handleSignUpConfirmation({ username, confirmationCode: verificationCode });
  };

  const onResendCode = () => {
    const { username }: any = getValues();
    if (!username) {
      console.warn("Username is required to resend the code.");
      return;
    }
    handleResendCode({ username });
  };

  const SignUpForm = () => (
    <View className="w-full m-4 space-y-4  ">
      <View className="bg-black/5 p-5 rounded-2xl w-full">
        {errors.username && (
          <Text className="text-[#AB165A]">{errors.username.message}</Text>
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
                inputMode="email"
              />
            </>
          )}
          name="username"
        />
      </View>
      <View className="bg-black/5 p-5 rounded-2xl w-full">
        {errors.password && (
          <Text className="text-[#AB165A]">{errors.password.message}</Text>
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
          <Text className="text-white text-center">Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const VerificationCodeForm = () => (
    <View className="w-full m-4 space-y-4  ">
      <Text>
        Correo enviado a:{" "}
        {signUpFlow && signUpFlow.nextStep.codeDeliveryDetails.destination}
      </Text>
      <View className="bg-black/5 p-5 rounded-2xl w-full">
        {errors.verificationCode && (
          <Text className="text-[#AB165A]">
            {errors.verificationCode.message}
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
              placeholder="Código de verificación"
              placeholderTextColor={"gray"}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(onSubmitCode)}
              ref={passwordRef}
              inputMode="numeric"
            />
          )}
          name="verificationCode"
        />
      </View>
      <View className="w-full flex gap-4">
        <TouchableOpacity
          className="w-full bg-[#AB165A] p-3 rounded-2xl  "
          onPress={() => onSubmitCode()}
        >
          <Text className="text-white text-center">Verificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full bg-[#FFD9E1] p-3 rounded-2xl border border-[#AB165A] "
          onPress={onResendCode}
        >
          <Text className="text-[#AB165A] text-center">Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60] mt-8 "
                source={require("../../../assets/heart.png")}
              />
              <Animated.Image
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60] mt-4"
                source={require("../../../assets/music.png")}
              />

              <Animated.Image
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60] mt-8"
                source={require("../../../assets/folder.png")}
              />
            </View>
            <Animated.View
              entering={FadeIn.duration(500)}
              className="  w-full my-3"
            >
              <Text className="text-white font-bold tracking-widest text-4xl self-center">
                M E M O R I E S
              </Text>
            </Animated.View>
            <View className="flex-row justify-around">
              <Animated.Image
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60] "
                source={require("../../../assets/camera.png")}
              />
              <Animated.Image
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60] mt-4"
                source={require("../../../assets/picture.png")}
              />
              <Animated.Image
                entering={FadeIn.duration(500).springify()}
                className="w-[60] h-[60]"
                source={require("../../../assets/file-text.png")}
              />
            </View>
          </View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            className="h-full w-full flex-1 justify-center my-8"
          >
            <View className="flex items-center   mx-4 space-y-4">
              <Text className="text-3xl font-bold text-[#AB165A]">
                Registrate
              </Text>

              {signUpFlow?.nextStep?.signUpStep !== "CONFIRM_SIGN_UP" ? (
                <SignUpForm />
              ) : (
                <VerificationCodeForm />
              )}
              <View className="flex-row justify-center gap-1 m-4">
                <Text>Tengo una cuenta</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text className="text-[#AB165A]">Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
