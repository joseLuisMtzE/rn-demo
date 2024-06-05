import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Magnetometer } from "expo-sensors";

export default function MagnetometerScreen() {
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometerData, setMagnetometerData] = useState<{
    x: number;
    y: number;
    z: number;
  }>({ x: 0, y: 0, z: 0 });

  const [direction, setDirection] = useState<number>(0);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((magnetometerData: any) => {
        const { x, y, z } = magnetometerData;
        setMagnetometerData({ x, y, z });
        const angle = Math.atan2(y, x) * (180 / Math.PI); // Esto convierte el angulo de radianes a grados, en un rango de -180 a 180 grados.
        setDirection((angle + 360) % 360); //aseguramos que el angulo este en un rango de 0 a 360 grados
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Magnetometer.setUpdateInterval(100);

    return () => _unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Magnetometer Data</Text>

        <Text style={styles.data}>x: {magnetometerData.x.toFixed(8)}</Text>
        <Text style={styles.data}>y: {magnetometerData.y.toFixed(8)}</Text>
        <Text style={styles.data}>z: {magnetometerData.z.toFixed(8)}</Text>
      </View>
      <View style={styles.compassCard}>
        <Animated.View
          style={{
            transform: [{ rotate: `${360 - direction}deg` }],
          }}
        >
          <View style={styles.pointer}>
            <View style={styles.centerIndicator} />
            <View style={styles.northIndicator}>
              <Text style={styles.northIndicatorText}>N</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  data: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
    top: 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  pointer: {
    width: 250,
    height: 10,
    backgroundColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  centerIndicator: {
    width: 4,
    height: 4,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "black",
  },
  northIndicator: {
    width: 10,
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  northIndicatorText: {
    color: "white",
    fontFamily: "RobotoBold",
    transform: [{ rotate: "90deg" }],
  },
  compassCard: {
    backgroundColor: "#FFF",
    width: "90%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
});
