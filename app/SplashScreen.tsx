import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding"); // Change to your main entry route if needed
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#b16cea", "#8f5be8", "#5f2c82"]} // Adjust to match your image's gradient
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Image
        source={require("../assets/images/logo/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 80,
  },
});
