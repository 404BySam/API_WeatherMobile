import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function DetailCity({ latitude, longitude }) {
  const [isLoading, setIsLoading] = useState(true); // pour l'afficher en dur le passer en paramètre true
  const [weather, setWeather] = useState(null);
  const API_KEY = "71db9d95bd3d3945ea779289ed542768";

  //   const lat = 45.7485;
  //   const lon = 4.8467;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, [latitude, longitude]);

  if (!weather) return <ActivityIndicator />;

  const iconApi = weather.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconApi}@2x.png`;

  return (
    <>
      {isLoading == true ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.container}>
          <Text>Ville : {weather.name}</Text>
          <Text>Température : {weather.main?.temp}°C</Text>
          <Text>Description : {weather.weather?.[0]?.description}</Text>
          <Image source={{ uri: iconUrl }} style={{ width: 80, height: 80 }} />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Marker
              coordinate={{ latitude: latitude, longitude: longitude }}
              title={weather.name}
              description={weather.weather?.[0]?.description}
            />
          </MapView>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 200,
    height: 220,
    borderRadius: 100,
    marginTop: 16,
  },
});
