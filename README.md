# 🌦️ WeatherApp Expo — React Native & OpenWeather

**WeatherApp Expo** est une application mobile React Native développée avec Expo, qui permet de :

- Géolocaliser votre position sur smartphone
- Afficher la météo actuelle de votre ville (température, description, icône)
- Visualiser un extrait de carte centré sur votre position
- Obtenir les prévisions météo sur les 5 prochains jours avec une interface “scrollable”

---

## ✨ **Fonctionnalités principales**

- **Localisation automatique** grâce au module Expo Location
- **Données météo** fournies par l’API OpenWeatherMap (température, icônes, descriptions, etc.)
- **Carte interactive** via `react-native-maps`
- **Prévisions sur 5 jours** (affichage horizontal clair et responsive)
- **Design épuré** et moderne, responsive, avec des cards, couleurs douces et ombres
- Gestion de l’attente (loading) et des erreurs d’accès à la géolocalisation

---

## 🛠️ **Technologies & librairies utilisées**

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) (pour la géolocalisation)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) (pour la carte)
- [OpenWeatherMap API](https://openweathermap.org/api)
- JavaScript (ES6+)
- StyleSheet React Native (CSS-in-JS)

---

## 🚀 **Installation & lancement**

1. **Cloner le projet**
   ```bash
   git clone
   cd WeatherAppExpo
   npm install
   npx expo start
   ```
