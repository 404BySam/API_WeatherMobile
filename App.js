import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LocalMobile from "./components/LocaMobile";
import { DetailCity } from "./components/DetailCity";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>☁️</Text>
      <StatusBar style="auto" />
      <View>
        <LocalMobile />
      </View>
      <View>
        <DetailCity />
      </View>
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
