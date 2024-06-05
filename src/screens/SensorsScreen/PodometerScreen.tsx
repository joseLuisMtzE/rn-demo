import { View, Text, Platform, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";

export default function PedometerScreen() {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");

  useEffect(() => {
    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
          if (Platform.OS === "android") {
            // En Android, no obtenemos recuento de pasos para un rango de fechas
            const subscription = Pedometer.watchStepCount((result) => {
              setCurrentStepCount(result.steps);
            });

            return () => {
              subscription.remove();
            };
          } else {
            // En iOS, obtenemos el recuento de pasos para el día actual
            const start = new Date();
            const end = new Date();
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            const result = await Pedometer.getStepCountAsync(start, end);
            setSteps(result.steps);

            const subscription = Pedometer.watchStepCount((result) => {
              setCurrentStepCount(result.steps);
            });

            return () => {
              if (subscription && typeof subscription.remove === "function") {
                subscription.remove();
              }
            };
          }
        }
      } catch (error) {
        console.error("Error al verificar el podómetro:", error);
      }
    };

    subscribe();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          style={{
            fontFamily: "RobotoBold",
            fontSize: 24,
            alignSelf: "center",
          }}
        >
          Podómetro data
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: isPedometerAvailable ? "#6EDC5F" : "red",
              fontSize: 12,
              alignSelf: "center",
            },
          ]}
        >
          Podómetro
          {isPedometerAvailable ? " disponible ✅" : " no disponible ❌"}
        </Text>
        <View>
          <Text style={styles.text}>Pasos de sesion: {currentStepCount}</Text>
          {Platform.OS === "ios" && (
            <Text style={styles.text}>
              Total de pasos de las ultimas 24 horas: {steps}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
    gap: 8,
    top: 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  text: {
    fontSize: 18,
  },
});
