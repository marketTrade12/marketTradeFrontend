import { useTheme } from "@/hooks/useThemeColor";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
}

export default function LoadingState({
  message = "Loading...",
  size = "large",
}: LoadingStateProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    spinner: {
      marginBottom: theme.spacing.md,
    },
    message: {
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
      color: theme.colors.textSecondary,
      textAlign: "center",
      fontWeight: theme.typography.body1.fontWeight,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={theme.colors.primary}
        style={styles.spinner}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
