import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../../components/ListItem/ListItem";

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const json = [
    {
      label: "Almacenamiento de documentos",
      pathTo: "Storage",
      navigation: { navigation },
      description: "Guardar datos en almacenamiento local.",
    },
    {
      label: "Sensores",
      pathTo: "Sensors",
      navigation: { navigation },
      description: "Mostrar valores de algunos sensores.",
    },
    {
      label: "Llamada a API",
      pathTo: "Api",
      navigation: { navigation },
      description: "Hacer una llamada a un API.",
    },
    {
      label: "Animaciones",
      pathTo: "Animation",
      navigation: { navigation },
      description: "Animaciones, formularios, diseño responsive.",
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
          />
        )}
      />
      {/* <Text style={{ alignSelf: "center" }}>Microsip</Text> */}
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
    fontSize: 32, // Adjust font size as needed
    fontWeight: "bold", // Make it bold (optional)
    color: "#000", // Set text color (optional)
  },
});

export default HomeScreen;
