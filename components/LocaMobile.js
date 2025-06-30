import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function LocalMobile({ onLocation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission refusée pour accéder à la localisation");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      if (onLocation) {
        onLocation(loc.coords.latitude, loc.coords.longitude);
      }
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size="large" />;
  }

  return null;
  // (
  //   <View style={styles.container}>
  //     <Text>Latitude : {location.coords.latitude}</Text>
  //     <Text>Longitude : {location.coords.longitude}</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
