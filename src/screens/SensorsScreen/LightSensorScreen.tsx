import { View, Text, StyleSheet, Platform, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { LightSensor } from "expo-sensors";
import { Bar } from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LightSensorScreen() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [subscription, setSubscription] = useState<any>(null);

  const _subscribe = () => {
    setSubscription(
      LightSensor.addListener((sensorData: any) => {
        setData(sensorData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  return (
    <View style={styles.sensor}>
      {Platform.OS === "android" ? (
        <>
          {LightSensor.setUpdateInterval(100)}

          <View
            style={{
              // flex: 1,
              display: "flex",
              // flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 16,
              backgroundColor: "white",
              padding: 32,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "RobotoBold" }}>
              Sensor de luz data:
            </Text>

            <View>
              <MaterialCommunityIcons
                name="lightbulb"
                size={128}
                color={`rgba(255, 216, 0,${illuminance / 4000})`}
              />
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
              <Bar progress={illuminance / 4000} width={200} color="#6EDC5F" />
              <Text
                style={{ fontSize: 20, fontFamily: "RobotoRegular" }}
              >{` ${illuminance} lx`}</Text>
            </View>
            <Switch
              trackColor={{ false: "#DDDDDD", true: "#6EDC5F" }}
              thumbColor={"white"}
              onValueChange={() => {
                if (subscription) {
                  _unsubscribe();
                } else {
                  _subscribe();
                }
              }}
              value={subscription !== null ? true : false}
            />
          </View>
        </>
      ) : (
        <Text>Only available on Android</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sensor: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
});
