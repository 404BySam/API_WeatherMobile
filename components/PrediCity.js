import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export function PrediCity({ latitude, longitude }) {
  const [isLoading, setIsLoading] = useState(); // pour l'afficher en dur le passer en paramètre true
  const [forecast, setForecast] = useState(null);
  const API_KEY = "71db9d95bd3d3945ea779289ed542768";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setForecast(data));
  }, [latitude, longitude]);

  if (!forecast) return <ActivityIndicator />;

  const daily = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) daily[date] = [];
    daily[date].push(item);
  });

  const days = Object.keys(daily).slice(1, 6);

  let dayViews = [];
  for (let i = 0; i < days.length; i++) {
    const date = days[i];

    let midday = daily[date].find((item) => item.dt_txt.includes("12:00:00"));
    if (!midday) {
      midday = daily[date][0];
    }
    const temp = midday.main.temp;
    const desc = midday.weather[0].description;
    const icon = midday.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const [y, m, d] = date.split("-");
    const showDate = `${d}/${m}`;

    dayViews.push(
      <View key={date} style={styles.day}>
        <Text style={styles.date}>{showDate}</Text>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <Text style={styles.temp}>{Math.round(temp)}°C</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.city}>
        Prévisions 5 jours pour {forecast.city?.name}
      </Text>
      <ScrollView horizontal>{dayViews}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5faff",
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    margin: 12,
    width: "95%",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 16,
  },
  day: {
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#e6ecf0",
    padding: 12,
    borderRadius: 16,
    minWidth: 90,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  temp: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  desc: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  icon: {
    width: 55,
    height: 55,
    marginVertical: 2,
  },
});
