import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

export function DetailCity() {
  const API_KEY = "71db9d95bd3d3945ea779289ed542768";
  const lat = 45.78197134053958;
  const lon = 4.748310672715143;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  useEffect(() => {
    console.log("weather : ", weather);
  }, [weather]);

  if (!weather) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Text>Ville : {weather.name}</Text>
      <Text>Température : {weather.main.temp}°C</Text>
      <Text>Description : {weather.weather[0].description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
