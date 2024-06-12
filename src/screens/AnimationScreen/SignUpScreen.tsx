import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function SignUpScreen({ navigation, route }: any) {
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

              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="Email" placeholderTextColor={"gray"} />
              </View>
              <View className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                />
              </View>
              <View className="w-full">
                <TouchableOpacity className="w-full bg-[#AB165A] p-3 rounded-2xl  ">
                  <Text className="text-white text-center">Entrar</Text>
                </TouchableOpacity>
              </View>
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
