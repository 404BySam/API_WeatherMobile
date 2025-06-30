import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LocalMobile from "./components/LocaMobile";
import React, { useEffect, useState } from "react";
import { DetailCity } from "./components/DetailCity";

export default function App() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  return (
    <View style={styles.container}>
      <LocalMobile
        onLocation={(lat, lon) => setCoords({ latitude: lat, longitude: lon })}
      />

      {coords.latitude && coords.longitude && (
        <DetailCity latitude={coords.latitude} longitude={coords.longitude} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADC6D9",
    alignItems: "center",
    justifyContent: "center",
  },
});
