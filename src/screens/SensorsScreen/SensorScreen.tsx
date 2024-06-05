import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Acelerometer from "./AccelerometerScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface Props {
  navigation: any;
  route: any;
}

interface SensorListProps {
  text: string;
  pathTo: string;
  icon?: any;
}
[];

const sensorsList: SensorListProps[] = [
  {
    text: "Acelerometro",
    pathTo: "acelerometer",
    icon: (
      <MaterialCommunityIcons
        name="motion-outline"
        size={48}
        color="black"
        style={{ opacity: 0.2 }}
      />
    ),
  },
  {
    text: "Giroscopio",
    pathTo: "gyroscope",
    icon: (
      <MaterialCommunityIcons
        name="rotate-orbit"
        size={32}
        color="black"
        style={{ opacity: 0.2 }}
      />
    ),
  },
  {
    text: "Magnetómetro",
    pathTo: "magnetometer",
    icon: (
      <MaterialCommunityIcons
        name="magnet"
        size={32}
        color="black"
        style={{ opacity: 0.2 }}
      />
    ),
  },
  {
    text: "Sensor de luz",
    pathTo: "lightSensor",
    icon: (
      <MaterialCommunityIcons
        name="white-balance-sunny"
        size={32}
        color="black"
        style={{ opacity: 0.2 }}
      />
    ),
  },
  {
    text: "Proximidad",
    pathTo: "proximity",
    icon: (
      <MaterialCommunityIcons
        name="motion-sensor"
        size={32}
        color="black"
        style={{ opacity: 0.2 }}
      />
    ),
  },
];
export default function SensorsScreen({ navigation, route }: Props) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  const Card = ({ item }: any) => (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        backgroundColor: "#FFF",
        margin: 4,
        padding: 8,
        borderRadius: 16,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={() => navigation.navigate(item.pathTo)}
      activeOpacity={0.5}
    >
      <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
        {item.text}
      </Text>
      <View style={{ alignItems: "flex-end" }}>{item.icon}</View>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView style={styles.container}>
    <View>
      <FlatList
        data={sensorsList}
        renderItem={({ item }) => <Card item={item} />}
        numColumns={2}
      />
    </View>
    // {/* </SafeAreaView> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
