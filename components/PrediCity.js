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
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "flex-start",
    shadowColor: "#22223b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 8,
    marginBottom: 24,
    marginHorizontal: 10,
    width: 360,
    maxWidth: "97%",
    borderWidth: 1,
    borderColor: "#b6ccfe",
  },
  city: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#365cc9",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1.1,
    textShadowColor: "#dbeafe",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  day: {
    alignItems: "center",
    backgroundColor: "#e8edfb",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 90,
    marginRight: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#b6ccfe",
    shadowColor: "#a5b4fc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  date: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 2,
    letterSpacing: 0.7,
  },
  temp: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4062a6",
    marginVertical: 2,
  },
  desc: {
    fontSize: 13,
    color: "#374151",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 3,
    minHeight: 28,
  },
  icon: {
    width: 54,
    height: 54,
    marginVertical: 3,
  },
});
