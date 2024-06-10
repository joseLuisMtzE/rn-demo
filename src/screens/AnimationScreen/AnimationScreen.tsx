import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Props {
  navigation: any;
  route: any;
}
export default function AnimationScreen({ navigation, route }: Props) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>dadwdwwadawdwa</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
