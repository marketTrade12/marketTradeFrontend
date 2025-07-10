import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function BottomTradeSheet() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.textSecondary,
      height: 2,
    },
  });

  return <View style={styles.container} />;
}
