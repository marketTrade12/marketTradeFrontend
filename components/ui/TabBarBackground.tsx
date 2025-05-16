import { Colors } from "@/constants/Colors"; // ✅ import your theme
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  if (Platform.OS === "ios") {
    return (
      <BlurView
        intensity={80}
        tint={colorScheme === "dark" ? "dark" : "light"}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  return (
    <View
      style={[
        styles.androidTabBackground,
        {
          backgroundColor: theme.surface, // ✅ use themed surface color
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  androidTabBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
});

export function useBottomTabOverflow() {
  return 0;
}
