import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function DetailCity({ latitude, longitude }) {
  const [isLoading, setIsLoading] = useState(); // pour l'afficher en dur le passer en paramètre true
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
    // .then((isLoading) => setIsLoading(!isLoading));
  }, [latitude, longitude]);

  if (!weather) return <ActivityIndicator />;

  const iconApi = weather.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconApi}@2x.png`;

  return (
    <>
      {isLoading == true ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.city}>Ville : {weather.name}</Text>
          <View style={styles.weatherRow}>
            <Image source={{ uri: iconUrl }} style={styles.icon} />
            <View style={{ marginLeft: 16 }}>
              <Text>Température : {weather.main?.temp}°C</Text>
              <Text>Description : {weather.weather?.[0]?.description}</Text>
            </View>
          </View>
          <Image source={{ uri: iconUrl }} />
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
  card: {
    backgroundColor: "#f5faff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    margin: 24,
  },
  city: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0077b6",
    letterSpacing: 1,
    marginBottom: 12,
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  temp: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 2,
  },
  desc: {
    fontSize: 16,
    color: "#555",
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#caf0f8",
  },
  map: {
    width: 320,
    height: 180,
    borderRadius: 18,
    marginTop: 12,
    borderColor: "black",
    borderWidth: 2,
  },
});
