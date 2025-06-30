import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";

export function DetailCity({ latitude, longitude }) {
  const [isLoading, setisLoading] = useState();
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

  if (!weather) return <ActivityIndicator size="small" color="#0000ff" />;

  const iconApi = weather.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconApi}@2x.png`;

  return (
    <>
      {isLoading == true ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Text>Ville : {weather.name}</Text>
          <Text>Température : {weather.main?.temp}°C</Text>
          <Text>Description : {weather.weather?.[0]?.description}</Text>
          <Image
            source={{ uri: iconUrl }}
            style={{ width: 80, height: 80 }} // Ajuste la taille si tu veux
          />
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
});
