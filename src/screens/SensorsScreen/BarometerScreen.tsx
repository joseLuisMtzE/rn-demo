import { View, Text, StyleSheet, Platform, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { Barometer } from "expo-sensors";

export default function BarometerScreen() {
  const [{ pressure, relativeAltitude }, setData] = useState<any>({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);

  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const subscribe = async () => {
    const isAvailable = await Barometer.isAvailableAsync();
    setIsAvailable(isAvailable);

    if (isAvailable) {
      Barometer.getPermissionsAsync().then((res) => {
        if (res.granted) {
          setSubscription(
            Barometer.addListener(({ pressure, relativeAltitude }) => {
              setData({ pressure, relativeAltitude });
            })
          );
        }
      });
    }
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontFamily: "RobotoBold", fontSize: 24 }}>
        Barometer data
      </Text>

      {isAvailable ? (
        <>
          <View>
            <Text style={[styles.text]}>
              Barometer: {subscription ? "ACTIVE" : "INACTIVE"}
            </Text>
            <Text style={styles.text}>Pressure: {pressure} hPa</Text>
            <Text
              style={[styles.text, Platform.OS !== "ios" && { color: "red" }]}
            >
              Relative Altitude:
              {Platform.OS === "ios"
                ? `${relativeAltitude} m`
                : ` Only available on iOS`}
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#DDDDDD", true: "#6EDC5F" }}
            thumbColor={"white"}
            onValueChange={() => {
              if (subscription) {
                unsubscribe();
              } else {
                subscribe();
              }
            }}
            value={subscription !== null ? true : false}
          />
        </>
      ) : (
        <Text style={[styles.text, { opacity: 0.3 }]}>
          Barometer not available!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
    marginTop: 15,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    padding: 16,
    gap: 16,
  },
  text: {
    fontSize: 18,
  },
});
