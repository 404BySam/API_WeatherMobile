import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LocalMobile from "./components/LocaMobile";
import React, { useEffect, useState } from "react";
import { DetailCity } from "./components/DetailCity";
import { PrediCity } from "./components/PrediCity";

export default function App() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  return (
    <View style={styles.container}>
      <LocalMobile
        onLocation={(lat, lon) => setCoords({ latitude: lat, longitude: lon })}
      />

      {coords.latitude && coords.longitude && (
        <>
          <DetailCity latitude={coords.latitude} longitude={coords.longitude} />
          <PrediCity latitude={coords.latitude} longitude={coords.longitude} />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f1f7",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 48,
  },
});
