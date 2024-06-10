import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../../components/ListItem/ListItem";

interface Props {
  navigation: any;
}

interface HomeScreenData {
  label: string;
  pathTo: string;
  navigation: any;
  description: string;
  disabled: boolean;
}
[];

const HomeScreen = ({ navigation }: Props) => {
  const json: HomeScreenData[] = [
    {
      label: "Almacenamiento de documentos",
      pathTo: "Storage",
      navigation: { navigation },
      description: "Guardar datos en almacenamiento local.",
      disabled: false,
    },
    {
      label: "Sensores",
      pathTo: "Sensors",
      navigation: { navigation },
      description: "Mostrar valores de algunos sensores.",
      disabled: false,
    },
    {
      label: "Llamada a API",
      pathTo: "Api",
      navigation: { navigation },
      description: "Hacer una llamada a un API.",
      disabled: false,
    },
    {
      label: "Animaciones",
      pathTo: "Animation",
      navigation: { navigation },
      description: "Animaciones, formularios, diseño responsive.",
      disabled: false,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={json}
        keyExtractor={(item) => item.pathTo}
        renderItem={({ item }) => (
          <ListItem
            label={item.label}
            pathTo={item.pathTo}
            navigation={navigation}
            description={item.description}
            disabled={item.disabled}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#c9c9c9",
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
});

export default HomeScreen;
