import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useThemeColor";
import { useAuthStore } from "../utils/authStore";
import { hasCompletedOnboarding } from "../utils/onboardingUtils";

export default function SplashScreen() {
  const router = useRouter();
  const theme = useTheme();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const initializeApp = async () => {
      const hasSeenOnboarding = await hasCompletedOnboarding();
      const user = useAuthStore.getState().user;

      setTimeout(() => {
        if (!hasSeenOnboarding) {
          router.replace("/onboarding");
        } else if (!user?.isLoggedIn) {
          router.replace("/(auth)/login");
        } else {
          router.replace("/(tabs)");
        }
      }, 2000);
    };

    initializeApp();
  }, []);

  const gradientColors: [string, string, ...string[]] = [
    theme.colors.primary,
    theme.colors.primaryDark,
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logoContainer: {
      alignItems: "center",
    },
    logoText: {
      fontSize: theme.typography.h1.fontSize,
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: theme.typography.h1.fontWeight,
      color: theme.colors.textInverse,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.textInverse,
      opacity: 0.9,
    },
  });

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Text style={styles.logoText}>TradeX</Text>
        <Text style={styles.subtitle}>Your Trading Platform</Text>
      </Animated.View>
    </LinearGradient>
  );
}
