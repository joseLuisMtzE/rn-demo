import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Gyroscope } from "expo-sensors";

const AnimatedView = Animated.View;

export default function GyroscopeScreen() {
  const [subscription, setSubscription] = useState<any>(null);
  const [ballPositionX, setBallPositionX] = useState(0);
  const [ballPositionY, setBallPositionY] = useState(0);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(100);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData: any) => {
        const newX = ballPositionX - gyroscopeData.x * 40;
        const newY = ballPositionY + gyroscopeData.y * 40;
        setBallPositionX(newX);
        setBallPositionY(newY);
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

  const animatedStyle = {
    left: ballPositionX,
    top: ballPositionY,
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gyroscope values</Text>
        <Text>{ballPositionX}</Text>
        <Text>{ballPositionY}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={subscription ? _unsubscribe : _subscribe}
            style={styles.button}
          >
            <Text>{subscription ? "On" : "Off"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AnimatedView style={[animatedStyle, styles.ball]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
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
    position: "absolute",
    top: 0,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
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
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
