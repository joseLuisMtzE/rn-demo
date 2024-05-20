import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Props {
  navigation: any;
  route: any;
}
export default function StorageScreen({ navigation, route }: Props) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          Almacenamiento de algún documento, para propósitos de esta prueba se
          puede tratar de una cadena extensa, en algún tipo de almacenamiento
          local.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
