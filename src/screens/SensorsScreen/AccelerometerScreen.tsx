import { View, Text, StyleSheet, Animated, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

export default function AccelerometerScreen() {
  const [subscription, setSubscription] = useState<any>(null);
  const [ballPositionX, setBallPositionX] = useState<number>(0);
  const [ballPositionY, setBallPositionY] = useState<number>(0);
  const [ballPositionZ, setBallPositionZ] = useState({
    scaleX: 0,
    scaleY: 0,
    value: 0,
  });

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        const { x, y, z } = data;

        const adjustedX = Platform.OS === "android" ? -x : x;
        const adjustedY = Platform.OS === "android" ? -y : y;
        const adjustedZ = Platform.OS === "android" ? -z : z;

        setBallPositionX(adjustedX * 200);
        setBallPositionY(adjustedY * 200);
        setBallPositionZ({
          scaleX: 1 + Math.abs(adjustedZ),
          scaleY: 1 - Math.abs(adjustedZ),
          value: adjustedZ,
        });
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(50);
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={[styles.card]}>
          <Text style={styles.cardTitle}>Accelerometer data</Text>
          <View>
            <Text>X: {ballPositionX.toFixed(8)}</Text>
            <Text>Y: {ballPositionY.toFixed(8)}</Text>
            <Text>Z: {ballPositionZ.value.toFixed(8)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.ballsContainer}>
        <Animated.View
          style={[
            styles.ball,
            {
              backgroundColor: "blue",
              transform: [{ translateX: new Animated.Value(ballPositionX) }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.ball,
            {
              backgroundColor: "green",
              transform: [{ translateY: new Animated.Value(ballPositionY) }],
            },
          ]}
        />
        <Animated.View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "red",
            borderRadius: 50,
            transform: [
              { scaleX: ballPositionZ.scaleX },
              { scaleY: ballPositionZ.scaleY },
            ],
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    padding: 8,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    textAlign: "center",
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "absolute",
  },
  ballsContainer: {
    overflow: "hidden",
    backgroundColor: "#FFF",
    width: "90%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    elevation: 3,
  },
});
